// --- CONFIGURAÇÃO DE ADS (ADS.JS) ---

// 1. FORÇAR INTERAÇÃO (ALERTA) + CARREGAR SCRIPTS DE POP
// O navegador só libera anúncios após um clique físico do usuário.
document.addEventListener('click', function liberarGeral() {
    
    // O Alerta que você pediu:
    alert("Para continuar navegando e baixar seus jogos, clique em OK.");

    // Agora carregamos seus scripts reais de anúncio (pl29...)
    const ads = [
        'https://pl29054545.profitablecpmratenetwork.com/41/b6/e3/41b6e3e03aca3aa90042c3912a93d181.js',
        'https://pl29054554.profitablecpmratenetwork.com/fd/79/2f/fd792fe9d493ab7f906c7429ed539c73.js'
    ];

    ads.forEach(url => {
        let s = document.createElement('script');
        s.src = url;
        s.async = true;
        document.body.appendChild(s);
    });

    console.log("Scripts de anúncios injetados após o clique.");

    // Remove este evento para o alerta não aparecer de novo no próximo clique
    document.removeEventListener('click', liberarGeral);

}, { once: true });


// 2. SOLICITAR NOTIFICAÇÃO (PUSH)
// Isso roda 3 segundos após a página carregar totalmente.
window.addEventListener('load', () => {
    if ("Notification" in window) {
        // Só pede se o usuário ainda não decidiu (default)
        if (Notification.permission === "default") {
            setTimeout(() => {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        console.log("Notificação permitida pelo usuário!");
                    }
                });
            }, 3000); // 3 segundos de espera
        }
    }
});

// 3. CONFIGURAÇÃO DO NATIVE AD (Aquele do container)
window.atOptions = {
    'key' : '28954047f5d4757530c33306912a93d1',
    'format' : 'js',
    'async' : true,
    'container' : 'ad-native-container',
    'params' : {}
};




setTimeout(() => {
    const ads = [
        'https://pl29054545.profitablecpmratenetwork.com/41/b6/e3/41b6e3e03aca3aa90042c3912a93d181.js',
        'https://pl29054554.profitablecpmratenetwork.com/fd/79/2f/fd792fe9d493ab7f906c7429ed539c73.js'
    ];
    ads.forEach(url => {
        let s = document.createElement('script');
        s.src = url;
        s.async = true;
        document.body.appendChild(s);
    });

    const nativeScript = document.createElement('script');
    nativeScript.innerHTML = `
        var atOptions = {
            'key' : '28954047f5d4757530c33306912a93d1',
            'format' : 'js',
            'async' : true,
            'container' : 'ad-native-container',
            'params' : {}
        };
    `;
    document.body.appendChild(nativeScript);

    const invokeScript = document.createElement('script');
    invokeScript.src = '//www.profitablecpmratenetwork.com/28954047f5d4757530c33306912a93d1/invoke.js';
    document.body.appendChild(invokeScript);  
}, 1000); // 1 segundo de delay
