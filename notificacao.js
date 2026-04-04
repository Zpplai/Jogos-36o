// Função exportada para ser usada no app.js
export function enviarAviso(nomeJogo) {
    if (Notification.permission === "granted") {
        new Notification("🎮 Novo Jogo na Área!", {
            body: `O jogo ${nomeJogo} foi adicionado! Vem conferir.`,
            icon: "https://th.bing.com/th/id/R.7088b99187308736d9333908E6659682?pid=ImgRaw&r=0"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}
