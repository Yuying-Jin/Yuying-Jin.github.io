// Theme toggle: follows the system until the visitor picks one, then remembers it.
const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
if (toggle) {
  const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const sync = () => toggle.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
  if (!root.dataset.theme) root.dataset.theme = isDark() ? 'dark' : 'light';
  sync();
  toggle.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    sync();
  });
}

const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => { backToTop.classList.toggle('visible', window.scrollY > 400); });
}

const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
}
