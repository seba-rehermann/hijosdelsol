#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont
import io

# Colores del tema
COLORS = {
    'primary': '#228B22',      # Verde bosque
    'secondary': '#DAA520',    # Dorado
    'bg': '#F5F5DC',          # Beige
    'white': '#FFFFFF'
}

def create_icon_svg(size, emoji="☀️", bg_color=COLORS['primary']):
    """Crea un ícono SVG con emoji centrado"""
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{COLORS['primary']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{COLORS['secondary']};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Fondo circular con gradiente -->
  <circle cx="{size//2}" cy="{size//2}" r="{size//2-2}" fill="url(#grad1)" stroke="{COLORS['white']}" stroke-width="4"/>
  
  <!-- Emoji/Símbolo central -->
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif" 
        font-size="{size//2}" fill="{COLORS['white']}">☀️</text>
</svg>'''
    return svg

def svg_to_png(svg_content, size, output_path):
    """Convierte SVG a PNG usando cairosvg si está disponible, sino crea un ícono básico"""
    try:
        import cairosvg
        png_bytes = cairosvg.svg2png(bytestring=svg_content.encode('utf-8'), output_width=size, output_height=size)
        with open(output_path, 'wb') as f:
            f.write(png_bytes)
        print(f"✓ Icono creado: {output_path}")
    except ImportError:
        # Si no está cairosvg, crear icono básico con PIL
        create_basic_png_icon(size, output_path)

def create_basic_png_icon(size, output_path):
    """Crea un ícono PNG básico usando PIL"""
    # Crear imagen con fondo transparente
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Dibujar círculo con gradiente simulado
    margin = size // 20
    circle_coords = [margin, margin, size - margin, size - margin]
    
    # Fondo del círculo
    draw.ellipse(circle_coords, fill=(34, 139, 34, 255), outline=(255, 255, 255, 255), width=max(2, size//64))
    
    # Círculo interno más claro
    inner_margin = size // 8
    inner_coords = [inner_margin, inner_margin, size - inner_margin, size - inner_margin]
    draw.ellipse(inner_coords, fill=(218, 165, 32, 255))
    
    # Texto central - simulando el sol
    try:
        # Intentar usar una fuente del sistema
        font_size = size // 3
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.load_default()
        except:
            font = None
    
    # Dibujar símbolo del sol
    text = "☀"
    if font:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        text_x = (size - text_width) // 2
        text_y = (size - text_height) // 2
        draw.text((text_x, text_y), text, fill=(255, 255, 255, 255), font=font)
    else:
        # Fallback: dibujar círculo blanco en el centro
        center = size // 2
        radius = size // 8
        draw.ellipse([center-radius, center-radius, center+radius, center+radius], 
                    fill=(255, 255, 255, 255))
    
    # Guardar imagen
    img.save(output_path, 'PNG')
    print(f"✓ Icono básico creado: {output_path}")

def create_favicon_ico(base_icon_path, output_path):
    """Crea favicon.ico desde un PNG"""
    try:
        with Image.open(base_icon_path) as img:
            # Redimensionar a 32x32 para favicon
            favicon = img.resize((32, 32), Image.Resampling.LANCZOS)
            favicon.save(output_path, format='ICO', sizes=[(32, 32)])
        print(f"✓ Favicon creado: {output_path}")
    except Exception as e:
        print(f"✗ Error creando favicon: {e}")

def main():
    # Directorio base
    base_dir = "/home/seba/hijos-del-sol"
    icons_dir = os.path.join(base_dir, "icons")
    
    # Crear directorio de iconos si no existe
    os.makedirs(icons_dir, exist_ok=True)
    
    # Tamaños de iconos necesarios
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    
    print("🎨 Generando iconos PWA para Hijos del Sol...")
    print("=" * 50)
    
    for size in sizes:
        # Crear SVG
        svg_content = create_icon_svg(size)
        
        # Convertir a PNG
        png_path = os.path.join(icons_dir, f"icon-{size}x{size}.png")
        svg_to_png(svg_content, size, png_path)
    
    # Crear favicon
    base_icon = os.path.join(icons_dir, "icon-192x192.png")
    if os.path.exists(base_icon):
        favicon_path = os.path.join(icons_dir, "favicon.ico")
        create_favicon_ico(base_icon, favicon_path)
    
    print("=" * 50)
    print("✅ ¡Iconos PWA generados exitosamente!")
    print(f"📁 Ubicación: {icons_dir}")
    print("\n📝 Iconos creados:")
    for size in sizes:
        print(f"   • icon-{size}x{size}.png")
    print("   • favicon.ico")

if __name__ == "__main__":
    main()
