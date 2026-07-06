// 1. Menu Data Structure
// Image filenames map: local (brain folder) vs deployed (images/ folder)
// Returns the WebP path for deployed, PNG brain-file path for local dev.
const IMG = (name, brainFile) => (location.protocol === "file:")
    ? `file:///C:/Users/E092721/.gemini/antigravity/brain/4cc002e7-42a8-4f85-93d6-dac719940557/${brainFile}`
    : `images/${name.replace('.png', '.webp')}`;

// Returns the PNG fallback path (deployed only) for <picture> elements
const IMG_PNG = (name) => `images/${name}`;

// Podulu carry a `tier` (Everyday / Signature / Handcrafted), a `benefit` tag,
// and a `sizes` ladder with per-size explicit prices - the card only *displays*
// prices, it never derives a size's price from a base.
// Sweets are single-price and use `unitLabel` instead of `sizes`.
const MENU_ITEMS = [
    {
        id: "moringa_leaves_podi",
        name: "Munagaku Podi",
        sub: "Moringa Leaves Powder",
        category: "everyday_podulu",
        tier: "Handcrafted",
        benefit: "Signature",
        description: "Drumstick leaves slow-roasted with urad dal, red chilies & garlic. A treasured recipe for hot rice with ghee.",
        sizes: [
            { grams: 100, price: 199 },
            { grams: 250, price: 399, badge: "Most popular" },
            { grams: 500, price: 699, badge: "Best value" }
        ],
        image: IMG("moringa_podi.png", "moringa_podi_1780837049362.png")
    },
    {
        id: "curry_leaves_podi",
        name: "Karivepaku Podi",
        sub: "Curry Leaves Powder",
        category: "everyday_podulu",
        tier: "Handcrafted",
        benefit: "Traditional",
        description: "Fresh curry leaves hand-roasted with coriander seeds & dry chilies. A treasured recipe passed down through generations.",
        sizes: [
            { grams: 100, price: 199 },
            { grams: 250, price: 399, badge: "Most popular" },
            { grams: 500, price: 699, badge: "Best value" }
        ],
        image: IMG("curry_leaves_podi.png", "curry_leaves_podi_1780837004093.png")
    },
    {
        id: "flaxseed_garlic_podi",
        name: "Avise Ginjala Podi",
        sub: "Flaxseed Garlic Powder",
        category: "everyday_podulu",
        tier: "Everyday",
        benefit: "Everyday Favourite",
        description: "Flaxseeds slow-roasted with garlic & warming spices. Best mixed with curd rice or hot rice with ghee.",
        sizes: [
            { grams: 100, price: 129 },
            { grams: 250, price: 259, badge: "Most popular" },
            { grams: 500, price: 449, badge: "Best value" }
        ],
        image: IMG("flaxseed_garlic_podi.png", "flaxseed_garlic_podi_1780839254078.png")
    },
    {
        id: "kandi_podi",
        name: "Kandi Podi",
        sub: "Classic Lentil Powder",
        category: "traditional_comfort",
        tier: "Everyday",
        benefit: "Bestseller",
        description: "Roasted toor & chana dal ground with cumin & dry red chilies. The ultimate homemade comfort food.",
        sizes: [
            { grams: 100, price: 129 },
            { grams: 250, price: 259, badge: "Most popular" },
            { grams: 500, price: 449, badge: "Best value" }
        ],
        image: IMG("kandi_podi.png", "kandi_podi_1780837030018.png")
    },
    {
        id: "vellulli_karampodi",
        name: "Vellulli Karampodi",
        sub: "Spicy Garlic Powder",
        category: "traditional_comfort",
        tier: "Signature",
        benefit: "Spicy",
        description: "Fiery red chilies ground with whole roasted garlic & tamarind. Perfect on ghee dosa or idli.",
        sizes: [
            { grams: 100, price: 159 },
            { grams: 250, price: 319, badge: "Most popular" },
            { grams: 500, price: 549, badge: "Best value" }
        ],
        image: IMG("vellulli_karampodi.png", "vellulli_karampodi_1780839267768.png")
    },
    {
        id: "nuvvula_podi",
        name: "Nuvvula Podi",
        sub: "Sesame Seeds Powder",
        category: "traditional_comfort",
        tier: "Signature",
        benefit: "Signature",
        description: "Roasted sesame seeds ground with mild spices. Mix into hot rice or vegetable stir-fries.",
        allergens: "Contains sesame.",
        sizes: [
            { grams: 100, price: 159 },
            { grams: 250, price: 319, badge: "Most popular" },
            { grams: 500, price: 549, badge: "Best value" }
        ],
        image: IMG("nuvvula_podi.png", "nuvvula_podi_1780839280961.png")
    },
    {
        id: "minapa_sunnundalu",
        name: "Minapa Sunni Undalu",
        sub: "Urad Dal Laddoos",
        category: "sweets",
        benefit: "Fan Favourite",
        description: "Slow-roasted urad dal rolled with pure cow ghee & bellam jaggery. Melt-in-the-mouth.",
        allergens: "Contains dairy (cow ghee).",
        price: 260,
        unitLabel: "Box of 6 pieces",
        image: IMG("sunni_undalu.png", "sunni_undalu_1780837017678.png")
    },
    {
        id: "nuvvula_undalu",
        name: "Nuvvula Undalu",
        sub: "Sesame Jaggery Laddoos",
        category: "sweets",
        benefit: "Traditional",
        description: "Roasted sesame seeds bound with cardamom-infused jaggery syrup. A traditional sweet bite.",
        allergens: "Contains sesame.",
        price: 199,
        unitLabel: "Box of 10 pieces",
        image: IMG("nuvvula_undalu.png", "nuvvula_undalu_1780839294373.png")
    },
    {
        id: "bellam_palli_undalu",
        name: "Bellam Palli Undalu",
        sub: "Peanut Jaggery Bites",
        category: "sweets",
        benefit: "Crunchy",
        description: "Crunchy roasted peanuts set in cardamom-infused jaggery. A traditional festive treat.",
        allergens: "Contains peanuts.",
        price: 120,
        unitLabel: "200g pack",
        image: IMG("palli_undalu.png", "palli_undalu_1780837062371.png")
    },
    {
        id: "podi_starter_box",
        name: "Podi Starter Box",
        sub: "3 × 100g podulu",
        category: "bundles",
        benefit: "Best for trying",
        description: "Can't decide? Try our three most popular podulu — Karivepaku, Munagaku & Kandi — in convenient 100g jars.",
        price: 449,
        unitLabel: "3 jars × 100g",
        image: IMG("curry_leaves_podi.png", "curry_leaves_podi_1780837004093.png")
    },
    {
        id: "festival_sweet_box",
        name: "Festival Sweet Box",
        sub: "All 3 sweets combo",
        category: "bundles",
        benefit: "Gift-ready",
        description: "The perfect festive gift — Sunni Undalu, Nuvvula Undalu & Palli Undalu together in one beautiful box.",
        price: 499,
        unitLabel: "3 sweet packs",
        image: IMG("sunni_undalu.png", "sunni_undalu_1780837017678.png")
    }
];

