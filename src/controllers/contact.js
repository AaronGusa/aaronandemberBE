const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const { name, companyName, subject, email, message } = req.body;
    console.log(`We have an email from ${name}`);
    console.log(`Email content: ${email}, ${subject}, ${message}`);

    // Create a transporter using Zoho Mail credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'air-ember@airandember.com', // Your Zoho Mail address
            pass: process.env.EM_PASS // Your Zoho Mail password from environment variable
        }
    });

    const mailOptions = {
        from: email,
        to: 'air@airandember.com',
        subject: subject,
        text: `Name: ${name}\nCompany: ${companyName}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.send({ message: 'Email sent successfully' });
        }
    });
};

module.exports = {
    sendEmail
};
