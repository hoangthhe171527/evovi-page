import type { EvoviProject } from "@/data/evovi-projects";

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

export function buildHomeJsonLd(projects: readonly EvoviProject[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Evovi",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-512.png`,
      email: "kinhdoanh@evovi.vn",
      telephone: "+84-868-661-235",
      description:
        "Evovi là studio kỹ thuật phần mềm Spec-Driven & AI-Native chuyên tư vấn, thiết kế và xây dựng hệ thống ERP, LMS, OOH, ứng dụng di động hiện trường và tác nhân AI cho doanh nghiệp tại Việt Nam.",
      areaServed: "VN",
      address: [
        { "@type": "PostalAddress", addressLocality: "Hà Nội", addressCountry: "VN" },
        { "@type": "PostalAddress", addressLocality: "TP. Hồ Chí Minh", addressCountry: "VN" },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+84-868-661-235",
          email: "kinhdoanh@evovi.vn",
          contactType: "sales",
          availableLanguage: ["Vietnamese", "English"],
        },
        {
          "@type": "ContactPoint",
          email: "support@evovi.vn",
          contactType: "customer support",
          availableLanguage: ["Vietnamese"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Evovi",
      inLanguage: "vi-VN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Hệ sinh thái sản phẩm và dự án phần mềm thực tế của Evovi",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        ["item"]: {
          "@type": "SoftwareApplication",
          name: p.name,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, iOS, Android",
          description: `${p.tagline}. ${p.solution}`,
          url: p.href ? `${SITE_URL}${p.href}` : `${SITE_URL}/#ecosystem`,
          author: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
  ];
}

export function buildAdCanvasJsonLd(app: {
  name: string;
  packageId: string;
  developer: string;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: app.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      softwareAddOn: app.packageId,
      description:
        "Ứng dụng quản trị quảng cáo ngoài trời (OOH): CRM bán hàng, tồn kho vị trí, theo dõi occupancy và chụp ảnh minh chứng hiện trường.",
      url: `${SITE_URL}/ad-canvas`,
      image: AD_CANVAS_OG_IMAGE,
      publisher: {
        "@type": "Organization",
        name: app.developer,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Evovi", ["item"]: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Ad Canvas", ["item"]: `${SITE_URL}/ad-canvas` },
      ],
    },
  ];
}

export function buildAdCanvasSupportJsonLd(
  faqs: readonly { q: string; a: string }[],
) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Evovi", ["item"]: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Ad Canvas", ["item"]: `${SITE_URL}/ad-canvas` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Hỗ trợ",
          ["item"]: `${SITE_URL}/ad-canvas/support`,
        },
      ],
    },
  ];
}

export function buildPrivacyJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: { name: string; path: string }[];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: opts.title,
      description: opts.description,
      url: absoluteUrl(opts.path),
      inLanguage: "vi-VN",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: opts.breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: b.name,
        ["item"]: absoluteUrl(b.path),
      })),
    },
  ];
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
