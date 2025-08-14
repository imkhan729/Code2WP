// DOM Content Loaded
// Intercept clean URLs (no .html) for local static hosting
// Converts /blog/slug -> /blog/slug.html and /privacy-policy -> /privacy-policy.html
document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const url = new URL(anchor.getAttribute('href'), window.location.origin);
    // Only same-origin links
    if (url.origin !== window.location.origin) return;
    // Ignore hash-only and mailto/tel
    if (url.hash && (url.pathname === window.location.pathname)) return;
    if (anchor.hasAttribute('download')) return;
    const cleanBlog = /^\/blog\/([^/.#?]+)$/; // /blog/slug
    const cleanRoot = /^\/(privacy-policy|terms-of-service|dmca)$/; // /page
    // If your server supports extensionless URLs, do nothing and let it navigate.
    // If not (local file hosting), you can re-enable the fallback below by removing the return.
    return;
    // Fallback (disabled): map extensionless URLs to .html for local preview
    // if (cleanBlog.test(url.pathname)) {
    //     e.preventDefault();
    //     const slug = url.pathname.match(cleanBlog)[1];
    //     window.location.href = `/blog/${slug}.html${url.search || ''}${url.hash || ''}`;
    // } else if (cleanRoot.test(url.pathname)) {
    //     e.preventDefault();
    //     const page = url.pathname.replace(/^\//, '');
    //     window.location.href = `/${page}.html${url.search || ''}${url.hash || ''}`;
    // }
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const nowActive = !navMenu.classList.contains('active');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(nowActive));
            
            // Prevent body scroll when menu is open
            if (nowActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });
    });

    // Header Background on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Installation Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Simulate newsletter signup
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .review-card, .step, .section-header').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Counter Animation for Statistics
    const stats = document.querySelectorAll('.stat-number');
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers with appropriate suffixes
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K+';
            } else {
                element.textContent = current.toFixed(1) + '★';
            }
        }, 16);
    };

    // Animate statistics when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const text = statElement.textContent;
                
                if (text.includes('10M+')) {
                    animateCounter(statElement, 10000000);
                } else if (text.includes('4.8★')) {
                    animateCounter(statElement, 4.8);
                } else if (text.includes('1000+')) {
                    animateCounter(statElement, 1000);
                }
                
                statsObserver.unobserve(statElement);
            }
        });
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Download Button Click Tracking
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'APK',
                    'event_label': 'AlightMotion Premium'
                });
            }
        });
    });

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Showcase Carousel
    const scTrack = document.querySelector('.showcase-track');
    const scPrev = document.querySelector('.showcase-nav.prev');
    const scNext = document.querySelector('.showcase-nav.next');
    const scDots = document.querySelector('.showcase-dots');

    if (scTrack) {
        const slides = () => Array.from(scTrack.children);
        slides().forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'showcase-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => jump(i));
            scDots.appendChild(dot);
        });

        let idx = 0;
        const updateDots = () => {
            scDots.querySelectorAll('.showcase-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
        };

        const step = () => {
            const w = slides()[0].getBoundingClientRect().width + 16;
            scTrack.style.transition = 'transform 0.45s ease';
            scTrack.style.transform = `translateX(-${w}px)`;
            setTimeout(() => {
                scTrack.style.transition = 'none';
                scTrack.style.transform = 'translateX(0)';
                scTrack.appendChild(slides()[0]);
                idx = (idx + 1) % slides().length;
                updateDots();
            }, 450);
        };

        const jump = (target) => {
            let diff = (target - idx + slides().length) % slides().length;
            if (diff === 0) return;
            let count = 0;
            const run = () => { step(); if (++count < diff) setTimeout(run, 120); };
            run();
        };

        let auto = setInterval(step, 1500);
        const wrapper = document.querySelector('.showcase-wrapper');
        const pause = () => { clearInterval(auto); auto = null; };
        const resume = () => { if (!auto) auto = setInterval(step, 1500); };
        wrapper && wrapper.addEventListener('mouseenter', pause);
        wrapper && wrapper.addEventListener('mouseleave', resume);
        scPrev && scPrev.addEventListener('click', () => {
            const s = slides();
            scTrack.insertBefore(s[s.length - 1], s[0]);
            idx = (idx - 1 + s.length) % s.length;
            updateDots();
        });
        scNext && scNext.addEventListener('click', step);
    }

    // Search Functionality (if search is implemented)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('[data-searchable]');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(query) || query === '') {
                    element.style.display = '';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }

    // Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed 0%, #10b981 100%);
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(backToTop);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Tab navigation for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });

    // Performance Optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler
    const optimizedScrollHandler = debounce(function() {
        const scrolled = window.scrollY > 100;
        header.classList.toggle('scrolled', scrolled);
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);
});

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Theme Toggle (Optional)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌓';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        cursor: pointer;
        font-size: 18px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Save theme preference
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDark);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
}

// Initialize theme toggle (uncomment if needed)
// initThemeToggle();

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Google Analytics (replace with your tracking ID)
function initGoogleAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID';
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
}

// Uncomment to enable Google Analytics
// initGoogleAnalytics();
