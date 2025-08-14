// Enhanced multi-page portfolio website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = createLoadingScreen();
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
            }, 500);
        }, 1000);
    });

    // Enhanced Mobile menu toggle with overlay
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    let menuOverlay = null;

    if (hamburger && navMenu) {
        // Create overlay for mobile menu
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);

        hamburger.addEventListener('click', function() {
            const isActive = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = isActive ? 'auto' : 'hidden';
        });

        // Close mobile menu when clicking overlay
        menuOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close mobile menu when clicking nav links
        navMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links (same page)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Typing animation for hero text (Home page only)
    const typingTexts = ['Web Developer', 'Frontend Developer', 'UI/UX Designer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        function typeText() {
            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typingSpeed = 500; // Pause before typing next text
            }

            setTimeout(typeText, typingSpeed);
        }

        typeText();
    }

    // Skills progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Project filtering (Projects page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Observe overview cards (Home page)
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach(card => {
        observer.observe(card);
    });

    // Observe stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        observer.observe(card);
    });

    // Enhanced contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                contactForm.reset();
                
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification function
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Slide in animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Scroll down arrow functionality (Home page only)
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        const scrollLink = scrollDown.querySelector('a');
        if (scrollLink) {
            // If it's a link to another page, let it navigate normally
            return;
        } else {
            // If it's meant to scroll within the same page
            scrollDown.addEventListener('click', function() {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // Parallax effect for hero section (Home page only)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-link');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Skill cards hover effect with random colors
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    
    if (skillCards.length > 0) {
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const icon = card.querySelector('.skill-icon');
                if (icon) {
                    icon.style.color = randomColor;
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = card.querySelector('.skill-icon');
                if (icon) {
                    icon.style.color = '#2563eb';
                }
            });
        });
    }

    // Project cards tilt effect
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });
    }

    // Smooth reveal animation for stats
    const stats = document.querySelectorAll('.stat h3, .stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const originalText = target.textContent;
                
                // Skip infinity symbol
                if (originalText === '∞') {
                    return;
                }
                
                const finalNumber = parseInt(originalText.replace('+', '').replace('%', '').replace('k', '000'));
                if (isNaN(finalNumber)) return;
                
                let currentNumber = 0;
                const increment = finalNumber / 50;
                const suffix = originalText.includes('%') ? '%' : 
                              originalText.includes('+') ? '+' : 
                              originalText.includes('k') ? 'k+' : '';
                
                const updateNumber = () => {
                    currentNumber += increment;
                    if (currentNumber < finalNumber) {
                        let displayNumber = Math.ceil(currentNumber);
                        if (originalText.includes('k')) {
                            displayNumber = Math.ceil(currentNumber / 1000);
                        }
                        target.textContent = displayNumber + suffix;
                        requestAnimationFrame(updateNumber);
                    } else {
                        let displayNumber = finalNumber;
                        if (originalText.includes('k')) {
                            displayNumber = finalNumber / 1000;
                        }
                        target.textContent = displayNumber + suffix;
                    }
                };
                
                updateNumber();
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    if (stats.length > 0) {
        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading spinner if present
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    });

    // Add CSS for active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #2563eb !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .loaded * {
            animation-play-state: running !important;
        }
        
        .notification {
            font-family: inherit;
        }
    `;
    document.head.appendChild(style);

    // Dark mode toggle (Easter egg - press 'D' key)
    let darkMode = localStorage.getItem('darkMode') === 'true';
    
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'd' && e.ctrlKey) {
            e.preventDefault();
            darkMode = !darkMode;
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', darkMode);
            showNotification(darkMode ? 'Dark mode activated!' : 'Light mode activated!', 'info');
        }
    });

    // Advanced cursor effects
    createCursorEffects();
    
    // Page transition effects
    createPageTransitions();
    
    // Lazy loading for images
    initLazyLoading();
    
    // Advanced scroll effects
    initAdvancedScrollEffects();
    
    // Performance monitoring
    monitorPerformance();
    
    // Website analytics (privacy-friendly)
    trackUserInteractions();
    
    console.log('🚀 Enhanced portfolio website loaded successfully!');
    console.log('💡 Press Ctrl+D to toggle dark mode!');
});

// Helper Functions
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="color: white; font-size: 2rem; margin-bottom: 2rem; font-weight: bold;">Portfolio</div>
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    return loader;
}

function createCursorEffects() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(37, 99, 235, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Enhance cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .overview-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(255, 215, 0, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(37, 99, 235, 0.5)';
        });
    });
}

function createPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname !== window.location.hostname) return;
            
            e.preventDefault();
            const href = this.href;
            
            // Create transition overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(overlay);
            
            // Animate in
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function initAdvancedScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for page headers
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        // Update navbar transparency based on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const opacity = Math.min(scrolled / 100, 1);
            navbar.style.background = `rgba(255, 255, 255, ${0.95 + opacity * 0.05})`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

function monitorPerformance() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('⚠️ Slow page load detected. Consider optimizing resources.');
        }
    });
    
    // Monitor FPS
    let fps = 0;
    let lastTime = performance.now();
    
    function calculateFPS() {
        const now = performance.now();
        fps = 1000 / (now - lastTime);
        lastTime = now;
        
        if (fps < 30) {
            console.warn('⚠️ Low FPS detected:', Math.round(fps));
        }
        
        requestAnimationFrame(calculateFPS);
    }
    
    requestAnimationFrame(calculateFPS);
}

function trackUserInteractions() {
    const interactions = {
        clicks: 0,
        scrolls: 0,
        timeOnPage: 0
    };
    
    const startTime = Date.now();
    
    document.addEventListener('click', () => interactions.clicks++);
    document.addEventListener('scroll', () => interactions.scrolls++);
    
    // Track time on page
    setInterval(() => {
        interactions.timeOnPage = Math.round((Date.now() - startTime) / 1000);
    }, 1000);
    
    // Log analytics before page unload
    window.addEventListener('beforeunload', function() {
        console.log('📊 User Interactions:', interactions);
        // Here you could send data to your analytics service
    });
}

// Add dark mode styles
const darkModeStyles = `
.dark-mode {
    background: #1a1a1a;
    color: #ffffff;
}

.dark-mode .navbar {
    background: rgba(26, 26, 26, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.1);
}

.dark-mode .nav-link {
    color: #ffffff;
}

.dark-mode .nav-logo h3,
.dark-mode .nav-logo a {
    color: #ffd700;
}

.dark-mode .page-header {
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
}

.dark-mode .overview-card,
.dark-mode .skill-card,
.dark-mode .project-card,
.dark-mode .contact-form-container,
.dark-mode .faq-item,
.dark-mode .stat,
.dark-mode .timeline-content {
    background: #2a2a2a;
    color: #ffffff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.dark-mode .section-title,
.dark-mode h1,
.dark-mode h2,
.dark-mode h3,
.dark-mode h4 {
    color: #ffffff;
}

.dark-mode .quick-overview,
.dark-mode .skills-overview,
.dark-mode .projects-filter,
.dark-mode .faq-section,
.dark-mode .learning-section,
.dark-mode .about,
.dark-mode .timeline-section,
.dark-mode .project-stats-section {
    background: #1f1f1f;
}

.dark-mode .contact-item {
    background: #2a2a2a;
}

.dark-mode .form-group input,
.dark-mode .form-group textarea,
.dark-mode .form-group select {
    background: #333;
    color: #fff;
    border-color: #444;
}

.dark-mode .form-group input::placeholder,
.dark-mode .form-group textarea::placeholder {
    color: #999;
}
`;

// Inject dark mode styles
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);
