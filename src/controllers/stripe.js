require('dotenv').config();
console.log('Stripe Key:', process.env.STR_Key);

const stripe = require('stripe')( process.env.STR_Key );

// console.log('Passed Stripe');

// (async () => {
//     try {
//         const customers = await stripe.customers.list();
//         console.log(customers);
//     } catch (error) {
//         console.log('Error in Customer Fetch: ', error);
//     };
// }) ();


console.log('End')


//Stripe GETS
const getCustomers = async (req, resizeBy, next) => {
    try {
        const customers = await stripe.customers.list();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({message: 'Error: ' + error});
    }

}

//Stripe Posts

//Stripe Puts

//Stripe Del


module.exports = {
    getCustomers
}