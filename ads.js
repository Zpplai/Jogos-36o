window.open('https://google.com', '_blank');
function abrirAnuncio(link) {
    // evita carregar várias vezes
    if (window.adsLoaded) return;
    window.adsLoaded = true;

    
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

    // garante que roda depois dos scripts
    setTimeout(() => {
        var atOptions = {
            key: '28954047f5d4757530c33306912a93d1',
            format: 'js',
            async: true,
            container: 'ad-native-container',
            params: {}
        };

        let invokeScript = document.createElement('script');
        invokeScript.src = 'https://www.profitablecpmratenetwork.com/28954047f5d4757530c33306912a93d1/invoke.js';
        document.body.appendChild(invokeScript);
    }, 1000);

    // tempo maior pra dar tempo do anúncio abrir
    setTimeout(() => {
        window.location.href = link;
    }, 30000); // 30s
}
