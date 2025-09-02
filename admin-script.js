// Variables globales del CMS
let isLoggedIn = false;
let currentData = {
    products: {},
    ceremonies: {},
    content: {
        // Navegación
        navigation: {
            brand: '☀️ Hijos del Sol',
            links: {
                inicio: 'Inicio',
                productos: 'Productos',
                ceremonias: 'Ceremonias',
                nosotros: 'Nosotros',
                contacto: 'Contacto'
            }
        },
        // Sección Hero
        hero: {
            title: '☀️ Hijos del Sol',
            subtitle: 'Conecta con la medicina ancestral en un espacio sagrado de sanación, transformación y comunidad',
            button1: 'Explorar Productos',
            button2: 'Ver Ceremonias',
            background_image: '', // URL de imagen de fondo
            use_gradient: true // Si usar gradiente o imagen
        },
        // Sección Productos
        products_section: {
            title: '🌿 Nuestros Productos Sagrados',
            subtitle: 'Medicina ancestral de las tradiciones amazónicas'
        },
        // Sección Ceremonias
        ceremonies_section: {
            title: '🕉️ Ceremonias Sagradas',
            subtitle: 'Espacios de sanación y transformación'
        },
        // Sección Nosotros
        about: {
            title: '🌞 Nuestra Misión',
            text1: 'Somos Hijos del Sol, una comunidad dedicada a preservar y compartir las tradiciones ancestrales de medicina sagrada. Trabajamos con respeto profundo hacia las culturas originarias y sus enseñanzas.',
            text2: 'Nuestro compromiso es crear espacios seguros de sanación donde cada persona pueda conectar con su esencia y recibir la medicina que necesita para su crecimiento espiritual.',
            values: {
                value1: {
                    icon: '🙏',
                    text: 'Respeto Ancestral'
                },
                value2: {
                    icon: '💚',
                    text: 'Sanación Auténtica'
                },
                value3: {
                    icon: '🌱',
                    text: 'Crecimiento Espiritual'
                }
            },
            placeholder: {
                icon: '🌞',
                text: 'Espacio de medicina sagrada'
            }
        },
        // Sección Contacto
        contact_section: {
            title: '📞 Conecta con Nosotros',
            info_title: 'Información de Contacto',
            form_title: 'Envíanos un Mensaje',
            form_placeholders: {
                name: 'Tu nombre',
                email: 'Tu email',
                phone: 'Tu teléfono',
                message: 'Tu mensaje o consulta'
            },
            form_button: 'Enviar Mensaje'
        },
        // Footer
        footer: {
            brand_text: 'Medicina ancestral con respeto y tradición',
            links_title: 'Enlaces',
            contact_title: 'Contacto',
            copyright: '© 2025 Hijos del Sol. Todos los derechos reservados.'
        },
        // Modal del carrito
        cart: {
            title: '🛒 Carrito de Compras',
            total_text: 'Total',
            buttons: {
                clear: '🗑️ Vaciar',
                continue: 'Seguir Comprando',
                checkout: 'Finalizar Compra'
            },
            empty_message: 'Tu carrito está vacío',
            cart_button: '🛒'
        },
        // Título de la página
        page_title: '☀️ Hijos del Sol - Ceremonias Sagradas'
    },
    contact: {
        phone: '+54 11 2345-6789',
        email: 'medicina@hijosdelsol.com',
        address: 'Buenos Aires, Argentina',
        instagram: '@hijosdelsol.ceremonias',
        whatsapp: '5491123456789'
    }
};

// Configuración del CMS
const CMS_CONFIG = {
    adminPassword: 'rapedelsol',
    storageKey: 'hijosdelsol_cms_data',
    sessionKey: 'hijosdelsol_admin_session'
};

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 CMS Admin - Inicializando...');
    
    // Cargar datos desde localStorage
    loadDataFromStorage();
    
    // Verificar si ya está logueado
    checkExistingSession();
    
    // Inicializar event listeners
    initEventListeners();
    
    // Inicializar datos por defecto si no existen
    initDefaultData();
    
    console.log('✅ CMS Admin - Inicializado correctamente');
});

// Cargar datos desde localStorage
function loadDataFromStorage() {
    const savedData = localStorage.getItem(CMS_CONFIG.storageKey);
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            currentData = { ...currentData, ...parsedData };
            console.log('📁 Datos cargados desde localStorage');
        } catch (e) {
            console.error('❌ Error cargando datos:', e);
            showMessage('Error cargando datos guardados', 'error');
        }
    }
}

// Guardar datos en localStorage
function saveDataToStorage() {
    try {
        localStorage.setItem(CMS_CONFIG.storageKey, JSON.stringify(currentData));
        console.log('💾 Datos guardados en localStorage');
        updateDashboard();
    } catch (e) {
        console.error('❌ Error guardando datos:', e);
        showMessage('Error guardando datos', 'error');
    }
}

