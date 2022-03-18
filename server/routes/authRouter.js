const express = require('express');
const router = express.Router();

// middleware
const controllers = require('../controllers/authController');

router.post('/mail', controllers.sendMail);
router.post('/signup', controllers.signup);
router.delete('/signout', controllers.signout);
router.post('/login', controllers.login);


module.exports = router;