// Golden Cinema Ticket (the gold-rimmed promo pass right above the footer).
//   - "Copy Code" button copies the promo code (BASELINE75) and confirms on screen
//   - Sends ticket_code_copy / ticket_quote_click events to Google Analytics
// The ticket's Ready to Be Seen button links to quote.html?promo=BASELINE75, where the
// quote builder switches on the free vertical reel automatically.
// Markup + styles: .bc-ticket in site-v2.css (section 11). Load at the end of <body>.
(function () {
    'use strict';

    function track(name, params) {
        if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.top = '-1000px';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            var ok = false;
            try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
            document.body.removeChild(ta);
            if (ok) resolve(); else reject(new Error('copy failed'));
        });
    }

    document.querySelectorAll('[data-ticket]').forEach(function (ticket) {
        var btn = ticket.querySelector('[data-copy-code]');
        var label = btn && btn.querySelector('.bc-ticket-copy-label');
        var status = ticket.querySelector('.bc-ticket-status');
        var timer = null;

        if (btn) {
            btn.addEventListener('click', function () {
                var code = btn.getAttribute('data-copy-code');
                copyText(code).then(function () {
                    btn.classList.add('is-copied');
                    if (label) label.textContent = 'Copied';
                    if (status) status.textContent = code + ' copied. Tap Ready to Be Seen and it\'s applied for you.';
                    track('ticket_code_copy', { promo_code: code });
                }, function () {
                    if (status) status.textContent = 'Couldn\'t copy. Your code is ' + code + '.';
                }).then(function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        btn.classList.remove('is-copied');
                        if (label) label.textContent = 'Copy Code';
                    }, 2400);
                });
            });
        }

        var cta = ticket.querySelector('.bc-btn-quote');
        if (cta) {
            cta.addEventListener('click', function () {
                track('ticket_quote_click', { promo_code: 'BASELINE75', page: location.pathname });
            });
        }
    });
})();
