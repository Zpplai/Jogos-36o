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
}, 3000);
