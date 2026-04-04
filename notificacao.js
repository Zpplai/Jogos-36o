// FIREBASE NOTIFICAÇÃO
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIH9HELH9xeKlkGKgCHeijL2-47Y1D8yY",
  authDomain: "xbox-b9d32.firebaseapp.com",
  projectId: "xbox-b9d32",
  messagingSenderId: "708796067849",
  appId: "1:708796067849:web:2c64c21af8b094d4bac8d8"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const VAPID_KEY = "BHH2CPxseD-v4JkRytM0RseK4FEkijcoSY6p14Axk09VfszPAvTDDp1yS4QN8jOcZKwwsTD5UsF6zK4kxZnbSz0";

// registra service worker
navigator.serviceWorker.register('/firebase-messaging-sw.js')
.then(() => {
    console.log("Service Worker registrado");
})
.catch(err => {
    console.log("Erro SW:", err);
});

// ativa notificação no clique
document.addEventListener("click", async () => {
    try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: VAPID_KEY
            });

            console.log("TOKEN:", token);
            alert("Notificação ativada 🔔");
        }

    } catch (err) {
        console.log("Erro:", err);
    }
}, { once: true });