// Verificar sesión existente
function checkExistingSession() {
    const session = sessionStorage.getItem(CMS_CONFIG.sessionKey);
    if (session === 'authenticated') {
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

// Inicializar event listeners
function initEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Navigation buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Modal close buttons
    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Click outside modal to close
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // Add/Edit buttons
    document.getElementById('add-product')?.addEventListener('click', () => openProductModal());
    document.getElementById('add-ceremony')?.addEventListener('click', () => openCeremonyModal());
    
    // Forms
    document.getElementById('product-form')?.addEventListener('submit', handleProductSave);
    document.getElementById('ceremony-form')?.addEventListener('submit', handleCeremonySave);
    document.getElementById('navigation-form')?.addEventListener('submit', handleNavigationSave);
    document.getElementById('hero-form')?.addEventListener('submit', handleHeroSave);
    document.getElementById('products-section-form')?.addEventListener('submit', handleProductsSectionSave);
    document.getElementById('ceremonies-section-form')?.addEventListener('submit', handleCeremoniesSectionSave);
    document.getElementById('about-form')?.addEventListener('submit', handleAboutSave);
    document.getElementById('contact-section-form')?.addEventListener('submit', handleContactSectionSave);
    document.getElementById('footer-form')?.addEventListener('submit', handleFooterSave);
    document.getElementById('cart-form')?.addEventListener('submit', handleCartSave);
    document.getElementById('page-title-form')?.addEventListener('submit', handlePageTitleSave);
    document.getElementById('contact-form')?.addEventListener('submit', handleContactSave);
    
    // Export/Import
    document.getElementById('export-data')?.addEventListener('click', exportData);
    document.getElementById('import-data')?.addEventListener('click', () => openImportModal());
    document.getElementById('import-confirm')?.addEventListener('click', importData);
    
    // Dashboard actions
    document.getElementById('reset-data')?.addEventListener('click', resetData);
    document.getElementById('backup-data')?.addEventListener('click', exportData);
    
    // Sync site button
    document.getElementById('sync-site')?.addEventListener('click', syncSite);
}

// Funciones para manejo de imágenes
function toggleImageFields() {
    const imageType = document.getElementById('image-type').value;
    const emojiField = document.getElementById('emoji-field');
    const imageUrlField = document.getElementById('image-url-field');
    const imagePreview = document.getElementById('image-preview');
    
    if (imageType === 'emoji') {
        emojiField.style.display = 'block';
        imageUrlField.style.display = 'none';
        imagePreview.style.display = 'none';
        
        // Limpiar campos de imagen
        document.getElementById('product-image-url').value = '';
    } else {
        emojiField.style.display = 'none';
        imageUrlField.style.display = 'block';
        
        // Limpiar emoji
        document.getElementById('product-emoji').value = '';
        
        // Agregar evento para vista previa
        const imageUrlInput = document.getElementById('product-image-url');
        imageUrlInput.addEventListener('input', function() {
            previewProductImage();
        });
    }
}

function previewProductImage() {
    const imageUrl = document.getElementById('product-image-url').value;
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('product-image-preview');
    
    if (imageUrl && isValidImageUrl(imageUrl)) {
        previewImg.src = imageUrl;
        previewImg.onload = function() {
            imagePreview.style.display = 'block';
        };
        previewImg.onerror = function() {
            imagePreview.style.display = 'none';
            showMessage('Error cargando la imagen', 'error');
        };
    } else {
        imagePreview.style.display = 'none';
    }
}

function previewCeremonyImage() {
    const imageUrl = document.getElementById('ceremony-image-url').value;
    const imagePreview = document.getElementById('ceremony-image-preview');
    const previewImg = document.getElementById('ceremony-preview-img');
    
    if (imageUrl && isValidImageUrl(imageUrl)) {
        previewImg.src = imageUrl;
        previewImg.onload = function() {
            imagePreview.style.display = 'block';
        };
        previewImg.onerror = function() {
            imagePreview.style.display = 'none';
            showMessage('Error cargando la imagen de la ceremonia', 'error');
        };
    } else {
        imagePreview.style.display = 'none';
    }
}

function isValidImageUrl(url) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext)) || url.startsWith('https://') || url.startsWith('http://');
}

