// Configuração do Banner Nativo
window.atOptions = {
    'key' : '28954047f5d4757530c33306912a93d1',
    'format' : 'js',
    'async' : true,
    'container' : 'ad-native-container',
    'params' : {}
};

// Função para injetar os anúncios de Pop/Redirecionamento
function carregarAds() {
    const scripts = [
        'https://pl29054545.profitablecpmratenetwork.com/41/b6/e3/41b6e3e03aca3aa90042c3912a93d181.js',
        'https://pl29054554.profitablecpmratenetwork.com/fd/79/2f/fd792fe9d493ab7f906c7429ed539c73.js',
        'https://www.profitablecpmratenetwork.com/28954047f5d4757530c33306912a93d1/invoke.js'
    ];

    scripts.forEach(url => {
        if (!document.querySelector(`script[src^="${url}"]`)) {
            const s = document.createElement('script');
            s.src = url;
            s.async = true;
            document.body.appendChild(s);
        }
    });
}


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

// SUA VAPID KEY
const VAPID_KEY = "BHH2CPxseD-v4JkRytM0RseK4FEkijcoSY6p14Axk09VfszPAvTDDp1yS4QN8jOcZKwwsTD5UsF6zK4kxZnbSz0";

// ATIVA NOTIFICAÇÃO
async function ativarNotificacao() {
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
}

// ativa no primeiro clique
document.addEventListener("click", ativarNotificacao, { once: true });
