document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sticky Navbar & Scroll Progress Meter
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });

    /* ==========================================================================
       2. Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(counter => runCounter(counter));
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       3. Animated Counter for PM Metrics
       ========================================================================== */
    function runCounter(counterEl) {
        const target = +counterEl.getAttribute('data-target');
        let count = 0;
        const speed = target / 40;

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
       4. Mobile Menu Controls
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
       5. Interactive Mouse Parallax Effect on Hero Card
       ========================================================================== */
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    if (heroImageWrapper && window.innerWidth > 992) {
        heroImageWrapper.addEventListener('mousemove', (e) => {
            const rect = heroImageWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const floats = heroImageWrapper.querySelectorAll('.floating-card');
            floats.forEach((float, idx) => {
                const factor = (idx + 1) * 0.03;
                float.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });

        heroImageWrapper.addEventListener('mouseleave', () => {
            const floats = heroImageWrapper.querySelectorAll('.floating-card');
            floats.forEach(float => {
                float.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    /* ==========================================================================
       6. Form Submission Simulation
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your PM inquiry has been logged! Nino will get back to you within 24 hours.');
            contactForm.reset();
        });
    }
});
