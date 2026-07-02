const crypto = require('crypto');
const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

module.exports = async function (context, req) {
    context.log('Verifying Razorpay payment signature.');

    const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        orderDetails 
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        context.res = {
            status: 400,
            body: { success: false, message: "Missing required signature verification properties" }
        };
        return;
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || "dummy_secret_do_not_use";

    // 1. Validate signature using HMAC SHA256 (Standard Razorpay Security Verification)
    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    const isSignatureValid = (generated_signature === razorpay_signature);

    if (!isSignatureValid) {
        context.log.warn('Signature verification check failed!');
        context.res = {
            status: 400,
            body: { success: false, message: "Signature verification check failed" }
        };
        return;
    }

    // 2. Log details to Azure Table Storage if connection string is configured
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (connectionString) {
        try {
            // Establish Connection
            const tableClient = TableClient.fromConnectionString(connectionString, "NkOrders");
            
            // Create Table automatically if not existing (Safe initial deployment)
            await tableClient.createTable();

            // Prepare entity representation for Table row
            const orderEntity = {
                partitionKey: "Orders",
                rowKey: razorpay_payment_id,
                orderId: razorpay_order_id,
                customerName: orderDetails.name,
                customerPhone: orderDetails.phone,
                customerAddress: orderDetails.address,
                deliveryDate: orderDetails.deliveryDate,
                itemsJson: JSON.stringify(orderDetails.items),
                amount: orderDetails.totalAmount,
                paymentStatus: "Completed",
                createdAt: new Date().toISOString()
            };

            await tableClient.createEntity(orderEntity);
            context.log('Successfully saved transaction to Azure Table Storage.');
        } catch (storageError) {
            // Log warning but don't fail transaction response since user already paid
            context.log.error('Warning: Payment successful but logging to Storage failed:', storageError);
        }
    } else {
        context.log('Azure Storage Connection String not configured. Skipping Order Table logging.');
    }

    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: { 
            success: true, 
            message: "Payment successfully verified",
            orderId: razorpay_payment_id 
        }
    };
};
