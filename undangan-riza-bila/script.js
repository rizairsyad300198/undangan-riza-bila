// ===== CURSOR =====
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, .gallery-item, .couple-card, .bank-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring && ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring && ring.classList.remove('hover'));
});

// ===== PARTICLES =====
(function () {
  const c = document.getElementById('particles');
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2.5 + 0.5;
    p.style.cssText = `
      left:${Math.random() * 100}%;
      width:${size}px; height:${size}px;
      background: rgba(201,169,110,${Math.random() * 0.4 + 0.1});
      animation-duration:${Math.random() * 18 + 12}s;
      animation-delay:${Math.random() * 10}s;
    `;
    c.appendChild(p);
  }
})();

// ===== GUEST NAME =====
function getGuestName() {
  const p = new URLSearchParams(window.location.search);
  return decodeURIComponent(p.get('to') || '');
}

document.addEventListener('DOMContentLoaded', () => {
  const name = getGuestName() || 'Tamu Undangan';
  document.getElementById('guest-name').textContent = name;
  document.getElementById('guest-name-input').value = name;
  loadComments();
});

// ===== MUSIC =====
let isPlaying = false;
function toggleMusic() {
  const music = document.getElementById('bg-music');
  const wave = document.getElementById('music-wave');
  const label = document.getElementById('music-label');
  if (isPlaying) {
    music.pause();
    wave.classList.add('paused');
    label.textContent = 'MUSIC';
  } else {
    music.play().catch(() => { });
    wave.classList.remove('paused');
    label.textContent = 'ON';
  }
  isPlaying = !isPlaying;
}
document.addEventListener('visibilitychange', () => {
  const m = document.getElementById('bg-music');
  if (document.hidden) m.pause();
  else if (isPlaying) m.play().catch(() => { });
});

// ===== OPEN INVITATION =====
function openInvitation() {
  document.getElementById('opening').classList.add('hidden');
  document.getElementById('bg-music').play().catch(() => { });
  document.getElementById('music-wave').classList.remove('paused');
  document.getElementById('music-label').textContent = 'ON';
  isPlaying = true;
  setTimeout(() => {
    const main = document.getElementById('main');
    main.classList.add('visible');
    startCountdown();
    initScrollReveal();
    loadComments();
  }, 900);
}

// ===== NAV =====
function setActive(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}
window.addEventListener('scroll', () => {
  const ids = ['home', 'couple', 'event', 'gallery', 'wishes'];
  const scrollY = window.scrollY + window.innerHeight / 2;
  ids.forEach((id, i) => {
    const s = document.getElementById(id);
    if (!s) return;
    if (s.offsetTop <= scrollY && s.offsetTop + s.offsetHeight > scrollY) {
      document.querySelectorAll('.nav-item').forEach((n, j) => n.classList.toggle('active', j === i));
    }
  });
});

// ===== COUNTDOWN =====
function startCountdown() {
  const target = new Date(2026, 5, 28, 15, 30, 0);

  function upd() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) return;

    document.getElementById('days').textContent =
      String(Math.floor(diff / 86400000)).padStart(2, '0');

    document.getElementById('hours').textContent =
      String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');

    document.getElementById('mins').textContent =
      String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');

    document.getElementById('secs').textContent =
      String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

    requestAnimationFrame(() => setTimeout(upd, 1000));
  }

  upd();
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('up');
        if (e.target.id === 'couple-card-1' || e.target.id === 'couple-card-2') {
          document.querySelectorAll('.couple-card').forEach(c => c.classList.add('up'));
        }
        if (e.target.id === 'ec1' || e.target.id === 'ec2') {
          setTimeout(() => document.getElementById('ec1')?.classList.add('up'), 0);
          setTimeout(() => document.getElementById('ec2')?.classList.add('up'), 200);
        }
        if (e.target.id === 'bc1' || e.target.id === 'bc2') {
          setTimeout(() => document.getElementById('bc1')?.classList.add('up'), 0);
          setTimeout(() => document.getElementById('bc2')?.classList.add('up'), 200);
        }
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .couple-card, .event-card, .bank-card').forEach(el => observer.observe(el));
}

// ===== LIGHTBOX =====
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
document.getElementById('lightbox').addEventListener('click', function (e) { if (e.target === this) closeLightbox(); });

