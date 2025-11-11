// Product data
const products = [
    {
        id: 1,
        name: "Mini Love",
        category: "love",
        price: 30000,
        image: "images/p1.jpg",
        description: [
            "Buket bunga 4 tangkai + filler",
            "1 cokelat batang kecil (dairymilk)",
            "Pita dan kartu ucapan kecil"
        ]
    },
    {
        id: 2,
        name: "Choco Hug",
        category: "apology",
        price: 15000,
        image: "images/p2.jpg",
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
        image: "images/p3.jpg",
        description: [
            "10 cookies (choco chip atau bentuk hati)",
            "1 mini bunga",
            "Box mika kecil + pita + label “Sweetheart”"
        ]
    },
    {
        id: 4,
        name: "Love in Bloom",
        category: "friendship",
        price: 25000,
        image: "images/p4.jpg",
        description: [
            "Buket mini bunga segar 3 bunga+filler",
            "1 cokelat kecil (Delfi bar / Kinder mini)",
            "Kartu ucapan kecil"
        ]
    },
    {
        id: 5,
        name: "Cinta Mini Pack",
        category: "love",
        price: 35000,
        image: "images/p5.jpg",
        description: [
            "10 cookies",
            "5 bunga+filler",
            "1 batang cokelat kecil",
            "Bungkus plastik premium + pita satin"
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

// Render products
function renderProducts(productsToRender) {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsToRender.length === 0) {
        container.innerHTML = '<p class="no-products">Tidak ada produk yang ditemukan.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="price">${formatPrice(product.price)}</span>
                    <button class="btn btn-view-detail" data-product-id="${product.id}">
                        Lihat Detail
                    </button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });

    // Add event listeners to detail buttons
    document.querySelectorAll('.btn-view-detail').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                openProductModal(product);
            }
        });
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

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase().trim();
    
    if (lowerQuery === '') {
        const activeCategory = document.querySelector('.category-btn.active')?.getAttribute('data-category') || 'all';
        return filterProducts(activeCategory);
    }
    
    return products.filter(product => {
        // Search in product name
        const nameMatch = product.name.toLowerCase().includes(lowerQuery);
        
        // Search in description array
        const descriptionMatch = product.description.some(desc => 
            desc.toLowerCase().includes(lowerQuery)
        );
        
        return nameMatch || descriptionMatch;
    });
}

// Initialize catalog page
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Load all products initially
    renderProducts(products);
    
    // Category filter event listeners
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const category = this.getAttribute('data-category');
            const filteredProducts = filterProducts(category);
            renderProducts(filteredProducts);
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            let filteredProducts;
            
            if (query === '') {
                // If search is empty, show products based on active category
                const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
                filteredProducts = filterProducts(activeCategory);
            } else {
                // Search across all products
                filteredProducts = searchProducts(query);
            }
            
            renderProducts(filteredProducts);
        });
    }
    
    // Modal functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });
});