// Inicializar datos por defecto
function initDefaultData() {
    if (Object.keys(currentData.products).length === 0) {
        currentData.products = {
            'nukini': {
                id: 'nukini',
                name: 'Rapé Nukini',
                emoji: '🌿',
                imageUrl: '',
                imageType: 'emoji',
                price: 2500,
                description: 'Rapé tradicional de la tribu Nukini, conocido por su efecto clarificador y equilibrante.',
                features: ['Claridad Mental', 'Conexión Espiritual'],
                stock: 'En Stock'
            },
            'huni-kuin': {
                id: 'huni-kuin',
                name: 'Rapé Huni Kuin',
                emoji: '🍃',
                price: 2800,
                description: 'Medicina sagrada de la tribu Huni Kuin del Acre, Brasil. Elaborado con plantas medicinales.',
                features: ['Introspección', 'Sanación'],
                stock: 'En Stock'
            },
            'kaxinawa': {
                id: 'kaxinawa',
                name: 'Rapé Kaxinawá',
                emoji: '🌱',
                price: 3000,
                description: 'Preparación especial de la nación Kaxinawá, ideal para ceremonias de poder y conexión.',
                features: ['Poder Personal', 'Protección'],
                stock: 'En Stock'
            },
            'yawanawa': {
                id: 'yawanawa',
                name: 'Rapé Yawanawá',
                emoji: '🌺',
                price: 2700,
                description: 'Medicina femenina sagrada de la tribu Yawanawá, conocida por su suavidad y profundidad.',
                features: ['Energía Femenina', 'Intuición'],
                stock: 'En Stock'
            }
        };
    }
    
    if (Object.keys(currentData.ceremonies).length === 0) {
        currentData.ceremonies = {
            'luna-nueva': {
                id: 'luna-nueva',
                name: 'Ceremonia de Luna Nueva',
                date: '2025-03-15',
                time: '16:00 - 20:00 hs',
                location: 'Centro Ceremonial Pachamama, Buenos Aires',
                facilitator: 'Shamán Carlos Nukini',
                description: 'Ceremonia especial de luna nueva para liberar lo que ya no sirve y manifestar nuevas intenciones. Incluye medicina de rapé, cantos sagrados y meditación.',
                price: 8500,
                spots: 12
            },
            'circulo-medicina': {
                id: 'circulo-medicina',
                name: 'Círculo de Medicina Sagrada',
                date: '2025-03-22',
                time: '18:00 - 22:00 hs',
                location: 'Centro Holístico Madre Tierra, CABA',
                facilitator: 'María Luz Yawanawá',
                description: 'Círculo íntimo de medicina con enfoque en la sanación del corazón. Trabajo con rapé, cacao sagrado y sonidos ancestrales.',
                price: 6500,
                spots: 8
            },
            'plenilunio': {
                id: 'plenilunio',
                name: 'Ceremonia de Plenilunio',
                date: '2025-04-05',
                time: '19:00 - 23:00 hs',
                location: 'Espacio Natural Sagrado, San Isidro',
                facilitator: 'Abuelo Kaxinawá',
                description: 'Ceremonia bajo la luna llena para potenciar la manifestación y la conexión con los ancestros. Medicina de rapé y tambores.',
                price: 9500,
                spots: 15
            }
        };
    }
    
    saveDataToStorage();
}

// Manejo del login
function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('login-error');
    
    // Verificar contraseña única
    if (password === CMS_CONFIG.adminPassword) {
        sessionStorage.setItem(CMS_CONFIG.sessionKey, 'authenticated');
        isLoggedIn = true;
        showAdminPanel();
        showMessage('¡Bienvenido al panel de administración!', 'success');
    } else {
        errorDiv.textContent = 'Contraseña incorrecta';
        errorDiv.style.display = 'block';
        document.getElementById('password').value = '';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Manejo del logout
function handleLogout() {
    sessionStorage.removeItem(CMS_CONFIG.sessionKey);
    isLoggedIn = false;
    showLoginScreen();
    showMessage('Sesión cerrada correctamente', 'info');
}

// Mostrar pantalla de login
function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('password').focus();
}

// Mostrar panel de administración
function showAdminPanel() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    
    // Mostrar dashboard por defecto
    showSection('dashboard');
    
    // Cargar contenido
    loadAllContent();
}

// Mostrar sección específica
function showSection(sectionName) {
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Mostrar sección
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Cargar contenido específico
    switch(sectionName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'productos':
            loadProductsList();
            break;
        case 'ceremonias':
            loadCeremoniesList();
            break;
        case 'contenido':
            loadContentForms();
            break;
        case 'contacto':
            loadContactForm();
            break;
    }
}

// Actualizar dashboard
function updateDashboard() {
    const productsCount = Object.keys(currentData.products).length;
    const ceremoniesCount = Object.keys(currentData.ceremonies).length;
    const dataSize = Math.round(JSON.stringify(currentData).length / 1024);
    
    document.getElementById('products-count').textContent = productsCount;
    document.getElementById('ceremonies-count').textContent = ceremoniesCount;
    document.getElementById('data-size').textContent = `${dataSize}KB`;
}

