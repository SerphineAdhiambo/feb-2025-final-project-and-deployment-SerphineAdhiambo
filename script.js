// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  
  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Initialize the page based on the current path
  initializePage();
});

// Product Data
const products = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 40-hour battery life, and comfortable over-ear design.',
    price: 199.99,
    discountPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    tags: ['headphones', 'audio', 'wireless', 'bluetooth'],
    rating: 4.8,
    reviews: 356,
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this waterproof fitness watch featuring heart rate monitoring, sleep tracking, and GPS.',
    price: 129.99,
    discountPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
    category: 'Wearables',
    tags: ['fitness', 'smartwatch', 'health', 'tech'],
    rating: 4.5,
    reviews: 218,
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Ultra HD 4K Monitor',
    description: 'Professional 27-inch 4K monitor with HDR support, perfect for design work, gaming, and multimedia consumption.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
    category: 'Electronics',
    tags: ['monitor', 'display', '4K', 'computer'],
    rating: 4.7,
    reviews: 142,
    inStock: true
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Adjustable ergonomic chair with lumbar support, breathable mesh back, and padded armrests for all-day comfort.',
    price: 249.99,
    discountPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1',
    category: 'Furniture',
    tags: ['chair', 'office', 'ergonomic', 'furniture'],
    rating: 4.4,
    reviews: 97,
    inStock: true
  },
  {
    id: '5',
    name: 'Premium Coffee Maker',
    description: 'Programmable coffee maker with built-in grinder, thermal carafe, and multiple brew strengths for the perfect cup.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1525088553748-ac8cdc5a3921',
    category: 'Kitchen',
    tags: ['coffee', 'appliance', 'kitchen', 'brewing'],
    rating: 4.6,
    reviews: 183,
    inStock: true,
    featured: true
  },
  {
    id: '6',
    name: 'Yoga Mat Bundle',
    description: 'Non-slip yoga mat with alignment lines, carrying strap, and matching towel for your fitness journey.',
    price: 69.99,
    discountPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1576095729669-7e6a24280a71',
    category: 'Fitness',
    tags: ['yoga', 'fitness', 'exercise', 'mat'],
    rating: 4.3,
    reviews: 76,
    inStock: true
  },
  {
    id: '7',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 20-hour battery life, deep bass, and 360° sound projection.',
    price: 89.99,
    discountPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab',
    category: 'Electronics',
    tags: ['speaker', 'audio', 'bluetooth', 'portable'],
    rating: 4.5,
    reviews: 128,
    inStock: true
  },
  {
    id: '8',
    name: 'Minimalist Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels, color temperatures, and USB charging port.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1534281343468-cc769ef515ba',
    category: 'Home',
    tags: ['lamp', 'lighting', 'desk', 'home'],
    rating: 4.2,
    reviews: 64,
    inStock: true
  }
];

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03', count: 3 },
  { name: 'Wearables', image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf', count: 1 },
  { name: 'Furniture', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', count: 1 },
  { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1', count: 1 },
  { name: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', count: 1 },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f', count: 1 }
];

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCountElements = document.querySelectorAll('#cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (product) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  const currentPath = window.location.pathname;
  if (currentPath.includes('cart.html')) {
    renderCartPage();
  }
}

function updateCartItemQuantity(productId, quantity) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    if (quantity > 0) {
      cart[itemIndex].quantity = quantity;
    } else {
      cart.splice(itemIndex, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    const currentPath = window.location.pathname;
    if (currentPath.includes('cart.html')) {
      renderCartPage();
    }
  }
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Page-specific functionality
function initializePage() {
  updateCartCount();
  
  const currentPath = window.location.pathname;
  
  if (currentPath.endsWith('/') || currentPath.includes('index.html')) {
    renderHomePage();
  } else if (currentPath.includes('products.html')) {
    renderProductsPage();
  } else if (currentPath.includes('product-detail.html')) {
    renderProductDetailPage();
  } else if (currentPath.includes('cart.html')) {
    renderCartPage();
  } else if (currentPath.includes('contact.html')) {
    setupContactForm();
  }
  
  // Add CSS for toast
  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
      .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--dark-color);
        color: white;
        padding: 12px 20px;
        border-radius: var(--border-radius);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
      }
      .toast.show {
        transform: translateY(0);
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
}

// Home Page
function renderHomePage() {
  // Featured Products
  const featuredProductsContainer = document.getElementById('featuredProducts');
  
  if (featuredProductsContainer) {
    const featuredProducts = products.filter(product => product.featured);
    
    featuredProductsContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = button.dataset.id;
        addToCart(productId);
      });
    });
  }
  
  // Categories
  const categoriesContainer = document.getElementById('categories');
  
  if (categoriesContainer) {
    categoriesContainer.innerHTML = categories.map(category => `
      <div class="category-card">
        <img src="${category.image}" alt="${category.name}">
        <div class="category-overlay">
          <h3 class="category-name">${category.name}</h3>
          <p class="category-count">${category.count} Products</p>
        </div>
      </div>
    `).join('');
  }
}

