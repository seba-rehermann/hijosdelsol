
// 🔄 DATOS SINCRONIZADOS DEL CMS - Generado automáticamente
const CMS_DATA_STATIC = {
  "products": {
    "nukini": {
      "id": "nukini",
      "name": "Rapé Nukini",
      "price": 2500,
      "emoji": "🌿",
      "imageType": "emoji",
      "imageUrl": "",
      "description": "Rapé tradicional de la tribu Nukini, conocido por su efecto clarificador y equilibrante.",
      "features": [
        "Claridad Mental",
        "Conexión Espiritual"
      ],
      "stock": "En Stock"
    },
    "huni-kuin": {
      "id": "huni-kuin",
      "name": "Rapé Huni Kuin",
      "price": 2800,
      "emoji": "🍃",
      "imageType": "emoji",
      "imageUrl": "",
      "description": "Medicina sagrada de la tribu Huni Kuin del Acre, Brasil. Elaborado con plantas medicinales.",
      "features": [
        "Introspección",
        "Sanación"
      ],
      "stock": "En Stock"
    }
  },
  "ceremonies": {
    "luna-nueva": {
      "id": "luna-nueva",
      "name": "Ceremonia de Luna Nueva",
      "date": "2025-03-15",
      "time": "16:00 - 20:00 hs",
      "location": "Centro Ceremonial Pachamama, Buenos Aires",
      "facilitator": "Shamán Carlos Nukini",
      "description": "Ceremonia especial de luna nueva para liberar lo que ya no sirve y manifestar nuevas intenciones.",
      "imageUrl": "",
      "price": 8500,
      "spots": 12
    }
  },
  "content": {
    "navigation": {
      "brand": "☀️ Hijos del Sol",
      "links": {
        "inicio": "Inicio",
        "productos": "Productos",
        "ceremonias": "Ceremonias",
        "nosotros": "Nosotros",
        "contacto": "Contacto"
      }
    },
    "hero": {
      "title": "☀️ Hijos del Sol",
      "subtitle": "Conecta con la medicina ancestral en un espacio sagrado de sanación, transformación y comunidad",
      "button1": "Explorar Productos",
      "button2": "Ver Ceremonias",
      "background_image": "",
      "use_gradient": true
    },
    "products_section": {
      "title": "🌿 Nuestros Productos Sagrados",
      "subtitle": "Medicina ancestral de las tradiciones amazónicas"
    },
    "ceremonies_section": {
      "title": "🕉️ Ceremonias Sagradas",
      "subtitle": "Espacios de sanación y transformación"
    },
    "page_title": "☀️ Hijos del Sol - Ceremonias Sagradas"
  },
  "contact": {
    "phone": "+54 11 2345-6789",
    "email": "medicina@hijosdelsol.com",
    "address": "Buenos Aires, Argentina",
    "instagram": "@hijosdelsol.ceremonias",
    "whatsapp": "5491123456789"
  }
};

// Función para cargar datos estáticos del CMS
function loadStaticCMSData() {
    // Usar datos estáticos si no hay datos en localStorage
    const savedData = localStorage.getItem('hijosdelsol_cms_data');
    if (!savedData) {
        localStorage.setItem('hijosdelsol_cms_data', JSON.stringify(CMS_DATA_STATIC));
        console.log('📁 Datos estáticos del CMS cargados por primera vez');
    }
}

// Cargar datos estáticos al inicio
loadStaticCMSData();

// Variables globales
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Productos disponibles (se cargarán desde el CMS)
let products = {};
let ceremonies = {};
let cmsData = null;

// Función para cargar datos del CMS
function loadCMSData() {
    const savedData = localStorage.getItem('hijosdelsol_cms_data');
    if (savedData) {
        try {
            cmsData = JSON.parse(savedData);
            
            // Convertir productos del CMS al formato del sitio
            if (cmsData.products) {
                products = {};
                Object.values(cmsData.products).forEach(product => {
                    products[product.id] = {
                        name: product.name,
                        price: product.price,
                        image: product.emoji,
                        imageType: product.imageType || 'emoji',
                        imageUrl: product.imageUrl || '',
                        description: product.description,
                        features: product.features || [],
                        stock: product.stock || 'En Stock'
                    };
                });
            }
            
            // Cargar ceremonias del CMS
            if (cmsData.ceremonies) {
                ceremonies = cmsData.ceremonies;
            }
            
            console.log('📁 Datos del CMS cargados correctamente');
            return true;
        } catch (e) {
            console.error('❌ Error cargando datos del CMS:', e);
        }
    }
    
    // Si no hay datos del CMS, usar datos por defecto
    loadDefaultData();
    return false;
}

