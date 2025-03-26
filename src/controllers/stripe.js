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

const handleWebhook = async (req, res) => {
    console.log('WebHook Initiated');
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify webhook signature to ensure the request is from Stripe
        event = stripe.webhooks.constructEvent(
            req.rawBody, // Use raw body for verification
            sig,
            process.env.WEBH_SCRT // The secret key for webhook signature validation
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Process the event
    const { type, data } = event;

    try {
        if (type ) {
            // Store invoice details in Firebase
            const invoice = data.object;
            // Example: Save invoice data to Firebase
            // await firebaseAdmin.database().ref(`/invoices/${invoice.id}`).set(invoice);
            console.log('Invoice created:', invoice);
        }
        // Add more event types as needed
        res.status(200).send('Event processed');
    } catch (err) {
        console.error('Error processing event:', err.message);
        res.status(500).send('Internal Server Error');
    }
};


// Stripe Posts

// Stripe Puts

// Stripe Del

module.exports = {
    getCustomers,
    getCustomer,
    getInvoices,
    handleWebhook
}



// (async () => {
//     try {
//         const customers = await stripe.customers.list();
//         console.log(customers);
//     } catch (error) {
//         console.log('Error in Customer Fetch: ', error);
//     };
// }) ();
