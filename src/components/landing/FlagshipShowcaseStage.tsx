import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import {
  EVOVI_PROJECTS,
  FLAGSHIP_SLIDES,
  PROJECT_VERTICALS,
  type ProjectVerticalId,
} from "@/data/evovi-projects";
import { EditorialPhotoFrame } from "@/components/ui/EditorialPhotoFrame";
import oohCityImg from "@/assets/evovi-ooh-city.jpg";
import elevatorArchImg from "@/assets/evovi-elevator-arch.jpg";
import studioBlueprintImg from "@/assets/evovi-studio-blueprint.jpg";
import factoryOpsImg from "@/assets/evovi-factory-ops.jpg";

const PHOTO_MAP = {
  ooh: {
    src: oohCityImg,
    width: 1600,
    height: 900,
    tag: "Ad Canvas · Evo AdTracker",
  },
  elevator: {
    src: elevatorArchImg,
    width: 1080,
    height: 1440,
    tag: "Elevator360 · ERP Công trình",
  },
  studio: {
    src: studioBlueprintImg,
    width: 1440,
    height: 810,
    tag: "Evo Books · Xuất bản số & AI",
  },
  factory: {
    src: factoryOpsImg,
    width: 1080,
    height: 1440,
    tag: "Enterprise LMS · EvoHub AI",
  },
} as const;

type FlagshipShowcaseProps = {
  onSelectProjectScope: (preset: string, projectName?: string) => void;
};

