import { createFileRoute } from "@tanstack/react-router";
import {
  PrivacyPolicyDocument,
  PrivacyPolicyLayout,
} from "@/components/privacy/privacy-policy-layout";
import { adCanvasPrivacyPolicy } from "@/data/privacy/ad-canvas";
import { AD_CANVAS_OG_IMAGE, buildSeoHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/privacy/ad-canvas")({
  head: () =>
    buildSeoHead({
      title: `${adCanvasPrivacyPolicy.metaTitle} | Evovi`,
      description: adCanvasPrivacyPolicy.metaDescription,
      path: "/privacy/ad-canvas",
      ogImage: AD_CANVAS_OG_IMAGE,
      ogType: "article",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: adCanvasPrivacyPolicy.metaTitle,
          description: adCanvasPrivacyPolicy.metaDescription,
          url: `${SITE_URL}/privacy/ad-canvas`,
          inLanguage: "vi-VN",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Evovi", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Ad Canvas", item: `${SITE_URL}/ad-canvas` },
            {
              "@type": "ListItem",
              position: 3,
              name: "Chính sách quyền riêng tư",
              item: `${SITE_URL}/privacy/ad-canvas`,
            },
          ],
        },
      ],
    }),
  component: AdCanvasPrivacyPolicyPage,
});

function AdCanvasPrivacyPolicyPage() {
  return (
    <PrivacyPolicyLayout content={adCanvasPrivacyPolicy}>
      <PrivacyPolicyDocument content={adCanvasPrivacyPolicy} />
    </PrivacyPolicyLayout>
  );
}
