require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('../models/team');
const Player = require('../models/player');

const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
fs.createReadStream(process.cwd() + '/data/data.csv')
    .pipe(csv({
        newline: '\n',
        separator: ','
    }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        insertToMongo(results);
    }
);



let insertToMongo = async (results) => {
    const db = await mongoose.connect(process.env.MONGO_STR, {useNewUrlParser: true});
    for(let row of results) {
        if(row['Participating as'] == 'Individual') {
            console.log('Inserting solo player');
            let gender = row['Gender'][0] == 'M' ? 'male' : 'female';
            await Player.collection.insertOne({
                team: null,
                gender: gender,
                points: 0,
                steps: 0,
                name: row['Name'],
                gmail: row['Email (Gmail)']
            });
        }
        else if(row['Participating as'] == 'Team'){
            console.log('Inserting team');
            let teamModel = {
                name: row['Team Name'],
                steps: 0,
                points: 0
            };
            let resp = await Team.collection.insertOne(teamModel);
            let genders = row['Gender'].split(' ');
            for(let i = 1; i <= 4; i++) {
                let nameKey = 'Member {N} Name{A}';
                let emailKey = 'Member {N} Email{A}';
                nameKey = nameKey.replace('{N}', i);
                emailKey = emailKey.replace('{N}', i);

                if(i == 1) {
                    nameKey = nameKey.replace('{A}', ' (Captain) ');
                    emailKey = emailKey.replace('{A}', ' (Captain)');
                }   
                else if(i == 2) {
                    nameKey = nameKey.replace('{A}', '  (Girl)');
                    emailKey = emailKey.replace('{A}', '  (Girl)');
                }
                else {
                    nameKey = nameKey.replace('{A}', '');
                    emailKey = emailKey.replace('{A}', '');
                }

                await Player.collection.insertOne({
                    team: resp.insertedId,
                    gender: genders[i - 1] == 'F' ? 'female' : 'male',
                    points: 0,
                    steps: 0,
                    name: row[nameKey],
                    gmail: row[emailKey]
                });
            }
        }
    }


    db.disconnect();


}


