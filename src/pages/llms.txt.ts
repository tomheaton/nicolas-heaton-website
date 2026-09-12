import type { APIRoute } from "astro";
import { OPENING_HOURS, SERVICES } from "@/constants/content.ts";
import { NAV } from "@/constants/nav.ts";
import { SITE } from "@/constants/site.ts";
import { formatDay } from "@/lib/hours.ts";

/**
 * `/llms.txt` — a plain-text summary for language models, generated from the same
 * constants the pages render so the two can never drift apart.
 */
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site ?? `https://${SITE.domain}`).toString();

  const body = `# ${SITE.title}

> ${SITE.description}

Nicolas Heaton is a small, independent hairdresser based at ${SITE.addressLine1}, ${SITE.addressLocality}, working with every kind of hair — a short back and sides through to full colour. Appointments start with a consultation and are made by phone.

## Visit
- [Homepage](${url("/")})
${NAV.map((item) => `- [${item.label}](${url(item.href)})`).join("\n")}

## Contact
- Address: ${SITE.addressLine1}, ${SITE.addressLine2}
- Phone: ${SITE.phoneDisplay}
- Email: ${SITE.email}
- what3words: ///${SITE.what3words}

## Opening hours
${OPENING_HOURS.map((day) => `- ${day.name}: ${formatDay(day)}`).join("\n")}

## Price list
Prices are a starting point and are confirmed at consultation.

${SERVICES.map((service) => `- ${service.name}: ${service.price} — ${service.blurb}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