// Cargar lista de productos
function loadProductsList() {
    const container = document.getElementById('products-list');
    
    if (Object.keys(currentData.products).length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--accent-color); margin: 2rem 0;">No hay productos creados aún</p>';
        return;
    }
    
    container.innerHTML = Object.values(currentData.products).map(product => `
        <div class="item-card">
            <div class="item-emoji">${product.emoji}</div>
            <div class="item-title">${product.name}</div>
            <div class="item-price">$${product.price.toLocaleString()}</div>
            <div class="item-description">${product.description}</div>
            <div class="item-meta">
                <span class="status-indicator ${getStockClass(product.stock)}">${product.stock}</span>
            </div>
            <div class="item-actions">
                <button class="btn btn-primary btn-sm" onclick="editProduct('${product.id}')">✏️ Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// Cargar lista de ceremonias
function loadCeremoniesList() {
    const container = document.getElementById('ceremonies-list');
    
    if (Object.keys(currentData.ceremonies).length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--accent-color); margin: 2rem 0;">No hay ceremonias creadas aún</p>';
        return;
    }
    
    container.innerHTML = Object.values(currentData.ceremonies).map(ceremony => `
        <div class="item-card">
            <div class="item-title">${ceremony.name}</div>
            <div class="item-price">$${ceremony.price.toLocaleString()}</div>
            <div class="item-description">${ceremony.description}</div>
            <div class="item-meta">
                📅 ${formatDate(ceremony.date)} | 🕐 ${ceremony.time}<br>
                📍 ${ceremony.location}<br>
                👥 ${ceremony.facilitator} | ${ceremony.spots} cupos disponibles
            </div>
            <div class="item-actions">
                <button class="btn btn-primary btn-sm" onclick="editCeremony('${ceremony.id}')">✏️ Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCeremony('${ceremony.id}')">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// Cargar formularios de contenido
function loadContentForms() {
    // Navigation
    if (document.getElementById('nav-brand') && currentData.content.navigation) {
        document.getElementById('nav-brand').value = currentData.content.navigation.brand || '';
        if (currentData.content.navigation.links) {
            document.getElementById('nav-inicio').value = currentData.content.navigation.links.inicio || '';
            document.getElementById('nav-productos').value = currentData.content.navigation.links.productos || '';
            document.getElementById('nav-ceremonias').value = currentData.content.navigation.links.ceremonias || '';
            document.getElementById('nav-nosotros').value = currentData.content.navigation.links.nosotros || '';
            document.getElementById('nav-contacto').value = currentData.content.navigation.links.contacto || '';
        }
    }
    
    // Hero form
    if (document.getElementById('hero-title')) {
        document.getElementById('hero-title').value = currentData.content.hero.title;
        document.getElementById('hero-subtitle').value = currentData.content.hero.subtitle;
        document.getElementById('hero-button1').value = currentData.content.hero.button1;
        document.getElementById('hero-button2').value = currentData.content.hero.button2;
        
        // Imagen de fondo
        document.getElementById('use-gradient').checked = currentData.content.hero.use_gradient !== false;
        document.getElementById('hero-background-image').value = currentData.content.hero.background_image || '';
        
        // Mostrar u ocultar campo de imagen
        toggleBackgroundType();
        
        // Mostrar vista previa si hay imagen
        if (currentData.content.hero.background_image) {
            previewHeroBackground();
        }
    }
    
    // Products section
    if (document.getElementById('products-title')) {
        document.getElementById('products-title').value = currentData.content.products_section.title;
        document.getElementById('products-subtitle').value = currentData.content.products_section.subtitle;
    }
    
    // Ceremonies section
    if (document.getElementById('ceremonies-title')) {
        document.getElementById('ceremonies-title').value = currentData.content.ceremonies_section.title;
        document.getElementById('ceremonies-subtitle').value = currentData.content.ceremonies_section.subtitle;
    }
    
    // About form
    if (document.getElementById('about-title')) {
        document.getElementById('about-title').value = currentData.content.about.title;
        document.getElementById('about-text1').value = currentData.content.about.text1;
        document.getElementById('about-text2').value = currentData.content.about.text2;
        
        // Values
        document.getElementById('value1-icon').value = currentData.content.about.values.value1.icon;
        document.getElementById('value1-text').value = currentData.content.about.values.value1.text;
        document.getElementById('value2-icon').value = currentData.content.about.values.value2.icon;
        document.getElementById('value2-text').value = currentData.content.about.values.value2.text;
        document.getElementById('value3-icon').value = currentData.content.about.values.value3.icon;
        document.getElementById('value3-text').value = currentData.content.about.values.value3.text;
        
        // Placeholder
        document.getElementById('placeholder-icon').value = currentData.content.about.placeholder.icon;
        document.getElementById('placeholder-text').value = currentData.content.about.placeholder.text;
    }
    
    // Contact section
    if (document.getElementById('contact-section-title')) {
        document.getElementById('contact-section-title').value = currentData.content.contact_section.title;
        document.getElementById('contact-info-title').value = currentData.content.contact_section.info_title;
        document.getElementById('contact-form-title').value = currentData.content.contact_section.form_title;
        document.getElementById('contact-form-button').value = currentData.content.contact_section.form_button;
        
        // Form placeholders
        document.getElementById('placeholder-name').value = currentData.content.contact_section.form_placeholders.name;
        document.getElementById('placeholder-email').value = currentData.content.contact_section.form_placeholders.email;
        document.getElementById('placeholder-phone').value = currentData.content.contact_section.form_placeholders.phone;
        document.getElementById('placeholder-message').value = currentData.content.contact_section.form_placeholders.message;
    }
    
    // Footer
    if (document.getElementById('footer-brand-text')) {
        document.getElementById('footer-brand-text').value = currentData.content.footer.brand_text;
        document.getElementById('footer-links-title').value = currentData.content.footer.links_title;
        document.getElementById('footer-contact-title').value = currentData.content.footer.contact_title;
        document.getElementById('footer-copyright').value = currentData.content.footer.copyright;
    }
    
    // Cart
    if (document.getElementById('cart-title')) {
        document.getElementById('cart-title').value = currentData.content.cart.title;
        document.getElementById('cart-total-text').value = currentData.content.cart.total_text;
        document.getElementById('cart-empty-message').value = currentData.content.cart.empty_message;
        document.getElementById('cart-button-text').value = currentData.content.cart.cart_button;
        
        // Cart buttons
        document.getElementById('cart-clear-btn').value = currentData.content.cart.buttons.clear;
        document.getElementById('cart-continue-btn').value = currentData.content.cart.buttons.continue;
        document.getElementById('cart-checkout-btn').value = currentData.content.cart.buttons.checkout;
    }
    
    // Page title
    if (document.getElementById('page-title')) {
        document.getElementById('page-title').value = currentData.content.page_title;
    }
}

// Cargar formulario de contacto
function loadContactForm() {
    document.getElementById('phone').value = currentData.contact.phone;
    document.getElementById('email').value = currentData.contact.email;
    document.getElementById('address').value = currentData.contact.address;
    document.getElementById('instagram').value = currentData.contact.instagram;
    document.getElementById('whatsapp').value = currentData.contact.whatsapp;
}

// Cargar todo el contenido
function loadAllContent() {
    updateDashboard();
    loadProductsList();
    loadCeremoniesList();
    loadContentForms();
    loadContactForm();
}

// Abrir modal de producto
function openProductModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('product-modal-title');
    
    if (productId) {
        // Editar producto existente
        const product = currentData.products[productId];
        title.textContent = 'Editar Producto';
        
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-emoji').value = product.emoji;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-features').value = product.features.join(', ');
        document.getElementById('product-stock').value = product.stock;
    } else {
        // Nuevo producto
        title.textContent = 'Nuevo Producto';
        form.reset();
        document.getElementById('product-id').value = '';
    }
    
    modal.style.display = 'block';
    document.getElementById('product-name').focus();
}

