// ============================================================
// ========== DATA SEJARAH - EDIT DI SINI =====================
// ============================================================

let historyData = [
    {
        date: "18/01/1768",
        title: "Pondok Gading",
        description: "Catatan sejarah pesantren kuno di Nusantara umumnya hanya mencatat tahun berdirinya secara kalender masehi/hijriah karena belum adanya pencatatan sipil modern oleh pihak kraton atau kolonial saat itu.",
        fullArticle: "<p><strong>Pondok Gading</strong> adalah salah satu pesantren kuno di Nusantara yang berdiri sejak abad ke-18. Pesantren ini menjadi pusat pendidikan agama dan penyebaran Islam di wilayah Malang dan sekitarnya.</p><p>Meskipun catatan pasti tahun pendiriannya tidak terdokumentasi dengan baik, bukti-bukti sejarah menunjukkan bahwa pondok ini telah ada sejak masa Kesultanan Mataram Islam.</p><p>Hingga kini, Pondok Gading masih berdiri dan menjadi salah satu cagar budaya yang dilestarikan oleh masyarakat setempat.</p>",
        imageUrl: "img/masjid.jpeg"
    },
    {
        date: "26/04/1935",
        title: "Bunker Bersejarah",
        description: "Struktur saluran bawah tanah ini dikerjakan secara masif setelah Pemerintah Kotamadya Malang secara resmi mengesahkan perluasan kota tahap ke-5 pada April 1935.",
        fullArticle: "<p><strong>Bunker bawah tanah</strong> ini dibangun pada masa kolonial Belanda sekitar tahun 1935. Struktur ini merupakan bagian dari sistem pertahanan dan perlindungan sipil pada masa itu.</p><p>Bunker tersebut memiliki lorong-lorong yang menghubungkan beberapa titik strategis di kota Malang. Konstruksinya sangat kokoh dengan dinding beton tebal yang masih bertahan hingga kini.</p><p>Saat ini, bunker tersebut menjadi salah satu destinasi wisata sejarah yang menarik bagi para pengunjung.</p>",
        imageUrl: "img/bungker.jpeg"
    },
    {
        date: "13/07/1947",
        title: "Makam Pahlawan TRIP",
        description: "Tanggal ini adalah hari pertempuran berdarah di Jalan Salak, sekaligus tanggal pemakaman massal ke-35 pejuang remaja TRIP dalam satu liang lahat.",
        fullArticle: "<p><strong>Pertempuran Jalan Salak (13 Juli 1947)</strong> adalah salah satu pertempuran paling berdarah dalam sejarah perjuangan kemerdekaan Indonesia. Sebanyak 35 pejuang remaja dari TRIP (Tentara Republik Indonesia Pelajar) gugur dalam pertempuran ini.</p><p>Mereka dimakamkan dalam satu liang lahat di lokasi yang kini dikenal sebagai Makam Pahlawan TRIP. Peristiwa ini menjadi simbol pengorbanan pemuda Indonesia.</p><p>Setiap tahun, masyarakat mengadakan upacara peringatan untuk menghormati jasa para pahlawan yang telah gugur.</p>",
        imageUrl: "img/patung.jpeg"
    },
    {
        date: "29/09/2017",
        title: "Festival Klampok Jaman Biyen",
        description: "Gerakan budaya ini pertama kali dideklarasikan menjadi festival rakyat berkala pada akhir September 2017 oleh komunitas pemuda dan warga lokal.",
        fullArticle: "<p><strong>Festival Klampok Jaman Biyen</strong> adalah acara tahunan yang diselenggarakan pada 29 September 2017 oleh komunitas pemuda dan warga lokal Gading Kasri.</p><p>Festival ini menampilkan berbagai atraksi budaya, kuliner tradisional, pameran sejarah lokal, dan reka ulang peristiwa bersejarah. Tujuannya adalah untuk menghidupkan kembali memori sejarah kampung.</p><p>Sejak saat itu, festival ini menjadi agenda tahunan yang dinanti-nantikan oleh masyarakat Malang dan sekitarnya.</p>",
        imageUrl: "img/kereta.jpeg"
    }
];

// ========== JANGAN UBAH KODE DI BAWAH INI ==========

function sortHistory() {
    historyData.sort((a,b) => {
        let [da, ma, ya] = a.date.split('/').map(Number);
        let [db, mb, yb] = b.date.split('/').map(Number);
        return new Date(ya, ma-1, da) - new Date(yb, mb-1, db);
    });
}
sortHistory();

// DOM Elements
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
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const sideMenuContent = document.getElementById('sideMenuContent');

// Popup elements
const popupModal = document.getElementById('popupModal');
const popupTitle = document.getElementById('popupTitle');
const popupDate = document.getElementById('popupDate');
const popupDescription = document.getElementById('popupDescription');
const popupFullArticle = document.getElementById('popupFullArticle');
const popupImage = document.getElementById('popupImage');
const closePopupBtn = document.getElementById('closePopupBtn');
const closePopupFooterBtn = document.getElementById('closePopupFooterBtn');

