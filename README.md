# ☀️ Hijos del Sol - Sitio Web + CMS

## 📋 Descripción del Proyecto

Sitio web profesional para "Hijos del Sol" - comunidad dedicada a ceremonias sagradas y venta de productos de medicina ancestral (rapé). Incluye un **CMS completo y fácil de usar** para gestionar todo el contenido del sitio sin conocimientos técnicos.

## 🗂️ Estructura del Proyecto

```
hijos-del-sol/
├── index.html              # Página principal del sitio
├── styles.css              # Estilos CSS responsive (móvil optimizado)
├── script.js               # JavaScript del sitio + integración CMS
├── admin.html              # Panel de administración CMS
├── admin-styles.css        # Estilos del panel admin
├── admin-script.js         # Lógica del CMS (seguridad mejorada)
├── limpiar-carrito.html    # Herramienta de limpieza de datos
└── README.md               # Esta documentación
```

## 🌟 Características Principales

### 🎨 **Sitio Web Principal**
- ✅ **Diseño responsive** - Optimizado para móvil, tablet y desktop
- ✅ **Hero personalizable** - Banner con gradiente o imagen de fondo personalizada
- ✅ **Sección de productos** - Gestión completa de tipos de rapé
- ✅ **Sección de ceremonias** - Eventos programados con imágenes
- ✅ **Carrito de compras** - Funcional con localStorage
- ✅ **Formulario de contacto** - Integrado con WhatsApp
- ✅ **Navegación suave** - Smooth scrolling y menú móvil animado
- ✅ **Animaciones** - Efectos visuales y transiciones profesionales
- ✅ **Botón admin discreto** - Acceso rápido al CMS (esquina superior derecha)

### 🔐 **Sistema CMS Avanzado**
- ✅ **Login seguro** - Contraseña única: `rapedelsol`
- ✅ **Dashboard intuitivo** - Estadísticas y resumen del sitio
- ✅ **Gestión de productos** - Crear, editar, eliminar productos con imágenes
- ✅ **Gestión de ceremonias** - Programar eventos con toda la información
- ✅ **Editor de contenido completo** - Modificar todos los textos del sitio
- ✅ **Gestión de contacto** - Actualizar información de contacto
- ✅ **Sistema de imágenes avanzado** - Emojis, URLs o imágenes de fondo
- ✅ **Vista previa en tiempo real** - Ver cambios antes de guardar
- ✅ **Export/Import** - Backup completo de datos en JSON
- ✅ **100% Frontend** - Sin base de datos, compatible con cualquier hosting

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+** - Funcionalidades dinámicas
- **LocalStorage** - Persistencia de datos sin base de datos
- **Google Fonts** - Tipografía Inter
- **Responsive Design** - Mobile-first

## 🚀 **GUÍA COMPLETA DE ADMINISTRACIÓN**

## 🔐 **Acceso al Panel de Administración**

### **🎯 Cómo acceder:**
1. **Desde la web:** Haz clic en el botón ⚙️ (esquina superior derecha)
2. **URL directa:** `https://tu-sitio.netlify.app/admin.html`
3. **Contraseña:** `rapedelsol`

### **🔑 Seguridad:**
- ✅ Sin logs de contraseña en consola
- ✅ Validación única y segura
- ✅ Sesión automática mientras navegas

---

## 📊 **Dashboard del CMS**

Al ingresar verás:
- **Productos totales** - Cantidad de productos creados
- **Ceremonias totales** - Eventos programados
- **Tamaño de datos** - Espacio usado en localStorage
- **Acciones rápidas** - Exportar backup, resetear datos

---

## 🌿 **Gestión de Productos**

### **➕ Crear nuevo producto:**
1. Ve a **"Productos"** en la navegación
2. Clic en **"+ Nuevo Producto"**
3. Completa todos los campos:
   - **Nombre** - Ej: "Rapé Nukini"
   - **Emoji** - Ej: "🌿" o deja vacío para usar imagen
   - **Imagen URL** - Pega link de imagen (opcional)
   - **Precio** - Solo números, ej: 2500
   - **Descripción** - Texto detallado del producto
   - **Características** - Separadas por comas: "Claridad Mental, Conexión"
   - **Stock** - "En Stock", "Pocas Unidades" o "Agotado"
4. **Vista previa** - Si usas imagen, se mostrará antes de guardar
5. Clic en **"Guardar"**

### **✏️ Editar producto:**
1. En la lista de productos, clic **"✏️ Editar"**
2. Modifica los campos necesarios
3. **Guardar cambios**

### **🗑️ Eliminar producto:**
1. Clic en **"🗑️ Eliminar"**
2. Confirmar eliminación

