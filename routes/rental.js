var express = require('express');
var router = express.Router();
var format = require('date-format');

var db = require('../config/database');

router.get(['/:uid/rental'], function (req, res) {
    var uid = req.params.uid;
    db.get('SELECT uid, device_name, device_condition, device_rental_user, device_rental_dt FROM device WHERE uid = ?', [uid], function (err, devicedb) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            db.all('SELECT user_name FROM user', function (err, userdb) {
                if (err) {
                    console.log(err);
                    res.redirect('/error');
                } else {
                    res.render('./rental/rental', { title: '장비 대여', deviceinfo: devicedb, userinfo: userdb });
                };
            });
        };
    });
});

router.post(['/:uid/rental'], function (req, res) {
    var uid = req.params.uid;
    var device_rental_user = req.body.device_rental_user;
    var device_rental_dt = format.asString('yyyy-MM-dd hh:mm', new Date());

    db.run('UPDATE device SET device_condition = 1, device_rental_user = ?, device_rental_dt = ?, device_return_user = null, device_return_dt = null WHERE uid = ?', [device_rental_user, device_rental_dt, uid], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            console.log("RENTAL DB UPDATED");
            res.redirect('/rental');
        };
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT uid, device_name, device_ostype, device_osversion, device_condition FROM device WHERE device_condition = 0', function (err, devicedb) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./rental/list', { title: '대여 목록', deviceinfo: devicedb });
        };
    });
});

module.exports = router;
