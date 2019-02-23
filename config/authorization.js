function authorizationUser (req) {
  if (!req.user) {
    return false
  } else {
    return true
  }
}

module.exports = authorizationUser
