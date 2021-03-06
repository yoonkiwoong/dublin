const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const autohorization = require('../config/authorization')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function (req, res) {
    res.redirect('/device')
  }
)

router.get('/login', function (req, res) {
  if (autohorization(req, res) === false) {
    req.session.save(function (err) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.render('./auth/login', { title: '로그인' })
    })
  }

  if (autohorization(req, res) === true) {
    res.redirect('/device')
  }
})

router.get('/device', function (req, res) {
  if (autohorization(req, res) === false) {
    req.session.save(function (err) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.render('./auth/login', { title: '로그인' })
    })
  }
  res.render('./auth/device', { title: '권한 없음' })
})

router.get('/user', function (req, res) {
  if (autohorization(req, res) === false) {
    req.session.save(function (err) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.render('./auth/login', { title: '로그인' })
    })
  }
  res.render('./auth/user', { title: '권한 없음' })
})

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
