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
(function() {
  const c = document.getElementById('particles');
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2.5 + 0.5;
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${size}px; height:${size}px;
      background: rgba(201,169,110,${Math.random()*0.4+0.1});
      animation-duration:${Math.random()*18+12}s;
      animation-delay:${Math.random()*10}s;
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
    music.play().catch(() => {});
    wave.classList.remove('paused');
    label.textContent = 'ON';
  }
  isPlaying = !isPlaying;
}
document.addEventListener('visibilitychange', () => {
  const m = document.getElementById('bg-music');
  if (document.hidden) m.pause();
  else if (isPlaying) m.play().catch(() => {});
});

// ===== OPEN INVITATION =====
function openInvitation() {
  document.getElementById('opening').classList.add('hidden');
  document.getElementById('bg-music').play().catch(() => {});
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
  const ids = ['home','couple','event','gallery','wishes'];
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
  const wed = new Date(2026, 5, 28, 13, 0, 0);
  function upd() {
    const diff = wed - new Date();
    if (diff <= 0) { ['days','hours','mins','secs'].forEach(id => document.getElementById(id).textContent = '00'); return; }
    document.getElementById('days').textContent = String(Math.floor(diff/86400000)).padStart(2,'0');
    document.getElementById('hours').textContent = String(Math.floor((diff%86400000)/3600000)).padStart(2,'0');
    document.getElementById('mins').textContent = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
    document.getElementById('secs').textContent = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
  }
  upd(); setInterval(upd, 1000);
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
document.getElementById('lightbox').addEventListener('click', function(e) { if (e.target === this) closeLightbox(); });

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
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyPA89u9CzCQoy0euy6TdErCK1pHKYUQ9C-vsUhTPhVBPyS73AhOXQmICSwq3L9zq9W/exec';

// ===== SUBMIT WISH =====
document.getElementById('wish-status').addEventListener('change', function() {
  const count = document.getElementById('guest-count');
  if (this.value === 'tidak') { count.value = '0'; count.disabled = true; }
  else { count.disabled = false; }
});

function submitWish() {
  const name = getGuestName() || document.getElementById('guest-name-input').value;
  const text = document.getElementById('wish-text').value.trim();
  const status = document.getElementById('wish-status').value;
  const count = document.getElementById('guest-count').value;
  if (!status) { showToast('Pilih status kehadiran!'); return; }
  if (status !== 'tidak' && !count) { showToast('Isi jumlah tamu!'); return; }
  const finalCount = status === 'tidak' ? 0 : count;

  const btn = document.querySelector('.submit-btn');
  const btnSpan = btn.querySelector('span');
  btnSpan.textContent = 'Mengirim...';
  btn.disabled = true;

  // Google Apps Script tidak support POST dengan JSON langsung dari browser (CORS),
  // pakai no-cors + FormData trick lewat URL params
  const params = new URLSearchParams({ name, status, count: finalCount, text });
  fetch(GAS_URL + '?' + params.toString(), { method: 'GET', mode: 'no-cors' })
    .then(() => {
      showToast('Ucapan terkirim! 💕');
      document.getElementById('wish-text').value = '';
      document.getElementById('wish-status').value = '';
      document.getElementById('guest-count').value = '';
      btn.disabled = false;
      btnSpan.textContent = 'Kirim Ucapan ✦';
      setTimeout(() => loadComments(), 1500);
    })
    .catch(() => {
      showToast('Gagal mengirim, coba lagi.');
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
            <div class="comment-avatar">${(item.Nama||'?')[0]}</div>
            <div class="comment-name">${item.Nama||''}</div>
            <span class="comment-status ${item.Status}">${statusMap[item.Status]||item.Status}</span>
          </div>
          <div class="comment-text">${item.Pesan}</div>
        `;
        list.appendChild(el);
      });
    })
    .catch(() => {});
}