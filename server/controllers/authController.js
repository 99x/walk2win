let Auth = require('../models/auth');
const constants = require('../constants');

module.exports.getRefreshToken = (req, res) => {
    Auth.find({gmail: ""}, async (err, resp) => {
        
    });
}
