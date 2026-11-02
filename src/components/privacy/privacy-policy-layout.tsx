import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Globe, Mail, Phone } from "lucide-react";
import { EvoviLogoIcon } from "@/components/EvoviLogoIcon";
import { CopyContactChip } from "@/components/ui/CopyContactChip";
import type { PrivacyPolicyContent } from "./types";

const CONTACT = {
  company: "Evovi",
  hotline: "0868661235",
  hotlineDisplay: "0868 661 235",
  website: "https://evovi.vn",
} as const;

type PrivacyPolicyLayoutProps = {
  content: PrivacyPolicyContent;
  children: ReactNode;
};

export function PrivacyPolicyLayout({ content, children }: PrivacyPolicyLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col bg-[#050b16] text-[#d6e2f5]">
      <header
        data-ui="privacy-header"
        className="evo-header-glass sticky top-0 z-50 text-[#f5f8ff]"
      >
        <div className="mx-auto flex h-16 max-w-[920px] items-center justify-between gap-2.5 px-5 sm:gap-4 md:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" aria-label="Trang chủ Evovi" className="shrink-0">
              <EvoviLogoIcon size="sm" />
            </Link>
            <span className="whitespace-nowrap font-display text-evo-small font-bold tracking-tight text-[#5ca4ff] sm:text-evo-body">
              {content.appName}
            </span>
          </div>
          <Link to="/" className="evo-btn-primary evo-btn-sm shrink-0 whitespace-nowrap">
            <span>
              Về Evovi<span className="hidden sm:inline">.vn</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
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
          <div className="mt-5 space-y-3 text-evo-small">
            <div className="flex items-center gap-2.5">
              <Building2 className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />
              <span className="font-medium text-[#f5f8ff]">{CONTACT.company} · Việt Nam</span>
            </div>
            <CopyContactChip
              icon={<Phone className="h-5 w-5 shrink-0 text-[#6ee7b7]" aria-hidden="true" />}
              href={`tel:${CONTACT.hotline}`}
              displayValue={CONTACT.hotlineDisplay}
              copyValue={CONTACT.hotline}
              note="24/7"
            />
            <CopyContactChip
              icon={<Mail className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />}
              href={`mailto:${content.supportEmail}`}
              displayValue={content.supportEmail}
              copyValue={content.supportEmail}
            />
            <div className="flex items-center gap-2.5">
              <Globe className="h-5 w-5 shrink-0 text-[#fcd34d]" aria-hidden="true" />
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5f8ff] underline-offset-4 hover:text-[#5ca4ff] hover:underline"
              >
                {CONTACT.website}
              </a>
            </div>
          </div>
          <p className="mt-8 text-evo-small text-[#9eb2d0]">
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
      <div
        data-ui="privacy-doc"
        className="evo-surface-card rounded-xl bg-[#081224] px-6 py-8 md:px-10 md:py-12"
      >
        <header className="evo-surface-card rounded-xl p-6 md:p-8">
          <span className="evo-chip-info text-evo-small font-semibold">
            Evovi · Tài liệu pháp lý sản phẩm
          </span>
          <h1 className="mt-3 font-display text-evo-h2 font-bold text-[#f5f8ff]">
            Chính sách quyền riêng tư · {content.appName}
          </h1>
          <p className="mt-3 text-evo-small font-medium tabular-nums text-[#9eb2d0]">
            Có hiệu lực từ {content.effectiveDate}
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
                  {section.items.map((point) => (
                    <li key={point} className="max-w-[62ch]">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {section.contact && (
                <div className="evo-surface-card mt-5 space-y-3 rounded-xl p-5 text-evo-body text-[#d6e2f5]">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />
                    <span className="font-semibold text-[#f5f8ff]">{CONTACT.company}</span>
                  </div>
                  <CopyContactChip
                    icon={<Phone className="h-5 w-5 shrink-0 text-[#6ee7b7]" aria-hidden="true" />}
                    href={`tel:${CONTACT.hotline}`}
                    displayValue={CONTACT.hotlineDisplay}
                    copyValue={CONTACT.hotline}
                    note="24/7"
                  />
                  <CopyContactChip
                    icon={<Mail className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />}
                    href={`mailto:${content.supportEmail}`}
                    displayValue={content.supportEmail}
                    copyValue={content.supportEmail}
                  />
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-5 w-5 shrink-0 text-[#fcd34d]" aria-hidden="true" />
                    <a
                      href={CONTACT.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5ca4ff] underline-offset-4 hover:underline"
                    >
                      {CONTACT.website}
                    </a>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
