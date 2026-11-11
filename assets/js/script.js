/* ===== PORTFOLIO SCRIPTS ===== */

// Typewriter effect
(function() {
  const phrases = ['CTF Player', 'Pentesting', 'Digital Forensics', 'Security Learning'];
  let pi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typed_deck') || document.getElementById('typed_term');
  function tick() {
    if (!el) return;
    const full = phrases[pi];
    el.textContent = deleting ? full.slice(0, ci--) : full.slice(0, ci++);
    let delay = deleting ? 40 : 90;
    if (!deleting && ci > full.length) { deleting = true; delay = 1400; }
    else if (deleting && ci < 0) { deleting = false; ci = 0; pi = (pi + 1) % phrases.length; delay = 300; }
    setTimeout(tick, delay);
  }
  tick();
})();

// Clock
(function() {
  const el = document.getElementById('clock');
  if (!el) return;
  function t() { el.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false }); }
  t(); setInterval(t, 1000);
})();

// Theme toggle
(function() {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function applyTheme(theme) {
    if (theme !== 'dark') theme = 'light';
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    toggle.textContent = theme === 'dark' ? '◑' : '◐';
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    try { localStorage.setItem('theme', theme); } catch(e) {}
  }

  let saved = 'light';
  try { saved = localStorage.getItem('theme') || 'light'; } catch(e) {}
  applyTheme(saved);

  toggle.addEventListener('click', function() {
    applyTheme(root.classList.contains('dark') ? 'light' : 'dark');
  });
})();

// Mobile nav toggle
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Close on nav click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });
})();

// Active nav highlight
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href') === page) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });
})();

// Smooth reveal on scroll
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .feature-card, .ctf-card, .stat-card, .social-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.15s, border-color 0.15s, background 0.15s';
    observer.observe(el);
  });
})();
