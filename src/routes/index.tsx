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
import { CopyContactChip } from "@/components/ui/CopyContactChip";
import { EditorialPhotoFrame } from "@/components/ui/EditorialPhotoFrame";
import {
  CAPABILITIES,
  DELIVERY_STEPS,
  EVOVI_PROJECTS,
  TRANSFORMATION_BEATS,
} from "@/data/evovi-projects";
import { buildHomeJsonLd, buildSeoHead } from "@/lib/seo";
import studioBlueprintImg from "@/assets/evovi-studio-blueprint.jpg";
import factoryOpsImg from "@/assets/evovi-factory-ops.jpg";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

const HOME_JSON_LD = buildHomeJsonLd(EVOVI_PROJECTS);

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

const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
]);

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

type FormFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
};

type FormErrors = Partial<Record<keyof FormFields | "need", string>>;

function isPersonalEmail(email: string): boolean {
  const parts = email.trim().toLowerCase().split("@");
  if (parts.length !== 2) return false;
  return PERSONAL_EMAIL_DOMAINS.has(parts[1]);
}

function EvoviLandingPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const heroScrollProgressRef = useRef<number>(0);
  const ribbonARef = useRef<HTMLDivElement | null>(null);
  const ribbonBRef = useRef<HTMLDivElement | null>(null);
  const scopeToastTimerRef = useRef<number | null>(null);
  const submitTimerRef = useRef<number | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [activeCapabilityIdx, setActiveCapabilityIdx] = useState(0);

  const [fields, setFields] = useState<FormFields>({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: "",
  });
  const [needText, setNeedText] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [scopeToast, setScopeToast] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [dismissedEmailWarn, setDismissedEmailWarn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      if (scopeToastTimerRef.current !== null) {
        window.clearTimeout(scopeToastTimerRef.current);
      }
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const handleSelectProjectScope = (preset: string, projectName?: string) => {
    setSelectedPreset(preset);
    const scopeLine = projectName
      ? `Quan tâm mô hình ${projectName} (${preset})`
      : `Phạm vi quan tâm: ${preset}`;

    setNeedText((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `${scopeLine}. `;
      const withoutOldPrefix = trimmed
        .replace(/^(Quan tâm mô hình [^\n.]+|Phạm vi quan tâm: [^\n.]+)\.\s*/i, "")
        .trim();
      return withoutOldPrefix
        ? `${scopeLine}. ${withoutOldPrefix}`
        : `${scopeLine}. `;
    });

    setErrors((prev) => ({ ...prev, need: undefined }));
    setScopeToast(projectName ? `Đã điền sẵn mô hình ${projectName}` : "Đã chèn phạm vi vào mô tả nhu cầu");
    if (scopeToastTimerRef.current !== null) {
      window.clearTimeout(scopeToastTimerRef.current);
    }
    scopeToastTimerRef.current = window.setTimeout(() => {
      setScopeToast(null);
    }, 3200);
  };

  const validateForm = (): FormErrors => {
    const next: FormErrors = {};
    if (fields.name.trim().length < 2) {
      next.name = "Vui lòng nhập họ và tên liên hệ.";
    }
    if (fields.company.trim().length < 2) {
      next.company = "Vui lòng nhập tên doanh nghiệp hoặc tổ chức.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
      next.email = "Email chưa đúng định dạng (ví dụ: ban@doanhnghiep.vn).";
    }
    const digits = fields.phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15) {
      next.phone = "Số điện thoại cần từ 9 đến 11 chữ số để kỹ sư liên hệ.";
    }
    if (!fields.role) {
      next.role = "Vui lòng chọn vai trò công việc của bạn.";
    }
    if (needText.trim().length < 8) {
      next.need = "Hãy mô tả ngắn điểm nghẽn hoặc bấm chọn nhanh một phạm vi bên trái.";
    }
    return next;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    submitTimerRef.current = window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 460);
  };

  const showPersonalEmailWarning =
    !errors.email &&
    !dismissedEmailWarn &&
    isPersonalEmail(fields.email);

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
        if (posB < -50) posB -= 50;

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
    { href: "#solution", label: "Chuyển đổi", chapter: 1 },
    { href: "#services", label: "Năng lực", chapter: 2 },
    { href: "#cases", label: "Tiêu biểu", chapter: 3 },
    { href: "#ecosystem", label: "9 Dự án Evovi", chapter: 3 },
    { href: "#process", label: "Quy trình", chapter: 4 },
  ];

  return (
    <div ref={rootRef} className="min-h-svh bg-[#050b16] text-[#d6e2f5]">
      {/* PERSISTENT GLASS ENTERPRISE HEADER + ACTIVE SECTION SIGNIFIER */}
      <header
        data-ui="site-header"
        className="evo-header-glass fixed inset-x-0 top-0 z-50 text-[#f5f8ff]"
      >
        <div className="container-evo flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <a href="#top" aria-label="Trang chủ Evovi" className="inline-flex items-center">
              <EvoviLogoIcon size="sm" />
            </a>
            <span className="hidden text-evo-small font-medium text-[#9eb2d0] xl:inline-block">
              {CHAPTER_LABELS[activeChapter]}
            </span>
          </div>

          <nav
            aria-label="Điều hướng chính"
            className="hidden items-center gap-1.5 text-evo-small font-medium lg:flex"
          >
            {navItems.map((item) => {
              const isCurrent =
                activeChapter === item.chapter && item.href !== "#ecosystem";
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 transition-colors ${
                    isCurrent
                      ? "bg-[#132747]/85 text-[#f5f8ff]"
                      : "text-[#9eb2d0] hover:bg-[#0d1b33] hover:text-[#f5f8ff]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a href="#contact" className="evo-btn-primary evo-btn-sm">
              <span>Nhận tư vấn</span>
              <span className="hidden sm:inline">kỹ thuật</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="evo-btn-ghost inline-flex h-10 w-10 items-center justify-center rounded-md p-0 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Continuous Tri-Spectrum Scroll Progress Thread */}
        <div className="h-[3px] w-full bg-[#0d1b33]/75">
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
            <div className="flex flex-col gap-3 text-evo-body font-medium text-[#f5f8ff]">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-2 py-1.5 text-[#f5f8ff] hover:bg-[#132747]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="evo-btn-primary mt-2 w-full"
              >
                <span>Đặt lịch tư vấn giải pháp</span>
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
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
          className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[#050b16] pt-24 pb-10 text-[#f5f8ff] md:pt-28 md:pb-14"
        >
          <HeroTriSpectrumCanvas scrollProgressRef={heroScrollProgressRef} />

          {/* Upper masthead coordinate bar */}
          <div className="container-evo relative z-10">
            <div className="grid gap-3 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5" data-hero-fade>
                <span
                  data-ui="hero-pill"
                  className="evo-surface-card inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-evo-small font-medium text-[#f5f8ff]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#6ee7b7]" />
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
              {/* Left of 42% axis: Lead Subtext + 2:1 Primary & Ghost Secondary CTA Row */}
              <div className="order-2 lg:order-1 lg:col-span-5" data-hero-fade>
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Evovi thiết kế và xây dựng phần mềm khớp trọn vẹn quy trình doanh nghiệp bạn vận hành, từ cổng quản trị Web đến ứng dụng hiện trường và tác nhân AI.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#contact" className="evo-btn-primary evo-btn-lg">
                    <span>Nhận tư vấn giải pháp</span>
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </a>
                  <a href="#ecosystem" className="evo-btn-ghost evo-btn-lg">
                    <span>Xem 9 hệ thống thực tế</span>
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

                {/* Executive programme metrics strip with dark surface specular rim */}
                <div
                  data-hero-fade
                  data-ui="hero-metrics"
                  className="evo-surface-card mt-8 grid grid-cols-3 gap-4 rounded-xl p-4 sm:gap-6 sm:p-5"
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
                    <div className="font-display text-evo-h3 font-bold text-[#6ee7b7] tabular-nums">
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
            {/* Pillar 2 & 3: H2 leads on mobile, 16px mobile proximity */}
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="order-2 lg:order-1 lg:col-span-5" data-section-sub>
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Đa số doanh nghiệp chậm lại không phải vì đội ngũ thiếu nỗ lực, mà vì công cụ hiện tại rời rạc so với tốc độ phát triển thực tế.
                </p>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <h2
                  data-section-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Gỡ điểm nghẽn, nối liền vận hành
                </h2>
              </div>
            </div>

            <div className="mt-12 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-start">
              {/* Left 42%: Semantic Interactive Buttons along scrubbed vertical conduit */}
              <div data-act2-list className="relative pl-6 lg:col-span-5">
                <div className="absolute top-2 bottom-2 left-0 w-[3px] bg-[#132747]">
                  <div
                    data-act2-conduit
                    className="h-full w-full bg-[#247eff] will-change-transform"
                  />
                </div>

                <div className="space-y-3" role="tablist" aria-label="Điểm nghẽn vận hành">
                  {TRANSFORMATION_BEATS.map((beat, idx) => {
                    const active = idx === activeBeatIndex;
                    return (
                      <button
                        key={beat.painTitle}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        data-beat-item
                        data-ui="beat-trigger"
                        onClick={() => setActiveBeatIndex(idx)}
                        className={`group block w-full cursor-pointer rounded-xl text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5ca4ff] ${
                          active
                            ? "evo-surface-card p-5 md:p-6"
                            : "bg-transparent px-4 py-3.5 hover:bg-[#0d1b33]/55"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                            {beat.painTitle}
                          </h3>
                          <ChevronRight
                            aria-hidden="true"
                            className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-200 ${
                              active
                                ? "translate-x-0.5 text-[#5ca4ff]"
                                : "text-[#9eb2d0] group-hover:translate-x-0.5"
                            }`}
                          />
                        </div>

                        <p className="mt-2 text-evo-body text-[#d6e2f5]">
                          {beat.painDesc}
                        </p>

                        {/* Anti-Spreadsheet Relational Flow Outcome */}
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-evo-small font-semibold tabular-nums">
                          <span className="text-[#fcd34d]">{beat.metricBefore}</span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-[#5ca4ff]" aria-hidden="true" />
                          <span className="text-[#6ee7b7]">{beat.metricAfter}</span>
                        </div>
                      </button>
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
            <div data-manifesto-block className="grid gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5" data-section-sub>
                <p className="max-w-[36ch] text-evo-body text-[#d6e2f5]">
                  Phương pháp luận kỹ thuật Spec-Driven thống nhất đứng sau toàn bộ sản phẩm của Evovi.
                </p>
              </div>
              <div className="lg:col-span-7">
                <blockquote className="font-display text-[clamp(1.25rem,1.95vw,1.8rem)] font-semibold leading-[1.42] tracking-[-0.018em] text-[#f5f8ff]">
                  {MANIFESTO_PHRASES.map((phrase, idx) => (
                    <span key={idx} data-ink-phrase className="mr-2 inline">
                      {phrase}
                    </span>
                  ))}
                </blockquote>
              </div>
            </div>

            {/* Executive 4-Cell Dark Architectural Mosaic (Pillar 5, 6 & 11) */}
            <div
              data-mosaic-grid
              data-ui="architectural-mosaic"
              className="mt-14 grid gap-3 overflow-hidden rounded-xl bg-[#081224] p-3 md:mt-16 lg:grid-cols-12"
            >
              {/* Cell 1: Studio Architecture Photograph with Progressive Blur Caption (7 cols) */}
              <div
                data-mosaic-cell
                className="min-h-[280px] overflow-hidden rounded-lg lg:col-span-7"
              >
                <EditorialPhotoFrame
                  src={studioBlueprintImg}
                  alt="Bàn thiết kế kiến trúc mô-đun phần mềm tại studio kỹ thuật Evovi"
                  width={1440}
                  height={810}
                  tag="Studio Kỹ thuật Spec-Driven"
                  caption="Chuẩn hóa sơ đồ luồng nghiệp vụ và phân quyền trước khi viết mã"
                  aspectClassName="aspect-[16/10]"
                  imgDataAttr="mosaic"
                />
              </div>

              {/* Cell 2: Brand-Tinted Dark Surface instead of glaring solid blue block (5 cols) */}
              <div
                data-mosaic-cell
                className="evo-mosaic-brand flex flex-col justify-between rounded-lg p-8 text-[#f5f8ff] md:p-10 lg:col-span-5"
              >
                <div>
                  <span className="evo-chip-info text-evo-small font-semibold">
                    Cam kết chuẩn đầu vào
                  </span>
                  <div className="mt-4 font-display text-evo-hero font-bold text-[#93c5fd] tabular-nums">
                    100%
                  </div>
                </div>
                <p className="mt-8 max-w-[36ch] text-evo-body text-[#d6e2f5]">
                  Dự án khởi đầu bằng tài liệu đặc tả nghiệp vụ sống và ma trận phân quyền rõ ràng để đội vận hành và kỹ sư nói chung một ngôn ngữ.
                </p>
              </div>

              {/* Cell 3: Elevated Slate-Navy Block (5 cols) */}
              <div
                data-mosaic-cell
                className="evo-surface-card flex flex-col justify-between rounded-lg p-8 text-[#f5f8ff] md:p-10 lg:col-span-5"
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
                className="evo-surface-card flex flex-col justify-between rounded-lg bg-[#10213d] p-8 text-[#f5f8ff] md:p-10 lg:col-span-7"
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

            {/* 6 Core Capabilities on 42% Axis: Semantic Buttons + Deliverable Chips */}
            <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:sticky lg:top-24 lg:col-span-5">
                <h2
                  data-section-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Đồng hành trọn vòng đời hệ thống
                </h2>
                <p className="mt-4 max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Chọn từng năng lực để xem gói sản phẩm bàn giao kỹ thuật cụ thể mà đội ngũ Evovi thiết lập cho doanh nghiệp.
                </p>

                <div className="mt-8 overflow-hidden rounded-xl bg-[#081224]">
                  <EditorialPhotoFrame
                    src={factoryOpsImg}
                    alt="Kỹ sư điều hành giám sát hệ thống vận hành số hóa trên máy tính bảng tại doanh nghiệp"
                    width={1080}
                    height={1440}
                    tag="Triển khai đa thiết bị"
                    caption="Vận hành ổn định từ phòng điều hành trung tâm tới hiện trường"
                    aspectClassName="aspect-[4/3]"
                    imgDataAttr="cap"
                  />
                </div>
              </div>

              <div
                className="space-y-3 lg:col-span-7"
                role="tablist"
                aria-label="Sáu năng lực kỹ thuật cốt lõi"
              >
                {CAPABILITIES.map((cap, idx) => {
                  const isSelected = idx === activeCapabilityIdx;
                  const artifacts = cap.deliverable.split(" · ");
                  return (
                    <button
                      key={cap.title}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      data-cap-item
                      data-ui="capability-card"
                      onMouseEnter={() => setActiveCapabilityIdx(idx)}
                      onClick={() => setActiveCapabilityIdx(idx)}
                      className={`group block w-full cursor-pointer rounded-r-xl border-l-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5ca4ff] ${
                        isSelected
                          ? "evo-surface-card border-l-[#247eff] p-6 text-[#f5f8ff] md:p-7"
                          : "border-l-[#132747] bg-transparent py-4 pr-4 pl-6 text-[#f5f8ff] hover:border-l-[#5ca4ff] hover:bg-[#0d1b33]/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-evo-h3 font-semibold">
                          {cap.title}
                        </h3>
                        <ChevronRight
                          aria-hidden="true"
                          className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-200 ${
                            isSelected
                              ? "translate-x-0.5 text-[#5ca4ff]"
                              : "text-[#9eb2d0] group-hover:translate-x-0.5"
                          }`}
                        />
                      </div>

                      <p className="mt-2 max-w-[60ch] text-evo-body text-[#d6e2f5]">
                        {cap.summary}
                      </p>

                      {/* Pillar 2: Discrete Tonal Deliverable Chips instead of raw "Bàn giao: X · Y · Z" string */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {artifacts.map((artifact) => (
                          <span
                            key={artifact}
                            className={`rounded-full px-3 py-1 text-evo-small font-semibold ${
                              isSelected
                                ? "evo-chip-success"
                                : "bg-[#0d1b33] text-[#9eb2d0]"
                            }`}
                          >
                            {artifact}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            VELOCITY-DRIVEN COUNTER-SCROLLING DARK ENTERPRISE RIBBONS
           ========================================================= */}
        <div aria-hidden="true" className="bg-[#081224] py-6 select-none">
          <div className="container-evo space-y-2.5">
            <div className="evo-ribbon-fade overflow-hidden rounded-lg bg-[#0d1b33] py-3.5 text-[#f5f8ff]">
              <div ref={ribbonARef} className="evo-ribbon-track">
                {[...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A, ...RIBBON_ITEMS_A].map(
                  (entry, i) => (
                    <span
                      key={i}
                      className="mx-6 font-display text-evo-h3 font-semibold"
                    >
                      {entry} <span className="ml-6 font-bold text-[#5ca4ff]">/</span>
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="evo-ribbon-fade overflow-hidden rounded-lg bg-[#050b16] py-3.5 text-[#d6e2f5]">
              <div ref={ribbonBRef} className="evo-ribbon-track">
                {[...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B, ...RIBBON_ITEMS_B].map(
                  (entry, i) => (
                    <span
                      key={i}
                      className="mx-6 font-display text-evo-h3 font-semibold"
                    >
                      {entry} <span className="ml-6 font-bold text-[#6ee7b7]">/</span>
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
            {/* Pillar 2 & 3: H2 leads first on Mobile, 16px mobile proximity */}
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="order-2 lg:order-1 lg:col-span-5" data-section-sub>
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Mỗi chặng đều có đầu ra kiểm chứng được: rõ phạm vi, rõ thời gian và không phát sinh chi phí mập mờ.
                </p>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <h2
                  data-section-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Sáu chặng triển khai rõ đầu ra
                </h2>
              </div>
            </div>

            <div className="mt-12 grid md:mt-14 lg:grid-cols-12">
              <div className="hidden lg:col-span-5 lg:block" />
              <div data-process-track className="relative pl-8 lg:col-span-7">
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#132747]">
                  <div
                    data-process-conduit
                    className="h-full w-full bg-[#247eff] will-change-transform"
                  />
                </div>

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
            ACT VI: CONSULTATION SCOPER & 4-STATE VALIDATED LEAD FORM
           ========================================================= */}
        <section
          id="contact"
          data-chapter="5"
          className="relative overflow-hidden bg-[#050b16] py-20 text-[#f5f8ff] md:py-28"
        >
          <HorizonSignalCanvas />

          <div className="container-evo relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left 42%: Statement + Quick Scope Selector + Copyable Contact Coordinates */}
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

                {/* Interactive Quick-Scope Chips (Appends safely + Outcome Toast) */}
                <div className="mt-8">
                  <p className="text-evo-small font-semibold text-[#9eb2d0]">
                    Chọn nhanh phạm vi để điền sẵn vào biểu mẫu:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SCOPE_PRESETS.map((preset) => {
                      const active = selectedPreset === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectProjectScope(preset)}
                          className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-3.5 py-2 text-left text-evo-small font-semibold transition-colors active:scale-[0.98] ${
                            active
                              ? "bg-[#0b63e5] text-white"
                              : "evo-surface-card text-[#d6e2f5] hover:bg-[#132747] hover:text-[#f5f8ff]"
                          }`}
                        >
                          {active && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                          <span>{preset}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct studio contact coordinates with 20px icons & Copy Confirmation Chips (Pillar 8 & 10) */}
                <div
                  data-ui="contact-card"
                  className="evo-surface-card mt-8 space-y-4 rounded-xl p-6 text-evo-body"
                >
                  <CopyContactChip
                    icon={<Mail className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />}
                    href="mailto:kinhdoanh@evovi.vn"
                    displayValue="kinhdoanh@evovi.vn"
                    copyValue="kinhdoanh@evovi.vn"
                  />
                  <CopyContactChip
                    icon={<Phone className="h-5 w-5 shrink-0 text-[#6ee7b7]" aria-hidden="true" />}
                    href="tel:0868661235"
                    displayValue="0868 661 235"
                    copyValue="0868661235"
                    note="24/7"
                  />
                  <div className="flex items-center gap-2.5 text-[#d6e2f5]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#fcd34d]" aria-hidden="true" />
                    <span>Hà Nội · TP. Hồ Chí Minh</span>
                  </div>
                </div>
              </div>

              {/* Right 58%: 4-State Validated Consultation Form + 5-State Submit */}
              <div className="lg:col-span-7">
                <form
                  noValidate
                  onSubmit={handleFormSubmit}
                  data-ui="consultation-form"
                  className="evo-surface-card rounded-xl p-6 md:p-8"
                >
                  {submitted ? (
                    <div className="evo-panel-enter py-12 text-center" role="status" aria-live="polite">
                      <CheckCircle2 className="mx-auto h-14 w-14 text-[#6ee7b7]" />
                      <h3 className="mt-4 font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                        Đã tiếp nhận yêu cầu tư vấn
                      </h3>
                      <p className="mx-auto mt-2 max-w-[42ch] text-evo-body text-[#d6e2f5]">
                        Cảm ơn {fields.name.trim() || "bạn"}. Đội ngũ kỹ sư giải pháp của Evovi sẽ phản hồi qua{" "}
                        <strong className="font-semibold text-[#f5f8ff]">{fields.email.trim()}</strong>{" "}
                        sớm nhất trong giờ làm việc để hẹn lịch trao đổi 1-1.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setNeedText("");
                          setSelectedPreset("");
                        }}
                        className="evo-btn-ghost mt-6"
                      >
                        Gửi thêm yêu cầu khác
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Name Field */}
                        <div className="evo-field" data-state={errors.name ? "error" : "default"}>
                          <label
                            htmlFor="evo-name"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
                          >
                            Họ và tên
                          </label>
                          <input
                            id="evo-name"
                            type="text"
                            name="name"
                            value={fields.name}
                            onChange={(e) => {
                              const v = e.target.value;
                              setFields((f) => ({ ...f, name: v }));
                              if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                            }}
                            placeholder="Nguyễn Minh Hoàng"
                            maxLength={255}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "err-evo-name" : undefined}
                            className="evo-field-control"
                          />
                          {errors.name && (
                            <p id="err-evo-name" className="mt-1.5 flex items-center gap-1.5 text-evo-small text-[#fca5a5]">
                              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>{errors.name}</span>
                            </p>
                          )}
                        </div>

                        {/* Company Field */}
                        <div className="evo-field" data-state={errors.company ? "error" : "default"}>
                          <label
                            htmlFor="evo-company"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
                          >
                            Tên doanh nghiệp / tổ chức
                          </label>
                          <input
                            id="evo-company"
                            type="text"
                            name="company"
                            value={fields.company}
                            onChange={(e) => {
                              const v = e.target.value;
                              setFields((f) => ({ ...f, company: v }));
                              if (errors.company) setErrors((er) => ({ ...er, company: undefined }));
                            }}
                            placeholder="Công ty Cổ phần Vận tải & Truyền thông Việt"
                            maxLength={255}
                            aria-invalid={Boolean(errors.company)}
                            aria-describedby={errors.company ? "err-evo-company" : undefined}
                            className="evo-field-control"
                          />
                          {errors.company && (
                            <p id="err-evo-company" className="mt-1.5 flex items-center gap-1.5 text-evo-small text-[#fca5a5]">
                              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>{errors.company}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Email Field (Default | Focus | Error | Actionable Warning) */}
                        <div
                          className="evo-field"
                          data-state={
                            errors.email
                              ? "error"
                              : showPersonalEmailWarning
                                ? "warning"
                                : "default"
                          }
                        >
                          <label
                            htmlFor="evo-email"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
                          >
                            Email công việc
                          </label>
                          <input
                            id="evo-email"
                            type="email"
                            name="email"
                            value={fields.email}
                            onChange={(e) => {
                              const v = e.target.value;
                              setFields((f) => ({ ...f, email: v }));
                              setDismissedEmailWarn(false);
                              if (errors.email) setErrors((er) => ({ ...er, email: undefined }));
                            }}
                            placeholder="hoang.nm@doanhnghiep.vn"
                            maxLength={255}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                              errors.email
                                ? "msg-evo-email"
                                : showPersonalEmailWarning
                                  ? "msg-evo-email"
                                  : undefined
                            }
                            className="evo-field-control"
                          />
                          {errors.email && (
                            <p id="msg-evo-email" className="mt-1.5 flex items-center gap-1.5 text-evo-small text-[#fca5a5]">
                              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>{errors.email}</span>
                            </p>
                          )}
                          {showPersonalEmailWarning && (
                            <p id="msg-evo-email" className="mt-1.5 flex items-start gap-1.5 text-evo-small text-[#fcd34d]">
                              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>
                                Gợi ý dùng email tên miền công ty để ưu tiên phân luồng.{" "}
                                <button
                                  type="button"
                                  onClick={() => setDismissedEmailWarn(true)}
                                  className="cursor-pointer font-semibold underline"
                                >
                                  Vẫn giữ email này
                                </button>
                              </span>
                            </p>
                          )}
                        </div>

                        {/* Phone Field */}
                        <div className="evo-field" data-state={errors.phone ? "error" : "default"}>
                          <label
                            htmlFor="evo-phone"
                            className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
                          >
                            Số điện thoại liên hệ
                          </label>
                          <input
                            id="evo-phone"
                            type="tel"
                            name="phone"
                            value={fields.phone}
                            onChange={(e) => {
                              const v = e.target.value;
                              setFields((f) => ({ ...f, phone: v }));
                              if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                            }}
                            placeholder="0909 246 810"
                            maxLength={30}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? "err-evo-phone" : undefined}
                            className="evo-field-control tabular-nums"
                          />
                          {errors.phone && (
                            <p id="err-evo-phone" className="mt-1.5 flex items-center gap-1.5 text-evo-small text-[#fca5a5]">
                              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>{errors.phone}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Role Select with Custom Chevron Signifier */}
                      <div className="evo-field" data-state={errors.role ? "error" : "default"}>
                        <label
                          htmlFor="evo-role"
                          className="mb-1.5 block text-evo-small font-semibold text-[#f5f8ff]"
                        >
                          Vai trò của bạn
                        </label>
                        <div className="relative">
                          <select
                            id="evo-role"
                            name="role"
                            value={fields.role}
                            onChange={(e) => {
                              const v = e.target.value;
                              setFields((f) => ({ ...f, role: v }));
                              if (errors.role) setErrors((er) => ({ ...er, role: undefined }));
                            }}
                            aria-invalid={Boolean(errors.role)}
                            aria-describedby={errors.role ? "err-evo-role" : undefined}
                            className={`evo-field-control appearance-none pr-11 ${
                              fields.role ? "text-[#f5f8ff]" : "text-[#9eb2d0]"
                            }`}
                          >
                            <option value="" disabled className="bg-[#081224] text-[#9eb2d0]">
                              Chọn vai trò công việc
                            </option>
                            <option value="ceo" className="bg-[#081224] text-[#f5f8ff]">
                              CEO / Chủ doanh nghiệp / Founder
                            </option>
                            <option value="cto" className="bg-[#081224] text-[#f5f8ff]">
                              CTO / Giám đốc Công nghệ
                            </option>
                            <option value="ops" className="bg-[#081224] text-[#f5f8ff]">
                              Giám đốc Vận hành / Trưởng bộ phận
                            </option>
                            <option value="product" className="bg-[#081224] text-[#f5f8ff]">
                              Quản lý Sản phẩm / Dự án
                            </option>
                            <option value="other" className="bg-[#081224] text-[#f5f8ff]">
                              Vai trò khác
                            </option>
                          </select>
                          <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute top-1/2 right-3.5 h-5 w-5 -translate-y-1/2 text-[#9eb2d0]"
                          />
                        </div>
                        {errors.role && (
                          <p id="err-evo-role" className="mt-1.5 flex items-center gap-1.5 text-evo-small text-[#fca5a5]">
                            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>{errors.role}</span>
                          </p>
                        )}
                      </div>

                      {/* Need Textarea + Scope Insertion Outcome Chip */}
                      <div className="evo-field" data-state={errors.need ? "error" : "default"}>
                        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                          <label
                            htmlFor="evo-need"
                            className="text-evo-small font-semibold text-[#f5f8ff]"
                          >
                            Mô tả ngắn nhu cầu hoặc điểm nghẽn hiện tại
                          </label>
                          {scopeToast && (
                            <span
                              role="status"
                              aria-live="polite"
                              className="evo-panel-enter evo-chip-success text-evo-small font-semibold"
                            >
                              <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              <span>{scopeToast}</span>
                            </span>
                          )}
                        </div>
                        <textarea
                          id="evo-need"
                          rows={4}
                          name="need"
                          value={needText}
                          onChange={(e) => {
                            setNeedText(e.target.value);
                            if (errors.need) setErrors((er) => ({ ...er, need: undefined }));
                          }}
                          maxLength={1200}
                          aria-invalid={Boolean(errors.need)}
                          aria-describedby={errors.need ? "err-evo-need" : undefined}
                          placeholder="Ví dụ: cần quản lý tồn kho quảng cáo OOH, xây dựng LMS đào tạo nội bộ đa chi nhánh, hoặc làm app kỹ thuật viên hiện trường..."
                          className="evo-field-control resize-none"
                        />
                        {errors.need && (
                          <p id="err-evo-need" className="mt-1.5 flex items-center gap-1.5 text-evo-small text-[#fca5a5]">
                            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>{errors.need}</span>
                          </p>
                        )}
                      </div>

                      {/* 5-State Primary Submit Button (Default, Hover, Pressed, Disabled, Loading) */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        data-loading={isSubmitting ? "true" : "false"}
                        className="evo-btn-primary evo-btn-lg w-full text-evo-body disabled:opacity-45"
                      >
                        <span>
                          {isSubmitting
                            ? "Đang tiếp nhận yêu cầu..."
                            : "Gửi thông tin để nhận lịch tư vấn 1-1"}
                        </span>
                        {isSubmitting ? (
                          <span className="evo-btn-spinner" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                        )}
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
            {/* Left 42%: Brand badge + copyable contact coordinates */}
            <div className="lg:col-span-5">
              <EvoviLogoIcon size="md" />
              <p className="mt-4 max-w-[38ch] text-evo-body text-[#d6e2f5]">
                Studio kỹ thuật phần mềm thiết kế riêng, nền tảng quản trị đa tổ chức và giải pháp AI vận hành thực chiến cho doanh nghiệp.
              </p>
              <div className="mt-6 space-y-3 text-evo-body">
                <CopyContactChip
                  icon={<Mail className="h-5 w-5 shrink-0 text-[#5ca4ff]" aria-hidden="true" />}
                  href="mailto:kinhdoanh@evovi.vn"
                  displayValue="kinhdoanh@evovi.vn"
                  copyValue="kinhdoanh@evovi.vn"
                />
                <CopyContactChip
                  icon={<Phone className="h-5 w-5 shrink-0 text-[#6ee7b7]" aria-hidden="true" />}
                  href="tel:0868661235"
                  displayValue="0868 661 235"
                  copyValue="0868661235"
                />
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
                  <li>
                    <a
                      href="mailto:support@evovi.vn"
                      className="hover:text-[#f5f8ff]"
                    >
                      support@evovi.vn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

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
