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


module.exports = {
    getUserInfo
}