// Inline SVG icon strings (Lucide-style, currentColor). Kept as strings so the
// existing template concatenation continues to work without changes.
const ICON = {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12L12 4l9 8"/><path d="M5 10v10h14V10"/></svg>`,
    leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>`,
    flame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    candy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.6 5.6a4 4 0 1 1 5.66 5.66l-1.06 1.06a4 4 0 1 1-5.66-5.66Z"/><path d="M5.5 15.4 3 18l3 3 2.6-2.5"/><path d="m18.5 8.6 2.5-2.6-3-3-2.6 2.5"/></svg>`,
    gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M5 12v9h14v-9"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>`,
};

const CATEGORIES = {
    all: { label: "All Items", icon: ICON.home },
    everyday_podulu: { label: "Everyday Podulu", icon: ICON.leaf, iconType: "green" },
    traditional_comfort: { label: "Traditional Podulu", icon: ICON.flame, iconType: "amber" },
    sweets: { label: "Sweets & Snacks", icon: ICON.candy, iconType: "amber" },
    bundles: { label: "Combo Packs", icon: ICON.gift, iconType: "amber" }
};

/* ── State ────────────────────────────────────────────────── */
let cart = {};
let drawerOpen = false;

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
    // Set runtime image paths — WebP with PNG fallback (works both locally and deployed)
    const logo = document.getElementById("navLogo");
    if (logo) {
        logo.src = IMG("logo.png", "navyas_kitchen_logo_1780835858832.png");
        if (location.protocol !== "file:") {
            const logoSource = document.createElement('source');
            logoSource.srcset = IMG("logo.png", "");
            logoSource.type = 'image/webp';
            logo.parentNode.insertBefore(logoSource, logo);
        }
    }
    const footerLogo = document.getElementById("footerLogo");
    if (footerLogo) footerLogo.src = IMG("logo.png", "navyas_kitchen_logo_1780835858832.png");

    // Footer WhatsApp link
    const footerWA = document.getElementById("footerWhatsApp");
    if (footerWA) footerWA.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;

    initDeliveryDate();
    renderCategoryPills("all");
    showMenuSkeletons();
    // Defer render to next frame so skeletons are visible on slow connections
    requestAnimationFrame(() => {
        renderMenu("all");
    });
    setupCartEvents();
    setupScrollNav();
    setupScrollReveal();
    setupMobileMenu();
    initCountdown();

    // Update checkout trust microcopy
    const payNote = document.querySelector('.pay-note');
    if (payNote) {
        payNote.textContent = "Secure payment via PhonePe · UPI/Cards/NetBanking · Cooked fresh, dispatched next morning";
    }
});

