// State Management
const state = {
    mouse: { x: 0, y: 0 },
    cursor: { x: 0, y: 0 },
    outline: { x: 0, y: 0 },
    cart: 0,
    carouselIndex: 0
};

// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorOutline = document.querySelector('.cursor-outline');
const cursorText = document.querySelector('.cursor-text');
const loadingScreen = document.querySelector('.loading-screen');
const backToTop = document.getElementById('backToTop');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const cartCount = document.getElementById('cartCount');

