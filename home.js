// Baseline Cinematic homepage: before/after slider and click-to-play videos.
(function () {
    'use strict';

    /* ---------- Before / after slider ---------- */
    var cmp = document.getElementById('bc-compare');
    if (cmp) {
        var range = cmp.querySelector('input[type=range]'), used = false;
        var set = function (v) { cmp.style.setProperty('--pos', v + '%'); };
        range.addEventListener('input', function () {
            set(range.value);
            if (!used) { used = true; if (typeof window.gtag === 'function') window.gtag('event', 'difference_slider_used'); }
        });
        set(range.value);
    }

    /* ---------- Featured work: show a thumbnail, load YouTube only when played ---------- */
    document.querySelectorAll('.bc-yt[data-yt]').forEach(function (btn) {
        var id = btn.getAttribute('data-yt');
        btn.style.backgroundImage = 'url("https://i.ytimg.com/vi/' + id + '/hqdefault.jpg")';
        btn.addEventListener('click', function () {
            var f = document.createElement('iframe');
            f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
            f.title = btn.getAttribute('aria-label').replace(/^Play: /, '');
            f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            f.allowFullscreen = true;
            var holder = document.createElement('div');
            holder.className = 'bc-yt';
            holder.appendChild(f);
            btn.replaceWith(holder);
            f.focus();
            if (typeof window.gtag === 'function') window.gtag('event', 'portfolio_video_play', { video_id: id });
        });
    });

    // Booking now happens only on the Build a Quote page (quote.html + quote-builder.js).
})();
