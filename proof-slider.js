// Proof-of-concept Before / After sliders (homepage, Commercial, Real Estate).
//   - Drag anywhere on the picture (mouse, pen or finger) to move the gold handle
//   - Keyboard: Tab to the slider, then arrow keys / Home / End
//   - On first view, the handle nudges left and right once with a pulse,
//     so visitors know it moves (skipped for people who prefer less motion)
//   - Sends a proof_slider_used event to Google Analytics the first time each is used
// Markup + styles: .bc-ba-stage in site-v2.css (section 12). Load at the end of <body>.
(function () {
    'use strict';
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('[data-ba]').forEach(function (stage) {
        var range = stage.querySelector('.bc-ba-range');
        var name = stage.getAttribute('data-ba') || 'proof';
        var pos = 50, dragging = false, used = false, hintFrame = null;
        var start = null;

        function set(v) {
            pos = Math.max(0, Math.min(100, v));
            stage.style.setProperty('--pos', pos + '%');
            if (range) {
                range.value = Math.round(pos);
                range.setAttribute('aria-valuetext', Math.round(100 - pos) + '% of the after result showing');
            }
        }
        function markUsed() {
            if (hintFrame) { cancelAnimationFrame(hintFrame); hintFrame = null; }
            if (used) return;
            used = true;
            if (typeof window.gtag === 'function') window.gtag('event', 'proof_slider_used', { slider: name });
        }
        function pct(e) {
            var r = stage.getBoundingClientRect();
            return (e.clientX - r.left) / r.width * 100;
        }

        stage.addEventListener('pointerdown', function (e) {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            start = { x: e.clientX, y: e.clientY, id: e.pointerId, type: e.pointerType };
            if (e.pointerType !== 'touch') {           // mouse/pen: grab right away
                dragging = true;
                stage.classList.add('is-dragging');
                try { stage.setPointerCapture(e.pointerId); } catch (err) {}
                markUsed(); set(pct(e));
                e.preventDefault();
            }
        });
        stage.addEventListener('pointermove', function (e) {
            if (!start || e.pointerId !== start.id) return;
            if (!dragging) {                            // touch: only a sideways swipe moves it, so pages still scroll
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
            if (start && start.type === 'touch' && !dragging && e.type === 'pointerup') {
                markUsed(); set(pct(e));                // a tap jumps the handle there
            }
            dragging = false; start = null;
            stage.classList.remove('is-dragging');
        }
        stage.addEventListener('pointerup', end);
        stage.addEventListener('pointercancel', end);
        stage.addEventListener('lostpointercapture', function () { dragging = false; stage.classList.remove('is-dragging'); });

        if (range) {
            range.addEventListener('input', function () { markUsed(); set(+range.value); });
        }
        set(50);

        // One-time hint when the slider first scrolls into view
        if (!reduce && 'IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                if (!entries[0].isIntersecting) return;
                io.disconnect();
                if (used) return;
                stage.classList.add('is-hint');
                var keys = [[0, 50], [450, 64], [1050, 36], [1500, 50]], t0 = null;
                function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
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
                setTimeout(function () { if (!used) hintFrame = requestAnimationFrame(step); }, 350);
            }, { threshold: 0.55 });
            io.observe(stage);
        }
    });
})();
