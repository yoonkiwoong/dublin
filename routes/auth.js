var express = require('express');
var router = express.Router();
var passport = require('passport');

var app = express();

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
});

passport.deserializeUser(function (id, done) {
    console.log('deserializeUser', id);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        var checkProfile = JSON.stringify(profile);
        console.log("Profile : " + checkProfile);
        var displayname = profile.displayName;
        console.log("DisplayName : " + displayname);
        var email = profile.emails[0].value;
        console.log("Email : " + email);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
    }
));

router.get(
    ['/google'],
    passport.authenticate(
        'google', { scope: ['profile', 'email'] }
    )
);

router.get(
    ['/google/callback'],
    passport.authenticate(
        'google', { failureRedirect: '/index' }
    ),
    function (req, res) {
        res.redirect('/index');
    }
);

module.exports = router;
