const { stringify } = require('querystring');
const { param } = require('../routes/stripeR');

require('dotenv').config();

const stripe = require('stripe')(process.env.STR_Key);

// Stripe GETS
const getCustomers = async (req, res, next) => {
    try {
        const customers = await stripe.customers.list();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: 'Error: ' + error });
    }
}

const getCustomer = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        console.log('Line 23: ' + cid);
        const customer = await stripe.customers.retrieve(cid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customer);
    } catch (err) {
        res.status(400).json({ message: 'Error: ' + err });
    }
}

// Stripe Posts

// Stripe Puts

// Stripe Del

module.exports = {
    getCustomers,
    getCustomer
}




// (async () => {
//     try {
//         const customers = await stripe.customers.list();
//         console.log(customers);
//     } catch (error) {
//         console.log('Error in Customer Fetch: ', error);
//     };
// }) ();
