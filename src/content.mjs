export const site = {
  name: "EZ NRG",
  domain: "eznrg.ai",
  url: "https://eznrg.ai",
  description:
    "EZ NRG is building customer-first energy strategy for the decentralized energy future.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Learn", href: "/learn" },
  { label: "Contact", href: "/contact" },
];

export const home = {
  hero: {
    eyebrow: "Customer-first energy strategy",
    title: "The Energy Platform Built Around You",
    body:
      "EZ NRG is making it seamless for you to participate in the future of energy, aligning everything based on what's best for you on day one.",
    primaryCta: "Enroll Now",
    primaryHref: "/get-started",
    secondaryCta: "Learn More",
  },
  dashboard: {
    title: "Strategy layer",
    status: "Future Ready",
    labels: [
      "Hardware Install",
      "Procurement",
      "Intelligence",
      "BTMG Assets",
      "Future Optimized",
    ],
  },
  shift: {
    title: "Energy Decentralization",
    body:
      'But we believe that decentralization will only work at scale if customers have real optionality. Energy offerings are buried in complexity and many programs operate as "bait and switch" or through aggressive sales tactics or third-party sellers. EZ NRG is building the optimization, coordination and settlement layer that turns complexity into confidence.',
    cards: [
      {
        title: "Pathways to Participate",
        body:
          "map your load to a custom contract position, and future asset options into a practical participation plan without forcing a big-bang commitment.",
      },
      {
        title: "Shared Benefits",
        body:
          "Coordinate customers, asset owners, and market partners so savings, flexibility value, and program revenue are shared clearly.",
      },
      {
        title: "Aligned Incentives",
        body:
          "Turn flexible load, storage batteries, and future VPP participation into a strategy where customer outcomes drive every decision.",
      },
    ],
  },
  beliefs: {
    title: "Working Backwards From The Customer Experience",
    body:
      "we put our money where our mouth is. Just read our contract - that's all you need to do. The only double-sided and fair energy contract in the industry. Enroll now to try it for completely free!",
  },
  storage: {
    eyebrow: "Storage Batteries",
    title: "Flexibility is The Product. We're the Engine. You're the Driver",
    body:
      "A 110 kW ESS can help customers reduce peak exposure, create optionality for VPPs, and prepare for Capacity and Demand Charge Reduction without taking on unnecessary complexity.",
    offer: "$0 Monthly for First 100 users",
    proof: [
      "Demand Charge Reduction through smarter peak management.",
      "Capacity strategy that keeps future participation options open.",
      "VPP readiness designed around customer control and value sharing.",
    ],
    cards: [
      {
        title: "Peak Management",
        body:
          "Use storage dispatch to reduce costly demand events and make site flexibility visible before contract decisions are locked in.",
      },
      {
        title: "Capacity Optionality",
        body:
          "Position battery flexibility for future Capacity value while keeping the operating strategy aligned with customer needs.",
      },
      {
        title: "VPP Pathway",
        body:
          "Prepare for VPPs with a practical participation model that can grow as market programs, tariffs, and controls mature.",
      },
    ],
  },
  finalCta: {
    title: "Start Turning Flexibility Into Revenue.",
    body:
      "Join the early-bird list to see how storage batteries, flexible load, and VPP participation can help your site reduce energy risk and create new earning opportunities.",
  },
};

