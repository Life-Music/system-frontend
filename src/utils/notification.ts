import { useToast } from "vue-toastification";
import requestInstance from "./axios";

const toast = useToast();

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const publicVapidKey = import.meta.env.VITE_VAPID_KEY;

export async function triggerPushNotification() {
  let subscription;
  if ("Notification" in window) {
    // Let's check whether notification permissions have already been granted
    if (
      Notification.permission !== "denied" &&
      Notification.permission !== "granted"
    ) {
      await Notification.requestPermission().then(function (permission) {});
    }
  }
  if (Notification.permission === "granted") {
    if ("serviceWorker" in navigator) {
      const register = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      await navigator.serviceWorker.ready;

      let subscription = await register.pushManager.getSubscription();
      if (!subscription) {
        subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        await requestInstance.post("/notification/subscribe", {
          subscriptionToken: JSON.stringify(subscription),
        });
        await register.showNotification(
          "Cảm ơn bạn đã bật thông báo, chúng tôi sẽ gửi thông báo cho bạn khi cần thiết!"
        );
      }
      return JSON.stringify(subscription);
    } else {
      console.error("Service workers are not supported in this browser");
    }
  } else {
    toast.error("Quyền truy cập thông báo bị từ chối!");
  }
}
