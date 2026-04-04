// notificacao.js
import { messaging, db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Solicita permissão para enviar notificações
async function pedirPermissao() {
    if ("Notification" in window) {
        const status = await Notification.requestPermission();
        if (status === "granted") {
            console.log("Permissão concedida!");
            registrarToken();
        } else {
            console.log("Permissão negada!");
        }
    }
}

// Registra token dinâmico do Firebase Messaging
async function registrarToken() {
    try {
        const token = await getToken(messaging, { vapidKey: 'SEU_VAPID_KEY_DO_FIREBASE' });
        if (token) {
            await addDoc(collection(db, "tokens"), { token });
            console.log("Token salvo sem expor no JS!");
        }
    } catch (err) {
        console.error("Erro ao registrar token:", err);
    }
}

// Função que você chama ao adicionar um jogo
export async function notificarNovoJogo(nomeJogo) {
    await addDoc(collection(db, "notificacoes"), {
        nome: nomeJogo,
        time: Date.now()
    });
}

// Executa permissão ao carregar
pedirPermissao();
