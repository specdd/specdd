(function () {
  'use strict';

  const storageKey = 'specdd-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function getStoredTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return 'light' === value || 'dark' === value ? value : null;
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function getSystemTheme() {
    return media && media.matches ? 'dark' : 'light';
  }

  function getResolvedTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyThemeState() {
    const storedTheme = getStoredTheme();
    const resolvedTheme = storedTheme || getSystemTheme();

    if (storedTheme) {
      root.dataset.theme = storedTheme;
    } else {
      root.removeAttribute('data-theme');
    }

    root.dataset.resolvedTheme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;

    if (!toggle) {
      return;
    }

    const nextTheme = 'dark' === resolvedTheme ? 'light' : 'dark';
    const label = 'Switch to ' + nextTheme + ' theme';

    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    toggle.setAttribute('aria-pressed', 'dark' === resolvedTheme ? 'true' : 'false');
  }

  function toggleTheme() {
    const nextTheme = 'dark' === getResolvedTheme() ? 'light' : 'dark';
    setStoredTheme(nextTheme);
    applyThemeState();
  }

  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
  }

  if (media) {
    const onSystemThemeChange = function () {
      if (!getStoredTheme()) {
        applyThemeState();
      }
    };

    if (media.addEventListener) {
      media.addEventListener('change', onSystemThemeChange);
    } else {
      media.addListener(onSystemThemeChange);
    }
  }

  applyThemeState();
})();
