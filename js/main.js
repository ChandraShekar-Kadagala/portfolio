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
       VIDEO HOVER PLAY/PAUSE
       ========================================= */
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        const video = card.querySelector('video');
        
        if(video) {
            // Ensure video is paused initially
            video.pause();

            card.addEventListener('mouseenter', () => {
                // Play video on hover
                let playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Auto-play prevented", error);
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                // Pause video and reset to start when mouse leaves
                video.pause();
                // Optional: reset time to 0
                // video.currentTime = 0; 
            });
        }
    });

    /* =========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

});