// Products Page
function renderProductsPage() {
  const productsGrid = document.getElementById('productsGrid');
  const categoryFilters = document.getElementById('categoryFilters');
  const sortBySelect = document.getElementById('sortBy');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const productCount = document.getElementById('productCount');
  const applyFiltersBtn = document.getElementById('applyFilters');
  
  let filteredProducts = [...products];
  let selectedCategories = [];
  let maxPrice = 500;
  
  if (categoryFilters) {
    // Create category filter checkboxes
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    categoryFilters.innerHTML = uniqueCategories.map(category => `
      <div class="filter-option">
        <input type="checkbox" id="category-${category}" value="${category}">
        <label for="category-${category}">${category}</label>
      </div>
    `).join('');
    
    // Add event listeners to checkboxes
    document.querySelectorAll('#categoryFilters input').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          selectedCategories.push(e.target.value);
        } else {
          selectedCategories = selectedCategories.filter(cat => cat !== e.target.value);
        }
      });
    });
  }
  
  if (priceRange && priceValue) {
    priceRange.addEventListener('input', (e) => {
      maxPrice = e.target.value;
      priceValue.textContent = `$${maxPrice}`;
    });
  }
  
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
      // Filter by category if categories are selected
      if (selectedCategories.length > 0) {
        filteredProducts = products.filter(product => selectedCategories.includes(product.category));
      } else {
        filteredProducts = [...products];
      }
      
      // Filter by price
      filteredProducts = filteredProducts.filter(product => {
        const price = product.discountPrice || product.price;
        return price <= maxPrice;
      });
      
      // Sort products
      if (sortBySelect) {
        const sortValue = sortBySelect.value;
        sortProducts(filteredProducts, sortValue);
      }
      
      // Update product count
      if (productCount) {
        productCount.textContent = filteredProducts.length;
      }
      
      // Render filtered products
      if (productsGrid) {
        productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        
        // Add event listeners to the "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.dataset.id;
            addToCart(productId);
          });
        });
      }
    });
  }
  
  if (sortBySelect) {
    sortBySelect.addEventListener('change', (e) => {
      const sortValue = e.target.value;
      sortProducts(filteredProducts, sortValue);
      
      if (productsGrid) {
        productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        
        // Add event listeners to the "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.dataset.id;
            addToCart(productId);
          });
        });
      }
    });
  }
  
  // Initialize products display
  if (productsGrid) {
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    
    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = button.dataset.id;
        addToCart(productId);
      });
    });
  }
}

// Sort products
function sortProducts(productsArray, sortValue) {
  switch (sortValue) {
    case 'priceLow':
      productsArray.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      break;
    case 'priceHigh':
      productsArray.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      break;
    case 'nameAZ':
      productsArray.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameZA':
      productsArray.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      // Default sorting (by id)
      productsArray.sort((a, b) => a.id - b.id);
      break;
  }
}

// Product Detail Page
function renderProductDetailPage() {
  const productDetailContainer = document.getElementById('productDetail');
  const relatedProductsContainer = document.getElementById('relatedProducts');
  
  if (productDetailContainer) {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
      const product = products.find(p => p.id === productId);
      
      if (product) {
        // Render product details
        productDetailContainer.innerHTML = `
          <div class="container">
            <div class="breadcrumb">
              <a href="index.html">Home</a> / 
              <a href="products.html">Products</a> / 
              <span>${product.name}</span>
            </div>
            <div class="product-detail-container">
              <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="product-detail-content">
                <h2>${product.name}</h2>
                <div class="product-detail-category">${product.category}</div>
                <div class="product-rating">
                  <div class="rating-stars">
                    ${getRatingStars(product.rating)}
                  </div>
                  <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-detail-price">
                  ${product.discountPrice ? 
                    `<span class="current-price">$${product.discountPrice.toFixed(2)}</span>
                     <span class="original-price">$${product.price.toFixed(2)}</span>` :
                    `<span class="current-price">$${product.price.toFixed(2)}</span>`
                  }
                </div>
                <div class="product-detail-description">
                  ${product.description}
                </div>
                <div class="product-detail-meta">
                  <div class="meta-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-tag"></i>
                    <span>Tags: ${product.tags.join(', ')}</span>
                  </div>
                </div>
                <div class="product-detail-actions">
                  <div class="quantity-selector">
                    <button class="quantity-btn" id="decreaseQuantity">-</button>
                    <input type="number" min="1" value="1" class="quantity-input" id="quantityInput">
                    <button class="quantity-btn" id="increaseQuantity">+</button>
                  </div>
                  <button class="btn btn-primary detail-add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        `;
        
        // Set up quantity selector
        const decreaseBtn = document.getElementById('decreaseQuantity');
        const increaseBtn = document.getElementById('increaseQuantity');
        const quantityInput = document.getElementById('quantityInput');
        
        if (decreaseBtn && increaseBtn && quantityInput) {
          decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
              quantityInput.value = currentValue - 1;
            }
          });
          
          increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
          });
        }
        
        // Add to cart button
        const addToCartBtn = document.querySelector('.detail-add-to-cart');
        if (addToCartBtn) {
          addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            const existingItemIndex = cart.findIndex(item => item.id === product.id);
            
            if (existingItemIndex !== -1) {
              cart[existingItemIndex].quantity += quantity;
            } else {
              cart.push({ ...product, quantity });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showToast(`${product.name} added to cart!`);
          });
        }
        
        // Render related products
        if (relatedProductsContainer) {
          const relatedProducts = products
            .filter(p => p.id !== product.id && (p.category === product.category || p.tags.some(tag => product.tags.includes(tag))))
            .slice(0, 4);
          
          relatedProductsContainer.innerHTML = relatedProducts.map(product => createProductCard(product)).join('');
          
          // Add event listeners to the "Add to Cart" buttons
          document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
              e.preventDefault();
              const productId = button.dataset.id;
              addToCart(productId);
            });
          });
        }
      }
    }
  }
}

