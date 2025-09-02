#!/usr/bin/env node

/**
 * Script para sincronizar datos del CMS con los archivos estáticos
 * Este script lee los datos del localStorage del admin y los aplica directamente a los archivos HTML/JS
 */

const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
    cmsDataFile: 'cms-data.json',
    indexFile: 'index.html',
    scriptFile: 'script.js'
};

/**
 * Función principal para sincronizar datos
 */
function syncCMSData() {
    console.log('🔄 Iniciando sincronización del CMS...');
    
    try {
        // 1. Leer datos del archivo JSON del CMS (si existe)
        let cmsData = null;
        if (fs.existsSync(CONFIG.cmsDataFile)) {
            const rawData = fs.readFileSync(CONFIG.cmsDataFile, 'utf8');
            cmsData = JSON.parse(rawData);
            console.log('📁 Datos del CMS cargados desde:', CONFIG.cmsDataFile);
        } else {
            console.log('⚠️  No se encontró archivo de datos del CMS. Creando uno por defecto...');
            cmsData = createDefaultCMSData();
            saveCMSData(cmsData);
        }
        
        // 2. Actualizar los archivos con los datos del CMS
        updateIndexHTML(cmsData);
        updateScriptJS(cmsData);
        
        console.log('✅ Sincronización completada exitosamente');
        
    } catch (error) {
        console.error('❌ Error durante la sincronización:', error.message);
        process.exit(1);
    }
}

/**
 * Crear datos por defecto del CMS
 */
function createDefaultCMSData() {
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
}

/**
 * Guardar datos del CMS
 */
function saveCMSData(data) {
    fs.writeFileSync(CONFIG.cmsDataFile, JSON.stringify(data, null, 2));
    console.log('💾 Datos guardados en:', CONFIG.cmsDataFile);
}

/**
 * Actualizar index.html con datos del CMS
 */
function updateIndexHTML(cmsData) {
    let html = fs.readFileSync(CONFIG.indexFile, 'utf8');
    
    // Actualizar título de la página
    if (cmsData.content.page_title) {
        html = html.replace(/<title>.*<\/title>/, `<title>${cmsData.content.page_title}</title>`);
    }
    
    // Actualizar navegación
    if (cmsData.content.navigation) {
        const nav = cmsData.content.navigation;
        html = html.replace(/(<div class="nav-brand">\s*<h2>).*(<\/h2>)/, `$1${nav.brand}$2`);
    }
    
    // Actualizar hero section
    if (cmsData.content.hero) {
        const hero = cmsData.content.hero;
        html = html.replace(/(<h1 class="hero-title">).*(<\/h1>)/, `$1${hero.title}$2`);
        html = html.replace(/(<p class="hero-subtitle">).*(<\/p>)/, `$1${hero.subtitle}$2`);
    }
    
    // Actualizar secciones
    if (cmsData.content.products_section) {
        const products = cmsData.content.products_section;
        html = html.replace(/(<h2 class="section-title">🌿).*(<\/h2>)/, `$1 ${products.title.replace('🌿 ', '')}$2`);
        html = html.replace(/(<p class="section-subtitle">).*(<\/p>)/, `$1${products.subtitle}$2`);
    }
    
    fs.writeFileSync(CONFIG.indexFile, html);
    console.log('📝 index.html actualizado');
}

/**
 * Actualizar script.js con datos del CMS
 */
function updateScriptJS(cmsData) {
    let script = fs.readFileSync(CONFIG.scriptFile, 'utf8');
    
    // Inyectar datos del CMS al inicio del script
    const cmsDataJS = `
// 🔄 DATOS SINCRONIZADOS DEL CMS - Generado automáticamente
const CMS_DATA_STATIC = ${JSON.stringify(cmsData, null, 2)};

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

`;
    
    // Agregar al inicio del script si no existe
    if (!script.includes('CMS_DATA_STATIC')) {
        script = cmsDataJS + script;
        fs.writeFileSync(CONFIG.scriptFile, script);
        console.log('📝 script.js actualizado con datos del CMS');
    } else {
        console.log('ℹ️  script.js ya contiene datos del CMS');
    }
}

/**
 * Exportar datos del localStorage (para usar desde el browser)
 */
function exportFromLocalStorage() {
    const exportScript = `
// Script para exportar datos del localStorage del admin
// Ejecuta esto en la consola del navegador en la página de admin

const data = localStorage.getItem('hijosdelsol_cms_data');
if (data) {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cms-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('✅ Datos exportados como cms-data.json');
} else {
    console.log('❌ No hay datos del CMS en localStorage');
}
`;
    
    fs.writeFileSync('export-localStorage.js', exportScript);
    console.log('📤 Script de exportación creado: export-localStorage.js');
}

// Ejecutar función principal si se llama directamente
if (require.main === module) {
    const command = process.argv[2];
    
    switch (command) {
        case 'export':
            exportFromLocalStorage();
            break;
        case 'sync':
        default:
            syncCMSData();
            break;
    }
}

module.exports = { syncCMSData, createDefaultCMSData, saveCMSData };
