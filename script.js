/* ─── LUCIDE ICONS ─── */
lucide.createIcons();

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ─── NAVBAR SCROLL EFFECT ─── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 32px rgba(139,92,246,0.14)'
    : 'none';
});

/* ─── ACTIVE NAV LINK ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

/* ─── SCROLL REVEAL ─── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  revealObs.observe(el);
});

/* ─── TYPING ROLE ANIMATION ─── */
const roles = [
  'Linux System Administrator',
  'RHCE Certified Engineer',
  'Cloud & AWS Practitioner',
  'Networking Specialist',
  'Cyber Security Enthusiast'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const roleEl = document.getElementById('typing-role');

function typeRole() {
  const cur = roles[roleIdx];
  roleEl.textContent = deleting ? cur.slice(0, --charIdx) : cur.slice(0, ++charIdx);
  if (!deleting && charIdx === cur.length) {
    deleting = true;
    return setTimeout(typeRole, 2200);
  }
  if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
  }
  setTimeout(typeRole, deleting ? 42 : 72);
}
typeRole();

/* ─── TERMINAL ANIMATION ─── */
const commands = [
  { cmd: 'whoami',  out: 'Madesh R — Linux System Administrator' },
  { cmd: 'skills',  out: 'Linux | Ansible | AWS | Networking | Cyber Security' },
  { cmd: 'status',  out: 'Open to Cloud / DevOps / NOC opportunities' }
];
const termBody = document.getElementById('terminal-body');
let tIdx = 0;

function typeString(target, text, speed, done) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 't-cursor';
  target.appendChild(cursor);
  const iv = setInterval(() => {
    if (i < text.length) {
      target.insertBefore(document.createTextNode(text[i++]), cursor);
    } else {
      clearInterval(iv);
      cursor.remove();
      done && done();
    }
  }, speed);
}

function runTerminal() {
  if (tIdx >= commands.length) {
    return setTimeout(() => { termBody.innerHTML = ''; tIdx = 0; runTerminal(); }, 2800);
  }
  const { cmd, out } = commands[tIdx];
  const line = document.createElement('div');
  const ps = document.createElement('span');
  ps.className = 't-prompt';
  ps.textContent = 'madesh@portfolio:~$ ';
  const cs = document.createElement('span');
  cs.className = 't-cmd';
  line.appendChild(ps);
  line.appendChild(cs);
  termBody.appendChild(line);

  typeString(cs, cmd, 52, () => {
    setTimeout(() => {
      const outLine = document.createElement('div');
      outLine.className = 't-out';
      outLine.textContent = out;
      termBody.appendChild(outLine);
      tIdx++;
      setTimeout(runTerminal, 550);
    }, 280);
  });
}
setTimeout(runTerminal, 800);

/* ─── PARTICLE CANVAS ─── */
(function () {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function rand(a, b) { return a + Math.random() * (b - a); }

  class Particle {
    constructor() { this.reset(); this.y = rand(0, H); }
    reset() {
      this.x = rand(0, W);
      this.y = H + 5;
      this.r = rand(0.7, 2.0);
      this.a = rand(0, Math.PI * 2);
      this.speed = rand(0.07, 0.2);
      this.opacity = rand(0.12, 0.5);
      this.pulse = rand(0, Math.PI * 2);
    }
    update() {
      this.y -= this.speed;
      this.x += Math.sin(this.a) * 0.28;
      this.a += 0.011;
      this.pulse += 0.028;
      this.opacity = 0.18 + Math.sin(this.pulse) * 0.18;
      if (this.y < -5) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,92,246,${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 85; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ─── GLASS CARD HOVER GLOW (mouse tracking) ─── */
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.background = `radial-gradient(260px at ${x}px ${y}px, rgba(139,92,246,0.07), transparent 70%), rgba(255,255,255,0.038)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ─── SMOOTH ACTIVE NAV STYLE ─── */
const style = document.createElement('style');
style.textContent = `.nav-link.active{color:var(--text)}.nav-link.active::after{width:100%}`;
document.head.appendChild(style);
