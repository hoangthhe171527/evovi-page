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
    <div className="flex min-h-svh flex-col bg-[#eef2f6] text-[#0b1320]">
      <header className="sticky top-0 z-50 bg-[#070d18] text-[#f4f7fb]">
        <div className="container-evo flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Trang chủ Evovi" className="shrink-0">
              <EvoviLogoIcon size="sm" surface="tile" />
            </Link>
            <Link
              to="/ad-canvas"
              className="font-display text-evo-body font-extrabold text-[#f59422]"
            >
              {appName}
            </Link>
          </div>
          <nav className="hidden items-center gap-7 text-evo-small font-medium text-[#a6b4c8] sm:flex">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-[#f4f7fb]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/"
            className="rounded-md bg-[#095fd6] px-4 py-2 text-evo-small font-semibold text-white transition-colors hover:bg-[#2480ff]"
          >
            Về Evovi.vn →
          </Link>
        </div>
      </header>

      <main className={flushMain ? "flex-1" : "container-evo flex-1 py-12 md:py-16"}>
        {children}
      </main>

      <footer className="overflow-hidden bg-[#040810] pt-16 pb-12 text-[#a6b4c8]">
        <div className="container-evo">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <EvoviLogoIcon size="md" surface="tile" />
              <p className="mt-4 max-w-[42ch] text-evo-body text-[#f4f7fb]">
                {adCanvasApp.name} · {adCanvasApp.tagline}. Phát triển bởi {adCanvasApp.developer}.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 text-evo-small font-semibold">
                <Link to="/ad-canvas" className="text-[#f59422] hover:underline">
                  Trang giới thiệu
                </Link>
                <Link to="/ad-canvas/support" className="text-[#f4f7fb] hover:underline">
                  Trung tâm hỗ trợ
                </Link>
                <Link to="/privacy/ad-canvas" className="text-[#f4f7fb] hover:underline">
                  Chính sách quyền riêng tư
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 lg:text-right">
              <ul className="inline-block space-y-2.5 text-left text-evo-body lg:text-right">
                <li className="flex items-center gap-2.5 lg:justify-end">
                  <Building2 className="h-4 w-4 shrink-0 text-[#f59422]" aria-hidden />
                  <span className="text-[#f4f7fb]">Đơn vị phát triển: {adCanvasApp.developer}</span>
                </li>
                <li className="flex items-center gap-2.5 lg:justify-end">
                  <Phone className="h-4 w-4 shrink-0 text-[#3cb34a]" aria-hidden />
                  <span>
                    Hotline:{" "}
                    <a
                      href={`tel:${adCanvasApp.hotline}`}
                      className="font-semibold tabular-nums text-[#f4f7fb] hover:text-[#f59422]"
                    >
                      {adCanvasApp.hotline}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-2.5 lg:justify-end">
                  <Mail className="h-4 w-4 shrink-0 text-[#2480ff]" aria-hidden />
                  <span>
                    Email:{" "}
                    <a
                      href={`mailto:${adCanvasApp.supportEmail}`}
                      className="font-semibold text-[#f4f7fb] hover:text-[#f59422]"
                    >
                      {adCanvasApp.supportEmail}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-2.5 lg:justify-end">
                  <Globe className="h-4 w-4 shrink-0 text-[#2480ff]" aria-hidden />
                  <a
                    href={adCanvasApp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f4f7fb] hover:text-[#f59422]"
                  >
                    {adCanvasApp.website}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-10 select-none font-display text-[clamp(3.8rem,13vw,11rem)] font-extrabold leading-[0.86] tracking-[-0.05em] text-[#5b7396]"
          >
            AD CANVAS
          </div>

          <div className="mt-6 flex flex-col justify-between gap-2 text-evo-small text-[#a6b4c8] sm:flex-row">
            <span>© {new Date().getFullYear()} {adCanvasApp.developer}. Bảo lưu mọi quyền.</span>
            <span>Gói ứng dụng: {adCanvasApp.packageId}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
