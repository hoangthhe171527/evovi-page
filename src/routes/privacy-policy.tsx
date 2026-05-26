import { Link, createFileRoute } from "@tanstack/react-router";
import { Mail, Globe, Building2 } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Chính sách quyền riêng tư - Elevator360" },
      {
        name: "description",
        content: "Chính sách quyền riêng tư của ứng dụng Elevator360.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

const SECTIONS = [
  {
    id: "1",
    title: "1. Thông tin chúng tôi thu thập",
    intro:
      "Ứng dụng có thể thu thập và xử lý các thông tin sau:",
    items: [
      "Thông tin tài khoản: họ tên, email, số điện thoại, vai trò người dùng.",
      "Thông tin công việc: lịch bảo trì, lịch lắp đặt, trạng thái công việc, ghi chú công việc.",
      "Thông tin khách hàng và dự án: tên khách hàng, địa chỉ công trình, thông tin hợp đồng.",
      "Hình ảnh và tệp đính kèm: hình ảnh nghiệm thu, hình ảnh trước/sau khi thực hiện công việc.",
      "Thông tin thiết bị: loại thiết bị, hệ điều hành, phiên bản ứng dụng nhằm phục vụ việc vận hành và xử lý lỗi.",
    ],
  },
  {
    id: "2",
    title: "2. Mục đích sử dụng thông tin",
    intro: "Thông tin được sử dụng để:",
    items: [
      "Xác thực và quản lý tài khoản người dùng.",
      "Phân quyền truy cập theo vai trò.",
      "Quản lý công việc bảo trì, lắp đặt và nghiệm thu.",
      "Theo dõi tiến độ công việc.",
      "Hỗ trợ báo cáo, vận hành và chăm sóc khách hàng.",
      "Cải thiện chất lượng dịch vụ và xử lý lỗi kỹ thuật.",
    ],
  },
  {
    id: "3",
    title: "3. Chia sẻ dữ liệu",
    paragraphs: [
      "Chúng tôi không bán dữ liệu cá nhân của người dùng cho bên thứ ba.",
      "Dữ liệu chỉ có thể được chia sẻ trong các trường hợp sau:",
    ],
    items: [
      "Với doanh nghiệp sử dụng hệ thống Elevator360 để phục vụ quản lý nội bộ.",
      "Với nhà cung cấp hạ tầng kỹ thuật cần thiết để vận hành ứng dụng.",
      "Khi có yêu cầu hợp pháp từ cơ quan nhà nước có thẩm quyền.",
    ],
  },
  {
    id: "4",
    title: "4. Bảo mật dữ liệu",
    paragraphs: [
      "Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ dữ liệu người dùng, bao gồm kiểm soát truy cập, phân quyền người dùng và lưu trữ dữ liệu trên hệ thống máy chủ được quản lý.",
    ],
  },
  {
    id: "5",
    title: "5. Quyền của người dùng",
    paragraphs: [
      "Người dùng có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân bằng cách liên hệ với chúng tôi qua email hỗ trợ.",
    ],
  },
  {
    id: "6",
    title: "6. Lưu trữ dữ liệu",
    paragraphs: [
      "Dữ liệu được lưu trữ trong thời gian cần thiết để phục vụ hoạt động của ứng dụng, quản lý hợp đồng, công việc và tuân thủ các nghĩa vụ pháp lý liên quan.",
    ],
  },
  {
    id: "7",
    title: "7. Trẻ em",
    paragraphs: ["Ứng dụng không hướng đến người dùng dưới 13 tuổi."],
  },
  {
    id: "8",
    title: "8. Thay đổi chính sách",
    paragraphs: [
      "Chúng tôi có thể cập nhật chính sách quyền riêng tư này khi cần thiết. Phiên bản mới sẽ được công bố tại trang chính sách quyền riêng tư chính thức.",
    ],
  },
  {
    id: "9",
    title: "9. Liên hệ",
    paragraphs: [
      "Nếu có câu hỏi về chính sách quyền riêng tư, vui lòng liên hệ:",
    ],
    contact: true,
  },
] as const;

function PrivacyHeader() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[900px] items-center px-5 md:px-8">
        <Link
          to="/privacy-policy"
          className="font-display text-xl font-bold tracking-tight text-gradient"
        >
          Elevator360
        </Link>
      </div>
    </header>
  );
}

function PrivacyFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-[900px] px-5 py-10 md:px-8">
        <p className="text-sm font-semibold text-foreground">Evovi</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Giải pháp phần mềm cho doanh nghiệp trong lĩnh vực thang máy.
        </p>
        <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2.5">
            <Building2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>Công ty: Evovi</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <a
              href="mailto:admin@evovi.vn"
              className="text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              admin@evovi.vn
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <Globe className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <a
              href="https://evovi.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              https://evovi.vn
            </a>
          </li>
        </ul>
        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Evovi. Bảo lưu mọi quyền.
        </p>
      </div>
    </footer>
  );
}

function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[oklch(0.985_0.004_260)]">
      <PrivacyHeader />

      <main className="flex-1 px-5 py-10 md:px-8 md:py-14">
        <article className="mx-auto max-w-[900px]">
          <div className="rounded-2xl border border-border bg-card px-6 py-8 shadow-card-soft md:px-10 md:py-12">
            <header className="border-b border-border pb-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Chính sách quyền riêng tư
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Cập nhật lần cuối: 26/05/2026
              </p>
              <p className="mt-6 text-base leading-relaxed text-foreground/90">
                Elevator360 là ứng dụng hỗ trợ doanh nghiệp quản lý công việc bảo
                trì, lắp đặt, hợp đồng, khách hàng và nhân sự kỹ thuật trong lĩnh
                vực thang máy.
              </p>
            </header>

            <div className="mt-10 space-y-10">
              {SECTIONS.map((section) => (
                <section key={section.id} aria-labelledby={`section-${section.id}`}>
                  <h2
                    id={`section-${section.id}`}
                    className="text-xl font-semibold text-foreground md:text-[1.35rem]"
                  >
                    {section.title}
                  </h2>

                  {"intro" in section && section.intro && (
                    <p className="mt-4 text-base leading-relaxed text-foreground/90">
                      {section.intro}
                    </p>
                  )}

                  {"paragraphs" in section &&
                    section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-4 text-base leading-relaxed text-foreground/90"
                      >
                        {paragraph}
                      </p>
                    ))}

                  {"items" in section && section.items && (
                    <ul className="mt-4 list-disc space-y-2.5 pl-5 text-base leading-relaxed text-foreground/90 marker:text-primary">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {"contact" in section && section.contact && (
                    <ul className="mt-5 space-y-2 text-base leading-relaxed text-foreground/90">
                      <li>
                        <span className="font-medium text-foreground">
                          Công ty:
                        </span>{" "}
                        Evovi
                      </li>
                      <li>
                        <span className="font-medium text-foreground">
                          Email:
                        </span>{" "}
                        <a
                          href="mailto:admin@evovi.vn"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          admin@evovi.vn
                        </a>
                      </li>
                      <li>
                        <span className="font-medium text-foreground">
                          Website:
                        </span>{" "}
                        <a
                          href="https://evovi.vn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          https://evovi.vn
                        </a>
                      </li>
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>

      <PrivacyFooter />
    </div>
  );
}
