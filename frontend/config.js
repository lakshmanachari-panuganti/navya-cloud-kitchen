// App Configuration Settings
// Single source of truth for site-wide constants (phone, WhatsApp, Instagram,
// email). To change any of these, edit the value here — the runtime patcher
// at the bottom of this file rewrites hrefs and text on any element that
// carries a `data-site-href` or `data-site-text` attribute.
const CONFIG = {
    // Phone / WhatsApp number in E.164 (country code first, digits only).
    // Used for wa.me links and as the base for PHONE_TEL / PHONE_DISPLAY.
    WHATSAPP_NUMBER: "918686216633",

    // tel: link value (with leading +) and human-readable display form.
    PHONE_TEL: "+918686216633",
    PHONE_DISPLAY: "+91 8686 21 6633",

    // Instagram handle (no leading @) and full URL.
    INSTAGRAM_HANDLE: "navyacloudkitchen",
    INSTAGRAM_URL: "https://instagram.com/navyacloudkitchen",

    // Contact email.
    EMAIL: "info@navyacloudkitchen.com",

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

// Runtime DOM patcher — walks elements carrying `data-site-href` /
// `data-site-text` and rewrites them from CONFIG. Lets any page (index,
// policies, blog) stay in sync just by including config.js.
(function patchSiteRefs() {
    const apply = () => {
        const hrefMap = {
            instagram: CONFIG.INSTAGRAM_URL,
            whatsapp: `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`,
            tel: `tel:${CONFIG.PHONE_TEL}`,
            email: `mailto:${CONFIG.EMAIL}`,
        };
        const textMap = {
            "instagram-handle": `@${CONFIG.INSTAGRAM_HANDLE}`,
            "phone-display": CONFIG.PHONE_DISPLAY,
            "phone-call": `Call: ${CONFIG.PHONE_DISPLAY}`,
            "phone-whatsapp": `WhatsApp: ${CONFIG.PHONE_DISPLAY}`,
            email: CONFIG.EMAIL,
        };
        document.querySelectorAll("[data-site-href]").forEach((el) => {
            const key = el.getAttribute("data-site-href");
            if (hrefMap[key]) el.setAttribute("href", hrefMap[key]);
        });
        document.querySelectorAll("[data-site-text]").forEach((el) => {
            const key = el.getAttribute("data-site-text");
            if (textMap[key]) el.textContent = textMap[key];
        });
    };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", apply);
    } else {
        apply();
    }
})();
