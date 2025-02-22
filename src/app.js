const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const r = require('./routes/routes')

const allowedOrigins = ['http://192.168.88.1:5500', 'https://airandember.com']

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

