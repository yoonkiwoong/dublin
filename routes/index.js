const express = require('express')
const router = express.Router()
const authorization = require('../config/authorization')

router.get('/', function (req, res) {
  if (authorization(req, res) === false) {
    res.render('index', { title: 'DUBLIN' })
  } else {
    res.redirect('./device')
  }
})

module.exports = router