function showMenuSkeletons() {
    const container = document.getElementById("menuContainer");
    const skeletonHTML = Array(6).fill(`
        <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-text" style="width:60%"></div>
            <div class="skeleton-text" style="width:40%"></div>
            <div class="skeleton-text" style="width:80%"></div>
        </div>
    `).join('');
    container.innerHTML = `<section class="menu-section"><div class="menu-grid">${skeletonHTML}</div></section>`;
}

function initCountdown() {
    const el = document.querySelector('.timing-text strong');
    if (!el) return;

    function update() {
        const now = new Date();
        const cutoff = new Date(now);
        cutoff.setHours(18, 0, 0, 0);

        if (now >= cutoff) {
            el.textContent = "Orders open again tomorrow at 9 AM";
            return;
        }

        const diff = cutoff - now;
        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        el.textContent = `Order cut-off in ${hours}h ${mins}m — tonight's batch`;
    }

    update();
    setInterval(update, 60000);
}

function initDeliveryDate() {
    const el = document.getElementById("deliveryDate");
    if (!el) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const iso = tomorrow.toISOString().split("T")[0];
    el.min = iso;
    el.value = iso;
}

/* ── Category Pills ───────────────────────────────────────── */
function renderCategoryPills(activeKey) {
    const wrap = document.getElementById("categoryTabs");
    wrap.innerHTML = "";
    Object.keys(CATEGORIES).forEach(key => {
        const cat = CATEGORIES[key];
        const btn = document.createElement("button");
        btn.className = `cat-pill ${key === activeKey ? "active" : ""}`;
        btn.innerHTML = `${cat.icon} ${cat.label}`;
        btn.addEventListener("click", () => {
            renderCategoryPills(key);
            renderMenu(key);
        });
        wrap.appendChild(btn);
    });
}

