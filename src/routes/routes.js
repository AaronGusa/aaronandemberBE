const indx_r = require('express').Router();

indx_r.use('/service', require('./stripeR'));

// Default route
indx_r.use('/', (req, res) => {
    let docData = {
        'Quick Links': [
            {Services: 'http://localhost/service'}
        ]
    };
    res.json(docData);
});

module.exports = indx_r;