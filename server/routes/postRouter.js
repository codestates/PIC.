const express = require('express');
const router = express.Router();

// middleware
const checkToken = require('../middleware/checkToken');
const controllers = require('../controllers/postController');

router.post('/', checkToken, controllers.uploadPost);
router.get('/:id', controllers.getSinglePost);
router.get('/', controllers.getAllPosts);
router.patch('/:id', checkToken, controllers.updatePost);


module.exports = router;