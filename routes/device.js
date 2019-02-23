const express = require('express')
const router = express.Router()
const Device = require('../config/devciedb')
const authorization = require('../config/authorization')

router.get('/add', function (req, res) {
  if (authorization(req, res) === false) {
    res.redirect('/')
  }

  let userRoleID = req.user.role

  res.render('./device/add', { roleID: userRoleID })
})

router.post('/add', function (req, res) {
  let device = new Device(
    {
      manufacturer: req.body.manufacturer,
      name: req.body.name,
      model: req.body.model,
      serial: req.body.serial,
      imei: req.body.imei,
      os_type: req.body.os_type,
      os_version: req.body.os_version,
      device_get_dt: req.body.get_dt,
      assetcode: req.body.assetcode,
      info: req.body.info,
      rental:
      [
        {
          rental_user_name: null,
          rental_dt: null,
          return_user_name: null,
          return_dt: null
        }
      ]
    }
  )

  device.save(function (err) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    console.log('DB INSERT DONE')
    res.redirect('/device')
  })
})

router.get('/:_id/edit', function (req, res) {
  if (authorization(req, res) === false) {
    res.redirect('/')
  }

  let id = req.params._id
  let userRoleID = req.user.role

  Device.findById(id, function (err, device) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    Device.distinct('manufacturer', function (err, deviceManufacturer) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      res.render('./device/edit', { title: '장비 수정', editDB: device, manufacturerDB: deviceManufacturer, roleID: userRoleID })
    })
  })
})

router.post('/:_id/edit', function (req, res) {
  console.log(req.params)
  let id = req.params._id

  Device.findByIdAndUpdate(
    id,
    {
      manufacturer: req.body.manufacturer,
      name: req.body.name,
      model: req.body.model,
      serial: req.body.serial,
      imei: req.body.imei,
      os_type: req.body.os_type,
      os_version: req.body.os_version,
      get_dt: req.body.get_dt,
      assetcode: req.body.assetcode,
      info: req.body.info
    },
    function (err) {
      if (err) {
        console.log(err)
        res.redirect('/error')
      }
      console.log(`DB UPDATED DONE`)
      res.redirect('/device/' + id)
    }
  )
})

router.get('/:_id/delete', function (req, res) {
  if (authorization(req, res) === false) {
    res.redirect('/')
  }

  let id = req.params._id
  let userRoleID = req.user.role

  Device.findById(id, 'name', function (err, device) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    res.render('./device/delete', { title: '장비 삭제', deleteDB: device, roleID: userRoleID })
  })
})

router.post('/:_id/delete', function (req, res) {
  let id = req.params._id

  Device.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    res.redirect('/device')
  })
})

router.get('/:_id', function (req, res) {
  if (authorization(req, res) === false) {
    res.redirect('/')
  }

  let id = req.params._id
  let userRoleID = req.user.role

  Device.findById(id, function (err, device) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    res.render('./device/info', {
      title: '장비 정보',
      infoDB: device,
      roleID: userRoleID })
  })
})

router.get('/', function (req, res) {
  if (authorization(req, res) === false) {
    res.redirect('/')
  }

  let userRoleID = req.user.role

  Device.find({}, function (err, device) {
    if (err) {
      console.log(err)
      res.redirect('/error')
    }
    res.render('./device/list', { title: '장비 목록', listDB: device, roleID: userRoleID })
  })
})

module.exports = router
