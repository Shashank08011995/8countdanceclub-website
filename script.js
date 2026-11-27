// 8count Dance Club site
const WHATSAPP = '919887097210';

// Shrink header after scrolling
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Mobile menu
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') !== 'true';
  burger.setAttribute('aria-expanded', open);
  menu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.setAttribute('aria-expanded', 'false');
  menu.classList.remove('open');
  document.body.style.overflow = '';
}));

// Reveal on scroll
const reveals = [...document.querySelectorAll('.reveal')];
const show = el => { el.classList.add('in'); io.unobserve(el); };
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) show(e.target); });
}, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
reveals.forEach(el => io.observe(el));
// Safety net: anything already scrolled past (fast flicks, anchor jumps) gets shown too
const sweep = () => reveals.forEach(el => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < innerHeight) show(el); });
addEventListener('scroll', () => requestAnimationFrame(sweep), { passive: true });
addEventListener('hashchange', sweep);
addEventListener('load', sweep);

// Play videos only while visible (saves data on phones)
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const vio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const v = e.target;
    if (e.isIntersecting && !reduceMotion) { v.play().catch(() => {}); }
    else { v.pause(); }
  });
}, { threshold: 0.35 });
document.querySelectorAll('video[data-autoplay]').forEach(v => vio.observe(v));
if (reduceMotion) document.querySelector('.hero-video')?.pause();

// Upcoming Fri → Mon weekends
const sel = document.getElementById('weekendSelect');
const fmt = d => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
const today = new Date(); today.setHours(0, 0, 0, 0);
const fri = new Date(today);
fri.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7)); // next Friday
for (let i = 0; i < 8; i++) {
  const s = new Date(fri); s.setDate(fri.getDate() + i * 7);
  const e = new Date(s); e.setDate(s.getDate() + 3);
  const label = `${fmt(s)} → ${fmt(e)} ${e.getFullYear()}`;
  sel.add(new Option(label, label));
}
sel.add(new Option('Flexible: suggest a weekend', 'Flexible'));

// Weekend field only matters for the retreat
const form = document.getElementById('bookForm');
const weekendField = document.getElementById('weekendField');
const F = form.elements;
form.querySelectorAll('input[name=interest]').forEach(r => r.addEventListener('change', () => {
  weekendField.style.display = F.interest.value.includes('Retreat') ? '' : 'none';
}));

// Form → WhatsApp
form.addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  const name = F.name.value.trim();
  const phone = F.phone.value.trim();
  F.name.classList.toggle('invalid', !name);
  F.phone.classList.toggle('invalid', phone.replace(/\D/g, '').length < 10);
  if (!name || phone.replace(/\D/g, '').length < 10) {
    msg.textContent = 'Please add your name and a valid phone number.';
    return;
  }
  const interest = F.interest.value;
  const lines = [
    `Hi 8count Dance Club! 👋`,
    `I'm interested in: *${interest}*`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    interest.includes('Retreat') ? `Weekend: ${F.weekend.value}` : null,
    `People: ${F.people.value || 1}`,
    F.note.value.trim() ? `Note: ${F.note.value.trim()}` : null,
  ].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  msg.textContent = 'Opening WhatsApp… just hit send!';
});

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.masonry img').forEach(img => img.addEventListener('click', () => {
  lbImg.src = img.src; lbImg.alt = img.alt; lb.hidden = false;
}));
lb.addEventListener('click', () => { lb.hidden = true; });
addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });

document.getElementById('yr').textContent = new Date().getFullYear();
