// App Configuration Settings
const CONFIG = {
    // Phone number to receive order alerts on WhatsApp (with country code, no special characters)
    WHATSAPP_NUMBER: "918686216633",

    // Razorpay Public Key ID (starts with rzp_test_ or rzp_live_)
    RAZORPAY_KEY_ID: "rzp_test_XXXXXXXXXXXXXX",

    // Currency for transactions
    CURRENCY: "INR",

    // Delivery charge (in INR)
    DELIVERY_CHARGE: 50,

    // Free delivery minimum order value (in INR)
    FREE_DELIVERY_THRESHOLD: 500,

    // Auto-detect image base path:
    // - When opening index.html locally as file://, use the absolute brain folder path
    // - When deployed to Azure SWA (https://), use the relative images/ folder
    IMAGE_BASE: (location.protocol === "file:")
        ? "file:///C:/Users/E092721/.gemini/antigravity/brain/4cc002e7-42a8-4f85-93d6-dac719940557/"
        : "images/"
};
