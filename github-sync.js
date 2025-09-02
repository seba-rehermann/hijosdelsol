/**
 * 🌞 HIJOS DEL SOL - GitHub Sync System
 * Sistema de sincronización usando GitHub como backend
 * Los datos se almacenan en un archivo JSON en un repositorio de GitHub
 */

class GitHubSyncManager {
    constructor() {
        this.storageKey = 'hijosdelsol_cms_data';
        this.defaultData = this.getDefaultData();
        this.currentData = {};
        this.lastSync = null;
        this.isOnline = navigator.onLine;
        
        // Configuración de GitHub
        this.githubConfig = {
            owner: 'seba-rehermann',  // Tu usuario de GitHub
            repo: 'hijosdelsol',  // Nombre del repositorio
            branch: 'main',
            filePath: 'cms-data.json',
            token: this.getGitHubToken()
        };
        
        this.baseUrl = 'https://api.github.com';
        
        this.init();
    }
    
    async init() {
        console.log('🔄 Inicializando GitHub Sync Manager...');
        
        // Detectar cambios de conectividad
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('🌐 Conectado a internet');
            this.syncFromGitHub();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📱 Modo offline');
        });
        
        // Cargar datos con prioridad de GitHub
        await this.loadData();
        
        // Auto-sync cada 2 minutos (GitHub tiene rate limits)
        setInterval(() => {
            if (this.isOnline && this.githubConfig.token) {
                this.syncFromGitHub();
            }
        }, 120000);
        
        console.log('✅ GitHub Sync Manager inicializado');
    }
    
    async loadData() {
        console.log('📁 Cargando datos...');
        let dataLoaded = false;
        
        // 1. Intentar cargar desde GitHub primero
        if (this.isOnline && this.githubConfig.token) {
            const githubData = await this.loadFromGitHub();
            if (githubData) {
                this.currentData = githubData;
                dataLoaded = true;
                console.log('☁️ Datos cargados desde GitHub');
            }
        }
        
        // 2. Fallback a localStorage
        if (!dataLoaded && this.loadFromLocal()) {
            dataLoaded = true;
            console.log('📱 Datos cargados desde dispositivo local');
        }
        
        // 3. Usar datos por defecto
        if (!dataLoaded) {
            this.currentData = { ...this.defaultData };
            console.log('🆕 Usando datos por defecto');
        }
        
        // Guardar localmente como backup
        this.saveToLocal();
        
        // Disparar evento de datos cargados
        this.triggerDataUpdate();
    }
    
    async loadFromGitHub() {
        if (!this.githubConfig.token) {
            console.warn('⚠️ No se puede cargar desde GitHub: falta el token de acceso');
            return null;
        }
        
        try {
            const url = `${this.baseUrl}/repos/${this.githubConfig.owner}/${this.githubConfig.repo}/contents/${this.githubConfig.filePath}`;
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.githubConfig.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                // Decodificar el contenido base64
                const content = atob(result.content.replace(/\s/g, ''));
                const data = JSON.parse(content);
                
                // Guardar el SHA para futuras actualizaciones
                this.currentSha = result.sha;
                localStorage.setItem('github_file_sha', result.sha);
                
                return data;
            } else if (response.status === 404) {
                console.log('📄 Archivo no existe en GitHub, se creará en la primera sincronización');
                return null;
            } else {
                console.warn(`⚠️ Error HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (e) {
            console.warn('⚠️ Error cargando desde GitHub:', e);
        }
        
        return null;
    }
    
    loadFromLocal() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            try {
                this.currentData = JSON.parse(savedData);
                return true;
            } catch (e) {
                console.warn('⚠️ Error cargando datos locales:', e);
            }
        }
        return false;
    }
    
    async saveToGitHub(data = this.currentData) {
        if (!this.isOnline) {
            console.log('📱 Sin conexión - guardando solo localmente');
            this.saveToLocal(data);
            return false;
        }
        
        if (!this.githubConfig.token) {
            console.warn('⚠️ No se puede guardar en GitHub: falta el token de acceso');
            this.saveToLocal(data);
            return false;
        }
        
        console.log('☁️ Guardando en GitHub...');
        
        try {
            const dataToSave = {
                ...data,
                lastUpdated: new Date().toISOString(),
                device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
                syncedBy: 'github-sync-v1'
            };
            
            // Codificar el contenido en base64
            const content = btoa(JSON.stringify(dataToSave, null, 2));
            
            const url = `${this.baseUrl}/repos/${this.githubConfig.owner}/${this.githubConfig.repo}/contents/${this.githubConfig.filePath}`;
            
            // Obtener el SHA actual si no lo tenemos
            if (!this.currentSha) {
                this.currentSha = localStorage.getItem('github_file_sha');
            }
            
            const requestBody = {
                message: `🌞 Actualizar datos CMS - ${new Date().toLocaleString('es-AR')}`,
                content: content,
                branch: this.githubConfig.branch
            };
            
            // Si el archivo existe, incluir el SHA para la actualización
            if (this.currentSha) {
                requestBody.sha = this.currentSha;
            }
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.githubConfig.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (response.ok) {
                const result = await response.json();
                this.currentSha = result.content.sha;
                localStorage.setItem('github_file_sha', result.content.sha);
                
                this.lastSync = new Date().toISOString();
                console.log('✅ Guardado en GitHub exitosamente');
                
                if (typeof showMessage === 'function') {
                    showMessage('✅ Datos sincronizados con GitHub', 'success');
                }
                
                return true;
            } else {
                const errorData = await response.json();
                console.warn(`⚠️ Error HTTP ${response.status}:`, errorData.message);
            }
        } catch (e) {
            console.warn('⚠️ Error guardando en GitHub:', e);
        }
        
        // Siempre guardar localmente como backup
        this.saveToLocal(data);
        return false;
    }
    
    saveToLocal(data = this.currentData) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            localStorage.setItem(this.storageKey + '_timestamp', new Date().toISOString());
        } catch (e) {
            console.error('❌ Error guardando localmente:', e);
        }
    }
    
    // API pública
    getData() {
        return { ...this.currentData };
    }
    
    async updateData(newData) {
        this.currentData = { ...this.currentData, ...newData };
        
        // Guardar localmente inmediatamente
        this.saveToLocal();
        
        // Intentar guardar en GitHub
        const githubSaved = await this.saveToGitHub();
        
        // Disparar actualización
        this.triggerDataUpdate();
        
        console.log('📝 Datos actualizados y sincronizados');
        
        return githubSaved;
    }
    
    async syncFromGitHub() {
        const githubData = await this.loadFromGitHub();
        if (githubData) {
            // Verificar si los datos de GitHub son más recientes
            const localTimestamp = localStorage.getItem(this.storageKey + '_timestamp');
            const githubTimestamp = githubData.lastUpdated;
            
            if (!localTimestamp || (githubTimestamp && new Date(githubTimestamp) > new Date(localTimestamp))) {
                console.log('🔄 Sincronizando datos más recientes desde GitHub');
                this.currentData = githubData;
                this.saveToLocal();
                this.triggerDataUpdate();
                
                // Mostrar notificación si estamos en el admin
                if (typeof showMessage === 'function') {
                    showMessage('🔄 Datos sincronizados desde GitHub', 'info');
                }
                
                return true;
            }
        }
        return false;
    }
    
    triggerDataUpdate() {
        // Disparar evento personalizado
        const event = new CustomEvent('cmsDataUpdate', {
            detail: { 
                data: this.currentData,
                source: 'github-sync',
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
        
        // Actualizar página si la función existe
        if (typeof updatePageFromCMS === 'function') {
            window.cmsData = this.currentData;
            updatePageFromCMS();
        }
        
        // Actualizar productos y ceremonias si las funciones existen
        if (typeof renderProductsFromCMS === 'function') {
            renderProductsFromCMS();
        }
        
        if (typeof renderCeremoniesFromCMS === 'function') {
            renderCeremoniesFromCMS();
        }
    }
    
    // Configuración de GitHub
    getGitHubToken() {
        return localStorage.getItem('github_token');
    }
    
    setGitHubToken(token) {
        localStorage.setItem('github_token', token);
        this.githubConfig.token = token;
    }
    
    setGitHubConfig(config) {
        this.githubConfig = { ...this.githubConfig, ...config };
        
        // Guardar configuración
        localStorage.setItem('github_config', JSON.stringify(this.githubConfig));
    }
    
    // Función para configurar GitHub desde el admin
    async setupGitHub(owner, repo, token, branch = 'main') {
        this.setGitHubConfig({
            owner,
            repo,
            branch,
            token
        });
        
        console.log('⚙️ Configuración de GitHub actualizada');
        
        // Probar la conexión
        const testResult = await this.testGitHubConnection();
        if (testResult) {
            if (typeof showMessage === 'function') {
                showMessage('✅ Conexión con GitHub configurada exitosamente', 'success');
            }
            
            // Intentar primera sincronización
            await this.forceSyncToGitHub();
        }
        
        return testResult;
    }
    
    async testGitHubConnection() {
        try {
            const url = `${this.baseUrl}/repos/${this.githubConfig.owner}/${this.githubConfig.repo}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.githubConfig.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            
            return response.ok;
        } catch (e) {
            console.warn('⚠️ Error probando conexión con GitHub:', e);
            return false;
        }
    }
    
    // Función para forzar sincronización
    async forceSyncToGitHub() {
        const result = await this.saveToGitHub();
        if (result) {
            if (typeof showMessage === 'function') {
                showMessage('✅ Datos sincronizados exitosamente con GitHub', 'success');
            }
        } else {
            if (typeof showMessage === 'function') {
                showMessage('⚠️ Error sincronizando con GitHub. Los datos se guardaron localmente.', 'warning');
            }
        }
        return result;
    }
    
    getDefaultData() {
        return {
            products: {
                "nukini": {
                    id: "nukini",
                    name: "Rapé Nukini",
                    price: 2500,
                    emoji: "🌿",
                    imageType: "emoji",
                    imageUrl: "",
                    description: "Rapé tradicional de la tribu Nukini, conocido por su efecto clarificador y equilibrante.",
                    features: ["Claridad Mental", "Conexión Espiritual"],
                    stock: "En Stock"
                },
                "huni-kuin": {
                    id: "huni-kuin",
                    name: "Rapé Huni Kuin",
                    price: 2800,
                    emoji: "🍃",
                    imageType: "emoji",
                    imageUrl: "",
                    description: "Medicina sagrada de la tribu Huni Kuin del Acre, Brasil. Elaborado con plantas medicinales.",
                    features: ["Introspección", "Sanación"],
                    stock: "En Stock"
                }
            },
            ceremonies: {
                "luna-nueva": {
                    id: "luna-nueva",
                    name: "Ceremonia de Luna Nueva",
                    date: "2025-03-15",
                    time: "16:00 - 20:00 hs",
                    location: "Centro Ceremonial Pachamama, Buenos Aires",
                    facilitator: "Shamán Carlos Nukini",
                    description: "Ceremonia especial de luna nueva para liberar lo que ya no sirve y manifestar nuevas intenciones.",
                    imageUrl: "",
                    price: 8500,
                    spots: 12
                }
            },
            content: {
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
                hero: {
                    title: '☀️ Hijos del Sol',
                    subtitle: 'Conecta con la medicina ancestral en un espacio sagrado de sanación, transformación y comunidad',
                    button1: 'Explorar Productos',
                    button2: 'Ver Ceremonias',
                    background_image: '',
                    use_gradient: true
                },
                products_section: {
                    title: '🌿 Nuestros Productos Sagrados',
                    subtitle: 'Medicina ancestral de las tradiciones amazónicas'
                },
                ceremonies_section: {
                    title: '🕉️ Ceremonias Sagradas',
                    subtitle: 'Espacios de sanación y transformación'
                },
                about: {
                    title: '🌞 Nuestra Misión',
                    text1: 'Somos Hijos del Sol, una comunidad dedicada a preservar y compartir las tradiciones ancestrales de medicina sagrada.',
                    text2: 'Nuestro compromiso es crear espacios seguros de sanación donde cada persona pueda conectar con su esencia.',
                    values: {
                        value1: { icon: '🙏', text: 'Respeto Ancestral' },
                        value2: { icon: '💚', text: 'Sanación Auténtica' },
                        value3: { icon: '🌱', text: 'Crecimiento Espiritual' }
                    },
                    placeholder: { icon: '🌞', text: 'Espacio de medicina sagrada' }
                },
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
                footer: {
                    brand_text: 'Medicina ancestral con respeto y tradición',
                    links_title: 'Enlaces',
                    contact_title: 'Contacto',
                    copyright: '© 2025 Hijos del Sol. Todos los derechos reservados.'
                },
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
                page_title: '☀️ Hijos del Sol - Ceremonias Sagradas'
            },
            contact: {
                phone: '+54 11 2345-6789',
                email: 'medicina@hijosdelsol.com',
                address: 'Buenos Aires, Argentina',
                instagram: '@hijosdelsol.ceremonias',
                whatsapp: '5491123456789'
            },
            lastUpdated: new Date().toISOString(),
            version: '4.0-github-sync'
        };
    }
}

// Instancia global
window.githubSyncManager = new GitHubSyncManager();

// API de compatibilidad
window.getCMSData = () => window.githubSyncManager.getData();
window.updateCMSData = (data) => window.githubSyncManager.updateData(data);
window.forceSyncToGitHub = () => window.githubSyncManager.forceSyncToGitHub();
window.setupGitHub = (owner, repo, token, branch) => window.githubSyncManager.setupGitHub(owner, repo, token, branch);

console.log('🐙 GitHub Sync Manager cargado correctamente');