export function FlagshipShowcaseStage({
  onSelectProjectScope,
}: FlagshipShowcaseProps) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [activeVertical, setActiveVertical] = useState<ProjectVerticalId>("all");

  const currentSlide = FLAGSHIP_SLIDES[activeSlideIdx] ?? FLAGSHIP_SLIDES[0];
  const currentPhoto = PHOTO_MAP[currentSlide.photoKey];

  const filteredProjects =
    activeVertical === "all"
      ? EVOVI_PROJECTS
      : EVOVI_PROJECTS.filter((p) => p.vertical === activeVertical);

  return (
    <>
      {/* PART A: EXECUTIVE FLAGSHIP CONSOLE STAGE */}
      <section
        id="cases"
        className="bg-[#050b16] py-20 text-[#f5f8ff] md:py-28"
      >
        <div className="container-evo">
          {/* Pillar 2 & 3: H2 leads first on Mobile, 42%-axis split on Desktop, 16px mobile proximity */}
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="order-2 lg:order-1 lg:col-span-5" data-section-sub>
              <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                Không dừng ở bản vẽ ý tưởng. Dưới đây là các hệ thống phần mềm, nền tảng học tập, ERP công trình và tác nhân AI do đội ngũ Evovi trực tiếp kiến trúc trên 39 kho mã nguồn chuyên biệt.
              </p>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <h2
                data-section-heading
                className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
              >
                Chín hệ thống đang chạy thực tế
              </h2>
            </div>
          </div>

          {/* Pillar 11: Dual-Photo Architectural Band with Progressive Blur + Gradient Scrim Captions */}
          <div
            data-expand-window
            className="mt-12 grid gap-3 overflow-hidden rounded-xl bg-[#081224] p-3 md:mt-14 lg:grid-cols-12"
          >
            <div className="overflow-hidden rounded-lg lg:col-span-8">
              <EditorialPhotoFrame
                src={oohCityImg}
                alt="Màn hình LED quảng cáo ngoài trời OOH tại trung tâm TP. Hồ Chí Minh do nền tảng Ad Canvas và Evo AdTracker của Evovi quản lý vận hành"
                width={1600}
                height={900}
                tag="OOH & Đội xe hiện trường"
                caption="Điều phối vị trí LED đô thị, lịch booking và ảnh nghiệm thu trực tiếp"
                aspectClassName="aspect-[16/10]"
                imgDataAttr="expand"
              />
            </div>
            <div className="overflow-hidden rounded-lg lg:col-span-4">
              <EditorialPhotoFrame
                src={elevatorArchImg}
                alt="Hệ thống thang máy lồng kính tại tòa nhà cao tầng được quản lý lắp đặt và bảo trì trên nền tảng Elevator360 của Evovi"
                width={1080}
                height={1440}
                tag="ERP Kỹ thuật công trình"
                caption="Quản trị vòng đời lắp đặt & bảo trì định kỳ đa tòa nhà"
                aspectClassName="aspect-[4/5]"
                imgDataAttr="expand"
              />
            </div>
          </div>

          {/* Interactive 4-Flagship Split Stage */}
          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left 42% Index: Semantic Tab Buttons with Clear Chevron Signifier */}
            <div className="lg:col-span-5">
              <p className="text-evo-body font-medium text-[#d6e2f5]">
                Chọn cụm sản phẩm chủ lực để xem luồng vận hành trực tiếp:
              </p>
              <div
                className="mt-5 space-y-2"
                role="tablist"
                aria-label="Cụm sản phẩm chủ lực"
              >
                {FLAGSHIP_SLIDES.map((slide, idx) => {
                  const isSelected = idx === activeSlideIdx;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveSlideIdx(idx)}
                      className={`group flex w-full cursor-pointer items-center justify-between gap-4 rounded-r-lg border-l-4 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5ca4ff] ${
                        isSelected
                          ? "evo-surface-card border-l-[#247eff] text-[#f5f8ff]"
                          : "border-l-[#132747] bg-transparent text-[#9eb2d0] hover:border-l-[#5ca4ff] hover:bg-[#0d1b33]/45 hover:text-[#f5f8ff]"
                      }`}
                    >
                      <div>
                        <div className="font-display text-evo-h3 font-semibold">
                          {slide.title}
                        </div>
                        <div className="mt-1 text-evo-small text-[#9eb2d0]">
                          {slide.domain}
                        </div>
                      </div>
                      <ChevronRight
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                          isSelected
                            ? "translate-x-1 text-[#5ca4ff]"
                            : "text-[#9eb2d0] group-hover:translate-x-1"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div
                key={`summary-${currentSlide.id}`}
                data-ui="flagship-summary"
                className="evo-panel-enter evo-surface-card mt-6 rounded-xl p-6"
              >
                <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                  {currentSlide.headline}
                </h3>
                <p className="mt-3 max-w-[44ch] text-evo-body text-[#d6e2f5]">
                  {currentSlide.summary}
                </p>

                {currentSlide.routeHref && currentSlide.routeLabel && (
                  <div className="mt-6">
                    <Link
                      to={currentSlide.routeHref}
                      className="evo-btn-primary"
                    >
                      <span>{currentSlide.routeLabel}</span>
                      <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right 58% Live Product Telemetry with Progressive Blur Photo + Flipped Tonal Chips */}
            <div className="lg:col-span-7">
              <div
                key={`telemetry-${currentSlide.id}`}
                data-ui="flagship-telemetry-card"
                className="evo-panel-enter evo-surface-card overflow-hidden rounded-xl"
              >
                <EditorialPhotoFrame
                  src={currentPhoto.src}
                  alt={currentSlide.photoCaption}
                  width={currentPhoto.width}
                  height={currentPhoto.height}
                  tag={currentPhoto.tag}
                  caption={currentSlide.photoCaption}
                  aspectClassName="aspect-[16/9]"
                />

                <div data-ui="flagship-telemetry" className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-evo-small font-semibold text-[#f5f8ff]">
                      {currentSlide.livePanelTitle}
                    </span>
                    <span className="evo-chip-success text-evo-small font-semibold tabular-nums">
                      <span className="h-2 w-2 rounded-full bg-[#6ee7b7]" />
                      {currentSlide.liveStatus}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {currentSlide.liveRows.map((row) => (
                      <div
                        key={row.label}
                        className="evo-surface-well flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-3.5"
                      >
                        <div>
                          <div className="text-evo-body font-semibold text-[#f5f8ff]">
                            {row.label}
                          </div>
                          <div className="mt-0.5 text-evo-small text-[#9eb2d0]">
                            {row.meta}
                          </div>
                        </div>
                        <span
                          className={`text-evo-small font-semibold ${
                            row.tone === "emerald"
                              ? "evo-chip-success"
                              : row.tone === "orange"
                                ? "evo-chip-warning"
                                : "evo-chip-info"
                          }`}
                        >
                          {row.state}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4 pt-1">
                    {currentSlide.kpis.map((kpi) => (
                      <div key={kpi.label} className="border-l-4 border-[#247eff] pl-3">
                        <div className="text-evo-body font-bold text-[#f5f8ff] tabular-nums">
                          {kpi.value}
                        </div>
                        <div className="mt-0.5 text-evo-small text-[#9eb2d0]">
                          {kpi.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART B: COMPLETE 9-SYSTEM EVOVI-VN DIRECTORY (ANTI-SPREADSHEET HIERARCHY) */}
      <section
        id="ecosystem"
        className="bg-[#081224] pt-20 text-[#f5f8ff] md:pt-28"
      >
        <div className="container-evo pb-12">
          {/* Pillar 2 & 3: H2 leads first on Mobile, 16px mobile proximity */}
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="order-2 lg:order-1 lg:col-span-5" data-section-sub>
              <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                Lọc theo lĩnh vực để xem bối cảnh thực tế, kiến trúc kỹ thuật và chỉ số quy mô của toàn bộ 9 dòng sản phẩm thuộc tổ chức GitHub Evovi.
              </p>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <h2
                data-section-heading
                className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
              >
                Toàn bộ danh mục dự án Evovi
              </h2>
            </div>
          </div>

          {/* Pillar 1: Common-Region Segmented Filter Track */}
          <div
            className="evo-segmented-track mt-8 md:mt-10"
            role="tablist"
            aria-label="Lọc dự án theo lĩnh vực"
          >
            {PROJECT_VERTICALS.map((v) => {
              const active = activeVertical === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-active={active ? "true" : "false"}
                  onClick={() => setActiveVertical(v.id)}
                  className="evo-segmented-tab disabled:opacity-45"
                >
                  <span>{v.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-evo-small font-bold tabular-nums ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[#0d1b33] text-[#9eb2d0]"
                    }`}
                  >
                    {v.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-bleed Alternating Deep Navy Bands with Anti-Spreadsheet Flow Hierarchy (Pillar 2) */}
        <div>
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className={`w-full py-12 md:py-16 ${
                idx % 2 === 0 ? "bg-[#050b16]" : "bg-[#081224]"
              }`}
            >
              <div
                data-project-row
                className="container-evo grid gap-8 lg:grid-cols-12"
              >
                {/* Left of 42% axis (5 cols): Product Identity, Tonal Domain Badge & Tech Stack */}
                <div className="flex flex-col justify-between gap-6 lg:col-span-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="evo-chip-info text-evo-small font-semibold">
                        {project.verticalLabel}
                      </span>
                      <span className="text-evo-small font-semibold tabular-nums text-[#9eb2d0]">
                        {project.repoClusterCount} kho mã chuyên biệt
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                      {project.name}
                    </h3>
                    <p className="mt-2 max-w-[38ch] text-evo-body text-[#d6e2f5]">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-[#0d1b33] px-3 py-1 text-evo-small font-medium text-[#d6e2f5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right of 42% axis (7 cols): Anti-Spreadsheet Connected Bottleneck -> Evovi Solution + Accent KPIs */}
                <div
                  data-ui="project-flow-card"
                  className="flex flex-col justify-between gap-6 lg:col-span-7"
                >
                  {/* Top-Aligned Accent KPI Strip (Pillar 2: Pull key metrics into immediate visual focus) */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="evo-surface-card rounded-lg px-4 py-3"
                      >
                        <div className="font-display text-evo-body font-bold text-[#93c5fd] tabular-nums">
                          {m.value}
                        </div>
                        <div className="mt-0.5 text-evo-small text-[#9eb2d0]">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connected Bottleneck -> Solution Timeline (Zero literal "Bài toán:" / "Giải pháp:" prefixes) */}
                  <div className="evo-surface-card rounded-xl p-5 md:p-6">
                    <div className="relative space-y-5 pl-6">
                      <div
                        aria-hidden="true"
                        className="absolute top-3 bottom-3 left-[7px] w-[2px] bg-[#193158]"
                      />

                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute top-2 -left-6 h-3.5 w-3.5 rounded-full border-2 border-[#fcd34d] bg-[#050b16]"
                        />
                        <p className="max-w-[60ch] text-evo-body text-[#9eb2d0]">
                          {project.problem}
                        </p>
                      </div>

                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute top-2 -left-6 h-3.5 w-3.5 rounded-full bg-[#34c759]"
                        />
                        <p className="max-w-[60ch] text-evo-body font-medium text-[#f5f8ff]">
                          {project.solution}
                        </p>
                        <p className="mt-2 max-w-[60ch] text-evo-small text-[#93c5fd]">
                          {project.architectureNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Row: Ghost Secondary Links + 2:1 Primary Consultation Trigger */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      {project.href && project.hrefLabel && (
                        <Link
                          to={project.href}
                          className="evo-btn-ghost evo-btn-sm"
                        >
                          <span>{project.hrefLabel}</span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#5ca4ff]" aria-hidden="true" />
                        </Link>
                      )}
                      {project.secondaryHref && project.secondaryLabel && (
                        <Link
                          to={project.secondaryHref}
                          className="text-evo-small font-medium text-[#9eb2d0] transition-colors hover:text-[#f5f8ff] hover:underline"
                        >
                          {project.secondaryLabel}
                        </Link>
                      )}
                    </div>

                    <a
                      href="#contact"
                      onClick={() =>
                        onSelectProjectScope(project.scopePreset, project.name)
                      }
                      className="evo-btn-primary"
                    >
                      <span>Tư vấn mô hình này</span>
                      <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
