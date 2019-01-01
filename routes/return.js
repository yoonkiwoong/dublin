var express = require('express');
var router = express.Router();
var format = require('date-format');

var db = require('../config/database');

router.get(['/:uid/return'], function (req, res) {
    var uid = req.params.uid;
    db.get('SELECT uid, device_name, device_condition, device_return_user, device_return_dt FROM device WHERE uid = ?', [uid], function (err, devicedb) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./return/return', { title: '장비 반납', returninfo: devicedb });
        }
    });
});

router.post(['/:uid/return'], function (req, res) {
    var uid = req.params.uid;
    var device_return_user = req.body.device_return_user;
    var device_return_dt = format.asString('yyyy-MM-dd hh:mm', new Date());

    db.run('UPDATE device SET device_condition = 0, device_rental_dt = null, device_return_user = ?, device_return_dt = ? WHERE uid = ?', [device_return_user, device_return_dt, uid], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            console.log("RENTAL DB UPDATED");
            res.redirect('/return');
        }
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT uid, device_name, device_condition, device_rental_user, device_rental_dt FROM device WHERE device_condition = 1', function (err, devicedb) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            if (devicedb == 0) {
                res.render('./return/empty', { title: '반납 목록' });
            } else {
                res.render('./return/list', { title: '반납 목록', deviceinfo: devicedb });
            };
        };
    });
});

module.exports = router;
