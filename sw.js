// Retired. The homepage is one small file and needs no service worker.
// This replaces the old image-caching worker for returning visitors: it clears
// the homepage's caches (leaving the sub-apps' alone), unregisters itself and
// reloads any open homepage tabs so they pick up the current page.
// Keep this file in place; deleting it would strand visitors on the old worker.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => !/^(brewdose|diplo)/.test(k)).map((k) => caches.delete(k)));
  const tabs = await self.clients.matchAll({ type: 'window' });
  await self.registration.unregister();
  tabs.forEach((t) => { if (new URL(t.url).pathname === '/') t.navigate(t.url); });
})()));