// Datos por defecto si no hay CMS
function loadDefaultData() {
    products = {
        'nukini': {
            name: 'Rapé Nukini',
            price: 2500,
            image: '🌿',
            description: 'Rapé tradicional de la tribu Nukini'
        },
        'huni-kuin': {
            name: 'Rapé Huni Kuin',
            price: 2800,
            image: '🍃',
            description: 'Medicina sagrada de la tribu Huni Kuin'
        },
        'kaxinawa': {
            name: 'Rapé Kaxinawá',
            price: 3000,
            image: '🌱',
            description: 'Preparación especial de la nación Kaxinawá'
        },
        'yawanawa': {
            name: 'Rapé Yawanawá',
            price: 2700,
            image: '🌺',
            description: 'Medicina femenina sagrada de la tribu Yawanawá'
        }
    };
}

// Actualizar página con datos del CMS
function updatePageFromCMS() {
    if (!cmsData || !cmsData.content) return;
    
    // Actualizar título de la página
    if (cmsData.content.page_title) {
        document.title = cmsData.content.page_title;
    }
    
    // Actualizar navegación
    if (cmsData.content.navigation) {
        const navBrand = document.querySelector('.nav-brand h2');
        if (navBrand) navBrand.textContent = cmsData.content.navigation.brand;
        
        const navLinks = document.querySelectorAll('.nav-link');
        const navData = cmsData.content.navigation.links;
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#inicio' && navData.inicio) link.textContent = navData.inicio;
            if (href === '#productos' && navData.productos) link.textContent = navData.productos;
            if (href === '#ceremonias' && navData.ceremonias) link.textContent = navData.ceremonias;
            if (href === '#nosotros' && navData.nosotros) link.textContent = navData.nosotros;
            if (href === '#contacto' && navData.contacto) link.textContent = navData.contacto;
        });
    }
    
    // Actualizar hero section
    if (cmsData.content.hero) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        const heroBg = document.querySelector('.hero-bg');
        
        if (heroTitle) heroTitle.textContent = cmsData.content.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = cmsData.content.hero.subtitle;
        if (heroButtons[0]) heroButtons[0].textContent = cmsData.content.hero.button1;
        if (heroButtons[1]) heroButtons[1].textContent = cmsData.content.hero.button2;
        
        // Actualizar imagen de fondo
        if (heroBg) {
            if (!cmsData.content.hero.use_gradient && cmsData.content.hero.background_image) {
                // Usar imagen personalizada
                heroBg.style.background = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${cmsData.content.hero.background_image}')`;
                heroBg.style.backgroundSize = 'cover';
                heroBg.style.backgroundPosition = 'center';
                heroBg.style.backgroundRepeat = 'no-repeat';
            } else {
                // Usar gradiente por defecto
                heroBg.style.background = 'var(--gradient)';
                heroBg.style.backgroundSize = '';
                heroBg.style.backgroundPosition = '';
                heroBg.style.backgroundRepeat = '';
            }
        }
    }
    
    // Actualizar sección productos
    if (cmsData.content.products_section) {
        const productsTitle = document.querySelector('#productos .section-title');
        const productsSubtitle = document.querySelector('#productos .section-subtitle');
        
        if (productsTitle) productsTitle.textContent = cmsData.content.products_section.title;
        if (productsSubtitle) productsSubtitle.textContent = cmsData.content.products_section.subtitle;
    }
    
    // Actualizar sección ceremonias
    if (cmsData.content.ceremonies_section) {
        const ceremoniesTitle = document.querySelector('#ceremonias .section-title');
        const ceremoniesSubtitle = document.querySelector('#ceremonias .section-subtitle');
        
        if (ceremoniesTitle) ceremoniesTitle.textContent = cmsData.content.ceremonies_section.title;
        if (ceremoniesSubtitle) ceremoniesSubtitle.textContent = cmsData.content.ceremonies_section.subtitle;
    }
    
    // Actualizar sección nosotros
    if (cmsData.content.about) {
        const aboutTitle = document.querySelector('.about-text h2');
        const aboutParagraphs = document.querySelectorAll('.about-text p');
        
        if (aboutTitle) aboutTitle.textContent = cmsData.content.about.title;
        if (aboutParagraphs[0]) aboutParagraphs[0].textContent = cmsData.content.about.text1;
        if (aboutParagraphs[1]) aboutParagraphs[1].textContent = cmsData.content.about.text2;
        
        // Actualizar valores
        const values = document.querySelectorAll('.value');
        if (values.length >= 3 && cmsData.content.about.values) {
            const valueIcons = document.querySelectorAll('.value-icon');
            const valueTexts = document.querySelectorAll('.value span:last-child');
            
            if (valueIcons[0] && cmsData.content.about.values.value1) {
                valueIcons[0].textContent = cmsData.content.about.values.value1.icon;
                valueTexts[0].textContent = cmsData.content.about.values.value1.text;
            }
            if (valueIcons[1] && cmsData.content.about.values.value2) {
                valueIcons[1].textContent = cmsData.content.about.values.value2.icon;
                valueTexts[1].textContent = cmsData.content.about.values.value2.text;
            }
            if (valueIcons[2] && cmsData.content.about.values.value3) {
                valueIcons[2].textContent = cmsData.content.about.values.value3.icon;
                valueTexts[2].textContent = cmsData.content.about.values.value3.text;
            }
        }
        
        // Actualizar placeholder de imagen
        if (cmsData.content.about.placeholder) {
            const placeholderIcon = document.querySelector('.image-placeholder span');
            const placeholderText = document.querySelector('.image-placeholder p');
            
            if (placeholderIcon) placeholderIcon.textContent = cmsData.content.about.placeholder.icon;
            if (placeholderText) placeholderText.textContent = cmsData.content.about.placeholder.text;
        }
    }
    
    // Actualizar sección contacto
    if (cmsData.content.contact_section) {
        const contactTitle = document.querySelector('#contacto .section-title');
        const contactInfoTitle = document.querySelector('.contact-info h3');
        const contactFormTitle = document.querySelector('.contact-form h3');
        const contactFormButton = document.querySelector('#contact-form button[type="submit"]');
        
        if (contactTitle) contactTitle.textContent = cmsData.content.contact_section.title;
        if (contactInfoTitle) contactInfoTitle.textContent = cmsData.content.contact_section.info_title;
        if (contactFormTitle) contactFormTitle.textContent = cmsData.content.contact_section.form_title;
        if (contactFormButton) contactFormButton.textContent = cmsData.content.contact_section.form_button;
        
        // Actualizar placeholders del formulario
        if (cmsData.content.contact_section.form_placeholders) {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');
            
            if (nameInput) nameInput.placeholder = cmsData.content.contact_section.form_placeholders.name;
            if (emailInput) emailInput.placeholder = cmsData.content.contact_section.form_placeholders.email;
            if (phoneInput) phoneInput.placeholder = cmsData.content.contact_section.form_placeholders.phone;
            if (messageInput) messageInput.placeholder = cmsData.content.contact_section.form_placeholders.message;
        }
    }
    
    // Actualizar información de contacto
    if (cmsData.contact) {
        const contactItems = document.querySelectorAll('.contact-item span:last-child');
        if (contactItems[0]) contactItems[0].textContent = cmsData.contact.phone;
        if (contactItems[1]) contactItems[1].textContent = cmsData.contact.email;
        if (contactItems[2]) contactItems[2].textContent = cmsData.contact.address;
        if (contactItems[3]) contactItems[3].textContent = cmsData.contact.instagram;
    }
    
    // Actualizar footer
    if (cmsData.content.footer) {
        const footerBrandText = document.querySelector('.footer-section:first-child p');
        const footerLinksTitle = document.querySelector('.footer-section:nth-child(2) h4');
        const footerContactTitle = document.querySelector('.footer-section:nth-child(3) h4');
        const footerCopyright = document.querySelector('.footer-bottom p');
        
        if (footerBrandText) footerBrandText.textContent = cmsData.content.footer.brand_text;
        if (footerLinksTitle) footerLinksTitle.textContent = cmsData.content.footer.links_title;
        if (footerContactTitle) footerContactTitle.textContent = cmsData.content.footer.contact_title;
        if (footerCopyright) footerCopyright.textContent = cmsData.content.footer.copyright;
    }
    
    // Actualizar textos del carrito
    if (cmsData.content.cart) {
        const cartModalTitle = document.querySelector('#cart-modal .modal-header h3');
        const cartTotal = document.querySelector('.cart-total strong');
        const cartButton = document.getElementById('cart-button');
        const cartButtons = document.querySelectorAll('#cart-modal .modal-footer button');
        
        if (cartModalTitle) cartModalTitle.textContent = cmsData.content.cart.title;
        if (cartTotal) cartTotal.innerHTML = `${cmsData.content.cart.total_text}: $<span id="cart-total">0</span>`;
        if (cartButton) {
            const cartCount = cartButton.querySelector('#cart-count');
            const countText = cartCount ? cartCount.outerHTML : '';
            cartButton.innerHTML = `${cmsData.content.cart.cart_button} ${countText}`;
        }
        
        // Actualizar botones del carrito
        if (cartButtons.length >= 3 && cmsData.content.cart.buttons) {
            cartButtons[0].textContent = cmsData.content.cart.buttons.clear;
            cartButtons[1].textContent = cmsData.content.cart.buttons.continue;
            cartButtons[2].textContent = cmsData.content.cart.buttons.checkout;
        }
    }
    
    console.log('🔄 Página actualizada completamente con datos del CMS');
}

