/* eslint-disable */
workbox.core.setCacheNameDetails({prefix: "pocket-kulture"});


self.addEventListener('message', function ({ data }) {
  if (data.action === 'skipWaiting') {
    console.log('skipping')
    self.skipWaiting()
  }
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('push', event => {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: 'Pocket Kulture',
  });
});

