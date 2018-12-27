var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database("./device.db");

router.get(['/', '/:id'], function (req, res) {
    db.all("SELECT id, title FROM sample", function (err, rows) {
        res.render('./device/list', { lists: rows });
    });
});

module.exports = router;
