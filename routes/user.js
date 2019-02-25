const express = require('express')
const router = express.Router()
const User = require('../config/userdb')
const authorization = require('../config/authorization')

router.get('/:_id/edit', function (req, res) {
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
    let id = req.params._id
    let userRoleID = req.user.role

    if (userRoleID === 1) {
      User.findById(id, function (err, user) {
        if (err) {
          console.log(err)
          res.redirect('/error')
        }
        res.render('./user/edit', {
          title: '정보 수정',
          editDB: user,
          roleID: userRoleID
        })
      })
    } else {
      res.redirect('/auth/user')
    }
  }
})

router.post('/:_id/edit', function (req, res) {
  console.log(req.params)
  let id = req.params._id

  User.findByIdAndUpdate(id, { name: req.body.name }, function (err) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    console.log(`DB UPATED DONE`)
    res.redirect('/user')
  })
})

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

    User.find({}, function (err, user) {
      if (err) {
        res.redirect('/')
      }
      res.render('./user/list', {
        title: '사용자 목록',
        userDB: user,
        roleID: userRoleID
      })
    })
  }
})

module.exports = router
