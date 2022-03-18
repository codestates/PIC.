const express = require('express');
const router = express.Router();

// middleware
const controllers = require('../controllers/authController');

router.get('/', controllers.temp)

module.exports = router;