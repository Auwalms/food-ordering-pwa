const CACHE_NAME = "kitchen-cache-v1";

//we are listing out contents we want to cache heres
const FilesToCache = [
    "/",
    "/index.html",
    "/orders.html",
    "/dish.html",
    "/styles/bootstrap.min.css",
    "/styles/app.css",
    "/scripts/jquery-3.3.1.slim.min.js",
    "/scripts/bootstrap.min.js",
    "/scripts/services.js",
    "/scripts/app.js",
    "/scripts/orders.js",
    "/scripts/dishes.js",
    "/images/drink.png",
    "/images/meat-pie.png",
    "/images/rice.jpg",
    "/images/snack.jpg",
    "/images/soup.png",
    "/images/stew.jpg",
    "/images/swallow.jpeg",
    "/images/favicon.ico",
    "/images/logo.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-512x512.png",
    "/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(FilesToCache))
            .catch(err => {
                console.error("Failed to add files to cache:", err);
            })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheList => {
                return Promise.all(
                    cacheList.map(cache => {
                        if (cache !== CACHE_NAME) {
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .catch(err => console.error(err))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            if (response) {
                return response;
            }

            let fetchRequest = event.request.clone();
            return fetch(fetchRequest)
                .then(response => {
                    if (!response) return;

                    let newResponseToCache = response.clone();
                    caches
                        .open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, newResponseToCache);
                        })
                        .catch(error => console.error(error));
                    return response;
                })
                .catch(err => console.error(err));
        })
    );
});
