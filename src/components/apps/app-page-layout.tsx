import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Globe, Mail, Phone } from "lucide-react";
import { EvoviLogoIcon } from "@/components/EvoviLogoIcon";
import { CopyContactChip } from "@/components/ui/CopyContactChip";
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
      <header
        data-ui="app-header"
        className="evo-header-glass sticky top-0 z-50 text-[#f5f8ff]"
      >
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
          <nav
            aria-label="Điều hướng sản phẩm"
            className="hidden items-center gap-1.5 text-evo-small font-medium md:flex"
          >
            {links.map((entry) => (
              <Link
                key={entry.to}
                to={entry.to}
                activeOptions={{ exact: true }}
                activeProps={{
                  className: "rounded-md bg-[#132747]/85 px-3 py-1.5 text-[#f5f8ff]",
                }}
                inactiveProps={{
                  className:
                    "rounded-md px-3 py-1.5 text-[#9eb2d0] transition-colors hover:bg-[#0d1b33] hover:text-[#f5f8ff]",
                }}
              >
                {entry.label}
              </Link>
            ))}
          </nav>
          <Link to="/" className="evo-btn-primary evo-btn-sm shrink-0 whitespace-nowrap">
            <span>
              Về Evovi<span className="hidden sm:inline">.vn</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
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
              <div className="inline-flex flex-col gap-3 text-left text-evo-body lg:items-end lg:text-right">
                <div className="flex items-center gap-2.5 lg:justify-end">
                  <Building2 className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />
                  <span className="font-medium text-[#f5f8ff]">{adCanvasApp.developer} · Việt Nam</span>
                </div>
                <CopyContactChip
                  alignEnd
                  icon={<Phone className="h-5 w-5 shrink-0 text-[#6ee7b7]" aria-hidden="true" />}
                  href={`tel:${adCanvasApp.hotline}`}
                  displayValue={adCanvasApp.hotline}
                  copyValue={adCanvasApp.hotline}
                />
                <CopyContactChip
                  alignEnd
                  icon={<Mail className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />}
                  href={`mailto:${adCanvasApp.supportEmail}`}
                  displayValue={adCanvasApp.supportEmail}
                  copyValue={adCanvasApp.supportEmail}
                />
                <div className="flex items-center gap-2.5 lg:justify-end">
                  <Globe className="h-5 w-5 shrink-0 text-[#fcd34d]" aria-hidden="true" />
                  <a
                    href={adCanvasApp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f5f8ff] hover:text-[#5ca4ff]"
                  >
                    {adCanvasApp.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-8 select-none font-display text-evo-h2 font-bold tracking-[0.08em] text-[#4a648c]"
          >
            AD CANVAS
          </div>

          <div className="mt-4 flex flex-col justify-between gap-2 text-evo-small text-[#9eb2d0] sm:flex-row">
            <span>© {new Date().getFullYear()} {adCanvasApp.developer}. Bảo lưu mọi quyền.</span>
            <span>{adCanvasApp.packageId}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
