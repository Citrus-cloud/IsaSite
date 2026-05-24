document.addEventListener('DOMContentLoaded', function () {
    // ===== Loader =====
    setTimeout(function () {
        var loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 2000);

    // ===== Theme Toggle =====
    var themeToggle = document.getElementById('theme-toggle');
    var savedTheme = localStorage.getItem('cleanstart-theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.classList.add('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('light-theme');
            themeToggle.classList.toggle('light');
            var isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('cleanstart-theme', isLight ? 'light' : 'dark');
        });
    }

    // ===== Custom Cursor (only for pointer: fine devices) =====
    var hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (hasFinePointer) {
        var cursor = document.getElementById('cursor');
        var follower = document.getElementById('cursor-follower');
        var mouseX = 0, mouseY = 0;
        var followerX = 0, followerY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursor) {
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            }
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            if (follower) {
                follower.style.left = followerX + 'px';
                follower.style.top = followerY + 'px';
            }
            requestAnimationFrame(animateFollower);
        }
        animateFollower();


        // Hover effects on interactive elements
        var hoverElements = document.querySelectorAll('a, button, .btn, .bento-card, .advantage-card, .pricing-card');
        hoverElements.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                if (follower) follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', function () {
                if (follower) follower.classList.remove('hover');
            });
        });
    }

    // ===== Scroll Progress =====
    var scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', function () {
        if (scrollProgress) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    // ===== Nav Scroll Effect =====
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function () {
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // ===== Mobile Nav Toggle =====
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }


    // ===== Particle Canvas =====
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
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            for (var i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            function drawParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(79, 125, 247, ' + p.opacity + ')';
                    ctx.fill();

                    // Draw connections
                    for (var j = i + 1; j < particles.length; j++) {
                        var p2 = particles[j];
                        var dx = p.x - p2.x;
                        var dy = p.y - p2.y;
                        var distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 150) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = 'rgba(124, 92, 252, ' + (0.15 * (1 - distance / 150)) + ')';
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }

                requestAnimationFrame(drawParticles);
            }
            drawParticles();
        }
    } catch (e) {
        // Silently fail if canvas not supported
    }


    // ===== Intersection Observer for Animations =====
    if ('IntersectionObserver' in window) {
        var animateElements = document.querySelectorAll('[data-animate]');
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

        animateElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all elements immediately
        var fallbackElements = document.querySelectorAll('[data-animate]');
        fallbackElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ===== Animated Counters =====
    var counters = document.querySelectorAll('[data-count]');

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var current = 0;
        var duration = 2000;
        var step = target / (duration / 16);

        function updateCounter() {
            current += step;
            if (current >= target) {
                el.textContent = target;
            } else {
                el.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            }
        }
        updateCounter();
    }

    if ('IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    } else {
        counters.forEach(function (counter) {
            counter.textContent = counter.getAttribute('data-count');
        });
    }


    // ===== Magnetic Buttons (only pointer: fine) =====
    if (hasFinePointer) {
        var magneticButtons = document.querySelectorAll('.magnetic');
        magneticButtons.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
            });
            btn.addEventListener('mouseleave', function () {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
