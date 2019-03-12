const express = require('express')
const router = express.Router()
const dateFormat = require('dateformat')
const Device = require('../config/devciedb')
const authorizationUser = require('../config/authorizationUser')

const now = new Date()

router.get('/:_id/rental', function (req, res) {
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
    let id = req.params._id
    let rentalUserName = req.user.name
    let userRoleID = req.user.role

    Device.findById(id, function (err, device) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.render('./rental/rental', {
        title: '장비 대여',
        rentalDB: device,
        retalUser: rentalUserName,
        roleID: userRoleID
      })
    })
  }
})

router.post('/:_id/rental', function (req, res) {
  let id = req.params._id
  let rentalUserName = req.user.name
  let rentalDate = dateFormat(now, 'yyyy-mm-dd HH:MM')

  Device.findById(id, function (err, device) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    device.rental.push({
      rental_user_name: rentalUserName,
      rental_dt: rentalDate,
      return_user_name: null,
      return_dt: null
    })
    device.save(function (err) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.redirect('/device')
    })
  })
})

router.get('/:_id/return', function (req, res) {
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
    let id = req.params._id
    let returnUserName = req.user.name
    let userRoleID = req.user.role

    Device.findById(id, function (err, device) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.render('./rental/return', {
        title: '장비 반납',
        returnDB: device,
        returnUser: returnUserName,
        roleID: userRoleID
      })
    })
  }
})

router.post('/:_id/return', function (req, res) {
  let id = req.params._id
  let returnUserName = req.user.name
  let returnDate = dateFormat(now, 'yyyy-mm-dd HH:MM')

  Device.findById(id, function (err, device) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    device.rental.push({
      rental_user_name: null,
      rental_dt: null,
      return_user_name: returnUserName,
      return_dt: returnDate
    })
    device.save(function (err) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.redirect('/device')
    })
  })
})

module.exports = router
