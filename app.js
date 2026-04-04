// Função para abrir o Smartlink e depois o download
window.abrirAnuncioEDownload = function(urlDownload) {
    // 1. Abre o anúncio PRIMEIRO
    const win = window.open('https://www.profitablecpmratenetwork.com/vxg2hm2n04?key=b4c26b2ade112653404ea366c1826caf', '_blank');
    
    // 2. Se o navegador bloqueou a janela, avisa ele ou tenta de novo
    if (win) {
        win.focus();
    }

    // 3. Só inicia o download depois que a aba do anúncio já "nasceu"
    // Aumentamos para 800ms para dar tempo do navegador processar
    setTimeout(() => {
        window.location.href = urlDownload;
    }, 800);

};
// 1
import { db, auth } from './firebase-config.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2
const adminEmail = "thiagofernandesribeiroalvss@gmail.com";
const imgPadrao = "https://th.bing.com/th/id/R.7088b99187308736d933390886659682?pid=ImgRaw&r=0";

let isAdm = false;
let editId = null;
let jogosCache = [];

// 3
window.onload = () => {

// 4
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');

// 5
    if (menuBtn) {
        menuBtn.onclick = () => {
            sidebar.classList.remove('-translate-x-full');
            menuOverlay.classList.remove('hidden');
        };
    }

// 6
    const fecharMenu = () => {
        sidebar.classList.add('-translate-x-full');
        menuOverlay.classList.add('hidden');
    };

// 7
    if (closeMenu) closeMenu.onclick = fecharMenu;
    if (menuOverlay) menuOverlay.onclick = fecharMenu;

// 8
    const tutorialBtn = document.getElementById('tutorialBtn');

// 9
    if (tutorialBtn) {
        tutorialBtn.onclick = () => {
            window.location.href = "tutorial.html";
        };
    }

// 10
    const modal = document.getElementById('gameModal');

// 11
    onAuthStateChanged(auth, (user) => {
        const authText = document.getElementById('authText');
        const openAddModal = document.getElementById('openAddModal');

        if (user && user.email === adminEmail) {
            isAdm = true;
            if(authText) authText.innerText = "Sair (ADM)";
            if(openAddModal) openAddModal.classList.remove('hidden');
        } else {
            isAdm = false;
            if(authText) authText.innerText = "Login";
            if(openAddModal) openAddModal.classList.add('hidden');
        }
        loadGames();
    });

// 12
    async function loadGames(filtro = "Todos") {
        const gameGrid = document.getElementById('gameGrid');
        if (!gameGrid) return;
        
        jogosCache = [];
        const snap = await getDocs(collection(db, "jogos"));
        snap.forEach(d => {
            const data = d.data();
            data.id = d.id;
            jogosCache.push(data);
        });

        renderGames(filtro);
    }

// 13
    function renderGames(filtro) {
        const gameGrid = document.getElementById('gameGrid');
        gameGrid.innerHTML = '';

        const contagemCat = { "Todos": jogosCache.length };
        jogosCache.forEach(j => {
            if (j.cat) contagemCat[j.cat] = (contagemCat[j.cat] || 0) + 1;
        });

        const catArea = document.getElementById('catArea');
        if (catArea) {
            catArea.innerHTML = '';
            Object.keys(contagemCat).forEach(cat => {
                const btn = document.createElement('button');
                btn.innerHTML = `${cat} <span class="opacity-50 text-[10px]">${contagemCat[cat]}</span>`;
                btn.className = `px-6 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${filtro === cat ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-900 border-white/10 text-slate-400'}`;
                btn.onclick = () => renderGames(cat);
                catArea.appendChild(btn);
            });
        }

        jogosCache.forEach(j => {
            if (filtro !== "Todos" && j.cat !== filtro) return;

            const linkImg = j.img ? j.img : imgPadrao;
            const card = document.createElement('div');
            card.className = 'game-card p-3 bg-slate-900/50 border border-white/5 rounded-2xl cursor-pointer hover:border-blue-500 transition-all';

            card.innerHTML = `
                <div class="relative overflow-hidden rounded-xl mb-3 bg-[#020617] h-40 flex items-center justify-center">
                    <img src="${linkImg}" onload="this.style.opacity='1'" onerror="this.src='${imgPadrao}'" style="opacity:0" class="w-full h-full object-contain p-2 transition-opacity duration-500">
                </div>
                <h3 class="text-white font-bold truncate text-sm mb-3">${j.nome}</h3>
                <div class="flex gap-2 items-center" onclick="event.stopPropagation()">
               <button onclick="window.abrirAnuncioEDownload('${j.link}')" class="w-full bg-white text-black text-center py-2 rounded-lg font-black text-[10px] uppercase hover:bg-slate-200">DOWNLOAD</button>

                    </a>
                    ${isAdm ? `
                        <button class="editBtn bg-blue-600/20 text-blue-500 px-3 rounded-lg hover:bg-blue-600 hover:text-white"><i class="fa fa-edit"></i></button>
                        <button class="deleteBtn bg-red-600/20 text-red-500 px-3 rounded-lg hover:bg-red-600 hover:text-white"><i class="fa fa-trash"></i></button>
                    ` : ''}
                </div>
            `;

            card.onclick = () => abrirModal(j, linkImg);

            if (isAdm) {
                card.querySelector('.deleteBtn').onclick = async (e) => {
                    e.stopPropagation();
                    if (confirm("Deletar jogo?")) {
                        await deleteDoc(doc(db, "jogos", j.id));
                        loadGames();
                    }
                };
                card.querySelector('.editBtn').onclick = (e) => {
                    e.stopPropagation();
                    editId = j.id;
                    document.getElementById('gName').value = j.nome;
                    document.getElementById('gDesc').value = j.desc;
                    document.getElementById('gCat').value = j.cat;
                    document.getElementById('gImg').value = j.img;
                    document.getElementById('gLink').value = j.link;
                    document.getElementById('adminModal').classList.remove('hidden');
                };
            }
            gameGrid.appendChild(card);
        });
    }

// 18
    function abrirModal(j, linkImg) {
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = `
            <div class="relative bg-slate-900 rounded-3xl overflow-hidden">
                <button id="closeGameModal" class="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full z-10">✕</button>
                <div class="bg-[#020617] flex justify-center p-6">
                    <img src="${linkImg}" class="h-64 object-contain">
                </div>
                <div class="p-8">
                    <h2 class="text-3xl font-black text-white uppercase italic">${j.nome}</h2>
                    <p class="text-slate-400 my-6 text-sm leading-relaxed">${j.desc}</p>
                    <button onclick="window.abrirAnuncioEDownload('${j.link}')" class="block w-full bg-blue-600 text-center py-5 rounded-2xl font-bold uppercase tracking-widest">BAIXAR AGORA</button>

                    </a>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
        document.getElementById('closeGameModal').onclick = () => modal.classList.add('hidden');
    }

// 20+
    if (modal) {
        modal.onclick = (e) => { if (e.target.id === 'gameModal') modal.classList.add('hidden'); };
    }

// 🔐 LOGIN FIX
    const authBtn = document.getElementById('authBtn');
    if (authBtn) {
        authBtn.onclick = async () => {
            if (auth.currentUser) {
                await signOut(auth);
                window.location.reload();
            } else {
                await signInWithPopup(auth, new GoogleAuthProvider());
            }
        };
    }

// ➕ ADD MODAL
    const openAddModal = document.getElementById('openAddModal');
    if (openAddModal) {
        openAddModal.onclick = () => {
            editId = null;
            document.getElementById('gameForm').reset();
            document.getElementById('adminModal').classList.remove('hidden');
        };
    }

    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.onclick = () => document.getElementById('adminModal').classList.add('hidden');
    }

// FORM
    const gameForm = document.getElementById('gameForm');
    if (gameForm) {
        gameForm.onsubmit = async (e) => {
            e.preventDefault();
            const data = {
                nome: document.getElementById('gName').value,
                desc: document.getElementById('gDesc').value,
                cat: document.getElementById('gCat').value,
                img: document.getElementById('gImg').value,
                link: document.getElementById('gLink').value
            };

            if (editId) {
                await updateDoc(doc(db, "jogos", editId), data);
            } else {
                await addDoc(collection(db, "jogos"), data);
            }

            document.getElementById('adminModal').classList.add('hidden');
            loadGames();
        };
    }

// 🔍 SEARCH FIX
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.oninput = (e) => {
            const val = e.target.value.toLowerCase();
            document.querySelectorAll('.game-card').forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                card.style.display = title.includes(val) ? 'flex' : 'none';
            });
        };
    }
};












window.addEventListener('load', () => {

  let deferredPrompt;

  const btn = document.createElement('button');
  btn.innerText = "Instalar App";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.left = "50%";
  btn.style.transform = "translateX(-50%)";
  btn.style.padding = "12px 20px";
  btn.style.background = "#3b82f6";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.zIndex = "9999";
  btn.style.display = "none";

  document.body.appendChild(btn);

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btn.style.display = "block";
  });

  btn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    } else {
      alert("Instalação não disponível 😢 (normal no servidor local)");
    }
  });

});
