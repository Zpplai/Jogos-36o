import { db, auth } from './firebase-config.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const adminEmail = "thiagofernandesribeiroalvss@gmail.com";
const imgPadrao = "https://th.bing.com/th/id/R.7088b99187308736d933390886659682?pid=ImgRaw&r=0";

let isAdm = false;
let editId = null;
let jogosCache = [];

// Pedir permissão de notificação logo de cara
if ("Notification" in window) {
    Notification.requestPermission();
}

window.onload = () => {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (menuBtn) {
        menuBtn.onclick = () => {
            sidebar.classList.remove('-translate-x-full');
            menuOverlay.classList.remove('hidden');
        };
    }

    const fecharMenu = () => {
        sidebar.classList.add('-translate-x-full');
        menuOverlay.classList.add('hidden');
    };

    if (closeMenu) closeMenu.onclick = fecharMenu;
    if (menuOverlay) menuOverlay.onclick = fecharMenu;

    const modal = document.getElementById('gameModal');

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

    async function loadGames(filtro = "Todos") {
        const gameGrid = document.getElementById('gameGrid');
        if (!gameGrid) return;
        const snap = await getDocs(collection(db, "jogos"));
        jogosCache = [];
        snap.forEach(d => {
            const data = d.data();
            data.id = d.id;
            jogosCache.push(data);
        });
        renderGames(filtro);
    }

    function renderGames(filtro) {
        const gameGrid = document.getElementById('gameGrid');
        gameGrid.innerHTML = '';
        jogosCache.forEach(j => {
            if (filtro !== "Todos" && j.cat !== filtro) return;
            const linkImg = j.img || imgPadrao;
            const card = document.createElement('div');
            card.className = 'game-card p-3 bg-slate-900/50 border border-white/5 rounded-2xl cursor-pointer hover:border-blue-500 transition-all';
            card.innerHTML = `
                <div class="relative overflow-hidden rounded-xl mb-3 bg-[#020617] h-40 flex items-center justify-center">
                    <img src="${linkImg}" onerror="this.src='${imgPadrao}'" class="w-full h-full object-contain p-2">
                </div>
                <h3 class="text-white font-bold truncate text-sm mb-3">${j.nome}</h3>
                <div class="flex gap-2 items-center">
                    <button class="w-full bg-white text-black py-2 rounded-lg font-black text-[10px]" onclick="event.stopPropagation(); window.open('https://www.profitablecpmratenetwork.com/z9yx3p2p?key=21ab8b83070112b5b0e9535cdf0e9a88', '_blank');">DOWNLOAD</button>
                    ${isAdm ? `<button class="editBtn bg-blue-600/20 text-blue-500 px-3 rounded-lg"><i class="fa fa-edit"></i></button>
                               <button class="deleteBtn bg-red-600/20 text-red-500 px-3 rounded-lg"><i class="fa fa-trash"></i></button>` : ''}
                </div>`;
            
            card.onclick = () => abrirModal(j, linkImg);
            if (isAdm) {
                card.querySelector('.deleteBtn').onclick = async (e) => {
                    e.stopPropagation();
                    if (confirm("Deletar?")) { await deleteDoc(doc(db, "jogos", j.id)); loadGames(); }
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

    function abrirModal(j, linkImg) {
        document.getElementById('modalContent').innerHTML = `
            <div class="relative bg-slate-900 rounded-3xl overflow-hidden p-8">
                <button id="closeGameModal" class="absolute top-4 right-4 text-white">✕</button>
                <img src="${linkImg}" class="h-64 mx-auto object-contain">
                <h2 class="text-2xl font-bold text-white mt-4">${j.nome}</h2>
                <p class="text-slate-400 my-4 text-sm">${j.desc}</p>
                <button onclick="window.abrirAnuncioEDownload('${j.link}')" class="w-full bg-blue-600 py-4 rounded-xl text-white font-bold">BAIXAR AGORA</button>
            </div>`;
        modal.classList.remove('hidden');
        document.getElementById('closeGameModal').onclick = () => modal.classList.add('hidden');
    }

    const authBtn = document.getElementById('authBtn');
    if (authBtn) {
        authBtn.onclick = async () => {
            if (auth.currentUser) { await signOut(auth); window.location.reload(); }
            else { await signInWithPopup(auth, new GoogleAuthProvider()); }
        };
    }

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
                // DISPARA NOTIFICAÇÃO
                if (Notification.permission === "granted") {
                    new Notification("🎮 Novo Jogo!", { body: data.nome + " adicionado!" });
                }
            }
            document.getElementById('adminModal').classList.add('hidden');
            loadGames();
        };
    }
};

window.abrirAnuncioEDownload = function(urlDownload) {
    window.open("https://www.profitablecpmratenetwork.com/z9yx3p2p?key=21ab8b83070112b5b0e9535cdf0e9a88", '_blank');
    setTimeout(() => { window.location.href = urlDownload; }, 1000);
};
