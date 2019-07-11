const express = require("express");
const leaderBoardRouter = require("./routes/leaderBoardRouter");
const syncRouter = require("./routes/syncRouter");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expresValidator = require("express-validator");
const cors = require("cors");
const auth = require("./auth");

mongoose.connect(
  process.env.MONGO,
  { useNewUrlParser: true }
);

const { oauth2Client } = require("./token-validator");


// const oauth2Client = new google.auth.OAuth2(
//   auth.googleAuth.clientID,
//   auth.googleAuth.clientSecret,
//   auth.googleAuth.callbackURL
// );

const app = express();

let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
let Player = require("./models/player");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: auth.googleAuth.clientID,
      clientSecret: auth.googleAuth.clientSecret,
      callbackURL: auth.googleAuth.callbackURL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, params, profile, done) {
      console.log(refreshToken);
      //console.log(params);
      // console.log(profile);
      const googleId = profile.id;
      const gmail = profile.emails[0].value;
      const name = `${profile.name.givenName} ${profile.name.familyName}`;

      Player.findOne(
        {
          googleId
        },
        function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new Player({
              googleId,
              name,
              gmail,
              accessToken,
              refreshToken,
              expiry_date: new Date()
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);

app.use(bodyParser.json());

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  "https://www.googleapis.com/auth/blogger",
  "https://www.googleapis.com/auth/calendar"
];

app.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // fitness.users.dataSources.datasets.get({ 'userId': 'me', 'dataSourceId': dataSourceId, 'datasetId': dt.getTimeDaily()}, function(err, response)
    //     {
    //         console.log("ABC: ");
    //         console.log(JSON.stringify(err, null, 2));
    //         if(err) callback(err, null);
    //         callback(null, response);
    //     });

    res.json({ status: "Ok" });
    //res.redirect('/');
  }
);

app.use(cors());
app.use(expresValidator());
app.use(leaderBoardRouter);
app.use(syncRouter);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
const server = require("./cron");

module.exports = app;
