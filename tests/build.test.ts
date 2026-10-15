import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { build } from "astro";
import { beforeAll, describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (path: string) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const exists = (path: string) => existsSync(new URL(`../dist/${path}`, import.meta.url));

/** Visible text inside `<main>`, with tags, styles and scripts removed. */
const mainText = (html: string): string =>
  (html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? "")
    .replace(/<(style|script)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const jsonLd = (html: string): Record<string, unknown>[] =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
    JSON.parse(match[1] ?? "{}"),
  );

beforeAll(async () => {
  await build({ root, logLevel: "error" });
}, 120_000);

describe("llms.txt", () => {
  it("follows the llmstxt.org structure", () => {
    const text = read("llms.txt");
    const blocks = text.split("\n\n");
    expect(blocks[0]).toBe("# Nicolas Heaton, Hairdresser in Malmesbury");
    expect(blocks[1]?.startsWith("> ")).toBe(true);
    // Only one H1, and no headings below H2.
    expect(text.match(/^# /gm)).toHaveLength(1);
    expect(text).not.toMatch(/^#{3,} /m);
    // Every H2 section is a list of links.
    const sections = text.split(/^## .*$/m).slice(1);
    expect(sections.length).toBeGreaterThan(0);
    for (const section of sections) {
      const items = section.trim().split("\n");
      for (const item of items) expect(item).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)]+\)(: .+)?$/);
    }
  });

  it("tells agents when to use the site and how to book", () => {
    const text = read("llms.txt");
    expect(text).toContain("**When to use this site:**");
    expect(text).toContain("**How to book:** appointments are made by phone only, on 01666 822158");
  });

  it("links only to Markdown files that exist in the build", () => {
    const links = [
      ...read("llms.txt").matchAll(/\]\(https:\/\/www\.nicolasheaton\.uk\/([^)]+)\)/g),
    ];
    const markdown = links.map((link) => link[1] ?? "").filter((path) => path.endsWith(".md"));
    expect(markdown).toEqual(["index.md", "about.md", "contact.md", "privacy.md"]);
    for (const path of markdown) expect(exists(path), path).toBe(true);
  });
});

describe("trust pages", () => {
  it.each([
    ["about", "About the salon"],
    ["contact", "Contact"],
    ["privacy", "Privacy"],
  ])("/%s has a heading and at least 500 characters of content", (page, heading) => {
    const html = read(`${page}/index.html`);
    expect(html).toMatch(/<h1[\s>]/);
    expect(mainText(html)).toContain(heading);
    expect(mainText(html).length).toBeGreaterThanOrEqual(500);
    expect(html).toContain(`<link rel="canonical" href="https://www.nicolasheaton.uk/${page}">`);
    expect(html).toContain(`<link rel="alternate" type="text/markdown" href="/${page}.md">`);
  });

  it("are listed in the sitemap", () => {
    const sitemap = read("sitemap-0.xml");
    for (const page of ["about", "contact", "privacy"]) {
      expect(sitemap).toContain(`<loc>https://www.nicolasheaton.uk/${page}</loc>`);
    }
  });
});

describe("structured data", () => {
  it("describes the business as an Organization with contact point and address", () => {
    const organization = jsonLd(read("index.html")).find(
      (item) => item["@type"] === "Organization",
    );
    expect(organization).toMatchObject({
      "@context": "https://schema.org",
      name: "Nicolas Heaton",
      url: "https://www.nicolasheaton.uk/",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+441666822158",
        email: "hello@nicolasheaton.uk",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "16 Griffin Alley",
        postalCode: "SN16 9AU",
        addressCountry: "GB",
      },
    });
  });

  it("keeps the HairSalon block with opening hours", () => {
    const salon = jsonLd(read("index.html")).find((item) => item["@type"] === "HairSalon");
    expect(salon?.openingHoursSpecification).toContainEqual({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:30",
      closes: "16:00",
    });
  });
});

describe("static Markdown copies", () => {
  it("ships the homepage as index.md", () => {
    expect(read("index.md").startsWith("# Nicolas Heaton, Hairdresser in Malmesbury\n")).toBe(true);
  });
});
