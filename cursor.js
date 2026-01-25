// Custom Magnetic Cursor
class MagneticCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorDot = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
        
        this.cursorPos = { x: 0, y: 0 };
        this.dotPos = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX;
            this.cursorPos.y = e.clientY;
        });
        
        // Magnetic effect on interactive elements
        const magneticElements = document.querySelectorAll('a, button, .liquid-container');
        
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.borderColor = '#C36A2D';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.borderColor = '#EEE9E2';
            });
        });
        
        this.animate();
    }
    
    animate() {
        // Smooth follow effect
        this.dotPos.x += (this.cursorPos.x - this.dotPos.x) * 0.15;
        this.dotPos.y += (this.cursorPos.y - this.dotPos.y) * 0.15;
        
        this.cursor.style.left = this.cursorPos.x + 'px';
        this.cursor.style.top = this.cursorPos.y + 'px';
        
        this.cursorDot.style.left = this.dotPos.x + 'px';
        this.cursorDot.style.top = this.dotPos.y + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }
    
    init() {
        const animateElements = document.querySelectorAll('.liquid-container, nav a, .hero-text');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-reveal');
                }
            });
        }, this.observerOptions);
        
        animateElements.forEach(el => {
            el.classList.add('scroll-hidden');
            observer.observe(el);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new MagneticCursor();
    new ScrollAnimations();
});