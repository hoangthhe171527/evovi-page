import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  EVOVI_PROJECTS,
  FLAGSHIP_SLIDES,
  PROJECT_VERTICALS,
  type ProjectVerticalId,
} from "@/data/evovi-projects";
import oohCityImg from "@/assets/evovi-ooh-city.jpg";
import elevatorArchImg from "@/assets/evovi-elevator-arch.jpg";
import studioBlueprintImg from "@/assets/evovi-studio-blueprint.jpg";
import factoryOpsImg from "@/assets/evovi-factory-ops.jpg";

const PHOTO_MAP = {
  ooh: { src: oohCityImg, width: 1600, height: 900 },
  elevator: { src: elevatorArchImg, width: 1080, height: 1440 },
  studio: { src: studioBlueprintImg, width: 1440, height: 810 },
  factory: { src: factoryOpsImg, width: 1080, height: 1440 },
} as const;

type FlagshipShowcaseProps = {
  onSelectProjectScope: (preset: string) => void;
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
          {/* Strict 42%-axis header (5fr / 7fr) */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5" data-section-sub>
              <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                Không dừng ở bản vẽ ý tưởng. Dưới đây là các hệ thống phần mềm, nền tảng học tập, ERP công trình và tác nhân AI do đội ngũ Evovi trực tiếp kiến trúc trên 39 kho mã nguồn chuyên biệt.
              </p>
            </div>
            <div className="lg:col-span-7">
              <h2
                data-section-heading
                className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
              >
                Chín hệ thống đang chạy thực tế
              </h2>
            </div>
          </div>

          {/* Editorial Dual-Photo Architectural Band (Flush container margins, scrubbed inner image zoom) */}
          <div
            data-expand-window
            className="mt-14 grid gap-3 overflow-hidden bg-[#081224] p-3 lg:grid-cols-12"
          >
            <div className="relative overflow-hidden lg:col-span-8">
              <img
                data-expand-img
                src={oohCityImg}
                alt="Màn hình LED quảng cáo ngoài trời OOH tại trung tâm TP. Hồ Chí Minh do nền tảng Ad Canvas và Evo AdTracker của Evovi quản lý vận hành"
                width={1600}
                height={900}
                loading="lazy"
                className="aspect-[16/10] h-full w-full object-cover will-change-transform"
              />
            </div>
            <div className="relative overflow-hidden lg:col-span-4">
              <img
                data-expand-img
                src={elevatorArchImg}
                alt="Hệ thống thang máy lồng kính tại tòa nhà cao tầng được quản lý lắp đặt và bảo trì trên nền tảng Elevator360 của Evovi"
                width={1080}
                height={1440}
                loading="lazy"
                className="aspect-[4/5] h-full w-full object-cover will-change-transform"
              />
            </div>
          </div>

          {/* Interactive 4-Flagship Split Stage */}
          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left 42% Index: Open architectural list, single active surface */}
            <div className="lg:col-span-5">
              <p className="text-evo-body font-medium text-[#d6e2f5]">
                Chọn cụm sản phẩm chủ lực để xem luồng vận hành trực tiếp:
              </p>
              <div className="mt-5 space-y-2">
                {FLAGSHIP_SLIDES.map((slide, idx) => {
                  const isSelected = idx === activeSlideIdx;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlideIdx(idx)}
                      className={`group flex w-full items-center justify-between gap-4 border-l-4 px-5 py-4 text-left transition-colors duration-200 ${
                        isSelected
                          ? "border-[#247eff] bg-[#0d1b33] text-[#f5f8ff]"
                          : "border-[#132747] bg-transparent text-[#9eb2d0] hover:border-[#5ca4ff] hover:text-[#f5f8ff]"
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
                      <span
                        aria-hidden="true"
                        className={`text-evo-body font-bold transition-transform duration-200 ${
                          isSelected
                            ? "translate-x-1 text-[#5ca4ff]"
                            : "text-[#9eb2d0] group-hover:translate-x-1"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                key={`summary-${currentSlide.id}`}
                className="evo-panel-enter mt-8 rounded-lg bg-[#0d1b33] p-6"
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
                      className="inline-flex items-center gap-2 rounded-md bg-[#0b63e5] px-4 py-2.5 text-evo-small font-semibold text-white transition-colors hover:bg-[#247eff]"
                    >
                      {currentSlide.routeLabel} ↗
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right 58% Live Product Telemetry */}
            <div className="lg:col-span-7">
              <div
                key={`telemetry-${currentSlide.id}`}
                className="evo-panel-enter overflow-hidden rounded-lg bg-[#0d1b33]"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#081224]">
                  <img
                    src={currentPhoto.src}
                    alt={currentSlide.photoCaption}
                    width={currentPhoto.width}
                    height={currentPhoto.height}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>

                {/* Compact cropped telemetry fragment (< 420px tall, zero headings inside) */}
                <div data-ui="flagship-telemetry" className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-evo-small font-semibold text-[#f5f8ff]">
                      {currentSlide.livePanelTitle}
                    </span>
                    <span className="rounded bg-[#34c759] px-3 py-1 text-evo-small font-bold text-[#050b16]">
                      {currentSlide.liveStatus}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {currentSlide.liveRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-wrap items-center justify-between gap-3 rounded bg-[#132747] px-4 py-3.5"
                      >
                        <div>
                          <div className="text-evo-body font-semibold text-[#f5f8ff]">
                            {row.label}
                          </div>
                          <div className="mt-0.5 text-evo-small text-[#d6e2f5]">
                            {row.meta}
                          </div>
                        </div>
                        <span
                          className={`rounded px-3 py-1 text-evo-small font-semibold ${
                            row.tone === "emerald"
                              ? "bg-[#34c759] text-[#050b16]"
                              : row.tone === "orange"
                                ? "bg-[#f5a623] text-[#050b16]"
                                : "bg-[#0b63e5] text-white"
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

      {/* PART B: COMPLETE 9-SYSTEM EVOVI-VN DIRECTORY ON UNIFIED DEEP NAVY BANDS */}
      <section
        id="ecosystem"
        className="bg-[#081224] pt-20 text-[#f5f8ff] md:pt-28"
      >
        <div className="container-evo pb-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5" data-section-sub>
              <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                Lọc theo lĩnh vực để xem bài toán thực tế, kiến trúc kỹ thuật và quy mô phân hệ của toàn bộ 9 dòng sản phẩm thuộc tổ chức GitHub Evovi.
              </p>
            </div>
            <div className="lg:col-span-7">
              <h2
                data-section-heading
                className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
              >
                Toàn bộ danh mục dự án Evovi
              </h2>
            </div>
          </div>

          {/* Filter bar */}
          <div
            className="mt-10 flex flex-wrap gap-2.5"
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
                  onClick={() => setActiveVertical(v.id)}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-evo-small font-semibold transition-colors ${
                    active
                      ? "bg-[#0b63e5] text-white"
                      : "bg-[#0d1b33] text-[#d6e2f5] hover:bg-[#132747] hover:text-[#f5f8ff]"
                  }`}
                >
                  <span>{v.label}</span>
                  <span
                    className={`rounded px-2 py-0.5 text-evo-small font-bold tabular-nums ${
                      active
                        ? "bg-[#050b16] text-[#f5f8ff]"
                        : "bg-[#050b16] text-[#9eb2d0]"
                    }`}
                  >
                    {v.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-bleed Alternating Deep Navy Bands (100% viewport width, 42% internal axis, zero icon cards) */}
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
                {/* Left of 42% axis (5 cols): Title FIRST, then domain & stack beneath */}
                <div className="flex flex-col justify-between lg:col-span-5">
                  <div>
                    <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                      {project.name}
                    </h3>
                    <p className="mt-1.5 text-evo-small font-semibold text-[#5ca4ff]">
                      {project.verticalLabel} · {project.repoClusterCount} kho mã nguồn chuyên biệt
                    </p>
                    <p className="mt-3 max-w-[38ch] text-evo-body text-[#d6e2f5]">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-[#0d1b33] px-3 py-1 text-evo-small font-medium text-[#d6e2f5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right of 42% axis (7 cols): Narrative & Metrics */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div className="space-y-4">
                    <p className="max-w-[62ch] text-evo-body text-[#d6e2f5]">
                      <strong className="font-semibold text-[#f5f8ff]">
                        Bài toán:{" "}
                      </strong>
                      {project.problem}
                    </p>
                    <p className="max-w-[62ch] text-evo-body text-[#d6e2f5]">
                      <strong className="font-semibold text-[#5ca4ff]">
                        Giải pháp Evovi:{" "}
                      </strong>
                      {project.solution}
                    </p>
                    <p className="max-w-[62ch] text-evo-small text-[#9eb2d0]">
                      {project.architectureNote}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-6">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-evo-small">
                          <strong className="font-bold text-[#f5f8ff] tabular-nums">
                            {m.value}
                          </strong>{" "}
                          <span className="text-[#9eb2d0]">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {project.href && project.hrefLabel && (
                        <Link
                          to={project.href}
                          className="text-evo-small font-semibold text-[#5ca4ff] hover:underline"
                        >
                          {project.hrefLabel} ↗
                        </Link>
                      )}
                      {project.secondaryHref && project.secondaryLabel && (
                        <Link
                          to={project.secondaryHref}
                          className="text-evo-small font-medium text-[#d6e2f5] hover:text-[#f5f8ff] hover:underline"
                        >
                          {project.secondaryLabel}
                        </Link>
                      )}
                      <a
                        href="#contact"
                        onClick={() => onSelectProjectScope(project.scopePreset)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#0b63e5] px-4 py-2 text-evo-small font-semibold text-white transition-colors hover:bg-[#247eff]"
                      >
                        Tư vấn mô hình này →
                      </a>
                    </div>
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
