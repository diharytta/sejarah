// ============================================================
// ========== DATA SEJARAH - EDIT DI SINI =====================
// ============================================================
// FORMAT:
// {
//   date: "DD/MM/YYYY",
//   title: "Judul Peristiwa",
//   description: "Deskripsi singkat...",
//   fullArticle: "<p>Artikel lengkap...</p>",
//   imageUrl: "assets/nama-file.jpg"  // atau URL, atau kosongkan ""
// }

let historyData = [
    {
        date: "28/10/1928",
        title: "Sumpah Pemuda",
        description: "Kongres Pemuda II melahirkan ikrar Sumpah Pemuda: satu tanah air, satu bangsa, satu bahasa Indonesia.",
        fullArticle: "<p><strong>Sumpah Pemuda</strong> adalah ikrar pemuda Indonesia yang dibacakan pada tanggal 28 Oktober 1928. Kongres Pemuda II diadakan di tiga tempat berbeda di Batavia (Jakarta).</p><p>Isi Sumpah Pemuda:<br>• Bertumpah darah satu, tanah Indonesia.<br>• Berbangsa satu, bangsa Indonesia.<br>• Menjunjung bahasa persatuan, bahasa Indonesia.</p><p>Peristiwa ini menjadi tonggak kebangkitan kesadaran nasional menuju kemerdekaan. Tokoh penting seperti Soegondo, Mohammad Yamin, dan WR Supratman turut berperan.</p>",
        imageUrl: "assets/sumpah-pemuda.jpg"
    },
    {
        date: "17/08/1945",
        title: "Proklamasi Kemerdekaan",
        description: "Soekarno-Hatta membacakan teks proklamasi, menandai lahirnya Negara Kesatuan Republik Indonesia.",
        fullArticle: "<p><strong>Proklamasi Kemerdekaan Indonesia</strong> dibacakan oleh Ir. Soekarno dan Drs. Mohammad Hatta pada Jumat, 17 Agustus 1945 pukul 10.00 WIB di Jalan Pegangsaan Timur No. 56, Jakarta.</p><p>Naskah proklamasi dirumuskan oleh Soekarno, Hatta, dan Achmad Soebardjo di rumah Laksamana Maeda. Peristiwa ini didahului oleh Peristiwa Rengasdengklok.</p><p>Setelah proklamasi, Indonesia harus melalui perjuangan mempertahankan kemerdekaan. Pengakuan kedaulatan baru diperoleh pada tahun 1949.</p>",
        imageUrl: "assets/proklamasi.jpg"
    },
    {
        date: "10/11/1945",
        title: "Pertempuran Surabaya",
        description: "Arek-arek Surabaya bertempur heroik melawan sekutu, diperingati sebagai Hari Pahlawan.",
        fullArticle: "<p><strong>Pertempuran Surabaya</strong> adalah pertempuran terbesar antara pasukan Indonesia melawan Sekutu (Inggris) dan Belanda. Dipicu oleh insiden perobekan bendera Belanda di Hotel Yamato dan tewasnya Jenderal Mallaby.</p><p>Arek-arek Surabaya, rakyat biasa, santri, dan pemuda berjuang dengan gagah berani. Bung Tomo menjadi tokoh yang membakar semangat juang melalui pidato-pidatonya.</p><p>Pertempuran berlangsung dari 10 November hingga akhir November 1945. Tanggal 10 November diperingati sebagai Hari Pahlawan.</p>",
        imageUrl: "assets/surabaya.jpg"
    },
    {
        date: "18/04/1955",
        title: "KTT Asia Afrika",
        description: "Konferensi di Bandung melahirkan Dasasila Bandung, menjadi gerakan non-blok dan persatuan negara-negara Asia-Afrika.",
        fullArticle: "<p><strong>Konferensi Asia Afrika (KAA)</strong> diselenggarakan di Bandung pada 18-24 April 1955. Dihadiri oleh 29 negara dari Asia dan Afrika yang baru merdeka.</p><p>KAA diprakarsai oleh Indonesia, Burma, Ceylon, India, dan Pakistan. Tujuannya mempromosikan kerja sama serta melawan kolonialisme.</p><p>Hasil penting KAA adalah Dasasila Bandung yang berisi sepuluh prinsip dasar hubungan internasional, termasuk perdamaian dunia dan anti kolonialisme.</p>",
        imageUrl: "assets/asia-afrika.jpg"
    }
];

// ========== JANGAN UBAH KODE DI BAWAH INI ==========

function parseDate(dateStr) {
    let [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month-1, day).getTime();
}

function sortHistory() {
    historyData.sort((a,b) => parseDate(a.date) - parseDate(b.date));
}
sortHistory();

