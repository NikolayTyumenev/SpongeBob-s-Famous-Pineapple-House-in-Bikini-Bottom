// Professional Cookie Consent for SpongeBob Pineapple House Website
// Version: 1.0
// Compatible with GDPR, CCPA, and other privacy regulations

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        cookieName: 'spongebob_cookie_consent',
        cookieExpireDays: 365,
        showDelay: 1500, // 1.5 seconds delay
        privacyPolicyUrl: 'https://www.iubenda.com/privacy-policy/89726833',
        cookiePolicyUrl: 'https://www.iubenda.com/privacy-policy/89726833/cookie-policy'
    };
    
    // Check if consent already given
    function hasConsent() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === CONFIG.cookieName) {
                return value;
            }
        }
        return null;
    }
    
    // Set cookie
    function setCookie(value) {
        const date = new Date();
        date.setTime(date.getTime() + (CONFIG.cookieExpireDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = CONFIG.cookieName + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    }
    
    // Create popup HTML
    function createPopup() {
        const popup = document.createElement('div');
        popup.id = 'cookieConsentPopup';
        popup.className = 'cookie-consent-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-labelledby', 'cookieConsentTitle');
        popup.setAttribute('aria-describedby', 'cookieConsentDesc');
        
        popup.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-icon">🍪</div>
                <div class="cookie-consent-text">
                    <h3 id="cookieConsentTitle">Welcome to Bikini Bottom! 🍍</h3>
                    <p id="cookieConsentDesc">
                        We use cookies to enhance your experience exploring SpongeBob's pineapple house. 
                        By clicking "Accept", you consent to our use of cookies for analytics and site functionality. 
                        <a href="${CONFIG.privacyPolicyUrl}" target="_blank" rel="noopener">Privacy Policy</a> | 
                        <a href="${CONFIG.cookiePolicyUrl}" target="_blank" rel="noopener">Cookie Policy</a>
                    </p>
                </div>
                <div class="cookie-consent-buttons">
                    <button id="cookieAccept" class="cookie-btn cookie-btn-accept" aria-label="Accept all cookies">
                        Accept All
                    </button>
                    <button id="cookieDecline" class="cookie-btn cookie-btn-decline" aria-label="Accept essential cookies only">
                        Essential Only
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Add styles
        addStyles();
        
        // Add event listeners
        document.getElementById('cookieAccept').addEventListener('click', acceptCookies);
        document.getElementById('cookieDecline').addEventListener('click', declineCookies);
        
        // Keyboard accessibility
        popup.addEventListener('keydown', handleKeyboard);
        
        // Show popup after delay
        setTimeout(() => {
            popup.classList.add('show');
            // Focus first button for accessibility
            document.getElementById('cookieAccept').focus();
        }, CONFIG.showDelay);
    }
    
    // Add CSS styles
    function addStyles() {
        if (document.getElementById('cookieConsentStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'cookieConsentStyles';
        style.textContent = `
            .cookie-consent-popup {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                max-width: 500px;
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                z-index: 999999;
                transform: translateY(150%);
                transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border: 3px solid #FF8C00;
                font-family: Arial, sans-serif;
            }
            
            .cookie-consent-popup.show {
                transform: translateY(0);
            }
            
            .cookie-consent-content {
                padding: 25px;
                color: #2C3E50;
            }
            
            .cookie-consent-icon {
                font-size: 3rem;
                text-align: center;
                margin-bottom: 15px;
                animation: wiggle 2s ease-in-out infinite;
            }
            
            @keyframes wiggle {
                0%, 100% { transform: rotate(-5deg); }
                50% { transform: rotate(5deg); }
            }
            
            .cookie-consent-text h3 {
                margin: 0 0 10px 0;
                color: #004B8D;
                font-size: 1.3rem;
                font-weight: bold;
            }
            
            .cookie-consent-text p {
                margin: 0 0 20px 0;
                line-height: 1.6;
                font-size: 0.95rem;
            }
            
            .cookie-consent-text a {
                color: #004B8D;
                text-decoration: underline;
                font-weight: bold;
            }
            
            .cookie-consent-text a:hover {
                color: #00CED1;
            }
            
            .cookie-consent-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .cookie-btn {
                flex: 1;
                min-width: 120px;
                padding: 12px 20px;
                border: none;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.95rem;
            }
            
            .cookie-btn-accept {
                background: #00CED1;
                color: white;
            }
            
            .cookie-btn-accept:hover,
            .cookie-btn-accept:focus {
                background: #008B8B;
                transform: scale(1.05);
                box-shadow: 0 5px 15px rgba(0, 206, 209, 0.4);
                outline: 2px solid #004B8D;
                outline-offset: 2px;
            }
            
            .cookie-btn-decline {
                background: rgba(255, 255, 255, 0.8);
                color: #2C3E50;
            }
            
            .cookie-btn-decline:hover,
            .cookie-btn-decline:focus {
                background: rgba(255, 255, 255, 1);
                transform: scale(1.05);
                outline: 2px solid #004B8D;
                outline-offset: 2px;
            }
            
            /* Mobile responsiveness */
            @media (max-width: 480px) {
                .cookie-consent-popup {
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                    max-width: none;
                }
                
                .cookie-consent-content {
                    padding: 20px;
                }
                
                .cookie-consent-text h3 {
                    font-size: 1.1rem;
                }
                
                .cookie-consent-text p {
                    font-size: 0.85rem;
                }
                
                .cookie-consent-buttons {
                    flex-direction: column;
                }
                
                .cookie-btn {
                    width: 100%;
                }
            }
            
            /* Print: hide popup */
            @media print {
                .cookie-consent-popup {
                    display: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Accept cookies
    function acceptCookies() {
        setCookie('accepted');
        hidePopup();
        enableAnalytics();
        console.log('✓ Cookie consent: All cookies accepted');
    }
    
    // Decline non-essential cookies
    function declineCookies() {
        setCookie('essential-only');
        hidePopup();
        console.log('✓ Cookie consent: Essential cookies only');
    }
    
    // Hide popup
    function hidePopup() {
        const popup = document.getElementById('cookieConsentPopup');
        if (popup) {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 500);
        }
    }
    
    // Enable Google Analytics if accepted
    function enableAnalytics() {
        // Google Analytics is already loaded in the page
        // This function just confirms consent was given
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }
    
    // Keyboard navigation
    function handleKeyboard(e) {
        if (e.key === 'Escape') {
            declineCookies();
        }
        
        // Tab trap
        const focusableElements = e.currentTarget.querySelectorAll(
            'a[href], button:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
    
    // Public API
    window.CookieConsent = {
        show: function() {
            const existing = document.getElementById('cookieConsentPopup');
            if (!existing && !hasConsent()) {
                createPopup();
            }
        },
        reset: function() {
            document.cookie = CONFIG.cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            console.log('✓ Cookie consent reset');
        },
        getStatus: function() {
            return hasConsent();
        }
    };
    
    // Initialize on page load
    function init() {
        // Check if consent already given
        const consent = hasConsent();
        
        if (!consent) {
            // No consent yet, show popup
            createPopup();
        } else if (consent === 'accepted') {
            // Consent previously given, enable analytics
            enableAnalytics();
        }
    }
    
    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();