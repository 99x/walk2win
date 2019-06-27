require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('../models/team');
const Player = require('../models/player');
const teams = [
    {
        name: 'CodeMasters',
        players: [
            {
                name: 'Amal',
                gmail: 'amal@gmail.com',
                gender: 'male'
            },
            {
                name: 'Amali',
                gmail: 'amali@gmail.com',
                gender: 'female'
            }
        ]
    },
    {
        name: 'Xmasters',
        players: [
            {
                name: 'Ron',
                gmail: 'ron@gmail.com',
                gender: 'male'
            },
            {
                name: 'Ama',
                gender: 'female',
                gmail: 'ama@gmail.com'
            }
        ]
    }
];


(async function() {
    const db = await mongoose.connect(process.env.MONGO_STR, {useNewUrlParser: true});

    for (let team of teams) {
        let teamModel = {
            name: team.name,
            steps: 0,
            points: 0
        };
        let resp = await Team.collection.insertOne(teamModel);
        console.log("Saved team - " + team.name);
        let playersModel = team.players.map(e => ({
            team: resp.insertedId,
            name: e.name,
            gmail: e.gmail,
            gender: e.gender,
            steps: 0,
            points: 0
        }));
        await Player.collection.insertMany(playersModel);
        console.log("Saved team players - " + team.players.map(e => e.name));
        console.log("......");
    }



    db.disconnect();


})();


