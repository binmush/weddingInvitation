/* ============================================
   FRONTEND PROTECTION — Anti-Copy & Anti-Inspect
   B Create With Us © 2026
   ============================================ */

(function () {
  'use strict';

  var _0xb = 'B Create With Us';
  var _0xc = '\u00a9 2026';

  // === Console Watermark ===
  var _s = [
    '%c\u2728 ' + _0xb + ' ' + _0xc + ' \u2728',
    'background: linear-gradient(135deg, #C9A84C, #E8D48B); color: #1A0F0A; font-size: 16px; font-weight: bold; padding: 12px 24px; border-radius: 8px; font-family: "Playfair Display", serif;'
  ];
  try { console.log(_s[0], _s[1]); } catch(e) {}
  try {
    console.log(
      '%cThis website is designed and protected by B Create With Us.\nUnauthorized copying or reproduction is prohibited.',
      'color: #C9A84C; font-size: 12px; font-family: "Poppins", sans-serif; padding: 8px 0;'
    );
  } catch(e) {}

  // === Disable Right-Click Context Menu ===
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // === Disable Keyboard Shortcuts ===
  document.addEventListener('keydown', function (e) {
    // F12 - DevTools
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I - Inspect
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+J - Console
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+C - Inspect Element
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+U - View Source
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+S - Save Page
    if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+K - Firefox Console
    if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.key === 'k' || e.keyCode === 75)) {
      e.preventDefault();
      return false;
    }
  });

  // === Disable Text Selection on Protected Elements ===
  var _prot = [
    '.hero-content', '.section-title', '.section-subtitle',
    '.timeline-content', '.event-card', '.ritual-card',
    '.poruwa-description', '.family-card', '.gift-card',
    '.footer', '.nav-logo', '.footer-copyright'
  ];

  function _applyNoSelect() {
    _prot.forEach(function (sel) {
      var els = document.querySelectorAll(sel);
      els.forEach(function (el) {
        el.style.webkitUserSelect = 'none';
        el.style.mozUserSelect = 'none';
        el.style.msUserSelect = 'none';
        el.style.userSelect = 'none';
      });
    });
  }

  // === Disable Drag on Images ===
  function _disableImageDrag() {
    var imgs = document.querySelectorAll('img');
    imgs.forEach(function (img) {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', function (e) {
        e.preventDefault();
      });
    });
  }

  // === Basic DevTools Detection ===
  var _devOpen = false;
  var _threshold = 160;

  function _checkDevTools() {
    var widthDiff = window.outerWidth - window.innerWidth > _threshold;
    var heightDiff = window.outerHeight - window.innerHeight > _threshold;

    if (widthDiff || heightDiff) {
      if (!_devOpen) {
        _devOpen = true;
        // Subtle: just log a message, don't break the site
        console.clear();
        console.log(
          '%c\u26a0\ufe0f This site is protected by B Create With Us. Unauthorized copying is prohibited.',
          'color: #E74C3C; font-size: 14px; font-weight: bold; padding: 8px;'
        );
      }
    } else {
      _devOpen = false;
    }
  }

  // === Disable Print (Ctrl+P) ===
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 'P' || e.key === 'p' || e.keyCode === 80)) {
      e.preventDefault();
      return false;
    }
  });

  // === Add CSS-based protection for print ===
  var _printStyle = document.createElement('style');
  _printStyle.textContent = '@media print { body { display: none !important; } body::after { content: "This content is protected by B Create With Us. Printing is disabled."; display: block; text-align: center; padding: 100px 40px; font-size: 24px; color: #C9A84C; font-family: "Playfair Display", serif; } }';
  document.head.appendChild(_printStyle);

  // === Initialize All Protections ===
  function _initProtection() {
    _applyNoSelect();
    _disableImageDrag();

    // Run DevTools check periodically
    setInterval(_checkDevTools, 2000);

    // Re-apply on DOM changes (for dynamically added content)
    var observer = new MutationObserver(function () {
      _applyNoSelect();
      _disableImageDrag();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _initProtection);
  } else {
    _initProtection();
  }
})();
