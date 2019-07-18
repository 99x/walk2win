let auth = require("./auth");
let Player = require("./models/player");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    auth.googleAuth.clientID,
    auth.googleAuth.clientSecret,
    auth.googleAuth.callbackURL
);

google.options({
    auth: oauth2Client
});

module.exports = async function (accessToken, refreshToken) {
    oauth2Client.credentials = {
        access_token: accessToken,
        refresh_token: refreshToken
    };

    let fitness = google.fitness("v1");
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let dayStart = Date.parse(today);

    today.setHours(23, 59, 59);
    let dayEnd = Date.parse(today);

    const res = await fitness.users.dataset.aggregate({
        userId: "me",
        requestBody: {
            aggregateBy: [
                {
                    dataTypeName: "com.google.step_count.delta"
                }, {
                    dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                }
            ],
            bucketByTime: {
                durationMillis: 86400000
            },
            startTimeMillis: dayStart,
            endTimeMillis: dayEnd
        }
    });


    return res.data.bucket[0].dataset[0].point[0].value[0].intVal
}