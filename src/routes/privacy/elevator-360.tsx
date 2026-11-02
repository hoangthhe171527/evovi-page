import { createFileRoute } from "@tanstack/react-router";
import {
  PrivacyPolicyDocument,
  PrivacyPolicyLayout,
} from "@/components/privacy/privacy-policy-layout";
import { elevator360PrivacyPolicy } from "@/data/privacy/elevator-360";
import { buildSeoHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/privacy/elevator-360")({
  head: () =>
    buildSeoHead({
      title: `${elevator360PrivacyPolicy.metaTitle} | Evovi`,
      description:
        "Chính sách quyền riêng tư chính thức của nền tảng và ứng dụng Elevator360 do Evovi phát triển cho doanh nghiệp lắp đặt và bảo trì thang máy.",
      path: "/privacy/elevator-360",
      ogType: "article",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: elevator360PrivacyPolicy.metaTitle,
          description: elevator360PrivacyPolicy.metaDescription,
          url: `${SITE_URL}/privacy/elevator-360`,
          inLanguage: "vi-VN",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Evovi", item: `${SITE_URL}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Chính sách quyền riêng tư Elevator360",
              item: `${SITE_URL}/privacy/elevator-360`,
            },
          ],
        },
      ],
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
