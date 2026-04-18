/* ============================================
   MAIN JS — Core Wedding Website Functionality
   ============================================ */

(function () {
  // ===== CONFIG =====
  const WEDDING_DATE = new Date('2026-07-18T10:30:00+05:30');
  const PETAL_COUNT = 25;

  // ===== LOADING SCREEN =====
  function initLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 800);
      }, 1500);
    });
  }

  // ===== SCROLL PROGRESS BAR =====
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      bar.style.width = progress + '%';
    });
  }

  // ===== STICKY NAVBAR =====
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Mobile hamburger
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
      });

      // Close menu on link click
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
        });
      });
    }

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset + 100;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        }
      });
    });
  }

  // ===== COUNTDOWN TIMER =====
  function initCountdown() {
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
      const now = new Date();
      const diff = WEDDING_DATE - now;

      if (diff <= 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minutesEl.textContent = '0';
        secondsEl.textContent = '0';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      // Animate value changes
      function setValue(el, val) {
        const str = String(val).padStart(2, '0');
        if (el.textContent !== str) {
          el.textContent = str;
          el.classList.add('changed');
          setTimeout(() => el.classList.remove('changed'), 400);
        }
      }

      setValue(daysEl, days);
      setValue(hoursEl, hours);
      setValue(minutesEl, minutes);
      setValue(secondsEl, seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ===== SCROLL REVEAL =====
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ===== FLOATING PETALS (Canvas) =====
  function initPetals() {
    const canvas = document.getElementById('petalCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let petals = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    const petalColors = [
      'rgba(201, 168, 76, 0.3)',
      'rgba(232, 212, 139, 0.25)',
      'rgba(160, 50, 60, 0.2)',
      'rgba(245, 230, 208, 0.35)',
      'rgba(255, 200, 200, 0.25)'
    ];

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20 - Math.random() * 100;
        this.size = 4 + Math.random() * 8;
        this.speedY = 0.3 + Math.random() * 0.8;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.oscillateSpeed = 0.01 + Math.random() * 0.02;
        this.oscillateAmount = 30 + Math.random() * 40;
        this.t = Math.random() * Math.PI * 2;
        this.opacity = 0.4 + Math.random() * 0.4;
      }

      update() {
        this.t += this.oscillateSpeed;
        this.x += Math.sin(this.t) * 0.5 + this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        // Draw petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size, this.size, -this.size / 2, 0, this.size);
        ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size / 2, -this.size, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create petals
    for (let i = 0; i < PETAL_COUNT; i++) {
      const p = new Petal();
      p.y = Math.random() * canvas.height;
      petals.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }

  // ===== FLOATING HEARTS =====
  function initFloatingHearts() {
    const hearts = ['❤️', '💕', '💗', '🤍', '💛'];

    function spawnHeart() {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (5 + Math.random() * 4) + 's';
      heart.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 9000);
    }

    // Spawn a heart every 4-8 seconds
    setInterval(spawnHeart, 4000 + Math.random() * 4000);
  }

  // ===== BACK TO TOP =====
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== WHATSAPP SHARE =====
  function initWhatsAppShare() {
    const btn = document.getElementById('whatsapp-share');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const msg = encodeURIComponent(
        "💒 You're Invited! ✨\n\n" +
        "Amaya & Kavinda are getting married!\n" +
        "📅 July 18, 2026\n" +
        "📍 Kandy, Sri Lanka\n\n" +
        "View our wedding invitation: " + window.location.href
      );
      window.open(`https://wa.me/?text=${msg}`, '_blank');
    });
  }

  // ===== MUSIC TOGGLE =====
  function initMusicToggle() {
    const btn = document.getElementById('music-toggle');
    if (!btn) return;

    let isPlaying = false;
    // Audio element (users can add their own MP3)
    const audio = document.getElementById('bg-music');

    btn.addEventListener('click', () => {
      if (!audio) {
        btn.title = 'Add your MP3 file to enable music';
        return;
      }

      if (isPlaying) {
        audio.pause();
        btn.classList.remove('playing');
        btn.innerHTML = '🔇';
      } else {
        audio.play().catch(() => { });
        btn.classList.add('playing');
        btn.innerHTML = '🎵';
      }
      isPlaying = !isPlaying;
    });
  }

  // ===== RSVP FORM =====
  function initRSVP() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {};
      formData.forEach((val, key) => data[key] = val);

      // Validate
      if (!data.name || !data.guests || !data.attendance) {
        alert('Please fill in all required fields.');
        return;
      }

      // Save to localStorage
      let rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
      data.timestamp = new Date().toISOString();
      rsvps.push(data);
      localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));

      // Show success
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = translations[currentLang]?.rsvpSuccess || 'Thank you! Your RSVP has been recorded ✓';
      btn.classList.add('success');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('success');
        form.reset();
      }, 3000);
    });
  }

  // ===== GUEST WISHES =====
  function initWishes() {
    const form = document.getElementById('wishes-form');
    const grid = document.getElementById('wishes-grid');
    if (!form || !grid) return;

    // Load saved wishes
    function loadWishes() {
      const wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');
      grid.innerHTML = '';

      wishes.forEach(wish => {
        const card = document.createElement('div');
        card.className = 'wish-card reveal revealed';
        card.innerHTML = `
          <div class="wish-name">${escapeHTML(wish.name)}</div>
          <div class="wish-message">"${escapeHTML(wish.message)}"</div>
          <div class="wish-date">${new Date(wish.timestamp).toLocaleDateString()}</div>
        `;
        grid.appendChild(card);
      });
    }

    loadWishes();

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="wishName"]');
      const msgInput = form.querySelector('textarea[name="wishMessage"]');
      const name = nameInput.value.trim();
      const message = msgInput.value.trim();

      if (!name || !message) return;

      // Save
      let wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');
      wishes.unshift({ name, message, timestamp: new Date().toISOString() });
      localStorage.setItem('weddingWishes', JSON.stringify(wishes));

      form.reset();
      loadWishes();
    });
  }

  // ===== SAVE THE DATE BUTTON =====
  function initSaveDate() {
    const btn = document.getElementById('btn-save-date');
    if (!btn) return;

    btn.addEventListener('click', () => {
      // Generate .ics calendar invite
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'DTSTART:20260718T050000Z',
        'DTEND:20260718T150000Z',
        'SUMMARY:Amaya & Kavinda Wedding',
        'DESCRIPTION:Wedding ceremony and reception of Amaya & Kavinda',
        'LOCATION:Queens Hotel, Kandy, Sri Lanka',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'amaya-kavinda-wedding.ics';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // ===== SMOOTH SCROLL =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 70;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ===== UTILITY =====
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== INITIALIZE EVERYTHING =====
  document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initScrollProgress();
    initNavbar();
    initCountdown();
    initScrollReveal();
    initPetals();
    initFloatingHearts();
    initBackToTop();
    initWhatsAppShare();
    initMusicToggle();
    initRSVP();
    initWishes();
    initSaveDate();
    initSmoothScroll();
  });
})();
