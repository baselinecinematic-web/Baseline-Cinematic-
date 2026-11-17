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
                if (!(trap && trap.value)) copyToMake(form);   // skip spam bots
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
