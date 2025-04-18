const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    const { name, email, bookingId, slot, date } = req.body;

    if (!name || !email || !bookingId || !slot || !date) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Create a transport for sending emails (you can use Gmail or any SMTP server)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or use any SMTP server
        auth: {
            user: process.env.EMAIL_USER,  // Your email (sender)
            pass: process.env.EMAIL_PASS   // Your email password or app-specific password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Booking Confirmation",
        text: `Dear ${name},\n\nThank you for booking your slot with FitFlow!\n\nYour booking details:\nBooking ID: ${bookingId}\nSlot: ${slot}\nDate: ${date}`,
        html: `
            <html>
                <body>
                    <h2>Booking Confirmation</h2>
                    <p>Dear ${name},</p>
                    <p>Thank you for booking your slot with FitFlow!</p>
                    <div>
                        <strong>Booking ID:</strong> ${bookingId}<br>
                        <strong>Slot:</strong> ${slot}<br>
                        <strong>Date:</strong> ${date}
                    </div>
                </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: 'Error sending email.' });
    }
};
