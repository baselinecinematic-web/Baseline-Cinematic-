// Baseline Cinematic: one place that sends every booking form.
//
// 1. Posts the form to Formspree, which emails you the lead. The visitor only
//    sees the confirmation after Formspree answers 200 OK; anything else shows
//    an error with the call and text numbers.
// 2. Then passes the same lead to the Make.com webhook in the background, where
//    the Make scenario emails the client a confirmation. Make also gets the older
//    field names (service_needed, notes) so existing scenario mappings keep working.
//    To stop sending to Make, set MAKE_WEBHOOK to ''.
//
// Used by home.js (homepage + Commercial page form) and quote-builder.js.
// If you change the Formspree address, also change the matching action="" on the
// forms in index.html, commercial.html and quote-builder.js (used only when
// JavaScript is off).
(function () {
    'use strict';

    var FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvdljwd';
    var MAKE_WEBHOOK = 'https://hook.us2.make.com/8j75tewx8yk48zpdt55ibo6lu4sfssly';
    // 3. Adds the lead to the client portal's "New leads" list (baselinecinematic.com/portal).
    //    The key below is Supabase's public key: it can only add a lead, never read anything.
    var PORTAL_LEADS = 'https://temwrepdhydpsgwhugee.supabase.co/rest/v1/rpc/submit_lead';
    var PORTAL_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlbXdyZXBkaHlkcHNnd2h1Z2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMDAxMTksImV4cCI6MjExMDY3NjExOX0.ur2XzOTlN0fP6q2mBMGuUn2Cswor5VUKTERr7SGN248';

    function portalService(text) {
        var t = String(text || '').toLowerCase();
        if (/property|real estate|listing|drone|aerial|walkthrough/.test(t)) return 'real_estate';
        if (/social|retainer|reel/.test(t)) return 'social';
        if (/legacy|life|story|family|memorial/.test(t)) return 'legacy';
        return 'commercial';
    }

    function copyToPortal(form) {
        if (!PORTAL_LEADS) return;
        try {
            var d = new FormData(form), g = function (k) { return String(d.get(k) || '').trim(); };
            var total = g('quote_total'), msg = g('message');
            var lead = {
                name: g('name'), email: g('email'), phone: g('phone'),
                service: portalService(g('service') + ' ' + g('quote_summary')),
                project: g('business') || g('address') || g('service'),
                message: [total, msg].filter(Boolean).join('. '),
                quote: g('quote_summary'), shootDate: g('shoot_date'),
                source: g('source') || ('Website form on ' + location.pathname)
            };
            if (!lead.name || !(lead.email || lead.phone)) return;
            fetch(PORTAL_LEADS, {
                method: 'POST', keepalive: true,
                headers: { 'Content-Type': 'application/json', 'apikey': PORTAL_KEY, 'Authorization': 'Bearer ' + PORTAL_KEY },
                body: JSON.stringify({ p: lead })
            }).catch(function () {});
        } catch (e) { /* the email already went out; the portal copy is a bonus */ }
    }

    function copyToMake(form) {
        if (!MAKE_WEBHOOK) return;
        try {
            var data = new FormData(form);
            if (data.has('service') && !data.has('service_needed')) data.append('service_needed', data.get('service'));
            if (data.has('message') && !data.has('notes')) data.append('notes', data.get('message'));
            // Background copy: keepalive lets it finish even if the visitor leaves the page
            fetch(MAKE_WEBHOOK, { method: 'POST', body: data, mode: 'no-cors', keepalive: true }).catch(function () {});
        } catch (e) { /* the Formspree email already went out; nothing to show the visitor */ }
    }

    // Returns a promise that resolves once Formspree has accepted the lead,
    // and rejects with a readable message if it didn't.
    function send(form) {
        return fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        }).then(function (r) {
            if (r.ok) {
                var trap = form.elements._gotcha;
                if (!(trap && trap.value)) { copyToMake(form); copyToPortal(form); }   // skip spam bots
                return r;
            }
            return r.json().catch(function () { return {}; }).then(function (body) {
                var msg = body && body.errors && body.errors.map(function (e) { return e.message; }).join(' ');
                throw new Error(msg || ('Formspree answered ' + r.status));
            });
        });
    }

    window.BCForms = { send: send, endpoint: FORMSPREE_ENDPOINT };
})();
