(function () {
  var storageKey = "specdd-theme";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function getStoredTheme() {
    try {
      var value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
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
    return media && media.matches ? "dark" : "light";
  }

  function getResolvedTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyThemeState() {
    var storedTheme = getStoredTheme();
    var resolvedTheme = storedTheme || getSystemTheme();

    if (storedTheme) {
      root.dataset.theme = storedTheme;
    } else {
      root.removeAttribute("data-theme");
    }

    root.dataset.resolvedTheme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;

    if (!toggle) return;

    var nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    var label = "Switch to " + nextTheme + " theme";

    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
    toggle.setAttribute("aria-pressed", resolvedTheme === "dark" ? "true" : "false");
  }

  function toggleTheme() {
    var nextTheme = getResolvedTheme() === "dark" ? "light" : "dark";
    setStoredTheme(nextTheme);
    applyThemeState();
  }

  if (toggle) toggle.addEventListener("click", toggleTheme);

  if (media) {
    var onSystemThemeChange = function () {
      if (!getStoredTheme()) applyThemeState();
    };

    if (media.addEventListener) {
      media.addEventListener("change", onSystemThemeChange);
    } else {
      media.addListener(onSystemThemeChange);
    }
  }

  applyThemeState();
})();
