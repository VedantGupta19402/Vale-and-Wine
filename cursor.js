window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }, 800);
});

const cursor = document.querySelector('.cursor');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .group').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(0.5)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`;
    });
});

const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const maxParticles = 30;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.life = 60;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.03;
        this.life -= 2;
    }
    draw() {
        ctx.fillStyle = `rgba(212, 165, 154, ${this.life / 60})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove > 16) {
        if (particles.length < maxParticles) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
        lastMouseMove = now;
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

const particlesCanvas = document.getElementById('particlesCanvas');
const pCtx = particlesCanvas.getContext('2d', { alpha: true, desynchronized: true });
particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

class FloatingParticle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > particlesCanvas.width) this.x = 0;
        else if (this.x < 0) this.x = particlesCanvas.width;
        if (this.y > particlesCanvas.height) this.y = 0;
        else if (this.y < 0) this.y = particlesCanvas.height;
    }
    draw() {
        pCtx.fillStyle = 'rgba(168, 181, 160, 0.25)';
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fill();
    }
}

let floatingParticles = [];
for (let i = 0; i < 30; i++) {
    floatingParticles.push(new FloatingParticle());
}

function animateFloatingParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    for (let i = 0; i < floatingParticles.length; i++) {
        floatingParticles[i].update();
        floatingParticles[i].draw();
    }
    requestAnimationFrame(animateFloatingParticles);
}
animateFloatingParticles();

const magneticElements = document.querySelectorAll('.magnetic-link, .magnetic-btn');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

const magneticTexts = document.querySelectorAll('.magnetic-text');
magneticTexts.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.classList.add('bg-[#F7F5F2]/90', 'backdrop-blur-xl', 'shadow-lg');
    } else {
        navbar.classList.remove('bg-[#F7F5F2]/90', 'backdrop-blur-xl', 'shadow-lg');
    }
    lastScroll = currentScroll;
}, { passive: true });

setTimeout(() => {
    const reveals = document.querySelectorAll('.text-reveal-wrapper');
    reveals.forEach((wrapper) => {
        const delay = parseFloat(wrapper.dataset.delay || 0);
        setTimeout(() => {
            wrapper.classList.add('revealed');
        }, delay * 1000);
    });
}, 1200);

const tiltContainer = document.getElementById('tiltImage');
const tiltInner = tiltContainer.querySelector('.tilt-inner');

tiltContainer.addEventListener('mousemove', (e) => {
    const rect = tiltContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    tiltInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
});

tiltContainer.addEventListener('mouseleave', () => {
    tiltInner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
});

let ticking = false;
const parallaxElements = {
    texts: document.querySelectorAll('.parallax-text'),
    images: document.querySelectorAll('.parallax-image'),
    blob: document.querySelector('.parallax-blob'),
    bg: document.querySelector('.parallax-bg')
};

function updateParallax() {
    const scrollY = window.pageYOffset;
    
    parallaxElements.texts.forEach(el => {
        const speed = parseFloat(el.dataset.speed || 0.5);
        el.style.transform = `translateY(${-(scrollY * speed)}px)`;
    });

    parallaxElements.images.forEach(el => {
        const speed = parseFloat(el.dataset.speed || 0.3);
        el.style.transform = `translateY(${-(scrollY * speed)}px)`;
    });

    if (parallaxElements.blob) {
        parallaxElements.blob.style.transform = `translateY(${-(scrollY * 0.4)}px)`;
    }

    if (parallaxElements.bg) {
        parallaxElements.bg.style.transform = `translateY(${-(scrollY * 0.2)}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }, 250);
});