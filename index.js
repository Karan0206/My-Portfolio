// ========================================
//   Portfolio — JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // ========================================
    // NAVBAR — Scroll Background
    // ========================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    // ========================================
    // HAMBURGER MENU
    // ========================================
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    }

    // ========================================
    // FADE-IN ON SCROLL (Intersection Observer)
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ========================================
    // CONTACT FORM VALIDATION
    // ========================================
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            document.getElementById('nameGroup').classList.add('error');
            isValid = false;
        } else {
            document.getElementById('nameGroup').classList.remove('error');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            document.getElementById('emailGroup').classList.add('error');
            isValid = false;
        } else {
            document.getElementById('emailGroup').classList.remove('error');
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            document.getElementById('messageGroup').classList.add('error');
            isValid = false;
        } else {
            document.getElementById('messageGroup').classList.remove('error');
        }

        // On success, submit via AJAX to FormSubmit
        if (isValid) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        contactForm.querySelectorAll('.form-group, .btn-submit').forEach(el => {
                            el.style.display = 'none';
                        });
                        formSuccess.classList.add('show');

                        setTimeout(() => {
                            contactForm.reset();
                            contactForm.querySelectorAll('.form-group, .btn-submit').forEach(el => {
                                el.style.display = '';
                            });
                            formSuccess.classList.remove('show');
                            submitBtn.textContent = 'Send Message →';
                            submitBtn.disabled = false;
                        }, 4000);
                    } else {
                        alert('Oops! Something went wrong. Please try again.');
                        submitBtn.textContent = 'Send Message →';
                        submitBtn.disabled = false;
                    }
                })
                .catch(() => {
                    alert('Oops! Something went wrong. Please try again.');
                    submitBtn.textContent = 'Send Message →';
                    submitBtn.disabled = false;
                });
        }
    });

    // Remove error state on input
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.form-group').classList.remove('error');
        });
    });

    // ========================================
    // SMOOTH SCROLL for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
