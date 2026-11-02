import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Globe, Mail, Phone } from "lucide-react";
import { EvoviLogoIcon } from "@/components/EvoviLogoIcon";
import { adCanvasApp } from "@/data/apps/ad-canvas";

type AppPageLayoutProps = {
  appName: string;
  children: ReactNode;
  nav?: { label: string; to: string }[];
  flushMain?: boolean;
};

export function AppPageLayout({
  appName,
  children,
  nav,
  flushMain = false,
}: AppPageLayoutProps) {
  const links = nav ?? [
    { label: "Giới thiệu", to: "/ad-canvas" },
    { label: "Hỗ trợ", to: "/ad-canvas/support" },
    { label: "Quyền riêng tư", to: "/privacy/ad-canvas" },
  ];

  return (
    <div className="flex min-h-svh flex-col bg-[#050b16] text-[#d6e2f5]">
      <header className="sticky top-0 z-50 bg-[#050b16] text-[#f5f8ff]">
        <div className="container-evo flex h-16 items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" aria-label="Trang chủ Evovi" className="shrink-0">
              <EvoviLogoIcon size="sm" />
            </Link>
            <Link
              to="/ad-canvas"
              className="whitespace-nowrap font-display text-evo-small font-bold text-[#5ca4ff] sm:text-evo-body"
            >
              {appName}
            </Link>
          </div>
          <nav className="hidden items-center gap-7 text-evo-small font-medium text-[#d6e2f5] md:flex">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-[#5ca4ff]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/"
            className="shrink-0 whitespace-nowrap rounded-md bg-[#0b63e5] px-3 py-2 text-evo-small font-semibold text-white transition-colors hover:bg-[#247eff] sm:px-4"
          >
            Về Evovi<span className="hidden sm:inline">.vn</span> →
          </Link>
        </div>
      </header>

      <main className={flushMain ? "flex-1" : "container-evo flex-1 py-12 md:py-16"}>
        {children}
      </main>

      <footer className="overflow-hidden bg-[#030710] pt-16 pb-12 text-[#9eb2d0]">
        <div className="container-evo">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <EvoviLogoIcon size="md" />
              <p className="mt-4 max-w-[42ch] text-evo-body text-[#d6e2f5]">
                {adCanvasApp.name} · {adCanvasApp.tagline}. Phát triển bởi {adCanvasApp.developer}.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 text-evo-small font-semibold">
                <Link to="/ad-canvas" className="text-[#5ca4ff] hover:underline">
                  Trang giới thiệu
                </Link>
                <Link to="/ad-canvas/support" className="text-[#f5f8ff] hover:underline">
                  Trung tâm hỗ trợ
                </Link>
                <Link to="/privacy/ad-canvas" className="text-[#f5f8ff] hover:underline">
                  Chính sách quyền riêng tư
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 lg:text-right">
              <ul className="inline-block space-y-2.5 text-left text-evo-body lg:text-right">
                <li className="flex items-center gap-2.5 lg:justify-end">
                  <Building2 className="h-4 w-4 shrink-0 text-[#5ca4ff]" aria-hidden />
                  <span className="text-[#f5f8ff]">Đơn vị phát triển: {adCanvasApp.developer}</span>
                </li>
                <li className="flex items-center gap-2.5 lg:justify-end">
                  <Phone className="h-4 w-4 shrink-0 text-[#34c759]" aria-hidden />
                  <span>
                    Hotline:{" "}
                    <a
                      href={`tel:${adCanvasApp.hotline}`}
                      className="font-semibold tabular-nums text-[#f5f8ff] hover:text-[#5ca4ff]"
                    >
                      {adCanvasApp.hotline}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-2.5 lg:justify-end">
                  <Mail className="h-4 w-4 shrink-0 text-[#5ca4ff]" aria-hidden />
                  <span>
                    Email:{" "}
                    <a
                      href={`mailto:${adCanvasApp.supportEmail}`}
                      className="font-semibold text-[#f5f8ff] hover:text-[#5ca4ff]"
                    >
                      {adCanvasApp.supportEmail}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-2.5 lg:justify-end">
                  <Globe className="h-4 w-4 shrink-0 text-[#f5a623]" aria-hidden />
                  <a
                    href={adCanvasApp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f5f8ff] hover:text-[#5ca4ff]"
                  >
                    {adCanvasApp.website}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-10 select-none font-display text-[clamp(3.8rem,13vw,11rem)] font-bold leading-[0.88] tracking-[-0.04em] text-[#607ba3]"
          >
            AD CANVAS
          </div>

          <div className="mt-6 flex flex-col justify-between gap-2 text-evo-small text-[#9eb2d0] sm:flex-row">
            <span>© {new Date().getFullYear()} {adCanvasApp.developer}. Bảo lưu mọi quyền.</span>
            <span>Gói ứng dụng: {adCanvasApp.packageId}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
