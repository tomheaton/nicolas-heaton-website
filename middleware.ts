import { next } from "@vercel/functions";
import { markdownForPage, notFoundMarkdown, pageForPath } from "./src/lib/markdown.js";
import { negotiate } from "./src/lib/negotiate.js";

/**
 * Vercel Routing Middleware. Serves the Markdown version of a page when the request's Accept
 * header prefers `text/markdown`, and a Markdown 404 for unknown paths. Everything else falls
 * through to the static site.
 */
export const config = {
  // Page paths only: skip anything with a file extension and Vercel's own endpoints.
  matcher: ["/((?!_vercel/|.*\\.).*)"],
};

const VARY = "Accept";

export default function middleware(request: Request): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return next();

  const { pathname } = new URL(request.url);
  const page = pageForPath(pathname);
  const representation = negotiate(request.headers.get("accept"));
  const body = (text: string) => (request.method === "HEAD" ? null : text);

  if (representation === "text/html") {
    const headers: Record<string, string> = { Vary: VARY };
    if (page) headers.Link = `<${page.markdownPath}>; rel="alternate"; type="text/markdown"`;
    return next({ headers });
  }

  if (representation === null) {
    // Unknown paths keep the normal HTML 404.
    if (!page) return next({ headers: { Vary: VARY } });
    return new Response(body("This page is available as:\n- text/html\n- text/markdown\n"), {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        Vary: VARY,
      },
    });
  }

  return new Response(body(page ? markdownForPage(page) : notFoundMarkdown(pathname)), {
    status: page ? 200 : 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      Vary: VARY,
    },
  });
}
