var express = require('express');
var router = express.Router();
var format = require('date-format');

var db = require('../config/database');

router.get(['/:uid/rental'], function (req, res) {
    var uid = req.params.uid;
    db.get('SELECT uid, device_name FROM device WHERE uid = ?', [uid], function (err, devicedb) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            db.all('SELECT uid, user_name FROM user', function (err, userdb) {
                if (err) {
                    console.log(err);
                    res.redirect('/error');
                } else {
                    res.render('./rental/rental', { title: '장비 대여', deviceinfo: devicedb, userinfo: userdb });
                }
            });
        }
    });
});

router.post(['/:uid/rental'], function (req, res) {
    var device_uid = req.params.uid;
    var user_uid = req.body.user_uid;
    var rental_dt = format.asString('yyyy-MM-dd hh:mm', new Date());

    db.run('UPDATE rental SET device_uid = ?, user_uid = ?, rental_dt = ?, return_dt = null WHERE device_uid = ?', [device_uid, user_uid, rental_dt, device_uid], function (err) {
        if (err) {
            console.log(err)
            res.redirect('/error');
        } else if (this.changes == 0) {
            console.log("RENTAL DB UPDATE FAIL");
            res.redirect('/rental');
        } else if (this.changes == 1) {
            console.log("RENTAL DB UPDATED");
            res.redirect('/rental');
        }
    });
});

router.get(['/:uid/return'], function (req, res) {
    var uid = req.params.uid;
    db.get('SELECT uid, device_name FROM device WHERE uid = ?', [uid], function (err, devicedb) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./rental/return', { title: '장비 반납', deviceinfo: devicedb });
        }
    });
});

router.post(['/:uid/return'], function (req, res) {
    var device_uid = req.params.uid;
    var user_uid = req.body.return_user;
    var return_dt = format.asString('yyyy-MM-dd hh:mm', new Date());

    db.run('UPDATE rental SET device_uid = ?, user_uid = ?, rental_dt = null, return_dt = ? WHERE device_uid = ?', [device_uid, user_uid, return_dt, device_uid], function (err) {
        if (err) {
            console.log(err)
            res.redirect('/error');
        } else if (this.changes == 0) {
            console.log("RETURN DB UPDATE FAIL");
            res.redirect('/rental');
        } else if (this.changes == 1) {
            console.log("RETURN DB UPDATED");
            res.redirect('/rental');
        }
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT device.uid, device.device_name, device.device_osversion, user.user_name, rental.rental_dt FROM rental LEFT JOIN device ON rental.device_uid=device.uid LEFt JOIN user ON rental.user_uid=user.uid', function (err, listdb) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./rental/list', { title: '대여 목록', listinfo: listdb });
        };
    });
});

module.exports = router;
