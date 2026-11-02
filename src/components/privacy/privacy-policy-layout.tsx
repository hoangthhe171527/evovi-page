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
    <div className="flex min-h-svh flex-col bg-[#eef2f6] text-[#0b1320]">
      <header className="bg-[#070d18] text-[#f4f7fb]">
        <div className="mx-auto flex h-16 max-w-[900px] items-center justify-between gap-4 px-5 md:px-8">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Trang chủ Evovi" className="shrink-0">
              <EvoviLogoIcon size="sm" surface="tile" />
            </Link>
            <span className="font-display text-lg font-extrabold tracking-tight text-[#f59422]">
              {content.appName}
            </span>
          </div>
          <Link
            to="/"
            className="rounded-md bg-[#0d1728] px-3 py-1.5 text-xs font-semibold text-[#f4f7fb] transition-colors hover:bg-[#095fd6]"
          >
            Về Evovi.vn
          </Link>
        </div>
      </header>

      <main className="flex-1 px-5 py-10 md:px-8 md:py-14">{children}</main>

      <footer className="bg-[#070d18] text-[#a6b4c8]">
        <div className="mx-auto max-w-[900px] px-5 py-12 md:px-8">
          <EvoviLogoIcon size="md" surface="tile" />
          <p className="mt-4 max-w-[54ch] text-sm text-[#f4f7fb]">{content.footerTagline}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 shrink-0 text-[#f59422]" aria-hidden />
              <span>Công ty: {CONTACT.company}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#3cb34a]" aria-hidden />
              <span>
                Hotline 24/7:{" "}
                <a
                  href={`tel:${CONTACT.hotline}`}
                  className="text-[#f4f7fb] underline-offset-4 hover:text-[#f59422] hover:underline"
                >
                  {CONTACT.hotline}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#2480ff]" aria-hidden />
              <span>
                Email:{" "}
                <a
                  href={`mailto:${content.supportEmail}`}
                  className="text-[#f4f7fb] underline-offset-4 hover:text-[#f59422] hover:underline"
                >
                  {content.supportEmail}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 shrink-0 text-[#2480ff]" aria-hidden />
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f4f7fb] underline-offset-4 hover:text-[#f59422] hover:underline"
              >
                {CONTACT.website}
              </a>
            </li>
          </ul>
          <p className="mt-8 text-xs text-[#a6b4c8]">
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
    <article className="mx-auto max-w-[900px]">
      <div className="bg-white px-6 py-8 md:px-10 md:py-12">
        <header className="bg-[#eef2f6] p-6 md:p-8">
          <p className="text-sm font-semibold text-[#095fd6]">
            Evovi · Tài liệu pháp lý sản phẩm
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0b1320] md:text-4xl">
            Chính sách quyền riêng tư · {content.appName}
          </h1>
          <p className="mt-3 text-xs font-medium tabular-nums text-[#465468]">
            Có hiệu lực: {content.effectiveDate}
            {content.packageId ? ` · ${content.packageId}` : ""}
          </p>
          <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[#0b1320]">
            {content.summary}
          </p>
        </header>

        <div className="mt-10 space-y-10">
          {content.sections.map((section) => (
            <section key={section.id} aria-labelledby={`section-${section.id}`}>
              <h2
                id={`section-${section.id}`}
                className="font-display text-xl font-bold text-[#0b1320] md:text-2xl"
              >
                {section.title}
              </h2>

              {section.intro && (
                <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-[#0b1320]">
                  {section.intro}
                </p>
              )}

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 max-w-[64ch] text-base leading-relaxed text-[#0b1320]"
                >
                  {paragraph}
                </p>
              ))}

              {section.items && (
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-base leading-relaxed text-[#0b1320] marker:text-[#095fd6]">
                  {section.items.map((item) => (
                    <li key={item} className="max-w-[62ch]">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.contact && (
                <ul className="mt-5 space-y-2 bg-[#eef2f6] p-5 text-base leading-relaxed text-[#0b1320]">
                  <li>
                    <span className="font-semibold">Công ty:</span> {CONTACT.company}
                  </li>
                  <li>
                    <span className="font-semibold">Hotline 24/7:</span>{" "}
                    <a
                      href={`tel:${CONTACT.hotline}`}
                      className="text-[#095fd6] underline-offset-4 hover:underline"
                    >
                      {CONTACT.hotline}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href={`mailto:${content.supportEmail}`}
                      className="text-[#095fd6] underline-offset-4 hover:underline"
                    >
                      {content.supportEmail}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href={CONTACT.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#095fd6] underline-offset-4 hover:underline"
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
