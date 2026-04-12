// ===========================
// Projects Page - Filter Functionality
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const subNavButtons = document.querySelectorAll('.sub-nav-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const emptyState = document.getElementById('emptyState');
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Filter projects by category
    function filterProjects(category) {
        let visibleCount = 0;
        
        projectCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                // Show card with staggered animation
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                }, index * 50);
                
                visibleCount++;
            } else {
                // Hide card
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
        
        // Show/hide empty state
        setTimeout(() => {
            if (visibleCount === 0) {
                emptyState.style.display = 'block';
                emptyState.style.opacity = '0';
                setTimeout(() => {
                    emptyState.style.transition = 'opacity 0.3s ease';
                    emptyState.style.opacity = '1';
                }, 10);
            } else {
                emptyState.style.opacity = '0';
                setTimeout(() => {
                    emptyState.style.display = 'none';
                }, 300);
            }
        }, 400);
    }
    
    // Handle sub-nav button clicks
    subNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            subNavButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category and filter
            const category = button.getAttribute('data-category');
            filterProjects(category);
            
            // Update URL without page reload (optional)
            const url = new URL(window.location);
            if (category === 'all') {
                url.searchParams.delete('category');
            } else {
                url.searchParams.set('category', category);
            }
            window.history.pushState({}, '', url);
        });
    });
    
    // Check URL parameters on load
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        // Find and activate the corresponding button
        const targetButton = Array.from(subNavButtons).find(
            btn => btn.getAttribute('data-category') === categoryParam
        );
        
        if (targetButton) {
            subNavButtons.forEach(btn => btn.classList.remove('active'));
            targetButton.classList.add('active');
            filterProjects(categoryParam);
        }
    } else {
        // Show all projects by default
        filterProjects('all');
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category') || 'all';
        
        // Update active button
        subNavButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        // Filter projects
        filterProjects(category);
    });
    
    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hidden')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Sticky sub-navbar effect
    const subNavbar = document.getElementById('subNavbar');
    const navbar = document.getElementById('navbar');
    
    if (subNavbar && navbar) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    const navbarHeight = navbar.offsetHeight;
                    
                    if (scrollY > 300) {
                        subNavbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                    } else {
                        subNavbar.style.boxShadow = 'none';
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    // Keyboard navigation for filters
    subNavButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextButton = subNavButtons[index + 1] || subNavButtons[0];
                nextButton.focus();
                nextButton.click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevButton = subNavButtons[index - 1] || subNavButtons[subNavButtons.length - 1];
                prevButton.focus();
                prevButton.click();
            }
        });
    });
});

// ===========================
// Project Card Animations
// ===========================

// Add intersection observer for scroll animations
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all project cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        cardObserver.observe(card);
    });
});
