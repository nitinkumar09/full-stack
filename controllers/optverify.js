// routes/auth.js
const express = require('express');
const router = express.Router();
const config = require("../config/config")
const nodemailer = require('nodemailer');



// Send OTP to user's email
async function sendverifyotpMail(name, email, otp) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailOptions = await transporter.sendMail({
            from: config.emailUser,
            to: email,
            subject: 'OTP Verification',
            // html: `OTP G-${otp} <br> <p>Hi ${name}, please click the following link to Verify top: <a href="https://nitin-2.onrender.com/otp-verify?otp=${otp}">Verify OTP</a></p>` // host par ha to ye link on karna
            html: `OTP G-${otp} <br> <p>Hi ${name}, this otp valid only 10 minute: <a href="http://localhost:8000/otp-verify?otp=${otp}"></a></p>` // ye localhost ke liye h

        });


    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email for otp');
    }
}




module.exports = sendverifyotpMail
