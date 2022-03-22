const Post = require('../models/Post');
const asyncWrapper = require('../middleware/async');
const verifyToken = require('../utils/verifyToken');


// 게시글 업로드
const uploadPost = asyncWrapper(async (req, res) => {
    const { title, photo, location } = req.body;
    if (title && photo && location) {
        const data = verifyToken(req.headers.authorization, 'accessToken');
        req.body.author = data.id;
        await Post.create(req.body);
        res.status(201).json({ message: "success" });
    } else {
        res.status(400).json({ message: "fail : all required fields are not filled in" });
    }
})


// 해당 게시글 조회
const getSinglePost = asyncWrapper(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(400).json({ message: "fail : invalid post id" });
    } else {
        res.status(200).json({
            post,
            message: "success"
        })
    }
})



module.exports = {
    uploadPost,
    getSinglePost
}