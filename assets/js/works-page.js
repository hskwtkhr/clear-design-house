// ===== WORKS PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initializeWorksPage();
});

function initializeWorksPage() {
    // Initialize AOS with specific settings for works page
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize components
    setupWorksFilter();
    setupWorksNavigation();
    setupWorksAnimations();
}

// ===== WORKS FILTER FUNCTIONALITY =====
function setupWorksFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item-detailed');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter work items
            workItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('filtered');
                    item.style.display = 'block';
                    
                    // Trigger re-animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('filtered');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    // Hide after animation
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// ===== WORKS NAVIGATION =====
function setupWorksNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a hash link to main page
            if (href.includes('index.html#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                
                // Navigate to main page with hash
                window.location.href = `index.html#${targetId}`;
            }
        });
    });
    
    // Mobile hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===== WORKS ANIMATIONS =====
function setupWorksAnimations() {
    // Parallax effect for hero section
    const worksHero = document.querySelector('.works-hero');
    
    if (worksHero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            worksHero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Smooth scrolling for internal links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe work items for reveal animation
    const workItems = document.querySelectorAll('.work-item-detailed');
    workItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== UTILITY FUNCTIONS =====
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

// Add reveal animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .work-item-detailed {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .work-item-detailed.revealed,
    .work-item-detailed[data-aos="fade-up"].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .work-item-detailed.filtered {
        transition: opacity 0.4s ease, transform 0.4s ease !important;
    }
`;
document.head.appendChild(style); 