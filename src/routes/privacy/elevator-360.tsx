import { createFileRoute } from "@tanstack/react-router";
import {
  PrivacyPolicyDocument,
  PrivacyPolicyLayout,
} from "@/components/privacy/privacy-policy-layout";
import { elevator360PrivacyPolicy } from "@/data/privacy/elevator-360";

const PRIVACY_FONTS = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
  },
] as const;

export const Route = createFileRoute("/privacy/elevator-360")({
  head: () => ({
    meta: [
      { title: elevator360PrivacyPolicy.metaTitle },
      {
        name: "description",
        content: elevator360PrivacyPolicy.metaDescription,
      },
    ],
    links: [...PRIVACY_FONTS],
  }),
  component: Elevator360PrivacyPolicyPage,
});

function Elevator360PrivacyPolicyPage() {
  return (
    <PrivacyPolicyLayout content={elevator360PrivacyPolicy}>
      <PrivacyPolicyDocument content={elevator360PrivacyPolicy} />
    </PrivacyPolicyLayout>
  );
}
