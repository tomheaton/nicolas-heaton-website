import { SITE } from "./site.js";

export interface Page {
  /** Canonical HTML path. */
  path: string;
  /** Static Markdown copy of the page, also served from `path` for `Accept: text/markdown`. */
  markdownPath: string;
  title: string;
  description: string;
}

export const HOME_PAGE: Page = {
  path: "/",
  markdownPath: "/index.md",
  title: SITE.title,
  description: SITE.description,
};

export const ABOUT_PAGE: Page = {
  path: "/about",
  markdownPath: "/about.md",
  title: `About, ${SITE.name}`,
  description:
    "About Nicolas Heaton, an independent hairdresser in Malmesbury, Wiltshire, since 2002: how appointments work, the products used and how to book.",
};

export const CONTACT_PAGE: Page = {
  path: "/contact",
  markdownPath: "/contact.md",
  title: `Contact, ${SITE.name}`,
  description: `Phone, email, address and opening hours for Nicolas Heaton, hairdresser at ${SITE.addressLine1}, Malmesbury. Appointments by phone on ${SITE.phoneDisplay}.`,
};

export const PRIVACY_PAGE: Page = {
  path: "/privacy",
  markdownPath: "/privacy.md",
  title: `Privacy, ${SITE.name}`,
  description:
    "How the Nicolas Heaton website and salon handle personal information, and your rights under UK data protection law.",
};

export const PAGES: readonly Page[] = [HOME_PAGE, ABOUT_PAGE, CONTACT_PAGE, PRIVACY_PAGE];

export const ABOUT_COPY = {
  intro: `Nicolas Heaton is an independent hairdresser at ${SITE.addressLine1} in Malmesbury, Wiltshire. The salon has been open since 2002 and works with one client at a time.`,
  products:
    "Colour is by Goldwell. Care and styling products are by KMS. Both are used in the chair and sold in the salon to take home.",
  booking: `Appointments are booked by phone on ${SITE.phoneDisplay}. Prices are listed as starting points and confirmed at the consultation, before any work begins.`,
} as const;

export const CONTACT_COPY = {
  booking: `Appointments are booked by phone. Call ${SITE.phoneDisplay} during opening hours to book, move or cancel an appointment.`,
  email: `For anything that is not a booking, email ${SITE.email}.`,
  finding: `The salon is at ${SITE.addressLine1}, ${SITE.addressLine2}. The what3words address is ///${SITE.what3words}.`,
} as const;