// Abrir modal de ceremonia
function openCeremonyModal(ceremonyId = null) {
    const modal = document.getElementById('ceremony-modal');
    const form = document.getElementById('ceremony-form');
    const title = document.getElementById('ceremony-modal-title');
    
    if (ceremonyId) {
        // Editar ceremonia existente
        const ceremony = currentData.ceremonies[ceremonyId];
        title.textContent = 'Editar Ceremonia';
        
        document.getElementById('ceremony-id').value = ceremony.id;
        document.getElementById('ceremony-name').value = ceremony.name;
        document.getElementById('ceremony-date').value = ceremony.date;
        document.getElementById('ceremony-time').value = ceremony.time;
        document.getElementById('ceremony-location').value = ceremony.location;
        document.getElementById('ceremony-facilitator').value = ceremony.facilitator;
        document.getElementById('ceremony-description').value = ceremony.description;
        document.getElementById('ceremony-price').value = ceremony.price;
        document.getElementById('ceremony-spots').value = ceremony.spots;
    } else {
        // Nueva ceremonia
        title.textContent = 'Nueva Ceremonia';
        form.reset();
        document.getElementById('ceremony-id').value = '';
    }
    
    modal.style.display = 'block';
    document.getElementById('ceremony-name').focus();
}

// Manejar guardado de producto
function handleProductSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productId = formData.get('product-id') || generateId();
    const imageType = formData.get('image-type') || 'emoji';
    
    const product = {
        id: productId,
        name: formData.get('product-name'),
        imageType: imageType,
        emoji: imageType === 'emoji' ? formData.get('product-emoji') : '',
        imageUrl: imageType === 'url' ? formData.get('product-image-url') : '',
        price: parseInt(formData.get('product-price')),
        description: formData.get('product-description'),
        features: formData.get('product-features').split(',').map(f => f.trim()).filter(f => f),
        stock: formData.get('product-stock')
    };
    
    currentData.products[productId] = product;
    saveDataToStorage();
    
    document.getElementById('product-modal').style.display = 'none';
    loadProductsList();
    
    showMessage('Producto guardado correctamente', 'success');
}

