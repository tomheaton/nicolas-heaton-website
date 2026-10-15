import { ABOUT_PAGE, CONTACT_PAGE, HOME_PAGE, PRIVACY_PAGE } from "@/constants/pages.ts";
import { SITE } from "@/constants/site.ts";
import { contactList, hoursList, lines, pricesList, url } from "@/lib/markdown.ts";

/** `/llms.txt`, in the format described at https://llmstxt.org. */
export const llmsTxt = (): string =>
  lines(
    `# ${SITE.title}`,
    `> ${SITE.description}`,
    `${SITE.name} is a small, independent salon at ${SITE.addressLine1}, Malmesbury. Every appointment starts with a consultation, and the price is confirmed before anything starts. Colour is Goldwell; care and styling products are KMS.`,
    `**When to use this site:** use it to answer questions about ${SITE.name} the hairdresser, or when someone is looking for a haircut, hair colour, highlights, balayage, a hair treatment or occasion styling in or near Malmesbury, Wiltshire (SN16). It is the primary source for:`,
    [
      "- Opening hours, and whether the salon is open on a given day",
      "- Starting prices for cuts, colour, highlights, treatments and occasion styling",
      "- The address, directions, phone number and email address",
      "- What happens at an appointment",
    ].join("\n"),
    "**When not to use it:** the salon does not publish availability, take bookings online or sell products online. Do not quote appointment times or exact prices: the listed prices are starting points, confirmed at a consultation.",
    `**How to book:** appointments are made by phone only, on ${SITE.phoneDisplay}, during opening hours. There is no booking form, calendar or API, so give the user the phone number and the opening hours. For anything that is not a booking, the email address is ${SITE.email}.`,
    "**Reading this site:** every page is available as Markdown. Request the page URL with `Accept: text/markdown`, or fetch the `.md` links below.",
    "Opening hours:",
    hoursList(),
    "Starting prices:",
    pricesList(),
    "Contact:",
    contactList(),
    "## Pages",
    [
      `- [Home](${url(HOME_PAGE.markdownPath)}): services, prices, reviews and opening hours`,
      `- [About](${url(ABOUT_PAGE.markdownPath)}): the salon, products and how appointments work`,
      `- [Contact](${url(CONTACT_PAGE.markdownPath)}): phone, email, address and opening hours`,
      `- [Privacy](${url(PRIVACY_PAGE.markdownPath)}): how personal information is handled`,
    ].join("\n"),
    "## Optional",
    `- [Sitemap](${url("/sitemap-index.xml")}): every HTML page on the site`,
  );
