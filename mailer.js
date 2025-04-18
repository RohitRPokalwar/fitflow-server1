// fitflow-server/mailer.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password, not Gmail login
    },
});

const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"FitFlow" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });
};

module.exports = { sendEmail };
