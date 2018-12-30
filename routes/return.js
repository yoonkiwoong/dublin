var express = require('express');
var router = express.Router();

var db = require('../config/database');

router.get(['/:uid/return'], function (req, res) {
    var uid = req.params.uid;
    console.log('RETURN GET UID : ' + uid);
    db.get('SELECT * FROM device WHERE uid = ?', [uid], function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            console.log('BODY UID : ' + deviceinfo.uid);
            res.render('./return/return', { returndb: deviceinfo });
        }
    });
});

router.post(['/:uid/return'], function (req, res) {
    var uid = req.params.uid;
    console.log('RETURN POST UID : ' + uid);

    db.run('UPDATE device SET device_condition = 0 WHERE uid = ?', [uid], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.redirect('/rental/' + uid + '/rental');
        }
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT uid, device_name, device_ostype, device_osversion, device_condition FROM device WHERE device_condition = 1', function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./return/list', { devicedb: deviceinfo });
        }
    });
});

module.exports = router;
