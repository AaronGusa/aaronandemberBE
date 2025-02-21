const str_r = require('express').Router();
const str_cont = require('../controllers/stripe');


//Stripe GETS
str_r.get('/', str_cont.getCustomers)

//Stripe Posts

//Stripe Puts

//Stripe Del
