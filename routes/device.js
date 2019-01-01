var express = require('express');
var router = express.Router();

var db = require('../config/database')

router.get(['/add'], function (req, res) {
    db.all('SELECT DISTINCT device_manufacturer FROM device', function (err, deviceinfo) {
        res.render('./device/add', { title: '장비 추가', adddb: deviceinfo });
    });
});

router.post(['/add'], function (req, res) {
    var device_manufacturer = req.body.device_manufacturer;
    var device_name = req.body.device_name;
    var device_model = req.body.device_model;
    var device_serial = req.body.device_serial;
    var device_imei = req.body.device_imei;
    var device_ostype = req.body.device_ostype;
    var device_osversion = req.body.device_osversion;
    var device_get_dt = req.body.device_get_dt;
    var device_assetcode = req.body.device_assetcode;
    var device_info = req.body.device_info;

    db.run('INSERT INTO device (device_manufacturer, device_name, device_model, device_serial, device_imei, device_ostype, device_osversion, device_get_dt, device_assetcode, device_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [device_manufacturer, device_name, device_model, device_serial, device_imei, device_ostype, device_osversion, device_get_dt, device_assetcode, device_info], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            var device_uid = this.lastID;
            console.log("DEVICE ID : " + device_uid);
            db.run('INSERT INTO rental (device_uid, device_name) VALUES (?, ?)', [device_uid, device_name], function (err) {
                if (err) {
                    console.log(err);
                    res.redirect('/error');
                } else {
                    res.redirect('/device');
                }
            });
        }
    });
});

router.get(['/:uid/edit'], function (req, res) {
    var uid = req.params.uid;
    console.log('EDIT GET UID : ' + uid);
    db.get('SELECT * FROM device WHERE uid = ?', [uid], function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            db.all('SELECT DISTINCT device_manufacturer FROM device', function (err, manufacturerinfo) {
                console.log('BODY UID : ' + deviceinfo.uid);
                res.render('./device/edit', { title: '장비 수정', editdb: deviceinfo, manufacturerdb: manufacturerinfo });
            });
        };
    });
});

router.post(['/:uid/edit'], function (req, res) {
    var uid = req.params.uid;
    var device_manufacturer = req.body.device_manufacturer;
    var device_name = req.body.device_name;
    var device_model = req.body.device_model;
    var device_serial = req.body.device_serial;
    var device_imei = req.body.device_imei;
    var device_ostype = req.body.device_ostype;
    var device_osversion = req.body.device_osversion;
    var device_get_dt = req.body.device_get_dt;
    var device_assetcode = req.body.device_assetcode;
    var device_info = req.body.device_info;
    console.log('EDIT POST UID : ' + uid);

    db.run('UPDATE device SET device_manufacturer = ?, device_name = ?, device_model = ?, device_serial = ?, device_imei = ?, device_ostype = ?, device_osversion = ?, device_get_dt = ?, device_assetcode = ?, device_info = ? WHERE uid = ?', [device_manufacturer, device_name, device_model, device_serial, device_imei, device_ostype, device_osversion, device_get_dt, device_assetcode, device_info, uid], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            if (this.changes == 1) {
                console.log('SUCCESS');
                res.redirect('/device/' + uid)
            }
        }
    });
});

router.get(['/:uid/delete'], function (req, res) {
    var uid = req.params.uid;
    console.log('DELETE GET UID : ' + uid);
    db.get('SELECT * FROM device WHERE uid = ?', [uid], function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            console.log('BODY UID : ' + deviceinfo.uid);
            res.render('./device/delete', { title: '장비 삭제', deletedb: deviceinfo });
        }
    });
});

router.post(['/:uid/delete'], function (req, res) {
    var uid = req.params.uid;
    console.log('POST DELETE ID : ' + uid);
    db.run('DELETE FROM device WHERE uid = ?', [uid], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            if (this.changes == 1) {
                db.run('DELETE FROM rental WHERE device_uid = ?', [uid], function (err) {
                    if (err) {
                        console.log(err);
                        res.redirect('/error');
                    } else {
                        console.log('DELETE SUCCESS');
                        res.redirect('/device')
                    }
                });
            }
        }
    });
});

router.get(['/:uid'], function (req, res) {
    var uid = req.params.uid;
    console.log('LIST UID : ' + uid);
    db.get('SELECT * FROM device WHERE uid = ?', [uid], function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./device/info', { title: '장비 상세', infodb: deviceinfo });
        }
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT uid, device_name, device_model, device_osversion FROM device', function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./device/list', { title: '장비 목록', devicedb: deviceinfo });
        }
    });
});

module.exports = router;
