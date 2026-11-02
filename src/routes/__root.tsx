import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap";

function NotFoundComponent() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#070d18] px-5 text-[#f4f7fb]">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-[#f59422]">
          Lỗi 404 · Evovi
        </p>
        <h1 className="mt-3 font-display text-6xl font-extrabold tracking-tight">404</h1>
        <h2 className="mt-3 text-xl font-bold">Không tìm thấy trang yêu cầu</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#a6b4c8]">
          Đường dẫn bạn truy cập có thể đã thay đổi hoặc không còn tồn tại trên hệ thống Evovi.
        </p>
        <div className="mt-7">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[#095fd6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2480ff]"
          >
            Quay về trang chủ Evovi
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#070d18" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: GOOGLE_FONTS_HREF },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
