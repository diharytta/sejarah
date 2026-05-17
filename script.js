// ============================================================
// ========== DATA SEJARAH - EDIT DI SINI =====================
// ============================================================
// CARA MENAMBAH SEJARAH BARU:
// 1. Copy salah satu object di bawah
// 2. Paste di dalam array historyData[] (pisahkan dengan koma)
// 3. Ubah date, title, description, dan imageUrl
//
// FORMAT imageUrl (DUA PILIHAN):
//
// A. GAMBAR LOKAL (simpan di folder 'assets'):
//    imageUrl: "assets/nama-file.jpg"
//    Contoh: "assets/pahlawan.jpg", "assets/sumpah-pemuda.jpg"
//
// B. GAMBAR DARI URL INTERNET:
//    imageUrl: "https://...."
//    Contoh: "https://images.unsplash.com/..."
//
// C. KOSONGKAN untuk gambar default:
//    imageUrl: ""
//
// ============================================================

let historyData = [
    {
        date: "28/10/1928",
        title: "Sumpah Pemuda",
        description: "Kongres Pemuda II melahirkan ikrar Sumpah Pemuda: satu tanah air, satu bangsa, satu bahasa Indonesia. Cikal bakal nasionalisme modern.",
        imageUrl: "assets/sumpah-pemuda.jpg"  // GANTI dengan file gambar lokal Anda
    },
    {
        date: "17/08/1945",
        title: "Proklamasi Kemerdekaan",
        description: "Soekarno-Hatta membacakan teks proklamasi, menandai lahirnya Negara Kesatuan Republik Indonesia, lepas dari penjajahan.",
        imageUrl: "assets/proklamasi.jpg"     // GANTI dengan file gambar lokal Anda
    },
    {
        date: "10/11/1945",
        title: "Pertempuran Surabaya",
        description: "Arek-arek Surabaya bertempur heroik melawan sekutu, diperingati sebagai Hari Pahlawan. Simbol semangat tak kenal menyerah.",
        imageUrl: "assets/surabaya.jpg"       // GANTI dengan file gambar lokal Anda
    },
    {
        date: "18/04/1955",
        title: "KTT Asia Afrika",
        description: "Konferensi di Bandung melahirkan Dasasila Bandung, menjadi gerakan non-blok dan persatuan negara-negara Asia-Afrika.",
        imageUrl: "assets/asia-afrika.jpg"    // GANTI dengan file gambar lokal Anda
    }
    // ========== TEMPAT MENAMBAH SEJARAH BARU DI BAWAH INI ==========
    // 
    // Contoh penambahan (hapus tanda // di depan untuk mengaktifkan):
    //
    // {
    //     date: "20/05/1908",
    //     title: "Budi Utomo",
    //     description: "Organisasi pergerakan nasional pertama yang didirikan oleh dr. Soetomo.",
    //     imageUrl: "assets/budi-utomo.jpg"
    // },
    // {
    //     date: "06/08/1945",
    //     title: "Peristiwa Rengasdengklok",
    //     description: "Peristiwa penculikan Soekarno-Hatta oleh para pemuda untuk mempercepat proklamasi.",
    //     imageUrl: "assets/rengasdengklok.jpg"
    // },
    // {
    //     date: "12/11/1945",
    //     title: "Pembentukan TNI",
    //     description: "Berawal dari badan keamanan rakyat (BKR) yang kemudian menjadi Tentara Keamanan Rakyat (TKR).",
    //     imageUrl: ""  // akan menggunakan gambar default
    // },
];

// ========== JANGAN UBAH KODE DI BAWAH INI ==========
// (Kecuali Anda paham JavaScript)

// Fungsi untuk mengurutkan data berdasarkan tanggal
function parseDateToNumber(dateStr) {
    let [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month-1, day).getTime();
}

function sortHistoryData() {
    historyData.sort((a,b) => parseDateToNumber(a.date) - parseDateToNumber(b.date));
}
sortHistoryData();

// DOM elements
const slider = document.getElementById('timelineSlider');
const dateRangeDisplay = document.getElementById('dateRangeDisplay');
const sliderLabels = document.getElementById('sliderLabels');
const historyDate = document.getElementById('historyDate');
const historyTitle = document.getElementById('historyTitle');
const historyDesc = document.getElementById('historyDesc');
const historyImage = document.getElementById('historyImage');
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');
const historyCard = document.getElementById('historyCard');

let currentIndex = 0;
let isAnimating = false;

// Daftar gambar default untuk judul tertentu (jika tidak ada gambar lokal)
function getDefaultImage(title) {
    const defaultImages = {
        "Sumpah Pemuda": "https://images.unsplash.com/photo-1569154941061-e231b4725ef5?w=800&h=500&fit=crop",
        "Proklamasi Kemerdekaan": "https://images.unsplash.com/photo-1590856029826-d881c0e6b27d?w=800&h=500&fit=crop",
        "Pertempuran Surabaya": "https://images.unsplash.com/photo-1580216643062-e6f7b9c6f4e3?w=800&h=500&fit=crop",
        "KTT Asia Afrika": "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed8f?w=800&h=500&fit=crop"
    };
    return defaultImages[title] || "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&h=500&fit=crop";
}

