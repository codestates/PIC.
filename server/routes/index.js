const express = require('express');
const router = express.Router();

// Routers
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const commentRouter = require('./commentRouter');
const hashtagDataRouter = require('./hashtagDataRouter');

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/hashtag-data', hashtagDataRouter);

module.exports = router;