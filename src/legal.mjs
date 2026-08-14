/*
  Legal page copy: Terms of Service and Privacy Policy.

  These live outside content.mjs on purpose. content.mjs holds marketing
  microcopy -- short strings that get edited often. These are long-form legal
  prose that gets edited rarely and reviewed by a lawyer when it does. Mixing
  the two made both harder to scan.

  Both documents share one shape, so one renderer serves both
  (renderLegalDoc in render.mjs):

    { eyebrow, title, effective, intro: [string], sections: [{ heading, paragraphs, bullets? }] }

  [CONFIRM] Four things need the founders' sign-off before launch:
    1. The legal entity name -- "EZ NRG" below is the brand, not necessarily
       the registered entity (e.g. "EZ NRG, Inc.").
    2. A mailing address, required for a complete privacy notice.
    3. The governing-law state in the Terms (marked below).
    4. The effective date, currently the date these pages were drafted.

  This is drafted boilerplate grounded in what the site actually does. It is
  not legal advice and has not been reviewed by counsel.
*/

const CONTACT_EMAIL = "founders@eznrg.ai";
const EFFECTIVE = "Effective August 13, 2026";

export const terms = {
  eyebrow: "Legal",
  title: "Terms of Service",
  effective: EFFECTIVE,
  intro: [
    `These Terms of Service govern your use of eznrg.ai and any content, tools, or forms available on it (the "Site"), operated by EZ NRG ("EZ NRG," "we," "us").`,
    "By using the Site you agree to these terms. If you do not agree, please do not use the Site.",
  ],
  sections: [
    {
      heading: "What this Site is",
      paragraphs: [
        "The Site is informational. It explains how we think about energy procurement, load shape analysis, and supplier contracts, and it lets you contact us or ask to be considered as a customer.",
        "Using the Site does not make you a customer and does not create a supplier relationship. Any energy strategy, procurement, or pricing services we provide are governed exclusively by a separate written agreement signed by both parties. Where these terms and that agreement conflict, the signed agreement controls.",
      ],
    },
    {
      heading: "Nothing here is an offer, a quote, or advice",
      paragraphs: [
        "Statements on the Site about savings, guarantees, refunds, deposits, or pricing describe how our offering is intended to work. They are descriptions, not commitments. They are subject in every case to eligibility, to our review of your usage data, and to the terms of a signed agreement.",
        "Nothing on the Site is financial, investment, tax, legal, or engineering advice, and nothing on it should be relied on as the sole basis for a procurement decision. Illustrative figures and charts — including any load shape shown on the Site — are examples, not projections for your facility.",
      ],
    },
    {
      heading: "Eligibility",
      paragraphs: [
        "You must be at least 18 years old to use the Site. If you submit information on behalf of a business or property, you represent that you are authorized to do so and to share the information you provide.",
      ],
    },
    {
      heading: "Information you submit",
      paragraphs: [
        "You are responsible for the accuracy of what you send us through the Site, including contact details, facility information, and any usage or interval data you authorize us to obtain.",
        "We rely on that information when we assess whether we can serve a site. Inaccurate or incomplete information may lead to an assessment that does not reflect your actual costs.",
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Use the Site for any unlawful purpose or in violation of these terms.",
        "Attempt to gain unauthorized access to the Site, its systems, or any account or data on it.",
        "Interfere with the Site's operation, including through automated scraping, bulk form submissions, or denial-of-service activity.",
        "Submit information you do not have the right to share, or impersonate another person or organization.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The Site's content, design, text, graphics, and code are owned by EZ NRG or its licensors and are protected by intellectual property law. You may view and share the Site for your own evaluation. You may not copy, republish, or create derivative works from it for commercial purposes without our written permission.",
        `"EZ NRG" and our logos are our marks. Nothing on the Site grants you a license to use them.`,
      ],
    },
    {
      heading: "Third-party links and services",
      paragraphs: [
        "The Site may link to third-party sites or services, including messaging platforms we use to reach customers. We do not control those services and are not responsible for their content, terms, or privacy practices. Your use of them is governed by their own terms.",
      ],
    },
    {
      heading: "Availability",
      paragraphs: [
        "We may change, suspend, or discontinue any part of the Site at any time, including features described as coming soon. We do not guarantee that the Site will be available without interruption or free of errors.",
      ],
    },
    {
      heading: "Disclaimer of warranties",
      paragraphs: [
        'THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE INFORMATION ON THE SITE IS COMPLETE, CURRENT, OR ERROR-FREE.',
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, EZ NRG AND ITS OFFICERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOST PROFITS, REVENUE, DATA, OR ENERGY COST SAVINGS, ARISING OUT OF YOUR USE OF THE SITE.",
        "Our total liability for any claim arising out of the Site is limited to one hundred U.S. dollars ($100). Some jurisdictions do not allow these limitations, so they may not apply to you. This section does not limit liability under any separate signed services agreement, which has its own terms.",
      ],
    },
    {
      heading: "Indemnification",
      paragraphs: [
        "You agree to indemnify and hold EZ NRG harmless from any claim, loss, or expense (including reasonable legal fees) arising out of your misuse of the Site, your violation of these terms, or your submission of information you did not have the right to share.",
      ],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        "We may update these terms. When we do, we will change the effective date at the top of this page. Continuing to use the Site after an update means you accept the revised terms.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        // [CONFIRM] Replace with the state of incorporation or principal place
        // of business before launch.
        "These terms are governed by the laws of the State of [STATE], without regard to its conflict-of-laws rules. Any dispute arising out of the Site will be brought in the state or federal courts located in that state, and you consent to their jurisdiction.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about these terms: ${CONTACT_EMAIL}.`,
        "Doubt a claim on this site? Put it to us directly. We would rather answer it now.",
      ],
    },
  ],
};