const slider = document.getElementById('timelineSlider');
const dateRange = document.getElementById('dateRangeDisplay');
const sliderLabels = document.getElementById('sliderLabels');
const historyDate = document.getElementById('historyDate');
const historyTitle = document.getElementById('historyTitle');
const historyDesc = document.getElementById('historyDesc');
const historyImage = document.getElementById('historyImage');
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');
const historyCard = document.getElementById('historyCard');
const modal = document.getElementById('articleModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalDescription = document.getElementById('modalDescription');
const modalFullArticle = document.getElementById('modalFullArticle');
const modalImage = document.getElementById('modalImage');

let currentIndex = 0;
let isAnimating = false;

function getDefaultImage(title) {
    const defaults = {
        "Sumpah Pemuda": "https://images.unsplash.com/photo-1569154941061-e231b4725ef5?w=800&h=500&fit=crop",
        "Proklamasi Kemerdekaan": "https://images.unsplash.com/photo-1590856029826-d881c0e6b27d?w=800&h=500&fit=crop",
        "Pertempuran Surabaya": "https://images.unsplash.com/photo-1580216643062-e6f7b9c6f4e3?w=800&h=500&fit=crop",
        "KTT Asia Afrika": "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed8f?w=800&h=500&fit=crop"
    };
    return defaults[title] || "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&h=500&fit=crop";
}

function setImage(imgElement, imageUrl, title) {
    if (imageUrl && imageUrl.trim() !== "") {
        imgElement.src = imageUrl;
        imgElement.onerror = () => { imgElement.src = getDefaultImage(title); };
    } else {
        imgElement.src = getDefaultImage(title);
    }
}

function renderHistory(animate = true, direction = 'next') {
    if (animate && isAnimating) return;
    if (animate) isAnimating = true;
    
    const data = historyData[currentIndex];
    if (!data && historyData.length > 0) return;
    
    if (animate) {
        historyCard.classList.add('slide-exit');
        setTimeout(() => {
            updateContent(data);
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
    } else {
        updateContent(data);
    }
}

function updateContent(data) {
    if (!data && historyData.length === 0) {
        historyDate.innerText = '---';
        historyTitle.innerText = 'Belum ada sejarah';
        historyDesc.innerText = 'Tambahkan sejarah di file script.js';
        historyImage.src = getDefaultImage('');
        return;
    }
    historyDate.innerText = data.date;
    historyTitle.innerText = data.title;
    historyDesc.innerText = data.description;
    setImage(historyImage, data.imageUrl, data.title);
}

function updateSlider() {
    const maxIdx = historyData.length - 1;
    slider.max = maxIdx;
    slider.value = currentIndex;
    
    if (historyData.length > 0) {
        dateRange.innerText = `${currentIndex+1} / ${historyData.length} - ${historyData[currentIndex]?.date || ''}`;
    } else {
        dateRange.innerText = `0 / 0`;
    }
    
    sliderLabels.innerHTML = '';
    historyData.forEach((item, idx) => {
        const span = document.createElement('span');
        span.innerText = item.date.split('/')[0] + '/' + item.date.split('/')[1];
        span.style.fontWeight = idx === currentIndex ? 'bold' : 'normal';
        span.style.color = idx === currentIndex ? '#f7d44a' : '#c2a16b';
        span.onclick = () => {
            if (idx !== currentIndex && !isAnimating) {
                currentIndex = idx;
                renderHistory(true);
                updateSlider();
            }
        };
        sliderLabels.appendChild(span);
    });
}

function nextSlide() {
    if (historyData.length === 0 || isAnimating) return;
    if (currentIndex + 1 < historyData.length) {
        currentIndex++;
        renderHistory(true);
        updateSlider();
    }
}

function prevSlide() {
    if (historyData.length === 0 || isAnimating) return;
    if (currentIndex - 1 >= 0) {
        currentIndex--;
        renderHistory(true);
        updateSlider();
    }
}

function openModal() {
    const data = historyData[currentIndex];
    if (!data) return;
    
    modalTitle.innerText = data.title;
    modalDate.innerText = data.date;
    modalDescription.innerText = data.description;
    modalFullArticle.innerHTML = data.fullArticle || "<p>Tidak ada artikel lengkap untuk peristiwa ini.</p>";
    setImage(modalImage, data.imageUrl, data.title);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

slider.addEventListener('input', (e) => {
    if (isAnimating) return;
    currentIndex = parseInt(e.target.value);
    renderHistory(true);
    updateSlider();
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
document.getElementById('historyImageContainer').addEventListener('click', openModal);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('closeModalFooterBtn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

renderHistory(false);
updateSlider();