// Renderizar productos desde el CMS
function renderProductsFromCMS() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid || !products || Object.keys(products).length === 0) return;
    
    productsGrid.innerHTML = Object.values(products).map(product => {
        // Determinar qué mostrar como imagen
        let imageElement = '';
        if (product.imageType === 'url' && product.imageUrl) {
            imageElement = `<div class="product-image"><img src="${product.imageUrl}" alt="${product.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\"product-emoji\">${product.image || '🌿'}</div>'"></div>`;
        } else {
            imageElement = `<div class="product-emoji">${product.image || '🌿'}</div>`;
        }
        
        const stockClass = getStockStatusClass(product.stock);
        
        return `
            <div class="product-card" data-id="${Object.keys(products).find(key => products[key] === product)}">
                ${imageElement}
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toLocaleString()}</p>
                <p class="product-description">${product.description}</p>
                ${product.features && product.features.length > 0 ? `
                    <div class="features">
                        ${product.features.map(feature => `<span class="feature">${feature}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="stock-status ${stockClass}">
                    ${product.stock}
                </div>
                <button class="btn btn-primary" onclick="addToCart('${Object.keys(products).find(key => products[key] === product)}')">
                    Agregar al Carrito 🛒
                </button>
            </div>
        `;
    }).join('');
    
    console.log('🛍️ Productos renderizados desde el CMS');
}

// Renderizar ceremonias desde el CMS
function renderCeremoniesFromCMS() {
    const ceremoniesGrid = document.querySelector('.ceremonies-grid');
    if (!ceremoniesGrid || !ceremonies || Object.keys(ceremonies).length === 0) return;
    
    ceremoniesGrid.innerHTML = Object.values(ceremonies).map(ceremony => {
        const ceremonyDate = new Date(ceremony.date).toLocaleDateString('es-AR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let imageElement = '';
        if (ceremony.imageUrl) {
            imageElement = `<div class="ceremony-image"><img src="${ceremony.imageUrl}" alt="${ceremony.name}" loading="lazy" onerror="this.style.display='none'"></div>`;
        }
        
        return `
            <div class="ceremony-card" data-id="${ceremony.id}">
                ${imageElement}
                <h3>${ceremony.name}</h3>
                <div class="ceremony-info">
                    <p><strong>📅 Fecha:</strong> ${ceremonyDate}</p>
                    <p><strong>🕐 Horario:</strong> ${ceremony.time}</p>
                    <p><strong>📍 Lugar:</strong> ${ceremony.location}</p>
                    <p><strong>👤 Facilitador:</strong> ${ceremony.facilitator}</p>
                    <p><strong>👥 Cupos:</strong> ${ceremony.spots} disponibles</p>
                </div>
                <p class="ceremony-description">${ceremony.description}</p>
                <div class="ceremony-price">
                    <span class="price">$${ceremony.price.toLocaleString()}</span>
                </div>
                <button class="btn btn-primary" onclick="reserveCeremony('${ceremony.id}')">
                    Reservar Lugar 🌟
                </button>
            </div>
        `;
    }).join('');
    
    console.log('🌙 Ceremonias renderizadas desde el CMS');
}

// Función helper para obtener la clase CSS del estado del stock
function getStockStatusClass(stock) {
    switch(stock) {
        case 'En Stock':
            return 'in-stock';
        case 'Pocas Unidades':
            return 'low-stock';
        case 'Agotado':
            return 'out-of-stock';
        default:
            return 'in-stock';
    }
}

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del CMS primero
    loadCMSData();
    
    // Actualizar contenido dinámico del CMS
    updatePageFromCMS();
    
    // Renderizar productos y ceremonias desde el CMS
    renderProductsFromCMS();
    renderCeremoniesFromCMS();
    
    // Inicializar navegación móvil
    initMobileNavigation();
    
    // Inicializar smooth scrolling para enlaces de navegación
    initSmoothScrolling();
    
    // Inicializar formulario de contacto
    initContactForm();
    
    // Cargar carrito desde localStorage
    loadCartFromStorage();
    
    // Animaciones de entrada
    initScrollAnimations();
    
    console.log('🌞 Hijos del Sol - Sitio web cargado correctamente');
});

