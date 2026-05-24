/* ==========================================
   CleanStart Rotterdam - Ultra Premium JS
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ==========================================
    // Loader
    // ==========================================
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function () {
            loader.classList.add('hidden');
        }, 2000);
    }

    // ==========================================
    // Custom Cursor (desktop only)
    // ==========================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 4 + 'px';
            cursor.style.top = mouseY - 4 + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX - 18 + 'px';
            cursorFollower.style.top = followerY - 18 + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect on interactive elements
        var interactiveElements = document.querySelectorAll('a, button, .btn, .bento-card, .advantage-card, .pricing-card');
        interactiveElements.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursor.classList.add('hovering');
                cursorFollower.classList.add('hovering');
            });
            el.addEventListener('mouseleave', function () {
                cursor.classList.remove('hovering');
                cursorFollower.classList.remove('hovering');
            });
        });
    }

    // ==========================================
    // Scroll Progress Bar
    // ==========================================
    var scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // ==========================================
    // Navigation Scroll Effect
    // ==========================================
    var nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // Mobile Navigation Toggle
    // ==========================================
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close on link click
        var links = navLinks.querySelectorAll('.nav-link');
        links.forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ==========================================
    // Particle Canvas
    // ==========================================
    try {
        var canvas = document.getElementById('particles');
        if (canvas) {
            var ctx = canvas.getContext('2d');
            var particles = [];
            var particleCount = 50;

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            function Particle() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            Particle.prototype.update = function () {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            };

            Particle.prototype.draw = function () {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(79, 125, 247, ' + this.opacity + ')';
                ctx.fill();
            };

            for (var i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw connections
                for (var a = 0; a < particles.length; a++) {
                    for (var b = a + 1; b < particles.length; b++) {
                        var dx = particles[a].x - particles[b].x;
                        var dy = particles[a].y - particles[b].y;
                        var dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 150) {
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.strokeStyle = 'rgba(79, 125, 247, ' + (0.1 * (1 - dist / 150)) + ')';
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }

                for (var p = 0; p < particles.length; p++) {
                    particles[p].update();
                    particles[p].draw();
                }

                requestAnimationFrame(animateParticles);
            }
            animateParticles();
        }
    } catch (e) {
        // Canvas not supported or error - fail silently
    }

    // ==========================================
    // Scroll-Triggered Animations (IntersectionObserver)
    // ==========================================
    var animatedElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: make all elements visible immediately
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ==========================================
    // Animated Counter (Stats)
    // ==========================================
    var statNumbers = document.querySelectorAll('[data-count]');

    function animateCount(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * easeOut);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) {
            statsObserver.observe(el);
        });
    } else {
        // Fallback: set final values
        statNumbers.forEach(function (el) {
            el.textContent = el.getAttribute('data-count');
        });
    }

    // ==========================================
    // Magnetic Buttons
    // ==========================================
    if (window.matchMedia('(pointer: fine)').matches) {
        var magneticBtns = document.querySelectorAll('.magnetic');
        magneticBtns.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var navHeight = nav ? nav.offsetHeight : 0;
                var targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Form Enhancement
    // ==========================================
    var formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(function (input) {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });

}); // End DOMContentLoaded
