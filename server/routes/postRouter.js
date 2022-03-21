const express = require('express');
const router = express.Router();

// middleware
const checkToken = require('../middleware/checkToken');
const controllers = require('../controllers/postController');

router.post('/content', checkToken, controllers.uploadPost);


module.exports = router;