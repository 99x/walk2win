let express = require('express');
let router = express.Router();
let teamController = require('../controllers/teamController');

router.get('/api/v1/teams', teamController.top);

module.exports = router;