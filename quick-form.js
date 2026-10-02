// Sends the short "Check availability" form near the top of the homepage to the
// same Make.com webhook the full contact form uses, and counts it as a lead.
(function () {
  var form = document.getElementById('quick-form');
  var ok = document.getElementById('quick-success');
  if (!form || !ok) return;
  var busy = false;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    busy = true;
    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    fetch(form.action, { method: 'POST', body: new FormData(form) })
      .then(function (r) {
        if (!r.ok) throw new Error('bad response');
        if (window.trackLead) window.trackLead(form);
        form.style.display = 'none';
        ok.style.display = 'block';
      })
      .catch(function () {
        busy = false;
        if (btn) btn.disabled = false;
        alert('There was an issue submitting your request. Please call us at (309) 863-5181.');
      });
  });
})();