// Cart Page
function renderCartPage() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartEmptyMessage = document.getElementById('cartEmpty');
  const cartSummary = document.getElementById('cartSummary');
  const subtotalAmount = document.getElementById('subtotalAmount');
  const shippingAmount = document.getElementById('shippingAmount');
  const totalAmount = document.getElementById('totalAmount');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');
  
  if (cartItemsContainer && cartEmptyMessage && cartSummary) {
    if (cart.length === 0) {
      cartEmptyMessage.classList.remove('hidden');
      cartItemsContainer.classList.add('hidden');
      cartSummary.classList.add('hidden');
    } else {
      cartEmptyMessage.classList.add('hidden');
      cartItemsContainer.classList.remove('hidden');
      cartSummary.classList.remove('hidden');
      
      // Render cart items
      cartItemsContainer.innerHTML = `
        <h2>Shopping Cart</h2>
        ${cart.map(item => `
          <div class="cart-item">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
              <h3>${item.name}</h3>
              <p>${item.category}</p>
            </div>
            <div class="cart-item-price">
              $${(item.discountPrice || item.price).toFixed(2)}
            </div>
            <div class="cart-item-quantity">
              <button class="cart-quantity-btn decrease-quantity" data-id="${item.id}">-</button>
              <input type="number" min="1" value="${item.quantity}" class="cart-quantity-input" data-id="${item.id}">
              <button class="cart-quantity-btn increase-quantity" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `).join('')}
      `;
      
      // Add event listeners for quantity buttons
      document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
          const productId = e.target.dataset.id;
          const item = cart.find(item => item.id === productId);
          if (item) {
            updateCartItemQuantity(productId, item.quantity - 1);
          }
        });
      });
      
      document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
          const productId = e.target.dataset.id;
          const item = cart.find(item => item.id === productId);
          if (item) {
            updateCartItemQuantity(productId, item.quantity + 1);
          }
        });
      });
      
      document.querySelectorAll('.cart-quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
          const productId = e.target.dataset.id;
          const quantity = parseInt(e.target.value);
          if (quantity >= 1) {
            updateCartItemQuantity(productId, quantity);
          }
        });
      });
      
      // Add event listeners for remove buttons
      document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
          const productId = e.target.closest('.cart-item-remove').dataset.id;
          removeFromCart(productId);
        });
      });
      
      // Update cart summary
      const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
      const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 10) : 0;
      const total = subtotal + shipping;
      
      if (subtotalAmount) subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
      if (shippingAmount) shippingAmount.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
      if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
    }
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Checkout functionality would be implemented here in a real e-commerce site.');
    });
  }
  
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'products.html';
    });
  }
}

// Contact Form
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For this demo, we'll just show a success message
      
      showToast('Message sent successfully!');
      contactForm.reset();
    });
  }
}

// Utility Functions
function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}">
        ${product.discountPrice ? 
          `<div class="product-badge">Sale</div>` : ''}
      </div>
      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">
          <div class="rating-stars">
            ${getRatingStars(product.rating)}
          </div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          ${product.discountPrice ? 
            `<span class="current-price">$${product.discountPrice.toFixed(2)}</span>
             <span class="original-price">$${product.price.toFixed(2)}</span>` :
            `<span class="current-price">$${product.price.toFixed(2)}</span>`
          }
        </div>
        <div class="product-actions">
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          <a href="product-detail.html?id=${product.id}" class="view-details">Details</a>
        </div>
      </div>
    </div>
  `;
}

function getRatingStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

  