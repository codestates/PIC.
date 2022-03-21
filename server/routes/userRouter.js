const express = require('express');
const router = express.Router();

// middleware
const checkToken = require('../middleware/checkToken');
const controllers = require('../controllers/userController');

router.get('/:id', controllers.getUserInfo);
router.patch('/:id', checkToken, controllers.updateUserInfo);


module.exports = router;