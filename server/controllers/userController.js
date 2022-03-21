const User = require('../models/User');
const asyncWrapper = require('../middleware/async');


// 사용자 정보 조회
const getUserInfo = asyncWrapper(async (req, res) => {
    const userInfo = await User.findById(req.params.id).select('-password');
    if (!userInfo) {
        res.status(400).json({ message: "fail : invalid user id" });
    } else {
        res.status(200).json({
            userInfo,
            message: "success"
        });
    }
})


// 사용자 정보 업데이트
const updateUserInfo = asyncWrapper(async (req, res) => {
    if (Object.keys(req.body).length === 0) { // nickname, password, image 셋 다 request에 없을 경우
        res.status(400).json({ message: "fail : require nickname or password or image" });
    } else {
        const userInfo = await User.findById(req.params.id);
        if (!userInfo) {
            res.status(400).json({ message: "fail : invalid user id" });
        } else {
            await User.updateOne({ _id: req.params.id }, req.body, {
                runValidators: true
            });
            res.status(200).json({ message: "success" });
        }
    }
})




module.exports = {
    getUserInfo,
    updateUserInfo
}