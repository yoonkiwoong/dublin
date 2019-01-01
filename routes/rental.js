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
            db.all('SELECT user_name FROM user', function (err, userdb) {
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
    var uid = req.params.uid;
    var rental_user = req.body.rental_user;
    var rental_dt = format.asString('yyyy-MM-dd hh:mm', new Date());

    db.run('UPDATE device SET device_condition = 1 WHERE uid = ?', [uid], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            if (this.changes == 1) {
                db.run('UPDATE rental SET rental_user =?, rental_dt = ?, return_user = null, return_dt = null WHERE uid = ?', [rental_user, rental_dt, uid], function (err) {
                    if (err) {
                        console.log(err)
                        res.redirect('/error');
                    } else {
                        console.log("RENTAL DB UPDATED");
                        res.redirect('/rental');
                    }
                });
            }
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
            res.render('./rental/return', { title: '장비 반납', returninfo: devicedb });
        }
    });
});

router.post(['/:uid/return'], function (req, res) {
    var uid = req.params.uid;
    var return_user = req.body.return_user;
    var return_dt = format.asString('yyyy-MM-dd hh:mm', new Date());

    db.run('UPDATE device SET device_condition = 0 WHERE uid = ?', uid, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            db.run('UPDATE rental SET device_uid = ?, rental_user = null, rental_dt = null, return_user = ?, return_dt = ? WHERE uid = ?', [uid, return_user, return_dt, uid], function (err) {
                if (err) {
                    console.log(err);
                    res.redirect('/error');
                } else {
                    console.log("RENTAL DB UPDATED");
                    res.redirect('/rental');
                }
            });
        }
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT device.uid, device.device_name, device.device_osversion, device.device_condition, rental.rental_user, rental.rental_dt FROM device LEFT JOIN rental ON device.uid=rental.device_uid', function (err, listdb) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./rental/list', { title: '대여 목록', listinfo: listdb });
        };
    });
});

module.exports = router;
