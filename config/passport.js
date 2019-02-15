const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../config/userdb')

let app = express()

app.use(session({
  secret: 'pr0ject-dub1in',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: User })
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
  console.log('serializeUser', user)
  done(null, user.google_id)
})

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser', id)
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3030/auth/google/callback'
},
function (accessToken, refreshToken, profile, done) {
  User.findOne({ googleId: profile.id }, function (err, user) {
    console.log(user)
    if (err) {
      return done(err)
    }
    if (!user) {
      let user = new User()

      user.googleId = profile.id
      user.name = profile.displayName
      user.access_token = accessToken
      user.email = profile.emails[0].value

      user.save(function (err) {
        if (err) {
          return done(err)
        }
        console.log('DB INSERT DONE')
        return done(null, user)
      })
    }
    return done(err, user)
  })
}))

module.exports = passport
