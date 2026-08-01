export const site = {
  name: "EZ NRG",
  domain: "eznrg.ai",
  url: "https://eznrg.ai",
  description:
    "EZ NRG reads how your site actually uses power, prices what that costs to serve, and backs the number with its own capital.",
  tagline: "Energy priced by the hour, not the month.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Learn", href: "/learn" },
  { label: "Contact", href: "/contact" },
];

// Shared UI strings. These used to be hardcoded in render.mjs, which broke the
// content/presentation split — copy edits belong in this file.
export const ui = {
  skipLink: "Skip to content",
  menuLabel: "Toggle navigation",
  headerCta: "Enroll now",
  footerTagline: "Energy priced by the hour, not the month.",
  formError: "Something went wrong. Please try again in a moment.",
};

export const home = {
  hero: {
    eyebrow: "Customer-first energy strategy",
    title: "Your bill shows a month. Your cost is an hour.",
    body:
      "We read your interval data before we quote a price, then back that price with our own capital.",
    primaryCta: "Enroll now",
    primaryHref: "/get-started",
    secondaryCta: "See how it works",
    secondaryHref: "#how",
  },
  // The hero visual: a real 24-hour load shape. Values are a normalised curve
  // (0-100), not a claim about any customer's site — the caption says so.
  curve: {
    title: "A typical weekday load shape",
    caption: "Illustrative 24-hour profile. Every site's is different.",
    offPeakLabel: "Off-peak",
    peakLabel: "Peak window",
    // Midnight -> 11pm, one value per hour.
    values: [
      28, 24, 22, 21, 21, 24, 32, 45, 58, 66, 71, 74, 78, 83, 90, 96, 99, 92,
      78, 64, 54, 46, 38, 32,
    ],
    // Inclusive hour range shaded as the expensive window.
    peakStart: 14,
    peakEnd: 19,
    readout: [
      { label: "What your bill reports", value: "One monthly number" },
      { label: "What actually sets your cost", value: "A few peak hours" },
    ],
  },
  proof: [
    { value: "$500", label: "Deposit, refundable in full for any reason" },
    { value: "24 hours", label: "A real person calls you back" },
    { value: "Price match", label: "Backed by a money-back guarantee" },
    { value: "First 100", label: "$0/mo storage for early customers" },
  ],
  shape: {
    eyebrow: "Why the hour matters",
    title: "Two sites. Same monthly total. Very different bills.",
    body:
      "Your bill reports one number for the month. The market prices every hour. When you use energy decides what it costs — and almost nobody shows you that.",
    points: [
      "Demand charges are set by your worst few hours, not your average.",
      "The cheapest headline rate is often the most expensive contract.",
      "Once we can see your shape, we can price it — or tell you not to bother.",
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "Three steps. No sales pitch required.",
    steps: [
      {
        index: "01",
        title: "Send us your interval data",
        body:
          "Twelve months of usage, hour by hour. Most utilities export it in a click — we'll show you where.",
      },
      {
        index: "02",
        title: "We price your shape, honestly",
        body:
          "We model what your specific load costs to serve. If you're better off staying with your utility, that's what we tell you.",
      },
      {
        index: "03",
        title: "We back the price with capital",
        body:
          "Accepted sites get a price match and a money-back guarantee. The spread between your price and our cost goes back into your site.",
      },
    ],
  },
  contract: {
    eyebrow: "The contract",
    title: "Read the contract. That's the whole pitch.",
    body:
      "No teaser rate, no auto-renewal trap, no clause you need a lawyer to decode. Ours is double-sided — the obligations run both ways — and it's free to try.",
    cta: "Start enrollment",
    ctaHref: "/get-started",
  },
  storage: {
    eyebrow: "Storage",
    title: "Flexibility is the product. You're the driver.",
    body:
      "A 110 kW battery on site turns your peak hours into something you control: lower demand charges now, and a seat at capacity and VPP markets as they open.",
    offer: "$0/mo for the first 100 sites",
    proof: [
      "Cut demand charges by managing your own peaks.",
      "Keep capacity options open instead of locking them away.",
      "VPP-ready, on terms where you keep control.",
    ],
    cards: [
      {
        title: "Peak management",
        body:
          "Dispatch storage against your worst hours and see what your flexibility is worth before you sign anything.",
      },
      {
        title: "Capacity optionality",
        body:
          "Hold your position for future capacity value instead of trading it away in a long contract.",
      },
      {
        title: "VPP pathway",
        body:
          "A participation model that grows as programs, tariffs, and controls mature — without handing over control today.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Early access",
    title: "Find out what your hours are worth.",
    body:
      "Tell us about your site. We'll come back with what your load actually costs to serve — and whether we're the right fit.",
    submitLabel: "Request a read",
    successMessage: "Got it. We'll be in touch within 24 hours with next steps.",
  },
};

export const enrollment = {
  eyebrow: "Get started",
  title: "Start with a refundable $500 deposit.",
  body:
    "No payment today — just leave your name and number. We'll reach out within 24 hours to walk you through the deposit and your next steps. If you ever decide not to move forward, the full $500 is returned.",
  submitLabel: "Reserve my spot",
  successMessage:
    "You're on the list. We'll text you within 24 hours to coordinate a call — no payment is collected here.",
  assurances: [
    {
      title: "Fully refundable",
      body:
        "The $500 deposit is returned in full if you decide not to move forward, for any reason.",
    },
    {
      title: "A real person, within 24 hours",
      body:
        "We call or text to confirm your details and walk you through next steps — no long forms.",
    },
    {
      title: "Nothing to pay here",
      body:
        "No payment is collected on this site. Reserving your spot simply starts the conversation.",
    },
  ],
};

export const about = {
  eyebrow: "Company",
  title: "We price what we understand. Nothing else.",
  intro: [
    "EZ NRG is an energy strategy company. We read how a site actually uses power, price what that costs to serve, and back the number with our own capital.",
    "The energy transition scales when customers have a reason to participate — and a partner who doesn't profit from their confusion.",
  ],
  pillars: [
    {
      index: "01",
      id: "what",
      eyebrow: "What we do",
      title: "We understand your load shape before we quote a price.",
      paragraphs: [
        "An electric bill tells you how much you used last month. It doesn't tell you when — and when is what sets the cost.",
        "So we start with your interval data: usage hour by hour, across a year. Then we model what that specific shape costs to serve.",
        "If the math says you're better off staying with your utility, we say so. We don't quote sites we don't understand.",
      ],
    },
    {
      index: "02",
      id: "how",
      eyebrow: "How we do it",
      title: "Quality of portfolio, not quantity of customers.",
      paragraphs: [
        "Our model isn't to pack in as many accounts as possible. Every site we accept changes the risk for every other site in the portfolio.",
        "If continuing would hurt the customers already in it, we say so and part ways.",
        "EzIntelligentNRG, our intelligence layer, keeps both sides of that equation honest.",
      ],
    },
    {
      index: "03",
      id: "why",
      eyebrow: "Why we do it",
      title: "If we don't create value for our stakeholders, we shouldn't be in business.",
      paragraphs: [
        "We back our pricing with a money-back guarantee, no questions asked. That only works if we're right about your site.",
        "Your load profile stays yours: request your data at any time, and ask us to erase it whenever you want.",
        "Decentralization means open networks and open standards. On-chain settlement holds every party — including us — to what they agreed.",
      ],
    },
  ],
  foundersEyebrow: "Co-founders",
  foundersTitle: "Ask us anything — including the hard questions.",
  founders: [
    { name: "Rishi Patel", role: "Co-founder" },
    { name: "Deepak Sai Pendyala", role: "Co-founder" },
  ],
  note: "Doubt a claim on this site? Put it to us directly. We'd rather answer it now.",
  cta: "Get in touch",
  ctaHref: "/contact",
};

export const learn = {
  eyebrow: "Primer",
  title: "How the market got here — in about ninety seconds.",
  body:
    "Enough context to judge a supplier offer without taking anyone's word for it.",
  summary: [
    {
      label: "Old model",
      value: "Utility monopoly",
      body:
        "One company handled generation, wires, delivery, and billing under a regulated compact.",
    },
    {
      label: "Retail choice",
      value: "Supplier market",
      body:
        "In some states you choose who supplies the energy while the utility still delivers it.",
    },
    {
      label: "Next market",
      value: "Customer assets",
      body:
        "Flexible load, batteries, EVs, solar, and controls become part of the strategy.",
    },
  ],
  primerEyebrow: "Interactive primer",
  primerTitle: "From deregulation to customer-side markets.",
  modules: [
    {
      id: "why",
      label: "Why deregulation",
      kicker: "The original idea",
      title: "Deregulation split energy supply from the wires.",
      body:
        "Generators and suppliers were opened to competition. The wires stayed regulated.",
      bullets: [
        "The promise: more competition, more product choice, sharper price signals.",
        "Wholesale competition grew around regional markets and open transmission access.",
        "Retail choice added supplier contracts in states that adopted it.",
      ],
    },
    {
      id: "worked",
      label: "What worked",
      kicker: "The useful part",
      title: "Choice created room for better procurement.",
      body:
        "For customers who can compare offers and manage risk, competitive supply pays off.",
      bullets: [
        "Large customers gained real ways to hedge, budget, and negotiate around usage shape.",
        "Markets created clear signals for when energy is scarce, cheap, or congested.",
        "Suppliers can design products around customer goals, not one default tariff.",
      ],
    },
    {
      id: "failed",
      label: "Where it failed",
      kicker: "The customer problem",
      title: "The hard part was never picking a logo. It's the contract.",
      body: "Choice without interpretation is just another layer of risk.",
      bullets: [
        "The cheapest headline rate can lose once usage bands, swing tolerances, and fees land.",
        "Few customers get a plain answer on who owns which risk — supplier, utility, or them.",
        "Teaser rates, auto-renewals, and termination clauses quietly change the economics.",
      ],
    },
    {
      id: "ferc",
      label: "FERC 2222",
      kicker: "The next shift",
      title: "Markets are opening to customer-side resources.",
      body:
        "FERC Order 2222 lets aggregated customer assets bid into wholesale markets built for large generators.",
      bullets: [
        "In scope: storage, distributed generation, demand response, efficiency, EVs, and charging.",
        "The value isn't automatic — tariffs, meter data, controls, and contract terms decide it.",
        "The question shifts from what rate did I sign to how should my site participate.",
      ],
    },
    {
      id: "eznrg",
      label: "Where EZ NRG fits",
      kicker: "The strategy layer",
      title: "We translate market complexity into a decision you can make.",
      body:
        "Contract terms, facility behavior, supplier economics, and utility rules — weighed before money is committed.",
      bullets: [
        "Explain the contract before it becomes a surprise on the bill.",
        "Weigh fixed price against index exposure, flexibility, and operating limits.",
        "Line up procurement, load strategy, and future participation behind one plan.",
      ],
    },
  ],
  watchEyebrow: "Contract watchlist",
  watchTitle: "Four clauses that decide the real price.",
  watchBody:
    "Supplier contracts are where market design becomes your bill. These are the terms worth reading twice.",
  watchlist: [
    {
      title: "Price structure",
      body:
        "Fixed, index, block, capacity, transmission, and pass-through language all move the real price.",
    },
    {
      title: "Usage flexibility",
      body:
        "Bandwidth, swing, minimum usage, and material-change terms decide how much your operations can vary.",
    },
    {
      title: "Exit rights",
      body:
        "Auto-renewal, notice windows, termination formulas, and assignment clauses matter before conditions change.",
    },
    {
      title: "Future participation",
      body:
        "Solar, batteries, demand response, and EV charging can all conflict with supplier or utility terms.",
    },
  ],
  upload: {
    eyebrow: "Coming soon",
    title: "Have a supplier contract? Soon you can drop it here.",
    body:
      "We're building an agent that reads third-party supplier contracts and flags hidden terms, tradeoffs, and negotiation points. Try the preview below.",
    button: "Choose a contract PDF",
    panelTitle: "Supplier agreement PDF",
    emptyState: "No file selected.",
    note: "Nothing is uploaded. The file never leaves your browser.",
  },
  channels: {
    eyebrow: "Stay in the loop",
    title: "Market updates, without the newsletter voice.",
    body: "Short notes on market moves, product progress, and launch dates.",
    items: [
      {
        label: "Join Telegram",
        name: "Telegram",
        href: "",
        body: "Fast market notes and launch updates.",
      },
      {
        label: "Join WhatsApp",
        name: "WhatsApp",
        href: "",
        body: "Mobile reminders for milestones and market changes.",
      },
    ],
  },
};

export const contact = {
  eyebrow: "Contact",
  title: "Start a real conversation.",
  body:
    "Sizing up a supplier offer, weighing storage, or ready to argue with something you read here — either way, we'll answer.",
  points: [
    {
      title: "Customers",
      body:
        "Send your interval data and we'll tell you what your load costs to serve.",
    },
    {
      title: "Investors and advisors",
      body:
        "Ask about the portfolio model, the underwriting, or the settlement layer.",
    },
    {
      title: "Partners",
      body:
        "Asset owners, installers, and market participants — there's room to build here.",
    },
  ],
  formEyebrow: "Early access",
  formTitle: "Tell us about your site.",
  earlyAccess:
    "A few lines about your organization and what you're trying to figure out is plenty to start.",
  submitLabel: "Send message",
  successMessage: "Thanks — we've got it and will reach out shortly.",
};

export const earlyBirdFields = [
  { name: "name", label: "Name", type: "text", autocomplete: "name" },
  { name: "email", label: "Email", type: "email", autocomplete: "email" },
  {
    name: "company",
    label: "Company or property",
    type: "text",
    autocomplete: "organization",
  },
  {
    name: "message",
    label: "What you'd like to explore",
    type: "textarea",
    autocomplete: "off",
  },
];

export const contactFields = [
  { name: "name", label: "Name", type: "text", autocomplete: "name" },
  { name: "email", label: "Email", type: "email", autocomplete: "email" },
  {
    name: "company",
    label: "Company",
    type: "text",
    autocomplete: "organization",
  },
  { name: "message", label: "Message", type: "textarea", autocomplete: "off" },
];

export const enrollmentFields = [
  { name: "name", label: "Name", type: "text", autocomplete: "name" },
  { name: "phone", label: "Phone number", type: "tel", autocomplete: "tel" },
  {
    name: "email",
    label: "Email (optional)",
    type: "email",
    autocomplete: "email",
    required: false,
  },
];
