import { createFileRoute, Link } from "@tanstack/react-router";
import { AppPageLayout } from "@/components/apps/app-page-layout";
import { adCanvasApp } from "@/data/apps/ad-canvas";
import { AD_CANVAS_OG_IMAGE, buildSeoHead, SITE_URL } from "@/lib/seo";

const FAQ = [
  {
    q: "Làm sao để đăng nhập Ad Canvas?",
    a: "Ad Canvas dành cho người dùng doanh nghiệp. Liên hệ quản trị viên tổ chức của bạn để được cấp tài khoản và thông tin đăng nhập.",
  },
  {
    q: "Tôi quên mật khẩu hoặc không đăng nhập được?",
    a: "Gửi email tới support@evovi.vn kèm email đăng nhập và tên tổ chức. Đội hỗ trợ sẽ phối hợp quản trị viên tenant để xử lý.",
  },
  {
    q: "Làm sao yêu cầu xóa dữ liệu cá nhân?",
    a: 'Gửi email tới support@evovi.vn với tiêu đề "Ad Canvas - Yêu cầu xóa dữ liệu", kèm email hoặc tên tài khoản và tên tổ chức.',
  },
  {
    q: "Ứng dụng yêu cầu quyền camera và thư viện ảnh để làm gì?",
    a: "Chỉ khi bạn sử dụng tính năng chụp hoặc tải ảnh minh chứng hiện trường (proof of posting). Ad Canvas không truy cập ảnh khi bạn không dùng tính năng này.",
  },
] as const;

export const Route = createFileRoute("/ad-canvas/support")({
  head: () =>
    buildSeoHead({
      title: `Hỗ trợ kỹ thuật · ${adCanvasApp.name} | Evovi`,
      description:
        "Trung tâm hỗ trợ người dùng ứng dụng Ad Canvas của Evovi: liên hệ email, hotline, hướng dẫn đăng nhập tài khoản doanh nghiệp và yêu cầu dữ liệu.",
      path: "/ad-canvas/support",
      ogImage: AD_CANVAS_OG_IMAGE,
      ogImageAlt: "Trung tâm hỗ trợ ứng dụng Ad Canvas của Evovi",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
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
              name: "Hỗ trợ",
              item: `${SITE_URL}/ad-canvas/support`,
            },
          ],
        },
      ],
    }),
  component: AdCanvasSupportPage,
});

function AdCanvasSupportPage() {
  return (
    <AppPageLayout appName={adCanvasApp.name}>
      <article className="space-y-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="max-w-[38ch] text-evo-body text-[#465468]">
              Đội ngũ kỹ thuật Evovi hỗ trợ người dùng Ad Canvas về đăng nhập, quyền truy cập tổ chức, sự cố ứng dụng và yêu cầu dữ liệu trong giờ hành chính (GMT+7).
            </p>
          </div>
          <div className="lg:col-span-7">
            <h1 className="font-display text-evo-hero font-extrabold text-[#0b1320]">
              Hỗ trợ {adCanvasApp.name}
            </h1>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <a
            href={`mailto:${adCanvasApp.supportEmail}?subject=${encodeURIComponent("Ad Canvas - Yêu cầu hỗ trợ")}`}
            className="block border-l-4 border-[#095fd6] bg-white p-7 transition-colors hover:bg-[#dfe6ef]"
          >
            <h2 className="font-display text-evo-h3 font-bold text-[#0b1320]">Email hỗ trợ</h2>
            <p className="mt-2 text-evo-body font-semibold text-[#095fd6]">
              {adCanvasApp.supportEmail}
            </p>
            <p className="mt-2 text-evo-small text-[#465468]">
              Phù hợp cho sự cố kỹ thuật và yêu cầu xử lý dữ liệu tài khoản.
            </p>
          </a>
          <a
            href={`tel:${adCanvasApp.hotline}`}
            className="block border-l-4 border-[#3cb34a] bg-white p-7 transition-colors hover:bg-[#dfe6ef]"
          >
            <h2 className="font-display text-evo-h3 font-bold text-[#0b1320]">Hotline trực tiếp</h2>
            <p className="mt-2 text-evo-body font-semibold tabular-nums text-[#0b1320]">
              {adCanvasApp.hotline}
            </p>
            <p className="mt-2 text-evo-small text-[#465468]">
              Hỗ trợ khẩn cấp cho chiến dịch đang vận hành trong giờ làm việc.
            </p>
          </a>
        </div>

        <section className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-evo-h2 font-extrabold text-[#0b1320]">
              Câu hỏi thường gặp
            </h2>
          </div>
          <dl className="space-y-6 lg:col-span-7">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-white p-6 md:p-7">
                <dt className="font-display text-evo-h3 font-bold text-[#0b1320]">
                  {item.q}
                </dt>
                <dd className="mt-2.5 max-w-[60ch] text-evo-body text-[#465468]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-[#070d18] p-8 text-[#f4f7fb] md:p-10">
          <h2 className="font-display text-evo-h3 font-bold">
            Quyền riêng tư & Dữ liệu doanh nghiệp
          </h2>
          <p className="mt-2.5 max-w-[62ch] text-evo-body text-[#a6b4c8]">
            Xem{" "}
            <Link to="/privacy/ad-canvas" className="font-semibold text-[#f59422] hover:underline">
              Chính sách quyền riêng tư Ad Canvas
            </Link>{" "}
            để nắm rõ cách hệ thống bảo vệ dữ liệu nghiệp vụ. Quay lại{" "}
            <Link to="/ad-canvas" className="font-semibold text-[#f4f7fb] hover:underline">
              trang giới thiệu Ad Canvas
            </Link>
            .
          </p>
        </section>
      </article>
    </AppPageLayout>
  );
}
