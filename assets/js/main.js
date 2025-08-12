// Tema değiştirici
(function theme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  function applyIcon() {
    const isLight = root.getAttribute('data-theme') === 'light';
    icon.className = isLight ? 'ri-moon-line' : 'ri-sun-line';
  }
  applyIcon();
  toggle?.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyIcon();
  });
})();

// Mobil menü
(function nav() {
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu?.classList.toggle('open');
  });
})();

// Yukarı dön butonu
(function toTop() {
  const btn = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn?.classList.add('visible');
    else btn?.classList.remove('visible');
  });
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Scroll reveal
(function reveal() {
  const items = Array.from(document.querySelectorAll('[data-animate]'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && e.target.classList.add('in'));
  }, { threshold: 0.12 });
  items.forEach((el) => obs.observe(el));
})();

// Yıl
document.getElementById('year').textContent = String(new Date().getFullYear());

// Basit parçacık efekti
(function particles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  const dots = [];
  const DOTS = 80;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  function init() {
    dots.length = 0;
    for (let i = 0; i < DOTS; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 2 * (window.devicePixelRatio || 1),
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.9;
    for (let i = 0; i < dots.length; i++) {
      const p = dots[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      grad.addColorStop(0, 'rgba(124,77,255,0.7)');
      grad.addColorStop(1, 'rgba(124,77,255,0)');
      ctx.fillStyle = grad;
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  step();
})();


