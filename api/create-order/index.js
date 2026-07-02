const Razorpay = require('razorpay');

module.exports = async function (context, req) {
    context.log('Processing create-order request.');

    const amount = req.body && req.body.amount;
    const customer = req.body && req.body.customer;

    if (!amount) {
        context.res = {
            status: 400,
            body: { error: "Please provide a valid transaction amount" }
        };
        return;
    }

    // Read Key credentials from Application App Settings (Environment variables in Azure SWA/Functions)
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_XXXXXXXXXXXXXX";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "dummy_secret_do_not_use";

    try {
        const instance = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        const options = {
            amount: Math.round(amount * 100), // Amount in paise/cents
            currency: "INR",
            receipt: `receipt_nk_${Date.now()}`,
            notes: {
                customerName: customer ? customer.name : "NK Customer",
                customerPhone: customer ? customer.phone : ""
            }
        };

        const order = await instance.orders.create(options);

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: order
        };
    } catch (error) {
        context.log.error('Error generating Razorpay Order ID:', error);
        context.res = {
            status: 500,
            body: { error: "Internal payment processing error" }
        };
    }
};
