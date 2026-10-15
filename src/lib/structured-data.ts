import { DAY_NAMES, HOURS } from "@/constants/content.ts";
import { OG_IMAGE, SITE } from "@/constants/site.ts";
import { formatTime24 } from "@/lib/hours.ts";

const ORIGIN = `https://${SITE.domain}/`;
const ORGANIZATION_ID = `${ORIGIN}#organization`;
const SALON_ID = `${ORIGIN}#salon`;

const address = {
  "@type": "PostalAddress",
  streetAddress: SITE.addressLine1,
  addressLocality: SITE.addressLocality,
  addressRegion: SITE.addressRegion,
  postalCode: SITE.postcode,
  addressCountry: "GB",
};

const openingHours = () =>
  Object.entries(HOURS)
    .map(([day, hours]) => ({ day: Number(day), hours }))
    .filter((entry) => entry.hours !== null)
    .map(({ day, hours }) => {
      const [open, close] = hours as readonly [number, number];
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_NAMES[day],
        opens: formatTime24(open),
        closes: formatTime24(close),
      };
    });

/** The business itself, with the contact details agents use to verify it. */
export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE.name,
  description: SITE.description,
  url: ORIGIN,
  logo: new URL(OG_IMAGE, ORIGIN).toString(),
  email: SITE.email,
  telephone: SITE.phoneTel,
  foundingDate: "2002",
  founder: { "@type": "Person", name: "Nicolas Heaton" },
  address,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: SITE.phoneTel,
    email: SITE.email,
    areaServed: "GB",
    availableLanguage: "en-GB",
  },
});

/** The salon premises, as a local business with opening hours. */
export const salonJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": SALON_ID,
  name: SITE.name,
  description: SITE.description,
  image: new URL(OG_IMAGE, ORIGIN).toString(),
  url: ORIGIN,
  telephone: SITE.phoneTel,
  email: SITE.email,
  priceRange: "££",
  address,
  openingHoursSpecification: openingHours(),
  parentOrganization: { "@id": ORGANIZATION_ID },
});
