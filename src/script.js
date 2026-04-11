// ===========================
// Navigation & General Interactions
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for shadow
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Page transition handler for external page links - Smooth fade without shaking
    document.querySelectorAll('a.page-transition').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('#')) return;
            
            e.preventDefault();
            
            // Determine target page color
            const goingToProjects = href.includes('projects.html');
            const isCurrentlyOnProjects = window.location.pathname.includes('projects.html');
            
            // Current page color
            const currentColor = isCurrentlyOnProjects ? '#1A1A19' : '#FDFAF0';
            
            // Create fade overlay - simple linear fade, no bouncing
            const fadeOverlay = document.createElement('div');
            fadeOverlay.setAttribute('data-fade-overlay', 'true');
            fadeOverlay.style.cssText = `
                position: fixed;
                inset: 0;
                background: ${currentColor};
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.4s ease-in;
                pointer-events: none;
                will-change: opacity;
            `;
            document.body.appendChild(fadeOverlay);
            
            // Fade in smoothly without bouncing
            requestAnimationFrame(() => {
                fadeOverlay.style.opacity = '1';
            });
            
            // Navigate after fade
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
    
    // Active nav link on scroll (for single page)
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const navbarHeight = navbar.offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // Fade-in animation for elements on scroll
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
    
    // Observe elements for fade-in
    const fadeElements = document.querySelectorAll('.bio-item, .research-card, .contact-card, .project-card');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Page transition effect
    window.addEventListener('beforeunload', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
    });
    
    // Ensure page is visible on load
    document.body.style.opacity = '1';
    
    // Fade in when page loads - removes transition overlay
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Find and fade out any existing transition overlay
            const existingOverlay = document.querySelector('[data-fade-overlay]');
            if (existingOverlay) {
                existingOverlay.style.transition = 'opacity 0.4s ease-out';
                existingOverlay.style.opacity = '0';
                setTimeout(() => existingOverlay.remove(), 400);
            } else {
                // If coming from direct navigation, create an overlay to fade out
                const isProjects = window.location.pathname.includes('projects.html');
                const entryOverlay = document.createElement('div');
                entryOverlay.setAttribute('data-fade-overlay', 'true');
                entryOverlay.style.cssText = `
                    position: fixed;
                    inset: 0;
                    background: ${isProjects ? '#1A1A19' : '#FDFAF0'};
                    z-index: 9998;
                    opacity: 1;
                    transition: opacity 0.4s ease-out;
                    pointer-events: none;
                    will-change: opacity;
                `;
                document.body.appendChild(entryOverlay);
                
                // Fade out the overlay
                setTimeout(() => {
                    entryOverlay.style.opacity = '0';
                    setTimeout(() => entryOverlay.remove(), 400);
                }, 50);
            }
            document.body.classList.add('loaded');
        }, 100);
    });
});

// ===========================
// Utility Functions
// ===========================

// Debounce function for performance
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

// Smooth reveal on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
