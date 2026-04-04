// --- CONFIGURAÇÃO DE ADS ATUALIZADA ---

window.addEventListener('load', () => {
    // 1. SOLICITAR PERMISSÃO DE NOTIFICAÇÃO
    // Isso substitui o "Esta página diz" por um balão oficial do navegador
    if ("Notification" in window) {
        // Verifica se o usuário ainda não decidiu
        if (Notification.permission === "default") {
            // Pequeno atraso para a página carregar visualmente primeiro
            setTimeout(() => {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        console.log("Notificação permitida! Carregando scripts...");
                        carregarScriptsAds(); // Carrega os anúncios se ele permitir
                    } else {
                        // Mesmo se ele negar, carregamos os scripts no próximo clique
                        console.log("Notificação negada, aguardando clique.");
                    }
                });
            }, 2000);
        } else {
            // Se já foi permitido antes, carrega direto
            carregarScriptsAds();
        }
    }

    // 2. GARANTIA DE CLIQUE (Backup)
    // Caso ele ignore a notificação, o primeiro toque no site libera os anúncios
    document.addEventListener('click', function liberarNoClique() {
        carregarScriptsAds();
        document.removeEventListener('click', liberarNoClique);
    }, { once: true });
});

// Função para organizar o carregamento dos seus scripts pl29...
function carregarScriptsAds() {
    const ads = [
        'https://pl29054545.profitablecpmratenetwork.com/41/b6/e3/41b6e3e03aca3aa90042c3912a93d181.js',
        'https://pl29054554.profitablecpmratenetwork.com/fd/79/2f/fd792fe9d493ab7f906c7429ed539c73.js'
    ];

    ads.forEach(url => {
        // Evita carregar o mesmo script duas vezes
        if (!document.querySelector(`script[src="${url}"]`)) {
            let s = document.createElement('script');
            s.src = url;
            s.async = true;
            document.body.appendChild(s);
        }
    });
}

// 3. CONFIGURAÇÃO DO NATIVE AD (Container)
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
