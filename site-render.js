// Fills in every element on the page that has a data-field (text content)
// or data-href-field (link target) attribute, using the values in
// site-data.js. Load this AFTER site-data.js and place it at the end of
// <body> so it runs once the elements it fills in already exist.
//
// A value can reference another value with {{dot.path}} — e.g.
// "Delivered in {{delivery.turnaroundBadge}}" — and that gets resolved
// automatically. If a field is missing, the element is left exactly as
// written in the HTML, so pages degrade gracefully if this script can't
// run for any reason.
(function () {
  function resolvePath(path, data) {
    return path.split('.').reduce(function (acc, key) {
      return (acc && acc[key] !== undefined) ? acc[key] : undefined;
    }, data);
  }

  function interpolate(value, data) {
    if (typeof value !== 'string') return value;
    return value.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function (match, path) {
      var resolved = resolvePath(path, data);
      return (resolved !== undefined) ? interpolate(resolved, data) : match;
    });
  }

  function applySiteData() {
    var data = window.SITE_DATA;
    if (!data) return;

    document.querySelectorAll('[data-field]').forEach(function (el) {
      var raw = resolvePath(el.getAttribute('data-field'), data);
      if (raw !== undefined) {
        el.textContent = interpolate(raw, data);
      }
    });

    document.querySelectorAll('[data-href-field]').forEach(function (el) {
      var raw = resolvePath(el.getAttribute('data-href-field'), data);
      if (raw !== undefined) {
        el.setAttribute('href', interpolate(raw, data));
      }
    });
  }

  applySiteData();
})();
