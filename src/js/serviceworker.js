const version = '1.0.0'

self.addEventListener('install', (event) => {
  console.log('ServiceWorker: Installed version', version)
  // Cachea resurser
})

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker: Activated version', version)
  // Ta bort gamla cachefiler här
})

self.addEventListener('fetch', (event) => {
  console.log('ServiceWorker: Fetching', event.request.url)
  // Valfritt: Hantera caching eller nätverksförfrågningar
})
