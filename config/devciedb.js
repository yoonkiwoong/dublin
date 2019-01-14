var mongoose = require('mongoose');

var deviceSchema = new mongoose.Schema({
    _id: { type: Number, require: true, unique: true },
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
    serial: { type: String, required: true },
    iemi: { type: String, required: true },
    ostype: { type: String, required: true },
    osversion: { type: String, required: true },
    get_dt: { type: Date, required: true },
    assetcode: { type: String, required: true },
    info: { type: String, required: true },
    rental: [
        {
            rental_user_name: { type: String, default: null },
            rental_dt: { type: Date, default: null }
        }
    ],
    return: [
        {
            return_user_name: { type: String, default: null },
            return_dt: { type: Date, default: null }
        }
    ]
});

module.exports = mongoose.model('Device', deviceSchema);
