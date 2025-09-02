const CACHE_NAME = 'hijos-del-sol-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html',
  '/styles.css',
  '/script.js',
  '/admin.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/favicon.ico',
  // Fuentes de Google Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Todos los archivos han sido cacheados');
        return self.skipWaiting(); // Activar inmediatamente
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminar caches antiguos
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker activado');
      return self.clients.claim(); // Tomar control inmediatamente
    })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en cache, devolverlo
        if (response) {
          console.log('[SW] Sirviendo desde cache:', event.request.url);
          return response;
        }

        // Si no está en cache, hacer fetch y guardar en cache
        return fetch(event.request).then((response) => {
          // Verificar si es una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la respuesta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              // Solo cachear recursos de nuestro dominio
              if (event.request.url.startsWith(self.location.origin)) {
                console.log('[SW] Cacheando nuevo recurso:', event.request.url);
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        }).catch((error) => {
          console.log('[SW] Error en fetch:', error);
          
          // Si es una navegación y no hay conexión, mostrar página offline básica
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Manejo de notificaciones push (para futuras mejoras)
self.addEventListener('push', (event) => {
  console.log('[SW] Push message recibido');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore', 
        title: 'Ver productos',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close', 
        title: 'Cerrar',
        icon: '/icons/icon-192x192.png'
      },
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Hijos del Sol', options)
  );
});

// Manejo de clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notificación clickeada:', event);
  
  event.notification.close();

  if (event.action === 'explore') {
    // Abrir la app en la sección de productos
    event.waitUntil(
      self.clients.openWindow('/#products')
    );
  } else if (event.action === 'close') {
    // Solo cerrar la notificación
    event.notification.close();
  } else {
    // Click en la notificación principal
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

// Sincronización en segundo plano
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aquí se puede implementar sincronización de datos
      console.log('[SW] Ejecutando sincronización en segundo plano')
    );
  }
});

console.log('[SW] Service Worker registrado correctamente');
