var mongoose = require('mongoose')
var userdb = mongoose.createConnection('mongodb://localhost/user')

userdb.on('error', console.error)
userdb.once('open', function () {
  console.log('USER DB Connected')
})

var Schema = mongoose.Schema

var userSchema = new Schema({
  google_id: { type: String },
  name: { type: String },
  email: { type: String },
  access_token: { type: String },
  refresh_token: { type: String },
  role: { type: Number, default: 2 }
})
var user = userdb.model('User', userSchema)

module.exports = user
