// Adds the .promo-active class to <html> while the launch promo is live.
// Must load AFTER site-data.js and run synchronously (no async/defer) so
// the class is set before the page paints — the CSS in each page's
// <style> block reads this class to swap promo vs. evergreen content.
(function () {
  var promo = window.SITE_DATA && window.SITE_DATA.promo;
  if (!promo || !promo.endDateISO) return;
  if (new Date() < new Date(promo.endDateISO)) {
    document.documentElement.classList.add('promo-active');
  }
})();
