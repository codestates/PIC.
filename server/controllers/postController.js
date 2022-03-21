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



module.exports = {
    uploadPost
}