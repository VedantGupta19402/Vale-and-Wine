(() => {
    'use strict';

    const state = {
        mouse: { x: 0, y: 0 },
        cursor: { dot: { x: 0, y: 0 }, ring: { x: 0, y: 0 }, text: { x: 0, y: 0 } },
        scroll: { current: 0, target: 0, last: 0 },
        isLoaded: false,
        raf: null
    };

    const elements = {
        loadingScreen: document.querySelector('.loading-screen'),
        cursorDot: document.querySelector('.cursor-dot'),
        cursorRing: document.querySelector('.cursor-ring'),
        cursorText: document.querySelector('.cursor-text'),
        cursorCanvas: document.getElementById('cursorCanvas'),
        particlesCanvas: document.getElementById('particlesCanvas'),
        navbar: document.querySelector('.navbar'),
        tiltImage: document.getElementById('tiltImage'),
        tiltInner: null,
        productImages: [],
        productSections: [],
        parallaxElements: {
            texts: [],
            images: [],
            blob: null,
            bg: null
        }
    };

    const config = {
        cursor: {
            dotSpeed: 0.25,
            ringSpeed: 0.12,
            textSpeed: 0.08,
            magnetStrength: 0.4,
            productMagnetStrength: 0.2,
            scaleOnHover: 1.8
        },
        scroll: {
            ease: 0.08,
            threshold: 100
        },
        tilt: {
            max: 12,
            scale: 1.05
        },
        particles: {
            trail: { max: 25, throttle: 20 },
            floating: { count: 35, speed: 0.25 }
        },
        productImage: {
            parallaxStrength: 0.05,
            tiltMax: 8
        }
    };

    class ParticleTrail {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2.5 + 1;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.life = 1;
            this.decay = 0.015 + Math.random() * 0.01;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.size = Math.max(0, this.size - 0.04);
        }

        draw(ctx) {
            const alpha = this.life * 0.6;
            ctx.fillStyle = `rgba(212, 165, 154, ${alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class FloatingParticle {
        constructor(canvas) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.4;
            this.vx = (Math.random() - 0.5) * config.particles.floating.speed;
            this.vy = (Math.random() - 0.5) * config.particles.floating.speed;
            this.canvas = canvas;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x > this.canvas.width) this.x = 0;
            else if (this.x < 0) this.x = this.canvas.width;
            if (this.y > this.canvas.height) this.y = 0;
            else if (this.y < 0) this.y = this.canvas.height;
        }

        draw(ctx) {
            ctx.fillStyle = 'rgba(168, 181, 160, 0.2)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = {
        trail: [],
        floating: [],
        lastTrailTime: 0
    };

    function initCanvases() {
        const resize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            elements.cursorCanvas.width = w;
            elements.cursorCanvas.height = h;
            elements.particlesCanvas.width = w;
            elements.particlesCanvas.height = h;
        };
        resize();

        for (let i = 0; i < config.particles.floating.count; i++) {
            particles.floating.push(new FloatingParticle(elements.particlesCanvas));
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 150);
        }, { passive: true });
    }

    function animateParticles() {
        const ctx = elements.cursorCanvas.getContext('2d', { alpha: true });
        const pCtx = elements.particlesCanvas.getContext('2d', { alpha: true });

        ctx.clearRect(0, 0, elements.cursorCanvas.width, elements.cursorCanvas.height);
        pCtx.clearRect(0, 0, elements.particlesCanvas.width, elements.particlesCanvas.height);

        particles.trail = particles.trail.filter(p => p.life > 0);
        particles.trail.forEach(p => {
            p.update();
            p.draw(ctx);
        });

        particles.floating.forEach(p => {
            p.update();
            p.draw(pCtx);
        });

        requestAnimationFrame(animateParticles);
    }

    function initCursor() {
        const lerp = (start, end, factor) => start + (end - start) * factor;

        document.addEventListener('mousemove', (e) => {
            state.mouse.x = e.clientX;
            state.mouse.y = e.clientY;

            const now = Date.now();
            if (now - particles.lastTrailTime > config.particles.trail.throttle &&
                particles.trail.length < config.particles.trail.max) {
                particles.trail.push(new ParticleTrail(e.clientX, e.clientY));
                particles.lastTrailTime = now;
            }
        }, { passive: true });

        function updateCursor() {
            state.cursor.dot.x = lerp(state.cursor.dot.x, state.mouse.x, config.cursor.dotSpeed);
            state.cursor.dot.y = lerp(state.cursor.dot.y, state.mouse.y, config.cursor.dotSpeed);
            state.cursor.ring.x = lerp(state.cursor.ring.x, state.mouse.x, config.cursor.ringSpeed);
            state.cursor.ring.y = lerp(state.cursor.ring.y, state.mouse.y, config.cursor.ringSpeed);
            state.cursor.text.x = lerp(state.cursor.text.x, state.mouse.x, config.cursor.textSpeed);
            state.cursor.text.y = lerp(state.cursor.text.y, state.mouse.y, config.cursor.textSpeed);

            elements.cursorDot.style.transform = `translate(${state.cursor.dot.x}px, ${state.cursor.dot.y}px)`;
            elements.cursorRing.style.transform = `translate(${state.cursor.ring.x}px, ${state.cursor.ring.y}px)`;
            elements.cursorText.style.transform = `translate(${state.cursor.text.x}px, ${state.cursor.text.y}px)`;

            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .magnetic-link, .magnetic-btn, .magnetic-text');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                elements.cursorDot.style.transform = `translate(${state.cursor.dot.x}px, ${state.cursor.dot.y}px) scale(0.3)`;
                elements.cursorRing.style.transform = `translate(${state.cursor.ring.x}px, ${state.cursor.ring.y}px) scale(${config.cursor.scaleOnHover})`;

                const text = el.dataset.cursorText;
                if (text) {
                    elements.cursorText.textContent = text;
                    elements.cursorText.style.opacity = '1';
                }
            });

            el.addEventListener('mouseleave', () => {
                elements.cursorDot.style.transform = `translate(${state.cursor.dot.x}px, ${state.cursor.dot.y}px) scale(1)`;
                elements.cursorRing.style.transform = `translate(${state.cursor.ring.x}px, ${state.cursor.ring.y}px) scale(1)`;
                elements.cursorText.style.opacity = '0';
            });
        });
    }

    function initMagneticEffects() {
        const magneticElements = document.querySelectorAll('.magnetic-link, .magnetic-btn');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * config.cursor.magnetStrength;
                const y = (e.clientY - rect.top - rect.height / 2) * config.cursor.magnetStrength;
                el.style.transform = `translate(${x}px, ${y}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });

        const magneticTexts = document.querySelectorAll('.magnetic-text');
        magneticTexts.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
                el.style.transform = `translate(${x}px, ${y}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    function initProductImageMagnetic() {
        elements.productImages = document.querySelectorAll('.product-image-wrapper');

        elements.productImages.forEach(wrapper => {
            const strength = parseFloat(wrapper.dataset.magneticStrength || config.cursor.productMagnetStrength);
            const image = wrapper.querySelector('.product-image');

            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const deltaX = (x - centerX) * strength;
                const deltaY = (y - centerY) * strength;

                const rotateX = ((y - centerY) / centerY) * config.productImage.tiltMax;
                const rotateY = ((centerX - x) / centerX) * config.productImage.tiltMax;

                wrapper.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                if (image) {
                    image.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }

                elements.cursorDot.style.transform = `translate(${state.cursor.dot.x}px, ${state.cursor.dot.y}px) scale(0.5)`;
                elements.cursorRing.style.transform = `translate(${state.cursor.ring.x}px, ${state.cursor.ring.y}px) scale(2.2)`;
            });

            wrapper.addEventListener('mouseleave', () => {
                wrapper.style.transform = 'translate(0, 0)';
                if (image) {
                    image.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
                }
                elements.cursorDot.style.transform = `translate(${state.cursor.dot.x}px, ${state.cursor.dot.y}px) scale(1)`;
                elements.cursorRing.style.transform = `translate(${state.cursor.ring.x}px, ${state.cursor.ring.y}px) scale(1)`;
            });
        });
    }

    function init3DTilt() {
        if (!elements.tiltImage) return;
        elements.tiltInner = elements.tiltImage.querySelector('.tilt-inner');
        if (!elements.tiltInner) return;

        elements.tiltImage.addEventListener('mousemove', (e) => {
            const rect = elements.tiltImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * config.tilt.max;
            const rotateY = ((centerX - x) / centerX) * config.tilt.max;

            elements.tiltInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${config.tilt.scale}, ${config.tilt.scale}, ${config.tilt.scale})`;
        });

        elements.tiltImage.addEventListener('mouseleave', () => {
            elements.tiltInner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    function initScrollAnimations() {
        elements.parallaxElements.texts = document.querySelectorAll('.parallax-text');
        elements.parallaxElements.images = document.querySelectorAll('.parallax-image');
        elements.parallaxElements.blob = document.querySelector('.parallax-blob');
        elements.parallaxElements.bg = document.querySelector('.parallax-bg');
        elements.productSections = document.querySelectorAll('.product-section');

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, .product-section').forEach(el => observer.observe(el));

        let ticking = false;
        window.addEventListener('scroll', () => {
            state.scroll.target = window.pageYOffset;
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });

        function updateParallax() {
            state.scroll.current += (state.scroll.target - state.scroll.current) * config.scroll.ease;

            if (state.scroll.current > config.scroll.threshold) {
                elements.navbar.classList.add('bg-[#F7F5F2]/90', 'backdrop-blur-xl', 'shadow-lg');
            } else {
                elements.navbar.classList.remove('bg-[#F7F5F2]/90', 'backdrop-blur-xl', 'shadow-lg');
            }

            elements.parallaxElements.texts.forEach(el => {
                const speed = parseFloat(el.dataset.speed || 0.5);
                el.style.transform = `translateY(${-(state.scroll.current * speed)}px)`;
            });

            elements.parallaxElements.images.forEach(el => {
                const speed = parseFloat(el.dataset.speed || 0.3);
                el.style.transform = `translateY(${-(state.scroll.current * speed)}px)`;
            });

            if (elements.parallaxElements.blob) {
                elements.parallaxElements.blob.style.transform = `translateY(${-(state.scroll.current * 0.35)}px)`;
            }

            if (elements.parallaxElements.bg) {
                elements.parallaxElements.bg.style.transform = `translateY(${-(state.scroll.current * 0.18)}px)`;
            }

            elements.productSections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

                const imageWrapper = section.querySelector('.product-image-wrapper');
                if (imageWrapper) {
                    const parallaxY = (clampedProgress - 0.5) * 60 * config.productImage.parallaxStrength;
                    const currentTransform = imageWrapper.style.transform;
                    if (!currentTransform.includes('translate(')) {
                        imageWrapper.style.transform = `translateY(${parallaxY}px)`;
                    }
                }
            });

            state.scroll.last = state.scroll.current;
            ticking = false;
        }
    }

    function initTextReveal() {
        setTimeout(() => {
            const reveals = document.querySelectorAll('.text-reveal-wrapper');
            reveals.forEach((wrapper) => {
                const delay = parseFloat(wrapper.dataset.delay || 0);
                setTimeout(() => {
                    wrapper.classList.add('revealed');
                }, delay * 1000);
            });
        }, 1400);
    }

    function initLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                elements.loadingScreen.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    elements.loadingScreen.style.display = 'none';
                    state.isLoaded = true;
                }, 700);
            }, 900);
        });
    }

    function init() {
        initLoadingScreen();
        initCanvases();
        initCursor();
        initMagneticEffects();
        initProductImageMagnetic();
        init3DTilt();
        initScrollAnimations();
        initTextReveal();
        animateParticles();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();