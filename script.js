// Mobile nav toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Animate skills bar width when in view
      if (entry.target.classList.contains('skill')) {
        const bar = entry.target.querySelector('.bar span');
        if (bar) {
          const computed = getComputedStyle(bar).getPropertyValue('--value') || '0%';
          requestAnimationFrame(() => { bar.style.width = computed; });
        }
      }
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.2 });

document.querySelectorAll('.reveal, .skill').forEach(el => observer.observe(el));

// Contact form (no backend): basic validation + mailto fallback
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
if (form && statusEl) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      statusEl.textContent = 'Please complete all fields.';
      return;
    }
    const mailto = `mailto:aminezaidietudes@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
    statusEl.textContent = 'Opening your email client...';
    window.location.href = mailto;
    setTimeout(() => { statusEl.textContent = 'If your email client did not open, please email me directly (aminezaidietudes@gmail.com).'; }, 1500);
  });
}

// Project cards: navigate to detail page
document.querySelectorAll('.card[data-href]').forEach(card => {
  card.addEventListener('click', (e) => {
    // Prevent link clicks inside the card from being overridden
    if ((e.target instanceof HTMLElement) && e.target.closest('a')) return;
    const href = card.getAttribute('data-href');
    if (href) window.location.href = href;
  });
});

// Tabs for Experience/Education
const tabButtons = document.querySelectorAll('.tab-btn');
const expPanel = document.getElementById('panel-exp');
const eduPanel = document.getElementById('panel-edu');
if (tabButtons.length && expPanel && eduPanel) {
  tabButtons.forEach(btn => btn.addEventListener('click', () => {
    const isExp = btn.getAttribute('data-tab') === 'exp';
    tabButtons.forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
    expPanel.classList.toggle('active', isExp);
    eduPanel.classList.toggle('active', !isExp);
  }));
}

// Expandable Skills
const skillsToggle = document.getElementById('skillsToggle');
const skillsExtra = document.getElementById('skillsExtra');
if (skillsToggle && skillsExtra) {
  skillsToggle.addEventListener('click', () => {
    const isExpanded = skillsExtra.classList.contains('show');
    skillsExtra.classList.toggle('show', !isExpanded);
    skillsToggle.textContent = isExpanded ? 'More Skills...' : 'Less Skills...';
    
    // Trigger reveal animations for new skills
    if (!isExpanded) {
      setTimeout(() => {
        skillsExtra.querySelectorAll('.skill').forEach(skill => {
          observer.observe(skill);
        });
      }, 100);
    }
  });
}


