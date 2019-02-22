const express = require('express')
const router = express.Router()
const User = require('../config/userdb')

router.get('/', function (req, res) {
  User.find({}, function (err, user) {
    if (err) {
      res.redirect('/')
    }
    res.render('./user/list', { title: '사용자 목록', userDB: user })
  })
})

module.exports = router
