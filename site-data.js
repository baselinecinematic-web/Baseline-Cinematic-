// Baseline Cinematic — shared site content
//
// This file is the single source of truth for facts that repeat across
// multiple pages: delivery time, prices, FAQ answers, contact info, and
// the launch-promo banner/end date. Edit a value here and every page that
// uses it updates automatically — no more hunting through several HTML
// files to change one sentence.
//
// How it's wired: index.html, real-estate.html, and commercial.html load
// this file, then site-render.js finds every element with a data-field
// attribute (e.g. data-field="delivery.turnaroundBadge") and fills it in
// with the matching value below. A string can reference another value
// with {{dot.path}} and it gets substituted automatically.
//
// Each page also keeps today's correct text hard-coded as a fallback, so
// nothing breaks for a visitor (or search engine) whose browser doesn't
// run this script.

window.SITE_DATA = {
  business: {
    phoneDisplay: "(309) 863-5181",
    phoneHref: "tel:+13098635181",
    email: "baselinecinematic@gmail.com",
    emailHref: "mailto:baselinecinematic@gmail.com",
    serviceArea: "Headquartered in the Greater Peoria area, Baseline Cinematic serves clients throughout Central Illinois within a 50-mile radius, with extended-range coverage available for select projects.",
    guarantee: "100% Satisfaction Guarantee: if you're not happy with your final video, we'll re-edit it at no additional charge."
  },

  social: {
    facebookHref: "https://www.facebook.com/profile.php?id=61591572504349",
    instagramHref: "https://www.instagram.com/baselinecinematic",
    tiktokHref: "https://www.tiktok.com/@baseline.cinemati",
    youtubeHref: "https://www.youtube.com/@BaselineCinematic"
  },

  promo: {
    // Promo banner + promo pricing badges show until this date/time
    // (Central time), then pages automatically fall back to the
    // evergreen banner and regular prices. Change ONLY this to run a
    // new promo later, or move it out further to keep the founding-client
    // rate running longer.
    endDateISO: "2027-03-01T00:00:00-06:00",
    badgeText: "Founding Client Rate",
    bannerActiveText: "🎬 Founding Client Rate: Full 4K Drone & Ground Walkthrough for {{pricing.realEstate.tourPromoDisplay}} — Limited Spots While We Launch",
    bannerActiveCta: "Claim Your Spot →",
    introNote: "*Founding Client Rate — a limited introductory price for our first bookings as we build our portfolio.",
    priceNoteSuffix: " Founding Client Rate — limited spots available.",
    bannerAfterText: "🎁 New clients: get a free vertical social reel ({{pricing.realEstate.verticalAddOnDisplay}} value) with your first shoot",
    bannerAfterCta: "Claim Voucher →"
  },

  delivery: {
    // Keep these two in sync — same fact, two forms: a short badge form
    // used in pricing/hero copy, and a spelled-out form used mid-sentence
    // in FAQ prose.
    turnaroundBadge: "1–2 business days",
    turnaroundWords: "1 to 2 business days",
    heroFact: "Delivered in {{delivery.turnaroundBadge}}",
    priceNote: "Delivered in {{delivery.turnaroundBadge}}."
  },

  pricing: {
    realEstate: {
      tourRegularDisplay: "$399",
      tourPromoDisplay: "$199",
      aerialOnlyDisplay: "$199",
      verticalAddOnDisplay: "$75"
    },
    commercial: {
      brandProfileDisplay: "$850",
      campaignDisplay: "$1,500",
      socialRetainerDisplay: "$299/mo"
    }
  },

  faq: {
    licensed: {
      question: "Are you licensed and insured to fly commercially?",
      answer: "Absolutely. We operate under full FAA Part 107 Certification for commercial flight and carry comprehensive liability insurance. Safety and compliance are our top priorities. We handle all local airspace authorizations in the Peoria and Pekin region before the drone ever leaves the ground, ensuring your property and project are completely protected."
    },
    footageQuality: {
      question: "What makes your footage look different from a standard drone video?",
      answer: "We capture our aerial and ground footage using 10-bit color cinematic profiles, which record billions of colors and massive dynamic range. Instead of just applying a basic filter, every single clip goes through a custom, node-based color grading process. This high-end post-production pipeline ensures a rich, broadcast-ready look that standard cameras simply cannot match."
    },
    dualOperator: {
      question: "Do you only shoot aerial drone footage?",
      answer: "Not at all! We are a dual-operator team. While one of us is navigating the skies, the other utilizes an advanced computational camera system on the ground. This allows us to capture buttery-smooth, high-dynamic-range ground cinematography that seamlessly blends with our aerial shots to tell the complete story of your business, real estate property, or event."
    },
    weather: {
      question: "What happens if it rains or is too windy on the day of the shoot?",
      answer: "Central Illinois weather can be unpredictable, but we never compromise on safety or the quality of your footage. If the conditions aren't right for safe flying—such as high winds, rain, or poor visibility—we will simply work with you to reschedule the flight for the next clear weather window at no additional cost."
    },
    turnaround: {
      question: "How long does it take to receive the final edited video?",
      answer: "Because we handle all of our editing, motion tracking, and color enhancement in-house, our typical turnaround time for standard promotional and real estate projects is {{delivery.turnaroundWords}}. We ensure every frame is polished to perfection before delivering the final product."
    }
  },

  process: {
    heading: "Our Process",
    subheading: "A simple, fast path from booking to a finished film.",
    step1Title: "1. Book",
    step1Desc: "Choose your package and reserve a date online or by phone — most bookings are confirmed within 24 hours.",
    step2Title: "2. Shoot",
    step2Desc: "Our licensed, dual-operator team captures aerial and ground footage on-site. If weather won't cooperate, we reschedule at no additional cost.",
    step3Title: "3. Edit",
    step3Desc: "Every clip goes through our in-house, node-based color grading and editing pipeline — no outsourcing, no shortcuts.",
    step4Title: "4. Deliver",
    step4Desc: "Your finished film lands in your inbox in {{delivery.turnaroundWords}}, ready to publish."
  },

  voucher: {
    badge: "New Client Special",
    heading: "🎁 Claim a Free Vertical Social Media Reel ({{pricing.realEstate.verticalAddOnDisplay}} Value)",
    body: "Drop your email below to instantly receive your digital voucher. Get a fully edited, 9:16 vertical video optimized for Instagram and TikTok included completely free when you book your first property tour or commercial shoot!"
  }
};
