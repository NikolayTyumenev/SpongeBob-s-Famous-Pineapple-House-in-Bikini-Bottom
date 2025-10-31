// Cookie Consent Manager for SpongeBob Pineapple House
// Place this file in: js/cookie-consent.js

(function() {
    'use strict';
    
    // Cookie consent configuration
    const config = {
        cookieName: 'spongebob_cookie_consent',
        cookieExpireDays: 365, // 1 year
        popupDelay: 2000, // 2 seconds
        theme: 'pineapple' // Custom theme
    };
    
    // Initialize cookie consent
    function initCookieConsent() {
        // Create the popup if it doesn't exist
        if (!document.getElementById('cookiePopup')) {
            createCookiePopup();
        }
        
        // Check cookie status after delay
        setTimeout(() => {
            checkCookieStatus();
        }, config.popupDelay);
        
        // Setup event listeners
        setupEventListeners();
    }
    
    // Create the cookie popup HTML
    function createCookiePopup() {
        const popupHTML = `
            <div id="cookiePopup" class="cookie-popup hide">
                <div class="cookie-content">
                    <div class="cookie-icon">🍪</div>
                    <div class="cookie-text">
                        <h3>Welcome to Bikini Bottom! 🍍</h3>
                        <p>We use cookies to make your underwater adventure even better! 
                        These help us remember your preferences and improve your experience 
                        exploring SpongeBob's pineapple house.</p>
                    </div>
                    <div class="cookie-buttons">
                        <button id="acceptCookie" class="cookie-btn accept">
                            Accept All Cookies
                        </button>
                        <button id="declineCookie" class="cookie-btn decline">
                            Essential Only
                        </button>
                        <button id="cookieSettings" class="cookie-btn settings">
                            ⚙️ Settings
                        </button>
                    </div>
                </div>
                
                <!-- Cookie Settings Panel (hidden by default) -->
                <div id="cookieSettingsPanel" class="cookie-settings-panel hide">
                    <h4>Cookie Preferences</h4>
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="essentialCookies" checked disabled>
                            <span>Essential Cookies (Required)</span>
                        </label>
                        <small>Necessary for the website to function properly</small>
                    </div>
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="analyticsCookies" checked>
                            <span>Analytics Cookies</span>
                        </label>
                        <small>Help us understand how visitors use our site</small>
                    </div>
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="marketingCookies">
                            <span>Marketing Cookies</span>
                        </label>
                        <small>Used to show personalized content</small>
                    </div>
                    <button id="saveSettings" class="cookie-btn accept">
                        Save Preferences
                    </button>
                </div>
            </div>
        `;
        
        // Add popup to body
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        
        // Add styles if not already present
        addCookieStyles();
    }
    
    // Add CSS styles for cookie popup
    function addCookieStyles() {
        if (!document.getElementById('cookieConsentStyles')) {
            const styles = `
                <style id="cookieConsentStyles">
                    .cookie-popup {
                        position: fixed;
                        bottom: 20px;
                        left: 20px;
                        right: 20px;
                        max-width: 500px;
                        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                        border-radius: 20px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                        z-index: 10000;
                        transform: translateY(150%);
                        transition: transform 0.5s ease;
                        border: 3px solid #FF8C00;
                    }
                    
                    .cookie-popup.show {
                        transform: translateY(0);
                    }
                    
                    .cookie-popup.hide {
                        transform: translateY(150%);
                    }
                    
                    .cookie-content {
                        padding: 25px;
                        color: #2C3E50;
                    }
                    
                    .cookie-icon {
                        font-size: 3rem;
                        text-align: center;
                        margin-bottom: 15px;
                        animation: wiggle 2s ease-in-out infinite;
                    }
                    
                    @keyframes wiggle {
                        0%, 100% { transform: rotate(-3deg); }
                        50% { transform: rotate(3deg); }
                    }
                    
                    .cookie-text h3 {
                        margin-bottom: 10px;
                        color: #004B8D;
                        font-size: 1.3rem;
                    }
                    
                    .cookie-text p {
                        margin-bottom: 20px;
                        line-height: 1.5;
                        font-size: 0.95rem;
                    }
                    
                    .cookie-buttons {
                        display: flex;
                        gap: 10px;
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                    
                    .cookie-btn {
                        padding: 10px 20px;
                        border: none;
                        border-radius: 25px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-size: 0.9rem;
                    }
                    
                    .cookie-btn.accept {
                        background: #00CED1;
                        color: white;
                    }
                    
                    .cookie-btn.accept:hover {
                        background: #008B8B;
                        transform: scale(1.05);
                    }
                    
                    .cookie-btn.decline {
                        background: rgba(255, 255, 255, 0.7);
                        color: #2C3E50;
                    }
                    
                    .cookie-btn.decline:hover {
                        background: rgba(255, 255, 255, 0.9);
                    }
                    
                    .cookie-btn.settings {
                        background: transparent;
                        color: #004B8D;
                        border: 2px solid #004B8D;
                        padding: 8px 15px;
                    }
                    
                    .cookie-btn.settings:hover {
                        background: rgba(0, 75, 141, 0.1);
                    }
                    
                    .cookie-settings-panel {
                        padding: 20px;
                        border-top: 2px dashed #FF8C00;
                        display: none;
                    }
                    
                    .cookie-settings-panel.show {
                        display: block;
                    }
                    
                    .cookie-settings-panel h4 {
                        margin-bottom: 15px;
                        color: #004B8D;
                    }
                    
                    .cookie-option {
                        margin-bottom: 15px;
                    }
                    
                    .cookie-option label {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        font-weight: bold;
                    }
                    
                    .cookie-option input {
                        margin-right: 10px;
                        width: 18px;
                        height: 18px;
                    }
                    
                    .cookie-option small {
                        display: block;
                        margin-left: 28px;
                        color: #666;
                        font-size: 0.85rem;
                        margin-top: 5px;
                    }
                    
                    @media (max-width: 480px) {
                        .cookie-popup {
                            left: 10px;
                            right: 10px;
                            bottom: 10px;
                        }
                        
                        .cookie-buttons {
                            flex-direction: column;
                        }
                        
                        .cookie-btn {
                            width: 100%;
                        }
                    }
                </style>
            `;
            
            document.head.insertAdjacentHTML('beforeend', styles);
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Accept button
        const acceptBtn = document.getElementById('acceptCookie');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                setCookieConsent('all');
                hidePopup();
                console.log('🍪 All cookies accepted!');
            });
        }
        
        // Decline button
        const declineBtn = document.getElementById('declineCookie');
        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                setCookieConsent('essential');
                hidePopup();
                console.log('🍪 Only essential cookies accepted');
            });
        }
        
        // Settings button
        const settingsBtn = document.getElementById('cookieSettings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', toggleSettings);
        }
        
        // Save settings button
        const saveBtn = document.getElementById('saveSettings');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveCustomSettings);
        }
    }
    
    // Toggle settings panel
    function toggleSettings() {
        const settingsPanel = document.getElementById('cookieSettingsPanel');
        const isVisible = settingsPanel.classList.contains('show');
        
        if (isVisible) {
            settingsPanel.classList.remove('show');
            settingsPanel.classList.add('hide');
        } else {
            settingsPanel.classList.remove('hide');
            settingsPanel.classList.add('show');
        }
    }
    
    // Save custom cookie settings
    function saveCustomSettings() {
        const analytics = document.getElementById('analyticsCookies').checked;
        const marketing = document.getElementById('marketingCookies').checked;
        
        const preferences = {
            essential: true,
            analytics: analytics,
            marketing: marketing
        };
        
        setCookieConsent('custom', preferences);
        hidePopup();
        console.log('🍪 Custom cookie preferences saved:', preferences);
    }
    
    // Set cookie consent
    function setCookieConsent(type, preferences = null) {
        const date = new Date();
        date.setDate(date.getDate() + config.cookieExpireDays);
        
        let cookieValue = type;
        if (preferences) {
            cookieValue = JSON.stringify(preferences);
        }
        
        document.cookie = `${config.cookieName}=${cookieValue}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
        
        // Trigger custom event for analytics
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
            detail: { type, preferences } 
        }));
    }
    
    // Get cookie value
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }
    
    // Check cookie status
    function checkCookieStatus() {
        const consent = getCookie(config.cookieName);
        const popup = document.getElementById('cookiePopup');
        
        if (!popup) return;
        
        if (consent) {
            // Cookie exists, hide popup
            popup.classList.add('hide');
            popup.classList.remove('show');
            console.log('🍪 Cookie consent already given:', consent);
        } else {
            // No cookie, show popup
            popup.classList.remove('hide');
            popup.classList.add('show');
            console.log('🍪 Showing cookie consent popup');
        }
    }
    
    // Hide popup
    function hidePopup() {
        const popup = document.getElementById('cookiePopup');
        if (popup) {
            popup.classList.add('hide');
            popup.classList.remove('show');
        }
    }
    
    // Public API
    window.cookieConsent = {
        reset: function() {
            document.cookie = `${config.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            checkCookieStatus();
        },
        getStatus: function() {
            return getCookie(config.cookieName);
        },
        showPopup: function() {
            const popup = document.getElementById('cookiePopup');
            if (popup) {
                popup.classList.remove('hide');
                popup.classList.add('show');
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }
    
})();