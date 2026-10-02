// Sends lead events to Google Analytics so you can see exactly how many
// people contacted you through the site. Load this at the end of <body>,
// after the Google tag (gtag) in <head>.
//
// Events it sends:
//   generate_lead  - the contact form was sent successfully (the page's own
//                    form script calls trackLead(form) once Make.com accepts it)
//   phone_click    - someone tapped a phone number link
//   email_click    - someone tapped an email link
//
// Each event also says WHERE on the page it happened (link_location), e.g.
// "pricing", "contact" or "footer", and the form event says which service
// was picked (service_needed). Mark generate_lead and phone_click as key
// events in Google Analytics to count them as conversions.
(function () {
  function send(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }

  // Name the part of the page an element sits in: the id of the closest
  // <section>, or "footer"/"header"/"nav" for links outside a section.
  function locationOf(el) {
    var section = el.closest('section[id]');
    if (section) return section.id;
    var landmark = el.closest('footer, header, nav');
    return landmark ? landmark.tagName.toLowerCase() : 'page';
  }

  // Phone and email taps. One listener on the whole page catches every
  // tel:/mailto: link, including any added later.
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!link) return;
    var isPhone = link.getAttribute('href').indexOf('tel:') === 0;
    send(isPhone ? 'phone_click' : 'email_click', {
      link_location: locationOf(link)
    });
  });

  // Called by the page's form script after a successful send.
  window.trackLead = function (form) {
    var service = form && form.querySelector('[name="service_needed"]');
    send('generate_lead', {
      form_id: (form && form.id) || 'lead-gen-form',
      link_location: form ? locationOf(form) : 'page',
      service_needed: service ? service.value : ''
    });
  };
})();
