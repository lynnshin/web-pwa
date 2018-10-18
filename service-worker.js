var cacheName = 'pwa';
var filesToCache = [
  '/',  
  '/index.html',  
  '/scripts/app.js',  
  '/Build/onweb.asm.code.unityweb',
  '/Build/onweb.asm.framework.unityweb',  
  '/Build/onweb.asm.memory.unityweb',  
  '/Build/onweb.data.unityweb',  
  '/Build/onweb.json',  
  '/Build/UnityLoader.js',    
  '/TemplateData/favicon-.ico',  
  '/TemplateData/fullscreen.png', 
  '/TemplateData/progressEmpty.Dark.png', 
  '/TemplateData/progressEmpty.Light.png', 
  '/TemplateData/progressFull.Dark.png', 
  '/TemplateData/progressFull.Light.png', 
  '/TemplateData/progressLogo.Dark.png', 
  '/TemplateData/progressLogo.Light.png', 
  '/TemplateData/style.css',
  '/TemplateData/UnityProgress.js',
  '/TemplateData/webgl-logo.png',
  '/assets/css/main.css',
  '/assets/css/images/bg.jpg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

// activate
self.addEventListener('activate', event => {
    console.log('now ready to handle fetches!');
    event.waitUntil(
		caches.keys().then(function(cacheNames) {
			var promiseArr = cacheNames.map(function(item) {
				if (item !== cacheName) {
					// Delete that cached file
					return caches.delete(item);
				}
			})
			return Promise.all(promiseArr);
		})
	); // end e.waitUntil
});

// fetch
self.addEventListener('fetch', function(e) {  
  console.log('[ServiceWorker] Fetch', e.request.url);  
  e.respondWith(  
    caches.match(e.request).then(function(response) {  
      return response || fetch(e.request);  
    })  
  );  
});