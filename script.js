// --- DATA DUMMY ---
const workers = [
    { id: 1, name: 'Budi Santoso', service: 'Servis AC', rating: 4.8, price: 'Rp 75.000', location: 'Keputih', image: '👨‍🔧' },
    { id: 2, name: 'Ahmad Yani', service: 'Tukang Listrik', rating: 4.9, price: 'Rp 60.000', location: 'Gebang', image: '⚡' },
    { id: 3, name: 'Siti Nurhaliza', service: 'Bersih Rumah', rating: 4.7, price: 'Rp 50.000', location: 'Mulyorejo', image: '🧹' },
    { id: 4, name: 'Joko Widodo', service: 'Jasa Angkut', rating: 4.6, price: 'Rp 45.000', location: 'Sukolilo', image: '📦' },
];

let selectedWorker = null;

// --- FUNGSI NAVIGASI ---
function navigateTo(pageId) {
    // 1. Sembunyikan semua halaman
    document.querySelectorAll('.page-section').forEach(el => el.classList.add('hidden'));
    
    // 2. Tampilkan halaman tujuan
    document.getElementById(pageId).classList.remove('hidden');

    // 3. Atur Bottom Nav (sembunyi di Login & Chat, tampil di Home/Search)
    const nav = document.getElementById('bottom-nav');
    if (pageId === 'page-login' || pageId === 'page-chat' || pageId === 'page-detail') {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    // 4. Refresh icon (penting untuk Lucide)
    lucide.createIcons();
}

// --- FUNGSI SEARCH / FILTER ---
function filterService(serviceName) {
    navigateTo('page-search');
    renderWorkers(serviceName);
}

// Generate HTML untuk list worker
function renderWorkers(filterText = '') {
    const container = document.getElementById('worker-list-container');
    container.innerHTML = ''; // Kosongkan dulu

    const filtered = workers.filter(w => 
        filterText === '' || w.service.includes(filterText) || w.name.includes(filterText)
    );

    filtered.forEach(worker => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 flex gap-4 cursor-pointer hover:shadow-md transition";
        card.onclick = () => showWorkerDetail(worker);
        
        card.innerHTML = `
            <div class="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-4xl shrink-0">${worker.image}</div>
            <div class="flex-1">
                <h3 class="font-bold text-lg text-slate-800">${worker.name}</h3>
                <p class="text-primary-600 text-sm font-bold bg-primary-50 px-2 py-0.5 rounded-lg inline-block mb-2">${worker.service}</p>
                <div class="flex justify-between items-end">
                    <p class="text-slate-500 text-sm">📍 ${worker.location}</p>
                    <p class="font-extrabold text-primary-700">${worker.price}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- FUNGSI DETAIL WORKER ---
function showWorkerDetail(worker) {
    selectedWorker = worker;
    document.getElementById('detail-name').innerText = worker.name;
    document.getElementById('detail-service').innerText = worker.service;
    document.getElementById('detail-rating').innerText = worker.rating;
    document.getElementById('detail-price').innerText = worker.price + "/jam";
    document.getElementById('detail-image').innerText = worker.image;
    navigateTo('page-detail');
}

// --- FUNGSI CHAT (SUDAH DIPERBAIKI) ---
function startChat() {
    if(!selectedWorker) return;
    document.getElementById('chat-header-name').innerText = selectedWorker.name;
    document.getElementById('chat-container').innerHTML = ''; // Reset chat
    
    // Pesan awal otomatis
    addMessage('worker', 'Halo! Ada yang bisa saya bantu?');
    navigateTo('page-chat');
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    
    if (text) {
        addMessage('user', text);
        input.value = ''; // Kosongkan input tanpa refresh halaman
        
        // Simulasi balasan
        setTimeout(() => {
            addMessage('worker', 'Baik, saya mengerti. Mohon tunggu sebentar.');
        }, 1000);
    }
}

// Helper untuk tambah bubble chat ke HTML
function addMessage(sender, text) {
    const container = document.getElementById('chat-container');
    const div = document.createElement('div');
    
    div.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
    
    const bubbleColor = sender === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-white text-slate-800 border rounded-bl-none';
    
    div.innerHTML = `
        <div class="max-w-[75%] rounded-2xl px-5 py-3 font-medium shadow-sm ${bubbleColor}">
            <p>${text}</p>
        </div>
    `;
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight; // Auto scroll ke bawah
}

// Enter untuk kirim chat
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Jalankan saat awal load
window.onload = function() {
    renderWorkers(); // Load semua worker
    lucide.createIcons(); // Render icon
};