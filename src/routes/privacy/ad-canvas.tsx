import { createFileRoute } from "@tanstack/react-router";
import {
  PrivacyPolicyDocument,
  PrivacyPolicyLayout,
} from "@/components/privacy/privacy-policy-layout";
import { adCanvasPrivacyPolicy } from "@/data/privacy/ad-canvas";
import {
  AD_CANVAS_OG_IMAGE,
  buildPrivacyJsonLd,
  buildSeoHead,
} from "@/lib/seo";

export const Route = createFileRoute("/privacy/ad-canvas")({
  head: () =>
    buildSeoHead({
      title: `${adCanvasPrivacyPolicy.metaTitle} | Evovi`,
      description: adCanvasPrivacyPolicy.metaDescription,
      path: "/privacy/ad-canvas",
      ogImage: AD_CANVAS_OG_IMAGE,
      ogType: "article",
      jsonLd: buildPrivacyJsonLd({
        title: adCanvasPrivacyPolicy.metaTitle,
        description: adCanvasPrivacyPolicy.metaDescription,
        path: "/privacy/ad-canvas",
        breadcrumbs: [
          { name: "Evovi", path: "/" },
          { name: "Ad Canvas", path: "/ad-canvas" },
          { name: "Chính sách quyền riêng tư", path: "/privacy/ad-canvas" },
        ],
      }),
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
