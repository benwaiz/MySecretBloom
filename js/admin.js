// Admin System
class AdminSystem {
    constructor() {
        this.adminPassword = "mysecretbloom2024"; // Ganti dengan password yang diinginkan
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkExistingLogin();
    }

    bindEvents() {
        // Admin link click
        const adminLink = document.getElementById('adminLink');
        if (adminLink) {
            adminLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        }

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal);
            });
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target);
            }
        });

        // Login form submission
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target);
            });
        });

        // Logout button
        const logoutBtn = document.getElementById('logoutAdmin');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Refresh products button
        const refreshBtn = document.getElementById('refreshProductsBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadProducts();
            });
        }

        // Add product button
        const addProductBtn = document.getElementById('addProductBtn');
        if (addProductBtn) {
            addProductBtn.addEventListener('click', () => {
                this.showAddProductForm();
            });
        }
    }

    showLoginModal() {
        const modal = document.getElementById('adminModal');
        if (modal) {
            modal.style.display = 'block';
            document.getElementById('adminPassword').focus();
        }
    }

    hideModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    handleLogin() {
        const password = document.getElementById('adminPassword').value;
        const errorDiv = document.getElementById('loginError');

        if (password === this.adminPassword) {
            this.loginSuccess();
        } else {
            this.showError('Password salah. Silakan coba lagi.');
        }
    }

    loginSuccess() {
        this.isLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('loginTime', new Date().getTime());
        
        this.hideModal(document.getElementById('adminModal'));
        this.showDashboard();
        this.loadDashboardData();
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    showDashboard() {
        const dashboard = document.getElementById('adminDashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
        }
    }

    checkExistingLogin() {
        const loggedIn = localStorage.getItem('adminLoggedIn');
        const loginTime = localStorage.getItem('loginTime');
        const currentTime = new Date().getTime();
        const sessionDuration = 2 * 60 * 60 * 1000; // 2 jam

        if (loggedIn === 'true' && (currentTime - loginTime) < sessionDuration) {
            this.isLoggedIn = true;
            // Auto-show dashboard jika sudah login
            // this.showDashboard();
            // this.loadDashboardData();
        } else {
            this.logout();
        }
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('loginTime');
        
        this.hideModal(document.getElementById('adminDashboard'));
        this.hideModal(document.getElementById('adminModal'));
        
        // Reset form
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.reset();
        }
    }

    switchTab(clickedTab) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to clicked tab and corresponding content
        clickedTab.classList.add('active');
        const tabId = clickedTab.getAttribute('data-tab') + 'Tab';
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    }

    loadDashboardData() {
        this.loadAnalytics();
        this.loadProducts();
    }

    loadAnalytics() {
        // Simulasi data analytics
        document.getElementById('totalOrders').textContent = '127';
        document.getElementById('monthlyRevenue').textContent = 'Rp 12.450.000';
        document.getElementById('totalVisitors').textContent = '2.843';
    }

    loadProducts() {
        const productsList = document.getElementById('productsList');
        if (!productsList) return;

        // Simulasi data produk dari localStorage atau API
        const products = JSON.parse(localStorage.getItem('adminProducts')) || [
            {
                id: 1,
                name: "Secret Admiration",
                price: 350000,
                category: "love",
                status: "active"
            },
            {
                id: 2,
                name: "Silent Love",
                price: 450000,
                category: "love",
                status: "active"
            },
            {
                id: 3,
                name: "Mystery Thank You",
                price: 300000,
                category: "thanks",
                status: "active"
            }
        ];

        productsList.innerHTML = products.map(product => `
            <div class="product-item">
                <div class="product-item-info">
                    <h4>${product.name}</h4>
                    <p>Rp ${product.price.toLocaleString('id-ID')} • ${product.category}</p>
                </div>
                <div class="product-item-actions">
                    <button class="action-btn" onclick="adminSystem.editProduct(${product.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="adminSystem.toggleProduct(${product.id})" title="${product.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}">
                        <i class="fas ${product.status === 'active' ? 'fa-eye-slash' : 'fa-eye'}"></i>
                    </button>
                    <button class="action-btn" onclick="adminSystem.deleteProduct(${product.id})" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    showAddProductForm() {
        // Implementasi form tambah produk
        alert('Fitur tambah produk akan diimplementasikan di sini.');
    }

    editProduct(productId) {
        // Implementasi edit produk
        alert(`Edit produk dengan ID: ${productId}`);
    }

    toggleProduct(productId) {
        // Implementasi toggle status produk
        alert(`Toggle status produk dengan ID: ${productId}`);
    }

    deleteProduct(productId) {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            // Implementasi hapus produk
            alert(`Hapus produk dengan ID: ${productId}`);
        }
    }
}

// Initialize admin system
const adminSystem = new AdminSystem();

// Keyboard shortcut untuk admin (Ctrl + Alt + A)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'a') {
        e.preventDefault();
        adminSystem.showLoginModal();
    }
});