export const enrollment = {
  overview: {
    eyebrow: "Get started",
    title: "See what EZ NRG can do for you.",
    body:
      "Enrollment is a simple way to let us look at your utility setup and show where EZ NRG may be able to help. It is quick, guided, and built so you can understand the opportunity without pressure.",
    primaryCta: "Start My Review",
    secondaryCta: "See Deposit Details",
    steps: [
      {
        title: "1. Start with the basics",
        body:
          "Tell us who to contact and the best number to reach you. No long form up front, no sales pressure, and no commitment just to get started.",
      },
      {
        title: "2. Let us read the energy picture",
        body:
          "Upload a utility bill or enter the details manually. We use that context to understand your account, your market, and where better options may exist.",
      },
      {
        title: "3. Decide with confidence",
        body:
          "If the fit makes sense, the refundable deposit starts the deeper review. If it does not, you are not locked into anything.",
      },
    ],
  },
  deposit: {
    eyebrow: "Refundable deposit",
    title: "Final step: place the refundable $500 deposit.",
    body:
      "After intake, the deposit gives EZ NRG the signal to begin reviewing your load, site context, storage fit, and future VPP or demand-charge opportunities. It is fully refundable if you do not move forward for any reason.",
    highlights: [
      "Requested after contact and utility details.",
      "Fully refundable if you decide not to move forward.",
      "Used to begin load shaping and proposal development.",
      "No payment is collected on this website yet.",
    ],
    placeholder: "Payment integration coming soon.",
    primaryCta: "Back to Intake",
    secondaryCta: "Back to Overview",
  },
  intake: {
    eyebrow: "Enrollment intake",
    title: "Start with name and phone.",
    body:
      "The enrollment intake is broken into short steps so customers can start with name and phone, then choose whether to upload a utility bill or enter utility information manually.",
    submitLabel: "Submit Intake and Continue to Deposit",
    successMessage:
      "Thanks. Your enrollment intake was received and the deposit page is loading.",
    steps: [
      "Contact",
      "Utility",
      "Deposit",
    ],
  },
};

export const about = {
  title: "EZ NRG",
  intro: [
    "EZ NRG is a stakeholder-enablement partner making the future of energy decentralized.",
    "We believe the energy transition will scale only when customers have a clear reason to participate, a simple way to benefit, and a trusted partner helping them navigate complexity. Our DeFi platform will act as a verification tool to automate, scale, and build trust through a stakeholder-led model.",
  ],
  founders: [
    { name: "Rishi Patel", role: "Co-founder" },
    { name: "Deepak Sai Pendyala", role: "Co-founder" },
  ],
  note: "More about our work, team, and early access program is coming soon.",
};