export const privacy = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  effective: EFFECTIVE,
  intro: [
    "This policy explains what EZ NRG collects when you use eznrg.ai, why we collect it, who we share it with, and what you can ask us to do with it.",
    "The short version: we collect what you send us through a form, plus the usage data you authorize us to obtain from your utility. Your load profile stays yours — you can request it at any time and ask us to erase it whenever you want.",
  ],
  sections: [
    {
      heading: "Information you give us",
      paragraphs: [
        "When you use a form on the Site — to enroll, to join a list, or to reach us — we collect the details you enter. Depending on the form, that can include:",
      ],
      bullets: [
        "Your name and email address.",
        "A cell phone number or Telegram username, if you choose to give one.",
        "The company or property you represent, and your role.",
        "The facility or service address and the utility or market that serves it.",
        "Anything you write in a free-text message field.",
      ],
    },
    {
      heading: "Energy usage and interval data",
      paragraphs: [
        "Assessing a site means reading how it actually uses power — usage hour by hour, typically across a year. We obtain that interval data from your utility only after you authorize the request, or you provide it to us directly.",
        "We use it to model what serving your specific load shape costs, and for nothing else. We do not sell it, and we do not share it with other customers.",
        "You can ask us for a copy of the data we hold about your site at any time, and you can ask us to erase it. See Your choices below.",
      ],
    },
    {
      heading: "Information collected automatically",
      paragraphs: [
        "Like most websites, we collect limited technical information when you visit:",
      ],
      bullets: [
        "Aggregate visit analytics through Vercel Analytics — pages viewed, referring site, approximate region, and device type. It is aggregate and is not used to build a profile of you.",
        "Standard server logs, including IP address, browser user agent, and request time, kept for security and troubleshooting.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "The Site sets one cookie, named eznrg_auth. It records that you entered the site access password so you are not asked again on every page. It is HttpOnly, uses SameSite=Lax, expires after seven days, and holds no personal information.",
        "We do not use advertising cookies, cross-site tracking cookies, or third-party marketing pixels.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: ["We use what we collect to:"],
      bullets: [
        "Respond to you and follow up about enrollment or an inquiry.",
        "Assess whether we can serve your site, and model what it costs to serve.",
        "Send you the updates you asked for, and stop sending them when you ask us to.",
        "Operate, secure, and improve the Site.",
        "Meet legal, regulatory, and recordkeeping obligations.",
      ],
    },
    {
      heading: "How we share it",
      paragraphs: [
        "We do not sell your personal information, and we do not share it for cross-context behavioral advertising. We share it only with service providers that help us run the Site and our business, each of which is limited to that purpose:",
      ],
      bullets: [
        "Resend — delivers the emails generated by our forms, including the message that reaches our team and the confirmation that reaches you.",
        "Vercel — hosts the Site and provides the aggregate analytics described above.",
        "Google Fonts — serves the Site's typefaces; loading a page requests those font files from Google's servers.",
      ],
      trailing: [
        "We may also disclose information if the law requires it, to protect our rights or someone's safety, or in connection with a merger or acquisition — in which case this policy continues to apply to the information transferred.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep enrollment and contact submissions as long as needed to respond to you and to maintain a record of the relationship, and interval data as long as needed to serve your account or as required by law.",
        "When you ask us to erase your data, we delete it from our active systems, subject to any records we are legally required to retain.",
      ],
    },
    {
      heading: "Your choices and rights",
      paragraphs: [
        `You can ask us to access, correct, delete, or send you a copy of the personal information we hold about you, and you can withdraw consent for us to hold your interval data. Email ${CONTACT_EMAIL} and we will respond within the time your jurisdiction requires.`,
        "Depending on where you live — for example California, Colorado, Connecticut, Virginia, or the EU/UK — you may have additional rights, including the right to opt out of sale or sharing (we do neither), the right to non-discrimination for exercising a right, and the right to appeal a decision we make about your request. We honor these rights for everyone who asks, regardless of location.",
        "To stop receiving updates, use the unsubscribe link in any message or email us directly.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "We use industry-standard measures to protect information in transit and at rest, and we limit internal access to the people who need it. No system is perfectly secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "The Site is meant for business and household energy decisions and is not directed to children under 13. We do not knowingly collect information from them. If you believe a child has given us information, contact us and we will delete it.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy. When we do, we will change the effective date at the top of this page. If a change materially affects how we handle information you already gave us, we will make a reasonable effort to notify you directly.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions, requests, or complaints about privacy: ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};
