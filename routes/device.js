var express = require('express');
var router = express.Router();
var Device = require('../config/devciedb');

router.get(['/add'], function (req, res) {
    res.render('./device/add');
});

router.post(['/add'], function (req, res) {

    var device = new Device();

    device.manufacturer = req.body.manufacturer;
    device.name = req.body.name;
    device.model = req.body.model;
    device.serial = req.body.serial;
    device.imei = req.body.imei;
    device.os_type = req.body.os_type;
    device.os_version = req.body.os_version;
    device.device_get_dt = req.body.get_dt;
    device.assetcode = req.body.assetcode;
    device.info = req.body.info;

    device.save(function (err) {
        console.log("DB INSERT DONE");
        res.redirect('/device/add');
    });
});

router.get(['/:_id/edit'], function (req, res) {
    var id = req.params._id;
    console.log('EDIT GET ID : ' + id);

    Device.findById(id, function (err, editDb) {
        console.log("EDIT DB " + "\n" + editDb);
        Device.distinct('manufacturer', function (err, manufacturerDb) {
            console.log("MANUFACTURER LIST : " + manufacturerDb);
            res.render('./device/edit', { title: '장비 수정', editInfo: editDb, manufacturerInfo: manufacturerDb });
        });
    });
});

router.post(['/:_id/edit'], function (req, res) {
    var id = req.params._id;

    var manufacturer = req.body.manufacturer;
    var name = req.body.name;
    var model = req.body.model;
    var serial = req.body.serial;
    var imei = req.body.imei;
    var os_type = req.body.os_type;
    var os_version = req.body.os_version;
    var get_dt = req.body.get_dt;
    var assetcode = req.body.assetcode;
    var info = req.body.info;

    Device.findByIdAndUpdate(
        id,
        {
            manufacturer: manufacturer,
            name: name,
            model: model,
            serial: serial,
            imei: imei,
            os_type: os_type,
            os_version: os_version,
            get_dt: get_dt,
            assetcode: assetcode,
            info: info
        },
        function (err) {
            res.redirect('/device/' + id);
        }
    );
});

router.get(['/:_id/delete'], function (req, res) {
    var id = req.params._id;
    console.log('DELETE GET UID : ' + id);

    Device.findById(id, 'name', function (err, deleteDb) {
        console.log('DELETE DB : ' + deleteDb);
        res.render('./device/delete', { title: '장비 삭제', deleteInfo: deleteDb });
    });
});

router.post(['/:_id/delete'], function (req, res) {
    var id = req.params._id;
    console.log('POST DELETE ID : ' + id);

    Device.findByIdAndDelete(id, function (err) {
        res.redirect('/device');
    });
});

router.get(['/:_id'], function (req, res) {
    var id = req.params._id;
    console.log('LIST ID : ' + id);

    Device.findOne({ _id: id }, function (err, Device) {
        console.log("INFO DB : " + "\n" + Device);
        res.render('./device/info', { title: '장비 정보', infodb: Device });
    });
});

router.get(['/'], function (req, res) {
    Device.find({}, function (err, docs) {
        console.log("LIST DB : " + "\n" + docs);
        res.render('./device/list', { title: '장비 목록', devicedb: docs });
    });
});

module.exports = router;
