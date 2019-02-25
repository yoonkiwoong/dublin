const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)

const sessionDB = mongoose.createConnection(process.env.MONGODB_URL)

sessionDB.on('error', console.error)
sessionDB.once('open', function () {
  console.log('SESSION DB Connected')
})

module.exports = sessionDB
