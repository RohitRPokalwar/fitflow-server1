// mailer.js

const nodemailer = require("nodemailer");
require("dotenv").config();  // To load environment variables

// Create the transporter using Gmail's SMTP service
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Your email address from .env
        pass: process.env.EMAIL_PASS,  // Your app password from .env
    },
});

/**
 * Send an email using the provided details
 * 
 * @param {string} to - The recipient's email address
 * @param {string} subject - The subject of the email
 * @param {string} text - The body of the email
 */
const sendEmail = async (to, subject, text) => {
    try {
        // Send the email
        await transporter.sendMail({
            from: `"FitFlow" <${process.env.EMAIL_USER}>`,  // Sender's email
            to,  // Recipient's email
            subject,  // Email subject
            text,  // Email body
        });

        console.log("✅ Email sent!");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = { sendEmail };
