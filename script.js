// Mobile menu toggle
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('show');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('show');
  }));

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el => io.observe(el));

  // Particle background (subtle, respects reduced motion)
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function initParticles(){
    const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    particles = Array.from({length: count}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      c: [ '0,229,255', '177,78,255', '255,46,99' ][Math.floor(Math.random()*3)]
    }));
  }
  initParticles();

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0) p.x = canvas.width;
      if(p.x > canvas.width) p.x = 0;
      if(p.y < 0) p.y = canvas.height;
      if(p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${p.c},0.5)`;
      ctx.fill();
    });
    if(!prefersReduced) requestAnimationFrame(draw);
  }
  if(!prefersReduced) requestAnimationFrame(draw);
  else draw();

  // Navbar subtle state on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 40){
      navbar.style.borderColor = 'rgba(0,229,255,0.25)';
    } else {
      navbar.style.borderColor = 'var(--line-bright)';
    }
  });
