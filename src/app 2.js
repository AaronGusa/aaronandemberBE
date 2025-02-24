const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const r = require('./routes/routes');
const admin = require('firebase-admin');

const allowedOrigins = ['http://192.168.88.1:5500','http://192.168.86.42:5500', 'https://airandember.com']

// Middleware to parse JSON bodies
app.use(express.json())
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }))
    .use('/', r);

// Simple route for testing
// app.get('/', (req, res) => {
//     res.send('Hello, Render!');
// });

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
  
  // Example route to verify token and access protected resource
  app.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'This is a protected resource', user: req.user });
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

