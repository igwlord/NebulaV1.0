// ===============================================
// 🌌 NEBULA FINANCIAL - SERVICE WORKER
// Versión: 1.5 - Performance Optimizada
// ===============================================

const CACHE_NAME = 'nebula-financial-v1.5';
const STATIC_CACHE = 'nebula-static-v1.5';
const DYNAMIC_CACHE = 'nebula-dynamic-v1.5';

// Recursos críticos para cachear inmediatamente
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/css/critical.css',
    '/css/styles.css',
    '/manifest.json'
];

// Recursos de terceros que cambiar rara vez
const THIRD_PARTY_CACHE = 'nebula-third-party-v1.5';

const THIRD_PARTY_ASSETS = [
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap'
];

// 🚀 Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('🌌 Nebula SW: Instalando...');
    
    event.waitUntil(
        Promise.all([
            // Cache de recursos críticos
            caches.open(STATIC_CACHE).then(cache => {
                console.log('🌌 Cachando recursos críticos...');
                return cache.addAll(CRITICAL_ASSETS);
            }),            // Cache de recursos de terceros
            caches.open(THIRD_PARTY_CACHE).then(cache => {
                console.log('🌌 Cachando recursos externos...');
                return cache.addAll(THIRD_PARTY_ASSETS.map(url => new Request(url, { mode: 'cors' })));
            })
        ]).then(() => {
            console.log('✅ Nebula SW: Instalación completada');
            // Activar inmediatamente sin esperar
            return self.skipWaiting();
        }).catch(error => {
            console.error('❌ Error en instalación SW:', error);
        })
    );
});

// 🔄 Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('🌌 Nebula SW: Activando...');
    
    event.waitUntil(
        Promise.all([
            // Limpiar caches obsoletos
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== THIRD_PARTY_CACHE) {
                            console.log('🗑️ Eliminando cache obsoleto:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Tomar control inmediato de todas las páginas
            self.clients.claim()
        ]).then(() => {
            console.log('✅ Nebula SW: Activado y listo');
        })
    );
});

// 📡 Intercepción de peticiones
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Solo interceptar peticiones HTTP/HTTPS
    if (!request.url.startsWith('http')) return;
    
    // Estrategia Cache First para recursos estáticos
    if (isStaticAsset(url)) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Estrategia Network First para contenido dinámico
    if (isDynamicContent(url)) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Estrategia Stale While Revalidate para recursos de terceros
    if (isThirdPartyAsset(url)) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
    
    // Por defecto: Network First
    event.respondWith(networkFirst(request));
});

// 🎯 Estrategia Cache First (para assets estáticos)
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('❌ Cache First falló:', error);
        return new Response('Recurso no disponible offline', { status: 503 });
    }
}

// 🌐 Estrategia Network First (para contenido dinámico)
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('🔄 Red no disponible, buscando en cache...');
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Contenido no disponible offline', { 
            status: 503,
            headers: { 'Content-Type': 'text/html' }
        });
    }
}

// ⚡ Estrategia Stale While Revalidate (para recursos de terceros)
async function staleWhileRevalidate(request) {
    const cache = await caches.open(THIRD_PARTY_CACHE);
    const cachedResponse = await cache.match(request);
    
    // Fetch en paralelo para actualizar el cache
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => cachedResponse);
    
    // Devolver cache inmediatamente si existe, sino esperar red
    return cachedResponse || fetchPromise;
}

// 🔍 Helpers para identificar tipos de recursos
function isStaticAsset(url) {
    return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i) ||
           url.pathname === '/' || 
           url.pathname.endsWith('.html');
}

function isDynamicContent(url) {
    return url.pathname.includes('/api/') || 
           url.searchParams.has('dynamic') ||
           url.pathname.includes('/data/');
}

function isThirdPartyAsset(url) {
    return url.hostname !== self.location.hostname &&
           (url.hostname.includes('cdn.') || 
            url.hostname.includes('googleapis.com') ||
            url.hostname.includes('jsdelivr.net'));
}

// 📊 Manejo de errores global
self.addEventListener('error', event => {
    console.error('❌ Error en Service Worker:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('❌ Promise rechazada en SW:', event.reason);
});

console.log('🌌 Nebula Financial Service Worker cargado - v1.5');
