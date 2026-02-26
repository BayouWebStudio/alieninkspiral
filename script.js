// Global variables
let cursorGlow;
let mobileMenuOpen = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initCursorGlow();
    initMobileMenu();
    initSmoothScrolling();
    initCountdown();
    initScrollAnimations();
    initNavigation();
    initPortfolioHover();
});

// Cursor Glow Effect
function initCursorGlow() {
    cursorGlow = document.getElementById('cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX - 10 + 'px';
        cursorGlow.style.top = e.clientY - 10 + 'px';
        cursorGlow.style.opacity = '0.8';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '0.8';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileMenuOpen = !mobileMenuOpen;
            
            if (mobileMenuOpen) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
                navLinks.style.padding = '2rem';
                navLinks.style.backdropFilter = 'blur(20px)';
                navLinks.style.borderTop = '1px solid var(--border-subtle)';
                
                // Animate mobile menu toggle
                mobileToggle.classList.add('active');
            } else {
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.width = '';
                navLinks.style.background = '';
                navLinks.style.padding = '';
                navLinks.style.backdropFilter = '';
                navLinks.style.borderTop = '';
                
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenuOpen) {
                    const mobileToggle = document.querySelector('.mobile-menu-toggle');
                    mobileToggle.click();
                }
            }
        });
    });
}

// Countdown Timer
function initCountdown() {
    const seminarDate = new Date('2026-04-25T09:00:00-05:00'); // April 25, 2026 9:00 AM CST
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = seminarDate.getTime() - now;
        
        if (distance < 0) {
            // Event has passed
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    }
    
    // Update countdown immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.portfolio-item, .contact-method, .about-text, .seminar-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navigation Active State
function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Portfolio Hover Effects
function initPortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax for hero geometric pattern
    const geometricPattern = document.querySelector('.geometric-pattern');
    if (geometricPattern) {
        geometricPattern.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`;
    }
    
    // Parallax for sacred geometry
    const sacredGeometry = document.querySelector('.sacred-geometry');
    if (sacredGeometry) {
        sacredGeometry.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
});

// Contact Method Interactions
document.addEventListener('DOMContentLoaded', () => {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'translateY(-5px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });
});

// Geometric Animation Control
function startGeometricAnimations() {
    const rotatingElements = document.querySelectorAll('.rotating-geometry, .sacred-geometry');
    
    rotatingElements.forEach(element => {
        element.style.animationPlayState = 'running';
    });
}

// Performance optimization: Pause animations when not visible
const geometricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const animations = entry.target.querySelectorAll('[class*="rotating"], [class*="sacred-geometry"]');
        
        if (entry.isIntersecting) {
            animations.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        } else {
            animations.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    geometricObserver.observe(section);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        mobileToggle.click();
    }
});

// Smooth reveal animation for hero elements
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-name, .hero-title, .hero-subtitle, .hero-location, .hero-studio, .hero-stats');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Easter egg: Konami code for special effect
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Activate special geometric light show
        document.body.style.filter = 'hue-rotate(180deg)';
        
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        konamiCode = [];
    }
});

// Enhanced mobile experience
function handleMobileOrientation() {
    const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    
    if (window.innerWidth < 768) {
        // Adjust layout for mobile
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && window.innerWidth < 480) {
            heroStats.style.flexDirection = 'column';
            heroStats.style.gap = '1rem';
        }
    }
}

window.addEventListener('resize', handleMobileOrientation);
window.addEventListener('orientationchange', handleMobileOrientation);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleMobileOrientation);
} else {
    handleMobileOrientation();
}