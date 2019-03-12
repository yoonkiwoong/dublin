const express = require('express')
const router = express.Router()
const authorizationUser = require('../config/authorizationUser')

router.get('/', function (req, res) {
  if (authorizationUser(req, res) === false) {
    req.session.save(function (err) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.redirect('/auth/login')
    })
  }

  if (authorizationUser(req, res) === true) {
    let userID = req.user._id
    let userRoleID = req.user.role

    res.render('index', {
      title: 'DUBLIN',
      id: userID,
      roleID: userRoleID
    })
  }
})

module.exports = router
