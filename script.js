document.addEventListener('DOMContentLoaded', () => {
  /* ===== Theme toggle ===== */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  const isDark = () => root.getAttribute('data-theme') === 'dark';

  const applyThemeState = () => {
    const dark = isDark();
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };

  applyThemeState();

  themeToggle.addEventListener('click', () => {
    if (isDark()) {
      root.removeAttribute('data-theme');
      localStorage.setItem('argus-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('argus-theme', 'dark');
    }
    applyThemeState();
  });

  /* ===== Hamburger / X mobile menu ===== */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const backdrop = document.getElementById('nav-backdrop');
  const navAnchorLinks = navLinks.querySelectorAll('a');

  const openMenu = () => {
    menuToggle.classList.add('open');
    navLinks.classList.add('open');
    backdrop.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  };

  const closeMenu = () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
    backdrop.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  const toggleMenu = () => {
    menuToggle.classList.contains('open') ? closeMenu() : openMenu();
  };

  menuToggle.addEventListener('click', toggleMenu);
  navAnchorLinks.forEach((link) => link.addEventListener('click', closeMenu));
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
  });

  /* ===== Sticky header shadow on scroll ===== */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  });
});
