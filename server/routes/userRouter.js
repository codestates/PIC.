const express = require('express');
const router = express.Router();

// middleware
const checkToken = require('../middleware/checkToken');
const controllers = require('../controllers/userController');


router.post('/mail', controllers.sendMail);
router.post('/', controllers.signup);
router.post('/login', controllers.login);
router.post('/oauth/google', controllers.oauthLogin);
router.get('/logout', controllers.logout);
router.get('/auth/token', controllers.refreshToken);
router.get('/:id', controllers.getUserInfo);
router.patch('/:id', checkToken, controllers.updateUserInfo);
router.delete('/:id', checkToken, controllers.deleteUser);
router.post('/email', controllers.checkEmail);
router.post('/nickname', controllers.checkNickname);
router.post('/:id/password', checkToken, controllers.checkPassword);


module.exports = router;