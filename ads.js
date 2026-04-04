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

