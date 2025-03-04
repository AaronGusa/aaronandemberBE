const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
    const { name, companyName, subject, email, phone, message } = req.body;
    //console.log(`We have an email from ${name}`);
    //console.log(`Email content: ${phone} ${email}, ${subject}, ${message}`);

    // Create a transporter using Zoho Mail credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'support@airandember.com', // Your Zoho Mail address
            pass: process.env.EM_PASS // Your Zoho Mail password from environment variable
        }
    });

    const mailOptions = {
        from: 'support@airandember.com',
        replyTo: email,
        to: 'air@airandember.com',
        subject: subject,
        text: `
        Hello Air,
    
        You have received a new contact form submission with the following details:
    
        Name: ${name}
        Company: ${companyName}
        Phone: ${phone}
        Email: ${email}
    
        Message:
        ${message}
    
        Please respond to the sender at your earliest convenience.
    
        Best regards,
        Air & Ember Contact Form
        Support Team
        support@airandember.com
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            //console.error('Error sending email:', error);
            res.status(500).send({ error: 'Failed to send email' });
        } else {
            //console.log('Email sent:', info.response);
            res.status(200).send({ message: 'Email sent successfully' });
        }
    });
};

module.exports = {
    sendEmail
};
