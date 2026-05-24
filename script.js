/* ═══════════════════════════════════════════════════════════════
   CleanStart Rotterdam — Ultra Premium Interactions Engine
   Cinematic motion · Magnetic UI · Particle system · Smooth scroll
   ═══════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // === LOADER ===
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            initHeroAnimations();
        }, 2200);
    });
    document.body.style.overflow = 'hidden';

    // === CUSTOM CURSOR ===
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;

        if (cursor) {
            cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
        }
        if (follower) {
            follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('a, button, .bento-card, .pricing-card, .advantage-card, .partner-card, .timeline-card');
        if (target && follower) {
            follower.classList.add('hovering');
        }
    });
    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('a, button, .bento-card, .pricing-card, .advantage-card, .partner-card, .timeline-card');
        if (target && follower) {
            follower.classList.remove('hovering');
        }
    });


    // === SCROLL PROGRESS ===
    const scrollProgress = document.getElementById('scrollProgress');
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = progress + '%';
        }
    }

    // === NAVIGATION ===
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function updateNav() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // === SCROLL EVENT (throttled) ===
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateNav();
                ticking = false;
            });
            ticking = true;
        }
    });


    // === INTERSECTION OBSERVER FOR ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        animObserver.observe(el);
    });

    // === HERO ANIMATIONS ===
    function initHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero [data-animate]');
        heroElements.forEach(el => {
            el.classList.add('visible');
        });
    }

    // === COUNTING ANIMATION FOR STATS ===
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('[data-count]');
                numbers.forEach(num => {
                    const target = parseInt(num.dataset.count);
                    animateCount(num, 0, target, 1500);
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) statObserver.observe(statsSection);

    function animateCount(el, start, end, duration) {
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(start + (end - start) * eased);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // === MAGNETIC BUTTONS ===
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });


    // === CARD GLOW FOLLOW MOUSE ===
    const glowCards = document.querySelectorAll('.bento-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = (x - 100) + 'px';
                glow.style.top = (y - 100) + 'px';
                glow.style.opacity = '1';
            }
        });
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-glow');
            if (glow) glow.style.opacity = '0';
        });
    });

    // === TILT EFFECT ON PRICING CARDS ===
    const tiltCards = document.querySelectorAll('.pricing-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -8;
            const rotateY = (x - 0.5) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // === TIMELINE SCROLL PROGRESS ===
    const timelineLine = document.getElementById('timelineLine');
    if (timelineLine) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ratio = entry.intersectionRatio;
                    const afterEl = timelineLine.querySelector(':after') || timelineLine;
                    timelineLine.style.setProperty('--progress', Math.min(ratio * 2, 1));
                }
            });
        }, { threshold: Array.from({length: 20}, (_, i) => i / 20) });

        const timelineSection = document.querySelector('.timeline');
        if (timelineSection) {
            // Animate on scroll
            window.addEventListener('scroll', () => {
                const rect = timelineSection.getBoundingClientRect();
                const windowH = window.innerHeight;
                if (rect.top < windowH && rect.bottom > 0) {
                    const progress = Math.min(Math.max((windowH - rect.top) / (rect.height + windowH), 0), 1);
                    timelineLine.style.background = `linear-gradient(to bottom, var(--color-accent) ${progress * 100}%, var(--color-border) ${progress * 100}%)`;
                }
            });
        }
    }


    // === HERO CANVAS PARTICLE SYSTEM ===
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let connections = [];
        let animFrame;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.offsetWidth;
                this.y = Math.random() * canvas.offsetHeight;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.vx -= (dx / dist) * force * 0.02;
                    this.vy -= (dy / dist) * force * 0.02;
                }

                // Bounds
                if (this.x < 0 || this.x > canvas.offsetWidth) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.offsetHeight) this.vy *= -1;

                // Damping
                this.vx *= 0.99;
                this.vy *= 0.99;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(79, 125, 247, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles (adaptive count)
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 30 : 60;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = (1 - dist / 120) * 0.15;
                        ctx.strokeStyle = `rgba(79, 125, 247, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            animFrame = requestAnimationFrame(animate);
        }

        animate();

        // Pause when not visible
        const heroSection = document.getElementById('hero');
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animFrame) animate();
                } else {
                    cancelAnimationFrame(animFrame);
                    animFrame = null;
                }
            });
        });
        heroObserver.observe(heroSection);
    }


    // === PARALLAX ON HERO ORBS ===
    const orbs = document.querySelectorAll('.hero-gradient-orb');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 15;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // === FORM INTERACTION ===
    const form = document.querySelector('.contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });

        form.addEventListener('submit', (e) => {
            const naam = document.getElementById('naam').value.trim();
            const telefoon = document.getElementById('telefoon').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!naam || !telefoon || !email) {
                e.preventDefault();
                alert('Vul alstublieft alle verplichte velden in.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                e.preventDefault();
                alert('Voer een geldig e-mailadres in.');
                return;
            }
        });
    }

    // === ADVANTAGE CARDS 3D TILT ===
    const advCards = document.querySelectorAll('.advantage-card');
    advCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -5;
            const rotateY = (x - 0.5) * 5;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // === PARTNER CARDS HOVER GLOW ===
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(79, 125, 247, 0.06) 0%, var(--color-bg-card) 50%)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--color-bg-card)';
        });
    });

    // === SMOOTH REVEAL FOR SECTIONS ===
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.05 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 1s var(--ease-out-expo)';
        sectionObserver.observe(section);
    });

})();