// Manejar guardado de ceremonia
function handleCeremonySave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const ceremonyId = formData.get('ceremony-id') || generateId();
    
    const ceremony = {
        id: ceremonyId,
        name: formData.get('ceremony-name'),
        date: formData.get('ceremony-date'),
        time: formData.get('ceremony-time'),
        location: formData.get('ceremony-location'),
        facilitator: formData.get('ceremony-facilitator'),
        description: formData.get('ceremony-description'),
        price: parseInt(formData.get('ceremony-price')),
        spots: parseInt(formData.get('ceremony-spots')),
        imageUrl: formData.get('ceremony-image-url') || ''
    };
    
    currentData.ceremonies[ceremonyId] = ceremony;
    saveDataToStorage();
    
    document.getElementById('ceremony-modal').style.display = 'none';
    loadCeremoniesList();
    
    showMessage('Ceremonia guardada correctamente', 'success');
}

// Manejar guardado de hero
function handleHeroSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.hero = {
        title: formData.get('hero-title'),
        subtitle: formData.get('hero-subtitle')
    };
    
    saveDataToStorage();
    showMessage('Contenido del hero actualizado', 'success');
}

// Manejar guardado de about
function handleAboutSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.about = {
        title: formData.get('about-title'),
        text1: formData.get('about-text1'),
        text2: formData.get('about-text2')
    };
    
    saveDataToStorage();
    showMessage('Contenido de "Nosotros" actualizado', 'success');
}

// Manejar guardado de contacto
function handleContactSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.contact = {
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        instagram: formData.get('instagram'),
        whatsapp: formData.get('whatsapp')
    };
    
    saveDataToStorage();
    showMessage('Información de contacto actualizada', 'success');
}

// Funciones de edición y eliminación
function editProduct(productId) {
    openProductModal(productId);
}

function editCeremony(ceremonyId) {
    openCeremonyModal(ceremonyId);
}

function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        delete currentData.products[productId];
        saveDataToStorage();
        loadProductsList();
        showMessage('Producto eliminado correctamente', 'info');
    }
}

function deleteCeremony(ceremonyId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta ceremonia?')) {
        delete currentData.ceremonies[ceremonyId];
        saveDataToStorage();
        loadCeremoniesList();
        showMessage('Ceremonia eliminada correctamente', 'info');
    }
}

