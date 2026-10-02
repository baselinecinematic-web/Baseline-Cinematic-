// Photo viewer for the aerial galleries.
// Tap/click a photo to open it full screen, then move through every photo
// without closing: swipe left/right, use the on-screen arrows, or press the
// left/right arrow keys. Escape, the X button, or tapping the dark area closes it.
// Photos listed in a hidden .gallery-extras block join the viewer too, so a
// short strip on the page can still lead to the full set.
(function () {
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.photo-gallery .photo-tile img'));
  if (!thumbs.length) return;

  // Build the list of photos: every visible one, then the hidden extras.
  var photos = thumbs.map(function (img) {
    return { src: img.getAttribute('src'), alt: img.alt };
  });
  document.querySelectorAll('.gallery-extras img').forEach(function (img) {
    photos.push({ src: img.getAttribute('data-src'), alt: img.alt });
  });

  var overlay = document.createElement('div');
  overlay.className = 'photo-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Photo viewer');
  overlay.innerHTML =
    '<button type="button" class="lb-btn lb-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="Previous photo">&#8249;</button>' +
    '<img class="lb-img" alt="">' +
    '<button type="button" class="lb-btn lb-next" aria-label="Next photo">&#8250;</button>' +
    '<div class="lb-count" aria-live="polite"></div>';
  document.body.appendChild(overlay);

  var big = overlay.querySelector('.lb-img');
  var count = overlay.querySelector('.lb-count');
  var index = 0;
  var isOpen = false;
  var lastFocus = null;

  function preload(i) {
    var p = photos[(i + photos.length) % photos.length];
    var im = new Image();
    im.src = p.src;
  }

  function show(i, direction) {
    index = (i + photos.length) % photos.length;
    var p = photos[index];
    big.classList.remove('lb-in-left', 'lb-in-right');
    big.src = p.src;
    big.alt = p.alt;
    count.textContent = (index + 1) + ' / ' + photos.length;
    if (direction) {
      void big.offsetWidth; // restart the slide-in animation
      big.classList.add(direction > 0 ? 'lb-in-right' : 'lb-in-left');
    }
    preload(index + 1);
    preload(index - 1);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'gallery_photo_open', { photo: p.src.replace('.jpg', '') });
    }
  }

  function open(i) {
    lastFocus = document.activeElement;
    isOpen = true;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    show(i, 0);
    overlay.querySelector('.lb-close').focus();
  }

  function close() {
    isOpen = false;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function next() { show(index + 1, 1); }
  function prev() { show(index - 1, -1); }

  thumbs.forEach(function (img, i) {
    img.addEventListener('click', function () { open(i); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  overlay.querySelector('.lb-close').addEventListener('click', close);
  overlay.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); next(); });
  overlay.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  // Tapping the dark area closes; tapping the photo itself does nothing.
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });

  // Swipe: a mostly-horizontal drag of 50px or more changes photo.
  var startX = 0, startY = 0, tracking = false;
  overlay.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { tracking = false; return; }
    tracking = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  overlay.addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;
    var t = e.changedTouches[0];
    var dx = t.clientX - startX, dy = t.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });
})();
