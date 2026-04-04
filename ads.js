// ===== BANNER SIMPLES =====

// cria banner
const banner = document.createElement("div");
banner.style.position = "fixed";
banner.style.bottom = "0";
banner.style.left = "0";
banner.style.width = "100%";
banner.style.height = "60px";
banner.style.background = "#111";
banner.style.color = "#fff";
banner.style.display = "flex";
banner.style.alignItems = "center";
banner.style.justifyContent = "center";
banner.style.zIndex = "9999";
banner.innerHTML = `
  <a href="https://example.com" target="_blank" style="color:white;text-decoration:none;">
    🔥 CLIQUE AQUI - ANÚNCIO TESTE
  </a>
`;;

// adiciona na tela
document.body.appendChild(banner);


// ===== POP LEVE (1x por sessão) =====

if (!sessionStorage.getItem("popShown")) {
  sessionStorage.setItem("popShown", "true");

  document.addEventListener("click", () => {
    window.open("https://SEU-LINK-DE-ANUNCIO.com", "_blank");
  }, { once: true });
}