// Navegación móvil
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación del botón hamburguesa
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
        
        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            });
        });
    }
}

// Smooth scrolling para navegación
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funciones del carrito de compras
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;
    
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showMessage('Producto agregado al carrito', 'success');
    
    // Animación del botón
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Agregado ✓';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

function updateCartUI() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toLocaleString();
    
    updateCartModal();
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--accent-color); margin: 2rem 0;">Tu carrito está vacío</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <span class="cart-item-emoji">${item.image}</span>
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString()}</p>
                </div>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="qty-btn">-</button>
                <span class="qty">${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="qty-btn">+</button>
                <button onclick="removeFromCart('${item.id}')" class="remove-btn">🗑️</button>
            </div>
        </div>
    `).join('');
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function checkout() {
    if (cart.length === 0) {
        showMessage('Tu carrito está vacío', 'error');
        return;
    }
    
    const message = `¡Hola! Me interesa comprar los siguientes productos de Hijos del Sol:\n\n${cart.map(item => `${item.image} ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`).join('\n')}\n\nTotal: $${cartTotal.toLocaleString()}\n\n¿Podrían confirmarme la disponibilidad y método de pago?`;
    
    const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    showMessage('Redirigiendo a WhatsApp para finalizar la compra', 'success');
}

// Reservas de ceremonias
function reserveCeremony(ceremonyId) {
    const ceremonies = {
        'luna-nueva': 'Ceremonia de Luna Nueva - 15 de marzo 2025',
        'circulo-medicina': 'Círculo de Medicina Sagrada - 22 de marzo 2025',
        'plenilunio': 'Ceremonia de Plenilunio - 5 de abril 2025'
    };
    
    const ceremonyName = ceremonies[ceremonyId];
    if (!ceremonyName) return;
    
    const message = `¡Hola! Me interesa reservar un lugar en la ${ceremonyName}.\n\n¿Podrían confirmarme la disponibilidad y enviarme más información sobre el proceso de reserva?`;
    
    const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    showMessage('Redirigiendo a WhatsApp para confirmar reserva', 'success');
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone') || 'No proporcionado';
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                showMessage('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            // Simular envío
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.innerHTML = '<span class="loading"></span> Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                const whatsappMessage = `Nuevo mensaje desde la web:\n\n👤 Nombre: ${name}\n📧 Email: ${email}\n📱 Teléfono: ${phone}\n\n💬 Mensaje:\n${message}`;
                const whatsappUrl = `https://wa.me/5491123456789?text=${encodeURIComponent(whatsappMessage)}`;
                
                window.open(whatsappUrl, '_blank');
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                showMessage('Mensaje enviado. Te redirigimos a WhatsApp.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// Sistema de mensajes
function showMessage(text, type = 'success') {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Agregar al inicio del body
    document.body.insertBefore(message, document.body.firstChild);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Almacenamiento local del carrito
function saveCartToStorage() {
    localStorage.setItem('hijosdelsol_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('hijosdelsol_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            // Validar que todos los productos del carrito existan
            cart = cart.filter(item => products[item.id]);
            updateCartUI();
        } catch (e) {
            console.error('Error cargando carrito:', e);
            cart = [];
            updateCartUI();
        }
    }
}

// Función para vaciar el carrito
function clearCart() {
    if (cart.length === 0) {
        showMessage('El carrito ya está vacío', 'info');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        updateCartUI();
        saveCartToStorage();
        showMessage('Carrito vaciado correctamente', 'success');
    }
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll('.product-card, .ceremony-card, .about-text, .contact-info, .contact-form');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        closeCart();
    }
});

