(function () {
  'use strict';

  function openSearchModal(trigger) {
    if ('function' === typeof trigger.openModal) {
      trigger.openModal();
      return;
    }

    if (trigger.buttonEl && 'function' === typeof trigger.buttonEl.click) {
      trigger.buttonEl.click();
      return;
    }

    trigger.click();
  }

  function openSearch() {
    const trigger = document.querySelector('pagefind-modal-trigger');

    if (!trigger) {
      return;
    }

    if (window.customElements && customElements.whenDefined) {
      customElements.whenDefined('pagefind-modal-trigger').then(function () {
        openSearchModal(trigger);
      });
      return;
    }

    openSearchModal(trigger);
  }

  document.querySelectorAll('[data-site-search-trigger]').forEach(function (button) {
    button.addEventListener('click', openSearch);
  });
})();
