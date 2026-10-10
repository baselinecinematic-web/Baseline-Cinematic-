(function () {
  var frame = document.querySelector('.gc-frame');
  if (!frame) return;
  var input = frame.querySelector('input[type=range]');
  var used = false;
  function set(v) { frame.style.setProperty('--pos', v + '%'); }
  input.addEventListener('input', function () {
    set(input.value);
    if (!used) {
      used = true;
      try { if (window.gtag) gtag('event', 'grade_slider_used'); } catch (e) {}
    }
  });
  set(input.value);
})();
