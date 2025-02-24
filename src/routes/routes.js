const indx_r = require('express').Router();
const pft = require('../auth/auth');

indx_r.use('/service', pft.proveFirebaseToken, require('./stripeR'));

// Default route
indx_r.use('/', (req, res) => {
    let docData = {
        'Quick Links': [
            {Services: 'https://aaronandemberbe.onrender.com/service/'}
        ]
    };
    res.json(docData);
});

module.exports = indx_r;