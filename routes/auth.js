var express = require('express')
var router = express.Router()
var passport = require('../config/passport')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/device')
  })

module.exports = router