// Fungsi untuk memuat gambar dengan fallback jika gagal
function setImageWithFallback(imgElement, imageUrl, title) {
    if (imageUrl && imageUrl.trim() !== "") {
        imgElement.src = imageUrl;
        // Jika gambar gagal dimuat (file tidak ditemukan), gunakan default
        imgElement.onerror = function() {
            console.warn(`Gambar tidak ditemukan: ${imageUrl}, menggunakan default untuk ${title}`);
            imgElement.src = getDefaultImage(title);
            imgElement.onerror = null; // prevent infinite loop
        };
    } else {
        imgElement.src = getDefaultImage(title);
    }
}

// Render dengan animasi smooth
function renderHistoryWithAnimation(newIndex) {
    if (isAnimating) return;
    isAnimating = true;
    
    const newData = historyData[newIndex];
    if (!newData && historyData.length > 0) return;
    
    historyCard.classList.add('slide-exit');
    
    setTimeout(() => {
        if (historyData.length > 0 && newData) {
            historyDate.innerText = newData.date;
            historyTitle.innerText = newData.title;
            historyDesc.innerText = newData.description;
            setImageWithFallback(historyImage, newData.imageUrl, newData.title);
        } else if (historyData.length === 0) {
            historyDate.innerText = '---';
            historyTitle.innerText = 'Belum ada sejarah';
            historyDesc.innerText = 'Silakan tambah sejarah di file script.js';
            historyImage.src = "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&h=500&fit=crop";
        }
        
        historyCard.classList.remove('slide-exit');
        historyCard.classList.add('slide-enter');
        
        setTimeout(() => {
            historyCard.classList.remove('slide-enter');
            historyCard.classList.add('slide-enter-active');
            
            setTimeout(() => {
                historyCard.classList.remove('slide-enter-active');
                isAnimating = false;
            }, 400);
        }, 10);
    }, 350);
}

// Render tanpa animasi (untuk initial load)
function renderHistoryNoAnimation() {
    if (historyData.length === 0) {
        historyDate.innerText = '---';
        historyTitle.innerText = 'Belum ada sejarah';
        historyDesc.innerText = 'Silakan tambah sejarah di file script.js';
        historyImage.src = "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&h=500&fit=crop";
        return;
    }
    const data = historyData[currentIndex];
    historyDate.innerText = data.date;
    historyTitle.innerText = data.title;
    historyDesc.innerText = data.description;
    setImageWithFallback(historyImage, data.imageUrl, data.title);
}

// Update slider dan labels
function updateSliderAndLabels() {
    const maxIdx = historyData.length - 1;
    slider.max = maxIdx;
    slider.value = currentIndex;
    
    if (historyData.length > 0) {
        dateRangeDisplay.innerText = `${currentIndex+1} / ${historyData.length} - ${historyData[currentIndex]?.date || ''}`;
    } else {
        dateRangeDisplay.innerText = `0 / 0 - Tidak ada data`;
    }
    
    sliderLabels.innerHTML = '';
    if (historyData.length <= 8) {
        historyData.forEach((item, idx) => {
            const span = document.createElement('span');
            span.innerText = item.date.split('/')[0] + '/' + item.date.split('/')[1];
            span.style.cursor = 'pointer';
            span.style.fontSize = '0.7rem';
            span.style.fontWeight = idx === currentIndex ? 'bold' : 'normal';
            span.style.color = idx === currentIndex ? '#f7d44a' : '#c2a16b';
            span.addEventListener('click', () => {
                if (idx !== currentIndex && !isAnimating) {
                    currentIndex = idx;
                    renderHistoryWithAnimation(currentIndex);
                    updateSliderAndLabels();
                    slider.value = currentIndex;
                }
            });
            sliderLabels.appendChild(span);
        });
    } else {
        for(let i=0; i<historyData.length; i++) {
            let short = i+1;
            let span = document.createElement('span');
            span.innerText = short;
            span.style.cursor = 'pointer';
            span.addEventListener('click', () => {
                if (i !== currentIndex && !isAnimating) {
                    currentIndex = i;
                    renderHistoryWithAnimation(currentIndex);
                    updateSliderAndLabels();
                    slider.value = currentIndex;
                }
            });
            sliderLabels.appendChild(span);
        }
    }
}

// Navigasi
function nextSlide() {
    if (historyData.length === 0 || isAnimating) return;
    if (currentIndex + 1 < historyData.length) {
        currentIndex++;
        renderHistoryWithAnimation(currentIndex);
        updateSliderAndLabels();
        slider.value = currentIndex;
    }
}

function prevSlide() {
    if (historyData.length === 0 || isAnimating) return;
    if (currentIndex - 1 >= 0) {
        currentIndex--;
        renderHistoryWithAnimation(currentIndex);
        updateSliderAndLabels();
        slider.value = currentIndex;
    }
}

// Event listener
slider.addEventListener('input', (e) => {
    if (isAnimating) return;
    const newIndex = parseInt(e.target.value, 10);
    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        renderHistoryWithAnimation(currentIndex);
        updateSliderAndLabels();
    }
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Inisialisasi awal
renderHistoryNoAnimation();
updateSliderAndLabels();