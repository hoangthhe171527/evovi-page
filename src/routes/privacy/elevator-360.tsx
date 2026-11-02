import { createFileRoute } from "@tanstack/react-router";
import {
  PrivacyPolicyDocument,
  PrivacyPolicyLayout,
} from "@/components/privacy/privacy-policy-layout";
import { elevator360PrivacyPolicy } from "@/data/privacy/elevator-360";
import { buildPrivacyJsonLd, buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy/elevator-360")({
  head: () =>
    buildSeoHead({
      title: `${elevator360PrivacyPolicy.metaTitle} | Evovi`,
      description:
        "Chính sách quyền riêng tư chính thức của nền tảng và ứng dụng Elevator360 do Evovi phát triển cho doanh nghiệp lắp đặt và bảo trì thang máy.",
      path: "/privacy/elevator-360",
      ogType: "article",
      jsonLd: buildPrivacyJsonLd({
        title: elevator360PrivacyPolicy.metaTitle,
        description: elevator360PrivacyPolicy.metaDescription,
        path: "/privacy/elevator-360",
        breadcrumbs: [
          { name: "Evovi", path: "/" },
          {
            name: "Chính sách quyền riêng tư Elevator360",
            path: "/privacy/elevator-360",
          },
        ],
      }),
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
