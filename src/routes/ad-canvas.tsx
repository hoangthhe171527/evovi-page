import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, CheckCircle2, Smartphone, Users } from "lucide-react";
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

export const Route = createFileRoute("/ad-canvas")({
  head: () => ({
    meta: [
      { title: `${adCanvasApp.name} — ${adCanvasApp.tagline}` },
      {
        name: "description",
        content:
          "Ad Canvas là ứng dụng di động của Evovi giúp doanh nghiệp OOH quản lý CRM, tồn kho vải quảng cáo, triển khai campaign và giám sát vận hành.",
      },
      { property: "og:title", content: `${adCanvasApp.name} — Quản lý vải quảng cáo OOH` },
      {
        property: "og:description",
        content: "CRM, inventory, triển khai và check-in hiện trường — trên một ứng dụng di động.",
      },
    ],
    links: [...PRIVACY_FONTS],
  }),
  component: AdCanvasMarketingPage,
});

function AdCanvasMarketingPage() {
  return (
    <AppPageLayout appName={adCanvasApp.name}>
      <div className="mx-auto max-w-[960px] space-y-12">
        <section className="rounded-2xl border border-border bg-card px-6 py-10 shadow-card-soft md:px-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Evovi · OOH</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {adCanvasApp.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{adCanvasApp.tagline}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90">
            Ad Canvas là ứng dụng di động dành cho doanh nghiệp quảng cáo ngoài trời (OOH). Từ
            tiềm năng và hợp đồng đến tồn kho vị trí, triển khai campaign và minh chứng hiện
            trường — mọi thứ được đồng bộ qua nền tảng Ad Canvas của Evovi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/ad-canvas/support"
              className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all"
            >
              Liên hệ hỗ trợ <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/privacy/ad-canvas"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted/50 transition-colors"
            >
              Chính sách quyền riêng tư
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Tính năng chính</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {adCanvasApp.features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-5 shadow-card-soft"
              >
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, label: "Đội ngũ đa vai trò", text: "Sales, vận hành, tài xế — mỗi người thấy đúng việc của mình." },
            { icon: BarChart3, label: "Dữ liệu thống nhất", text: "CRM, inventory và triển khai dùng chung một nguồn dữ liệu." },
            { icon: Smartphone, label: "Tối ưu di động", text: "Thao tác nhanh trên điện thoại, phù hợp làm việc hiện trường." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-5">
              <item.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">{item.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-muted/30 px-6 py-8 md:px-10">
          <h2 className="text-xl font-bold">Ai nên dùng?</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {adCanvasApp.audiences.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-foreground/90">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Ad Canvas là ứng dụng doanh nghiệp — tài khoản được cấp bởi tổ chức của bạn. Cần hỗ
            trợ đăng nhập hoặc triển khai?{" "}
            <Link to="/ad-canvas/support" className="text-primary hover:underline">
              Xem trang hỗ trợ
            </Link>
            .
          </p>
        </section>

        <section className="text-center text-xs text-muted-foreground">
          <p>
            Package: {adCanvasApp.packageId} · API: {adCanvasApp.apiHost}
          </p>
        </section>
      </div>
    </AppPageLayout>
  );
}
