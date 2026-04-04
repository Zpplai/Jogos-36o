// FIREBASE NOTIFICAÇÃO
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

// CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDIH9HELH9xeKlkGKgCHeijL2-47Y1D8yY",
  authDomain: "xbox-b9d32.firebaseapp.com",
  projectId: "xbox-b9d32",
  messagingSenderId: "708796067849",
  appId: "1:708796067849:web:2c64c21af8b094d4bac8d8"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// SUA VAPID KEY
const VAPID_KEY = "BHH2CPxseD-v4JkRytM0RseK4FEkijcoSY6p14Axk09VfszPAvTDDp1yS4QN8jOcZKwwsTD5UsF6zK4kxZnbSz0";

// ===== BOTÃO =====
const btn = document.createElement("button");
btn.innerText = "Ativar Notificações 🔔";
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.left = "50%";
btn.style.transform = "translateX(-50%)";
btn.style.padding = "10px 20px";
btn.style.background = "#3b82f6";
btn.style.color = "#fff";
btn.style.border = "none";
btn.style.borderRadius = "10px";
btn.style.zIndex = "9999";

document.body.appendChild(btn);

// ===== CLIQUE =====
btn.addEventListener("click", async () => {
    try {
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            alert("Permissão negada ❌");
            return;
        }

        // registra SW
        const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js');

        // pega token
        const token = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration
        });

        if (token) {
            alert("TOKEN: " + token);
        } else {
            alert("Não gerou token ❌");
        }

    } catch (err) {
        alert("ERRO: " + err.message);
        console.log(err);
    }
});
