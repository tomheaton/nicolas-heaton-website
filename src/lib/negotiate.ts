/**
 * Content negotiation between HTML and Markdown, following the rules at
 * https://acceptmarkdown.com/guides/accept-parsing: rank by q-value, break ties by
 * specificity, never pick a type marked q=0.
 */

export type Representation = "text/html" | "text/markdown";

interface AcceptEntry {
  type: string;
  subtype: string;
  q: number;
}

interface Match {
  q: number;
  /** 2 = exact type, 1 = `type/*`, 0 = `*\/*`, -1 = no match. */
  specificity: number;
}

const parseQ = (value: string | undefined): number => {
  const q = Number(value);
  if (value === undefined || value.trim() === "" || Number.isNaN(q)) return 1;
  return Math.min(Math.max(q, 0), 1);
};

const parseAccept = (header: string): AcceptEntry[] =>
  header.split(",").flatMap((part) => {
    const [range = "", ...params] = part.split(";");
    const [type, subtype] = range.trim().toLowerCase().split("/");
    if (!(type && subtype)) return [];
    let q = 1;
    for (const param of params) {
      const [key, value] = param.split("=");
      if (key?.trim().toLowerCase() === "q") q = parseQ(value);
    }
    return [{ type, subtype, q }];
  });

const bestMatch = (entries: readonly AcceptEntry[], mediaType: Representation): Match => {
  const [type, subtype] = mediaType.split("/");
  let best: Match = { q: 0, specificity: -1 };
  for (const entry of entries) {
    let specificity = -1;
    if (entry.type === type && entry.subtype === subtype) specificity = 2;
    else if (entry.type === type && entry.subtype === "*") specificity = 1;
    else if (entry.type === "*" && entry.subtype === "*") specificity = 0;
    if (specificity > best.specificity) best = { q: entry.q, specificity };
  }
  return best;
};

/**
 * Picks the representation to serve for an `Accept` header value, or `null` when neither
 * HTML nor Markdown is acceptable (respond 406). A missing or empty header gets the HTML
 * default.
 */
export const negotiate = (accept: string | null): Representation | null => {
  const entries = parseAccept(accept ?? "");
  if (entries.length === 0) return "text/html";

  const markdown = bestMatch(entries, "text/markdown");
  const html = bestMatch(entries, "text/html");

  if (markdown.q === 0 && html.q === 0) {
    // The client wants a type we cannot produce.
    if (entries.some((entry) => entry.q > 0)) return null;
    // Only rejections (`text/markdown;q=0` means "anything but Markdown"): serve whichever
    // representation was not rejected.
    if (html.specificity < 0) return "text/html";
    if (markdown.specificity < 0) return "text/markdown";
    return null;
  }
  if (markdown.q !== html.q) return markdown.q > html.q ? "text/markdown" : "text/html";
  // Equal q: Markdown only wins when the client named it explicitly. Wildcards keep HTML.
  return markdown.specificity === 2 ? "text/markdown" : "text/html";
};
