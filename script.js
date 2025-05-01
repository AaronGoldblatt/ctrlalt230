// Ctrl+Alt+230 Podcast Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab system functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the parent tabs container
            const tabsContainer = this.closest('.tabs');
            // Get all tab buttons in this container
            const containerButtons = tabsContainer.querySelectorAll('.tab-btn');
            // Get the tab content container
            const tabContent = this.closest('.episode-content').querySelector('.tab-content');
            // Get all tab panes in this container
            const tabPanes = tabContent.querySelectorAll('.tab-pane');
            
            // Remove active class from all buttons in this container
            containerButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the selected tab pane
            const tabId = this.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the height of the fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Calculate the final scroll position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation effects on scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If section is in viewport
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile menu functionality (for future responsive enhancement)
    const createMobileMenu = function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Only create mobile menu if it doesn't exist yet
        if (!document.querySelector('.mobile-menu-toggle')) {
            const mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.classList.add('mobile-menu-toggle');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            mobileMenuToggle.addEventListener('click', function() {
                nav.classList.toggle('mobile-active');
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            // Insert before nav
            header.insertBefore(mobileMenuToggle, nav);
        }
    };
    
    // Check if mobile menu should be created
    const checkMobileMenu = function() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    };
    
    // Initial check
    checkMobileMenu();
    
    // Check on resize
    window.addEventListener('resize', checkMobileMenu);
    
    // Add CSS styles for the fade-in animation and mobile menu
    const addDynamicStyles = function() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .fade-in {
                animation: fadeIn 0.6s ease-out forwards;
            }
            
            .mobile-menu-toggle {
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block;
                }
                
                nav {
                    display: none;
                    width: 100%;
                    margin-top: 15px;
                }
                
                nav.mobile-active {
                    display: block;
                }
                
                nav ul {
                    flex-direction: column;
                    align-items: center;
                }
                
                nav ul li {
                    margin: 10px 0;
                }
            }
        `;
        document.head.appendChild(styleElement);
    };
    
    // Add dynamic styles
    addDynamicStyles();
}); 