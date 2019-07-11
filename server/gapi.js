const { google } = requrie("googleapis");
const auth = require("./auth");

// const defaultScope = [
//   'https://www.googleapis.com/auth/plus.me',
//   'https://www.googleapis.com/auth/userinfo.email',
//   'https://www.googleapis.com/auth/fitness.activity.read',
// ];

let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: auth.clientID,
      clientSecret: auth.clientSecret,
      callbackURL: auth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      done();
    }
  )
);
