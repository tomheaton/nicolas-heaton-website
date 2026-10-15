// Relative `.js` imports: this module is part of the Vercel routing middleware, which is compiled
// file by file, so the `@/` alias and `.ts` specifiers would not resolve at runtime.
import {
  ABOUT,
  HERO,
  HOURS,
  HOURS_DISPLAY,
  PARTNERS,
  PARTNERS_NOTE,
  POINTS,
  PRICES_LEDE,
  PRICES_NOTE,
  REVIEWS,
  SERVICES,
} from "../constants/content.js";
import {
  ABOUT_COPY,
  ABOUT_PAGE,
  CONTACT_COPY,
  CONTACT_PAGE,
  HOME_PAGE,
  PAGES,
  type Page,
  PRIVACY_PAGE,
} from "../constants/pages.js";
import { PRIVACY } from "../constants/privacy.js";
import { SITE } from "../constants/site.js";
import { formatTime12 } from "./hours.js";

const ORIGIN = `https://${SITE.domain}`;

export const url = (path: string): string => new URL(path, ORIGIN).toString();

/** Joins Markdown blocks with blank lines. */
export const lines = (...blocks: string[]): string => `${blocks.join("\n\n")}\n`;

export const contactList = (): string =>
  [
    `- Address: ${SITE.addressLine1}, ${SITE.addressLine2}`,
    `- Phone: ${SITE.phoneDisplay}`,
    `- Email: ${SITE.email}`,
    `- what3words: ///${SITE.what3words}`,
    `- Directions: ${SITE.mapsDirectionsUrl}`,
  ].join("\n");

export const hoursList = (): string =>
  HOURS_DISPLAY.map(({ day, name }) => {
    const hours = HOURS[day];
    return `- ${name}: ${hours ? `${formatTime12(hours[0])} to ${formatTime12(hours[1])}` : "Closed"}`;
  }).join("\n");

export const pricesList = (): string =>
  SERVICES.map((service) => `- ${service.name}: ${service.price}. ${service.blurb}`).join("\n");

const pagesList = (): string =>
  [
    `- [Home](${url(HOME_PAGE.path)}): services, prices, reviews and opening hours`,
    `- [About](${url(ABOUT_PAGE.path)}): the salon, products and how appointments work`,
    `- [Contact](${url(CONTACT_PAGE.path)}): phone, email, address and opening hours`,
    `- [Privacy](${url(PRIVACY_PAGE.path)}): how personal information is handled`,
    `- [llms.txt](${url("/llms.txt")}): summary of this site for AI agents`,
  ].join("\n");

const homeMarkdown = (): string =>
  lines(
    `# ${HOME_PAGE.title}`,
    `> ${HOME_PAGE.description}`,
    `${HERO.tagline} ${HERO.intro}`,
    "## About",
    ABOUT.lede,
    ABOUT.body,
    POINTS.map((point) => `- **${point.title}**: ${point.body}`).join("\n"),
    "## Prices",
    PRICES_LEDE,
    pricesList(),
    PRICES_NOTE,
    "## Reviews",
    REVIEWS.map(
      (review) =>
        `- "${review.quote}" (${review.name}${review.source ? `, ${review.source}` : ""})`,
    ).join("\n"),
    "## Products",
    PARTNERS_NOTE,
    PARTNERS.map((partner) => `- [${partner.name}](${partner.url})`).join("\n"),
    "## Opening hours",
    hoursList(),
    "## Contact",
    contactList(),
    "## Pages",
    pagesList(),
  );

const aboutMarkdown = (): string =>
  lines(
    `# About ${SITE.name}`,
    `> ${ABOUT_PAGE.description}`,
    ABOUT_COPY.intro,
    `## ${ABOUT.title}`,
    ABOUT.lede,
    ABOUT.body,
    POINTS.map((point) => `- **${point.title}**: ${point.body}`).join("\n"),
    "## Products",
    ABOUT_COPY.products,
    "## Booking",
    ABOUT_COPY.booking,
    pricesList(),
    "## Pages",
    pagesList(),
  );

const contactMarkdown = (): string =>
  lines(
    `# Contact ${SITE.name}`,
    `> ${CONTACT_PAGE.description}`,
    "## Booking",
    CONTACT_COPY.booking,
    CONTACT_COPY.email,
    "## Address",
    CONTACT_COPY.finding,
    contactList(),
    "## Opening hours",
    hoursList(),
    "## Pages",
    pagesList(),
  );

const privacyMarkdown = (): string =>
  lines(
    "# Privacy",
    `> ${PRIVACY_PAGE.description}`,
    ...PRIVACY.flatMap((section) => [`## ${section.heading}`, ...section.paragraphs]),
    "## Pages",
    pagesList(),
  );

const RENDERERS: Record<string, () => string> = {
  [HOME_PAGE.path]: homeMarkdown,
  [ABOUT_PAGE.path]: aboutMarkdown,
  [CONTACT_PAGE.path]: contactMarkdown,
  [PRIVACY_PAGE.path]: privacyMarkdown,
};

/** The page at `pathname`, ignoring a trailing slash, or `undefined` when there is none. */
export const pageForPath = (pathname: string): Page | undefined => {
  const normalised = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return PAGES.find((page) => page.path === normalised);
};

export const markdownForPage = (page: Page): string => {
  const render = RENDERERS[page.path];
  if (!render) throw new Error(`No Markdown renderer for ${page.path}`);
  return render();
};

export const notFoundMarkdown = (pathname: string): string =>
  lines(
    "# Page not found",
    `There is no page at \`${pathname}\` on ${SITE.domain}. The site is a single-salon brochure for ${SITE.name}, a hairdresser in Malmesbury, so the pages below cover everything it publishes.`,
    pagesList(),
    `Sitemap: ${url("/sitemap-index.xml")}`,
  );
