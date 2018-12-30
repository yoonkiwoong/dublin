var express = require('express');
var router = express.Router();
var router = express.Router();

var db = require('../config/database');

router.get(['/add'], function (req, res) {
  res.render('./user/add', { title: '사용자 추가' });
});

router.post(['/add'], function (req, res) {
  var user_name = req.body.user_name;
  var user_ldap = req.body.user_ldap;
  var user_email = req.body.user_email;

  db.run('INSERT INTO user (user_name, user_ldap, user_email) VALUES (?, ?, ?)', [user_name, user_ldap, user_email], function (err) {
    if (err) {
      console.log(err);
      res.redirect('/error');
    } else {
      res.redirect('/user');
    }
  });
});

router.get('/', function (req, res) {
  db.all('SELECT * FROM user', function (err, userinfo) {
    if (err) {
      console.log(err);
      res.redirect('/error');
    } else {
      res.render('./user/list', { title: '사용자 목록', userdb: userinfo });
    }
  });
});

module.exports = router;
