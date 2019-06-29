let express = require('express');
let router = express.Router();
let leaderBoardController = require('../controllers/leaderBoardController');

router.get('/api/v1/leaderboard/topteams', leaderBoardController.topTeams);
router.get('/api/v1/leaderboard/topplayers', leaderBoardController.topPlayers);
router.get('/api/v1/leaderboard/topmaleplayers', leaderBoardController.topMalePlayers);
router.get('/api/v1/leaderboard/topfemaleplayers', leaderBoardController.topFemalePlayers);

module.exports = router;