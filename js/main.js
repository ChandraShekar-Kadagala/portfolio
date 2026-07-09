document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       CUSTOM CURSOR
       ========================================= */
    const cursor = document.querySelector('.custom-cursor');
    const hoverElements = document.querySelectorAll('a, button, .portfolio-card, .btn-primary, .btn-secondary');

    // Only enable custom cursor if not a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    /* =========================================
       NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       SCROLL REVEAL ANIMATIONS
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* =========================================
       VIDEO PLAY/PAUSE & MUTE CONTROLS
       ========================================= */
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playIndicator = container.querySelector('.play-indicator');
        const playIcon = container.querySelector('.play-indicator i');
        const muteIndicator = container.querySelector('.mute-indicator');
        const muteIcon = container.querySelector('.mute-indicator i');
        
        if (video) {
            // Handle Play/Pause when clicking the video or the center play indicator
            const togglePlay = (e) => {
                // Prevent mute button clicks from triggering play/pause
                if (e.target.closest('.mute-indicator')) return;
                
                if (video.paused) {
                    video.play();
                    playIcon.className = 'ph-fill ph-pause';
                } else {
                    video.pause();
                    playIcon.className = 'ph-fill ph-play';
                }
            };
            
            container.addEventListener('click', togglePlay);
            
            // Handle Mute/Unmute
            if (muteIndicator) {
                muteIndicator.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent triggering togglePlay
                    video.muted = !video.muted;
                    
                    if (video.muted) {
                        muteIcon.className = 'ph-fill ph-speaker-slash';
                    } else {
                        muteIcon.className = 'ph-fill ph-speaker-high';
                    }
                });
            }
        }
    });

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        const icon = menuToggle.querySelector('i');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                icon.classList.replace('ph-x', 'ph-list');
            });
        });
    }

});
