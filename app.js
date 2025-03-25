const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');

const allowedOrigins = [
    'http://192.168.88.1:5500',
    'http://192.168.86.42:5500', 
    'https://airandember.com'
];

// Middleware to parse JSON bodies
app.use(express.json());

// CORS config
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));



// Use routes
app.use('/stripeR/webhook', bodyParser.raw({ type: 'application/json' }), (req, res, next) => {
    console.log('Received request at /stripeR/webhook');
    next();
});



app.use('/', routes);




// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
