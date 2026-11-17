// Baseline Cinematic homepage: before/after slider, click-to-play videos, booking form.
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

    /* ---------- Booking form ---------- */
    var form = document.getElementById('book-form');
    if (!form) return;
    var voucherOn = (typeof FIRST_TIME_REEL_PROMO_ACTIVE === 'undefined') ? true : !!FIRST_TIME_REEL_PROMO_ACTIVE;
    var voucherBox = document.getElementById('b-voucher'), voucherField = document.getElementById('b-voucher-field');
    var err = document.getElementById('book-error'), ok = document.getElementById('book-ok'), send = document.getElementById('book-send');

    if (!voucherOn) document.getElementById('book-voucher').hidden = true;

    // Dates can't be in the past
    var d = new Date(), dateInput = document.getElementById('b-date');
    dateInput.min = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

    // "Check Our Dates" and "Ready to Get Noticed?" buttons on this page: scroll, then put the cursor in the right place
    document.querySelectorAll('a[href="#contact"]').forEach(function (a) {
        a.addEventListener('click', function () {
            var target = a.hasAttribute('data-check-dates') ? dateInput : form.querySelector('input[name="service_needed"]');
            setTimeout(function () { try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); } }, 650);
        });
    });

    function showError(msg) { err.innerHTML = msg; err.hidden = !msg; }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        showError('');
        var type = form.querySelector('input[name="service_needed"]:checked');
        if (!type) { showError('Pick what we\'re filming so we can send the right quote.'); form.querySelector('input[name="service_needed"]').focus(); return; }
        if (!form.elements.name.value.trim()) { showError('Add your name so we know who to reply to.'); form.elements.name.focus(); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements.email.value.trim())) { showError('Add an email address we can reply to.'); form.elements.email.focus(); return; }

        voucherField.value = !voucherOn ? 'Not offered (promo off)'
            : voucherBox.checked ? 'REQUESTED: verify new-client status before confirming' : 'Not requested';
        document.getElementById('b-subject').value = 'Check our dates: ' + type.parentNode.textContent.trim() +
            ' from ' + form.elements.name.value.trim() + (voucherBox.checked && voucherOn ? ' (free reel voucher requested)' : '');

        send.disabled = true; send.textContent = 'Sending…';
        fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
            .then(function (r) {
                if (!r.ok) throw new Error('bad response');
                if (window.trackLead) window.trackLead(form);
                form.hidden = true;
                ok.hidden = false;
                ok.scrollIntoView({ block: 'center' });
            })
            .catch(function () {
                send.disabled = false; send.textContent = 'Check Our Dates';
                showError('Your request didn\'t go through. Try again, or call <a href="tel:+13098635181">(309) 863-5181</a> / text <a href="sms:+13098635089">(309) 863-5089</a>.');
            });
    });
})();
