// Products functionality
import { db } from './firebase-config.js';
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const productsGrid = document.getElementById('productsGrid');
const categoryBtns = document.querySelectorAll('.category-btn');
let currentCategory = 'all';
let allProducts = [];

// Load products from Firebase
function loadProducts() {
    if (!productsGrid) return;
    
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    
    productsGrid.innerHTML = '<div class="spinner"></div>';
    
    onSnapshot(q, (snapshot) => {
        allProducts = [];
        
        snapshot.forEach((doc) => {
            allProducts.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        filterAndDisplayProducts();
    }, (error) => {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p class="error">Failed to load products.</p>';
    });
}

// Filter and display products
function filterAndDisplayProducts() {
    const filtered = currentCategory === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === currentCategory);
    
    if (filtered.length === 0) {
        productsGrid.innerHTML = '<p class="no-items">No products in this category.</p>';
        return;
    }
    
    productsGrid.innerHTML = '';
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Parse features
    const features = product.features ? product.features.split(',').map(f => f.trim()) : [];
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imageBase64}" alt="${product.name}">
            <span class="product-category-badge">${product.category}</span>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-price">
                <span class="price">UGX ${Number(product.price).toLocaleString()}</span>
                <span class="unit">/${product.unit || 'm²'}</span>
            </div>
            <p class="product-description-short">${product.description.substring(0, 100)}...</p>
            
            <div class="product-details hidden">
                <p class="product-description-full">${product.description}</p>
                ${features.length > 0 ? `
                    <div class="product-features">
                        <h4>Features:</h4>
                        <ul>
                            ${features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
            
            <button class="toggle-details-btn">
                <span>View Details</span>
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
    `;
    
    // Add toggle functionality
    const toggleBtn = card.querySelector('.toggle-details-btn');
    const details = card.querySelector('.product-details');
    const shortDesc = card.querySelector('.product-description-short');
    
    toggleBtn.addEventListener('click', () => {
        const isHidden = details.classList.contains('hidden');
        
        if (isHidden) {
            details.classList.remove('hidden');
            shortDesc.classList.add('hidden');
            toggleBtn.innerHTML = '<span>Show Less</span> <i class="fas fa-chevron-up"></i>';
            card.classList.add('expanded');
        } else {
            details.classList.add('hidden');
            shortDesc.classList.remove('hidden');
            toggleBtn.innerHTML = '<span>View Details</span> <i class="fas fa-chevron-down"></i>';
            card.classList.remove('expanded');
        }
    });
    
    return card;
}

// Category filter
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentCategory = btn.dataset.category;
        filterAndDisplayProducts();
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', loadProducts);