var express = require('express')
var router = express.Router()
var passport = require('../config/passport')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/device')
  }
)

router.get('/logout', function (req, res) {
  req.logout()
  req.session.save(function (err) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    res.redirect('/')
  })
})

module.exports = router
