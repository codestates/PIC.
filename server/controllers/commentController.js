const Post = require('../models/Post');
const Comment = require('../models/Comment');
const asyncWrapper = require('../middleware/async');
const verifyToken = require('../utils/verifyToken');


// 게시물에 댓글 추가
const addComment = asyncWrapper(async (req, res) => {
    const { description } = req.body;
    const userId = verifyToken(req.headers.authorization, 'accessToken').id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!description) {
        res.status(400).json({ message: "fail : require description" });
    } else if (!post) {
        res.status(400).json({ message: "fail : there's no post with the id" });
    } else {
        const newInfo = {
            author: userId,
            description
        }
        // DB에 댓글 추가 및 게시글 업데이트
        const comment = await Comment.create(newInfo);
        const newCommentsArray = post.comment;
        newCommentsArray.push(comment._id);
        await Post.updateOne({ _id: postId }, {
            comment: newCommentsArray
        })
        res.status(201).json({ message: "success" });
    }
})


// 게시물의 댓글 조회
const readComment = asyncWrapper(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(400).json({ message: "fail : there's no post with the id" });
    } else {
        const postComments = post.comment;
        const allComments = await Comment.find();
        const filteredComments = allComments.filter(e => postComments.includes(e._id));
        res.json({
            comments: filteredComments,
            message: "success"
        })
    }
})


module.exports = {
    addComment,
    readComment
}