// ===== COPY =====
function copyNumber(btn, num) {
  navigator.clipboard.writeText(num).then(() => {
    const span = btn.querySelector('span');
    btn.classList.add('copied');
    span.textContent = '✓ Tersalin!';
    showToast('Nomor rekening berhasil disalin!');
    setTimeout(() => { btn.classList.remove('copied'); span.textContent = '📋 Salin Nomor'; }, 2500);
  });
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ===== GOOGLE SHEETS API =====
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwAijyrW1dO4MApioY0X66iYm4QaUzBW8_eBWrGwuRjrXkGP9lhYU6ofxY1_5eF-c_z/exec';

// ===== SUBMIT WISH =====
document.getElementById('wish-status').addEventListener('change', function () {
  const count = document.getElementById('guest-count');
  if (this.value === 'tidak') { count.value = '0'; count.disabled = true; }
  else { count.disabled = false; }
});

function submitWish() {
  const name = getGuestName() || document.getElementById('guest-name-input').value;
  const text = document.getElementById('wish-text').value.trim();
  const status = document.getElementById('wish-status').value;
  const count = document.getElementById('guest-count').value;
  if (!status) { showToast('Dimohon pilih status kehadiran!'); return; }
  if (status !== 'tidak' && !count) { showToast('Dimohon untuk mengisi jumlah tamu!'); return; }
  const finalCount = status === 'tidak' ? 0 : count;

  const btn = document.querySelector('.submit-btn');
  const btnSpan = btn.querySelector('span');
  btnSpan.textContent = 'Mengirim...';
  btn.disabled = true;

  const params = new URLSearchParams({ name, status, count: finalCount, text });

  // Using GET method without 'no-cors', similar to how loadComments works.
  fetch(GAS_URL + '?' + params.toString(), { method: 'GET' })
    .then(response => {
      // A successful submission to GAS often results in a redirect, which fetch handles.
      // We can assume success if the request doesn't throw an error.
      if (response.ok || response.type === 'opaque') {
        showToast('Ucapan terkirim! 💕');
        document.getElementById('wish-text').value = '';
        document.getElementById('wish-status').value = '';
        document.getElementById('guest-count').value = '';
        setTimeout(() => loadComments(), 1500);
      } else {
        throw new Error('Server responded with an error.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      showToast('Gagal mengirim, coba lagi.');
    })
    .finally(() => {
      btn.disabled = false;
      btnSpan.textContent = 'Kirim Ucapan ✦';
    });
}

// ===== LOAD COMMENTS =====
function loadComments() {
  fetch(GAS_URL + '?action=get')
    .then(r => r.json())
    .then(data => {
      const list = document.getElementById('comments-list');
      if (!list) return;
      list.innerHTML = '';
      [...data].reverse().forEach(item => {
        if (!item.Pesan) return;
        const el = document.createElement('div');
        el.className = 'comment-card';
        const statusMap = { hadir: 'Hadir', tidak: 'Tidak Hadir', ragu: 'Masih Ragu' };
        el.innerHTML = `
          <div class="comment-header">
            <div class="comment-avatar">
              ${(item.Nama || '?')
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(word => word.charAt(0).toUpperCase())
            .join('')}
            </div>
            <div class="comment-name">${item.Nama || ''}</div>
            <!--
            <span class="comment-status ${item.Status}">
              ${statusMap[item.Status] || item.Status}
            </span>
            -->
          </div>
          <div class="comment-text">${item.Pesan}</div>
        `;
        list.appendChild(el);
      });
    })
    .catch(() => { });
}

// ===== PRELOAD ALL IMAGES BEFORE HIDING LOADER =====
// Loader akan menunggu SEMUA foto (termasuk yang loading="lazy" di galeri)
// benar-benar selesai didownload browser, supaya saat undangan dibuka,
// tidak ada lagi foto yang masih buffering/blank.
function preloadAllImages() {
  // Kumpulkan semua URL gambar yang dipakai di halaman:
  // 1. Semua tag <img src="...">
  // 2. Background image opening (assets/bg/opening.jpg) sudah otomatis lewat preload tag,
  //    tapi kita ikutkan juga supaya benar-benar ditunggu oleh Promise.
  const imgUrls = new Set();

  document.querySelectorAll('img[src]').forEach(img => {
    if (img.src) imgUrls.add(img.src);
  });

  // Background opening.jpg (didefinisikan lewat CSS, bukan tag <img>)
  imgUrls.add(new URL('assets/bg/opening.jpg', window.location.href).href);

  const urls = Array.from(imgUrls);
  const total = urls.length;
  let loadedCount = 0;

  updateLoaderProgress(0, total);

  const loadPromises = urls.map(src => {
    return new Promise(resolve => {
      const tester = new Image();
      tester.onload = () => {
        loadedCount++;
        updateLoaderProgress(loadedCount, total);
        resolve();
      };
      tester.onerror = () => {
        loadedCount++;
        updateLoaderProgress(loadedCount, total);
        resolve();
      };
      tester.src = src;
    });
  });

  // Safety timeout: kalau ada koneksi sangat lambat, jangan biarkan
  // pengunjung terjebak di loading screen selamanya (maksimal 12 detik).
  const timeoutPromise = new Promise(resolve => setTimeout(resolve, 12000));

  Promise.race([Promise.all(loadPromises), timeoutPromise]).then(hideLoader);
}

function updateLoaderProgress(loaded, total) {
  const percentEl = document.getElementById('loading-percent');
  if (percentEl && total > 0) {
    const pct = Math.round((loaded / total) * 100);
    percentEl.textContent = pct + '%';
  }
}

function hideLoader() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 800); // Samakan dengan durasi transisi di CSS (0.8s)
  }
}

// ===== ENVELOPE TOGGLE =====
let envelopeOpened = false;

function toggleEnvelope() {
  envelopeOpened = !envelopeOpened;
  const env = document.getElementById('envelope');
  const reveal = document.getElementById('bank-reveal');
  const cta = document.getElementById('env-cta');

  if (envelopeOpened) {
    env.classList.add('opened');
    cta.textContent = '💌 Terima kasih ✦';
    setTimeout(() => reveal.classList.add('open'), 650);
  } else {
    reveal.classList.remove('open');
    setTimeout(() => {
      env.classList.remove('opened');
      cta.textContent = 'Klik untuk membuka ✦';
    }, 300);
  }
}

function switchTab(person, index, btn) {
  // Update tabs
  const tabs = document.querySelectorAll(`#tabs-${person} .acc-tab`);
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Update panels
  const panels = document.querySelectorAll(`#panels-${person} .acc-panel`);
  panels.forEach(p => p.classList.remove('active'));
  panels[index].classList.add('active');
}

// Mulai preload sesegera mungkin (tidak perlu menunggu window 'load')
// supaya proses download gambar berjalan paralel sedari awal.
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  preloadAllImages();
} else {
  document.addEventListener('DOMContentLoaded', preloadAllImages);
}