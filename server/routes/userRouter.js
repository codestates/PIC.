const express = require('express');
const router = express.Router();

// middleware
const controllers = require('../controllers/userController');

router.get('/:id', controllers.getUserInfo);


module.exports = router;