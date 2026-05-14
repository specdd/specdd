(function () {
  if (!window.hljs) return;

  var sectionLabels = [
    ["Spec", "spec", "sdd-title"],
    ["Platform", "platform", "sdd-meta"],
    ["Purpose", "purpose", "sdd-section-value"],
    ["Structure", "structure", "sdd-section-value"],
    ["Owns", "owns", "sdd-section-value"],
    ["Can modify", "can-modify", "sdd-section-value"],
    ["Can read", "can-read", "sdd-section-value"],
    ["References", "references", "sdd-section-value"],
    ["Must", "must", "sdd-section-value"],
    ["Must not", "must-not", "sdd-section-value"],
    ["Depends on", "depends-on", "sdd-section-value"],
    ["Forbids", "forbids", "sdd-section-value"],
    ["Exposes", "exposes", "sdd-section-value"],
    ["Accepts", "accepts", "sdd-section-value"],
    ["Returns", "returns", "sdd-section-value"],
    ["Raises", "raises", "sdd-section-value"],
    ["Handles", "handles", "sdd-section-value"],
    ["Tasks", "tasks", "sdd-section-value"],
    ["Scenario", "scenario", "sdd-title"],
    ["Example", "example", "sdd-section-value"],
    ["Done when", "done-when", "sdd-section-value"]
  ];

  function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function sectionMode(label, slug, valueScope) {
    return {
      begin: [
        /(?:^|\n)/,
        /\s*/,
        new RegExp(escapeRegex(label)),
        /:/,
        /[^\n\r]*/
      ],
      beginScope: {
        3: "sdd-section-" + slug,
        4: "punctuation",
        5: valueScope
      },
      relevance: label === "Spec" || label === "Scenario" ? 8 : 5
    };
  }

  function specddLanguage() {
    var sectionModes = sectionLabels.map(function (item) {
      return sectionMode(item[0], item[1], item[2]);
    });

    var taskModes = [
      {
        begin: [/(?:^|\n)/, /\s*/, /\[[xX]\]/, /\s*/, /(?:#\d+)?/],
        beginScope: { 3: "sdd-task-done", 5: "sdd-task-id" },
        relevance: 7
      },
      {
        begin: [/(?:^|\n)/, /\s*/, /\[\s\]/, /\s*/, /(?:#\d+)?/],
        beginScope: { 3: "sdd-task-open", 5: "sdd-task-id" },
        relevance: 7
      },
      {
        begin: [/(?:^|\n)/, /\s*/, /\[!\]/, /\s*/, /(?:#\d+)?/],
        beginScope: { 3: "sdd-task-blocked", 5: "sdd-task-id" },
        relevance: 7
      },
      {
        begin: [/(?:^|\n)/, /\s*/, /\[\?\]/, /\s*/, /(?:#\d+)?/],
        beginScope: { 3: "sdd-task-question", 5: "sdd-task-id" },
        relevance: 7
      },
      {
        begin: [/(?:^|\n)/, /\s*/, /\[-\]/, /\s*/, /(?:#\d+)?/],
        beginScope: { 3: "sdd-task-skipped", 5: "sdd-task-id" },
        relevance: 7
      }
    ];

    return {
      name: "SpecDD",
      aliases: ["sdd"],
      disableAutodetect: true,
      contains: [
        {
          begin: [/(?:^|\n)/, /\s*/, /#[^\n\r]*/],
          beginScope: { 3: "comment" },
          relevance: 4
        }
      ].concat(sectionModes, taskModes, [
        {
          begin: [
            /(?:^|\n)/,
            /\s*/,
            /(?:Given|When|Then|And|But)\b/,
            /[^\n\r]*/
          ],
          beginScope: {
            3: "sdd-step",
            4: "sdd-text"
          },
          relevance: 6
        },
        {
          begin: /#\d+\b/,
          scope: "sdd-task-id",
          relevance: 3
        },
        {
          begin: /(?:\.{1,2}\/)?[A-Za-z0-9_*.-]+(?:\/[A-Za-z0-9_*.-]+)+|[A-Za-z0-9_.-]+\.(?:sdd|js|ts|tsx|jsx|py|go|rs|java|cs|rb|php|md|json|ya?ml|toml|css|html)\b/,
          scope: "sdd-path",
          relevance: 3
        },
        {
          begin: /\b[A-Z][A-Za-z0-9_]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)+(?:\([^)]*\))?/,
          scope: "sdd-symbol",
          relevance: 2
        }
      ])
    };
  }

  function looksLikeSpecDD(text) {
    var sectionCount = 0;
    var sectionPattern = /^\s*(Spec|Platform|Purpose|Structure|Owns|Can modify|Can read|References|Must|Must not|Depends on|Forbids|Exposes|Accepts|Returns|Raises|Handles|Tasks|Scenario|Example|Done when):/;
    var lines = text.split(/\r?\n/);

    for (var i = 0; i < lines.length; i += 1) {
      if (sectionPattern.test(lines[i])) sectionCount += 1;
      if (sectionCount >= 2) return true;
    }

    return sectionCount === 1 && /^\s*(\[[ xX!\?-]\]|Given|When|Then|And|But)\b/m.test(text);
  }

  function highlightSpecDD() {
    var blocks = document.querySelectorAll("pre code.language-sdd, pre code.language-specdd, pre code.language-text");

    blocks.forEach(function (block) {
      if (
        !block.classList.contains("language-specdd") &&
        !block.classList.contains("language-sdd") &&
        !looksLikeSpecDD(block.textContent)
      ) {
        return;
      }

      block.textContent = block.textContent;
      block.removeAttribute("data-highlighted");
      block.classList.remove("language-text");
      block.classList.add("language-specdd");
      block.parentElement.classList.add("sdd-pre");
      window.hljs.highlightElement(block);
    });
  }

  window.hljs.registerLanguage("specdd", specddLanguage);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", highlightSpecDD);
  } else {
    highlightSpecDD();
  }
})();
