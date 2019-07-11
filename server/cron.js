let Player = require("./models/player");
const { google } = require("googleapis");

let fitness = google.fitness("v1");
// fitness.users.dataSources.datasets.get(
//   { userId: "112734178814973063458", dataSourceId: dataSourceId, datasetId: dt.getTimeDaily() },
//   function(err, response) {
//     // console.log("ABC: ");
//     // console.log(JSON.stringify(err, null, 2));
//     // if (err) callback(err, null);
//     // callback(null, response);
//     console.log(err);
//     console.log(response);
//   }
// );

fitness.users.sessions.list({ userId: "112734178814973063458"}, (err, data) => {
    console.log(err);
    console.log(data);
})