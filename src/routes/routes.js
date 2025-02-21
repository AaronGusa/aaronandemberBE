const indx_r = require('express').Router();

indx_r.use('/service', require('./stripeR'));

indx_r.use('/', (docData = (req, res) => {
    let docData = {
        'Quick Links': [
            {Services: 'http://localhost/service'}
        ]
    };
    res.json(docData);
})
)

module.exports = indx_r;