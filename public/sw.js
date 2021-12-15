
self.addEventListener('install', (event) => {
    console.log('Service worker: install')
    // Attempt to load cached files
});

self.addEventListener('activate', (event) => {
    console.log('SW activated at: ', new Date().toLocaleTimeString());
})

self.addEventListener('fetch', (event) => {
    console.log('Service worker: fetch')
	// Look for cached files and handle AJAX failures due to being offline
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });