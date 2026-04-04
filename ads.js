window.open('https://zpplai.github.io/Jogos-36o/home.html', '_blank');
function abrirAnuncio(link) {
    // evita carregar várias vezes
    if (window.adsLoaded) return;
    window.adsLoaded = true;

    
    // LÓGICA DO ADS.JS COM ATRASO (1 SEGUNDO)
setTimeout(() => {
    // 1. Script do Pop-under (abre aba sozinho)
    var s1 = document.createElement('script');
    s1.src = '//pl25363412.profitablecpmratenetwork.com/62/83/80/62838036224168057209778738362615.js';
    s1.async = true;
    document.body.appendChild(s1);

    // 2. Script do Social Bar (anúncio flutuante)
    var s2 = document.createElement('script');
    s2.src = '//pl25363652.profitablecpmratenetwork.com/c6/64/73/c66473461245789721345431321456.js';
    s2.async = true;
    document.body.appendChild(s2);

    console.log("Anúncios automáticos carregados com sucesso.");
}, 1000); // 1000ms = 1 segundo de atraso
