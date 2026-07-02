// App Configuration Settings
const CONFIG = {
    // Phone number to receive order alerts on WhatsApp (with country code, no special characters)
    WHATSAPP_NUMBER: "918686216633",

    // Delivery is handled by a third-party courier (Rapido/Porter). The
    // customer pays the courier directly at time of drop-off, so the site
    // does NOT collect delivery charges. The note below is what customers
    // see in the cart drawer + WhatsApp message.
    COURIER_NOTE: "Courier via Rapido/Porter (~₹150-300 in Hyderabad) is paid separately to the courier partner.",

    // Auto-detect image base path:
    // - When opening index.html locally as file://, use the absolute brain folder path
    // - When deployed to Azure SWA (https://), use the relative images/ folder
    IMAGE_BASE: (location.protocol === "file:")
        ? "file:///C:/Users/E092721/.gemini/antigravity/brain/4cc002e7-42a8-4f85-93d6-dac719940557/"
        : "images/"
};
