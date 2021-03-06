const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)

const devicedb = mongoose.createConnection(process.env.MONGODB_URL)

devicedb.on('error', console.error)
devicedb.once('open', function () {
  console.log('DEVICE DB Connected')
})

const Schema = mongoose.Schema

const rentalSchema = new Schema({
  rental_user_name: { type: String },
  rental_dt: { type: Date },
  return_user_name: { type: String },
  return_dt: { type: Date }
})

const deviceSchema = new Schema({
  manufacturer: { type: String, required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  serial: { type: String, required: true },
  imei: { type: String, required: true },
  os_type: { type: String, required: true },
  os_version: { type: String, required: true },
  get_dt: { type: Date },
  assetcode: { type: String },
  info: { type: String },
  rental: [ rentalSchema ]
})

const device = devicedb.model('Device', deviceSchema)

module.exports = device