/* ── Render Menu ──────────────────────────────────────────── */
function renderMenu(filterKey) {
    const container = document.getElementById("menuContainer");
    container.innerHTML = "";

    const keys = filterKey === "all"
        ? Object.keys(CATEGORIES).filter(k => k !== "all")
        : [filterKey];

    keys.forEach(catKey => {
        const items = MENU_ITEMS.filter(i => i.category === catKey);
        if (!items.length) return;
        const cat = CATEGORIES[catKey];

        const section = document.createElement("section");
        section.className = "menu-section";
        section.innerHTML = `
            <div class="section-label">
                <div class="section-label-icon ${cat.iconType || 'green'}">${cat.icon}</div>
                <div>
                    <div class="section-title">${cat.label}</div>
                </div>
            </div>
            <div class="menu-grid" id="grid-${catKey}"></div>
        `;
        container.appendChild(section);

        const grid = section.querySelector(`#grid-${catKey}`);
        items.forEach(item => grid.appendChild(buildCard(item)));
    });
}

// Dispatch: three-size podulu get the ladder card, sweets get the single-size card.
function buildCard(item) {
    return item.sizes ? buildPodiCard(item) : buildSweetCard(item);
}

const CART_ICON_SVG = `
    <svg class="pcard-cta-icon pcard-cta-cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path>
    </svg>`;
const CHECK_ICON_SVG = `
    <svg class="pcard-cta-icon pcard-cta-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:none">
        <path d="M20 6 9 17l-5-5"></path>
    </svg>`;

function buildPodiCard(item) {
    const card = document.createElement("article");
    card.className = "pcard";
    card.dataset.productId = item.id;

    // Default to the "Most popular" size; fall back to the middle cell.
    const popularIdx = item.sizes.findIndex(s => s.badge === "Most popular");
    let selectedIdx = popularIdx >= 0 ? popularIdx : Math.floor(item.sizes.length / 2);
    // Derive PNG fallback from the webp image path (deployed) or keep as-is (local)
    const pngSrc = item.image.endsWith('.webp') ? item.image.replace('.webp', '.png') : item.image;
    card.innerHTML = `
        <div class="pcard-img-wrap">
            <picture>
                <source srcset="${item.image}" type="image/webp">
                <img src="${pngSrc}" alt="${item.name}" class="pcard-img" loading="lazy"
                     onerror="this.src='https://placehold.co/420x240/faf5ec/1e5631?text=Navya+Cloud+Kitchen'">
            </picture>
        </div>
        <header class="pcard-tags">
            <span class="pcard-tier">${item.tier}</span>
            <span class="pcard-benefit">${item.benefit}</span>
        </header>
        <div class="pcard-heading">
            <h3 class="pcard-name" lang="te">${item.name}</h3>
            ${item.sub ? `<div class="pcard-sub">${item.sub}</div>` : ""}
        </div>
        <p class="pcard-desc">${item.description}</p>
        ${item.allergens ? `<p class="pcard-allergens" aria-label="Allergen information"><strong>Allergen info:</strong> ${item.allergens}</p>` : ""}

        <div class="pcard-sizes" role="group" aria-label="Choose pack size">
            ${item.sizes.map((s, i) => {
                const unitPer100 = Math.round(s.price / s.grams * 100);
                const isSel = i === selectedIdx;
                return `
                    <button type="button" class="pcard-size${isSel ? " is-selected" : ""}"
                            aria-pressed="${isSel}" data-idx="${i}">
                        <span class="pcard-size-badge">${s.badge || ""}</span>
                        <span class="pcard-size-label">${s.grams}g</span>
                        <span class="pcard-size-price">₹${s.price}</span>
                        <span class="pcard-size-unit">₹${unitPer100}/100g</span>
                    </button>
                `;
            }).join("")}
        </div>

        <button type="button" class="pcard-cta">
            ${CART_ICON_SVG}
            ${CHECK_ICON_SVG}
            <span class="pcard-cta-label">Add to cart</span>
        </button>
    `;

    const sizeBtns  = card.querySelectorAll(".pcard-size");
    const ctaBtn    = card.querySelector(".pcard-cta");
    const ctaLabel  = ctaBtn.querySelector(".pcard-cta-label");
    const ctaCart   = ctaBtn.querySelector(".pcard-cta-cart");
    const ctaCheck  = ctaBtn.querySelector(".pcard-cta-check");

    function render() {
        sizeBtns.forEach(btn => {
            const isSel = Number(btn.dataset.idx) === selectedIdx;
            btn.classList.toggle("is-selected", isSel);
            btn.setAttribute("aria-pressed", String(isSel));
        });
    }

    card.querySelector(".pcard-sizes").addEventListener("click", e => {
        const btn = e.target.closest(".pcard-size");
        if (!btn) return;
        selectedIdx = Number(btn.dataset.idx);
        render();
    });

    ctaBtn.addEventListener("click", () => {
        const s = item.sizes[selectedIdx];
        addVariantToCart(item, s);
        flashAddedState(ctaBtn, ctaLabel, ctaCart, ctaCheck, `Added ${s.grams}g · ₹${s.price}`);
    });

    render();
    return card;
}

