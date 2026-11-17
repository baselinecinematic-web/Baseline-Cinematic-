// "Starting Base Packages + Available Upgrades" picker on the service pages.
// Markup: one [data-upgrades] block holding the base package, either as radios (name="bc-base")
// or as a <select data-base> whose options carry data-name, data-price, data-goal, data-from and
// data-monthly, plus upgrade checkboxes (data-price or data-price="custom", data-up, optional
// data-for, data-group). Elements with data-show-for="pkg pkg" show only for those packages.
// Shows a running estimate and hands the selection to the full quote builder:
//   quote.html?goal=…&pkg=…&up=drone,reel1,…
(function () {
    'use strict';
    document.querySelectorAll('[data-upgrades]').forEach(function (box) {
        var goal = box.getAttribute('data-goal');
        var bases = box.querySelectorAll('input[name="bc-base"]');
        var select = box.querySelector('select[data-base]');
        function currentBase() { return select ? select.options[select.selectedIndex] : box.querySelector('input[name="bc-base"]:checked'); }
        var ups = box.querySelectorAll('input[data-up]');
        var list = box.querySelector('[data-est-lines]'), total = box.querySelector('[data-est-total]');
        var label = box.querySelector('[data-est-label]'), go = box.querySelector('[data-est-go]');

        function usd(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
        function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

        function update() {
            var base = currentBase();
            var key = base ? base.value : '';
            var monthly = base && base.hasAttribute('data-monthly');
            // Show only the upgrades that fit the chosen package
            ups.forEach(function (u) {
                var fits = !u.hasAttribute('data-for') || u.getAttribute('data-for').split(' ').indexOf(key) > -1;
                var row = u.closest('.bc-up');
                row.hidden = !fits;
                if (!fits) u.checked = false;
            });
            // Founding Client Rate: promo-check.js marks the page while the launch price is live
            var promo = base && base.hasAttribute('data-promo-price') && document.documentElement.classList.contains('promo-active');
            box.querySelectorAll('[data-show-for]').forEach(function (el) {
                el.hidden = el.getAttribute('data-show-for').split(' ').indexOf(key) === -1;
            });
            var sum = base ? +(promo ? base.getAttribute('data-promo-price') : base.getAttribute('data-price')) : 0, rows = [], picked = [];
            if (base) rows.push([base.getAttribute('data-name') + (promo ? ' (Founding Client Rate)' : ''), usd(sum) + (monthly ? '/mo' : '')]);
            ups.forEach(function (u) {
                if (!u.checked) return;
                if (u.getAttribute('data-price') === 'custom') {   // priced with the client, not added to the total
                    picked.push(u.getAttribute('data-up'));
                    rows.push([u.getAttribute('data-name'), 'Quoted with you']);
                    return;
                }
                var p = +u.getAttribute('data-price');
                sum += p;
                picked.push(u.getAttribute('data-up'));
                rows.push([u.getAttribute('data-name'), '+' + usd(p) + (monthly ? '/mo' : '')]);
            });
            list.innerHTML = rows.map(function (r) { return '<li><span>' + esc(r[0]) + '</span><span>' + esc(r[1]) + '</span></li>'; }).join('');
            total.textContent = usd(sum) + (monthly ? '/mo' : '');
            label.textContent = base && base.hasAttribute('data-from') ? 'Starting estimate' : (monthly ? 'Per month' : 'Estimate');

            // Retainer tier upgrades swap the package instead of adding a line in the builder
            var pkg = key, tier = picked.filter(function (p) { return p.indexOf('tier-') === 0; })[0];
            if (tier) pkg = tier.replace('tier-', '');
            var q = new URLSearchParams({ goal: base && base.getAttribute('data-goal') || goal, pkg: pkg });
            var rest = picked.filter(function (p) { return p.indexOf('tier-') !== 0; });
            if (rest.length) q.set('up', rest.join(','));
            go.href = 'quote.html?' + q.toString();
        }

        // Tier upgrades (Growth / Full Partner) can't both be on
        ups.forEach(function (u) {
            u.addEventListener('change', function () {
                var g = u.getAttribute('data-group');
                if (g && u.checked) ups.forEach(function (o) { if (o !== u && o.getAttribute('data-group') === g) o.checked = false; });
                update();
            });
        });
        bases.forEach(function (b) { b.addEventListener('change', update); });
        if (select) select.addEventListener('change', update);
        go.addEventListener('click', function () {
            if (typeof window.gtag === 'function') window.gtag('event', 'upgrades_to_quote', { goal: goal });
        });
        update();
    });
})();
