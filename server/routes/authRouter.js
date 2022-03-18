const express = require('express');
const router = express.Router();

// middleware
const controllers = require('../controllers/authController');

router.post('/mail', controllers.sendMail);
router.get('/signup', controllers.signup);

module.exports = router;