function buildSweetCard(item) {
    const card = document.createElement("article");
    card.className = "pcard pcard--single";
    card.dataset.productId = item.id;

    // Derive PNG fallback from the webp image path (deployed) or keep as-is (local)
    const pngSrcSweet = item.image.endsWith('.webp') ? item.image.replace('.webp', '.png') : item.image;
    card.innerHTML = `
        <div class="pcard-img-wrap">
            <picture>
                <source srcset="${item.image}" type="image/webp">
                <img src="${pngSrcSweet}" alt="${item.name}" class="pcard-img" loading="lazy"
                     onerror="this.src='https://placehold.co/420x240/faf5ec/1e5631?text=Navya+Cloud+Kitchen'">
            </picture>
        </div>
        <header class="pcard-tags">
            <span class="pcard-tier">Sweet</span>
            <span class="pcard-benefit">${item.benefit}</span>
        </header>
        <div class="pcard-heading">
            <h3 class="pcard-name" lang="te">${item.name}</h3>
            ${item.sub ? `<div class="pcard-sub">${item.sub}</div>` : ""}
        </div>
        <p class="pcard-desc">${item.description}</p>
        ${item.allergens ? `<p class="pcard-allergens" aria-label="Allergen information"><strong>Allergen info:</strong> ${item.allergens}</p>` : ""}

        <div class="pcard-main">
            <span class="pcard-main-price">₹${item.price}</span>
            <span class="pcard-main-unit">${item.unitLabel}</span>
        </div>

        <button type="button" class="pcard-cta">
            ${CART_ICON_SVG}
            ${CHECK_ICON_SVG}
            <span class="pcard-cta-label">Add to cart</span>
        </button>
    `;

    const ctaBtn   = card.querySelector(".pcard-cta");
    const ctaLabel = ctaBtn.querySelector(".pcard-cta-label");
    const ctaCart  = ctaBtn.querySelector(".pcard-cta-cart");
    const ctaCheck = ctaBtn.querySelector(".pcard-cta-check");

    ctaBtn.addEventListener("click", () => {
        addSingleToCart(item);
        flashAddedState(ctaBtn, ctaLabel, ctaCart, ctaCheck, `Added · ₹${item.price}`);
    });

    return card;
}

// Swap the CTA to a check + custom label for 1.4s, then restore.
function flashAddedState(btn, label, cartIcon, checkIcon, addedText) {
    const originalText = label.dataset.original || label.textContent;
    label.dataset.original = originalText;
    label.textContent = addedText;
    cartIcon.style.display = "none";
    checkIcon.style.display = "";
    btn.classList.add("is-added");
    clearTimeout(btn._addedT);
    btn._addedT = setTimeout(() => {
        label.textContent = originalText;
        cartIcon.style.display = "";
        checkIcon.style.display = "none";
        btn.classList.remove("is-added");
    }, 1400);
}

/* ── Cart Logic ───────────────────────────────────────────── */
// Cart keys are composite for podulu variants (`kandi_podi:250`) and plain for
// sweets (`minapa_sunnundalu`). The rest of the drawer/checkout code just reads
// { name, price, qty } and does not care about the key format.
function addVariantToCart(item, size) {
    const key = `${item.id}:${size.grams}`;
    if (cart[key]) {
        cart[key].qty += 1;
    } else {
        cart[key] = {
            name: `${item.name} (${size.grams}g)`,
            price: size.price,
            qty: 1
        };
    }
    if (drawerOpen) refreshDrawerCartList();
    updateCartBar();
    animateCartBump();
}

