const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)

const userdb = mongoose.createConnection(process.env.MONGODB_URL)

userdb.on('error', console.error)
userdb.once('open', function () {
  console.log('USER DB Connected')
})

const Schema = mongoose.Schema

const userSchema = new Schema({
  google_id: { type: String },
  name: { type: String },
  email: { type: String },
  access_token: { type: String },
  refresh_token: { type: String },
  ldap: { type: String, default: null },
  role: { type: Number, default: 2 }
})
const user = userdb.model('User', userSchema)

module.exports = user
