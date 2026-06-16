import { createFileRoute } from "@tanstack/react-router";
import {
  PrivacyPolicyDocument,
  PrivacyPolicyLayout,
} from "@/components/privacy/privacy-policy-layout";
import { adCanvasPrivacyPolicy } from "@/data/privacy/ad-canvas";

const PRIVACY_FONTS = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
  },
] as const;

export const Route = createFileRoute("/privacy/ad-canvas")({
  head: () => ({
    meta: [
      { title: adCanvasPrivacyPolicy.metaTitle },
      {
        name: "description",
        content: adCanvasPrivacyPolicy.metaDescription,
      },
    ],
    links: [...PRIVACY_FONTS],
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
