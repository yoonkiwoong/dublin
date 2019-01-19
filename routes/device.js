var express = require('express');
var router = express.Router();
var Device = require('../config/devciedb');

router.get(['/add'], function (req, res) {
    res.render('./device/add');
});

router.post(['/add'], function (req, res) {

    var device = new Device();

    device.manufacturer = req.body.device_manufacturer;
    device.name = req.body.device_name;
    device.model = req.body.device_model;
    device.serial = req.body.device_serial;
    device.imei = req.body.device_imei;
    device.os_type = req.body.device_os_type;
    device.os_version = req.body.device_os_version;
    device.device_get_dt = req.body.device_get_dt;
    device.assetcode = req.body.device_assetcode;
    device.info = req.body.device_info;

    device.save(function (err) {
        console.log("DB INSERT DONE");
        res.redirect('/device/add');
    });
});

// router.get(['/:uid/edit'], function (req, res) {
//     var uid = req.params.uid;
//     console.log('EDIT GET UID : ' + uid);
//     db.get('SELECT * FROM device WHERE uid = ?', [uid], function (err, deviceinfo) {
//         if (err) {
//             console.log(err);
//             res.redirect('/error');
//         } else {
//             db.all('SELECT DISTINCT device_manufacturer FROM device', function (err, manufacturerinfo) {
//                 console.log('BODY UID : ' + deviceinfo.uid);
//                 res.render('./device/edit', { title: '장비 수정', editdb: deviceinfo, manufacturerdb: manufacturerinfo });
//             });
//         };
//     });
// });

// router.post(['/:uid/edit'], function (req, res) {
//     var uid = req.params.uid;
//     var device_manufacturer = req.body.device_manufacturer;
//     var device_name = req.body.device_name;
//     var device_model = req.body.device_model;
//     var device_serial = req.body.device_serial;
//     var device_imei = req.body.device_imei;
//     var device_ostype = req.body.device_ostype;
//     var device_osversion = req.body.device_osversion;
//     var device_get_dt = req.body.device_get_dt;
//     var device_assetcode = req.body.device_assetcode;
//     var device_info = req.body.device_info;
//     console.log('EDIT POST UID : ' + uid);

//     db.run('UPDATE device SET device_manufacturer = ?, device_name = ?, device_model = ?, device_serial = ?, device_imei = ?, device_ostype = ?, device_osversion = ?, device_get_dt = ?, device_assetcode = ?, device_info = ? WHERE uid = ?', [device_manufacturer, device_name, device_model, device_serial, device_imei, device_ostype, device_osversion, device_get_dt, device_assetcode, device_info, uid], function (err) {
//         if (err) {
//             console.log(err);
//             res.redirect('/error');
//         } else {
//             if (this.changes == 1) {
//                 console.log('SUCCESS');
//                 res.redirect('/device/' + uid)
//             }
//         }
//     });
// });

// router.get(['/:uid/delete'], function (req, res) {
//     var uid = req.params.uid;
//     console.log('DELETE GET UID : ' + uid);
//     db.get('SELECT * FROM device WHERE uid = ?', [uid], function (err, deviceinfo) {
//         if (err) {
//             console.log(err);
//             res.redirect('/error');
//         } else {
//             console.log('BODY UID : ' + deviceinfo.uid);
//             res.render('./device/delete', { title: '장비 삭제', deletedb: deviceinfo });
//         }
//     });
// });

// router.post(['/:uid/delete'], function (req, res) {
//     var uid = req.params.uid;
//     console.log('POST DELETE ID : ' + uid);
//     db.run('DELETE FROM device WHERE uid = ?', [uid], function (err) {
//         if (err) {
//             console.log(err);
//             res.redirect('/error');
//         } else {
//             if (this.changes == 1) {
//                 db.run('DELETE FROM rental WHERE device_uid = ?', [uid], function (err) {
//                     if (err) {
//                         console.log(err);
//                         res.redirect('/error');
//                     } else {
//                         console.log('DELETE SUCCESS');
//                         res.redirect('/device')
//                     }
//                 });
//             }
//         }
//     });
// });

// router.get(['/:uid'], function (req, res) {
//     var uid = req.params.uid;
//     console.log('LIST UID : ' + uid);
//     db.get('SELECT * FROM device WHERE uid = ?', [uid], function (err, deviceinfo) {
//         if (err) {
//             console.log(err);
//             res.redirect('/error');
//         } else {
//             res.render('./device/info', { title: '장비 상세', infodb: deviceinfo });
//         }
//     });
// });

router.get(['/'], function (req, res) {
    Device.find({}, function (err, docs) {
        console.log(docs);
        res.render('./device/list', { title: '장비 목록', devicedb: docs });
    });
});

module.exports = router;
