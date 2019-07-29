require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('../models/team');
const Player = require('../models/player');


let calcScores = async () => {
    const db = await mongoose.connect(process.env.MONGO_STR, {useNewUrlParser: true});
    // implement here;
    db.disconnect();


}

calcScores();
