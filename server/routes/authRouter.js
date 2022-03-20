const express = require('express');
const router = express.Router();

// middleware
const checkToken = require('../middleware/checkToken');
const controllers = require('../controllers/authController');

router.post('/mail', controllers.sendMail);
router.post('/signup', controllers.signup);
router.delete('/signout', checkToken, controllers.signout);
router.post('/login', controllers.login);
router.post('/oauth/google', controllers.oauthLogin);
router.get('/logout', controllers.logout);
router.get('/refresh-token', controllers.refreshToken);



module.exports = router;