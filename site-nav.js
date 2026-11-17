// Baseline Cinematic — header behavior shared by every page.
//   - Opens and closes the ☰ menu drawer (button, backdrop, Esc key), keeps keyboard focus inside it
//   - Marks the current page in the drawer
//   - Measures the fixed header so pages can leave room for it (CSS variable --nav-h)
// Markup: .bc-top (header), .bc-burger (☰ button), #bc-drawer (drawer). Load at the end of <body>.
(function () {
    'use strict';
    var root = document.documentElement;
    var top = document.querySelector('.bc-top');
    var burger = document.querySelector('.bc-burger');
    var drawer = document.getElementById('bc-drawer');

    function measure() { if (top) root.style.setProperty('--nav-h', top.offsetHeight + 'px'); }
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    if (!burger || !drawer) return;
    var panel = drawer.querySelector('.bc-drawer-panel');
    var lastFocus = null;

    // Current page
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    drawer.querySelectorAll('nav a').forEach(function (a) {
        var file = (a.getAttribute('href') || '').split('#')[0].split('?')[0].toLowerCase();
        if (file && file === here) a.setAttribute('aria-current', 'page');
    });

    function focusables() {
        return Array.prototype.filter.call(panel.querySelectorAll('a[href], button:not([disabled])'), function (el) { return el.offsetParent !== null; });
    }
    function open() {
        lastFocus = document.activeElement;
        drawer.hidden = false;
        root.classList.add('bc-drawer-open');
        burger.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(function () {
            drawer.classList.add('is-open');
            var f = focusables(); if (f[0]) f[0].focus();
        });
    }
    function close(returnFocus) {
        drawer.classList.remove('is-open');
        root.classList.remove('bc-drawer-open');
        burger.setAttribute('aria-expanded', 'false');
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setTimeout(function () { if (!drawer.classList.contains('is-open')) drawer.hidden = true; }, reduce ? 0 : 240);
        if (returnFocus !== false && lastFocus && lastFocus.focus) lastFocus.focus();
    }
    burger.addEventListener('click', function () { if (drawer.hidden) open(); else close(); });
    drawer.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) { close(); return; }
        var link = e.target.closest('a[href]');
        if (link) close(false);   // following a link: let the page move on
    });
    document.addEventListener('keydown', function (e) {
        if (drawer.hidden) return;
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'Tab') {
            var f = focusables(); if (!f.length) return;
            var first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
})();
