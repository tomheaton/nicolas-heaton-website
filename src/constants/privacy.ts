import { SITE } from "./site.js";

export interface PolicySection {
  heading: string;
  paragraphs: readonly string[];
}

const PRIVACY_UPDATED = "15 October 2026";

// TODO(tom): have Nicolas confirm the "Phone calls and email" section matches how bookings are kept
export const PRIVACY: readonly PolicySection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      `This website belongs to Nicolas Heaton Hairdresser, ${SITE.addressLine1}, ${SITE.addressLine2}. Nicolas Heaton is responsible for the personal information described on this page. For any question about it, email ${SITE.email} or call ${SITE.phoneDisplay}.`,
    ],
  },
  {
    heading: "What this website collects",
    paragraphs: [
      "The website has no forms, accounts or mailing list, and it does not set any cookies of its own. You can read every page without giving any personal information.",
    ],
  },
  {
    heading: "Visitor statistics",
    paragraphs: [
      "We use Vercel Web Analytics to count page views and see which pages are read. It does not use cookies. Visits are counted using a hash of the request that is discarded after 24 hours, so the figures cannot be traced back to you.",
    ],
  },
  {
    heading: "Hosting",
    paragraphs: [
      "The website is hosted by Vercel. To deliver pages and protect the site from abuse, Vercel processes technical details such as your IP address and browser type, and keeps them in short-term server logs.",
    ],
  },
  {
    heading: "Map",
    paragraphs: [
      "The contact section shows a map from Google Maps. When the map loads, your browser connects to Google, which receives your IP address and may set cookies. Google's use of that information is covered by its own privacy policy at policies.google.com/privacy.",
    ],
  },
  {
    heading: "Phone calls and email",
    paragraphs: [
      "If you call or email to book, we use your name, phone number, email address and appointment details to arrange and manage your appointments. We keep them only as long as we need them for that. We do not sell them, share them with marketing companies or use them to send marketing.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      `Under UK data protection law you can ask for a copy of the personal information we hold about you, ask us to correct or delete it, and object to how it is used. Email ${SITE.email} and we will reply within one month.`,
      "If you are not happy with how we have handled your information, you can complain to the Information Commissioner's Office at ico.org.uk or on 0303 123 1113.",
    ],
  },
  {
    heading: "Changes to this page",
    paragraphs: [
      `We will update this page if the way the website works changes. Last updated ${PRIVACY_UPDATED}.`,
    ],
  },
];
