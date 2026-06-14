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
    title: "The Energy Solution Built Around Our Clients",
    body:
      "EZ NRG is reimagining how you participate in the future of energy, aligning everything based on what's best for you on day one.",
    primaryCta: "Join the Early-Bird List",
    secondaryCta: "Learn More",
  },
  dashboard: {
    title: "Strategy layer",
    status: "Future Ready",
    labels: [
      "Customer Value",
      "Energy Strategy",
      "Participation",
      "Alignment",
      "Future Ready",
    ],
  },
  shift: {
    title: "The future of energy is decentralized.",
    body:
      "But decentralization only works when it is designed around the customer experience. Energy is complicated. Markets, infrastructure, technology, and operations often move separately. EZ NRG is building the strategy layer that helps customers make sense of that complexity and participate with confidence.",
    cards: [
      {
        title: "Clear reason to participate",
        body:
          "Customers should understand why participation matters and how it creates value.",
      },
      {
        title: "Simple way to benefit",
        body:
          "Energy strategy should feel practical, guided, and aligned with the customer's real needs.",
      },
      {
        title: "Stakeholder-aligned value",
        body:
          "Customers should not just consume energy. They should share in the value they help create.",
      },
    ],
  },
  beliefs: {
    title: "Customers should be stakeholders, not spectators.",
    body:
      "We are not building around the idea of being customer-obsessed as a slogan. We are building around a stronger principle: customers and clients should become stakeholders in the value EZ NRG helps create.",
    principles: [
      {
        title: "Customer-first strategy",
        body:
          "Energy systems should be shaped around customer goals, not forced onto customers after the fact.",
      },
      {
        title: "Trust before complexity",
        body:
          "Customers need a partner who can translate a complex industry into clear choices.",
      },
      {
        title: "Value from day one",
        body:
          "Participation should feel useful immediately, not only after years of infrastructure change.",
      },
    ],
  },
  finalCta: {
    title: "Be early to the decentralized energy future.",
    body:
      "Join the early-bird list to learn more about EZ NRG and help shape what customer-first energy strategy should become.",
  },
};

export const about = {
  title: "About EZ NRG",
  intro: [
    "EZ NRG is an early-stage energy company focused on making the future of energy decentralized.",
    "We believe the energy transition will scale only when customers have a clear reason to participate, a simple way to benefit, and a trusted partner helping them navigate complexity. Our DeFi platform will act as a verification tool to automate, scale, and build trust through a stakeholder-led model.",
  ],
  founders: [
    { name: "Rishi Patel", role: "Co-founder" },
    { name: "Deepak Sai Pendyala", role: "Co-founder" },
  ],
  note: "More about our work, team, and early access program is coming soon.",
};

export const learn = {
  title: "Understand the energy market before you sign.",
  body:
    "A practical primer on deregulation, supplier choice, FERC 2222, and why customer contracts now matter more than ever.",
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
