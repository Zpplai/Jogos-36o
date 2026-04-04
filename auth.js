import { auth } from './firebase-config.js';
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const adminEmail = "thiagofernandesribeiroalvss@gmail.com";

export const initAuth = (updateUIFunc) => {
    const authBtn = document.getElementById('authBtn');
    
    authBtn.addEventListener('click', async () => {
        if (auth.currentUser) {
            if (confirm("Sair da conta ADM?")) {
                await signOut(auth);
                window.location.reload();
            }
        } else {
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider);
            } catch (err) {
                console.error("Erro no login:", err);
                alert("Erro ao abrir login do Google.");
            }
        }
    });
};

