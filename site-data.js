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
    },
    pricing: {
      question: "How much does a real estate video cost?",
      answer: "Our Cinematic Property Tour is {{pricing.realEstate.tourRegularDisplay}}, an Aerial-Only Showcase is {{pricing.realEstate.aerialOnlyDisplay}}, and a vertical social cut can be added for {{pricing.realEstate.verticalAddOnDisplay}}. Commercial brand profiles start at {{pricing.commercial.brandProfileDisplay}}. Every price is listed up front on our homepage. No surprise fees."
    },
    payment: {
      question: "How do I pay? Is a deposit required?",
      answer: "We accept PayPal, Cash App, and all major credit cards. Larger projects, such as brand films and commercial campaigns, require a 40% deposit to reserve your date."
    },
    prep: {
      question: "How should the home be prepared for the shoot?",
      answer: "Whether the home is empty or staged is completely up to you. Both film beautifully. Just make sure it's clean. A few quick touches make a big difference: clear off countertops, turn on every light, open the blinds, move cars out of the driveway, and tuck away trash cans and garden hoses."
    },
    airport: {
      question: "Can you fly near the airport?",
      answer: "Yes. Much of the Peoria area sits in controlled airspace near local airports. Before flying there, we get FAA authorization through LAANC, the FAA's official approval system for drone flights in controlled airspace. We handle all of it, so there's nothing you need to do."
    },
    mls: {
      question: "Do I get an unbranded version for the MLS?",
      answer: "Yes. Every real estate video comes with an unbranded version, with no logos or contact details, so it's ready to post on the MLS, listing sites, or any social media platform."
    },
    revisions: {
      question: "How many rounds of changes are included?",
      answer: "Your video includes two rounds of revisions for smaller changes, like trimming a clip, swapping a shot, or adjusting the music. On top of that, our 100% Satisfaction Guarantee means that if you're not happy with the final video, we'll re-edit it at no additional charge."
    },
    music: {
      question: "Is the music in my video licensed?",
      answer: "Yes. All of our music comes from a professional licensed music library, so your video is cleared to use on your listing, website, and social media."
    },
    rawFootage: {
      question: "Can I get the raw footage?",
      answer: "Yes. If you'd rather edit it yourself, we can deliver the raw footage. If you'd like us to handle the editing, you'll receive the polished, finished film. Just let us know which you prefer when you book."
    },
    licenseNeeded: {
      question: "Do you need a license to fly a drone for real estate in Illinois?",
      answer: "Yes. Anyone who flies a drone for business, including real estate photos and video, must hold an FAA Part 107 Remote Pilot Certificate. That federal rule applies everywhere in the U.S., including Illinois. Hiring an unlicensed pilot can put your listing, your client and your brokerage at risk."
    },
    part107: {
      question: "What is an FAA Part 107 certificate?",
      answer: "Part 107 is the FAA rule that covers commercial drone flights. To earn the certificate, a pilot has to pass the FAA's aeronautical knowledge test at an approved testing center, covering airspace, weather, safety and flight rules, and then complete recurrent training every two years to keep it current."
    },
    verifyPilot: {
      question: "How can I check if a drone pilot is certified?",
      answer: "Ask to see their Part 107 Remote Pilot Certificate. You can also look them up by name using the FAA's free online Airmen Inquiry search. A professional operator will be happy to show you their certificate and proof of insurance before the shoot."
    },
    insurance: {
      question: "Do drone pilots need insurance?",
      answer: "The FAA doesn't require it, but any professional operator should carry liability insurance. If something goes wrong on a shoot, insurance protects the property owner, not just the pilot. Baseline Cinematic carries comprehensive liability insurance on every job."
    },
    registration: {
      question: "Do commercial drones have to be registered?",
      answer: "Yes. Every drone flown commercially must be registered with the FAA and display its registration number, and it must broadcast Remote ID, a digital identification signal that lets authorities identify drones in flight. All of our aircraft are registered and Remote ID compliant."
    },
    worthIt: {
      question: "Is drone video worth it for a real estate listing?",
      answer: "For most listings, yes. Aerial footage shows things photos from the ground can't: the size and shape of the lot, the layout of the property, and what's nearby, like a lake, park or quiet street. It helps a listing stand out online and gives out-of-town buyers a real feel for the home before they visit."
    },
    travel: {
      question: "Do you charge a travel fee?",
      answer: "Shoots within 50 miles of Pekin and Peoria have no travel fee. Beyond that, it's $50 for 50–75 miles, $100 for 75–100 miles, and a custom quote for anything over 100 miles. You'll always know the travel fee before you book."
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