export const learn = {
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
        "In some states, customers can choose who supplies the energy commodity while the utility still delivers it.",
    },
    {
      label: "Next market",
      value: "Customer assets",
      body:
        "Flexible load, batteries, EVs, solar, and controls can become part of the energy strategy.",
    },
  ],
  modules: [
    {
      id: "why",
      label: "Why deregulation",
      kicker: "The original idea",
      title: "Deregulation separated energy supply from the wires.",
      body:
        "Electricity was historically delivered through vertically integrated utilities. Restructuring opened parts of the market so generators and suppliers could compete, while transmission and distribution wires remained regulated infrastructure.",
      bullets: [
        "The promise was more competition, more product choice, and sharper price signals.",
        "Wholesale competition developed around regional markets, open access transmission, and market-based rates.",
        "Retail choice added supplier contracts for customers in states that adopted choice programs.",
      ],
    },
    {
      id: "worked",
      label: "What worked",
      kicker: "The useful part",
      title: "Choice created room for better procurement and better energy products.",
      body:
        "For customers who can compare offers and manage risk, competitive supply can create value. It also helped normalize products tied to renewables, demand response, fixed pricing, index pricing, and operational flexibility.",
      bullets: [
        "Large customers gained more ways to hedge, budget, and negotiate around usage shape.",
        "Markets created clearer signals for when energy is scarce, cheap, congested, or flexible.",
        "Suppliers and aggregators can design products around customer goals instead of one default utility tariff.",
      ],
    },
    {
      id: "failed",
      label: "Where it failed",
      kicker: "The customer problem",
      title: "Choice without interpretation can become another layer of risk.",
      body:
        "The hard part is not picking a supplier logo. It is understanding the contract. Many customers face teaser rates, auto-renewals, pass-through charges, vague green claims, demand clauses, bandwidth limits, and termination language that can quietly change the economics.",
      bullets: [
        "The cheapest headline rate can be worse once usage bands, swing tolerances, adders, and fees are included.",
        "Customers often lack a simple explanation of who owns which risk: supplier, utility, market, or customer.",
        "Deregulation gave customers options, but not always the tools to judge whether the option is aligned.",
      ],
    },
    {
      id: "ferc",
      label: "FERC 2222",
      kicker: "The next shift",
      title: "FERC 2222 pushes markets toward customer-side resources.",
      body:
        "Order 2222 lets distributed energy resource aggregators compete in organized wholesale markets. In plain English, assets located on or behind customer sites can be grouped together and offered into markets that historically centered on large generators.",
      bullets: [
        "Relevant resources can include storage, distributed generation, demand response, efficiency, thermal storage, EVs, and charging equipment.",
        "The opportunity is not automatic. Value depends on tariffs, meter data, controls, operational limits, market rules, and contract terms.",
        "For customers, the question shifts from 'what rate did I sign?' to 'how should my site participate?'",
      ],
    },
    {
      id: "eznrg",
      label: "Where EZ NRG fits",
      kicker: "The strategy layer",
      title: "We help translate market complexity into customer advantage.",
      body:
        "EZ NRG is building around the customer decision layer: contract terms, facility behavior, supplier economics, utility rules, and future participation opportunities. The goal is to make energy strategy understandable before money is committed.",
      bullets: [
        "Explain the contract before it becomes a surprise on the bill.",
        "Identify tradeoffs between fixed price, index exposure, flexibility, and operational constraints.",
        "Align procurement, load strategy, and future distributed resource participation around what is best for the customer.",
      ],
    },
  ],
  watchlist: [
    {
      title: "Price structure",
      body:
        "Fixed, index, block, capacity, transmission, ancillary, balancing, and pass-through language can shift the real price.",
    },
    {
      title: "Usage flexibility",
      body:
        "Bandwidth, swing, minimum usage, peak-demand, and material-change terms decide how much your operations can vary.",
    },
    {
      title: "Exit rights",
      body:
        "Auto-renewal, notice windows, early termination formulas, and assignment clauses matter before conditions change.",
    },
    {
      title: "Future participation",
      body:
        "Solar, batteries, demand response, EV charging, and curtailment programs can conflict with supplier or utility terms.",
    },
  ],
  upload: {
    eyebrow: "Contract agent preview",
    title: "Upload a third-party supplier contract file",
    body:
      "The future backend agent will review supplier contracts and explain hidden terms, tradeoffs, risks, and customer-friendly negotiation points.",
    button: "Upload supplier contract PDF",
    note: "PDFs are not sent anywhere.",
  },
  channels: {
    eyebrow: "Stay in the loop",
    title: "Get market updates and launch notes.",
    body:
      "Join the EZ NRG Telegram and WhatsApp channels for practical market updates, product progress, and launch-date announcements.",
    items: [
      {
        label: "Join Telegram",
        name: "Telegram",
        href: "",
        body:
          "Fast market notes, launch updates, and customer education drops.",
      },
      {
        label: "Join WhatsApp",
        name: "WhatsApp",
        href: "",
        body:
          "Mobile-friendly reminders for product milestones and important energy-market changes.",
      },
    ],
  },
};

export const contact = {
  title: "Contact EZ NRG",
  body:
    "Interested in learning more, becoming an early user, or starting a conversation about customer-first energy strategy? Reach out below.",
  earlyAccess:
    "Want to be part of the early-bird group? Tell us a little about your organization and what you are hoping to explore.",
};

export const earlyBirdFields = [
  { name: "name", label: "Name", type: "text", autocomplete: "name" },
  { name: "email", label: "Email", type: "email", autocomplete: "email" },
  {
    name: "company",
    label: "Company",
    type: "text",
    autocomplete: "organization",
  },
  {
    name: "role",
    label: "Role or title",
    type: "text",
    autocomplete: "organization-title",
  },
  {
    name: "message",
    label: "Message / interest",
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
  { name: "email", label: "Email", type: "email", autocomplete: "email" },
  {
    name: "company",
    label: "Company",
    type: "text",
    autocomplete: "organization",
  },
  {
    name: "role",
    label: "Role/title",
    type: "text",
    autocomplete: "organization-title",
  },
  { name: "phone", label: "Phone", type: "tel", autocomplete: "tel" },
  {
    name: "facility",
    label: "Facility or service address",
    type: "text",
    autocomplete: "street-address",
  },
  {
    name: "utility",
    label: "Utility / market",
    type: "text",
    autocomplete: "off",
  },
  {
    name: "loadContext",
    label: "Current load, demand, or bill context",
    type: "textarea",
    autocomplete: "off",
  },
  {
    name: "goalsTiming",
    label: "Goals / timing",
    type: "textarea",
    autocomplete: "off",
  },
];
