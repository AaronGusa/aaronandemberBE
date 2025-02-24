const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const admin = require('firebase-admin');
const r = require('./src/routes/routes')

const allowedOrigins = ['http://192.168.88.1:5500','http://192.168.86.42:5500', 'https://airandember.com']

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});


// Middleware to parse JSON bodies
app.use(express.json())
//CORS config
    .use(cors({
        origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
        },
        credentials: true
    }))
    .use('/', r);

// Simple route for testing
// app.get('/', (req, res) => {
//     res.send('Hello, Render!');
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});