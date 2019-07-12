let express = require('express');
let passport = require('passport');
let router = express.Router();
let syncController = require('../controllers/syncController');
let {checkToken} = require("../token-validator");

router.get('/api/v1/auth/google', passport.authenticate('google', { accessType: 'offline', prompt: 'consent', scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile' }));
router.get('/api/v2', (req, res) => { res.json({ a : "sada" }) });
//router.get('/api/v1/auth/google/callback', passport.authenticate('google', { failureRedirect: '/ch' }), syncController.authCb);
router.get('/api/v1/sync', syncController.syncSteps);

module.exports = router;