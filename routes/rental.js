const express = require('express')
const router = express.Router()
const dateFormat = require('dateformat')
const Device = require('../config/devciedb')

const now = new Date()

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
