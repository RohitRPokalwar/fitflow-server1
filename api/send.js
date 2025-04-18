// src/api/send.js

const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // or other email service
        auth: {
            user: process.env.EMAIL_USER,  // Use environment variables for sensitive info
            pass: process.env.EMAIL_PASS,  // Use environment variables for sensitive info
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
    } catch (error) {
        console.error("❌ Error sending email", error);
        throw error;  // Rethrow the error to handle it in the calling function
    }
};

module.exports = sendEmail;