### **🖼️ Tipos de imagen para productos:**
- **Emoji:** Usar emojis como 🌿, 🍃, 🌱, 🌺
- **URL de imagen:** Pegar link directo a imagen
- **Vista previa:** Se carga automáticamente al pegar la URL

---

## 🕉️ **Gestión de Ceremonias**

### **➕ Crear nueva ceremonia:**
1. Ve a **"Ceremonias"** en la navegación
2. Clic en **"+ Nueva Ceremonia"**
3. Completa la información:
   - **Nombre** - Ej: "Ceremonia de Luna Nueva"
   - **Fecha** - Selecciona del calendario
   - **Horario** - Ej: "18:00 - 22:00 hs"
   - **Ubicación** - Dirección completa del evento
   - **Facilitador** - Nombre del chamán o facilitador
   - **Descripción** - Detalle completo de la ceremonia
   - **Precio** - Costo de participación
   - **Cupos** - Número de personas máximo
   - **Imagen** - URL de imagen de la ceremonia (opcional)
4. **Vista previa** de imagen si la agregaste
5. **Guardar ceremonia**

### **✏️ Editar ceremonia:**
- Igual que productos, clic en **"✏️ Editar"** y modificar

### **🗑️ Eliminar ceremonia:**
- Clic en **"🗑️ Eliminar"** y confirmar

---

## 📝 **Editor de Contenido del Sitio**

### **🎨 Sección Hero (Banner principal):**
1. Ve a **"Contenido"** → **"Hero"**
2. Puedes editar:
   - **Título principal** - Ej: "☀️ Hijos del Sol"
   - **Subtítulo** - Descripción de la comunidad
   - **Botón 1** - Texto del primer botón
   - **Botón 2** - Texto del segundo botón
   - **🖼️ IMAGEN DE FONDO:**
     - **Usar gradiente** - Checkbox para usar el gradiente por defecto
     - **URL de imagen** - Pega link de imagen para fondo personalizado
     - **Vista previa** - Ve la imagen antes de aplicar
3. **Guardar cambios**

### **🏠 Navegación del sitio:**
1. En **"Contenido"** → **"Navegación"**
2. Editar:
   - **Marca** - Nombre en la esquina superior izquierda
   - **Enlaces** - Texto de cada sección del menú
3. **Guardar navegación**

### **🌿 Sección Productos:**
1. **"Contenido"** → **"Productos"**
2. Cambiar:
   - **Título** - Encabezado de la sección
   - **Subtítulo** - Descripción de los productos

### **🕉️ Sección Ceremonias:**
1. **"Contenido"** → **"Ceremonias"**
2. Modificar:
   - **Título** - Encabezado de ceremonias
   - **Subtítulo** - Descripción de los eventos

### **🌞 Sección Nosotros:**
1. **"Contenido"** → **"Nosotros"**
2. Puedes cambiar:
   - **Título** - Ej: "Nuestra Misión"
   - **Párrafo 1** - Primera descripción
   - **Párrafo 2** - Segunda descripción
   - **Valores** (3):
     - Icono (emoji) + Texto descriptivo
     - Ej: 🙏 "Respeto Ancestral"
   - **Placeholder de imagen:**
     - Icono y texto del círculo de imagen

### **📞 Sección Contacto:**
1. **"Contenido"** → **"Contacto"**
2. Editar:
   - **Título** - Encabezado de contacto
   - **Título info** - "Información de Contacto"
   - **Título formulario** - "Envíanos un Mensaje"
   - **Placeholders** - Textos de ejemplo en los campos
   - **Botón** - Texto del botón de envío

### **🛒 Modal del Carrito:**
1. **"Contenido"** → **"Carrito"**
2. Personalizar:
   - **Título del carrito**
   - **Texto total**
   - **Botones** - Vaciar, Continuar, Finalizar
   - **Mensaje vacío**
   - **Icono del carrito**

### **🦶 Footer:**
1. **"Contenido"** → **"Footer"**
2. Cambiar:
   - **Texto de marca**
   - **Títulos de secciones**
   - **Copyright**

---

## 📞 **Gestión de Información de Contacto**

### **📱 Actualizar datos de contacto:**
1. Ve a **"Contacto"** en la navegación del CMS
2. Modifica:
   - **Teléfono** - Con código de país
   - **Email** - Dirección de correo
   - **Dirección** - Ubicación física
   - **Instagram** - Handle de Instagram
   - **WhatsApp** - Número para WhatsApp (solo números)
3. **Guardar información**

