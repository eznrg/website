export const site = {
  name: "EZNRG",
  domain: "eznrg.ai",
  url: "https://eznrg.ai",
  description: "Electricity bill auditing for businesses. Upload one bill. No upfront cost. If we recover money, you keep 50%. If we recover nothing, you pay nothing.",
};

export const nav = [
  { label: "How it works", href: "/#how" },
  { label: "Why EZNRG", href: "/#why-eznrg" },
  { label: "FAQ", href: "/#faq" },
];
export const legalNav = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];
export const ui = {
  skipLink: "Skip to content",
  menuLabel: "Toggle navigation",
  footerTagline: "Less energy admin. More room for your business.",
  footerCopyright: "EZNRG. All rights reserved.",
  formError: "Something went wrong. Please try again in a moment.",
};

// One destination for every audit CTA. Keep empty until onboarding is ready.
// Setting this alone is not launch approval; see README's release checklist.
export const audit = {
  href: "",
  label: "Start my audit",
  unavailable: "Available soon",
};

export const home = {
  hero: {
    eyebrow: "Energy intelligence. Working for your business.",
    title: ["Your electricity bill.", "Checked.", "Without the extra work."],
    body: "Upload one bill. We handle the audit and recovery process. No upfront cost—if we recover money, you keep 50%. If we recover nothing, you pay nothing.",
    secondaryCta: "See how it works",
    reassurances: ["Keep your existing broker", "Ongoing auditing is optional"],
  },
  coverage: {
    label: "Auditing businesses across",
    territories: [
      { state: "Illinois", utilities: "ComEd & Ameren" },
      { state: "Indiana", utilities: "NIPSCO" },
      { state: "Ohio", utilities: "All electric utilities" },
    ],
  },
  evidence: {
    label: "A real customer outcome",
    customer: "Hospitality owner",
    summaryTitle: "A closer look. A clearer bill.",
    refundValue: "$248",
    refundLabel: "in eligible refunds identified",
    timeValue: "~2 hours",
    timeLabel: "saved each month on reporting",
    status: "Audit findings",
    note: "One customer's experience. Eligible refunds identified, not a confirmed recovery. Results vary by business.",
    quote: "Out of all my years in business, I've been pitched energy services many times and nobody has ever made it as simple as they did",
    caption: "After a utility bill audit and a solution that reduced manual reporting. Shared anonymously with permission.",
  },
  how: {
    eyebrow: "01 / How it works",
    title: "One bill from you.\nThe rest is on us.",
    body: "You run your business. We do the checking, explain what we find, and handle the recovery process.",
    steps: [
      { index: "01", title: "Upload one bill", body: "Your latest electricity bill is enough to begin. No stack of paperwork to pull together." },
      { index: "02", title: "We check the charges", body: "We compare your billing information against applicable verified rates and charges to identify potential errors." },
      { index: "03", title: "We handle recovery", body: "We explain the findings and pursue eligible refunds. You keep 50% of money actually recovered; EZNRG receives the other 50%." },
    ],
  },
  after: {
    eyebrow: "02 / What happens afterward",
    title: "Start with an audit.\nStay only if you want to.",
    body: "The first audit stands on its own. You choose whether ongoing support makes sense for your business.",
    feeTitle: "Recovered money. Shared equally.",
    yourShare: "50%", yourLabel: "You keep",
    ourShare: "50%", ourLabel: "EZNRG receives",
    feeNote: "Only on money actually recovered. Nothing recovered? Nothing to pay.",
    options: [
      { title: "No upfront cost", body: "We do the audit and pursue eligible refunds. Our fee comes from recoveries, so you don't pay just to find out whether something is wrong." },
      { title: "Continued checks, by choice", body: "Choose Continuous EZNRG Auditing if you want future bills checked too. It is completely optional, with no automatic enrollment and the same 50/50 recovery split." },
      { title: "Less time on reporting", body: "For the hospitality owner featured above, a reporting solution saved about two hours each month. We look for ways to reduce the energy admin in your business, too." },
    ],
  },
  strategy: {
    eyebrow: "03 / Why EZNRG",
    title: "An energy partner.\nAlready on your side.",
    body: "EZNRG is an energy technology and strategy company. The audit is a practical place to start. For qualified businesses, the next step can be a long-term strategy built around how your site actually uses power.",
    pillars: [
      { title: "Your broker stays", body: "You don't need to replace a relationship you trust. We work with brokers across the United States to enhance their offerings without disrupting their operations." },
      { title: "Analysis you can follow", body: "We connect billing information, usage patterns, and energy costs so you can understand our findings and the reasons behind our recommendations." },
      { title: "A strategy that fits", body: "Long-term partnerships require qualification. We assess your site and back agreed pricing with our own capital. Pricing guarantees apply to these arrangements, with terms agreed individually." },
    ],
    note: "An audit does not commit you to ongoing auditing or a long-term energy partnership.",
  },
  faq: {
    eyebrow: "04 / A few good questions",
    title: "Clear answers.\nBefore you start.",
    items: [
      { question: "What does the audit cost?", answer: "There is no upfront cost. If we recover money, you keep 50% and EZNRG receives 50%. The fee is based on money actually recovered, not simply on errors or eligible refunds identified." },
      { question: "What if you don't recover any money?", answer: "You pay nothing. An audit may find that your bill is correct, and finding an eligible refund does not itself mean a recovery has been completed." },
      { question: "What do I have to do?", answer: "Upload your latest electricity bill to begin. We handle the checking, explain the findings, and manage the recovery process. If we need further information or authorization, we'll explain what's needed." },
      { question: "Which businesses can you audit?", answer: "We audit electricity bills for businesses and property owners served by ComEd or Ameren in Illinois, NIPSCO in Indiana, and all electric utilities in Ohio." },
      { question: "Can I keep my existing broker?", answer: "Yes. We work alongside existing brokers. We also work with brokers across the United States to enhance their offerings without disrupting their operations; our current audit service territories are listed above." },
      { question: "Am I signing up for ongoing auditing?", answer: "No. The initial audit stands on its own. Continuous EZNRG Auditing is completely optional, with no automatic enrollment. If you choose it, future recoveries follow the same 50/50 split." },
      { question: "Is the audit the same as your energy-strategy service?", answer: "No. The audit checks your bills and pursues eligible refunds. A long-term energy partnership is a separate, optional next step for qualified businesses. Pricing guarantees belong to those arrangements, with terms agreed individually; they do not promise that every audit produces a refund." },
    ],
  },
  closing: {
    eyebrow: "One bill is all it takes to begin",
    title: "Let us take a look.\nYou get back to business.",
    body: "No upfront cost. You keep 50% of money recovered. Nothing recovered, nothing to pay.",
  },
};

// Legacy intake is intentionally isolated until the onboarding phase.
export const enrollment = {
  eyebrow: "Get started",
  title: "Find out if you qualify.",
  body:
    "No payment today — just leave your name and number. We'll reach out within 24 hours to walk you through your next steps, including the refundable $500 deposit. If you ever decide not to move forward, the full $500 is returned.",
  submitLabel: "Reserve my spot",
  successMessage:
    "You're on the list. We'll text you within 24 hours to coordinate a call — no payment is collected here.",
};

export const enrollmentFields = [
  { name: "name", label: "Name", type: "text", autocomplete: "name" },
  { name: "email", label: "Email", type: "email", autocomplete: "email" },
  {
    name: "telegram",
    label: "Telegram username (optional)",
    type: "text",
    autocomplete: "off",
    required: false,
  },
  {
    name: "phone",
    label: "Cell phone (optional)",
    type: "tel",
    autocomplete: "tel",
    required: false,
  },
];
