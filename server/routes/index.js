const express = require('express');
const router = express.Router();

// Routers
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const commentRouter = require('./commentRouter');
const hashtagsRouter = require('./hashtagsRouter');

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/hashtags', hashtagsRouter);

module.exports = router;