**🔗 Integración WhatsApp:**
- Los botones "Reservar" y "Contactar" abren WhatsApp automáticamente
- El mensaje se pre-completa con la información del producto/ceremonia

---

## 💾 **Backup y Gestión de Datos**

### **📥 Exportar datos (Backup):**
1. **Dashboard** → **"📥 Exportar Datos"**
2. Se descarga archivo JSON con todo el contenido
3. **Guarda este archivo** - Es tu backup completo

### **📤 Importar datos (Restaurar):**
1. **Dashboard** → **"📤 Importar Datos"**
2. **Opción A:** Arrastra archivo JSON de backup
3. **Opción B:** Pega el contenido JSON en el campo de texto
4. **Confirmar importación** - ⚠️ Reemplaza todos los datos actuales

### **🗑️ Resetear sitio:**
1. **Dashboard** → **"🔄 Resetear Datos"**
2. Confirmar acción
3. **⚠️ Esto borra todo y vuelve a los datos por defecto**

---

## 🛠️ **Herramientas de Mantenimiento**

### **🧹 Limpiar carrito de pruebas:**
1. Ve a: `https://tu-sitio.netlify.app/limpiar-carrito.html`
2. Opciones disponibles:
   - **Limpiar solo carrito** - Borra productos del carrito
   - **Limpiar localStorage** - Borra datos del CMS
   - **Limpiar sessionStorage** - Cierra sesión admin
   - **Limpiar todo** - Reset completo

---

## 🎨 Paleta de Colores

```css
--primary-color: #228B22    /* Verde bosque */
--secondary-color: #DAA520  /* Dorado */
--accent-color: #8B4513     /* Tierra */
--bg-color: #F5F5DC         /* Beige */
--text-dark: #2F4F2F        /* Verde oscuro */
--text-light: #FFFFFF       /* Blanco */
```

## 📞 Información de Contacto por Defecto

- **Teléfono:** +54 11 2345-6789
- **Email:** medicina@hijosdelsol.com
- **Ubicación:** Buenos Aires, Argentina
- **Instagram:** @hijosdelsol.ceremonias
- **WhatsApp:** 5491123456789

## 🌐 Deployment en Netlify

### **Pasos para subir:**
1. Crear repositorio en GitHub
2. Subir todos los archivos al repositorio
3. Conectar repositorio con Netlify
4. ¡Listo! El sitio estará online

### **URLs de producción:**
- **Sitio:** `https://tu-sitio.netlify.app/`
- **Admin:** `https://tu-sitio.netlify.app/admin.html`
- **Limpieza:** `https://tu-sitio.netlify.app/limpiar-carrito.html`

## ⚙️ **Configuración Avanzada**

### **🔑 Cambiar contraseña del CMS:**
1. **Archivo:** `admin-script.js`
2. **Línea ~90:** Buscar `CMS_CONFIG`
3. **Cambiar:**
```javascript
const CMS_CONFIG = {
    adminPassword: 'tu-nueva-contraseña', // ← Cambiar aquí
    storageKey: 'hijosdelsol_cms_data',
    sessionKey: 'hijosdelsol_admin_session'
};
```
4. **Volver a subir** archivos al hosting

### **📱 Cambiar número de WhatsApp:**

**Opción A - Desde el CMS (recomendado):**
1. Panel Admin → **"Contacto"**
2. Cambiar campo **"WhatsApp"**
3. **Solo números:** Ej: `5491123456789`

**Opción B - Código directo:**
1. **Archivo:** `script.js`
2. **Buscar:** funciones que contienen `whatsapp`
3. **Cambiar:** números de teléfono

### **🎨 Personalizar colores del sitio:**
1. **Archivo:** `styles.css`
2. **Líneas 8-17:** Variables CSS
```css
:root {
    --primary-color: #228B22;    /* Verde principal */
    --secondary-color: #DAA520;  /* Dorado */
    --accent-color: #8B4513;     /* Color tierra */
    --bg-color: #F5F5DC;         /* Fondo beige */
    /* Cambiar estos valores según tu preferencia */
}
```

## 🖼️ **SISTEMA COMPLETO DE IMÁGENES**

### **🎨 Imagen de Fondo del Hero (Banner principal):**

**📍 Dónde configurar:**
- **CMS** → **"Contenido"** → **"Hero"** → **"Imagen de Fondo"**

**⚙️ Cómo usar:**
1. **Checkbox "Usar gradiente":**
   - ✅ **Marcado** - Usa el gradiente verde-dorado por defecto
   - ❌ **Desmarcado** - Permite usar imagen personalizada
2. **Campo "URL de imagen":**
   - Pega el link directo a la imagen
   - Ej: `https://images.unsplash.com/photo-1234567890/image.jpg`
