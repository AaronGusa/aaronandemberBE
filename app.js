const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');
 

const allowedOrigins = [
    'http://192.168.88.1:5500',
    'http://192.168.86.42:5500', 
    'https://airandember.com',
    'https://stripe.com'
];

// Middleware to parse JSON bodies
app.use(express.json());

// app.use('/stripeR/webhook', (req, res, next) => {
//     console.log('Entered in Webhook')
//     req.rawBody = '';
//     req.setEncoding('utf8');
//     req.on('data', (chunk) => {
//         req.rawBody += chunk;
//         console.log(req.rawBody)
//     });
//     req.on('end', () => {
//         next();
//     });
// });
app.use('/stripeR/webhook', bodyParser.raw({ type: 'application/json' }));

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
app.use('/', routes);


// Start the server
console.log('Server is starting...');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
