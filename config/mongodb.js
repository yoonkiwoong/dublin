var mongoose = require('mongoose');

var mongodb = 'mongodb://localhost/device';

var mdb = mongoose.connect(mongodb);

module.exports = mdb;
