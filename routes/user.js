var express = require('express');
var router = express.Router();
var router = express.Router();

var db = require('../config/database');

router.get('/', function (req, res) {
  db.all('SELECT * FROM user', function (err, userinfo) {
    if (err) {
      console.log(err);
      res.redirect('/error');
    } else {
      res.render('./user/list', { userdb: userinfo });
    }
  });
});

module.exports = router;
