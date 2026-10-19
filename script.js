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
        const id = encodeURIComponent(video.id);
        const embedUrl = 'https://drive.google.com/file/d/' + id + '/preview';
        const posterUrl = 'https://drive.google.com/thumbnail?id=' + id + '&sz=w1280';
        return '<article class="video-card overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700 bg-white/90 dark:bg-stone-800/90 shadow-sm">' +
            '<div class="video-frame aspect-video bg-stone-200 dark:bg-stone-900">' +
                '<button class="video-cover" type="button" data-action="play-video" data-video-url="' + embedUrl + '" aria-label="Putar video ' + escapeHtml(video.title) + '">' +
                    '<img src="' + posterUrl + '" alt="" loading="lazy" onerror="this.remove()">' +
                    '<span class="video-play" aria-hidden="true"><i data-lucide="play" class="w-6 h-6"></i></span>' +
                    '<span class="video-cover-label">Putar video</span>' +
                '</button>' +
            '</div>' +
            '<div class="video-caption"><h3 class="font-bold text-stone-900 dark:text-white">' + escapeHtml(video.title) + '</h3>' +
                (video.description ? '<p class="mt-2 text-sm text-stone-600 dark:text-stone-300">' + escapeHtml(video.description) + '</p>' : '') + '</div>' +
        '</article>';
    }).join('');
    if (window.lucide) lucide.createIcons();
}
function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

renderVideoGallery();

function toggleMobileNav(forceOpen) {
    const panel = document.getElementById('mobile-nav');
    const toggle = document.querySelector('.mobile-nav-toggle');
    if (!panel || !toggle) return;
    const open = typeof forceOpen === 'boolean' ? forceOpen : panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    toggle.querySelector('.mobile-menu-icon')?.classList.toggle('hidden', open);
    toggle.querySelector('.mobile-close-icon')?.classList.toggle('hidden', !open);
}

function preparePageMotion() {
    const revealTargets = document.querySelectorAll(
        'section > div > .text-center, #experience .group, #content-logo > div, #content-poster > div, #skills .grid > div, #video-gallery article'
    );
    revealTargets.forEach((element) => element.classList.add('reveal-up'));

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
        return;
    }
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealTargets.forEach((element) => revealObserver.observe(element));

    const navLinks = [...document.querySelectorAll('#primary-nav a, #mobile-nav a')];
    const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const sectionId = '#' + entry.target.id;
            navLinks.forEach((link) => {
                const active = link.getAttribute('href') === sectionId;
                link.classList.toggle('is-active', active);
                if (active) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });
    sections.forEach((section) => activeObserver.observe(section));
}

preparePageMotion();


document.addEventListener('click', (event) => {
    const control = event.target.closest('[data-action]');
    if (!control) {
        if (event.target.closest('#mobile-nav a')) toggleMobileNav(false);
        return;
    }

    switch (control.dataset.action) {
        case 'toggle-mobile-nav':
            toggleMobileNav();
            break;
        case 'play-video': { 
            const frame = document.createElement('iframe');
            frame.src = control.dataset.videoUrl;
            frame.title = control.getAttribute('aria-label') || 'Video pilihan';
            frame.className = 'w-full h-full';
            frame.allow = 'autoplay; encrypted-media; picture-in-picture';
            frame.allowFullscreen = true;
            frame.loading = 'lazy';
            control.replaceWith(frame);
            break;
        }
        case 'switch-tab':
            switchTab(control.dataset.tab);
            break;
        case 'toggle-dark-mode':
            toggleDarkMode();
            break;
        case 'zoom':
            changeZoom(Number(control.dataset.zoomDelta));
            break;
        case 'reset-zoom':
            resetZoom();
            break;
        case 'open-modal':
            openModal(
                control.dataset.modalTitle,
                control.dataset.modalDescription,
                control.dataset.modalExtra,
                control.dataset.modalImage
            );
            break;
        case 'close-modal':
            closeModal();
            break;
        case 'close-modal-backdrop':
            if (event.target === control) closeModal();
            break;
        case 'copy':
            copyToClipboard(control.dataset.copyText, control.dataset.copyLabel);
            break;
    }
});



document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') toggleMobileNav(false);
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) toggleMobileNav(false);
});
