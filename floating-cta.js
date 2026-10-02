// Floating "Book a Shoot" button that follows visitors down the page, so
// getting in touch never depends on scrolling all the way to the form.
//
// - Appears once the hero (the big video at the top) is scrolled past
// - Hides again while the contact form is on screen (it's not needed there)
// - Jumps to the #contact section when tapped
// - Sends a "book_button_click" event to Google Analytics, so you can see
//   how often it gets used
//
// Styles live in site-ui.css (section 6). Load this at the end of <body>.
// Pages without a #contact section don't get the button.
(function () {
  var contact = document.getElementById('contact');
  if (!contact || !('IntersectionObserver' in window)) return;

  var button = document.createElement('a');
  button.href = '#contact';
  button.className = 'floating-cta';
  button.textContent = 'Book a Shoot';
  button.setAttribute('aria-label', 'Book a shoot: jump to the contact form');
  document.body.appendChild(button);

  var pastHero = false;
  var atContact = false;
  function update() {
    var show = pastHero && !atContact;
    button.classList.toggle('is-visible', show);
    button.tabIndex = show ? 0 : -1;
    button.setAttribute('aria-hidden', show ? 'false' : 'true');
  }

  var hero = document.querySelector('header');
  if (hero) {
    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting;
      update();
    }).observe(hero);
  } else {
    pastHero = true;
  }

  new IntersectionObserver(function (entries) {
    atContact = entries[0].isIntersecting;
    update();
  }, { threshold: 0.15 }).observe(contact);

  button.addEventListener('click', function () {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'book_button_click', { link_location: 'floating_button' });
    }
  });

  update();
})();
