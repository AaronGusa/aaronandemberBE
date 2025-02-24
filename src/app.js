const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const r = require('./routes/routes');
const admin = require('firebase-admin');

const allowedOrigins = ['http://192.168.88.1:5500', 'http://192.168.86.42:5500', 'https://airandember.com'];

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
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

// Middleware to verify Firebase ID token
async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
}

// Apply the `authenticate` middleware to all routes in `r`
app.use(authenticate);

// Use routes defined in `r`
app.use('/', r);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
