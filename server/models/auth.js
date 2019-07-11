const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authSchema = new mongoose.Schema({
    user_id: String,
    refresh_token: String,
    gmail: String
});

module.exports = mongoose.model('Auth', authSchema);