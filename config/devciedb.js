var mongoose = require('mongoose')
var devicedb = mongoose.createConnection('mongodb://localhost/device')

devicedb.on('error', console.error)
devicedb.once('open', function () {
  console.log('DEVICE DB Connected')
})

var Schema = mongoose.Schema

var deviceSchema = new Schema({
  manufacturer: { type: String, required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  serial: { type: String, required: true },
  imei: { type: String, required: true },
  os_type: { type: String, required: true },
  os_version: { type: String, required: true },
  get_dt: { type: Date, default: null },
  assetcode: { type: String, default: null },
  info: { type: String, default: null },
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
})
var device = devicedb.model('Device', deviceSchema)

module.exports = device
