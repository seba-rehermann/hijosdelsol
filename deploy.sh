#!/bin/bash

# 🚀 Script de deployment para Hijos del Sol
# Este script sincroniza el CMS y despliega a Netlify

echo "🌞 Iniciando deployment de Hijos del Sol..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar mensajes con colores
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar si Netlify CLI está instalado
if ! command -v netlify &> /dev/null; then
    print_warning "Netlify CLI no está instalado. Instalando..."
    npm install -g netlify-cli
fi

# 1. Sincronizar datos del CMS
print_message "Sincronizando datos del CMS..."
node sync-cms.js sync

if [ $? -ne 0 ]; then
    print_error "Error al sincronizar datos del CMS"
    exit 1
fi

# 2. Verificar que los archivos principales existan
required_files=("index.html" "styles.css" "script.js" "admin.html" "admin-script.js" "manifest.json")

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Archivo requerido no encontrado: $file"
        exit 1
    fi
done

print_message "Todos los archivos necesarios están presentes"

# 3. Crear un build directory (opcional, por si queremos procesar archivos)
BUILD_DIR="dist"
if [ ! -d "$BUILD_DIR" ]; then
    mkdir -p "$BUILD_DIR"
fi

# 4. Copiar archivos al directorio de build
print_message "Preparando archivos para deployment..."
cp -r *.html *.css *.js *.json icons/ "$BUILD_DIR/" 2>/dev/null || true

# 5. Verificar si hay cambios en git
if git diff --quiet && git diff --cached --quiet; then
    print_warning "No hay cambios nuevos en el repositorio"
else
    # Hacer commit de los cambios
    print_message "Haciendo commit de los cambios..."
    git add .
    git commit -m "Update: CMS sync - $(date '+%Y-%m-%d %H:%M:%S')" || print_warning "No hay cambios para hacer commit"
fi

# 6. Deployment a Netlify
print_message "Desplegando a Netlify..."

# Verificar si ya existe configuración de Netlify
if [ ! -f ".netlify/state.json" ]; then
    print_warning "No se encontró configuración de Netlify. Iniciando nueva configuración..."
    print_message "Por favor sigue las instrucciones para conectar con tu sitio de Netlify"
    netlify link
fi

# Hacer deployment
netlify deploy --prod

if [ $? -eq 0 ]; then
    print_message "🎉 Deployment completado exitosamente!"
    print_message "Tu sitio está disponible en tu URL de Netlify"
else
    print_error "Error durante el deployment a Netlify"
    exit 1
fi

# 7. Limpiar archivos temporales
if [ -d "$BUILD_DIR" ]; then
    rm -rf "$BUILD_DIR"
fi

print_message "🌞 ¡Deployment de Hijos del Sol completado!"
