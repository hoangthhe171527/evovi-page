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
      // 0. Global Enterprise Signal Progress Thread
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

      // 1. Act I: Crisp masked hero headline entrance (< 0.55s) + scroll-out topology convergence
      const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", rootEl);
      const heroMeta = gsap.utils.toArray<HTMLElement>("[data-hero-fade]", rootEl);

      gsap.fromTo(
        heroLines,
        { yPercent: 96 },
        {
          yPercent: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "expo.out",
          delay: 0.02,
        },
      );

      gsap.fromTo(
        heroMeta,
        { y: 12, opacity: 0.48 },
        {
          y: 0,
          opacity: 1,
          duration: 0.44,
          stagger: 0.045,
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

      // 1b. Chained Section Headings & Supporting Copy Reveals across all acts
      const sectionHeadings = gsap.utils.toArray<HTMLElement>(
        "[data-section-heading]",
        rootEl,
      );
      sectionHeadings.forEach((hEl) => {
        gsap.fromTo(
          hEl,
          { y: 24, opacity: 0.52 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hEl,
              start: "top 90%",
              end: "top 62%",
              scrub: 0.35,
            },
          },
        );
      });

      const sectionSubs = gsap.utils.toArray<HTMLElement>("[data-section-sub]", rootEl);
      sectionSubs.forEach((subEl) => {
        gsap.fromTo(
          subEl,
          { y: 16, opacity: 0.58 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subEl,
              start: "top 92%",
              end: "top 66%",
              scrub: 0.35,
            },
          },
        );
      });

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

      // 3. Act III: Scroll-scrubbed Luminous Ink-Fill Manifesto + Mosaic Parallax + Capability reveals
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
              start: "top 80%",
              end: "bottom 48%",
              scrub: 0.4,
            },
          },
        );
      }

      gsap.fromTo(
        "[data-mosaic-img]",
        { scale: 1.09 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-mosaic-grid]",
            start: "top 88%",
            end: "bottom 20%",
            scrub: 0.5,
          },
        },
      );

      const mosaicCells = gsap.utils.toArray<HTMLElement>("[data-mosaic-cell]", rootEl);
      mosaicCells.forEach((cell) => {
        gsap.fromTo(
          cell,
          { y: 20, opacity: 0.65 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cell,
              start: "top 92%",
              end: "top 68%",
              scrub: 0.35,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-cap-img]",
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-cap-img]",
            start: "top 88%",
            end: "bottom 25%",
            scrub: 0.45,
          },
        },
      );

      const capItems = gsap.utils.toArray<HTMLElement>("[data-cap-item]", rootEl);
      capItems.forEach((cEl) => {
        gsap.fromTo(
          cEl,
          { y: 16 },
          {
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cEl,
              start: "top 92%",
              end: "top 68%",
              scrub: 0.3,
            },
          },
        );
      });

      // 4. Act IV: Scrubbed Inner Image Zoom inside Dual-Photo Architectural Window + 9-System Rows
      const expandImgs = gsap.utils.toArray<HTMLElement>("[data-expand-img]", rootEl);
      if (expandImgs.length > 0) {
        gsap.fromTo(
          expandImgs,
          { scale: 1.09 },
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
          { y: 22, opacity: 0.65 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              end: "top 66%",
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
          { y: 18, opacity: 0.62 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepEl,
              start: "top 88%",
              end: "top 60%",
              scrub: 0.35,
            },
          },
        );
      });
    }, rootEl);

    // Velocity-reactive counter-scrolling enterprise ribbons (compositor translate3d only)
    if (!reducedMotion) {
      let posA = 0;
      let posB = -50;
      let smoothVel = 0;

      const tickRibbons = () => {
        smoothVel += (scrollVelocity - smoothVel) * 0.1;
        scrollVelocity *= 0.88;
        const boost = Math.min(2.4, Math.abs(smoothVel) * 0.05);
        const dir = smoothVel < -0.5 ? -1 : 1;

        posA -= (0.028 + boost * 0.08) * dir;
        posB += (0.028 + boost * 0.08) * dir;

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
    <div ref={rootRef} className="min-h-svh bg-[#050b16] text-[#d6e2f5]">
      {/* PERSISTENT ENTERPRISE HEADER + SIGNAL PROGRESS THREAD */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#050b16] text-[#f5f8ff]">
        <div className="container-evo flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <a href="#top" aria-label="Trang chủ Evovi" className="inline-flex items-center">
              <EvoviLogoIcon size="sm" />
            </a>
            <span className="hidden text-evo-small font-medium text-[#9eb2d0] xl:inline-block">
              Mạch kiến trúc: {CHAPTER_LABELS[activeChapter]}
            </span>
          </div>

          <nav
            aria-label="Điều hướng chính"
            className="hidden items-center gap-7 text-evo-small font-medium text-[#d6e2f5] lg:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#5ca4ff]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0b63e5] px-3.5 py-2 text-evo-small font-semibold text-white transition-colors hover:bg-[#247eff] sm:px-4"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#0d1b33] text-[#f5f8ff] lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Continuous Tri-Spectrum Scroll Progress Thread */}
        <div className="h-[3px] w-full bg-[#0d1b33]">
          <div
            ref={progressBarRef}
            className="grid h-full w-full grid-cols-3 will-change-transform"
          >
            <span className="bg-[#247eff]" />
            <span className="bg-[#34c759]" />
            <span className="bg-[#f5a623]" />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="bg-[#0d1b33] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-3.5 text-evo-body font-medium text-[#f5f8ff]">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-[#f5f8ff]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#0b63e5] px-4 py-3 text-evo-small font-semibold text-white"
              >
                Đặt lịch tư vấn giải pháp →
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* =========================================================
            ACT I: HERO - ENTERPRISE ARCHITECTURE TOPOLOGY & 42% AXIS
           ========================================================= */}
        <section
          data-chapter="0"
          data-hero-stage
          className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[#050b16] pt-22 pb-10 text-[#f5f8ff] md:pt-28 md:pb-14"
        >
          <HeroTriSpectrumCanvas scrollProgressRef={heroScrollProgressRef} />

          {/* Upper masthead coordinate bar aligned symmetrically on container margins */}
          <div className="container-evo relative z-10">
            <div className="grid gap-3 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5" data-hero-fade>
                <span className="inline-flex items-center gap-2.5 rounded-md bg-[#0d1b33] px-3.5 py-1.5 text-evo-small font-medium text-[#f5f8ff]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34c759]" />
                  Evovi Engineering · Hà Nội & TP. Hồ Chí Minh
                </span>
              </div>
              <div className="hidden lg:col-span-7 lg:block lg:text-right" data-hero-fade>
                <p className="text-evo-small font-medium text-[#9eb2d0]">
                  Kiến trúc Spec-Driven · SaaS đa tổ chức · Ứng dụng hiện trường · Tác nhân AI
                </p>
              </div>
            </div>
          </div>

          {/* Statement anchored to lower third on 42% axis */}
          <div className="container-evo relative z-10 mt-10 md:mt-24">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              {/* Left of 42% axis */}
              <div className="order-2 lg:order-1 lg:col-span-5" data-hero-fade>
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Evovi thiết kế và xây dựng phần mềm khớp trọn vẹn quy trình doanh nghiệp bạn vận hành, từ cổng quản trị Web đến ứng dụng hiện trường và tác nhân AI.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0b63e5] px-5 py-3 text-evo-small font-semibold text-white transition-colors hover:bg-[#247eff] sm:px-6 sm:py-3.5"
                  >
                    Nhận tư vấn & phác thảo giải pháp →
                  </a>
                  <a
                    href="#ecosystem"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0d1b33] px-5 py-3 text-evo-small font-semibold text-[#f5f8ff] transition-colors hover:bg-[#132747] sm:py-3.5"
                  >
                    Xem 9 hệ thống thực tế
                  </a>
                </div>
              </div>

              {/* Right from 42% axis: Masked 2-Line Enterprise Display Headline */}
              <div className="order-1 lg:order-2 lg:col-span-7">
                <h1 className="font-display text-evo-hero font-bold text-[#f5f8ff]">
                  <span className="evo-line-mask">
                    <span data-hero-line className="evo-line-inner">
                      Phần mềm riêng,
                    </span>
                  </span>
                  <span className="evo-line-mask">
                    <span data-hero-line className="evo-line-inner text-[#5ca4ff]">
                      vận hành bứt phá.
                    </span>
                  </span>
                </h1>

                {/* Executive programme metrics strip */}
                <div
                  data-hero-fade
                  className="mt-8 grid grid-cols-3 gap-4 rounded-lg bg-[#0d1b33] p-4 sm:gap-6 sm:p-5"
                >
                  <div>
                    <div className="font-display text-evo-h3 font-bold text-[#f5f8ff] tabular-nums">
                      9 hệ thống
                    </div>
                    <div className="mt-1 text-evo-small text-[#9eb2d0]">
                      Đang chạy thực tế
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-evo-h3 font-bold text-[#5ca4ff] tabular-nums">
                      39 kho mã
                    </div>
                    <div className="mt-1 text-evo-small text-[#9eb2d0]">
                      Web, Mobile & AI
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-evo-h3 font-bold text-[#34c759] tabular-nums">
                      24/7 SLA
                    </div>
                    <div className="mt-1 text-evo-small text-[#9eb2d0]">
                      Đồng hành kỹ thuật
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Downward Signal Handoff Conduit into Act II */}
            <div className="mt-8 hidden items-center justify-between gap-4 sm:flex lg:ml-[41.666%]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-[2px] overflow-hidden bg-[#132747]">
                  <div data-handoff-beam className="h-full w-full bg-[#247eff]" />
                </div>
                <span className="text-evo-small font-medium text-[#9eb2d0]">
                  Cuộn xuống để theo dõi mạch kiến trúc liên thông
                </span>
              </div>
              <span className="text-evo-small font-medium text-[#9eb2d0]">
                Evovi · Spec-Driven Enterprise Engineering
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================
            ACT II: CHAOS-TO-SYSTEM SPLIT STAGE (#081224 Midnight Navy)
           ========================================================= */}
        <section
          id="solution"
          data-chapter="1"
          className="bg-[#081224] py-20 text-[#f5f8ff] md:py-28"
        >
          <div className="container-evo">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5" data-section-sub>
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Đa số doanh nghiệp chậm lại không phải vì đội ngũ thiếu nỗ lực, mà vì công cụ hiện tại rời rạc so với tốc độ phát triển thực tế.
                </p>
              </div>
              <div className="lg:col-span-7">
                <h2
                  data-section-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Gỡ điểm nghẽn, nối liền vận hành
                </h2>
              </div>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left 42%: Open architectural list along scrubbed vertical conduit */}
              <div data-act2-list className="relative pl-6 lg:col-span-5">
                <div className="absolute top-2 bottom-2 left-0 w-[3px] bg-[#132747]">
                  <div
                    data-act2-conduit
                    className="h-full w-full bg-[#247eff] will-change-transform"
                  />
                </div>

                <div className="space-y-5">
                  {TRANSFORMATION_BEATS.map((beat, idx) => {
                    const active = idx === activeBeatIndex;
                    return (
                      <div
                        key={beat.painTitle}
                        data-beat-item
                        onClick={() => setActiveBeatIndex(idx)}
                        className={`cursor-pointer rounded-md transition-colors duration-200 ${
                          active
                            ? "bg-[#0d1b33] p-6"
                            : "bg-transparent py-3 pr-4 pl-2 hover:bg-[#0d1b33]/50"
                        }`}
                      >
                        <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                          {beat.painTitle}
                        </h3>
                        <p className="mt-2 text-evo-body text-[#d6e2f5]">
                          {beat.painDesc}
                        </p>
                        <p className="mt-3 text-evo-small font-semibold text-[#5ca4ff]">
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
            ACT III: LUMINOUS MANIFESTO + DARK MOSAIC + CAPABILITIES
           ========================================================= */}
        <section
          id="services"
          data-chapter="2"
          className="bg-[#050b16] py-20 text-[#f5f8ff] md:py-28"
        >
          <div className="container-evo">
            {/* Scroll-scrubbed Luminous Ink-Fill Manifesto on 42% axis */}
            <div data-manifesto-block className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5" data-section-sub>
                <p className="max-w-[36ch] text-evo-body text-[#d6e2f5]">
                  Phương pháp luận kỹ thuật Spec-Driven thống nhất đứng sau toàn bộ sản phẩm của Evovi.
                </p>
              </div>
              <div className="lg:col-span-7">
                <blockquote className="font-display text-[clamp(1.25rem,1.95vw,1.8rem)] font-semibold leading-[1.42] tracking-[-0.016em] text-[#f5f8ff]">
                  {MANIFESTO_PHRASES.map((phrase, idx) => (
                    <span key={idx} data-ink-phrase className="mr-2 inline">
                      {phrase}
                    </span>
                  ))}
                </blockquote>
              </div>
            </div>

            {/* Executive 4-Cell Dark Architectural Mosaic */}
            <div
              data-mosaic-grid
              className="mt-16 grid gap-3 overflow-hidden bg-[#081224] p-3 lg:grid-cols-12"
            >
              {/* Cell 1: Studio Architecture Photograph (7 cols) */}
              <div
                data-mosaic-cell
                className="overflow-hidden bg-[#050b16] lg:col-span-7"
              >
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

              {/* Cell 2: Executive Cobalt Block (5 cols) */}
              <div
                data-mosaic-cell
                className="flex flex-col justify-between bg-[#0b63e5] p-8 text-white md:p-10 lg:col-span-5"
              >
                <div className="font-display text-evo-hero font-bold tabular-nums">
                  100%
                </div>
                <p className="mt-8 max-w-[36ch] text-evo-body text-white">
                  Dự án khởi đầu bằng tài liệu đặc tả nghiệp vụ sống và ma trận phân quyền rõ ràng để đội vận hành và kỹ sư nói chung một ngôn ngữ.
                </p>
              </div>

              {/* Cell 3: Elevated Slate-Navy Block (5 cols) */}
              <div
                data-mosaic-cell
                className="flex flex-col justify-between bg-[#0d1b33] p-8 text-[#f5f8ff] md:p-10 lg:col-span-5"
              >
                <div className="font-display text-evo-h2 font-bold text-[#5ca4ff]">
                  Web · App · AI
                </div>
                <p className="mt-8 max-w-[36ch] text-evo-body text-[#d6e2f5]">
                  Đồng nhất từ cổng điều hành React 19, ứng dụng hiện trường Flutter và Expo tới dịch vụ AI FastAPI có kiểm duyệt an toàn.
                </p>
              </div>

              {/* Cell 4: Deep Steel-Navy Block (7 cols) */}
              <div
                data-mosaic-cell
                className="flex flex-col justify-between bg-[#132747] p-8 text-[#f5f8ff] md:p-10 lg:col-span-7"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                      Ra bản chạy thật sớm
                    </h3>
                    <p className="mt-2.5 text-evo-body text-[#d6e2f5]">
                      Chia lộ trình theo từng phân hệ cốt lõi để đội ngũ trải nghiệm sớm, đo hiệu quả ngay trên công việc hằng ngày.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                      Hạ tầng tự động hóa IaC
                    </h3>
                    <p className="mt-2.5 text-evo-body text-[#d6e2f5]">
                      Triển khai chuẩn Terraform, Docker, sao lưu định kỳ và cô lập dữ liệu từng tổ chức khách hàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Core Capabilities on 42% Axis: Open Enterprise Index */}
            <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:sticky lg:top-24 lg:col-span-5">
                <h2
                  data-section-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Đồng hành trọn vòng đời hệ thống
                </h2>
                <p className="mt-4 max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Chạm vào từng năng lực để xem gói bàn giao kỹ thuật cụ thể mà đội ngũ Evovi thiết lập cho doanh nghiệp.
                </p>

                <div className="mt-8 overflow-hidden rounded-lg bg-[#081224]">
                  <img
                    data-cap-img
                    src={factoryOpsImg}
                    alt="Kỹ sư điều hành giám sát hệ thống vận hành số hóa trên máy tính bảng tại doanh nghiệp"
                    width={1080}
                    height={1440}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover will-change-transform"
                  />
                </div>
              </div>

              <div className="space-y-3.5 lg:col-span-7">
                {CAPABILITIES.map((cap, idx) => {
                  const isSelected = idx === activeCapabilityIdx;
                  return (
                    <div
                      key={cap.title}
                      data-cap-item
                      onMouseEnter={() => setActiveCapabilityIdx(idx)}
                      onClick={() => setActiveCapabilityIdx(idx)}
                      className={`cursor-pointer border-l-4 transition-colors duration-200 ${
                        isSelected
                          ? "border-[#247eff] bg-[#0d1b33] p-6 text-[#f5f8ff] md:p-7"
                          : "border-[#132747] bg-transparent py-4 pr-4 pl-6 text-[#f5f8ff] hover:border-[#5ca4ff]"
                      }`}
                    >
                      <h3 className="font-display text-evo-h3 font-semibold">
                        {cap.title}
                      </h3>
                      <p className="mt-2 max-w-[60ch] text-evo-body text-[#d6e2f5]">
                        {cap.summary}
                      </p>
                      <p
                        className={`mt-3 text-evo-small font-semibold ${
                          isSelected ? "text-[#34c759]" : "text-[#5ca4ff]"
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
            VELOCITY-DRIVEN COUNTER-SCROLLING DARK ENTERPRISE RIBBONS
           ========================================================= */}
        <div aria-hidden="true" className="bg-[#081224] py-5 select-none">
          <div className="container-evo space-y-2.5">
            <div className="overflow-hidden rounded-md bg-[#0d1b33] py-3.5 text-[#f5f8ff]">
              <div ref={ribbonARef} className="evo-ribbon-track">
                {[...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A].map(
                  (item, i) => (
                    <span
                      key={i}
                      className="mx-6 font-display text-evo-h3 font-semibold"
                    >
                      {item} <span className="ml-6 font-bold text-[#5ca4ff]">/</span>
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="overflow-hidden rounded-md bg-[#050b16] py-3.5 text-[#d6e2f5]">
              <div ref={ribbonBRef} className="evo-ribbon-track">
                {[...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B].map(
                  (item, i) => (
                    <span
                      key={i}
                      className="mx-6 font-display text-evo-h3 font-semibold"
                    >
                      {item} <span className="ml-6 font-bold text-[#34c759]">/</span>
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
          className="bg-[#081224] py-20 text-[#f5f8ff] md:py-28"
        >
          <div className="container-evo">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5" data-section-sub>
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Mỗi chặng đều có đầu ra kiểm chứng được: rõ phạm vi, rõ thời gian và không phát sinh chi phí mập mờ.
                </p>
              </div>
              <div className="lg:col-span-7">
                <h2
                  data-section-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Sáu chặng triển khai rõ đầu ra
                </h2>
              </div>
            </div>

            <div className="mt-14 grid lg:grid-cols-12">
              <div className="hidden lg:col-span-5 lg:block" />
              <div data-process-track className="relative pl-8 lg:col-span-7">
                {/* Continuous scrubbed signal spine */}
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#132747]">
                  <div
                    data-process-conduit
                    className="h-full w-full bg-[#247eff] will-change-transform"
                  />
                </div>

                {/* Open Enterprise Ordered List */}
                <ol className="list-decimal space-y-8 pl-6 marker:font-display marker:text-evo-h3 marker:font-bold marker:text-[#5ca4ff]">
                  {DELIVERY_STEPS.map((step) => (
                    <li
                      key={step.title}
                      data-process-step
                      className="py-2"
                    >
                      <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[60ch] text-evo-body text-[#d6e2f5]">
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
            ACT VI: CONSULTATION SCOPER & EXECUTIVE LEAD FORM (#050b16)
           ========================================================= */}
        <section
          id="contact"
          data-chapter="5"
          className="relative overflow-hidden bg-[#050b16] py-20 text-[#f5f8ff] md:py-28"
        >
          <HorizonSignalCanvas />

          <div className="container-evo relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left 42%: Statement + Quick Scope Selector + Direct Contact */}
              <div className="lg:col-span-5">
                <h2
                  data-section-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Kể bài toán bạn cần giải quyết.
                </h2>
                <p className="mt-4 max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Bạn không cần chuẩn bị tài liệu kỹ thuật phức tạp. Trong buổi làm việc đầu tiên, đội ngũ kỹ sư giải pháp Evovi sẽ cùng bạn phác thảo kiến trúc và lộ trình ra bản chạy thử rõ ràng.
                </p>

                {/* Interactive Quick-Scope Chips */}
                <div className="mt-8">
                  <p className="text-evo-small font-semibold text-[#9eb2d0]">
                    Chọn nhanh phạm vi bạn đang quan tâm:
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
                              ? "bg-[#0b63e5] text-white"
                              : "bg-[#0d1b33] text-[#d6e2f5] hover:bg-[#132747] hover:text-[#f5f8ff]"
                          }`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct studio contact coordinates */}
                <div className="mt-10 space-y-3.5 rounded-lg bg-[#0d1b33] p-6 text-evo-body">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-[#5ca4ff]" />
                    <a
                      href="mailto:kinhdoanh@evovi.vn"
                      className="font-medium text-[#f5f8ff] hover:text-[#5ca4ff]"
                    >
                      kinhdoanh@evovi.vn
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-[#34c759]" />
                    <span>
                      Hotline 24/7:{" "}
                      <a
                        href="tel:0868661235"
                        className="font-semibold tabular-nums text-[#f5f8ff] hover:text-[#34c759]"
                      >
                        0868 661 235
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#d6e2f5]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#f5a623]" />
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
                  className="rounded-lg bg-[#0d1b33] p-6 md:p-8"
                >
                  {submitted ? (
                    <div className="py-12 text-center">
                      <CheckCircle2 className="mx-auto h-14 w-14 text-[#34c759]" />
                      <h3 className="mt-4 font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                        Đã tiếp nhận yêu cầu tư vấn
                      </h3>
                      <p className="mx-auto mt-2 max-w-[42ch] text-evo-body text-[#d6e2f5]">
                        Cảm ơn bạn. Đội ngũ kỹ sư giải pháp của Evovi sẽ liên hệ sớm nhất trong giờ làm việc để hẹn lịch trao đổi chi tiết.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-6 rounded-md bg-[#132747] px-4 py-2.5 text-evo-small font-semibold text-[#f5f8ff] transition-colors hover:bg-[#0b63e5]"
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
                            className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
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
                            className="w-full rounded-md bg-[#050b16] px-4 py-3 text-evo-body text-[#f5f8ff] placeholder:text-[#9eb2d0]/65 focus:ring-2 focus:ring-[#247eff] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="evo-company"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
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
                            className="w-full rounded-md bg-[#050b16] px-4 py-3 text-evo-body text-[#f5f8ff] placeholder:text-[#9eb2d0]/65 focus:ring-2 focus:ring-[#247eff] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="evo-email"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
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
                            className="w-full rounded-md bg-[#050b16] px-4 py-3 text-evo-body text-[#f5f8ff] placeholder:text-[#9eb2d0]/65 focus:ring-2 focus:ring-[#247eff] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="evo-phone"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
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
                            className="w-full rounded-md bg-[#050b16] px-4 py-3 text-evo-body text-[#f5f8ff] placeholder:text-[#9eb2d0]/65 focus:ring-2 focus:ring-[#247eff] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="evo-role"
                          className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
                        >
                          Vai trò của bạn
                        </label>
                        <select
                          id="evo-role"
                          required
                          name="role"
                          defaultValue=""
                          className="w-full rounded-md bg-[#050b16] px-4 py-3 text-evo-body text-[#f5f8ff] focus:ring-2 focus:ring-[#247eff] focus:outline-none"
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
                          className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
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
                          className="w-full resize-none rounded-md bg-[#050b16] px-4 py-3 text-evo-body text-[#f5f8ff] placeholder:text-[#9eb2d0]/65 focus:ring-2 focus:ring-[#247eff] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0b63e5] px-6 py-4 text-evo-body font-semibold text-white transition-colors hover:bg-[#247eff]"
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
          MONUMENTAL ENTERPRISE FOOTER (#030710)
         ========================================================= */}
      <footer className="overflow-hidden bg-[#030710] pt-16 pb-14 text-[#f5f8ff]">
        <div className="container-evo">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left 42%: Brand badge + direct high-scale links */}
            <div className="lg:col-span-5">
              <EvoviLogoIcon size="md" />
              <p className="mt-4 max-w-[38ch] text-evo-body text-[#d6e2f5]">
                Studio kỹ thuật phần mềm thiết kế riêng, nền tảng quản trị đa tổ chức và giải pháp AI vận hành thực chiến cho doanh nghiệp.
              </p>
              <div className="mt-6 space-y-1.5 font-display text-evo-h3 font-semibold">
                <div>
                  <a
                    href="mailto:kinhdoanh@evovi.vn"
                    className="text-[#5ca4ff] transition-colors hover:text-[#f5f8ff]"
                  >
                    kinhdoanh@evovi.vn
                  </a>
                </div>
                <div>
                  <a
                    href="tel:0868661235"
                    className="tabular-nums text-[#f5f8ff] transition-colors hover:text-[#5ca4ff]"
                  >
                    0868 661 235
                  </a>
                </div>
              </div>
            </div>

            {/* Right 58%: 3 clean columns of product & legal routes */}
            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
              <div>
                <h3 className="font-display text-evo-body font-semibold text-[#f5f8ff]">
                  Điều hướng
                </h3>
                <ul className="mt-4 space-y-2.5 text-evo-small text-[#9eb2d0]">
                  <li>
                    <a href="#solution" className="hover:text-[#f5f8ff]">
                      Giải pháp chuyển đổi
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-[#f5f8ff]">
                      Năng lực kỹ thuật
                    </a>
                  </li>
                  <li>
                    <a href="#ecosystem" className="hover:text-[#f5f8ff]">
                      9 Hệ thống Evovi
                    </a>
                  </li>
                  <li>
                    <a href="#process" className="hover:text-[#f5f8ff]">
                      Quy trình 6 bước
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-evo-body font-semibold text-[#f5f8ff]">
                  Sản phẩm công khai
                </h3>
                <ul className="mt-4 space-y-2.5 text-evo-small text-[#9eb2d0]">
                  <li>
                    <Link
                      to="/ad-canvas"
                      className="font-medium text-[#f5f8ff] hover:text-[#5ca4ff]"
                    >
                      Ad Canvas OOH ↗
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ad-canvas/support"
                      className="hover:text-[#f5f8ff]"
                    >
                      Trung tâm hỗ trợ Ad Canvas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy/ad-canvas"
                      className="hover:text-[#f5f8ff]"
                    >
                      Quyền riêng tư Ad Canvas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy/elevator-360"
                      className="hover:text-[#f5f8ff]"
                    >
                      Quyền riêng tư Elevator360
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="lg:text-right">
                <h3 className="font-display text-evo-body font-semibold text-[#f5f8ff]">
                  Hiện diện
                </h3>
                <ul className="mt-4 space-y-2.5 text-evo-small text-[#9eb2d0]">
                  <li className="text-[#f5f8ff]">Hà Nội · Việt Nam</li>
                  <li className="text-[#f5f8ff]">TP. Hồ Chí Minh · Việt Nam</li>
                  <li>Hỗ trợ kỹ thuật: support@evovi.vn</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Closing Monumental Wordmark at Bottom */}
          <div
            aria-hidden="true"
            className="mt-12 select-none font-display text-[clamp(4.5rem,17vw,14.5rem)] font-bold leading-[0.86] tracking-[-0.04em] text-[#607ba3]"
          >
            EVOVI
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 text-evo-small text-[#9eb2d0] sm:flex-row">
            <span>© {new Date().getFullYear()} Evovi. Bảo lưu mọi quyền.</span>
            <a href="#top" className="font-semibold text-[#f5f8ff] hover:text-[#5ca4ff]">
              Về đầu trang ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
