let express = require('express');
let router = express.Router();
let syncController = require('../controllers/syncController');

router.post('/api/v1/sync', syncController.syncSteps);


module.exports = router;