function addSingleToCart(item) {
    const key = item.id;
    if (cart[key]) {
        cart[key].qty += 1;
    } else {
        cart[key] = {
            name: item.name,
            price: item.price,
            qty: 1
        };
    }
    if (drawerOpen) refreshDrawerCartList();
    updateCartBar();
    animateCartBump();
}

// Drawer +/- buttons call this via onclick. Composite keys work because we
// look up by whatever string was passed in.
window.changeQty = function(id, delta) {
    if (!cart[id]) return;
    cart[id].qty += delta;
    if (cart[id].qty <= 0) delete cart[id];
    if (drawerOpen) refreshDrawerCartList();
    updateCartBar();
};

function cartTotals() {
    let itemCount = 0, subtotal = 0;
    Object.values(cart).forEach(({ qty, price }) => {
        itemCount += qty;
        subtotal += qty * price;
    });
    return { itemCount, subtotal, total: subtotal };
}

function updateCartBar() {
    const { itemCount, total } = cartTotals();
    const bar = document.getElementById("stickyCartBar");
    const navBtn = document.getElementById("navCartBtn");
    const navBadge = document.getElementById("navCartBadge");
    const mmCartLink = document.getElementById("mmCartLink");
    const mmCartCount = document.getElementById("mmCartCount");

    if (itemCount > 0) {
        bar.style.display = "flex";
        navBtn.classList.add("has-items");
        navBadge.textContent = itemCount;
        if (mmCartLink) mmCartLink.classList.add("has-items");
        if (mmCartCount) mmCartCount.textContent = itemCount;
    } else {
        bar.style.display = "none";
        navBtn.classList.remove("has-items");
        if (mmCartLink) mmCartLink.classList.remove("has-items");
    }
    // Cart button stays visible at all times; only the badge toggles
    navBtn.style.display = "";

    document.getElementById("cartBarCount").textContent = `${itemCount} item${itemCount !== 1 ? "s" : ""}`;
    document.getElementById("cartBarTotal").textContent = `₹${total}`;
    document.getElementById("payBtnAmount").textContent = total;
}

function animateCartBump() {
    const btn = document.getElementById("navCartBtn");
    if (!btn) return;
    btn.style.transform = "scale(1.25)";
    setTimeout(() => btn.style.transform = "", 200);
}

/* ── Drawer ───────────────────────────────────────────────── */
function setupCartEvents() {
    document.getElementById("viewCartBtn").addEventListener("click", openDrawer);
    document.getElementById("navCartBtn").addEventListener("click", openDrawer);
    document.getElementById("closeDrawerBtn").addEventListener("click", closeDrawer);
    document.getElementById("drawerOverlay").addEventListener("click", closeDrawer);
    document.getElementById("checkoutForm").addEventListener("submit", e => { e.preventDefault(); submitOrderViaWhatsApp(); });
    document.getElementById("successCloseBtn").addEventListener("click", resetAfterOrder);
}

function openDrawer() {
    drawerOpen = true;
    refreshDrawerCartList();

    // Abandoned checkout hook
    sessionStorage.setItem('nk_checkout_started', Date.now());

    // GA4: begin_checkout event
    const { total } = cartTotals();
    const items = Object.values(cart).map(i => ({ item_name: i.name, price: i.price, quantity: i.qty }));
    window.gtag?.('event', 'begin_checkout', { value: total, currency: 'INR', items: items });

    const overlay = document.getElementById("drawerOverlay");
    const drawer = document.getElementById("cartDrawer");
    overlay.style.display = "block";
    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        const isDesktop = window.innerWidth >= 640;
        drawer.style.transform = isDesktop ? "translateX(-50%) translateY(0)" : "translateY(0)";
    });
}

