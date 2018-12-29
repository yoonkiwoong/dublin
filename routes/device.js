var express = require('express');
var router = express.Router();

var db = require('../config/database')

router.get(['/add'], function (req, res) {
    res.render('./device/add');
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
    console.log('ADD POST ID : ' + uid);

    db.run('INSERT INTO device (device_manufacturer, device_name, device_model, device_serial, device_imei, device_ostype, device_osversion, device_get_dt, device_assetcode, device_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [device_manufacturer, device_name, device_model, device_serial, device_imei, device_ostype, device_osversion, device_get_dt, device_assetcode, device_info], function (err) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.redirect('/device');
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
            console.log('BODY UID : ' + deviceinfo.uid);
            res.render('./device/edit', { editdb: deviceinfo });
        }
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
            res.redirect('/device/' + uid);
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
            res.render('./device/delete', { deletedb: deviceinfo });
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
                console.log('SUCCESS');
                res.redirect('/device')
            } else {
                console.log('FAIL');
                res.redirect('/device')
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
            res.render('./device/info', { infodb: deviceinfo });
        }
    });
});

router.get(['/'], function (req, res) {
    db.all('SELECT uid, device_manufacturer, device_name, device_model, device_ostype, device_osversion FROM device', function (err, deviceinfo) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('./device/list', { devicedb: deviceinfo });
        }
    });
});

module.exports = router;
