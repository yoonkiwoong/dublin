var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database("./device.db");

module.exports = db;
