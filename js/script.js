// Simple Mobile Menu - Works for both Desktop and Mobile
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeProductModal();
    setupSmoothScrolling();
    updateActiveNavLink();
    handleImageErrors();
});

// Mobile Menu System - Simple Version
function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!mobileMenu || !navLinks) return;

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            // Close menu
            navLinks.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        } else {
            // Open menu
            navLinks.classList.add('active');
            if (menuOverlay) menuOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    // Mobile menu click event
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    // Close menu when clicking on a link (mobile only)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Handle window resize - Reset menu state on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// Product Modal System (tetap sama)
function initializeProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !closeBtn) return;

    // Product data for popular products
    const popularProducts = [
        {
        id: 1,
        name: "Flowers Bouquet",
        category: "love",
        price: 15000,
        image: "images/p1.jpg",
        description: [
            "Berisi 1 bunga artificial premium",
            "Tahan lama dan tidak mudah rusak",
            "Wrapping elegan & estetik",
            "Bonus: Free kartu ucapan khusus (bisa tulis pesan sendiri)",
            "Free ongkir maksimal radius 2 km dari Fakultas Ekonomi dan Bisnis Telkom University"
        ]
    },
    {
        id: 2,
        name: "Chocolate Bouquet",
        category: "apology",
        price: 25000,
        image: "images/p2.jpg",
        description: [
            "Berisi 1 coklat Dairy Milk isi 57 gram",
            "Dirangkai dalam buket cantik dan minimalis",
            "Bonus: Free kartu ucapan untuk menyampaikan pesan manismu",
            "Free ongkir maksimal radius 2 km dari Fakultas Ekonomi dan Bisnis Telkom University"
        ]
    },
    {
        id: 3,
        name: "Cookies Bouquet",
        category: "thanks",
        price: 17000,
        image: "images/p3.jpg",
        description: [
            "Berisi 3 cookies fresh",
            "Dikemas dalam bouqet unik & estetik",
            "Cocok untuk semua usia dan berbagai momen",
            "Bonus: Free kartu ucapan yang bisa di-custom sesuai keinginan",
            "Free ongkir maksimal radius 2 km dari Fakultas Ekonomi dan Bisnis Telkom University"
        ]
    }
    ];

    // Add click events to product cards
    const productCards = document.querySelectorAll('.products-preview .product-card');
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
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeProductModal();
        }
    });

    // Modal functions
    window.openProductModal = function(product) {
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
        
        // Clear and create description
        modalDescription.innerHTML = '';
        const descriptionList = document.createElement('ul');
        descriptionList.className = 'product-description-list';
        
        product.description.forEach(point => {
            const listItem = document.createElement('li');
            listItem.textContent = point;
            descriptionList.appendChild(listItem);
        });
        
        modalDescription.appendChild(descriptionList);
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeProductModal = function() {
        const modal = document.getElementById('productModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
}

// Utility Functions (tetap sama)
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

function formatCategory(category) {
    const categoryMap = {
        'love': 'Cinta',
        'friendship': 'Persahabatan', 
        'thanks': 'Terima Kasih',
        'apology': 'Permintaan Maaf'
    };
    return categoryMap[category] || category;
}

function setupSmoothScrolling() {
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
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const linkPage = item.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
            this.alt = 'Gambar tidak tersedia';
        });
    });
}