var express = require('express');
var router = express.Router();
var format = require('date-format');

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
            res.render('./return/return', { title: '장비 반납', returndb: deviceinfo });
        }
    });
});

router.post(['/:uid/return'], function (req, res) {
    var uid = req.params.uid;
    var device_user = req.body.device_user;
    var device_return_dt = format.asString('yyyy-MM-dd', new Date());

    console.log('RETURN POST UID : ' + uid);

    db.run('UPDATE device SET device_condition = 0, device_user = ?, device_return_dt = ? WHERE uid = ?', [device_user, device_return_dt, uid], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.redirect('/rental/' + uid + '/rental');
        }
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT uid, device_name, device_ostype, device_osversion, device_condition, device_user FROM device WHERE device_condition = 1', function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            if (deviceinfo == 0) {
                res.render('./return/empty', { title: '반납 목록' });
            } else {
                res.render('./return/list', { title: '반납 목록', devicedb: deviceinfo });
            };
        };
    });
});

module.exports = router;
