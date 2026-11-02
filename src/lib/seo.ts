export const SITE_URL = "https://evovi.vn";
export const SITE_NAME = "Evovi";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-evovi.jpg`;
export const AD_CANVAS_OG_IMAGE = `${SITE_URL}/og-ad-canvas.jpg`;

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildSeoHead(config: SeoConfig) {
  const url = absoluteUrl(config.path);
  const image = config.ogImage ?? DEFAULT_OG_IMAGE;
  const imageAlt =
    config.ogImageAlt ??
    "Evovi - Studio kỹ thuật phần mềm thiết kế riêng, hệ thống vận hành và AI cho doanh nghiệp";
  const robots = config.noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const schemas = config.jsonLd
    ? Array.isArray(config.jsonLd)
      ? config.jsonLd
      : [config.jsonLd]
    : [];

  return {
    meta: [
      { title: config.title },
      { name: "description", content: config.description },
      { name: "robots", content: robots },
      { name: "author", content: SITE_NAME },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "vi_VN" },
      { property: "og:type", content: config.ogType ?? "website" },
      { property: "og:title", content: config.title },
      { property: "og:description", content: config.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@evovi" },
      { name: "twitter:title", content: config.title },
      { name: "twitter:description", content: config.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schemas.map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  };
}
