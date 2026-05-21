// === Mobile Navigation Toggle ===
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // === Smooth Scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                var offset = 70; // navbar height
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // === Form Validation & Submission ===
    var form = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            var naam = document.getElementById('naam').value.trim();
            var telefoon = document.getElementById('telefoon').value.trim();
            var email = document.getElementById('email').value.trim();

            // Basic validation
            if (!naam || !telefoon || !email) {
                e.preventDefault();
                alert('Vul alstublieft alle verplichte velden in.');
                return;
            }

            // Email format check
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                e.preventDefault();
                alert('Voer een geldig e-mailadres in.');
                return;
            }

            // Phone format check (at least 8 digits)
            var phoneDigits = telefoon.replace(/\D/g, '');
            if (phoneDigits.length < 8) {
                e.preventDefault();
                alert('Voer een geldig telefoonnummer in.');
                return;
            }
        });
    }

    // === Scroll Animation (Intersection Observer) ===
    var animatedElements = document.querySelectorAll(
        '.service-card, .partner-card, .price-card, .advantage-item, .phase-card, .marketing-item, .timeline-item'
    );

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // === Navbar background on scroll ===
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }
    });
});

// CSS class for animation
var style = document.createElement('style');
style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
