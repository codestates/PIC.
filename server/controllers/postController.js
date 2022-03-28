const Post = require('../models/Post');
const User = require('../models/User');
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
        res.status(400).json({ message: "fail : there's no post with the id" });
    } else {
        res.status(200).json({
            post,
            message: "success"
        })
    }
})


// 필터링 후 모든 게시글 조회
const getAllPosts = asyncWrapper(async (req, res) => {
    const { like, date, hashtags } = req.query;
    if (like && date) {
        res.status(400).json({ message: "fail : please request one option - like or date" });
    } else {
        let posts = await Post.find();
        const filter = {};
        if (hashtags) {
            filter.hashtags = hashtags.slice(1, hashtags.length - 1).split(',').map(e => e[0] === " " ? e.slice(1) : e)
            posts = posts.filter(post => isSubsetOf(post.hashtags, filter.hashtags));
        }
        if (like) {
            posts.sort((a, b) => b.likes.length - a.likes.length);
        } else if (date) {
            posts.sort((a, b) => b.createdAt - a.createdAt);
        }
        res.status(200).json({
            posts,
            message: "success"
        })
    }

    // 부분집합 여부 확인하는 함수
    function isSubsetOf(base, sample) {
        base.sort();
        sample.sort();
        const findItemInSortedArr = (item, arr, from) => {
            for (let i = from; i < arr.length; i++) {
                if (item === arr[i]) return i;
            }
            return -1;
        };

        let baseIdx = 0;
        for (let i = 0; i < sample.length; i++) {
            baseIdx = findItemInSortedArr(sample[i], base, baseIdx);
            if (baseIdx === -1) {
                return false;
            }
        }
        return true;
    };
})


// 게시글 업데이트
const updatePost = asyncWrapper(async (req, res) => {
    const { newTitle, newDescription, newPhoto, newLocation, newHashtags } = req.body;
    if (newTitle || newDescription || newPhoto || newLocation || newHashtags) {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(400).json({ message: "fail : there's no post with the id" });
        } else {
            const newInfo = {
                title: newTitle,
                description: newDescription,
                photo: newPhoto,
                location: newLocation,
                hashtags: newHashtags
            };
            await Post.updateOne({ _id: req.params.id }, newInfo, {
                runValidators: true
            });
            res.status(200).json({ message: "success" });
        }
    } else { // request의 body에 수정할 값이 하나도 들어있지 않을 경우
        res.status(400).json({ message: "fail : none of the fields are in the request" });
    }
})


// 게시글 삭제
const deletePost = asyncWrapper(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(400).json({ message: "fail : there's no post with the id" });
    } else {
        await Post.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "success" })
    }
})


// 게시글 좋아요 토글
const toggleLike = asyncWrapper(async (req, res) => {
    const userId = verifyToken(req.headers.authorization, 'accessToken').id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const userInfo = await User.findById(userId);
    if (!post) {
        res.status(400).json({ message: "fail : there's no post with the id" });
    } else {
        const oldLikesArray = post.likes;
        let newLikesArray;
        const oldFavoriteArray = userInfo.favorite;
        let newFavoriteArray;
        if (oldLikesArray.includes(userId)) {
            newLikesArray = oldLikesArray.filter(e => e.toString() !== userId);
            newFavoriteArray = oldFavoriteArray.filter(e => e.toString() !== postId);
        } else {
            oldLikesArray.push(userId);
            newLikesArray = oldLikesArray;
            oldFavoriteArray.push(postId);
            newFavoriteArray = oldFavoriteArray;
        }
        // DB에 추가
        await Post.updateOne({ _id: postId }, {
            likes: newLikesArray
        })
        await User.updateOne({ _id: userId }, {
            favorite: newFavoriteArray
        })
        res.status(200).json({ message: "success" });
    }
});


module.exports = {
    uploadPost,
    getSinglePost,
    getAllPosts,
    updatePost,
    deletePost,
    toggleLike
}