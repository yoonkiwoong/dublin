const express = require('express')
const router = express.Router()
const format = require('date-format')
const Device = require('../config/devciedb')

router.get('/:_id/rental', function (req, res) {
  let id = req.params._id
  let rentalUserName = req.user.name
  console.log(`RENTAL USER NAME : ${rentalUserName}`)

  Device.findById(id, function (err, device) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    res.render('./rental/rental', { title: '장비 대여', rentalDB: device, retalUser: rentalUserName })
  })
})

router.post(['/:_id/rental'], function (req, res) {
  let id = req.params._id
  let rentalUserName = req.user.name
  let rentalDate = format.asString('yyyy-MM-dd hh:mm', new Date())

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
      res.redirect('/rental')
    })
  })
})

router.get('/:_id/return', function (req, res) {
  let id = req.params._id
  let returnUserName = req.user.name

  Device.findById(id, function (err, device) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    res.render('./rental/return', { title: '장비 반납', returnDB: device, returnUser: returnUserName })
  })
})

router.post('/:_id/return', function (req, res) {
  let id = req.params._id
  let returnUserName = req.user.name
  let returnDate = format.asString('yyyy-MM-dd hh:mm', new Date())

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
      res.redirect('/rental')
    })
  })
})

router.get('/', function (req, res) {
  console.log(`USER : ${req.user}`)

  Device.find({}, function (err, device) {
    // console.log(device[0].rental.length)
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    res.render('./rental/list', { title: '대여 목록', listDB: device })
  })
})

module.exports = router