// Exportar datos
function exportData() {
    const dataToExport = {
        ...currentData,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `hijos-del-sol-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    showMessage('Backup exportado correctamente', 'success');
}

// Abrir modal de importación
function openImportModal() {
    document.getElementById('import-modal').style.display = 'block';
}

// Importar datos
function importData() {
    const fileInput = document.getElementById('import-file');
    const textInput = document.getElementById('import-text');
    
    let jsonData = textInput.value.trim();
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                processImportedData(importedData);
            } catch (error) {
                showMessage('Error al leer el archivo JSON', 'error');
            }
        };
        
        reader.readAsText(file);
    } else if (jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            processImportedData(importedData);
        } catch (error) {
            showMessage('Error en el formato JSON', 'error');
        }
    } else {
        showMessage('Selecciona un archivo o pega los datos JSON', 'warning');
    }
}

// Procesar datos importados
function processImportedData(importedData) {
    if (confirm('¿Estás seguro? Esto reemplazará todos los datos actuales.')) {
        // Validar estructura básica
        if (importedData.products || importedData.ceremonies || importedData.content) {
            currentData = { ...currentData, ...importedData };
            saveDataToStorage();
            loadAllContent();
            
            document.getElementById('import-modal').style.display = 'none';
            showMessage('Datos importados correctamente', 'success');
        } else {
            showMessage('Formato de datos inválido', 'error');
        }
    }
}

// Resetear datos
function resetData() {
    if (confirm('¿Estás seguro? Esto eliminará todos los datos y restaurará los valores por defecto.')) {
        localStorage.removeItem(CMS_CONFIG.storageKey);
        currentData = {
            products: {},
            ceremonies: {},
            content: {
                hero: {
                    title: '☀️ Hijos del Sol',
                    subtitle: 'Conecta con la medicina ancestral en un espacio sagrado de sanación, transformación y comunidad'
                },
                about: {
                    title: '🌞 Nuestra Misión',
                    text1: 'Somos Hijos del Sol, una comunidad dedicada a preservar y compartir las tradiciones ancestrales de medicina sagrada. Trabajamos con respeto profundo hacia las culturas originarias y sus enseñanzas.',
                    text2: 'Nuestro compromiso es crear espacios seguros de sanación donde cada persona pueda conectar con su esencia y recibir la medicina que necesita para su crecimiento espiritual.'
                }
            },
            contact: {
                phone: '+54 11 2345-6789',
                email: 'medicina@hijosdelsol.com',
                address: 'Buenos Aires, Argentina',
                instagram: '@hijosdelsol.ceremonias',
                whatsapp: '5491123456789'
            }
        };
        
        initDefaultData();
        loadAllContent();
        showMessage('Datos reseteados a valores por defecto', 'info');
    }
}

// Funciones de utilidad
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getStockClass(stock) {
    switch(stock) {
        case 'En Stock':
            return 'status-active';
        case 'Pocas Unidades':
            return 'status-limited';
        case 'Agotado':
            return 'status-inactive';
        default:
            return 'status-active';
    }
}

function showMessage(text, type = 'info') {
    const container = document.getElementById('message-container');
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Agregar click para cerrar
    message.addEventListener('click', function() {
        this.remove();
    });
    
    container.appendChild(message);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Función para obtener datos del CMS (para uso externo)
function getCMSData() {
    return currentData;
}

// Función para actualizar datos desde fuera del CMS
function updateCMSData(newData) {
    currentData = { ...currentData, ...newData };
    saveDataToStorage();
}

// Nuevas funciones de guardado para todos los formularios

// Manejar guardado de navegación
function handleNavigationSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.navigation = {
        brand: formData.get('nav-brand'),
        links: {
            inicio: formData.get('nav-inicio'),
            productos: formData.get('nav-productos'),
            ceremonias: formData.get('nav-ceremonias'),
            nosotros: formData.get('nav-nosotros'),
            contacto: formData.get('nav-contacto')
        }
    };
    
    saveDataToStorage();
    showMessage('Navegación actualizada', 'success');
}

// Manejar guardado completo de hero
function handleHeroSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.hero = {
        title: formData.get('hero-title'),
        subtitle: formData.get('hero-subtitle'),
        button1: formData.get('hero-button1'),
        button2: formData.get('hero-button2'),
        use_gradient: formData.get('use-gradient') === 'on',
        background_image: formData.get('hero-background-image') || ''
    };
    
    saveDataToStorage();
    showMessage('Hero actualizado con imagen de fondo', 'success');
}

// Función para alternar entre gradiente e imagen
function toggleBackgroundType() {
    const useGradient = document.getElementById('use-gradient').checked;
    const imageField = document.getElementById('background-image-field');
    
    if (useGradient) {
        imageField.style.display = 'none';
        // Ocultar vista previa
        document.getElementById('hero-background-preview').style.display = 'none';
    } else {
        imageField.style.display = 'block';
    }
}

// Función para vista previa de imagen de fondo del hero
function previewHeroBackground() {
    const imageUrl = document.getElementById('hero-background-image').value;
    const imagePreview = document.getElementById('hero-background-preview');
    const previewImg = document.getElementById('hero-background-preview-img');
    
    if (imageUrl && isValidImageUrl(imageUrl)) {
        previewImg.src = imageUrl;
        previewImg.onload = function() {
            imagePreview.style.display = 'block';
            showMessage('Imagen de fondo cargada correctamente', 'success');
        };
        previewImg.onerror = function() {
            imagePreview.style.display = 'none';
            showMessage('Error cargando la imagen de fondo. Verifica la URL.', 'error');
        };
    } else {
        imagePreview.style.display = 'none';
    }
}

// Manejar guardado de sección productos
function handleProductsSectionSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.products_section = {
        title: formData.get('products-title'),
        subtitle: formData.get('products-subtitle')
    };
    
    saveDataToStorage();
    showMessage('Sección de productos actualizada', 'success');
}

// Manejar guardado de sección ceremonias
function handleCeremoniesSectionSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.ceremonies_section = {
        title: formData.get('ceremonies-title'),
        subtitle: formData.get('ceremonies-subtitle')
    };
    
    saveDataToStorage();
    showMessage('Sección de ceremonias actualizada', 'success');
}

// Manejar guardado completo de about
function handleAboutSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.about = {
        title: formData.get('about-title'),
        text1: formData.get('about-text1'),
        text2: formData.get('about-text2'),
        values: {
            value1: {
                icon: formData.get('value1-icon'),
                text: formData.get('value1-text')
            },
            value2: {
                icon: formData.get('value2-icon'),
                text: formData.get('value2-text')
            },
            value3: {
                icon: formData.get('value3-icon'),
                text: formData.get('value3-text')
            }
        },
        placeholder: {
            icon: formData.get('placeholder-icon'),
            text: formData.get('placeholder-text')
        }
    };
    
    saveDataToStorage();
    showMessage('Sección "Nosotros" actualizada completamente', 'success');
}

// Manejar guardado de sección contacto
function handleContactSectionSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.contact_section = {
        title: formData.get('contact-section-title'),
        info_title: formData.get('contact-info-title'),
        form_title: formData.get('contact-form-title'),
        form_placeholders: {
            name: formData.get('placeholder-name'),
            email: formData.get('placeholder-email'),
            phone: formData.get('placeholder-phone'),
            message: formData.get('placeholder-message')
        },
        form_button: formData.get('contact-form-button')
    };
    
    saveDataToStorage();
    showMessage('Textos de contacto actualizados', 'success');
}

// Manejar guardado de footer
function handleFooterSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.footer = {
        brand_text: formData.get('footer-brand-text'),
        links_title: formData.get('footer-links-title'),
        contact_title: formData.get('footer-contact-title'),
        copyright: formData.get('footer-copyright')
    };
    
    saveDataToStorage();
    showMessage('Footer actualizado', 'success');
}

// Manejar guardado del carrito
function handleCartSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.cart = {
        title: formData.get('cart-title'),
        total_text: formData.get('cart-total-text'),
        buttons: {
            clear: formData.get('cart-clear-btn'),
            continue: formData.get('cart-continue-btn'),
            checkout: formData.get('cart-checkout-btn')
        },
        empty_message: formData.get('cart-empty-message'),
        cart_button: formData.get('cart-button-text')
    };
    
    saveDataToStorage();
    showMessage('Textos del carrito actualizados', 'success');
}

// Manejar guardado del título de página
function handlePageTitleSave(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    currentData.content.page_title = formData.get('page-title');
    
    saveDataToStorage();
    showMessage('Título de página actualizado', 'success');
}

// Función para sincronizar sitio web
function syncSite() {
    // Mostrar mensaje de carga
    showMessage('🔄 Sincronizando sitio web...', 'info');
    
    // Primero, crear el archivo cms-data.json
    const dataToSync = {
        ...currentData,
        syncDate: new Date().toISOString(),
        version: '2.0'
    };
    
    // Crear y descargar archivo JSON
    const blob = new Blob([JSON.stringify(dataToSync, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cms-data.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
        showMessage(`
            ✅ Archivo cms-data.json descargado.
            
            🚀 PASOS PARA COMPLETAR LA SINCRONIZACIÓN:
            
            1. Abre la terminal en la carpeta del proyecto
            2. Ejecuta: node sync-cms.js sync
            3. Ejecuta: ./deploy.sh
            
            ⚠️  El archivo cms-data.json debe estar en la carpeta raíz del proyecto.
        `, 'success');
    }, 1000);
    
    // También mostrar las instrucciones en consola
    console.log('%c🌞 HIJOS DEL SOL - SINCRONIZACIÓN', 'color: #f39c12; font-weight: bold; font-size: 16px;');
    console.log('📁 Datos del CMS:', dataToSync);
    console.log('%c📋 INSTRUCCIONES:', 'color: #3498db; font-weight: bold;');
    console.log('1. Coloca el archivo cms-data.json descargado en la carpeta del proyecto');
    console.log('2. En terminal: node sync-cms.js sync');
    console.log('3. En terminal: ./deploy.sh');
}

// Función para crear script de sincronización automático (experimental)
function createSyncScript() {
    const syncScript = `#!/bin/bash

# Script de sincronización automática
echo "🔄 Sincronizando datos del CMS..."

# Verificar si existe cms-data.json
if [ ! -f "cms-data.json" ]; then
    echo "❌ Error: cms-data.json no encontrado"
    echo "💡 Ve al panel de administración y presiona 'Sincronizar Sitio'"
    exit 1
fi

# Ejecutar sincronización
node sync-cms.js sync

if [ $? -eq 0 ]; then
    echo "✅ Sincronización completada"
    echo "🚀 Ejecutando deployment..."
    ./deploy.sh
else
    echo "❌ Error en la sincronización"
    exit 1
fi
`;
    
    const blob = new Blob([syncScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sync-and-deploy.sh';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    showMessage('Script de sincronización automática descargado', 'info');
}

// Exportar funciones globales para uso en la página principal
window.getCMSData = getCMSData;
window.updateCMSData = updateCMSData;
window.syncSite = syncSite;
window.createSyncScript = createSyncScript;

console.log('🔐 CMS Admin Script cargado correctamente');