function closeDrawer() {
    drawerOpen = false;
    const overlay = document.getElementById("drawerOverlay");
    const drawer = document.getElementById("cartDrawer");
    const isDesktop = window.innerWidth >= 640;
    drawer.style.transform = isDesktop ? "translateX(-50%) translateY(100%)" : "translateY(100%)";
    overlay.style.opacity = "0";
    setTimeout(() => { overlay.style.display = "none"; }, 320);
}

function refreshDrawerCartList() {
    const list = document.getElementById("cartItemsList");
    list.innerHTML = "";

    const keys = Object.keys(cart);
    if (keys.length === 0) {
        list.innerHTML = `<div style="text-align:center;padding:24px 0;color:var(--text-muted);font-size:0.88rem;">Your cart is empty.</div>`;
    } else {
        keys.forEach(id => {
            const { name, price, qty } = cart[id];
            const row = document.createElement("div");
            row.className = "cart-item";
            row.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${name}</div>
                    <div class="cart-item-price">₹${price} × ${qty} = ₹${price * qty}</div>
                </div>
                <div class="qty-controls" style="transform:scale(0.88);transform-origin:right;">
                    <button class="qty-btn" onclick="changeQty('${id}',-1);refreshDrawerCartList();">−</button>
                    <span class="qty-val">${qty}</span>
                    <button class="qty-btn" onclick="changeQty('${id}',1);refreshDrawerCartList();">+</button>
                </div>`;
            list.appendChild(row);
        });
    }

    const { subtotal, total } = cartTotals();
    document.getElementById("billSubtotal").textContent = `₹${subtotal}`;
    document.getElementById("billGrandTotal").textContent = `₹${total}`;
    document.getElementById("payBtnAmount").textContent = total;
}

/* ── Scroll Nav ───────────────────────────────────────────── */
function setupScrollNav() {
    const nav = document.getElementById("topNav");
    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });
}

/* ── Mobile Menu ──────────────────────────────────────────── */
function setupMobileMenu() {
    const menuBtn = document.getElementById("navMenuBtn");
    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("mobileMenuOverlay");
    const closeBtn = document.getElementById("mobileMenuClose");
    if (!menuBtn || !menu || !overlay) return;

    let lastFocused = null;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const trapFocus = (e) => {
        if (e.key !== "Tab" || !menu.classList.contains("is-open")) return;
        const focusables = menu.querySelectorAll(focusableSelector);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    };

    const openMenu = () => {
        lastFocused = document.activeElement;
        overlay.hidden = false;
        menu.setAttribute("aria-hidden", "false");
        // Next frame so transition applies
        requestAnimationFrame(() => {
            menu.classList.add("is-open");
            overlay.classList.add("is-open");
        });
        menuBtn.setAttribute("aria-expanded", "true");
        document.body.classList.add("menu-open");
        // Focus the close button for immediate keyboard control
        setTimeout(() => closeBtn && closeBtn.focus(), 100);
        document.addEventListener("keydown", handleKeydown);
    };

    const closeMenu = () => {
        menu.classList.remove("is-open");
        overlay.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("menu-open");
        document.removeEventListener("keydown", handleKeydown);
        // Wait for CSS transition before hiding overlay so it fades out
        setTimeout(() => {
            if (!menu.classList.contains("is-open")) overlay.hidden = true;
        }, 420);
        if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };

    const handleKeydown = (e) => {
        if (e.key === "Escape") { closeMenu(); return; }
        trapFocus(e);
    };

    menuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = menu.classList.contains("is-open");
        isOpen ? closeMenu() : openMenu();
    });
    closeBtn && closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // Auto-close on link tap
    menu.querySelectorAll("[data-close-menu]").forEach(el => {
        el.addEventListener("click", () => {
            // Small delay so the anchor navigation kicks in before we hide
            setTimeout(closeMenu, 50);
        });
    });

    // Cart link inside menu opens the cart drawer
    const mmCartLink = document.getElementById("mmCartLink");
    if (mmCartLink) {
        mmCartLink.addEventListener("click", (e) => {
            e.preventDefault();
            closeMenu();
            setTimeout(openDrawer, 300);
        });
    }

    // Products accordion (supports future multiple accordions on the same page)
    menu.querySelectorAll("[data-mm-accordion]").forEach(acc => {
        const trigger = acc.querySelector(".mm-accordion-trigger");
        const panelId = trigger.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        if (!trigger || !panel) return;
        trigger.addEventListener("click", () => {
            const expanded = trigger.getAttribute("aria-expanded") === "true";
            trigger.setAttribute("aria-expanded", String(!expanded));
            panel.hidden = expanded;
        });
    });

    // Close menu if viewport grows past mobile breakpoint (avoids stuck-open state on rotate)
    const desktopMQ = window.matchMedia("(min-width: 900px)");
    const onMQChange = (e) => {
        if (e.matches && menu.classList.contains("is-open")) closeMenu();
    };
    if (typeof desktopMQ.addEventListener === "function") {
        desktopMQ.addEventListener("change", onMQChange);
    } else {
        desktopMQ.addListener(onMQChange);
    }
}

/* ── Scroll Reveal ────────────────────────────────────────── */
function setupScrollReveal() {
    const els = document.querySelectorAll('.scroll-reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
}

/* ── Checkout ────────────────────────────────────────────────
   WhatsApp-first flow. A payment gateway (PhonePe) will be wired
   in later; until then the "Send Order via WhatsApp" button drops
   the customer straight into a pre-filled WhatsApp chat with the
   owner so the order can be confirmed and paid over UPI. */
function submitOrderViaWhatsApp() {
    const name    = document.getElementById("custName").value.trim();
    const phone   = document.getElementById("custPhone").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const date    = document.getElementById("deliveryDate").value;

    if (!name || !phone || !address || !date) return;
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!"); return;
    }

    const { total } = cartTotals();
    const orderRef = "NCK-" + Date.now().toString(36).toUpperCase();
    showSuccess(orderRef, total, name, phone, address, date);
}

/* ── Success Screen ───────────────────────────────────────── */
function showSuccess(orderId, total, name, phone, address, date) {
    closeDrawer();
    sessionStorage.removeItem('nk_checkout_started');

    // GA4: purchase event
    const items = Object.values(cart).map(i => ({ item_name: i.name, price: i.price, quantity: i.qty }));
    window.gtag?.('event', 'purchase', { transaction_id: orderId, value: total, currency: 'INR', items: items });

    document.getElementById("successMessage").textContent =
        `Order ready to send · Ref: ${orderId}`;

    const svg = {
        user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 12.8 12.8 0 0 0 2.8.7A2 2 0 0 1 22 16.9z"/></svg>`,
        pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
        calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        rupee: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12M6 8h12M6 13l9 8M6 13c8 0 8-10 0-10"/></svg>`,
    };
    document.getElementById("successOrderCard").innerHTML = `
        <strong>${svg.user}${name}</strong><br>
        ${svg.phone}${phone}<br>
        ${svg.pin}${address}<br>
        ${svg.calendar}Delivery: ${date}<br>
        ${svg.rupee}Items Total: ₹${total}
    `;

    const lines = Object.values(cart).map(i => `• ${i.name} ×${i.qty} (₹${i.price * i.qty})`).join("\n");
    const msg = encodeURIComponent(
        `*New Order - Navya Cloud Kitchen*\n\n` +
        `*Ref:* ${orderId}\n*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}\n*Date:* ${date}\n\n` +
        `*Items:*\n${lines}\n\n*Items Total: ₹${total}*\n` +
        `_Courier extra - paid to Rapido/Porter at drop-off._\n\nThank you! 🙏`
    );

    document.getElementById("whatsappShareBtn").onclick = () =>
        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${msg}`, "_blank");

    const screen = document.getElementById("successScreen");
    screen.style.display = "flex";
}

function resetAfterOrder() {
    cart = {};
    updateCartBar();
    document.getElementById("successScreen").style.display = "none";
    const activeKey = document.querySelector(".cat-pill.active")?.dataset?.category || "all";
    renderMenu(activeKey || "all");
}
