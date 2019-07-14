let express = require('express');
let passport = require('passport');
let router = express.Router();

router.get('/api/v1/auth/google', passport.authenticate('google', { accessType: 'offline', prompt: 'consent', scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile' }));

module.exports = router;