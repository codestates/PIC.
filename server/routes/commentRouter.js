const express = require('express');
const router = express.Router();

// middleware
const checkToken = require('../middleware/checkToken');
const controllers = require('../controllers/commentController');

router.post('/:id/comments', checkToken, controllers.addComment);


module.exports = router;