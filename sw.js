self.addEventListener("install", async (event) => {
	const cache = await caches.open("cm-appshell");
	cache.addAll([
		"/",
		"styles.css",
		"/scripts/API.js",
		"/scripts/app.js",
		"/scripts/Menu.js",
		"/data/menu.json",
		"/app.webmanifest",
		"/scripts/Order.js",
		"/scripts/Router.js",
		"/images/logo.svg",
		"/images/screen1.jpg",
		"/images/screen2.jpg",
		"/images/icons/icon.png",
		"https://cdn.jsdelivr.net/npm/idb@7/build/umd.js",
		"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap",
		"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
		"https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2 ",
		"https://fonts.gstatic.com/s/materialsymbolsoutlined/v71/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1n-q_4MrImHCIJIZrDCvHOej.woff2",
	]);
});

// network version first
self.addEventListener("fetch", async (event) => {
	event.respondWith(
		(async () => {
			try {
				const fetchResponse = await fetch(event.request);
				// update cache
				const cache = await caches.open("cm-updateassets");
				cache.put(event.request, fetchResponse.clone());
				return fetchResponse;
			} catch (e) {
				// if network request failed, get response from cache
				const cachedResponse = await caches.match(event.request);
				if (cachedResponse) return cachedResponse;
			}
		})()
	);
});

// // cache version first
// self.addEventListener("fetch", (event) => {
// 	event.respondWith(
// 		(async function () {
// 			const cachedResponse = await caches.match(event.request);
// 			if (cachedResponse) {
// 				return cachedResponse;
// 			} else {
// 				return fetch(event.request);
// 			}
// 		})()
// 	);
// });
