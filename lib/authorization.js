const express = require('express')
const router = express.Router()
const User = require('../config/userdb')

function authorizationUser (req, res) {
  if (!req.user) {
    req.session.save
    return false
  } else {
    return true
  }
}

module.exports = authorizationUser
