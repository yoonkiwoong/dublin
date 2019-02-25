const express = require('express')
const router = express.Router()
const authorization = require('../config/authorization')

router.get('/', function (req, res) {
  if (authorization(req, res) === false) {
    req.session.save(function (err) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.redirect('/auth/login')
    })
  }

  if (authorization(req, res) === true) {
    let userRoleID = req.user.role
    res.render('index', { title: 'DUBLIN', roleID: userRoleID })
  }
})

module.exports = router
