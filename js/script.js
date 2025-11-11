// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Setup modal for popular products
    setupProductModal();
});

// Product data for popular products
const popularProducts = [
    {
        id: 1,
        name: "Mini Love",
        category: "love",
        price: 30000,
        image: "/images/p1.jpg",
        description: [
            "Buket bunga 4 tangkai + filler",
            "1 cokelat batang kecil (dairymilk)",
            "Pita dan kartu ucapan kecil"
        ]
    },
    {
        id: 2,
        name: "Choco Hug",
        category: "friendship, love",
        price: 15000,
        image: "/images/p2.jpg",
        description: [
            "1 cokelat batang ukuran sedang",
            "5 cookies  (dibungkus mika + pita)",
            "1 mini tag ucapan"
        ]
    },
    {
        id: 3,
        name: "Sweetheart Box",
        category: "thanks",
        price: 20000,
        image: "/images/p3.jpg",
        description: [
            "10 cookies (choco chip atau bentuk hati)",
            "1 mini bunga",
            "Box mika kecil + pita + label “Sweetheart”"
        ]
    }
];

// Format price to IDR
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Format kategori untuk tampilan
function formatCategory(category) {
    const categoryMap = {
        'love': 'Cinta',
        'friendship': 'Persahabatan',
        'thanks': 'Terima Kasih',
        'apology': 'Permintaan Maaf'
    };
    return categoryMap[category] || category;
}

// Setup modal functionality for popular products
function setupProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-modal');
    const productCards = document.querySelectorAll('.products-preview .product-card');
    
    if (!modal || !closeBtn) return;
    
    // Add click event to popular product cards
    productCards.forEach((card, index) => {
        if (index < popularProducts.length) {
            const product = popularProducts[index];
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                openProductModal(product);
            });
        }
    });
    
    // Close modal events
    closeBtn.addEventListener('click', closeProductModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });
}

// Open product modal
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');

    // Set modal content
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalTitle.textContent = product.name;
    modalCategory.textContent = formatCategory(product.category);
    modalPrice.textContent = formatPrice(product.price);
    
    // Clear previous description
    modalDescription.innerHTML = '';
    
    // Create description list
    const descriptionList = document.createElement('ul');
    descriptionList.className = 'product-description-list';
    
    // Add each description point as list item
    if (Array.isArray(product.description)) {
        product.description.forEach(point => {
            const listItem = document.createElement('li');
            listItem.textContent = point;
            descriptionList.appendChild(listItem);
        });
    } else {
        // Fallback if description is still string
        const listItem = document.createElement('li');
        listItem.textContent = product.description;
        descriptionList.appendChild(listItem);
    }
    
    modalDescription.appendChild(descriptionList);
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}