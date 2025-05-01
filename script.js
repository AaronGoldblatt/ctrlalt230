// Ctrl+Alt+230 Podcast Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load YouTube API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // YouTube players object
    var players = {};

    // Initialize players when API is ready
    window.onYouTubeIframeAPIReady = function() {
        // Get all YouTube iframes
        const videoIframes = document.querySelectorAll('iframe[id^="video-"]');
        
        // Initialize each player
        videoIframes.forEach(function(iframe) {
            players[iframe.id] = new YT.Player(iframe.id, {
                events: {
                    'onReady': onPlayerReady
                }
            });
        });
    };

    // Once player is ready
    function onPlayerReady(event) {
        // Player is ready
        console.log("Player ready:", event.target);
    }

    // Handle timestamp clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('timestamp-link') || e.target.parentElement.classList.contains('timestamp-link')) {
            e.preventDefault();
            
            // Get the link element
            const link = e.target.classList.contains('timestamp-link') ? e.target : e.target.parentElement;
            
            // Get video ID and time
            const videoId = link.getAttribute('data-video');
            const time = parseInt(link.getAttribute('data-time'));
            
            // If we have a player for this video
            if (players[videoId]) {
                // Seek to time
                players[videoId].seekTo(time, true);
                // Start playing
                players[videoId].playVideo();
                
                // Scroll to video if needed
                const videoElement = document.getElementById(videoId);
                const rect = videoElement.getBoundingClientRect();
                
                if (rect.top < 0 || rect.bottom > window.innerHeight) {
                    videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    });

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
            // Don't interfere with timestamp links
            if (link.classList.contains('timestamp-link')) {
                return;
            }
            
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
    
    // Check for scrollable content
    const checkScrollableContainers = function() {
        const scrollableContainers = document.querySelectorAll('.scrollable-links');
        
        scrollableContainers.forEach(container => {
            // Check if content is scrollable
            if (container.scrollHeight > container.clientHeight) {
                container.classList.add('has-scroll');
                
                // Update scroll state based on scroll position
                updateScrollState(container);
                
                // Add scroll event listener if not already added
                if (!container.hasScrollListener) {
                    container.addEventListener('scroll', function() {
                        updateScrollState(this);
                    });
                    container.hasScrollListener = true;
                }
            } else {
                container.classList.remove('has-scroll');
                container.classList.remove('scroll-active');
                container.classList.remove('scroll-end');
            }
        });
    };
    
    // Update scroll state indicator based on scroll position
    const updateScrollState = function(container) {
        // At the top
        if (container.scrollTop === 0) {
            container.classList.add('scroll-active');
            container.classList.remove('scroll-end');
        }
        // At the bottom
        else if (container.scrollHeight - container.scrollTop <= container.clientHeight + 5) {
            container.classList.remove('scroll-active');
            container.classList.add('scroll-end');
        }
        // In the middle
        else {
            container.classList.remove('scroll-active');
            container.classList.remove('scroll-end');
        }
    };

    // Add click handler for "back to top" indicators
    document.addEventListener('click', function(e) {
        // Check if click is on or within a scrollable container
        const container = e.target.closest('.scrollable-links');
        if (container && container.classList.contains('scroll-end')) {
            // Only scroll to top if clicking the bottom area where the indicator is
            const rect = container.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            
            // If click is in the bottom 30px of the container
            if (clickY > container.clientHeight - 30) {
                container.scrollTop = 0;
                updateScrollState(container);
            }
        }
    });
    
    // Initial check
    checkScrollableContainers();
    
    // Recheck on window resize
    window.addEventListener('resize', checkScrollableContainers);
    
    // Recheck when tabs are clicked (content might change)
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(checkScrollableContainers, 50);
        });
    });
}); 