document.documentElement.classList.add('js');

const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav__link');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (error) {
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function toggleTheme() {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);

  try {
    localStorage.setItem('theme', next);
  } catch (error) {
  }
}

applyTheme(getInitialTheme());
themeToggle.addEventListener('click', toggleTheme);

function setMenu(open) {
  siteNav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuToggle.addEventListener('click', function () {
  setMenu(!siteNav.classList.contains('is-open'));
});

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    setMenu(false);
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    setMenu(false);
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 800) {
    setMenu(false);
  }
});

function setActiveLink(id) {
  navLinks.forEach(function (link) {
    link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
  });
}

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

document.querySelectorAll('main section[id], footer[id]').forEach(function (section) {
  observer.observe(section);
});

const revealItems = document.querySelectorAll(
  '.section__title, .section__desc, .card, .contact-list, .copyright'
);

const revealObserver = new IntersectionObserver(
  function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealItems.forEach(function (item) {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

document.getElementById('year').textContent = new Date().getFullYear();