let currentIndex = 0;
let isAnimating = false;

function getDefaultImage() {
    return "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&h=500&fit=crop";
}

function setImage(imgElement, imageUrl) {
    if (imageUrl && imageUrl.trim() !== "") {
        imgElement.src = imageUrl;
        imgElement.onerror = () => { imgElement.src = getDefaultImage(); };
    } else {
        imgElement.src = getDefaultImage();
    }
}

function updateContent(data) {
    if (!data) return;
    const dateSpan = historyDate.querySelector('span');
    if (dateSpan) dateSpan.innerText = data.date;
    historyTitle.innerText = data.title;
    historyDesc.innerText = data.description;
    setImage(historyImage, data.imageUrl);
}

function renderHistory(animate = true) {
    if (animate && isAnimating) return;
    if (animate) isAnimating = true;
    
    const data = historyData[currentIndex];
    if (!data) return;
    
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

function updateSlider() {
    const maxIdx = historyData.length - 1;
    slider.max = maxIdx;
    slider.value = currentIndex;
    dateRange.innerText = `${currentIndex+1} / ${historyData.length} - ${historyData[currentIndex]?.date || ''}`;
    
    sliderLabels.innerHTML = '';
    historyData.forEach((item, idx) => {
        const span = document.createElement('span');
        span.innerText = item.date.split('/')[0] + '/' + item.date.split('/')[1];
        span.style.fontWeight = idx === currentIndex ? 'bold' : 'normal';
        span.style.backgroundColor = idx === currentIndex ? 'rgba(202, 138, 4, 0.3)' : 'transparent';
        span.onclick = () => {
            if (idx !== currentIndex && !isAnimating) {
                currentIndex = idx;
                renderHistory(true);
                updateSlider();
                updateSideMenuActive();
            }
        };
        sliderLabels.appendChild(span);
    });
}

function updateSideMenuActive() {
    document.querySelectorAll('.menu-item').forEach((item, idx) => {
        if (idx === currentIndex) item.classList.add('active');
        else item.classList.remove('active');
    });
}

function buildSideMenu() {
    if (!sideMenuContent) return;
    sideMenuContent.innerHTML = '';
    historyData.forEach((item, idx) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        if (idx === currentIndex) menuItem.classList.add('active');
        menuItem.innerHTML = `
            <div class="menu-item-icon">
                <img src="${item.imageUrl || getDefaultImage()}" alt="${item.title}">
            </div>
            <div class="menu-item-info">
                <div class="menu-item-date"><i class="fas fa-calendar-alt"></i> ${item.date}</div>
                <div class="menu-item-title">${item.title}</div>
            </div>
            <i class="fas fa-chevron-right" style="color: #CA8A04;"></i>
        `;
        menuItem.onclick = () => {
            if (idx !== currentIndex && !isAnimating) {
                currentIndex = idx;
                renderHistory(true);
                updateSlider();
                updateSideMenuActive();
                closeMenu();
            }
        };
        sideMenuContent.appendChild(menuItem);
    });
}

function openMenu() {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

function nextSlide() {
    if (currentIndex + 1 < historyData.length && !isAnimating) {
        currentIndex++;
        renderHistory(true);
        updateSlider();
        updateSideMenuActive();
    }
}

function prevSlide() {
    if (currentIndex - 1 >= 0 && !isAnimating) {
        currentIndex--;
        renderHistory(true);
        updateSlider();
        updateSideMenuActive();
    }
}

// ========== POPUP MODAL FUNCTIONS ==========
function openPopup() {
    const data = historyData[currentIndex];
    if (!data) return;
    
    popupTitle.innerHTML = `<i class="fas fa-scroll"></i> ${data.title}`;
    popupDate.innerHTML = `<i class="fas fa-calendar-alt"></i> ${data.date}`;
    popupDescription.innerText = data.description;
    popupFullArticle.innerHTML = data.fullArticle || "<p>Tidak ada lore lengkap untuk peristiwa ini.</p>";
    setImage(popupImage, data.imageUrl);
    
    popupModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popupModal.style.display = 'none';
    document.body.style.overflow = '';
}

// ========== EVENT LISTENERS ==========
slider.addEventListener('input', (e) => {
    if (isAnimating) return;
    currentIndex = parseInt(e.target.value);
    renderHistory(true);
    updateSlider();
    updateSideMenuActive();
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Popup event listeners
const imageContainer = document.getElementById('historyImageContainer');
if (imageContainer) {
    imageContainer.addEventListener('click', openPopup);
}

closePopupBtn.addEventListener('click', closePopup);
closePopupFooterBtn.addEventListener('click', closePopup);
popupModal.addEventListener('click', (e) => {
    if (e.target === popupModal) closePopup();
});

// Initialize
renderHistory(false);
updateSlider();
buildSideMenu();

console.log("✅ Website siap! Klik gambar untuk membuka popup lore. Jumlah data:", historyData.length);
