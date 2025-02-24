const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const stripe = require('stripe')('your-stripe-secret-key');

const app = express();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

app.use(express.json());

const allowedOrigins = ['https://airandember.com', 'http://localhost:5500'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow sending cookies and credentials
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

// Example protected route
app.get('/protected-data', authenticate, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});