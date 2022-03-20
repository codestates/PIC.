require('dotenv').config();
const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const findWithPassword = require('../utils/findWithPassword');
const generateToken = require('../utils/generateToken');
const verifyToken = require('../utils/verifyToken');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);


/********** Auth Number **********/
let authNum;


// 이메일 인증
const sendMail = asyncWrapper(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.json({ message: "require email" })
    } else {
        authNum = String(Math.random()).split('').slice(2, 8).join('');
        let emailTemplate;
        ejs.renderFile(appDir + '/template/authMail.ejs', { authCode: authNum }, function (err, data) {
            if (err) throw err;
            emailTemplate = data;
        })

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        let mailOptions = {
            from: 'PIC.',
            to: email,
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplate
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            res.json({
                authNum: authNum,
                message: "success"
            })
            transporter.close();
        })
    }
})


// 회원 가입
const signup = asyncWrapper(async (req, res) => {
    const { email, password, nickname } = req.body;
    if (email && password && nickname) {
        await User.create(req.body);
        res.status(201).json({ message: "success" });
    } else {
        res.status(400).json({ message: "fail : require email, password, and nickname" });
    }
})


// 회원 탈퇴
const signout = asyncWrapper(async (req, res) => {
    const data = verifyToken(req.headers.authorization, 'accessToken');
    await User.findOneAndDelete({ _id: data.id });
    res.status(200).json({ message: "success" })
})


// 일반 로그인
const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const userInfo = await findWithPassword({ email }, password);
        if (!userInfo) { // 해당 User가 없는 경우
            res.status(400).json({ message: "fail : there is no user with that email and password" })
        } else {
            const accessToken = generateToken(userInfo, 'accessToken');
            const refreshToken = generateToken(userInfo, 'refreshToken');
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/api/refresh-token',
                maxAge: 60 * 60 * 24 * 7
            })

            res.json({
                _id: userInfo._id,
                accessToken,
                message: "success"
            })
        }
    } else { // email과 password가 둘 중 하나라도 요청에 있지 않은 경우
        res.status(400).json({ message: "fail : require email and password" })
    }
})


// OAuth 2.0 로그인
const oauthLogin = asyncWrapper(async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) { // id token이 전달되지 않았을 경우
        res.status(400).json({ message: "fail : require idToken" })
    } else {
        const { OAuth2Client } = require("google-auth-library");
        const CLIENT_ID = process.env.CLIENT_ID;
        const client = new OAuth2Client(CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.CLIENT_ID,
            });
            const payload = ticket.getPayload();
        }
        verify().catch(console.error);
    }
})


// 로그아웃
const logout = asyncWrapper(async (req, res) => {
    res.clearCookie('refreshToken', { path: '/api/refresh-token' });
    res.json({ message: "success" });
})


// 리프레시토큰을 이용한 액세스토큰 재발급
const refreshToken = asyncWrapper(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.json({ message: "fail : require refresh token" });
    } else {
        const data = verifyToken(refreshToken, 'refreshToken');
        if (data === 'fail') {
            res.json({ message: "fail : invalid refresh token" });
        } else {
            const accessToken = generateToken({ _id: data.id }, 'accessToken');
            res.json({
                accessToken,
                message: "success"
            })
        }
    }
})


module.exports = {
    sendMail,
    signup,
    signout,
    login,
    oauthLogin,
    logout,
    refreshToken,
}