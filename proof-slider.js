// Proof-of-concept Before / After sliders (homepage, Commercial, Real Estate) + KPI strip.
//   - Drag anywhere on the card (mouse, pen or finger) to move the gold handle;
//     on phones only a sideways swipe moves it, so the page still scrolls
//   - Keyboard: Tab to the slider, then arrow keys / Home / End
//   - First time a slider scrolls into view, the handle nudges left and right
//     once with a gold pulse so visitors know it moves
//   - Big numbers marked data-count count up the first time they're seen
//   - "View the original screenshots" opens the real screenshots in a pop-up
//   - Google Analytics events: proof_slider_used, proof_screenshots_opened
// Everything is skipped or shortened for visitors who prefer less motion.
// Markup + styles: .bc-ba-* in site-v2.css (section 12). Load at the end of <body>.
(function () {
    'use strict';
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasIO = 'IntersectionObserver' in window;
    function track(name, params) { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); }
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    /* ---------- Sliders ---------- */
    document.querySelectorAll('[data-ba]').forEach(function (stage) {
        var range = stage.querySelector('.bc-ba-range');
        var name = stage.getAttribute('data-ba') || 'proof';
        var pos = 50, dragging = false, used = false, hintFrame = null, start = null;

        function set(v) {
            pos = Math.max(0, Math.min(100, v));
            stage.style.setProperty('--pos', pos + '%');
            if (range) {
                range.value = Math.round(pos);
                range.setAttribute('aria-valuetext', Math.round(100 - pos) + '% of the after side showing');
            }
        }
        function markUsed() {
            if (hintFrame) { cancelAnimationFrame(hintFrame); hintFrame = null; }
            if (used) return;
            used = true;
            stage.classList.add('is-used');
            track('proof_slider_used', { slider: name });
        }
        function pct(e) {
            var r = stage.getBoundingClientRect();
            return (e.clientX - r.left) / r.width * 100;
        }

        stage.addEventListener('pointerdown', function (e) {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            start = { x: e.clientX, y: e.clientY, id: e.pointerId, type: e.pointerType };
            if (e.pointerType !== 'touch') {
                dragging = true;
                stage.classList.add('is-dragging');
                try { stage.setPointerCapture(e.pointerId); } catch (err) {}
                markUsed(); set(pct(e));
                e.preventDefault();
            }
        });
        stage.addEventListener('pointermove', function (e) {
            if (!start || e.pointerId !== start.id) return;
            if (!dragging) {
                var dx = Math.abs(e.clientX - start.x), dy = Math.abs(e.clientY - start.y);
                if (dx < 6 || dx < dy) return;
                dragging = true;
                stage.classList.add('is-dragging');
                try { stage.setPointerCapture(e.pointerId); } catch (err) {}
                markUsed();
            }
            set(pct(e));
        });
        function end(e) {
            if (start && start.type === 'touch' && !dragging && e.type === 'pointerup') { markUsed(); set(pct(e)); }
            dragging = false; start = null;
            stage.classList.remove('is-dragging');
        }
        stage.addEventListener('pointerup', end);
        stage.addEventListener('pointercancel', end);
        stage.addEventListener('lostpointercapture', function () { dragging = false; stage.classList.remove('is-dragging'); });
        if (range) range.addEventListener('input', function () { markUsed(); set(+range.value); });
        set(50);

        if (!reduce && hasIO) {
            var io = new IntersectionObserver(function (entries) {
                if (!entries[0].isIntersecting) return;
                io.disconnect();
                if (used) return;
                stage.classList.add('is-hint');
                var keys = [[0, 50], [500, 66], [1150, 34], [1650, 50]], t0 = null;
                function step(ts) {
                    if (used) return;
                    if (t0 === null) t0 = ts;
                    var t = ts - t0, i = 1;
                    while (i < keys.length - 1 && t > keys[i][0]) i++;
                    var a = keys[i - 1], b = keys[i];
                    var p = Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0])));
                    set(a[1] + (b[1] - a[1]) * ease(p));
                    if (t < keys[keys.length - 1][0]) hintFrame = requestAnimationFrame(step);
                    else { hintFrame = null; set(50); }
                }
                setTimeout(function () { if (!used) hintFrame = requestAnimationFrame(step); }, 600);
            }, { threshold: 0.5 });
            io.observe(stage);
        }
    });

    /* ---------- Count-up numbers ---------- */
    function fmt(v, target, suffix) {
        if (target >= 1000) {
            var k = v / 1000;
            return (target % 1000 === 0 ? Math.round(k) : k.toFixed(1)) + (suffix || 'K');
        }
        return Math.round(v) + (suffix || '');
    }
    var counters = document.querySelectorAll('[data-count]');
    if (!reduce && hasIO && counters.length) {
        var cio = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                cio.unobserve(en.target);
                var el = en.target, target = parseFloat(el.getAttribute('data-count')), suffix = el.getAttribute('data-suffix');
                var final = el.textContent, t0 = null, dur = 1500;
                function tick(ts) {
                    if (t0 === null) t0 = ts;
                    var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
                    el.textContent = p < 1 ? fmt(target * e, target, suffix) : final;
                    if (p < 1) requestAnimationFrame(tick);
                }
                el.textContent = fmt(0, target, suffix);
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.6 });
        counters.forEach(function (el) { cio.observe(el); });
    }

    /* ---------- Original screenshots pop-up ---------- */
    var dialog = null, lastFocus = null;
    function closeDialog() {
        if (!dialog) return;
        if (dialog.open && dialog.close) dialog.close(); else dialog.removeAttribute('open');
    }
    function ensureDialog() {
        if (dialog) return dialog;
        dialog = document.createElement('dialog');
        dialog.className = 'bc-ba-dialog';
        dialog.setAttribute('aria-labelledby', 'bc-ba-dialog-title');
        dialog.innerHTML = '<div class="bc-ba-dialog-head"><h3 id="bc-ba-dialog-title"></h3>' +
            '<button type="button" class="bc-ba-dialog-close" aria-label="Close">&times;</button></div><div class="bc-ba-dialog-body"></div>';
        document.body.appendChild(dialog);
        dialog.querySelector('.bc-ba-dialog-close').addEventListener('click', closeDialog);
        dialog.addEventListener('click', function (e) { if (e.target === dialog) closeDialog(); });
        dialog.addEventListener('close', function () {
            document.documentElement.classList.remove('bc-ba-dialog-open');
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        });
        return dialog;
    }
    document.querySelectorAll('[data-ba-open]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var tpl = btn.closest('figure').querySelector('template.bc-ba-receipts');
            if (!tpl) return;
            var d = ensureDialog();
            lastFocus = btn;
            d.querySelector('#bc-ba-dialog-title').textContent = 'Original screenshots: ' + (tpl.getAttribute('data-title') || '');
            var body = d.querySelector('.bc-ba-dialog-body');
            body.innerHTML = '';
            body.appendChild(tpl.content.cloneNode(true));
            body.classList.toggle('is-single', body.querySelectorAll('figure').length === 1);
            document.documentElement.classList.add('bc-ba-dialog-open');
            if (d.showModal) d.showModal(); else d.setAttribute('open', '');
            d.querySelector('.bc-ba-dialog-close').focus();
            track('proof_screenshots_opened', { slider: (btn.closest('figure').querySelector('[data-ba]') || {}).getAttribute ? btn.closest('figure').querySelector('[data-ba]').getAttribute('data-ba') : '' });
        });
    });
})();