3. **Vista previa automática:**
   - La imagen se carga instantáneamente para verificar
4. **Guardar cambios:**
   - La imagen se aplica automáticamente al banner principal

**💡 Tips para imágenes de fondo:**
- Usa imágenes de alta resolución (mínimo 1200px de ancho)
- Evita imágenes con mucho texto (se superpone el contenido)
- Colores cálidos funcionan mejor con el texto blanco
- Servicios recomendados: Unsplash, Pexels, tu propio hosting

### **🌿 Imágenes de Productos:**

**📍 Dónde configurar:**
- **CMS** → **"Productos"** → **"+ Nuevo"** o **"✏️ Editar"**

**⚙️ Tipos disponibles:**
1. **🎭 Emoji** (recomendado para simplicidad):
   - Usa emojis: 🌿🍃🌱🌺🌸🍀
   - Se ven perfectos en todas las resoluciones
   - No dependen de conexión externa

2. **🖼️ Imagen real:**
   - Pega URL directa a imagen
   - **Vista previa automática** antes de guardar
   - **Fallback inteligente** - Si falla, usa emoji

**💡 Mejores prácticas:**
- Imágenes cuadradas (500x500px o similar)
- Fondo limpio y buena iluminación
- Formato JPG o PNG
- Tamaño moderado para carga rápida

### **🕉️ Imágenes de Ceremonias:**

**📍 Dónde configurar:**
- **CMS** → **"Ceremonias"** → **"+ Nueva"** o **"✏️ Editar"**

**⚙️ Uso:**
1. **Campo "Imagen URL"** (opcional)
2. **Vista previa instantánea** al pegar URL
3. **Diseño adaptativo:**
   - Con imagen: Se muestra prominentemente
   - Sin imagen: Diseño limpio con solo texto

### **📏 Formatos soportados:**
- **Extensiones:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- **Protocolos:** `https://` y `http://`
- **Servicios compatibles:** Imgur, Cloudinary, Google Drive (enlaces públicos), Dropbox, etc.

### **🔧 Validación automática:**
- ✅ Verifica formato de imagen
- ✅ Prueba carga antes de guardar
- ✅ Muestra error si hay problemas
- ✅ Fallback automático a emoji si es necesario

---

## 📱 **Funcionalidades del Sitio**

### **👥 Para Visitantes:**
1. **🌐 Navegación intuitiva** - Menu responsive con hamburguesa en móvil
2. **🌿 Explorar productos** - Ver rapé disponible con precios e imágenes
3. **🛒 Carrito funcional** - Agregar, modificar cantidades, ver total
4. **🕉️ Reservar ceremonias** - Un clic abre WhatsApp con mensaje pre-cargado
5. **📞 Contactar fácil** - Formulario que redirige a WhatsApp
6. **📱 Experiencia móvil** - Totalmente optimizado para celulares

### **🔐 Para Administradores:**
1. **🚪 Acceso rápido** - Botón discreto siempre visible
2. **📊 Dashboard completo** - Estadísticas del sitio
3. **🌿 Gestionar productos** - CRUD completo con imágenes
4. **🕉️ Programar ceremonias** - Eventos con toda la información
5. **📝 Editar contenido** - Todos los textos del sitio, incluido hero
6. **📞 Actualizar contacto** - Información de contacto y redes
7. **💾 Backup/Restauración** - Exportar e importar datos completos
8. **🖼️ Gestión de imágenes** - Hero, productos y ceremonias

---

## 📦 Datos del CMS

El CMS guarda todos los datos en `localStorage` con la clave `hijosdelsol_cms_data`:
- **Productos** - Información de rapé + imágenes
- **Ceremonias** - Eventos programados + imágenes
- **Contenido** - Textos del sitio
- **Contacto** - Información de contacto

## 🛠️ Mantenimiento

### **Backup de datos:**
1. Ir al panel admin
2. Clic en "📥 Exportar"
3. Se descarga archivo JSON con todo

### **Limpiar datos de prueba:**
1. Ir a `limpiar-carrito.html`
2. Usar botones según necesidad
3. Volver al sitio limpio

## 🚨 **PROBLEMAS COMUNES Y SOLUCIONES**

### **🔐 No puedo acceder al CMS:**
- **Verificar:** Contraseña exacta `rapedelsol` (sin mayúsculas)
- **Limpiar:** Borrar caché del navegador
- **URL correcta:** `/admin.html` al final de tu dominio

### **🖼️ Las imágenes no cargan:**
- **URL correcta:** Verificar que sea un enlace directo a imagen
- **HTTPS:** Preferir enlaces https://
- **Formato:** Usar .jpg, .png, .webp
- **Test:** Abrir la URL en una nueva pestaña para verificar

