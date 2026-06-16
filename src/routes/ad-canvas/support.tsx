import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, Mail, MessageCircle, Phone, Shield } from "lucide-react";
import { AppPageLayout } from "@/components/apps/app-page-layout";
import { adCanvasApp } from "@/data/apps/ad-canvas";

const PRIVACY_FONTS = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
  },
] as const;

export const Route = createFileRoute("/ad-canvas/support")({
  head: () => ({
    meta: [
      { title: `Hỗ trợ — ${adCanvasApp.name}` },
      {
        name: "description",
        content:
          "Trang hỗ trợ Ad Canvas: liên hệ email, hotline, câu hỏi thường gặp và yêu cầu xóa dữ liệu.",
      },
    ],
    links: [...PRIVACY_FONTS],
  }),
  component: AdCanvasSupportPage,
});

const FAQ = [
  {
    q: "Làm sao để đăng nhập Ad Canvas?",
    a: "Ad Canvas dành cho người dùng doanh nghiệp. Liên hệ quản trị viên tổ chức của bạn để được cấp tài khoản và thông tin đăng nhập.",
  },
  {
    q: "Tôi quên mật khẩu / không đăng nhập được?",
    a: "Gửi email tới support@evovi.vn kèm email đăng nhập và tên tổ chức. Đội hỗ trợ sẽ phối hợp quản trị viên tenant để xử lý.",
  },
  {
    q: "Làm sao yêu cầu xóa dữ liệu cá nhân?",
    a: 'Gửi email tới support@evovi.vn với tiêu đề "Ad Canvas — Yêu cầu xóa dữ liệu", kèm email/tên tài khoản và tên tổ chức.',
  },
  {
    q: "Ứng dụng yêu cầu quyền camera / ảnh để làm gì?",
    a: "Chỉ khi bạn sử dụng tính năng chụp hoặc tải ảnh minh chứng hiện trường (proof of posting). Ad Canvas không truy cập ảnh khi bạn không dùng tính năng này.",
  },
] as const;

function AdCanvasSupportPage() {
  return (
    <AppPageLayout appName={adCanvasApp.name}>
      <article className="mx-auto max-w-[960px]">
        <div className="rounded-2xl border border-border bg-card px-6 py-8 shadow-card-soft md:px-10 md:py-12">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-gradient text-white shadow-glow">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Hỗ trợ {adCanvasApp.name}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Đội ngũ Evovi hỗ trợ người dùng Ad Canvas về đăng nhập, quyền truy cập, sự cố ứng
                dụng và yêu cầu dữ liệu. Thời gian phản hồi thông thường trong giờ hành chính
                (GMT+7).
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${adCanvasApp.supportEmail}?subject=${encodeURIComponent("Ad Canvas — Yêu cầu hỗ trợ")}`}
              className="flex gap-4 rounded-xl border border-border p-5 transition-colors hover:border-primary/40 hover:bg-muted/30"
            >
              <Mail className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Email hỗ trợ</h2>
                <p className="mt-1 text-sm text-primary">{adCanvasApp.supportEmail}</p>
                <p className="mt-2 text-xs text-muted-foreground">Phù hợp cho sự cố kỹ thuật và yêu cầu dữ liệu.</p>
              </div>
            </a>
            <a
              href={`tel:${adCanvasApp.hotline}`}
              className="flex gap-4 rounded-xl border border-border p-5 transition-colors hover:border-primary/40 hover:bg-muted/30"
            >
              <Phone className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">Hotline</h2>
                <p className="mt-1 text-sm text-primary">{adCanvasApp.hotline}</p>
                <p className="mt-2 text-xs text-muted-foreground">Hỗ trợ khẩn cấp trong giờ làm việc.</p>
              </div>
            </a>
          </div>

          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <MessageCircle className="h-5 w-5 text-primary" />
              Câu hỏi thường gặp
            </h2>
            <dl className="mt-6 space-y-6">
              {FAQ.map((item) => (
                <div key={item.q} className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <dt className="font-medium text-foreground">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-12 rounded-xl bg-muted/40 p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Shield className="h-5 w-5 text-primary" />
              Quyền riêng tư
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Xem{" "}
              <Link to="/privacy/ad-canvas" className="text-primary hover:underline">
                Chính sách quyền riêng tư Ad Canvas
              </Link>{" "}
              để biết cách chúng tôi xử lý dữ liệu. Quay lại{" "}
              <Link to="/ad-canvas" className="text-primary hover:underline">
                trang giới thiệu ứng dụng
              </Link>
              .
            </p>
          </section>

          <p className="mt-8 text-xs text-muted-foreground">
            {adCanvasApp.developer} · {adCanvasApp.packageId}
          </p>
        </div>
      </article>
    </AppPageLayout>
  );
}
