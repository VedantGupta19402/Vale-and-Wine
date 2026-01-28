const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const cursorText = document.querySelector('.cursor-text');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.35;
    cursorY += (mouseY - cursorY) * 0.35;
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    
    if (cursorText.classList.contains('active')) {
        cursorText.style.left = `${ringX}px`;
        cursorText.style.top = `${ringY - 60}px`;
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

const interactiveElements = document.querySelectorAll('a, button, .product-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        
        const label = el.dataset.cursorLabel || el.textContent.trim();
        if (el.tagName === 'A' || el.classList.contains('magnetic-btn')) {
            cursorText.textContent = label.substring(0, 20);
            cursorText.classList.add('active');
        }
        
        if (el.classList.contains('product-card')) {
            cursorText.textContent = 'VIEW';
            cursorText.classList.add('active');
        }
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        cursorText.classList.remove('active');
    });
    
    el.addEventListener('mousedown', () => {
        document.body.classList.add('cursor-click');
    });
    
    el.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-click');
    });
});

