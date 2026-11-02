import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EvoviLogoIcon } from "@/components/EvoviLogoIcon";
import {
  HeroTriSpectrumCanvas,
  HorizonSignalCanvas,
} from "@/components/landing/EvoviSignalCanvas";
import { SystemTransformerStage } from "@/components/landing/SystemTransformerStage";
import { FlagshipShowcaseStage } from "@/components/landing/FlagshipShowcaseStage";
import {
  CAPABILITIES,
  DELIVERY_STEPS,
  EVOVI_PROJECTS,
  TRANSFORMATION_BEATS,
} from "@/data/evovi-projects";
import { buildSeoHead, SITE_URL } from "@/lib/seo";
import studioBlueprintImg from "@/assets/evovi-studio-blueprint.jpg";
import factoryOpsImg from "@/assets/evovi-factory-ops.jpg";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

const HOME_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Evovi",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon-512.png`,
    email: "kinhdoanh@evovi.vn",
    telephone: "+84-868-661-235",
    description:
      "Evovi là studio kỹ thuật phần mềm Spec-Driven & AI-Native chuyên tư vấn, thiết kế và xây dựng hệ thống ERP, LMS, OOH, ứng dụng di động hiện trường và tác nhân AI cho doanh nghiệp tại Việt Nam.",
    areaServed: "VN",
    address: [
      { "@type": "PostalAddress", addressLocality: "Hà Nội", addressCountry: "VN" },
      { "@type": "PostalAddress", addressLocality: "TP. Hồ Chí Minh", addressCountry: "VN" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+84-868-661-235",
        email: "kinhdoanh@evovi.vn",
        contactType: "sales",
        availableLanguage: ["Vietnamese", "English"],
      },
      {
        "@type": "ContactPoint",
        email: "support@evovi.vn",
        contactType: "customer support",
        availableLanguage: ["Vietnamese"],
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Evovi",
    inLanguage: "vi-VN",
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hệ sinh thái sản phẩm và dự án phần mềm thực tế của Evovi",
    numberOfItems: EVOVI_PROJECTS.length,
    itemListElement: EVOVI_PROJECTS.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        description: `${p.tagline}. ${p.solution}`,
        url: p.href ? `${SITE_URL}${p.href}` : `${SITE_URL}/#ecosystem`,
        author: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    buildSeoHead({
      title: "Evovi · Phần mềm thiết kế riêng, ERP, LMS & Hệ sinh thái AI cho doanh nghiệp",
      description:
        "Evovi thiết kế và phát triển phần mềm theo đúng quy trình vận hành doanh nghiệp: hệ thống OOH Ad Canvas, ERP Elevator360, nền tảng giáo dục số Evo Books, LMS tập đoàn, EvoHub và tác nhân AI.",
      path: "/",
      jsonLd: HOME_JSON_LD,
    }),
  component: EvoviLandingPage,
});

const SCOPE_PRESETS = [
  "Hệ thống ERP / CRM vận hành thiết kế riêng",
  "Nền tảng LMS đào tạo nội bộ & quản trị năng lực",
  "Hệ thống OOH / Đội xe / App kỹ thuật hiện trường",
  "Số hóa học liệu EdTech & Tác nhân AI doanh nghiệp",
] as const;

const RIBBON_ITEMS_A = [
  "Ad Canvas OOH",
  "Evo AdTracker",
  "Elevator360 ERP",
  "Evo Books Để Học Tốt",
  "Sách Bài Tập Số NXBGD",
];

const RIBBON_ITEMS_B = [
  "Evo Books Studio",
  "Evo AI Service",
  "Enterprise & Public LMS",
  "EvoHub Agent-Ready",
  "Evo Chief of Staff",
];

const MANIFESTO_PHRASES = [
  "Phần mềm tốt không bắt doanh nghiệp sửa mình theo khuôn mẫu đóng gói.",
  "Tại Evovi, mọi dòng mã đều bắt đầu từ đặc tả nghiệp vụ sống (Spec-Driven),",
  "vận hành mượt từ bàn điều hành đến nhân sự ngoài hiện trường sóng yếu,",
  "và sẵn sàng để con người cùng AI mở rộng quy mô gấp mười lần.",
];

const CHAPTER_LABELS = [
  "Khởi nguồn",
  "Chuyển đổi hệ thống",
  "Năng lực kỹ thuật",
  "Hệ sinh thái Evovi",
  "Quy trình sáu chặng",
  "Tư vấn triển khai",
] as const;

function EvoviLandingPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const heroScrollProgressRef = useRef<number>(0);
  const ribbonARef = useRef<HTMLDivElement | null>(null);
  const ribbonBRef = useRef<HTMLDivElement | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [activeCapabilityIdx, setActiveCapabilityIdx] = useState(0);
  const [needText, setNeedText] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string>(SCOPE_PRESETS[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectProjectScope = (preset: string) => {
    setSelectedPreset(preset);
    setNeedText(preset);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rootEl = rootRef.current;
    if (!rootEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ribbonRaf = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onScroll = () => {
      const nextY = window.scrollY;
      scrollVelocity = nextY - lastScrollY;
      lastScrollY = nextY;
    };

    if (!reducedMotion) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const ctx = gsap.context(() => {
      // 0. Global Tri-Spectrum scroll progress thread
      if (progressBarRef.current) {
        gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: rootEl,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
            }
          },
        });
      }

      // Chapter indicator sync
      const chapterSections = gsap.utils.toArray<HTMLElement>("[data-chapter]", rootEl);
      chapterSections.forEach((sec, idx) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 48%",
          end: "bottom 48%",
          onEnter: () => setActiveChapter(idx),
          onEnterBack: () => setActiveChapter(idx),
        });
      });

      if (reducedMotion) return;

      // 1. Act I: Crisp masked hero headline entrance (settled well under 0.6s) + scroll-out signal stream
      const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", rootEl);
      const heroMeta = gsap.utils.toArray<HTMLElement>("[data-hero-fade]", rootEl);

      gsap.fromTo(
        heroLines,
        { yPercent: 95 },
        {
          yPercent: 0,
          duration: 0.48,
          stagger: 0.06,
          ease: "expo.out",
          delay: 0.02,
        },
      );

      gsap.fromTo(
        heroMeta,
        { y: 10, opacity: 0.45 },
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.04,
        },
      );

      ScrollTrigger.create({
        trigger: "[data-hero-stage]",
        start: "top top",
        end: "bottom top",
        scrub: 0.45,
        onUpdate: (self) => {
          heroScrollProgressRef.current = self.progress;
        },
      });

      gsap.fromTo(
        "[data-handoff-beam]",
        { scaleY: 0.2, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero-stage]",
            start: "top top",
            end: "bottom 35%",
            scrub: 0.45,
          },
        },
      );

      // 2. Act II: Continuous vertical conduit + active beat sync
      gsap.fromTo(
        "[data-act2-conduit]",
        { scaleY: 0.08, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-act2-list]",
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.45,
          },
        },
      );

      const beatCards = gsap.utils.toArray<HTMLElement>("[data-beat-item]", rootEl);
      beatCards.forEach((el, idx) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 58%",
          end: "bottom 45%",
          onEnter: () => setActiveBeatIndex(idx),
          onEnterBack: () => setActiveBeatIndex(idx),
        });
      });

      // 3. Act III: Scroll-scrubbed Ink-Fill Manifesto + Mosaic Parallax
      const inkSpans = gsap.utils.toArray<HTMLElement>("[data-ink-phrase]", rootEl);
      if (inkSpans.length > 0) {
        gsap.fromTo(
          inkSpans,
          { opacity: 0.28 },
          {
            opacity: 1,
            stagger: 0.22,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-manifesto-block]",
              start: "top 78%",
              end: "bottom 48%",
              scrub: 0.4,
            },
          },
        );
      }

      gsap.fromTo(
        "[data-mosaic-img]",
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-mosaic-grid]",
            start: "top 85%",
            end: "bottom 20%",
            scrub: 0.5,
          },
        },
      );

      // 4. Act IV: Scrubbed Inner Image Zoom inside Flush Dual-Photo Architectural Window
      const expandImgs = gsap.utils.toArray<HTMLElement>("[data-expand-img]", rootEl);
      if (expandImgs.length > 0) {
        gsap.fromTo(
          expandImgs,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-expand-window]",
              start: "top 88%",
              end: "bottom 25%",
              scrub: 0.45,
            },
          },
        );
      }

      const projectRows = gsap.utils.toArray<HTMLElement>("[data-project-row]", rootEl);
      projectRows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 20 },
          {
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              end: "top 65%",
              scrub: 0.35,
            },
          },
        );
      });

      // 5. Act V: 6-Step Spec-Driven Conduit Scrub
      gsap.fromTo(
        "[data-process-conduit]",
        { scaleY: 0.06, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-process-track]",
            start: "top 72%",
            end: "bottom 52%",
            scrub: 0.45,
          },
        },
      );

      const stepNodes = gsap.utils.toArray<HTMLElement>("[data-process-step]", rootEl);
      stepNodes.forEach((stepEl) => {
        gsap.fromTo(
          stepEl,
          { y: 18 },
          {
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepEl,
              start: "top 86%",
              end: "top 58%",
              scrub: 0.35,
            },
          },
        );
      });
    }, rootEl);

    // Velocity-reactive counter-scrolling ribbons (compositor translate3d only)
    if (!reducedMotion) {
      let posA = 0;
      let posB = -50;
      let smoothVel = 0;

      const tickRibbons = () => {
        smoothVel += (scrollVelocity - smoothVel) * 0.1;
        scrollVelocity *= 0.88;
        const boost = Math.min(2.4, Math.abs(smoothVel) * 0.05);
        const dir = smoothVel < -0.5 ? -1 : 1;

        posA -= (0.032 + boost * 0.085) * dir;
        posB += (0.032 + boost * 0.085) * dir;

        if (posA <= -50) posA += 50;
        if (posA > 0) posA -= 50;
        if (posB >= 0) posB -= 50;
        if (posB < -50) posB += 50;

        if (ribbonARef.current) {
          ribbonARef.current.style.transform = `translate3d(${posA.toFixed(3)}%, 0, 0)`;
        }
        if (ribbonBRef.current) {
          ribbonBRef.current.style.transform = `translate3d(${posB.toFixed(3)}%, 0, 0)`;
        }
        ribbonRaf = window.requestAnimationFrame(tickRibbons);
      };
      ribbonRaf = window.requestAnimationFrame(tickRibbons);
    }

    return () => {
      window.cancelAnimationFrame(ribbonRaf);
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  const navItems = [
    { href: "#solution", label: "Chuyển đổi" },
    { href: "#services", label: "Năng lực" },
    { href: "#cases", label: "Tiêu biểu" },
    { href: "#ecosystem", label: "9 Dự án Evovi" },
    { href: "#process", label: "Quy trình" },
  ];

  return (
    <div ref={rootRef} className="min-h-svh bg-[#eef2f6] text-[#0b1320]">
      {/* PERSISTENT ARCHITECTURAL HEADER + TRI-SPECTRUM PROGRESS THREAD */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#070d18] text-[#f4f7fb]">
        <div className="container-evo flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <a href="#top" aria-label="Trang chủ Evovi" className="inline-flex items-center">
              <EvoviLogoIcon size="sm" surface="tile" />
            </a>
            <span className="hidden text-evo-small font-medium text-[#a6b4c8] xl:inline-block">
              Mạch nội dung: {CHAPTER_LABELS[activeChapter]}
            </span>
          </div>

          <nav
            aria-label="Điều hướng chính"
            className="hidden items-center gap-7 text-evo-small font-medium text-[#a6b4c8] lg:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#f4f7fb]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#095fd6] px-3.5 py-2 text-evo-small font-semibold text-white transition-colors hover:bg-[#2480ff] sm:px-4"
            >
              <span>Nhận tư vấn</span>
              <span className="hidden sm:inline">kỹ thuật</span>
              <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#0d1728] text-[#f4f7fb] lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Continuous Tri-Spectrum Scroll Progress Thread */}
        <div className="h-[3px] w-full bg-[#0d1728]">
          <div
            ref={progressBarRef}
            className="grid h-full w-full grid-cols-3 will-change-transform"
          >
            <span className="bg-[#f59422]" />
            <span className="bg-[#2480ff]" />
            <span className="bg-[#3cb34a]" />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="bg-[#0d1728] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-3.5 text-evo-body font-medium text-[#f4f7fb]">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-[#f4f7fb]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#095fd6] px-4 py-3 text-evo-small font-semibold text-white"
              >
                Đặt lịch tư vấn miễn phí →
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* =========================================================
            ACT I: HERO - TRI-SPECTRUM CONVERGENCE & 42% AXIS STATEMENT
           ========================================================= */}
        <section
          data-chapter="0"
          data-hero-stage
          className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[#070d18] pt-22 pb-10 text-[#f4f7fb] md:pt-28 md:pb-14"
        >
          <HeroTriSpectrumCanvas scrollProgressRef={heroScrollProgressRef} />

          {/* Upper masthead coordinate bar aligned symmetrically on 56px left & right margins */}
          <div className="container-evo relative z-10">
            <div className="grid gap-3 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5" data-hero-fade>
                <span className="inline-flex items-center gap-2 rounded bg-[#0d1728] px-3.5 py-1.5 text-evo-small font-medium text-[#f4f7fb]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3cb34a]" />
                  Evovi Engineering Studio · Hà Nội & TP. Hồ Chí Minh
                </span>
              </div>
              <div className="hidden lg:col-span-7 lg:block lg:text-right" data-hero-fade>
                <p className="text-evo-small font-medium text-[#a6b4c8]">
                  Kiến trúc Spec-Driven · SaaS đa tổ chức · Ứng dụng hiện trường · Tác nhân AI
                </p>
              </div>
            </div>
          </div>

          {/* Statement anchored to lower third on 42% axis (Headline + sentence + CTA visible on first phone screen!) */}
          <div className="container-evo relative z-10 mt-10 md:mt-28">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              {/* Left of 42% axis */}
              <div className="order-2 lg:order-1 lg:col-span-5" data-hero-fade>
                <p className="max-w-[38ch] text-evo-body text-[#a6b4c8]">
                  Evovi thiết kế và xây dựng phần mềm khớp 100% cách doanh nghiệp bạn vận hành, từ cổng quản trị Web đến ứng dụng hiện trường và tác nhân AI.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-md bg-[#095fd6] px-5 py-3 text-evo-small font-semibold text-white transition-colors hover:bg-[#2480ff] sm:px-6 sm:py-3.5"
                  >
                    Nhận tư vấn & phác thảo giải pháp →
                  </a>
                  <a
                    href="#ecosystem"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0d1728] px-5 py-3 text-evo-small font-semibold text-[#f4f7fb] transition-colors hover:bg-[#142238] sm:py-3.5"
                  >
                    Xem 9 hệ thống thực tế
                  </a>
                </div>
              </div>

              {/* Right from 42% axis: Masked 2-Line Display Headline */}
              <div className="order-1 lg:order-2 lg:col-span-7">
                <h1 className="font-display text-evo-hero font-extrabold text-[#f4f7fb]">
                  <span className="evo-line-mask">
                    <span data-hero-line className="evo-line-inner">
                      Phần mềm riêng,
                    </span>
                  </span>
                  <span className="evo-line-mask">
                    <span data-hero-line className="evo-line-inner text-[#f59422]">
                      vận hành bứt phá.
                    </span>
                  </span>
                </h1>

                {/* Editorial programme facts strip (open architectural columns, compact 3-col on mobile too) */}
                <div
                  data-hero-fade
                  className="mt-8 grid grid-cols-3 gap-4 bg-[#0d1728] p-4 sm:gap-6 sm:p-5"
                >
                  <div>
                    <div className="font-display text-evo-h3 font-bold text-[#f4f7fb] tabular-nums">
                      9 hệ thống
                    </div>
                    <div className="mt-1 text-evo-small text-[#a6b4c8]">
                      Đang chạy thực tế
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-evo-h3 font-bold text-[#f4f7fb] tabular-nums">
                      39 kho mã
                    </div>
                    <div className="mt-1 text-evo-small text-[#a6b4c8]">
                      Web, Mobile & AI
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-evo-h3 font-bold text-[#3cb34a] tabular-nums">
                      24/7 SLA
                    </div>
                    <div className="mt-1 text-evo-small text-[#a6b4c8]">
                      Đồng hành kỹ thuật
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Downward Signal Handoff Conduit into Act II */}
            <div className="mt-8 hidden items-center justify-between gap-4 sm:flex lg:ml-[41.666%]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-[2px] overflow-hidden bg-[#142238]">
                  <div data-handoff-beam className="h-full w-full bg-[#f59422]" />
                </div>
                <span className="text-evo-small font-medium text-[#a6b4c8]">
                  Cuộn xuống để trải nghiệm mạch kiến trúc liên tiếp
                </span>
              </div>
              <span className="text-evo-small font-medium text-[#a6b4c8]">
                Evovi · Spec-Driven AI-Native
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================
            ACT II: CHAOS-TO-SYSTEM SPLIT STAGE
           ========================================================= */}
        <section
          id="solution"
          data-chapter="1"
          className="bg-[#eef2f6] py-20 text-[#0b1320] md:py-28"
        >
          <div className="container-evo">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <p className="max-w-[36ch] text-evo-body text-[#465468]">
                  Đa số doanh nghiệp chậm lại không phải vì đội ngũ thiếu nỗ lực, mà vì công cụ hiện tại rời rạc so với tốc độ phát triển thực tế.
                </p>
              </div>
              <div className="lg:col-span-7">
                <h2 className="font-display text-evo-h2 font-extrabold text-[#0b1320]">
                  Gỡ điểm nghẽn, nối liền vận hành
                </h2>
              </div>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left 42%: Open architectural list along scrubbed vertical conduit (single active highlight) */}
              <div data-act2-list className="relative pl-6 lg:col-span-5">
                <div className="absolute top-2 bottom-2 left-0 w-[3px] bg-[#cdd7e5]">
                  <div
                    data-act2-conduit
                    className="h-full w-full bg-[#095fd6] will-change-transform"
                  />
                </div>

                <div className="space-y-6">
                  {TRANSFORMATION_BEATS.map((beat, idx) => {
                    const active = idx === activeBeatIndex;
                    return (
                      <div
                        key={beat.painTitle}
                        data-beat-item
                        onClick={() => setActiveBeatIndex(idx)}
                        className={`cursor-pointer transition-colors ${
                          active
                            ? "bg-white p-6"
                            : "bg-transparent py-3 pr-4 pl-2 hover:text-[#095fd6]"
                        }`}
                      >
                        <h3 className="font-display text-evo-h3 font-bold text-[#0b1320]">
                          {beat.painTitle}
                        </h3>
                        <p className="mt-2 text-evo-body text-[#465468]">
                          {beat.painDesc}
                        </p>
                        <p className="mt-3 text-evo-small font-semibold text-[#095fd6]">
                          Hiệu quả chuyển đổi: {beat.metricBefore} → {beat.metricAfter}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right 58%: Sticky Live Transformer Console */}
              <div className="lg:sticky lg:top-24 lg:col-span-7">
                <SystemTransformerStage
                  activeIndex={activeBeatIndex}
                  onSelectBeat={setActiveBeatIndex}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ACT III: INK-FILL MANIFESTO + GUTTERLESS MOSAIC + CAPABILITIES
           ========================================================= */}
        <section
          id="services"
          data-chapter="2"
          className="bg-[#dfe6ef] py-20 text-[#0b1320] md:py-28"
        >
          <div className="container-evo">
            {/* Scroll-scrubbed Ink-Fill Manifesto on 42% axis */}
            <div data-manifesto-block className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="max-w-[34ch] text-evo-body text-[#465468]">
                  Phương pháp luận kỹ thuật Spec-Driven thống nhất đứng sau toàn bộ sản phẩm của Evovi.
                </p>
              </div>
              <div className="lg:col-span-7">
                <blockquote className="font-display text-[clamp(1.25rem,2vw,1.9rem)] font-bold leading-[1.32] tracking-[-0.02em] text-[#0b1320]">
                  {MANIFESTO_PHRASES.map((phrase, idx) => (
                    <span key={idx} data-ink-phrase className="mr-2 inline">
                      {phrase}
                    </span>
                  ))}
                </blockquote>
              </div>
            </div>

            {/* Gutterless 4-Cell Editorial Mosaic (Numeral first at top-left, caption beneath!) */}
            <div
              data-mosaic-grid
              className="mt-16 grid overflow-hidden lg:grid-cols-12"
            >
              {/* Cell 1: Studio Architecture Photograph (7 cols) */}
              <div className="overflow-hidden bg-[#070d18] lg:col-span-7">
                <img
                  data-mosaic-img
                  src={studioBlueprintImg}
                  alt="Bàn thiết kế kiến trúc mô-đun phần mềm tại studio kỹ thuật Evovi"
                  width={1440}
                  height={810}
                  loading="lazy"
                  className="h-full min-h-[280px] w-full object-cover will-change-transform"
                />
              </div>

              {/* Cell 2: Flat Electric Cobalt Block (5 cols) */}
              <div className="flex flex-col justify-between bg-[#095fd6] p-8 text-white md:p-10 lg:col-span-5">
                <div className="font-display text-evo-hero font-extrabold tabular-nums">
                  100%
                </div>
                <p className="mt-8 max-w-[36ch] text-evo-body text-white">
                  Dự án khởi đầu bằng tài liệu đặc tả nghiệp vụ sống và ma trận phân quyền rõ ràng để đội vận hành và kỹ sư nói chung một ngôn ngữ.
                </p>
              </div>

              {/* Cell 3: Flat Solar Orange Block (5 cols) */}
              <div className="flex flex-col justify-between bg-[#f59422] p-8 text-[#070d18] md:p-10 lg:col-span-5">
                <div className="font-display text-evo-h2 font-extrabold">
                  Web · App · AI
                </div>
                <p className="mt-8 max-w-[36ch] text-evo-body font-medium text-[#070d18]">
                  Đồng nhất từ cổng điều hành React 19, ứng dụng hiện trường Flutter và Expo tới dịch vụ AI FastAPI có kiểm duyệt an toàn.
                </p>
              </div>

              {/* Cell 4: Flat Obsidian Block (7 cols) */}
              <div className="flex flex-col justify-between bg-[#070d18] p-8 text-[#f4f7fb] md:p-10 lg:col-span-7">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-display text-evo-h3 font-bold">
                      Ra bản chạy thật sớm
                    </h3>
                    <p className="mt-2.5 text-evo-body text-[#a6b4c8]">
                      Chia lộ trình theo từng phân hệ cốt lõi để đội ngũ trải nghiệm sớm, đo hiệu quả ngay trên công việc hằng ngày.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-evo-h3 font-bold">
                      Hạ tầng tự động hóa IaC
                    </h3>
                    <p className="mt-2.5 text-evo-body text-[#a6b4c8]">
                      Triển khai chuẩn Terraform, Docker, sao lưu định kỳ và cô lập dữ liệu từng tổ chức khách hàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Core Capabilities on 42% Axis: Open Editorial Index (only 1 active dark surface) */}
            <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:sticky lg:top-24 lg:col-span-5">
                <h2 className="font-display text-evo-h2 font-extrabold text-[#0b1320]">
                  Đồng hành trọn vòng đời hệ thống
                </h2>
                <p className="mt-4 max-w-[36ch] text-evo-body text-[#465468]">
                  Chạm vào từng năng lực để xem gói bàn giao kỹ thuật cụ thể mà đội ngũ Evovi thiết lập cho doanh nghiệp.
                </p>

                <div className="mt-8 overflow-hidden bg-[#070d18]">
                  <img
                    src={factoryOpsImg}
                    alt="Kỹ sư điều hành giám sát hệ thống vận hành số hóa trên máy tính bảng tại doanh nghiệp"
                    width={1080}
                    height={1440}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 lg:col-span-7">
                {CAPABILITIES.map((cap, idx) => {
                  const isSelected = idx === activeCapabilityIdx;
                  return (
                    <div
                      key={cap.title}
                      onMouseEnter={() => setActiveCapabilityIdx(idx)}
                      onClick={() => setActiveCapabilityIdx(idx)}
                      className={`cursor-pointer border-l-4 transition-colors ${
                        isSelected
                          ? "border-[#f59422] bg-[#070d18] p-6 text-[#f4f7fb] md:p-7"
                          : "border-[#b8c6d9] bg-transparent py-4 pr-4 pl-6 text-[#0b1320] hover:border-[#095fd6]"
                      }`}
                    >
                      <h3 className="font-display text-evo-h3 font-bold">
                        {cap.title}
                      </h3>
                      <p
                        className={`mt-2 max-w-[60ch] text-evo-body ${
                          isSelected ? "text-[#a6b4c8]" : "text-[#465468]"
                        }`}
                      >
                        {cap.summary}
                      </p>
                      <p
                        className={`mt-3 text-evo-small font-semibold ${
                          isSelected ? "text-[#3cb34a]" : "text-[#095fd6]"
                        }`}
                      >
                        Bàn giao: {cap.deliverable}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            VELOCITY-DRIVEN COUNTER-SCROLLING KINETIC RIBBONS BRIDGE
            (Clipped inside container-evo margin so text never touches viewport edge)
           ========================================================= */}
        <div aria-hidden="true" className="bg-[#070d18] py-4 select-none">
          <div className="container-evo space-y-2">
            <div className="overflow-hidden bg-[#f59422] py-3 text-[#070d18]">
              <div ref={ribbonARef} className="evo-ribbon-track">
                {[...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A].map(
                  (item, i) => (
                    <span
                      key={i}
                      className="mx-6 font-display text-evo-h3 font-extrabold"
                    >
                      {item} <span className="ml-6 font-bold">/</span>
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="overflow-hidden bg-[#0d1728] py-3 text-[#f4f7fb]">
              <div ref={ribbonBRef} className="evo-ribbon-track">
                {[...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B].map(
                  (item, i) => (
                    <span
                      key={i}
                      className="mx-6 font-display text-evo-h3 font-bold"
                    >
                      {item} <span className="ml-6 font-bold text-[#2480ff]">/</span>
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            ACT IV: REAL EVOVI-VN FLAGSHIP SHOWCASE & 9-PROJECT LEDGER
           ========================================================= */}
        <div data-chapter="3">
          <FlagshipShowcaseStage onSelectProjectScope={handleSelectProjectScope} />
        </div>

        {/* =========================================================
            ACT V: CONTINUOUS 6-STEP SPEC-DRIVEN ENGINEERING CONDUIT
           ========================================================= */}
        <section
          id="process"
          data-chapter="4"
          className="bg-[#dfe6ef] py-20 text-[#0b1320] md:py-28"
        >
          <div className="container-evo">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <p className="max-w-[36ch] text-evo-body text-[#465468]">
                  Mỗi chặng đều có đầu ra kiểm chứng được: rõ phạm vi, rõ thời gian và không phát sinh chi phí mập mờ.
                </p>
              </div>
              <div className="lg:col-span-7">
                <h2 className="font-display text-evo-h2 font-extrabold text-[#0b1320]">
                  Sáu chặng triển khai rõ đầu ra
                </h2>
              </div>
            </div>

            <div className="mt-14 grid lg:grid-cols-12">
              <div className="hidden lg:col-span-5 lg:block" />
              <div data-process-track className="relative pl-8 lg:col-span-7">
                {/* Continuous scrubbed signal spine */}
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#b8c6d9]">
                  <div
                    data-process-conduit
                    className="h-full w-full bg-[#095fd6] will-change-transform"
                  />
                </div>

                {/* Open Editorial Ordered List (Zero repetitive white card boxes!) */}
                <ol className="list-decimal space-y-8 pl-6 marker:font-display marker:text-evo-h3 marker:font-extrabold marker:text-[#095fd6]">
                  {DELIVERY_STEPS.map((step) => (
                    <li
                      key={step.title}
                      data-process-step
                      className="py-2"
                    >
                      <h3 className="font-display text-evo-h3 font-bold text-[#0b1320]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[60ch] text-evo-body text-[#465468]">
                        {step.detail}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ACT VI: INVERTED CONSULTATION SCOPER & LEAD FORM (#070d18)
           ========================================================= */}
        <section
          id="contact"
          data-chapter="5"
          className="relative overflow-hidden bg-[#070d18] py-20 text-[#f4f7fb] md:py-28"
        >
          <HorizonSignalCanvas />

          <div className="container-evo relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left 42%: Statement restated + Quick Scope Selector + Direct Contact */}
              <div className="lg:col-span-5">
                <h2 className="font-display text-evo-h2 font-extrabold text-[#f4f7fb]">
                  Kể chỗ đang vướng của bạn.
                </h2>
                <p className="mt-4 max-w-[38ch] text-evo-body text-[#a6b4c8]">
                  Bạn không cần chuẩn bị tài liệu kỹ thuật phức tạp. Trong buổi trao đổi đầu tiên, đội ngũ Evovi sẽ cùng bạn phác thảo luồng giải pháp và lộ trình ra bản chạy thử rõ ràng.
                </p>

                {/* Interactive Quick-Scope Chips */}
                <div className="mt-8">
                  <p className="text-evo-small font-semibold text-[#a6b4c8]">
                    Chọn nhanh bài toán bạn đang quan tâm:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SCOPE_PRESETS.map((preset) => {
                      const active = selectedPreset === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectProjectScope(preset)}
                          className={`rounded-md px-3.5 py-2 text-left text-evo-small font-semibold transition-colors ${
                            active
                              ? "bg-[#f59422] text-[#070d18]"
                              : "bg-[#0d1728] text-[#f4f7fb] hover:bg-[#142238]"
                          }`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct studio contact coordinates */}
                <div className="mt-10 space-y-3.5 bg-[#0d1728] p-6 text-evo-body">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-[#f59422]" />
                    <a
                      href="mailto:kinhdoanh@evovi.vn"
                      className="font-medium text-[#f4f7fb] hover:text-[#f59422]"
                    >
                      kinhdoanh@evovi.vn
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-[#3cb34a]" />
                    <span>
                      Hotline 24/7:{" "}
                      <a
                        href="tel:0868661235"
                        className="font-semibold tabular-nums text-[#f4f7fb] hover:text-[#3cb34a]"
                      >
                        0868 661 235
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#a6b4c8]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#2480ff]" />
                    <span>Hà Nội · TP. Hồ Chí Minh</span>
                  </div>
                </div>
              </div>

              {/* Right 58%: Consultation Form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="rounded-lg bg-[#0d1728] p-6 md:p-8"
                >
                  {submitted ? (
                    <div className="py-12 text-center">
                      <CheckCircle2 className="mx-auto h-14 w-14 text-[#3cb34a]" />
                      <h3 className="mt-4 font-display text-evo-h3 font-bold text-[#f4f7fb]">
                        Đã tiếp nhận yêu cầu tư vấn
                      </h3>
                      <p className="mx-auto mt-2 max-w-[42ch] text-evo-body text-[#a6b4c8]">
                        Cảm ơn bạn. Đội ngũ kỹ sư giải pháp của Evovi sẽ liên hệ sớm nhất trong giờ làm việc để hẹn lịch trao đổi chi tiết.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-6 rounded-md bg-[#142238] px-4 py-2.5 text-evo-small font-semibold text-[#f4f7fb] transition-colors hover:bg-[#095fd6]"
                      >
                        Gửi thêm yêu cầu khác
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="evo-name"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f4f7fb]"
                          >
                            Họ và tên
                          </label>
                          <input
                            id="evo-name"
                            required
                            type="text"
                            name="name"
                            placeholder="Nguyễn Văn A"
                            maxLength={255}
                            className="w-full rounded-md bg-[#070d18] px-4 py-3 text-evo-body text-[#f4f7fb] placeholder:text-[#a6b4c8]/60 focus:ring-2 focus:ring-[#2480ff] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="evo-company"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f4f7fb]"
                          >
                            Tên doanh nghiệp / tổ chức
                          </label>
                          <input
                            id="evo-company"
                            required
                            type="text"
                            name="company"
                            placeholder="Công ty Cổ phần ABC"
                            maxLength={255}
                            className="w-full rounded-md bg-[#070d18] px-4 py-3 text-evo-body text-[#f4f7fb] placeholder:text-[#a6b4c8]/60 focus:ring-2 focus:ring-[#2480ff] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="evo-email"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f4f7fb]"
                          >
                            Email công việc
                          </label>
                          <input
                            id="evo-email"
                            required
                            type="email"
                            name="email"
                            placeholder="ban@doanhnghiep.vn"
                            maxLength={255}
                            className="w-full rounded-md bg-[#070d18] px-4 py-3 text-evo-body text-[#f4f7fb] placeholder:text-[#a6b4c8]/60 focus:ring-2 focus:ring-[#2480ff] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="evo-phone"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f4f7fb]"
                          >
                            Số điện thoại liên hệ
                          </label>
                          <input
                            id="evo-phone"
                            required
                            type="tel"
                            name="phone"
                            placeholder="0909 000 000"
                            maxLength={30}
                            className="w-full rounded-md bg-[#070d18] px-4 py-3 text-evo-body text-[#f4f7fb] placeholder:text-[#a6b4c8]/60 focus:ring-2 focus:ring-[#2480ff] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="evo-role"
                          className="mb-1.5 block text-evo-small font-semibold text-[#f4f7fb]"
                        >
                          Vai trò của bạn
                        </label>
                        <select
                          id="evo-role"
                          required
                          name="role"
                          defaultValue=""
                          className="w-full rounded-md bg-[#070d18] px-4 py-3 text-evo-body text-[#f4f7fb] focus:ring-2 focus:ring-[#2480ff] focus:outline-none"
                        >
                          <option value="" disabled>
                            Chọn vai trò công việc
                          </option>
                          <option value="ceo">CEO / Chủ doanh nghiệp / Founder</option>
                          <option value="cto">CTO / Giám đốc Công nghệ</option>
                          <option value="ops">Giám đốc Vận hành / Trưởng bộ phận</option>
                          <option value="product">Quản lý Sản phẩm / Dự án</option>
                          <option value="other">Vai trò khác</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="evo-need"
                          className="mb-1.5 block text-evo-small font-semibold text-[#f4f7fb]"
                        >
                          Mô tả ngắn nhu cầu hoặc điểm nghẽn hiện tại
                        </label>
                        <textarea
                          id="evo-need"
                          required
                          rows={4}
                          name="need"
                          value={needText}
                          onChange={(e) => setNeedText(e.target.value)}
                          maxLength={1200}
                          placeholder="Ví dụ: cần quản lý tồn kho quảng cáo OOH, xây dựng LMS đào tạo nội bộ đa chi nhánh, hoặc làm app kỹ thuật viên hiện trường..."
                          className="w-full resize-none rounded-md bg-[#070d18] px-4 py-3 text-evo-body text-[#f4f7fb] placeholder:text-[#a6b4c8]/60 focus:ring-2 focus:ring-[#2480ff] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#095fd6] px-6 py-4 text-evo-body font-semibold text-white transition-colors hover:bg-[#2480ff]"
                      >
                        Gửi thông tin để nhận lịch tư vấn 1-1 →
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          MONUMENTAL EDITORIAL FOOTER
         ========================================================= */}
      <footer className="overflow-hidden bg-[#040810] pt-16 pb-14 text-[#f4f7fb]">
        <div className="container-evo">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left 42%: Brand badge + direct high-scale links */}
            <div className="lg:col-span-5">
              <EvoviLogoIcon size="md" surface="tile" />
              <p className="mt-4 max-w-[36ch] text-evo-body text-[#a6b4c8]">
                Studio kỹ thuật phần mềm thiết kế riêng, nền tảng quản trị đa tenant và giải pháp AI vận hành thực chiến cho doanh nghiệp.
              </p>
              <div className="mt-6 space-y-1.5 font-display text-evo-h3 font-bold">
                <div>
                  <a
                    href="mailto:kinhdoanh@evovi.vn"
                    className="text-[#f59422] transition-colors hover:text-[#f4f7fb]"
                  >
                    kinhdoanh@evovi.vn
                  </a>
                </div>
                <div>
                  <a
                    href="tel:0868661235"
                    className="tabular-nums text-[#f4f7fb] transition-colors hover:text-[#2480ff]"
                  >
                    0868 661 235
                  </a>
                </div>
              </div>
            </div>

            {/* Right 58%: 3 clean columns of product & legal routes */}
            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
              <div>
                <h3 className="font-display text-evo-body font-bold text-[#f4f7fb]">
                  Điều hướng
                </h3>
                <ul className="mt-4 space-y-2.5 text-evo-small text-[#a6b4c8]">
                  <li>
                    <a href="#solution" className="hover:text-[#f59422]">
                      Giải pháp chuyển đổi
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-[#f59422]">
                      Năng lực kỹ thuật
                    </a>
                  </li>
                  <li>
                    <a href="#ecosystem" className="hover:text-[#f59422]">
                      9 Hệ thống Evovi
                    </a>
                  </li>
                  <li>
                    <a href="#process" className="hover:text-[#f59422]">
                      Quy trình 6 bước
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-evo-body font-bold text-[#f4f7fb]">
                  Sản phẩm công khai
                </h3>
                <ul className="mt-4 space-y-2.5 text-evo-small text-[#a6b4c8]">
                  <li>
                    <Link
                      to="/ad-canvas"
                      className="text-[#f4f7fb] hover:text-[#f59422]"
                    >
                      Ad Canvas OOH ↗
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ad-canvas/support"
                      className="hover:text-[#f59422]"
                    >
                      Trung tâm hỗ trợ Ad Canvas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy/ad-canvas"
                      className="hover:text-[#f59422]"
                    >
                      Quyền riêng tư Ad Canvas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy/elevator-360"
                      className="hover:text-[#f59422]"
                    >
                      Quyền riêng tư Elevator360
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="lg:text-right">
                <h3 className="font-display text-evo-body font-bold text-[#f4f7fb]">
                  Hiện diện
                </h3>
                <ul className="mt-4 space-y-2.5 text-evo-small text-[#a6b4c8]">
                  <li className="text-[#f4f7fb]">Hà Nội · Việt Nam</li>
                  <li className="text-[#f4f7fb]">TP. Hồ Chí Minh · Việt Nam</li>
                  <li>Hỗ trợ kỹ thuật: support@evovi.vn</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Closing Monumental Wordmark at Bottom */}
          <div
            aria-hidden="true"
            className="mt-12 select-none font-display text-[clamp(4.5rem,17vw,14.5rem)] font-extrabold leading-[0.84] tracking-[-0.05em] text-[#5b7396]"
          >
            EVOVI
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 text-evo-small text-[#a6b4c8] sm:flex-row">
            <span>© {new Date().getFullYear()} Evovi. Bảo lưu mọi quyền.</span>
            <a href="#top" className="font-semibold text-[#f4f7fb] hover:text-[#f59422]">
              Về đầu trang ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
