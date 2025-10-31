// Main JavaScript file for SpongeBob Pineapple House website
// Place this file in: js/main.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMobileMenu();
    initBubbleAnimations();
    initScrollEffects();
    initPageTransitions();
    initAccessibility();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const pineappleMenu = document.getElementById('pineappleMenu');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.mobile-nav a');
    
    if (pineappleMenu && mobileNav) {
        // Toggle menu on click
        pineappleMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Pineapple menu clicked!'); // Debug log
            toggleMenu();
        });
        
        // Also add touch event for better mobile support
        pineappleMenu.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent double-firing on some devices
            e.stopPropagation();
            console.log('Pineapple menu touched!'); // Debug log
            toggleMenu();
        }, {passive: false});
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileNav.contains(e.target) && !pineappleMenu.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }
}

// Toggle menu function
function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const pineappleMenu = document.getElementById('pineappleMenu');
    
    if (mobileNav && pineappleMenu) {
        const isOpen = mobileNav.classList.contains('active');
        console.log('Menu is currently:', isOpen ? 'open' : 'closed'); // Debug log
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    } else {
        console.error('Menu elements not found!', {
            mobileNav: !!mobileNav,
            pineappleMenu: !!pineappleMenu
        });
    }
}

// Open menu
function openMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const pineappleMenu = document.getElementById('pineappleMenu');
    
    mobileNav.classList.add('active');
    pineappleMenu.classList.add('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    // Set aria attributes for accessibility
    pineappleMenu.setAttribute('aria-expanded', 'true');
}

// Close menu
function closeMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const pineappleMenu = document.getElementById('pineappleMenu');
    
    mobileNav.classList.remove('active');
    pineappleMenu.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Set aria attributes for accessibility
    pineappleMenu.setAttribute('aria-expanded', 'false');
}

// Bubble Animations
function initBubbleAnimations() {
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach((bubble, index) => {
        // Add staggered animation delay
        bubble.style.animationDelay = `${index * 0.2}s`;
        
        // Add random float duration for variety
        const duration = 3 + Math.random() * 2;
        bubble.style.animationDuration = `${duration}s`;
        
        // Add click/tap event for popping
        bubble.addEventListener('click', popBubble);
        bubble.addEventListener('touchstart', popBubble);
    });
    
    // Create additional floating bubbles
    createFloatingBubbles();
}

// Pop bubble animation
function popBubble(e) {
    e.preventDefault();
    const bubble = e.currentTarget;
    
    // Don't pop if already popping
    if (bubble.classList.contains('popping')) return;
    
    // Store the original text
    const originalText = bubble.textContent;
    
    // Create burst particles effect
    createBurstParticles(bubble);
    
    // Add popping animation
    bubble.classList.add('popping');
    
    // Hide the bubble after pop
    setTimeout(() => {
        bubble.style.visibility = 'hidden';
        bubble.classList.remove('popping');
        
        // Change the text while hidden
        const messages = [
            'The pineapple fell from a boat!',
            'It has 12 rooms total!',
            'Regenerates in 24 hours!',
            'Symbol of hospitality!',
            'Gary reads books!',
            'Has 3 floors!',
            'Self-cleaning home!',
            'Built-in furniture!',
            'Destroyed 20 times!',
            'Creator was a marine biologist!'
        ];
        
        let randomMessage = messages[Math.floor(Math.random() * messages.length)];
        while (randomMessage === bubble.textContent) {
            randomMessage = messages[Math.floor(Math.random() * messages.length)];
        }
        bubble.textContent = randomMessage;
        
        // Regenerate bubble
        setTimeout(() => {
            bubble.style.visibility = 'visible';
            bubble.classList.add('regenerating');
            
            setTimeout(() => {
                bubble.classList.remove('regenerating');
                // Restore original text after 3 seconds
                setTimeout(() => {
                    bubble.textContent = originalText;
                }, 3000);
            }, 400);
        }, 300);
    }, 200);
}

// Create burst particle effect when bubble pops
function createBurstParticles(bubble) {
    const rect = bubble.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 6-8 small bubble particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'bubble-particle';
        
        // Random size for each particle
        const size = 10 + Math.random() * 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position at bubble center
        particle.style.left = `${centerX - size/2}px`;
        particle.style.top = `${centerY - size/2}px`;
        
        // Random direction for burst
        const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.5;
        const velocity = 50 + Math.random() * 100;
        const translateX = Math.cos(angle) * velocity;
        const translateY = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', `${translateX}px`);
        particle.style.setProperty('--ty', `${translateY}px`);
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
}

// Create floating background bubbles
function createFloatingBubbles() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'floating-bubbles-container';
    bubbleContainer.setAttribute('aria-hidden', 'true');
    
    // Create 5 random bubbles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSingleBubble(bubbleContainer);
        }, i * 2000);
    }
    
    document.body.appendChild(bubbleContainer);
}

// Create a single floating bubble
function createSingleBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    
    // Random size
    const size = 20 + Math.random() * 40;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random horizontal position
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Random animation duration
    const duration = 10 + Math.random() * 10;
    bubble.style.animationDuration = `${duration}s`;
    
    // Make floating bubbles clickable too
    bubble.style.pointerEvents = 'auto';
    bubble.style.cursor = 'pointer';
    
    // Add pop effect to floating bubbles
    bubble.addEventListener('click', function(e) {
        e.stopPropagation();
        const bubbleElement = e.currentTarget;
        bubbleElement.style.animation = 'pop 0.4s ease-out forwards';
        setTimeout(() => {
            bubbleElement.remove();
            // Create a new bubble to replace it
            createSingleBubble(container);
        }, 400);
    });
    
    container.appendChild(bubble);
    
    // Remove bubble after animation (if not popped)
    bubble.addEventListener('animationend', (e) => {
        if (e.animationName === 'floatUp') {
            bubble.remove();
            // Create a new bubble to maintain the effect
            createSingleBubble(container);
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove header shadow on scroll
            if (scrollTop > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll (mobile)
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }
            }
            
            lastScrollTop = scrollTop;
            
            // Reveal animations
            revealOnScroll();
            
        }, 100));
    }
}

// Reveal elements on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature-card, .info-item, .bubble');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Page Transitions
function initPageTransitions() {
    // Add fade-in effect on page load
    document.body.classList.add('page-loaded');
    
    // Smooth transitions for internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href$=".html"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's not an anchor link
            if (!href.includes('#')) {
                e.preventDefault();
                
                // Add fade-out effect
                document.body.classList.add('page-transition');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// Accessibility Features
function initAccessibility() {
    // Add keyboard navigation for menu
    const pineappleMenu = document.getElementById('pineappleMenu');
    
    if (pineappleMenu) {
        pineappleMenu.setAttribute('role', 'button');
        pineappleMenu.setAttribute('aria-label', 'Toggle navigation menu');
        pineappleMenu.setAttribute('aria-expanded', 'false');
        pineappleMenu.setAttribute('tabindex', '0');
        
        // Allow keyboard activation
        pineappleMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }
    
    // Manage focus for mobile menu
    manageFocusTrap();
}

// Focus trap for mobile menu
function manageFocusTrap() {
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileNav) {
        const focusableElements = mobileNav.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        mobileNav.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

// Utility Functions

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}



// Export functions for use in other scripts
window.spongebobSite = {
    toggleMenu,
    openMenu,
    closeMenu,
    createFloatingBubbles,
    throttle,
    debounce
};