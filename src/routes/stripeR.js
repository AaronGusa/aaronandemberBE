const str_r = require('express').Router();
const str_cont = require('../controllers/stripe');
const bodyParser = require('body-parser');



//Stripe GETS
str_r.get('/', str_cont.getCustomers);
str_r.get('/:cid', str_cont.getCustomer);
str_r.get('/invoices/:cid', str_cont.getInvoices);

    //Webhooks GETS
// str_r.get('/hookey/:cid', str_cont.getWebHCustomer);
// str_r.get('/hookey/:cid/invoices', str_cont.getWebHInvoices) 

//Stripe Posts
str_r.post('/webhook', bodyParser.json({type: 'application/json'}), str_cont.handleWebhook);


//Stripe Puts

//Stripe Del


module.exports = str_r;