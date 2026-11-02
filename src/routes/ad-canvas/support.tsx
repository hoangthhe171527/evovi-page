import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { AppPageLayout } from "@/components/apps/app-page-layout";
import { CopyContactChip } from "@/components/ui/CopyContactChip";
import { adCanvasApp } from "@/data/apps/ad-canvas";
import {
  AD_CANVAS_OG_IMAGE,
  buildAdCanvasSupportJsonLd,
  buildSeoHead,
} from "@/lib/seo";

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
      jsonLd: buildAdCanvasSupportJsonLd(FAQ),
    }),
  component: AdCanvasSupportPage,
});

function AdCanvasSupportPage() {
  return (
    <AppPageLayout appName={adCanvasApp.name}>
      <article className="space-y-14">
        {/* Pillar 2 & 3: H1 leads first on Mobile, 16px mobile proximity */}
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
              Đội ngũ kỹ thuật Evovi hỗ trợ người dùng Ad Canvas về đăng nhập, quyền truy cập tổ chức, sự cố ứng dụng và yêu cầu dữ liệu trong giờ hành chính (GMT+7).
            </p>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <h1 className="font-display text-evo-hero font-bold text-[#f5f8ff]">
              Hỗ trợ {adCanvasApp.name}
            </h1>
          </div>
        </div>

        <div data-ui="support-channels" className="grid gap-6 sm:grid-cols-2">
          <div className="evo-surface-card rounded-xl border-l-4 border-l-[#247eff] p-7">
            <span className="evo-chip-info text-evo-small font-semibold">
              Xử lý tài khoản & dữ liệu
            </span>
            <h2 className="mt-3 font-display text-evo-h3 font-semibold text-[#f5f8ff]">
              Email hỗ trợ kỹ thuật
            </h2>
            <div className="mt-3 text-evo-body">
              <CopyContactChip
                icon={<Mail className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />}
                href={`mailto:${adCanvasApp.supportEmail}?subject=${encodeURIComponent("Ad Canvas - Yêu cầu hỗ trợ")}`}
                displayValue={adCanvasApp.supportEmail}
                copyValue={adCanvasApp.supportEmail}
              />
            </div>
            <p className="mt-3 text-evo-small text-[#9eb2d0]">
              Phù hợp cho sự cố đăng nhập, phân quyền tổ chức và yêu cầu dữ liệu cá nhân.
            </p>
          </div>

          <div className="evo-surface-card rounded-xl border-l-4 border-l-[#34c759] p-7">
            <span className="evo-chip-success text-evo-small font-semibold">
              Phản hồi nhanh trong giờ làm việc
            </span>
            <h2 className="mt-3 font-display text-evo-h3 font-semibold text-[#f5f8ff]">
              Hotline trực tiếp
            </h2>
            <div className="mt-3 text-evo-body">
              <CopyContactChip
                icon={<Phone className="h-5 w-5 shrink-0 text-[#6ee7b7]" aria-hidden="true" />}
                href={`tel:${adCanvasApp.hotline}`}
                displayValue={adCanvasApp.hotline}
                copyValue={adCanvasApp.hotline}
              />
            </div>
            <p className="mt-3 text-evo-small text-[#9eb2d0]">
              Hỗ trợ khẩn cấp cho chiến dịch quảng cáo ngoài trời đang vận hành.
            </p>
          </div>
        </div>

        <section className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-evo-h2 font-bold text-[#f5f8ff]">
              Câu hỏi thường gặp
            </h2>
          </div>
          <dl data-ui="faq-list" className="space-y-4 lg:col-span-7">
            {FAQ.map((entry) => (
              <div
                key={entry.q}
                className="evo-surface-card rounded-xl p-6 md:p-7"
              >
                <dt className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                  {entry.q}
                </dt>
                <dd className="mt-2.5 max-w-[60ch] text-evo-body text-[#d6e2f5]">
                  {entry.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          data-ui="privacy-callout"
          className="evo-surface-card rounded-xl bg-[#081224] p-8 text-[#f5f8ff] md:p-10"
        >
          <h2 className="font-display text-evo-h3 font-semibold">
            Quyền riêng tư & Dữ liệu doanh nghiệp
          </h2>
          <p className="mt-2.5 max-w-[62ch] text-evo-body text-[#d6e2f5]">
            Xem{" "}
            <Link to="/privacy/ad-canvas" className="font-semibold text-[#5ca4ff] hover:underline">
              Chính sách quyền riêng tư Ad Canvas
            </Link>{" "}
            để nắm rõ cách hệ thống bảo vệ dữ liệu nghiệp vụ. Quay lại{" "}
            <Link to="/ad-canvas" className="font-semibold text-[#f5f8ff] hover:underline">
              trang giới thiệu Ad Canvas
            </Link>
            .
          </p>
        </section>
      </article>
    </AppPageLayout>
  );
}
