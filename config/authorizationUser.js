function authorizationUser (req, res) {
  if (!req.user) {
    return false
  } else {
    return true
  }
}

module.exports = authorizationUser
