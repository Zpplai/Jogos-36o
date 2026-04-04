// --- CONFIGURAÇÃO DE ADS UNIFICADA ---

// 1. Configuração Global do Native Ad (Sempre disponível no topo)
window.atOptions = {
    'key' : '28954047f5d4757530c33306912a93d1',
    'format' : 'js',
    'async' : true,
    'container' : 'ad-native-container',
    'params' : {}
};

// Função única para carregar tudo
function ativarTudo() {
    const ads = [
        'https://pl29054545.profitablecpmratenetwork.com/41/b6/e3/41b6e3e03aca3aa90042c3912a93d181.js',
        'https://pl29054554.profitablecpmratenetwork.com/fd/79/2f/fd792fe9d493ab7f906c7429ed539c73.js'
    ];

    ads.forEach(url => {
        if (!document.querySelector(`script[src^="${url}"]`)) {
            let s = document.createElement('script');
            s.src = url + "?v=" + Math.random(); // Cache buster para forçar o anúncio
            s.async = true;
            document.body.appendChild(s);
        }
    });

    // Carrega o invocador do Native Ad se ainda não existir
    if (!document.querySelector('script[src*="invoke.js"]')) {
        const invokeScript = document.createElement('script');
        invokeScript.src = '//www.profitablecpmratenetwork.com/28954047f5d4757530c33306912a93d1/invoke.js';
        document.body.appendChild(invokeScript);
    }
}

// Lógica de Ativação
window.addEventListener('load', () => {
    // Pedir notificação (Gera confiança no navegador)
    if ("Notification" in window && Notification.permission === "default") {
        setTimeout(() => {
            Notification.requestPermission().then(() => {
                ativarTudo(); // Ativa após a escolha (independente de ser sim ou não)
            });
        }, 1500);
    }

    // Backup: Ativa no primeiro toque se a notificação falhar
    document.addEventListener('click', () => {
        ativarTudo();
    }, { once: true });

    // Backup 2: Se o usuário não clicar em 3 segundos, tenta rodar sozinho
    setTimeout(ativarTudo, 3000);
});
