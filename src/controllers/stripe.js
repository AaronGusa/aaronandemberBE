require('dotenv').config();

const stripe = require('stripe')(process.env.STR_Key);

// Stripe GETS
const getCustomers = async (req, res, next) => {
    try {
        const customers = await stripe.customers.list();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: 'Customers Error: ' + error });
    }
}

const getCustomer = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const customer = await stripe.customers.retrieve(cid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customer);
    } catch (err) {
        res.status(400).json({ message: 'Customer Error: ' + err });
    }
}

const getInvoices = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const invoices = await stripe.invoices.list({customer: cid});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(invoices)
    } catch (err) {
        res.status(400).json({message: 'Invoices Error: ' + err })
    }

}

// Stripe Posts

// Stripe Puts

// Stripe Del

module.exports = {
    getCustomers,
    getCustomer,
    getInvoices
}




// (async () => {
//     try {
//         const customers = await stripe.customers.list();
//         console.log(customers);
//     } catch (error) {
//         console.log('Error in Customer Fetch: ', error);
//     };
// }) ();
