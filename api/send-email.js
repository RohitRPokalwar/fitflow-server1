// fitflow-server/api/send-email.js

const { sendEmail } = require("../mailer");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { to, subject, text } = req.body;

    try {
        await sendEmail(to, subject, text);
        res.status(200).json({ message: "Email sent!" });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ error: "Failed to send email." });
    }
};
