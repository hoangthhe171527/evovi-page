import type { ReactNode } from "react";
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
    <div className="flex min-h-screen flex-col bg-[oklch(0.985_0.004_260)]">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[900px] items-center justify-between gap-4 px-5 md:px-8">
          <span className="font-display text-xl font-bold tracking-tight text-gradient">
            {content.appName}
          </span>
          <a
            href={CONTACT.website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg transition-opacity hover:opacity-80"
          >
            <EvoviLogoIcon size="md" />
          </a>
        </div>
      </header>

      <main className="flex-1 px-5 py-10 md:px-8 md:py-14">{children}</main>

      <footer className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-[900px] px-5 py-10 md:px-8">
          <EvoviLogoIcon size="lg" />
          <p className="mt-4 text-sm text-muted-foreground">{content.footerTagline}</p>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>Công ty: {CONTACT.company}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                Hotline 24/7:{" "}
                <a
                  href={`tel:${CONTACT.hotline}`}
                  className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {CONTACT.hotline}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                Email:{" "}
                <a
                  href={`mailto:${content.supportEmail}`}
                  className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {content.supportEmail}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a
                href={CONTACT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {CONTACT.website}
              </a>
            </li>
          </ul>
          <p className="mt-8 text-xs text-muted-foreground">
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
      <div className="rounded-2xl border border-border bg-card px-6 py-8 shadow-card-soft md:px-10 md:py-12">
        <header className="border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Evovi
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Chính sách quyền riêng tư
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Có hiệu lực: {content.effectiveDate}
            {content.packageId ? ` · ${content.packageId}` : ""}
          </p>
          <p className="mt-6 text-base leading-relaxed text-foreground/90">
            {content.summary}
          </p>
        </header>

        <div className="mt-10 space-y-10">
          {content.sections.map((section) => (
            <section key={section.id} aria-labelledby={`section-${section.id}`}>
              <h2
                id={`section-${section.id}`}
                className="text-xl font-semibold text-foreground md:text-[1.35rem]"
              >
                {section.title}
              </h2>

              {section.intro && (
                <p className="mt-4 text-base leading-relaxed text-foreground/90">
                  {section.intro}
                </p>
              )}

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-base leading-relaxed text-foreground/90"
                >
                  {paragraph}
                </p>
              ))}

              {section.items && (
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-base leading-relaxed text-foreground/90 marker:text-primary">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              {section.contact && (
                <ul className="mt-5 space-y-2 text-base leading-relaxed text-foreground/90">
                  <li>
                    <span className="font-medium text-foreground">Công ty:</span>{" "}
                    {CONTACT.company}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Hotline 24/7:</span>{" "}
                    <a
                      href={`tel:${CONTACT.hotline}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {CONTACT.hotline}
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Email:</span>{" "}
                    <a
                      href={`mailto:${content.supportEmail}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {content.supportEmail}
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Website:</span>{" "}
                    <a
                      href={CONTACT.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
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
