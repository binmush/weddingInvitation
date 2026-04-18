/* ============================================
   THEME TOGGLE — Dark / Light Mode
   ============================================ */

(function () {
  'use strict';

  const THEME_KEY = 'weddingThemeMode';

  // Detect saved theme or system preference
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  // Apply theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  // Toggle theme
  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);

    // Add a subtle animation to the toggle buttons
    const toggles = document.querySelectorAll('.theme-toggle-nav, .theme-toggle-float');
    toggles.forEach(btn => {
      btn.style.transform = 'scale(0.85) rotate(180deg)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 300);
    });
  }

  // Initialize on DOM ready
  function initThemeToggle() {
    // Apply saved/preferred theme immediately
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);

    // Bind toggle buttons
    const navToggle = document.getElementById('theme-toggle-nav');
    const floatToggle = document.getElementById('theme-toggle-float');

    if (navToggle) {
      navToggle.addEventListener('click', toggleTheme);
    }

    if (floatToggle) {
      floatToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  // Apply theme ASAP (before DOMContentLoaded to prevent flash)
  const earlyTheme = getPreferredTheme();
  if (earlyTheme === 'dark') {
    // Add class to document element early to prevent FOUC
    document.documentElement.classList.add('dark-mode-early');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();
