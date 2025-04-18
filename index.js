const express = require("express");
const cors = require("cors");
require("dotenv").config();  // Load environment variables
const sendEmail = require('./api/send');  // Assuming send.js is in the same directory as index.js
// Correct path to send.js

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("FitFlow Email Backend is Running");
});

app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        // Use the sendEmail function from send.js
        await sendEmail(to, subject, text);
        res.status(200).send("Email sent!");
    } catch (err) {
        console.error("❌ Email error:", err);
        res.status(500).send("Failed to send email.");
    }
});

app.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
});
