(function () {
  'use strict';

  const copyTimers = new WeakMap();

  function resolvePermalink(button) {
    const path = button.getAttribute('data-permalink-path');
    const fallback = button.getAttribute('data-permalink-url') || '';

    if (!path) {
      return fallback;
    }

    try {
      return new URL(path, window.location.origin).href;
    } catch (error) {
      return fallback;
    }
  }

  function copyWithFallback(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return copyWithTextarea(text);
      });
    }

    return copyWithTextarea(text);
  }

  function copyWithTextarea(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    textarea.style.left = '-1000px';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function markCopied(button, permalink) {
    button.setAttribute('data-copy-state', 'copied');
    button.setAttribute('aria-label', 'Copied permalink: ' + permalink);

    window.clearTimeout(copyTimers.get(button));

    const timer = window.setTimeout(function () {
      button.removeAttribute('data-copy-state');
      button.setAttribute('aria-label', 'Copy permalink: ' + permalink);
      copyTimers.delete(button);
    }, 1400);

    copyTimers.set(button, timer);
  }

  function initButton(button) {
    const permalink = resolvePermalink(button);

    if (!permalink) {
      return;
    }

    button.title = permalink;
    button.setAttribute('aria-label', 'Copy permalink: ' + permalink);

    button.addEventListener('click', function () {
      copyWithFallback(permalink).then(function () {
        markCopied(button, permalink);
      });
    });
  }

  document.querySelectorAll('.how-to-permalink-button').forEach(initButton);
})();
