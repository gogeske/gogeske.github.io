// Service Worker for Language Explorer
// Implements aggressive caching for performance optimization

const CACHE_NAME = 'language-explorer-v1';
const STATIC_CACHE = 'static-v1';
const IMAGE_CACHE = 'images-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/app.js',
    '/sw.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle Unsplash images with aggressive caching
    if (url.hostname === 'images.unsplash.com') {
        event.respondWith(
            caches.open(IMAGE_CACHE).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(request).then((response) => {
                        // Only cache successful responses
                        if (response.status === 200) {
                            cache.put(request, response.clone());
                        }
                        return response;
                    }).catch(() => {
                        // Return a fallback image if network fails
                        return new Response(
                            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image unavailable</text></svg>',
                            { headers: { 'Content-Type': 'image/svg+xml' } }
                        );
                    });
                });
            })
        );
        return;
    }

    // Handle static assets with cache-first strategy
    if (request.destination === 'document' || 
        request.destination === 'script' || 
        request.destination === 'style') {
        event.respondWith(
            caches.open(STATIC_CACHE).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(request).then((response) => {
                        if (response.status === 200) {
                            cache.put(request, response.clone());
                        }
                        return response;
                    });
                });
            })
        );
        return;
    }

    // For all other requests, use network-first strategy
    event.respondWith(
        fetch(request).catch(() => {
            return caches.match(request);
        })
    );
});

// Background sync for preloading popular images
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'PRELOAD_IMAGES') {
        const imageUrls = event.data.urls;
        
        caches.open(IMAGE_CACHE).then((cache) => {
            imageUrls.forEach((url) => {
                fetch(url).then((response) => {
                    if (response.status === 200) {
                        cache.put(url, response);
                    }
                }).catch(() => {
                    // Silently handle preload failures
                });
            });
        });
    }
});

// Cleanup old cache entries periodically
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CLEANUP_CACHE') {
        caches.open(IMAGE_CACHE).then((cache) => {
            cache.keys().then((requests) => {
                // Keep only the 50 most recent images
                if (requests.length > 50) {
                    const oldRequests = requests.slice(0, requests.length - 50);
                    oldRequests.forEach((request) => {
                        cache.delete(request);
                    });
                }
            });
        });
    }
});