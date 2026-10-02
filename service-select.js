// Buttons on the pricing cards carry a data-service value. Clicking one picks
// that service in the contact form's dropdown, then the link scrolls to the form.
(function () {
  var select = document.querySelector('select[name="service_needed"]');
  if (!select) return;
  document.querySelectorAll('a[data-service]').forEach(function (a) {
    a.addEventListener('click', function () {
      var want = a.getAttribute('data-service');
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value === want) { select.selectedIndex = i; break; }
      }
    });
  });
})();
