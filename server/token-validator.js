const Player = require("./models/player");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const auth = require("./auth");
const moment = require("moment");

// create auth client
const oauth2Client = new OAuth2(
  auth.googleAuth.clientID,
  auth.googleAuth.clientSecret,
  auth.googleAuth.callbackURL
);

exports.checkToken = (req, res, next) => {
  // check for user
  console.log("HERE");
  if(!req.headers.authorization) {
    return next();
  }

  const oauthAccessToken = req.headers.authorization.split("Bearer ")[1];
  if (!oauthAccessToken) {
    return next();
  }

  console.log(oauthAccessToken);
  Player.findOne({ accessToken: oauthAccessToken }, (error, player) => {
    if(error) {
        return next(error);
    }

    if(!player) {
        console.log("Invalid OAuth access token");
        return next();
    }

    // subtract current time from stored expiry_date and see if less than 5 minutes (300s) remain
    const expiryDate = player.expiry_date;
    const expSecs = moment().diff(expiryDate, 's');

    next();
    if (
        expSecs > -300
    ) {
      // set the current users access and refresh token
      oauth2Client.setCredentials({
        access_token: player.accessToken,
        refresh_token: player.refreshToken
      });

      // request a new token
      oauth2Client.refreshAccessToken(function(err, tokens) {
        if (err) return next(err);

        //save the new token and expiry_date
        Player.findOneAndUpdate(
          { "googleId": player.googleId },
          {
            "accessToken": tokens.access_token,
            "expiry_date": tokens.expiry_date
          },
          {
            new: true,
            runValidators: true
          },
          function(err, doc) {
            if (err) return next(err);
            next();
          }
        );
      });
    }
  });
};

exports.oauth2Client = oauth2Client;