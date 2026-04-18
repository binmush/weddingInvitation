/* ============================================
   GALLERY — Lightbox with Navigation & Swipe
   ============================================ */

(function () {
  let currentIndex = 0;
  let galleryImages = [];
  let lightbox = null;
  let lightboxImg = null;
  let touchStartX = 0;
  let touchEndX = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightbox = document.getElementById('lightbox');
    lightboxImg = document.getElementById('lightbox-image');

    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.style.animation = 'none';
    lightboxImg.offsetHeight; // Trigger reflow
    lightboxImg.style.animation = 'scaleIn 0.3s ease';
  }

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      navigateLightbox(diff > 0 ? 1 : -1);
    }
  }

  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    lightbox = document.getElementById('lightbox');

    if (galleryItems.length === 0 || !lightbox) return;

    // Collect all gallery images
    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        galleryImages.push(img);
        item.addEventListener('click', () => openLightbox(index));
      }
    });

    // Close button
    const closeBtn = document.getElementById('lightbox-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Navigation buttons
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Touch swipe support
    lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', initGallery);
})();
