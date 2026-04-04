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

// REGISTRA SERVICE WORKER (IMPORTANTE PRO GITHUB)
navigator.serviceWorker.register('/Jogos-36o/firebase-messaging-sw.js')
.then(() => {
    console.log("Service Worker registrado");
})
.catch(err => {
    console.log("Erro SW:", err);
});

// ===== BOTÃO PRA ATIVAR =====
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

// clique real (funciona no celular)
btn.addEventListener("click", async () => {
    try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: VAPID_KEY
            });

            console.log("TOKEN:", token);
            alert("Notificação ativada 🔔");

            btn.remove();
        } else {
            alert("Permissão negada ❌");
        }

    } catch (err) {
        console.log("Erro:", err);
        alert("Erro ao ativar notificação");
    }
});
