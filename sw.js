const CACHE_NAME = 'media-asia-v3-cache';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['/']);
        })
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Completely ignore tracking/ad domains to avoid interference
    if (
        url.hostname.includes('histats.com') ||
        url.hostname.includes('monetag.com') ||
        url.hostname.includes('concertskidwhich.com') ||
        url.hostname.includes('weirdopt.com')
    ) {
        return; // Let the browser handle these normally (or block them via AdBlock)
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
