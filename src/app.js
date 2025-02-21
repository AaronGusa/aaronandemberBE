const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const r = require('./routes/routes')


// Middleware to parse JSON bodies
app.use(express.json())
    .use(cors())
    .use(bodyParser.json())
    .use('/', r);

// Simple route for testing
// app.get('/', (req, res) => {
//     res.send('Hello, Render!');
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}
                 http://localhost:${port}`);
});

