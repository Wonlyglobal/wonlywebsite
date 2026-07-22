import { useEffect } from "react";

/**
 * Site-wide SEO constants.
 * Canonical/production domain used for per-route canonical + Open Graph URLs.
 * Change SITE_URL in one place if the production domain differs.
 */
export const SITE_URL = "https://www.wonlyglobal.com";
export const SITE_NAME = "WONLY";
export const DEFAULT_OG_IMAGE =
  "https://picture-search.tiangong.cn/image/rt/85f08a10a5a0545fe837c5fde708f694.jpg";

type JsonLd = Record<string, unknown>;

interface SeoInput {
  /** Full <title> text (include brand suffix). */
  title: string;
  /** ~150–160 char meta description with the page's target keywords. */
  description: string;
  /** Route path beginning with "/", e.g. "/products/security-doors/x70". */
  path: string;
  /** Absolute image URL for OG/Twitter cards. */
  image?: string;
  /** Open Graph type. */
  type?: "website" | "article" | "product";
  /** One JSON-LD object or an array of them. */
  jsonLd?: JsonLd | JsonLd[];
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Dependency-free per-route SEO. Updates document title, meta description,
 * Open Graph / Twitter tags, the canonical link, and injects managed JSON-LD
 * blocks that are cleaned up when the route unmounts.
 *
 * NOTE: This runs client-side. Google renders JS and will see these tags, but
 * non-rendering scrapers (Facebook, LinkedIn, some Slack/Twitter fetches) read
 * only the static index.html head. Truly robust social previews require
 * prerendering/SSG — tracked as a follow-up, see HANDOFF.md.
 */
export function useSeo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
}: SeoInput) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    // GitHub Pages serves each prerendered route as /<path>/index.html — i.e.
    // with a trailing slash — and 301-redirects the no-slash form. Normalise the
    // canonical + og:url to the trailing-slash form so the sitemap URL, the
    // served URL and the canonical all match exactly (no redirect in between).
    const normPath = path === "/" ? "/" : path.endsWith("/") ? path : path + "/";
    const url = SITE_URL + normPath;

    document.title = title;
    document.documentElement.lang = "en";

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", url);

    const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    const nodes = blocks.map((block) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.text = JSON.stringify(block);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      nodes.forEach((node) => node.remove());
    };
    // jsonLdKey captures deep changes to jsonLd without unstable identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, jsonLdKey]);
}
