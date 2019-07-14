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
  if(!req.headers.authorization) {
    res.json({
      error: true,
      tokenRefreshed: false,
      message: "Authorization header not found",
      loginRedirect: true
    });
    return;
    // return next("Auth header not found", null);
  }
  if(!req.headers.gmail) {
    res.json({
      error: true,
      tokenRefreshed: false,
      message: "Gmail header not found",
      loginRedirect: true
    });
    return;
    // return next("Auth header not found", null);
  }

  const oauthAccessToken = req.headers.authorization.split("Bearer ")[1];
  const gmail = req.headers.gmail;
  console.log(oauthAccessToken, gmail);
  if (!oauthAccessToken) {
    return next();
  }

  Player.findOne({ gmail: gmail, accessToken: oauthAccessToken }, (error, player) => {
    if(error) {
        return next(error);
    }

    console.log("Player", player);

    if(!player) {
        console.log("Invalid OAuth access token");
        return res.json({
          error: true,
          message: "Player not found, please login",
          tokenRefreshed: false,
          loginRedirect: true
        });
    }

    // subtract current time from stored expiry_date and see if less than 5 minutes (300s) remain
    const expiryDate = player.expiry_date;
    const expSecs = moment().diff(expiryDate, 's');


    console.log("Here")
    console.log("Expiring in", expiryDate, expSecs);
    console.log("After");
    if (
        expSecs > -300
    ) {
      console.log("Refreshing access token");
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
            return res.json({
              error: false,
              tokenRefreshed: true,
              token: tokens.access_token
            });
          }
        );
      });
    }
    else {
      next();
    }
  });
};

exports.oauth2Client = oauth2Client;