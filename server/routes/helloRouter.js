let express = require('express');
let router = express.Router();
let helloController = require('../controllers/helloController');

router.get('/api/v1/hello', helloController);

module.exports = router;