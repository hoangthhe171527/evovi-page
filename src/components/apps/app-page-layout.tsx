import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Globe, Mail, Phone } from "lucide-react";
import { EvoviLogoIcon } from "@/components/EvoviLogoIcon";
import { adCanvasApp } from "@/data/apps/ad-canvas";

type AppPageLayoutProps = {
  appName: string;
  children: ReactNode;
  nav?: { label: string; to: string }[];
};

export function AppPageLayout({ appName, children, nav }: AppPageLayoutProps) {
  const links = nav ?? [
    { label: "Giới thiệu", to: "/ad-canvas" },
    { label: "Hỗ trợ", to: "/ad-canvas/support" },
    { label: "Quyền riêng tư", to: "/privacy/ad-canvas" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[oklch(0.985_0.004_260)]">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[960px] items-center justify-between gap-4 px-5 md:px-8">
          <Link to="/ad-canvas" className="font-display text-xl font-bold tracking-tight text-gradient">
            {appName}
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={adCanvasApp.website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg transition-opacity hover:opacity-80"
            aria-label="Evovi"
          >
            <EvoviLogoIcon size="md" />
          </a>
        </div>
      </header>

      <main className="flex-1 px-5 py-10 md:px-8 md:py-14">{children}</main>

      <footer className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-[960px] px-5 py-10 md:px-8">
          <EvoviLogoIcon size="lg" />
          <p className="mt-4 text-sm text-muted-foreground">
            {adCanvasApp.name} — {adCanvasApp.tagline}. Phát triển bởi {adCanvasApp.developer}.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>Công ty: {adCanvasApp.developer}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                Hotline:{" "}
                <a
                  href={`tel:${adCanvasApp.hotline}`}
                  className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {adCanvasApp.hotline}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                Email:{" "}
                <a
                  href={`mailto:${adCanvasApp.supportEmail}`}
                  className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {adCanvasApp.supportEmail}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a
                href={adCanvasApp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {adCanvasApp.website}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link to="/ad-canvas" className="text-primary hover:underline">
              Trang giới thiệu
            </Link>
            <Link to="/ad-canvas/support" className="text-primary hover:underline">
              Hỗ trợ
            </Link>
            <Link to="/privacy/ad-canvas" className="text-primary hover:underline">
              Chính sách quyền riêng tư
            </Link>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {adCanvasApp.developer}. Bảo lưu mọi quyền.
          </p>
        </div>
      </footer>
    </div>
  );
}
