/* =========================================================
   ORDERFLOW PRO — CONFIG (COMPLETE)
   ========================================================= */

const CONFIG = {
    // 🔥 API KEY — YAHAN CHANGE KARO
    API_KEY: "f47e845b93-9ddae98daa-tjwc72",
    
    // 🔥 SYMBOL
    SYMBOL: "EUR/USD",
    
    // 🔥 TIMEFRAME
    INTERVAL: "1min",
    
    // 🔥 PRICE SOURCE — FASTFOREX | EXCHANGERATE | CURRENCYAPI | SIMULATED
    PRICE_SOURCE: "fastforex",
    
    // 🔥 UPDATE INTERVAL (ms)
    UPDATE_INTERVAL: 1000,
    
    // 🔥 TRADING SETTINGS
    EXPIRY_MINUTES: 2,
    LIQUIDITY_THRESHOLD: 60,
    QUALITY_THRESHOLD: 40,
    ENTRY_THRESHOLD: 40,
    
    // 🔥 CHART COLORS
    CHART_COLORS: {
        up: "#00ff88",
        down: "#ff4444"
    }
};

/* =========================================================
   TIMEFRAME FUNCTIONS
   ========================================================= */

function signalTimeframe() {
    if (CONFIG.INTERVAL === "1min") return "1M";
    if (CONFIG.INTERVAL === "5min") return "5M";
    return CONFIG.INTERVAL;
}

function signalExpiry() {
    if (CONFIG.INTERVAL === "1min") return "1 Minute";
    if (CONFIG.INTERVAL === "5min") return "5 Minutes";
    return "Auto";
}

function aiTimeframeLock() {
    return CONFIG.INTERVAL === "1min" || CONFIG.INTERVAL === "5min";
}

function changeTimeframe(tf) {
    CONFIG.INTERVAL = tf;
    /* Update UI if needed */
    const timeframeSelect = document.getElementById("timeframe");
    if (timeframeSelect) {
        timeframeSelect.value = tf;
    }
    const chartTimeframe = document.getElementById("chartTimeframe");
    if (chartTimeframe) {
        chartTimeframe.textContent = tf === "1min" ? "1 MIN" : "5 MIN";
    }
    console.log("✅ TIMEFRAME CHANGED:", tf);
}

/* =========================================================
   🔥 ADMIN FUNCTIONS — API KEY CHANGE
   ========================================================= */

function updateConfig(newConfig) {
    // 🔥 Update all config values
    if (newConfig.API_KEY) CONFIG.API_KEY = newConfig.API_KEY;
    if (newConfig.PRICE_SOURCE) CONFIG.PRICE_SOURCE = newConfig.PRICE_SOURCE;
    if (newConfig.UPDATE_INTERVAL) CONFIG.UPDATE_INTERVAL = newConfig.UPDATE_INTERVAL;
    if (newConfig.INTERVAL) CONFIG.INTERVAL = newConfig.INTERVAL;
    
    // 🔥 Save to localStorage
    try {
        localStorage.setItem('orderflow_config', JSON.stringify(CONFIG));
    } catch (e) {}
    
    console.log("✅ CONFIG UPDATED:", CONFIG);
    return CONFIG;
}

function getConfig() {
    return CONFIG;
}

function getApiKey() {
    return CONFIG.API_KEY;
}

function setApiKey(newKey) {
    CONFIG.API_KEY = newKey;
    try {
        localStorage.setItem('orderflow_config', JSON.stringify(CONFIG));
    } catch (e) {}
    console.log("✅ API KEY UPDATED");
    return CONFIG.API_KEY;
}

/* =========================================================
   🔥 LOAD SAVED CONFIG FROM localStorage
   ========================================================= */

function loadSavedConfig() {
    try {
        const saved = localStorage.getItem('orderflow_config');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge saved config with default
            Object.keys(parsed).forEach(key => {
                if (CONFIG[key] !== undefined) {
                    CONFIG[key] = parsed[key];
                }
            });
            console.log("✅ CONFIG LOADED FROM localStorage");
        }
    } catch (e) {
        console.log("⚠️ No saved config found");
    }
}

// 🔥 Auto-load saved config
loadSavedConfig();

/* =========================================================
   CONSOLE LOG
   ========================================================= */

console.log("✅ CONFIG — Loaded");
console.log("   API_KEY:", CONFIG.API_KEY);
console.log("   SYMBOL:", CONFIG.SYMBOL);
console.log("   INTERVAL:", CONFIG.INTERVAL);
console.log("   PRICE_SOURCE:", CONFIG.PRICE_SOURCE);
console.log("   UPDATE_INTERVAL:", CONFIG.UPDATE_INTERVAL + "ms");
console.log("   EXPIRY:", CONFIG.EXPIRY_MINUTES + " minutes");