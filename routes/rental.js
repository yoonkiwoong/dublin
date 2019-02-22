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
    let uid = device.rental[0].uid
    console.log(uid)
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
    // var device_uid = req.params.uid;
    // var user_uid = req.body.user_uid;
    // var rental_dt = format.asString('yyyy-MM-dd hh:mm', new Date());

    // db.run('UPDATE rental SET device_uid = ?, user_uid = ?, rental_dt = ?, return_dt = null WHERE device_uid = ?', [device_uid, user_uid, rental_dt, device_uid], function (err) {
    //     if (err) {
    //         console.log(err)
    //         res.redirect('/error');
    //     } else if (this.changes == 0) {
    //         console.log("RENTAL DB UPDATE FAIL");
    //         res.redirect('/rental');
    //     } else if (this.changes == 1) {
    //         console.log("RENTAL DB UPDATED");
    //         res.redirect('/rental');
    //     }
    // });
})

// router.get(['/:uid/return'], function (req, res) {
//     var uid = req.params.uid;
//     db.get('SELECT uid, device_name FROM device WHERE uid = ?', [uid], function (err, devicedb) {
//         if (err) {
//             console.log(err);
//             res.redirect('/error');
//         } else {
//             res.render('./rental/return', { title: '장비 반납', deviceinfo: devicedb });
//         }
//     });
// });

// router.post(['/:uid/return'], function (req, res) {
//     var device_uid = req.params.uid;
//     var user_uid = req.body.return_user;
//     var return_dt = format.asString('yyyy-MM-dd hh:mm', new Date());

//     db.run('UPDATE rental SET device_uid = ?, user_uid = ?, rental_dt = null, return_dt = ? WHERE device_uid = ?', [device_uid, user_uid, return_dt, device_uid], function (err) {
//         if (err) {
//             console.log(err)
//             res.redirect('/error');
//         } else if (this.changes == 0) {
//             console.log("RETURN DB UPDATE FAIL");
//             res.redirect('/rental');
//         } else if (this.changes == 1) {
//             console.log("RETURN DB UPDATED");
//             res.redirect('/rental');
//         }
//     });
// });

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