### **📱 El menú móvil no funciona:**
- **Verificar:** Que el archivo `script.js` esté cargando
- **Cache:** Limpiar caché del navegador móvil
- **JavaScript:** Verificar que JS esté habilitado

### **💾 Perdí los datos del CMS:**
- **Restaurar:** Usar backup JSON exportado previamente
- **Reset:** Si no tienes backup, usar "Resetear Datos" para volver al contenido por defecto

---

## 📋 **CHECKLIST DE ADMINISTRACIÓN DIARIA**

### **🔄 Tareas regulares:**
- [ ] **Revisar productos** - Stock, precios, descripciones
- [ ] **Actualizar ceremonias** - Fechas próximas, cupos disponibles
- [ ] **Verificar contacto** - Información actualizada
- [ ] **Backup semanal** - Exportar datos como precaución

### **📊 Tareas mensuales:**
- [ ] **Revisar contenido** - Textos del sitio actualizados
- [ ] **Renovar ceremonias** - Eliminar eventos pasados, agregar nuevos
- [ ] **Actualizar imágenes** - Renovar fotos si es necesario
- [ ] **Verificar funcionamiento** - Probar todas las funciones

---

## 📈 **Características Implementadas**

### **✅ Versión 2.0 Actual:**
- 🔐 **Sistema de login seguro** sin exposición de contraseñas
- 🖼️ **Imagen de fondo personalizable** para el hero
- 📱 **Responsive optimizado** para móviles
- 🎨 **Vista previa en tiempo real** de todas las imágenes
- 🛡️ **Validaciones robustas** contra errores
- ⚙️ **Botón admin discreto** y bien posicionado
- 🍔 **Menú hamburguesa animado** con transición suave
- 💾 **Backup/restauración completa** del sitio

### **🚀 Próximas mejoras sugeridas:**
- [ ] **Subida directa de archivos** - Upload de imágenes al hosting
- [ ] **Galería múltiple** - Varias fotos por producto/ceremonia
- [ ] **Sistema de testimonios** - Experiencias de participantes
- [ ] **Blog integrado** - Artículos sobre medicina ancestral
- [ ] **Calendario visual** - Vista mensual de ceremonias
- [ ] **Multi-idioma** - Español, inglés, portugués
- [ ] **Analytics integrado** - Estadísticas de visitas
- [ ] **Sistema de reservas** - Gestión completa de inscripciones

---

## 🌐 **Hosting en Netlify**

### **📤 Cómo actualizar el sitio:**
1. **Hacer cambios** localmente en los archivos
2. **Crear ZIP** con todos los archivos
3. **Netlify Dashboard** → Tu sitio → **"Deploys"**
4. **Arrastar ZIP** al área de deploy
5. **Esperar** que termine el proceso
6. **Verificar** cambios en el sitio en vivo

### **🏷️ Cambiar nombre del sitio:**
1. **Netlify Dashboard** → Seleccionar sitio
2. **"Site settings"** → **"Site details"**
3. **"Change site name"** → Escribir nuevo nombre
4. **Guardar** - URL cambia automáticamente

### **📊 Monitoreo:**
- **Analytics:** Ver estadísticas en el dashboard de Netlify
- **Error logs:** Revisar en "Functions" si hay problemas
- **Performance:** Netlify muestra velocidad de carga

---

## 🆘 **Soporte Técnico**

### **📖 Documentación:**
Todos los archivos tienen comentarios explicativos en el código para facilitar modificaciones.

### **🛠️ Para desarrolladores:**
- **Framework:** Vanilla JavaScript (sin librerías)
- **Storage:** LocalStorage para persistencia
- **Responsive:** CSS Grid + Flexbox
- **Compatibilidad:** Todos los navegadores modernos

### **📞 ¿Necesitas ayuda?**
Si tienes dudas técnicas:
1. **Revisar** este README completo
2. **Verificar** los comentarios en el código
3. **Probar** en `limpiar-carrito.html` si hay problemas de datos

---

**📅 Creado:** 02 de Septiembre 2025  
**🔄 Última actualización:** 02 de Septiembre 2025  
**🏷️ Versión:** 2.0 - Sistema completo con imagen de fondo  
**✅ Estado:** Completo, optimizado y listo para producción  
**🌐 Compatible con:** Netlify, Vercel, GitHub Pages, Apache, Nginx  
**📱 Responsive:** Móvil, Tablet, Desktop  
**🔐 Seguridad:** Login protegido sin exposición de credenciales
