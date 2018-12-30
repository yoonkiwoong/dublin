var express = require('express');
var router = express.Router();

var db = require('../config/database');

router.get(['/:uid/rental'], function (req, res) {
    var uid = req.params.uid;
    console.log('RENTAL GET UID : ' + uid);
    db.get('SELECT * FROM device WHERE uid = ?', [uid], function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            db.all('SELECT user_name FROM user', function (err, userinfo) {
                if (err) {
                    console.log(err);
                    res.redirect('/error');
                } else {
                    console.log('BODY UID : ' + deviceinfo.uid);
                    res.render('./rental/rental', { rentaldb: deviceinfo, userdb: userinfo });
                };
            });
        };
    });
});

router.post(['/:uid/rental'], function (req, res) {
    var uid = req.params.uid;
    var device_user = req.body.device_user;
    console.log('RENTAL POST UID : ' + uid);

    db.run('UPDATE device SET device_condition = 1, device_user = ? WHERE uid = ?', [device_user, uid], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.redirect('/return/' + uid + '/return');
        };
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT uid, device_name, device_ostype, device_osversion, device_condition FROM device WHERE device_condition = 0', function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./rental/list', { devicedb: deviceinfo });
        };
    });
});

module.exports = router;
