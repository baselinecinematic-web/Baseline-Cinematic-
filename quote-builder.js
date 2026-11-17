// Baseline Cinematic — "Build Your Shoot" quote configurator
//
// One script for every page that shows the configurator (index.html and
// quote.html). It builds the 4 steps, the live quote and the booking form
// inside the element marked data-quote-builder. Styles: quote-builder.css.
// Prices that already exist in site-data.js are read from there.

// The First-Time Client Free $75 Vertical Reel Voucher is switched on and off with
// FIRST_TIME_REEL_PROMO_ACTIVE at the top of site-data.js (shared with the homepage form).

(function () {
    'use strict';

    var FIRST_TIME_REEL_PROMO_ACTIVE_ = (typeof FIRST_TIME_REEL_PROMO_ACTIVE === 'undefined') ? true : !!FIRST_TIME_REEL_PROMO_ACTIVE;

    var TEMPLATE = `

<div class="bq-steps">

    <!-- STEP 1 -->
    <fieldset class="bq-step" id="step-1">
        <legend class="bq-visually-hidden">Step 1: choose your goal</legend>
        <div class="bq-step-head"><span class="bq-num" aria-hidden="true">1</span><h2>Choose your goal</h2></div>
        <p class="bq-step-lead">What are we filming? You can switch at any time and your quote updates.</p>
        <div class="bq-cards is-goals">
            <label class="bq-card">
                <input type="radio" name="bq-goal" value="commercial">
                <span class="bq-card-body">
                    <span class="bq-card-top">
                        <svg class="bq-card-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 13l2.5-7h19L28 13"/><path d="M4 13c0 2 1.6 3.4 3.4 3.4S11 15 11 13c0 2 1.5 3.4 3.3 3.4h3.4c1.8 0 3.3-1.4 3.3-3.4 0 2 1.8 3.4 3.600 3.4S28 15 28 13"/><path d="M6.5 16.5V26h19v-9.5"/><path d="M13 26v-6h6v6"/></svg>
                        <span class="bq-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
                    </span>
                    <h3>Business &amp; commercial</h3>
                    <p>A brand film or commercial for your shop, dealership, restaurant or service business.</p>
                    <span class="bq-card-price" data-from="commercial">from $850</span>
                </span>
            </label>
            <label class="bq-card">
                <input type="radio" name="bq-goal" value="realestate">
                <span class="bq-card-body">
                    <span class="bq-card-top">
                        <svg class="bq-card-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15L16 5l12 10"/><path d="M7 13v13h18V13"/><path d="M13 26v-7h6v7"/></svg>
                        <span class="bq-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
                    </span>
                    <h3>Real estate listing</h3>
                    <p>A drone and walkthrough tour for realtors and property owners, with an MLS-ready copy.</p>
                    <span class="bq-card-price" data-from="realestate">from $199</span>
                </span>
            </label>
            <label class="bq-card">
                <input type="radio" name="bq-goal" value="retainer">
                <span class="bq-card-body">
                    <span class="bq-card-top">
                        <svg class="bq-card-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3.5" width="14" height="25" rx="3"/><path d="M14 13l5.5 3-5.5 3z"/></svg>
                        <span class="bq-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
                    </span>
                    <h3>Monthly social retainer</h3>
                    <p>We visit every month to film and edit a steady run of Reels for Instagram, TikTok and Shorts.</p>
                    <span class="bq-card-price" data-from="retainer">from $299/mo</span>
                </span>
            </label>
            <label class="bq-card">
                <input type="radio" name="bq-goal" value="event">
                <span class="bq-card-body">
                    <span class="bq-card-top">
                        <svg class="bq-card-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 27V10l11-5 11 5v17"/><path d="M5 27h22"/><path d="M12 27v-8a4 4 0 0 1 8 0v8"/><path d="M16 5V2"/></svg>
                        <span class="bq-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
                    </span>
                    <h3>Event coverage</h3>
                    <p>A highlight film for churches, festivals, fundraisers and live community events.</p>
                    <span class="bq-card-price" data-from="event">from $650</span>
                </span>
            </label>
        </div>
    </fieldset>

    <!-- STEP 2 -->
    <fieldset class="bq-step" id="step-2">
        <legend class="bq-visually-hidden">Step 2: choose your starting base package</legend>
        <div class="bq-step-head"><span class="bq-num" aria-hidden="true">2</span><h2>Choose your starting base package</h2></div>
        <p class="bq-step-lead" id="bq-pkg-lead">Packages appear here once you choose a goal.</p>
        <div class="bq-cards is-packages" id="bq-packages">
            <div class="bq-empty">Choose a goal in step 1 to see the packages for it.</div>
        </div>
        <div class="bq-offer" id="bq-promo-row" hidden>
            <div>
                <strong>Apply the Founding Client Rate</strong>
                <span>Full Cinematic Property Tour for <span data-bq="tourPromo">$199</span> instead of <span data-bq="tourRegular">$399</span>, while launch spots last.</span>
            </div>
            <label class="bq-switch"><input type="checkbox" id="bq-promo" checked aria-label="Apply the Founding Client Rate"><i></i></label>
        </div>
    </fieldset>

    <!-- STEP 3 -->
    <fieldset class="bq-step" id="step-3">
        <legend class="bq-visually-hidden">Step 3: available upgrades and location</legend>
        <div class="bq-step-head"><span class="bq-num" aria-hidden="true">3</span><h2>Available upgrades &amp; location</h2></div>
        <p class="bq-step-lead">Pick only the upgrades you'll use. Every change shows up in your quote right away.</p>

        <div class="bq-opts">
            <div class="bq-opt" id="opt-drone">
                <div>
                    <div class="bq-opt-title">4K Aerial Drone Upgrade <b data-bq="droneLabel">+$150</b></div>
                    <p class="bq-opt-desc" id="opt-drone-desc">Aerial footage flown by an FAA Part 107 certified, insured pilot and matched to your ground shots.</p>
                </div>
                <label class="bq-switch" id="opt-drone-switch"><input type="checkbox" id="bq-drone" aria-label="Add 4K aerial drone"><i></i></label>
                <span class="bq-included" id="opt-drone-included" hidden>Included</span>
            </div>

            <div class="bq-opt" id="opt-reels">
                <div class="bq-opt-wide">
                    <div class="bq-opt-title">Vertical Social Reel Upgrade</div>
                    <p class="bq-opt-desc">9:16 cuts of your shoot, edited for Instagram, TikTok and YouTube Shorts.</p>
                    <div class="bq-seg" role="radiogroup" aria-label="Vertical social reels">
                        <label><input type="radio" name="bq-reels" value="0" checked><span>None</span></label>
                        <label><input type="radio" name="bq-reels" value="1"><span>1 reel <em data-bq="reel1Label">+$75</em></span></label>
                        <label><input type="radio" name="bq-reels" value="3"><span>3-pack <em data-bq="reel3Label">+$199</em></span></label>
                    </div>
                </div>
            </div>

            <!-- First-Time Client Free $75 Vertical Reel Voucher: optional bonus on paid shoots.
             Shown only while FIRST_TIME_REEL_PROMO_ACTIVE is true (top of site-data.js). -->
        <div class="bq-opt" id="opt-voucher">
            <div class="bq-opt-wide">
                <div class="bq-offer is-bonus">
                    <div>
                        <strong>First-Time Client Free <span data-bq="reel1">$75</span> Vertical Reel Voucher</strong>
                        <span>Optional bonus on your first paid shoot: switch it on and one vertical reel is free.</span>
                    </div>
                    <label class="bq-switch"><input type="checkbox" id="bq-voucher" aria-label="Apply the First-Time Client Free Vertical Reel Voucher" aria-describedby="bq-voucher-fine"><i></i></label>
                </div>
                <p class="bq-fineprint" id="bq-voucher-fine">Verified upon booking confirmation — valid for new Baseline Cinematic LLC clients.</p>
            </div>
        </div>

        <div class="bq-opt" id="opt-raw">
                <div>
                    <div class="bq-opt-title">Raw Footage Upgrade <b data-bq="rawLabel">+$100</b></div>
                    <p class="bq-opt-desc">The unedited, high-bitrate files, delivered alongside your finished cut.</p>
                </div>
                <label class="bq-switch"><input type="checkbox" id="bq-raw" aria-label="Add raw footage delivery"><i></i></label>
            </div>

            <div class="bq-opt" id="opt-rush">
                <div>
                    <div class="bq-opt-title">Rush 24-Hour Turnaround Upgrade <b data-bq="rushLabel">+$125</b></div>
                    <p class="bq-opt-desc">Your finished film within 24 hours of the shoot. Standard delivery is <span data-bq="turnaround">1–2 business days</span>.</p>
                </div>
                <label class="bq-switch"><input type="checkbox" id="bq-rush" aria-label="Add rush 24-hour turnaround"><i></i></label>
            </div>

            <div class="bq-opt" id="opt-travel">
                <div class="bq-opt-wide">
                    <div class="bq-opt-title">Shoot location</div>
                    <p class="bq-opt-desc">How far is the shoot from Pekin or Peoria?</p>
                    <div class="bq-seg is-travel" role="radiogroup" aria-label="Distance from Pekin or Peoria">
                        <label><input type="radio" name="bq-travel" value="z0" checked><span>Within 50 mi <em>$0</em></span></label>
                        <label><input type="radio" name="bq-travel" value="z1"><span>50–75 mi <em>+$50</em></span></label>
                        <label><input type="radio" name="bq-travel" value="z2"><span>75–100 mi <em>+$100</em></span></label>
                        <label><input type="radio" name="bq-travel" value="z3"><span>100+ mi <em>Custom quote</em></span></label>
                    </div>
                    <p class="bq-travel-note" id="bq-travel-note">No travel fee for Pekin, Peoria, Morton, East Peoria, Washington and Bloomington-Normal.</p>
                </div>
            </div>
        </div>
        <p class="bq-travel-note" id="bq-retainer-note" hidden>Retainers cover monthly on-site filming and editing. Want drone footage or extra cuts in the mix? Tell us in the project notes and we'll price it with you.</p>
    </fieldset>
</div>

<!-- LIVE QUOTE: styled as a production slate -->
<div class="bq-quote-col">
    <aside class="bq-quote" id="quote" aria-label="Your live quote">
        <div class="bq-clap" aria-hidden="true"></div>
        <div class="bq-slate-grid">
            <div><span>Prod.</span><b>Baseline Cinematic</b></div>
            <div><span>Date</span><b id="s-date">To be set</b></div>
            <div><span>Scene</span><b id="s-goal">Not chosen</b></div>
            <div><span>Take</span><b id="s-pkg">Not chosen</b></div>
        </div>
        <div class="bq-quote-body">
            <p class="bq-quote-empty" id="q-empty">Choose a goal in step 1 and your itemized quote builds here.</p>
            <div id="q-filled" hidden>
                <ul class="bq-lines" id="q-lines"></ul>
                <div class="bq-total">
                    <span id="q-total-label">Your total</span>
                    <strong id="q-total" aria-live="polite">$0</strong>
                </div>
                <p class="bq-save" id="q-save" hidden></p>
                <dl class="bq-terms">
                    <div><dt>Turnaround</dt><dd id="q-turn">1–2 business days</dd></div>
                    <div><dt>Deposit</dt><dd id="q-deposit"></dd></div>
                <div id="q-voucher-row"><dt>Reel voucher</dt><dd id="q-voucher"></dd></div>
                </dl>
                <a class="bq-btn is-wide" href="#step-4">Book this shoot</a>
                <p class="bq-quote-foot">No payment taken on this page.</p>
            </div>
        </div>
    </aside>
</div>

<!-- STEP 4 -->
<div class="bq-book">
    <div class="bq-step" id="step-4" role="group" aria-labelledby="step-4-h">
        <div class="bq-step-head"><span class="bq-num" aria-hidden="true">4</span><h2 id="step-4-h">Send your booking request</h2></div>
        <p class="bq-step-lead">Your itemized quote is attached automatically. Most bookings are confirmed within 24 hours.</p>

        <form class="bq-form" id="bq-form" action="https://formspree.io/f/mwvdljwd" method="POST" novalidate>
            <div class="bq-field">
                <label for="f-name">Name</label>
                <input id="f-name" name="name" type="text" autocomplete="name" required>
            </div>
            <div class="bq-field">
                <label for="f-biz">Business or brokerage name <small>(optional)</small></label>
                <input id="f-biz" name="business" type="text" autocomplete="organization">
            </div>
            <div class="bq-field">
                <label for="f-email">Email</label>
                <input id="f-email" name="email" type="email" autocomplete="email" required>
            </div>
            <div class="bq-field">
                <label for="f-phone">Phone <small>(optional, but faster)</small></label>
                <input id="f-phone" name="phone" type="tel" autocomplete="tel">
            </div>
            <div class="bq-field">
                <label for="f-date">Preferred shoot date <small>(optional)</small></label>
                <input id="f-date" name="shoot_date" type="date">
            </div>
            <div class="bq-field is-full">
                <label for="f-notes">Project notes <small>(optional)</small></label>
                <textarea id="f-notes" name="message" placeholder="Property address, what the business does, event schedule, anything we should know."></textarea>
            </div>

            <input type="hidden" name="service" id="f-service">
            <input type="hidden" name="quote_total" id="f-total">
            <input type="hidden" name="quote_summary" id="f-summary">
            <input type="hidden" name="first_time_reel_voucher" id="f-voucher">
            <input type="hidden" name="_subject" id="f-subject" value="New Baseline Cinematic Inquiry">
            <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
            <input type="hidden" name="source" id="f-source" value="Quote configurator">

            <div class="bq-msg is-error" id="bq-error" role="alert" hidden></div>

            <div class="bq-actions">
                <button type="submit" class="bq-btn" id="bq-send">Send booking request</button>
                <a class="bq-btn is-ghost" id="bq-mailto" href="mailto:michael@baselinecinematic.com">Email this quote</a>
                <button type="button" class="bq-btn is-ghost" id="bq-copy">Copy quote summary</button>
            </div>
            <p class="bq-form-note" id="bq-form-note">Prefer to talk it through? Call <a class="bq-link" href="tel:+13098635181" data-field="business.phoneDisplay" data-href-field="business.phoneHref">(309) 863-5181</a> or text <a class="bq-link" href="sms:+13098635089?&body=Hi%20Baseline%20Cinematic%2C%20I%27d%20like%20to%20inquire%20about%20a%20video%20shoot." data-field="business.textDisplay" data-href-field="business.textHref">(309) 863-5089</a>.</p>
        </form>

        <div class="bq-msg is-ok" id="bq-success" role="status" hidden>
            <h3>Booking request sent</h3>
            <p>We have your quote and details. We'll reply to confirm your date, usually within 24 hours.</p>
            <p class="bq-contact-line">Need us sooner? Call: <a href="tel:+13098635181" data-field="business.phoneDisplay" data-href-field="business.phoneHref">(309) 863-5181</a> <span aria-hidden="true">|</span> Text: <a href="sms:+13098635089?&body=Hi%20Baseline%20Cinematic%2C%20I%27d%20like%20to%20inquire%20about%20a%20video%20shoot." data-field="business.textDisplay" data-href-field="business.textHref">(309) 863-5089</a></p>
            <p class="bq-contact-line">Booked? Here's how to get ready: <a href="prep.html">shoot prep checklist</a>.</p>
        </div>
    </div>
</div>
`;

    var BAR_TEMPLATE = `
<div class="bq-bar" id="bq-bar" aria-hidden="true">
    <div><span id="bar-label">Your total</span><strong id="bar-total">$0</strong></div>
    <a class="bq-btn" href="#step-4" tabindex="-1">Review &amp; book</a>
</div>
`;

    var mount = document.querySelector('[data-quote-builder]');
    if (!mount) return;
    mount.innerHTML = TEMPLATE;
    document.body.insertAdjacentHTML('beforeend', BAR_TEMPLATE);
    document.body.classList.add('bq-has-builder');

    /* ================================================================
       MORE SETTINGS
       ================================================================ */

    // Booking requests go to Formspree (which emails you), then are copied to the
    // Make.com webhook (which emails the client a confirmation). Both addresses
    // live in form-submit.js. Fields sent: name,
    // business, email, phone, shoot_date, message, service, quote_total,
    // quote_summary, first_time_reel_voucher, _subject, source. If form-submit.js
    // isn't loaded, the button opens the visitor's email app with the quote instead.
    var FORM_ENDPOINT = (window.BCForms && window.BCForms.endpoint) || '';

    var EMAIL_TO = 'michael@baselinecinematic.com';
    var EMAIL_CC = 'judith@baselinecinematic.com';

    // Founding Client Rate ends on this date if site-data.js isn't loaded.
    var PROMO_END_FALLBACK = '2027-03-01T00:00:00-06:00';

    // Can a visitor use the $199 Founding Client Rate AND the free reel
    // voucher on the same booking? Set to false to make them pick one.
    var ALLOW_PROMO_WITH_VOUCHER = true;

    var D = window.SITE_DATA || {};
    function fromSite(path, fallback) {
        var v = path.split('.').reduce(function (a, k) { return (a && a[k] !== undefined) ? a[k] : undefined; }, D);
        var n = parseFloat(String(v === undefined ? '' : v).replace(/[^0-9.]/g, ''));
        return (isFinite(n) && n > 0) ? n : fallback;
    }

    // Prices. The first five follow site-data.js when it's present, so a
    // price change there carries over; the rest live only on this page.
    var PRICE = {
        brand:     fromSite('pricing.commercial.brandProfileDisplay', 850),
        campaign:  fromSite('pricing.commercial.campaignDisplay', 1500),
        starter:   fromSite('pricing.commercial.socialRetainerDisplay', 299),
        growth:    650,
        partner:   1250,
        tour:      fromSite('pricing.realEstate.tourRegularDisplay', 399),
        tourPromo: fromSite('pricing.realEstate.tourPromoDisplay', 199),
        aerial:    fromSite('pricing.realEstate.aerialOnlyDisplay', 199),
        event:     650,
        drone:     150,
        reel1:     fromSite('pricing.realEstate.verticalUpgradeDisplay', 75),
        reel3:     199,
        raw:       100,
        rush:      125
    };

    var TRAVEL = {
        z0: { label: 'within 50 miles', fee: 0 },
        z1: { label: '50–75 miles', fee: 50 },
        z2: { label: '75–100 miles', fee: 100 },
        z3: { label: '100+ miles', fee: null }   // null = custom quote
    };

    var TURNAROUND = (D.delivery && D.delivery.turnaroundBadge) || '1–2 business days';

    // deposit: 0 = none, 0.4 = 40% to lock the date, null = not applicable (monthly)
    // drone:   'upgrade' = offered in step 3, 'included' = already part of the package
    var PACKAGES = {
        brand: {
            name: 'Brand Profile Film', price: PRICE.brand, from: true, deposit: 0.4, drone: 'upgrade',
            service: 'Commercial Brand Film',
            blurb: 'A 60–90 second cinematic overview of your business.',
            includes: ['Stabilized ground footage', 'Licensed music', '10-bit color grading']
        },
        campaign: {
            name: 'Multi-Scene Commercial Campaign', price: PRICE.campaign, from: true, deposit: 0.4, drone: 'upgrade',
            service: 'Commercial Brand Film',
            blurb: 'A half-day or multi-location production.',
            includes: ['Staff and customer interviews', 'B-roll of your team at work', 'Hero brand cut']
        },
        tour: {
            name: 'Cinematic Property Tour', price: PRICE.tour, promoPrice: PRICE.tourPromo, deposit: 0, drone: 'included',
            service: 'Full Property Tour',
            blurb: 'The full listing video, sky to front door.',
            includes: ['4K aerial drone footage', 'Stabilized interior and exterior walkthrough', 'Custom color grading', 'Unbranded MLS version, free']
        },
        aerial: {
            name: 'Aerial-Only Showcase', price: PRICE.aerial, deposit: 0, drone: 'included',
            service: 'Drone Photos/Video Only',
            blurb: 'Drone footage only, no ground shots.',
            includes: ['High-resolution 4K drone exterior', 'Lot lines', 'Neighborhood context']
        },
        starter: {
            name: 'Starter Retainer', price: PRICE.starter, monthly: true, deposit: null, drone: 'none',
            service: 'Social Media Retainer',
            blurb: 'A steady presence without the stress.',
            includes: ['4 Reels a month', 'Monthly on-site filming and editing']
        },
        growth: {
            name: 'Growth Retainer Upgrade', price: PRICE.growth, monthly: true, deposit: null, drone: 'none',
            service: 'Social Media Retainer',
            blurb: 'More Reels, plus a cut for your website.',
            includes: ['6 Reels a month', '1 horizontal web cut', 'Monthly on-site filming and editing']
        },
        partner: {
            name: 'Full Partner Retainer Upgrade', price: PRICE.partner, monthly: true, deposit: null, drone: 'none',
            service: 'Social Media Retainer',
            blurb: 'A hero film and a full month of social, every month.',
            includes: ['1 hero cut a month', '8 Reels a month', 'Monthly on-site filming and editing']
        },
        event: {
            name: 'Event Highlight Film', price: PRICE.event, from: true, deposit: 0.4, drone: 'included',
            service: 'Event Coverage',
            blurb: 'The energy of the day in one highlight film.',
            includes: ['Dual-operator aerial and ground coverage', 'Custom color grading', 'Licensed audio']
        }
    };

    var GOALS = {
        commercial: { label: 'Business & Commercial', packages: ['brand', 'campaign'], lead: 'Both are custom-scoped, so the price shown is where each one starts.' },
        realestate: { label: 'Real Estate Listing', packages: ['tour', 'aerial'], lead: 'Flat prices. Every real estate video comes with an unbranded copy for the MLS.' },
        retainer:   { label: 'Monthly Social Retainer', packages: ['starter', 'growth', 'partner'], lead: 'Start with the Starter plan, or upgrade to Growth or Full Partner. We come to you, film on-site and handle the edit.' },
        event:      { label: 'Event Coverage', packages: ['event'], lead: 'One package, priced from the size and length of your event.' }
    };
    var GOAL_ALIASES = { business: 'commercial', brand: 'commercial', 'real-estate': 'realestate', realtor: 'realestate', listing: 'realestate', social: 'retainer', events: 'event', church: 'event' };

    /* ================================================================
       State + pricing
       ================================================================ */
    // Founding Client Rate ($199 tour) runs on its own end date; it is separate
    // from FIRST_TIME_REEL_PROMO_ACTIVE (site-data.js), which controls the free reel voucher.
    var promoEnd = new Date((D.promo && D.promo.endDateISO) || PROMO_END_FALLBACK);
    var FOUNDING_RATE_LIVE = new Date() < promoEnd;

    var state = { goal: null, pkg: null, promo: FOUNDING_RATE_LIVE, drone: false, reels: 0, voucher: false, raw: false, rush: false, travel: 'z0' };

    function usd(n) {
        var neg = n < 0, v = Math.abs(n);
        var s = v.toLocaleString('en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
        return (neg ? '−$' : '$') + s;
    }

    // Pure function: state in, itemized quote out.
    function quote(s) {
        var p = PACKAGES[s.pkg];
        if (!p) return null;
        var lines = [], total = 0, saved = 0;
        function add(label, amount, kind) {
            lines.push({ label: label, amount: amount, kind: kind || 'upgrade' });
            if (typeof amount === 'number') { total += amount; if (amount < 0) saved += -amount; }
        }
        var monthly = !!p.monthly;
        var voucherRequested = false;

        add(p.name, p.price, 'base');
        var promoOn = FOUNDING_RATE_LIVE && s.promo && p.promoPrice !== undefined && p.promoPrice < p.price;
        if (promoOn) add('Founding Client Rate', p.promoPrice - p.price, 'discount');

        if (!monthly) {
            if (p.drone === 'upgrade' && s.drone) add('4K Aerial Drone Upgrade', PRICE.drone);
            if (s.reels === 1) add('Vertical Social Reel Upgrade (1 cut)', PRICE.reel1);
            if (s.reels === 3) add('Vertical Social Reels Upgrade (3-pack)', PRICE.reel3);
            var voucherOk = FIRST_TIME_REEL_PROMO_ACTIVE_ && s.voucher && s.reels > 0 && (ALLOW_PROMO_WITH_VOUCHER || !promoOn);
            if (voucherOk) { add('First-time client reel voucher', -PRICE.reel1, 'discount'); voucherRequested = true; }
            if (s.raw) add('Raw Footage Upgrade', PRICE.raw);
            if (s.rush) add('Rush 24-Hour Turnaround Upgrade', PRICE.rush);
        }

        var t = TRAVEL[s.travel] || TRAVEL.z0;
        add('Travel, ' + t.label + (monthly ? ' (per monthly visit)' : ''), t.fee, 'travel');

        var q = {
            pkg: p, lines: lines, total: total, saved: saved,
            monthly: monthly, from: !!p.from, customTravel: t.fee === null,
            turnaround: monthly ? 'Filmed and edited every month' : (s.rush ? 'Within 24 hours of the shoot' : TURNAROUND + ' after the shoot')
        };
        // Logged on the receipt and in the submitted form so it can be verified before confirming
        q.voucherOffered = FIRST_TIME_REEL_PROMO_ACTIVE_ && !monthly;
        q.voucherRequested = voucherRequested;
        q.voucherField = !FIRST_TIME_REEL_PROMO_ACTIVE_ ? 'Not offered (promo off)'
            : monthly ? 'Not applicable (monthly retainer)'
            : voucherRequested ? 'REQUESTED: verify new-client status before confirming'
            : 'Not requested';
        q.totalLabel = monthly ? 'Per month' : (q.from ? 'Starting estimate' : 'Your total');
        q.totalText = usd(total) + (monthly ? '/mo' : '');
        if (p.deposit === 0) {
            q.depositText = '$0 deposit for real estate shoots.';
        } else if (p.deposit) {
            q.depositAmount = Math.round(total * p.deposit);
            q.depositText = Math.round(p.deposit * 100) + '% deposit locks your date: ' + usd(q.depositAmount) +
                (q.from || q.customTravel ? ' on this estimate.' : '.');
        } else {
            q.depositText = 'Billed monthly. We confirm your start date when we reply.';
        }
        return q;
    }

    function summaryText(q, f) {
        var out = [];
        out.push('BASELINE CINEMATIC: QUOTE REQUEST');
        out.push('');
        out.push('Goal: ' + GOALS[state.goal].label);
        out.push('Package: ' + q.pkg.name);
        out.push('');
        q.lines.forEach(function (l) {
            var amt = l.amount === null ? 'Custom quote' : (l.kind === 'base' && q.from ? 'from ' : '') + usd(l.amount) + (l.kind === 'base' && q.monthly ? '/mo' : '');
            out.push('  ' + l.label + ': ' + amt);
        });
        out.push('');
        out.push(q.totalLabel + ': ' + q.totalText + (q.customTravel ? ' + custom travel quote' : ''));
        if (q.saved) out.push('Savings applied: ' + usd(q.saved));
        out.push('Turnaround: ' + q.turnaround);
        out.push('Deposit: ' + q.depositText);
        out.push('First-time $75 vertical reel voucher: ' + q.voucherField);
        if (f) {
            out.push('');
            out.push('Name: ' + (f.name || ''));
            if (f.business) out.push('Business / brokerage: ' + f.business);
            out.push('Email: ' + (f.email || ''));
            if (f.phone) out.push('Phone: ' + f.phone);
            out.push('Preferred shoot date: ' + (f.shoot_date ? prettyDate(f.shoot_date) : 'Flexible'));
            if (f.notes) { out.push(''); out.push('Project notes:'); out.push(f.notes); }
        }
        return out.join('\n');
    }

    function prettyDate(iso) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
        if (!m) return iso || '';
        var d = new Date(+m[1], +m[2] - 1, +m[3]);
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }

    /* ================================================================
       Rendering
       ================================================================ */
    var $ = function (id) { return document.getElementById(id); };
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

    var TICK = '<span class="bq-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>';

    function renderPackages() {
        var box = $('bq-packages');
        var g = GOALS[state.goal];
        if (!g) return;
        $('bq-pkg-lead').textContent = g.lead;
        function entryPrice(k) { var p = PACKAGES[k]; return (p.promoPrice !== undefined && FOUNDING_RATE_LIVE && state.promo) ? p.promoPrice : p.price; }
        var lowest = g.packages.length > 1 ? g.packages.reduce(function (a, k) { return entryPrice(k) < entryPrice(a) ? k : a; }, g.packages[0]) : null;
        box.innerHTML = g.packages.map(function (key) {
            var p = PACKAGES[key];
            var price;
            if (p.promoPrice !== undefined && FOUNDING_RATE_LIVE && state.promo) {
                price = '<s>' + usd(p.price) + '</s>' + usd(p.promoPrice) + ' <small>Founding Client Rate</small>';
            } else {
                price = (p.from ? '<small>from</small> ' : '') + usd(p.price) + (p.monthly ? '<small>/mo</small>' : '');
            }
            var note = '';
            if (key === 'aerial' && FOUNDING_RATE_LIVE && state.promo && PRICE.tourPromo <= PRICE.aerial) {
                note = '<span class="bq-card-note">Heads up: at the Founding Client Rate, the full tour with ground footage is ' + usd(PRICE.tourPromo) + ' too.</span>';
            }
            return '<label class="bq-card"><input type="radio" name="bq-pkg" value="' + key + '"' + (state.pkg === key ? ' checked' : '') + '>' +
                '<span class="bq-card-body">' + (key === lowest ? '<span class="bq-entry">Lowest entry price</span>' : '') + '<span class="bq-card-top"><h3 style="margin:0">' + esc(p.name) + '</h3>' + TICK + '</span>' +
                '<p>' + esc(p.blurb) + '</p>' +
                '<ul class="bq-incl">' + p.includes.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
                note +
                '<span class="bq-card-price">' + price + '</span></span></label>';
        }).join('');
        $('bq-promo-row').hidden = !(state.goal === 'realestate' && FOUNDING_RATE_LIVE);
    }

    function renderOptions() {
        var p = PACKAGES[state.pkg];
        var monthly = !!(p && p.monthly);
        var droneMode = p ? p.drone : 'upgrade';

        $('opt-drone').hidden = monthly;
        $('opt-reels').hidden = monthly;
        $('opt-raw').hidden = monthly;
        $('opt-rush').hidden = monthly;
        $('bq-retainer-note').hidden = !monthly;

        var included = droneMode === 'included';
        $('opt-drone-switch').hidden = included;
        $('opt-drone-included').hidden = !included;
        $('opt-drone-switch').style.display = included ? 'none' : '';
        $('opt-drone-desc').textContent = included
            ? 'Already part of this package, flown by an FAA Part 107 certified, insured pilot.'
            : 'Aerial footage flown by an FAA Part 107 certified, insured pilot and matched to your ground shots.';
        setLabel('droneLabel', included ? '' : '+' + usd(PRICE.drone));

        var promoOn = FOUNDING_RATE_LIVE && state.promo && state.pkg === 'tour';
        $('opt-voucher').hidden = !FIRST_TIME_REEL_PROMO_ACTIVE_ || monthly || (!ALLOW_PROMO_WITH_VOUCHER && promoOn);

        $('bq-travel-note').textContent = state.travel === 'z3'
            ? "Over 100 miles, we price travel with you. Send the request and we'll reply with a number before you commit."
            : 'No travel fee for Pekin, Peoria, Morton, East Peoria, Washington and Bloomington-Normal.';

        // keep the controls in step with state
        $('bq-drone').checked = state.drone;
        $('bq-voucher').checked = state.voucher;
        $('bq-raw').checked = state.raw;
        $('bq-rush').checked = state.rush;
        $('bq-promo').checked = state.promo;
        check('bq-reels', String(state.reels));
        check('bq-travel', state.travel);
        check('bq-goal', state.goal);
    }

    function check(name, value) {
        document.querySelectorAll('input[name="' + name + '"]').forEach(function (el) { el.checked = (el.value === value); });
    }
    function setLabel(key, text) {
        document.querySelectorAll('[data-bq="' + key + '"]').forEach(function (el) { el.textContent = text; });
    }

    var lastTotal = null;
    function renderQuote() {
        var q = quote(state);
        $('q-empty').hidden = !!q;
        $('q-filled').hidden = !q;
        $('s-goal').textContent = state.goal ? GOALS[state.goal].label : 'Not chosen';
        $('s-pkg').textContent = q ? q.pkg.name : 'Not chosen';
        var date = $('f-date').value;
        $('s-date').textContent = date ? prettyDate(date) : 'To be set';

        var bar = $('bq-bar');
        if (!q) { bar.classList.remove('is-ready'); syncBar(); return; }

        $('q-lines').innerHTML = q.lines.map(function (l) {
            var amt;
            if (l.amount === null) amt = 'Custom quote';
            else if (l.kind === 'base') amt = (q.from ? 'from ' : '') + usd(l.amount) + (q.monthly ? '/mo' : '');
            else if (l.kind === 'discount') amt = usd(l.amount);
            else amt = (l.amount > 0 ? '+' : '') + usd(l.amount);
            var cls = 'is-' + l.kind + (l.amount === 0 ? ' is-zero' : '');
            return '<li class="' + cls + '"><span>' + esc(l.label) + '</span><span>' + amt + '</span></li>';
        }).join('');

        $('q-total-label').textContent = q.totalLabel;
        var totalEl = $('q-total');
        totalEl.innerHTML = esc(usd(q.total)) + (q.monthly ? '<small>/mo</small>' : '') + (q.customTravel ? '<small> + travel</small>' : '');
        if (lastTotal !== null && lastTotal !== q.total) {
            totalEl.classList.remove('is-bump'); void totalEl.offsetWidth; totalEl.classList.add('is-bump');
        }
        lastTotal = q.total;

        var save = $('q-save');
        save.hidden = !q.saved;
        save.textContent = q.saved ? "You're saving " + usd(q.saved) : '';
        $('q-turn').textContent = q.turnaround;
        $('q-deposit').textContent = q.depositText;
        $('q-voucher-row').hidden = !q.voucherOffered;
        $('q-voucher').textContent = q.voucherRequested ? 'Requested. Verified upon booking confirmation.' : 'Not requested';

        $('bar-label').textContent = q.totalLabel;
        $('bar-total').textContent = q.totalText + (q.customTravel ? ' + travel' : '');
        bar.classList.add('is-ready');
        syncBar();

        // hidden form fields + mailto link always carry the current quote
        var f = formValues();
        var text = summaryText(q, f);
        $('f-service').value = q.pkg.service;
        $('f-total').value = q.totalLabel + ': ' + q.totalText + (q.customTravel ? ' + custom travel quote' : '');
        $('f-summary').value = text;
        $('f-voucher').value = q.voucherField;
        $('f-source').value = 'Quote configurator on ' + (window.location.pathname || '/');
        $('f-subject').value = 'New Baseline Cinematic Inquiry: Quote request: ' + q.pkg.name + ' (' + q.totalText + ')' + (f.name ? ' from ' + f.name : '');
        $('bq-mailto').href = mailtoHref(q, f);
    }

    function render() { renderPackages(); renderOptions(); renderQuote(); }

    /* ================================================================
       Events
       ================================================================ */
    function setGoal(goal) {
        goal = GOAL_ALIASES[goal] || goal;
        if (!GOALS[goal]) return false;
        if (state.goal !== goal) {
            state.goal = goal;
            state.pkg = GOALS[goal].packages[0];   // preselect so the quote is live immediately
            if (typeof window.gtag === 'function') window.gtag('event', 'quote_goal_selected', { goal: goal });
        }
        render();
        return true;
    }

    document.querySelectorAll('input[name="bq-goal"]').forEach(function (el) {
        el.addEventListener('change', function () { setGoal(el.value); });
    });
    $('bq-packages').addEventListener('change', function (e) {
        if (e.target && e.target.name === 'bq-pkg') { state.pkg = e.target.value; render(); }
    });
    $('bq-promo').addEventListener('change', function (e) { state.promo = e.target.checked; render(); });
    $('bq-drone').addEventListener('change', function (e) { state.drone = e.target.checked; render(); });
    $('bq-raw').addEventListener('change', function (e) { state.raw = e.target.checked; render(); });
    $('bq-rush').addEventListener('change', function (e) { state.rush = e.target.checked; render(); });
    document.querySelectorAll('input[name="bq-reels"]').forEach(function (el) {
        el.addEventListener('change', function () {
            state.reels = parseInt(el.value, 10) || 0;
            if (state.reels === 0) state.voucher = false;   // nothing left for the voucher to cover
            render();
        });
    });
    $('bq-voucher').addEventListener('change', function (e) {
        state.voucher = e.target.checked;
        if (state.voucher && state.reels === 0) state.reels = 1;   // switching the bonus on adds the free reel
        render();
    });
    document.querySelectorAll('input[name="bq-travel"]').forEach(function (el) {
        el.addEventListener('change', function () { state.travel = el.value; render(); });
    });

    // Hero buttons, banner link and any link with data-goal pick the track, then scroll
    document.querySelectorAll('a[data-goal]').forEach(function (a) {
        a.addEventListener('click', function () { setGoal(a.getAttribute('data-goal')); });
    });

    /* ================================================================
       Booking form
       ================================================================ */
    var form = $('bq-form');
    function formValues() {
        var o = {};
        ['name', 'business', 'email', 'phone', 'shoot_date', 'notes'].forEach(function (n) {
            o[n] = (form.elements[n === 'notes' ? 'message' : n].value || '').trim();
        });
        return o;
    }
    function mailtoHref(q, f) {
        var subject = 'Quote request: ' + q.pkg.name + ' (' + q.totalText + ')';
        return 'mailto:' + EMAIL_TO + '?cc=' + encodeURIComponent(EMAIL_CC) +
            '&subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(summaryText(q, f));
    }
    function showError(msg) {
        var box = $('bq-error');
        box.innerHTML = msg;
        box.hidden = !msg;
    }

    form.addEventListener('input', renderQuote);
    var dateInput = $('f-date');
    (function () {
        var d = new Date();
        dateInput.min = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    })();

    var sendBtn = $('bq-send');
    if (!FORM_ENDPOINT) {
        // No endpoint yet: the main button is the email hand-off, so hide the duplicate
        sendBtn.textContent = 'Email my booking request';
        $('bq-mailto').hidden = true;
        $('bq-mailto').style.display = 'none';
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        showError('');
        var q = quote(state);
        if (!q) {
            showError('Choose a goal and package first, so we know what to quote.');
            $('step-1').scrollIntoView({ block: 'start' });
            return;
        }
        var f = formValues();
        if (!f.name) { showError('Add your name so we know who to reply to.'); form.elements.name.focus(); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { showError('Add an email address we can send your confirmation to.'); form.elements.email.focus(); return; }
        renderQuote();

        if (!FORM_ENDPOINT) {
            window.location.href = mailtoHref(q, f);
            if (window.trackLead) window.trackLead(form);
            $('bq-form-note').innerHTML = 'Your email app should have opened with the quote filled in. Press send there to book. Nothing opened? Use <strong>Copy quote summary</strong> and email it to <a class="bq-link" href="mailto:' + EMAIL_TO + '">' + EMAIL_TO + '</a>.';
            return;
        }

        sendBtn.disabled = true;
        var originalLabel = sendBtn.textContent;
        sendBtn.textContent = 'Sending…';
        // Waits for Formspree's 200 OK before showing the confirmation (form-submit.js)
        window.BCForms.send(form)
            .then(function () {
                if (window.trackLead) window.trackLead(form);
                form.hidden = true;
                form.style.display = 'none';
                $('bq-success').hidden = false;
                $('bq-success').scrollIntoView({ block: 'center' });
            })
            .catch(function () {
                sendBtn.disabled = false;
                sendBtn.textContent = originalLabel;
                showError("Your request didn't go through, so we didn't get it. Text us at <a href=\"sms:+13098635089\">(309) 863-5089</a> or call <a href=\"tel:+13098635181\">(309) 863-5181</a>, or use <strong>Email this quote</strong>.");
            });
    });

    var copyBtn = $('bq-copy');
    copyBtn.addEventListener('click', function () {
        var q = quote(state);
        if (!q) { showError('Choose a goal and package first, then copy your quote.'); return; }
        showError('');
        var text = summaryText(q, formValues());
        function done(ok) {
            copyBtn.textContent = ok ? 'Copied to clipboard' : 'Copy failed. Select the text manually.';
            setTimeout(function () { copyBtn.textContent = 'Copy quote summary'; }, 2200);
        }
        function legacy() {
            var ta = document.createElement('textarea');
            ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            var ok = false; try { ok = document.execCommand('copy'); } catch (err) {}
            document.body.removeChild(ta); done(ok);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { done(true); }, legacy);
        } else { legacy(); }
    });

    /* ================================================================
       Page chrome: labels, nav height, mobile bar, menu
       ================================================================ */
    // Price labels in the static HTML follow PRICE, so one edit above updates everything
    setLabel('tourPromo', usd(PRICE.tourPromo));
    setLabel('tourRegular', usd(PRICE.tour));
    setLabel('reel1', usd(PRICE.reel1));
    setLabel('reel1Label', '+' + usd(PRICE.reel1));
    setLabel('reel3Label', '+' + usd(PRICE.reel3));
    setLabel('rawLabel', '+' + usd(PRICE.raw));
    setLabel('rushLabel', '+' + usd(PRICE.rush));
    setLabel('turnaround', TURNAROUND);
    setLabel('turnaroundShort', TURNAROUND.replace(/days$/, 'day'));
    (function () {
        var from = {
            commercial: 'from ' + usd(PRICE.brand),
            realestate: 'from ' + usd(Math.min(PRICE.aerial, FOUNDING_RATE_LIVE ? PRICE.tourPromo : PRICE.tour)),
            retainer: 'from ' + usd(PRICE.starter) + '/mo',
            event: 'from ' + usd(PRICE.event)
        };
        document.querySelectorAll('[data-from]').forEach(function (el) { el.textContent = from[el.getAttribute('data-from')]; });
        var z = document.querySelectorAll('input[name="bq-travel"]');
        z.forEach(function (el) {
            var t = TRAVEL[el.value], em = el.parentNode.querySelector('em');
            if (em) em.textContent = t.fee === null ? 'Custom quote' : (t.fee === 0 ? '$0' : '+' + usd(t.fee));
        });
    })();

    // Fixed banner + nav change height (promo text wraps on phones), so measure it
    var top = document.querySelector('.sticky-wrapper');
    function measure() { if (top) document.documentElement.style.setProperty('--nav-h', top.offsetHeight + 'px'); }
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    // Mobile total bar: show once a quote exists, hide while the booking form or the slate is on screen
    var bar = $('bq-bar'), seen = { form: false, quote: false };
    function syncBar() {
        var on = bar.classList.contains('is-ready') && !seen.form && !seen.quote;
        bar.classList.toggle('is-on', on);
        document.body.classList.toggle('bq-bar-on', on);
        bar.setAttribute('aria-hidden', on ? 'false' : 'true');
        bar.querySelector('a').tabIndex = on ? 0 : -1;
    }
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { seen.form = en[0].isIntersecting; syncBar(); }, { threshold: 0.1 }).observe($('step-4'));
        new IntersectionObserver(function (en) { seen.quote = en[0].isIntersecting; syncBar(); }, { threshold: 0.35 }).observe($('quote'));
    }

    /* ================================================================
       Start: honor ?goal=realestate (or commercial / retainer / event) in the URL
       so buttons elsewhere on the site can open the right track.
       ================================================================ */
    var params = new URLSearchParams(window.location.search);
    var wanted = (params.get('goal') || params.get('track') || '').toLowerCase();
    if (FIRST_TIME_REEL_PROMO_ACTIVE_ && params.get('voucher') === '1') { state.voucher = true; state.reels = 1; }
    if (!(wanted && setGoal(wanted))) render();
    // From the service pages' "Available Upgrades" picker: &pkg=brand&up=drone,reel1,raw,rush
    (function () {
        var pkg = (params.get('pkg') || '').toLowerCase(), ups = (params.get('up') || '').toLowerCase().split(',');
        if (!state.goal) return;
        if (pkg && GOALS[state.goal].packages.indexOf(pkg) > -1) state.pkg = pkg;
        if (ups.indexOf('drone') > -1) state.drone = true;
        if (ups.indexOf('reel3') > -1) state.reels = 3; else if (ups.indexOf('reel1') > -1) state.reels = 1;
        if (ups.indexOf('raw') > -1) state.raw = true;
        if (ups.indexOf('rush') > -1) state.rush = true;
        if (ups.indexOf('voiceover') > -1 && form.elements.message && !form.elements.message.value) {
            form.elements.message.value = 'Please include a quote for the Licensed Commercial Voiceover / Music Upgrade.';
        }
        if (pkg || params.get('up')) render();
    })();
    if (wanted && state.goal && !window.location.hash) {
        window.addEventListener('load', function () { $('step-2').scrollIntoView({ block: 'start' }); });
    }

    // Exposed for testing in the browser console: BaselineQuote.quote({...})
    window.BaselineQuote = { quote: quote, state: state, PRICE: PRICE, summaryText: summaryText, FIRST_TIME_REEL_PROMO_ACTIVE: FIRST_TIME_REEL_PROMO_ACTIVE_ };
})();
