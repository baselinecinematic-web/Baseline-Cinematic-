// Click (or press Enter on) any photo in the aerial gallery to view it large.
// Click anywhere, or press Escape, to close.
(function () {
  var imgs = document.querySelectorAll('.photo-gallery .photo-tile img');
  if (!imgs.length) return;
  var overlay = document.createElement('div');
  overlay.className = 'photo-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Enlarged photo');
  var big = document.createElement('img');
  overlay.appendChild(big);
  document.body.appendChild(overlay);
  function open(img) {
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'gallery_photo_open', { photo: (img.getAttribute('src') || '').replace('.jpg', '') });
    }
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  imgs.forEach(function (img) {
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
