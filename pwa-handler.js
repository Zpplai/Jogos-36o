// pwa-handler.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('PWA: Service Worker registrado!', reg.scope))
            .catch(err => console.log('PWA: Erro ao registrar', err));
    });
}

// Escuta o evento de instalação
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log('PWA: Pronto para instalar!');
});
