import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Globe, Mail, Phone } from "lucide-react";
import { EvoviLogoIcon } from "@/components/EvoviLogoIcon";
import type { PrivacyPolicyContent } from "./types";

const CONTACT = {
  company: "Evovi",
  hotline: "0868661235",
  website: "https://evovi.vn",
} as const;

type PrivacyPolicyLayoutProps = {
  content: PrivacyPolicyContent;
  children: ReactNode;
};

export function PrivacyPolicyLayout({ content, children }: PrivacyPolicyLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col bg-[#050b16] text-[#d6e2f5]">
      <header className="sticky top-0 z-50 bg-[#050b16] text-[#f5f8ff]">
        <div className="mx-auto flex h-16 max-w-[920px] items-center justify-between gap-2.5 px-5 sm:gap-4 md:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" aria-label="Trang chủ Evovi" className="shrink-0">
              <EvoviLogoIcon size="sm" />
            </Link>
            <span className="whitespace-nowrap font-display text-evo-small font-bold tracking-tight text-[#5ca4ff] sm:text-lg">
              {content.appName}
            </span>
          </div>
          <Link
            to="/"
            className="shrink-0 whitespace-nowrap rounded-md bg-[#0b63e5] px-3 py-2 text-evo-small font-semibold text-white transition-colors hover:bg-[#247eff] sm:px-3.5"
          >
            Về Evovi<span className="hidden sm:inline">.vn</span> →
          </Link>
        </div>
      </header>

      <main className="flex-1 px-5 py-10 md:px-8 md:py-14">{children}</main>

      <footer className="bg-[#030710] text-[#9eb2d0]">
        <div className="mx-auto max-w-[920px] px-5 py-12 md:px-8">
          <EvoviLogoIcon size="md" />
          <p className="mt-4 max-w-[54ch] text-evo-small text-[#d6e2f5]">
            {content.footerTagline}
          </p>
          <ul className="mt-5 space-y-2.5 text-evo-small">
            <li className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 shrink-0 text-[#5ca4ff]" aria-hidden />
              <span className="text-[#f5f8ff]">Công ty: {CONTACT.company}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#34c759]" aria-hidden />
              <span>
                Hotline 24/7:{" "}
                <a
                  href={`tel:${CONTACT.hotline}`}
                  className="text-[#f5f8ff] underline-offset-4 hover:text-[#5ca4ff] hover:underline"
                >
                  {CONTACT.hotline}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#5ca4ff]" aria-hidden />
              <span>
                Email:{" "}
                <a
                  href={`mailto:${content.supportEmail}`}
                  className="text-[#f5f8ff] underline-offset-4 hover:text-[#5ca4ff] hover:underline"
                >
                  {content.supportEmail}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 shrink-0 text-[#f5a623]" aria-hidden />
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5f8ff] underline-offset-4 hover:text-[#5ca4ff] hover:underline"
              >
                {CONTACT.website}
              </a>
            </li>
          </ul>
          <p className="mt-8 text-xs text-[#9eb2d0]">
            © {new Date().getFullYear()} Evovi. Bảo lưu mọi quyền.
          </p>
        </div>
      </footer>
    </div>
  );
}

type PrivacyPolicyDocumentProps = {
  content: PrivacyPolicyContent;
};

export function PrivacyPolicyDocument({ content }: PrivacyPolicyDocumentProps) {
  return (
    <article className="mx-auto max-w-[920px]">
      <div className="rounded-lg bg-[#081224] px-6 py-8 md:px-10 md:py-12">
        <header className="rounded-md bg-[#0d1b33] p-6 md:p-8">
          <p className="text-evo-small font-semibold text-[#5ca4ff]">
            Evovi · Tài liệu pháp lý sản phẩm
          </p>
          <h1 className="mt-2 font-display text-evo-h2 font-bold text-[#f5f8ff]">
            Chính sách quyền riêng tư · {content.appName}
          </h1>
          <p className="mt-3 text-evo-small font-medium tabular-nums text-[#9eb2d0]">
            Có hiệu lực: {content.effectiveDate}
            {content.packageId ? ` · ${content.packageId}` : ""}
          </p>
          <p className="mt-5 max-w-[62ch] text-evo-body text-[#d6e2f5]">
            {content.summary}
          </p>
        </header>

        <div className="mt-10 space-y-10">
          {content.sections.map((section) => (
            <section key={section.id} aria-labelledby={`section-${section.id}`}>
              <h2
                id={`section-${section.id}`}
                className="font-display text-evo-h3 font-semibold text-[#f5f8ff]"
              >
                {section.title}
              </h2>

              {section.intro && (
                <p className="mt-3 max-w-[64ch] text-evo-body text-[#d6e2f5]">
                  {section.intro}
                </p>
              )}

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 max-w-[64ch] text-evo-body text-[#d6e2f5]"
                >
                  {paragraph}
                </p>
              ))}

              {section.items && (
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-evo-body text-[#d6e2f5] marker:text-[#5ca4ff]">
                  {section.items.map((item) => (
                    <li key={item} className="max-w-[62ch]">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.contact && (
                <ul className="mt-5 space-y-2 rounded-md bg-[#0d1b33] p-5 text-evo-body text-[#d6e2f5]">
                  <li>
                    <span className="font-semibold text-[#f5f8ff]">Công ty:</span>{" "}
                    {CONTACT.company}
                  </li>
                  <li>
                    <span className="font-semibold text-[#f5f8ff]">Hotline 24/7:</span>{" "}
                    <a
                      href={`tel:${CONTACT.hotline}`}
                      className="text-[#5ca4ff] underline-offset-4 hover:underline"
                    >
                      {CONTACT.hotline}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-[#f5f8ff]">Email:</span>{" "}
                    <a
                      href={`mailto:${content.supportEmail}`}
                      className="text-[#5ca4ff] underline-offset-4 hover:underline"
                    >
                      {content.supportEmail}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-[#f5f8ff]">Website:</span>{" "}
                    <a
                      href={CONTACT.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5ca4ff] underline-offset-4 hover:underline"
                    >
                      {CONTACT.website}
                    </a>
                  </li>
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
