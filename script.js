document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sticky Header & Scroll Progress
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Sticky class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Progress Bar Calculation
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });

    /* ==========================================================================
       2. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter animation if element contains counters
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(counter => runCounter(counter));
                }

                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       3. Animated Counter Stats
       ========================================================================== */
    function runCounter(counterEl) {
        const target = +counterEl.getAttribute('data-target');
        let count = 0;
        const speed = target / 50; // Adjust division for speed

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counterEl.innerText = Math.ceil(count);
                setTimeout(updateCount, 30);
            } else {
                counterEl.innerText = target;
            }
        };

        updateCount();
    }

    /* ==========================================================================
       4. Mobile Menu Toggle
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu a');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       5. Contact Form Handler (Demo)
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
});