// Navegación activa al hacer scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Función para manejar errores de imágenes (si se agregan en el futuro)
function handleImageError(img) {
    img.style.display = 'none';
    const placeholder = img.parentNode.querySelector('.image-placeholder');
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
}

// Función de búsqueda (para futuras implementaciones)
function searchProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
        
        if (productName.includes(query.toLowerCase()) || productDescription.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para formatear números de teléfono
function formatPhoneNumber(phone) {
    // Remover caracteres no numéricos excepto +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Si no empieza con +54, agregarlo para Argentina
    if (!cleaned.startsWith('+54') && cleaned.length >= 10) {
        return '+54' + cleaned;
    }
    
    return cleaned;
}

// Efectos visuales adicionales
function addVisualEffects() {
    // Efecto parallax simple para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Efecto hover para las cards
    const cards = document.querySelectorAll('.product-card, .ceremony-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Llamar efectos visuales después de cargar
document.addEventListener('DOMContentLoaded', addVisualEffects);

// Función para compartir en redes sociales
function shareOnSocial(platform, ceremonyName = '') {
    const url = window.location.href;
    const text = ceremonyName ? 
        `¡Participa en ${ceremonyName} con Hijos del Sol! 🌞` : 
        '¡Descubre las ceremonias sagradas de Hijos del Sol! 🌞';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función de debugging (solo en desarrollo)
function debugCart() {
    console.log('🛒 Estado del carrito:', {
        items: cart,
        count: cartCount,
        total: cartTotal
    });
}

// Event listeners adicionales para mejorar UX
document.addEventListener('keydown', function(e) {
    // Cerrar modal con ESC
    if (e.key === 'Escape') {
        const modal = document.getElementById('cart-modal');
        if (modal.style.display === 'block') {
            closeCart();
        }
    }
});

// Prevenir zoom en dispositivos móviles en inputs
document.addEventListener('touchstart', function() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.fontSize = '16px';
    });
});

// Función para analytics (placeholder para futuras implementaciones)
function trackEvent(eventName, data = {}) {
    // Aquí se podría integrar Google Analytics, Facebook Pixel, etc.
    console.log('📊 Evento:', eventName, data);
}

// Tracking de eventos importantes
document.addEventListener('DOMContentLoaded', function() {
    // Track page load
    trackEvent('page_view', { page: 'home' });
    
    // Track product views
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            trackEvent('product_view', { product_id: productId });
        });
    });
});

// Función para lazy loading de contenido (futuras imágenes)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para validar formularios
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
        
        // Validación específica para email
        if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        }
    });
    
    return isValid;
}

// Inicializar todo cuando la página esté lista
window.addEventListener('load', function() {
    console.log('🌞 Hijos del Sol - Todas las funcionalidades cargadas');
});
