import type { APIRoute, GetStaticPaths } from "astro";
import { PAGES, type Page } from "@/constants/pages.ts";
import { markdownForPage } from "@/lib/markdown.ts";

export const getStaticPaths = (() =>
  PAGES.map((page) => ({
    params: { page: page.markdownPath.replace(/^\//, "").replace(/\.md$/, "") },
    props: { page },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ page: Page }> = ({ props }) =>
  new Response(markdownForPage(props.page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
