const str_r = require('express').Router();
const str_cont = require('../controllers/stripe');


//Stripe GETS
str_r.get('/', str_cont.getCustomers);
str_r.get('/:cid', str_cont.getCustomer);
//Stripe Posts

//Stripe Puts

//Stripe Del

module.exports = str_r;