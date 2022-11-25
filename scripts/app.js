import Menu from "./Menu.js";
import Order from "./Order.js";
import Router from "./Router.js";

navigator.serviceWorker.register("/sw.js");

// request persistent storage
(async function () {
	if (navigator.storage && navigator.storage.persist) {
		if (!(await navigator.storage.persisted())) {
			const result = await navigator.storage.persist();
			console.log("persistence request returned: ", result);
		}
	}
})();

// show data quota
(async function () {
	if (navigator.storage && navigator.storage.estimate) {
		const q = await navigator.storage.estimate(); // in case we need to store huge amount of data
		console.log(`quota available: ${parseInt(q.quota / 1024 / 1024)}MiB`);
		console.log(`quota usage: ${q.usage / 1024}KiB`);
	}
})();

window.addEventListener("DOMContentLoaded", () => {
	Router.init();
	Menu.load();
	Order.render();
});
