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
       VIDEO PLAY/PAUSE (HOVER & SCROLL)
       ========================================= */
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;

    // For touch devices, use Intersection Observer to play when visible
    let videoObserver;
    if (isTouchDevice) {
        videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (video) {
                    if (entry.isIntersecting) {
                        let playPromise = video.play();
                        if (playPromise !== undefined) playPromise.catch(() => {});
                    } else {
                        video.pause();
                    }
                }
            });
        }, { threshold: 0.5 });
    }

    portfolioCards.forEach(card => {
        const video = card.querySelector('video');
        
        if(video) {
            video.pause(); // Ensure paused initially

            if (!isTouchDevice) {
                // Desktop: Play on hover
                card.addEventListener('mouseenter', () => {
                    let playPromise = video.play();
                    if (playPromise !== undefined) playPromise.catch(() => {});
                });

                card.addEventListener('mouseleave', () => {
                    video.pause();
                });
            } else {
                // Mobile: Play when 50% visible in viewport
                videoObserver.observe(card);
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
