// Service worker: guarda o app em cache para funcionar offline.
const CACHE = "medquest-v6";
const FILES = ["./", "index.html", "css/style.css", "js/data.js", "js/data-extra.js", "js/data-extra2.js", "js/more1.js", "js/more2.js", "js/more3.js", "js/more4.js", "js/more5.js", "js/more6.js", "js/more7.js", "js/core.js", "js/online.js", "js/materials.js", "js/ai.js", "js/games.js", "js/lab/lab-3d.js", "js/lab/lab-room.js", "js/lab/lab-core.js", "js/lab/lab-anatomy.js", "js/lab/lab-anatomy-real.js", "js/lab/lab-anatomy-ui.js", "js/lab/lab-error.js", "js/lab/lab-instruments.js", "js/lab/lab-ward.js", "js/lab/lab-osce.js", "js/lab/lab-micro.js", "js/screens.js", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Rede primeiro (pega atualizações), cache como reserva offline.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
