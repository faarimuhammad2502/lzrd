lucide.createIcons();

        // Tombol Back to Top Logic
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('hidden');
                setTimeout(() => {
                    backToTop.classList.remove('opacity-0', 'translate-y-10');
                }, 10);
            } else {
                backToTop.classList.add('opacity-0', 'translate-y-10');
                setTimeout(() => {
                    backToTop.classList.add('hidden');
                }, 300);
            }
        });

        // Tab Switching Logic
        function switchTab(tabName) {
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(el => el.classList.add('hidden'));

            const buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(btn => btn.classList.remove('active'));

            document.getElementById('content-' + tabName).classList.remove('hidden');
            document.getElementById('tab-' + tabName).classList.add('active');
        }

        // Variabel untuk Zoom & Drag
        let zoomLevel = 1;
        const img = document.getElementById('modal-img');
        const container = document.getElementById('modal-img-container');

        function changeZoom(delta) {
            zoomLevel = Math.max(0.5, zoomLevel + delta);
            img.style.transform = `scale(${zoomLevel})`;
        }
        function resetZoom() { 
            zoomLevel = 1; 
            img.style.transform = `scale(1)`; 
            container.scrollLeft = 0;
            container.scrollTop = 0;
        }

        // Drag-to-Scroll Logic di Modal
        let isDown = false;
        let startX, startY, scrollLeft, scrollTop;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            startY = e.pageY - container.offsetTop;
            scrollLeft = container.scrollLeft;
            scrollTop = container.scrollTop;
        });

        container.addEventListener('mouseleave', () => { isDown = false; });
        container.addEventListener('mouseup', () => { isDown = false; });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const y = e.pageY - container.offsetTop;
            container.scrollLeft = scrollLeft - (x - startX);
            container.scrollTop = scrollTop - (y - startY);
        });

        // Buka & Tutup Modal
        function openModal(title, desc, extra, imgSrc = '') {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-desc').innerText = desc;
            document.getElementById('modal-extra').innerText = extra;
            
            if(imgSrc) {
                img.src = imgSrc;
                container.classList.remove('hidden');
                resetZoom();
            } else {
                container.classList.add('hidden');
            }

            document.getElementById('karya-modal').classList.remove('hidden');
            document.body.classList.add('modal-active');
        }

        function closeModal() {
            document.getElementById('karya-modal').classList.add('hidden');
            document.body.classList.remove('modal-active');
        }

        function closeModalOnBackdrop(event) {
            if (event.target.id === 'karya-modal') {
                closeModal();
            }
        }

        // Fungsi Salin Teks / Kontak
        function copyToClipboard(text, label) {
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.getElementById('toast');
                document.getElementById('toast-message').innerText = label + ' berhasil disalin!';
                toast.classList.remove('hidden');
                setTimeout(() => {
                    toast.classList.add('hidden');
                }, 2500);
            });
        }

        // Toggle Dark / Light Mode
        function toggleDarkMode() {
            const html = document.documentElement;
            const sunIcon = document.getElementById('theme-icon-sun');
            const moonIcon = document.getElementById('theme-icon-moon');
            
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                html.classList.add('dark');
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        }


// Tambahkan tautan berbagi Google Drive ke daftar ini untuk menampilkan video.
const profileVideos = [
    { id: '1YyVCZ1zuFfmvCYCGXrpszNG1wrbBOf60', title: 'Trailer Hourglass', description: 'Trailer film pendek Hourglass.' },
    { id: '1Qtu_TfQ4MQ-KgArNlTFnO2OpaTLV-0_e', title: 'Video Ilustrasi Pameran Indonesia', description: 'Karya video ilustrasi untuk Pameran Indonesia.' },
    { id: '1Mj96HUo4L-96cdvoqofejYsirBoqQdHU', title: 'Video Ilustrasi Radio MARI', description: 'Karya video ilustrasi untuk Radio MARI.' }
];

function renderVideoGallery() {
    const gallery = document.getElementById('video-gallery');
    const emptyState = document.getElementById('video-empty-state');
    if (!gallery || !emptyState) return;

    emptyState.classList.toggle('hidden', profileVideos.length > 0);
    gallery.innerHTML = profileVideos.map((video) => {
        const embedUrl = `https://drive.google.com/file/d/${encodeURIComponent(video.id)}/preview`;
        return `<article class="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700 bg-white/90 dark:bg-stone-800/90 shadow-sm">
            <div class="aspect-video bg-stone-200 dark:bg-stone-900">
                <iframe src="${embedUrl}" title="${escapeHtml(video.title)}" class="w-full h-full" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="p-5"><h3 class="font-bold text-stone-900 dark:text-white">${escapeHtml(video.title)}</h3>
                ${video.description ? `<p class="mt-2 text-sm text-stone-600 dark:text-stone-300">${escapeHtml(video.description)}</p>` : ''}</div>
        </article>`;
    }).join('');
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

renderVideoGallery();

