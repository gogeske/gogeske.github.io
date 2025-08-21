// Simple service worker for image caching
const CACHE_NAME = 'language-explorer-v1';

// Cache images from Unsplash
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('images.unsplash.com')) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request).then(fetchResponse => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
});