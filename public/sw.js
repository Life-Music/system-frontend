self.addEventListener("push", (event) => {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.msg,
    icon: "/favicon.png",
    badge: "/favicon.png",
    image: data.image,
    actions: [{ action: "open_url", title: "Nghe ngay" }],
  });
});
self.addEventListener(
  "notificationclick",
  function (event) {
    // clients.openWindow(event.notification.data.url);
  },
  false
);
