require('dotenv').config();
const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
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
        res.json({
            message: "require email"
        })
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
            console.log(authNum);
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

})



module.exports = {
    sendMail,
    signup,
}