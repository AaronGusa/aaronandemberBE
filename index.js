const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route for testing
app.get('/', (req, res) => {
    res.send('Hello, Render!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}
                 http://localhost:${port}`);
});