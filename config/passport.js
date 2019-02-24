const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../config/userdb')

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      return done(err)
    }
    done(null, user)
  })
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3030/auth/google/callback'
},
function (accessToken, refreshToken, profile, done) {
  User.findOne({ google_id: profile.id }, function (err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      let user = new User(
        {
          google_id: profile.id,
          name: profile.displayName,
          access_token: accessToken,
          refresh_token: refreshToken,
          email: profile.emails[0].value
        }
      )

      user.save(function (err) {
        if (err) {
          return done(err)
        }
        console.log('DB INSERT DONE')
        return done(null, user)
      })
    }
    return done(null, user)
  })
}))

module.exports = passport
