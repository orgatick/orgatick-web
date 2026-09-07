/* ================================
   PUSH EVENT
================================ */

self.addEventListener("push", event => {
  if (!event.data) return;

  let data;

  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: "Notification",
      body: event.data.text(),
      url: "/"
    };
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-72.png",
      data: { url: data.url }
    })
  );
});


/* ================================
   NOTIFICATION CLICK
================================ */

self.addEventListener("notificationclick", event => {
  event.notification.close();
  // Convert relative URL → absolute URL
  const relativeUrl = event.notification.data.url || "/";
  const targetUrl = new URL(relativeUrl, self.location.origin).href;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
