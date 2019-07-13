const express = require("express");
const leaderBoardRouter = require("./routes/leaderBoardRouter");
const syncRouter = require("./routes/syncRouter");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expresValidator = require("express-validator");
const cors = require("cors");
const auth = require("./auth");

mongoose.connect(
  'mongodb://rj:Miyoungrae123@ds135519.mlab.com:35519/assetr',
  { useNewUrlParser: true }
);

const app = express();

let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
let Player = require("./models/player");

app.use(express.static('../client/dist/walk2win'));
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

module.exports = app;
