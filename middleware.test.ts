import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import middleware from "./middleware.js";

const call = (path: string, accept?: string, method = "GET") =>
  middleware(
    new Request(`https://www.nicolasheaton.uk${path}`, {
      method,
      headers: accept === undefined ? {} : { accept },
    }),
  );

/** Vercel's signal to carry on to the static file. */
const passedThrough = (response: Response) => response.headers.get("x-middleware-next") === "1";

const CHROME_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";

describe("Accept negotiation on the homepage", () => {
  // Vectors from https://acceptmarkdown.com/guides/accept-parsing, plus real-world headers.
  it.each([
    ["text/markdown", "markdown"],
    ["text/markdown, text/html;q=0.8", "markdown"],
    ["text/html;q=0.5, text/markdown;q=0.9", "markdown"],
    ["text/markdown, text/html, */*", "markdown"],
    ["TEXT/Markdown", "markdown"],
    ["text/html", "html"],
    ["text/markdown;q=0, text/html", "html"],
    ["text/markdown;q=0", "html"],
    [undefined, "html"],
    ["", "html"],
    ["*/*", "html"],
    ["text/*", "html"],
    [CHROME_ACCEPT, "html"],
    ["application/pdf", "406"],
    ["text/html;q=0, text/markdown;q=0", "406"],
  ])("Accept %j serves %s", (accept, expected) => {
    const response = call("/", accept);
    const served = passedThrough(response)
      ? "html"
      : response.status === 406
        ? "406"
        : response.headers.get("content-type")?.startsWith("text/markdown")
          ? "markdown"
          : "other";
    expect(served).toBe(expected);
    expect(response.headers.get("vary")).toBe("Accept");
  });
});

describe("Markdown responses", () => {
  it("serves the homepage as Markdown with the negotiated headers", async () => {
    const response = call("/", "text/markdown");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("vary")).toBe("Accept");
    const body = await response.text();
    expect(body.startsWith("# Nicolas Heaton, Hairdresser in Malmesbury\n")).toBe(true);
    expect(body).toContain("- Thursday: 10am to 7pm");
    expect(body).toContain("- Cut & Finish: from £56.");
    expect(body).toContain("- Phone: 01666 822158");
  });

  it.each([
    ["/about", "# About Nicolas Heaton\n"],
    ["/contact/", "# Contact Nicolas Heaton\n"],
    ["/privacy", "# Privacy\n"],
  ])("serves %s as Markdown", async (path, heading) => {
    const response = call(path, "text/markdown");
    expect(response.status).toBe(200);
    expect((await response.text()).startsWith(heading)).toBe(true);
  });

  it("answers unknown paths with a Markdown 404 that links to llms.txt", async () => {
    const response = call("/__ora-404-probe-33tmr6ty", "text/markdown");
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("vary")).toBe("Accept");
    const body = await response.text();
    expect(body.startsWith("# Page not found\n")).toBe(true);
    expect(body).toContain("`/__ora-404-probe-33tmr6ty`");
    expect(body).toContain("(https://www.nicolasheaton.uk/llms.txt)");
  });

  it("sends headers but no body for HEAD", async () => {
    const response = call("/", "text/markdown", "HEAD");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await response.text()).toBe("");
  });

  it("lists the available types in a 406", async () => {
    const response = call("/contact", "application/pdf");
    expect(response.status).toBe(406);
    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await response.text()).toBe(
      "This page is available as:\n- text/html\n- text/markdown\n",
    );
  });
});

describe("HTML requests", () => {
  it("passes known pages through with Vary and a Link to the Markdown copy", () => {
    const response = call("/contact", CHROME_ACCEPT);
    expect(passedThrough(response)).toBe(true);
    expect(response.headers.get("vary")).toBe("Accept");
    expect(response.headers.get("link")).toBe(
      '</contact.md>; rel="alternate"; type="text/markdown"',
    );
  });

  it("leaves unknown paths to the static HTML 404", () => {
    for (const accept of [CHROME_ACCEPT, "application/pdf"]) {
      const response = call("/no-such-page", accept);
      expect(passedThrough(response)).toBe(true);
      expect(response.headers.get("link")).toBeNull();
    }
  });

  it("does not touch non-GET requests", () => {
    const response = call("/", "text/markdown", "POST");
    expect(passedThrough(response)).toBe(true);
    expect(response.headers.get("vary")).toBeNull();
  });
});

describe("deployability", () => {
  // Vercel compiles middleware.ts and its imports file by file without Vite, so `@/` aliases
  // and `.ts` specifiers break at runtime even though Vitest resolves them.
  it("only uses runtime-resolvable import specifiers in the middleware's import graph", () => {
    const seen = new Set<string>();
    const offenders: string[] = [];
    const visit = (url: URL) => {
      if (seen.has(url.href)) return;
      seen.add(url.href);
      const source = readFileSync(url, "utf8");
      for (const [, specifier = ""] of source.matchAll(/^import [^;]*? from "([^"]+)";/gms)) {
        if (specifier.startsWith("@/") || specifier.endsWith(".ts")) {
          offenders.push(`${url.pathname}: ${specifier}`);
        } else if (specifier.startsWith(".")) {
          visit(new URL(specifier.replace(/\.js$/, ".ts"), url));
        }
      }
    };
    visit(new URL("./middleware.ts", import.meta.url));
    expect(seen.size).toBeGreaterThan(5);
    expect(offenders).toEqual([]);
  });
});
