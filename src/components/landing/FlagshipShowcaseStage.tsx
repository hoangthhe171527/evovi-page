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
      {/* PART A: DARK ARCHITECTURAL FLAGSHIP STAGE */}
      <section
        id="cases"
        className="bg-[#070d18] py-20 text-[#f4f7fb] md:py-28"
      >
        <div className="container-evo">
          {/* Strict 42%-axis header (5fr / 7fr) */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="max-w-[36ch] text-evo-body text-[#a6b4c8]">
                Không dừng ở bản vẽ ý tưởng. Dưới đây là các hệ thống phần mềm, nền tảng học tập, ERP công trình và tác nhân AI do đội ngũ Evovi trực tiếp kiến trúc trên 39 kho mã nguồn chuyên biệt.
              </p>
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-evo-h2 font-extrabold text-[#f4f7fb]">
                Chín hệ thống đang chạy thực tế
              </h2>
            </div>
          </div>

          {/* Editorial Dual-Photo Architectural Band (Flush container margins, scrubbed inner image zoom) */}
          <div
            data-expand-window
            className="mt-14 grid overflow-hidden bg-[#0d1728] lg:grid-cols-12"
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
              <p className="text-evo-body font-medium text-[#a6b4c8]">
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
                      className={`group flex w-full items-center justify-between gap-4 border-l-4 px-5 py-4 text-left transition-colors ${
                        isSelected
                          ? "border-[#f59422] bg-[#142238] text-[#f4f7fb]"
                          : "border-[#142238] bg-transparent text-[#a6b4c8] hover:text-[#f4f7fb]"
                      }`}
                    >
                      <div>
                        <div className="font-display text-evo-h3 font-bold">
                          {slide.title}
                        </div>
                        <div className="mt-1 text-evo-small text-[#a6b4c8]">
                          {slide.domain}
                        </div>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`text-evo-body font-bold transition-transform ${
                          isSelected
                            ? "translate-x-1 text-[#f59422]"
                            : "text-[#a6b4c8] group-hover:translate-x-1"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 bg-[#0d1728] p-6">
                <h3 className="font-display text-evo-h3 font-bold text-[#f4f7fb]">
                  {currentSlide.headline}
                </h3>
                <p className="mt-3 max-w-[44ch] text-evo-body text-[#a6b4c8]">
                  {currentSlide.summary}
                </p>

                {currentSlide.routeHref && currentSlide.routeLabel && (
                  <div className="mt-6">
                    <Link
                      to={currentSlide.routeHref}
                      className="inline-flex items-center gap-2 rounded-md bg-[#095fd6] px-4 py-2.5 text-evo-small font-semibold text-white transition-colors hover:bg-[#2480ff]"
                    >
                      {currentSlide.routeLabel} ↗
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right 58% Live Product Telemetry */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-lg bg-[#0d1728]">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    key={currentSlide.id}
                    src={currentPhoto.src}
                    alt={currentSlide.photoCaption}
                    width={currentPhoto.width}
                    height={currentPhoto.height}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700"
                  />
                </div>

                {/* Compact cropped telemetry fragment (< 420px tall, zero headings inside) */}
                <div data-ui="flagship-telemetry" className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-evo-small font-semibold text-[#f4f7fb]">
                      {currentSlide.livePanelTitle}
                    </span>
                    <span className="rounded bg-[#3cb34a] px-3 py-1 text-evo-small font-bold text-[#070d18]">
                      {currentSlide.liveStatus}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {currentSlide.liveRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-wrap items-center justify-between gap-3 rounded bg-[#142238] px-4 py-3"
                      >
                        <div>
                          <div className="text-evo-body font-semibold text-[#f4f7fb]">
                            {row.label}
                          </div>
                          <div className="mt-0.5 text-evo-small text-[#a6b4c8]">
                            {row.meta}
                          </div>
                        </div>
                        <span
                          className={`rounded px-3 py-1 text-evo-small font-semibold ${
                            row.tone === "emerald"
                              ? "bg-[#3cb34a] text-[#070d18]"
                              : row.tone === "orange"
                                ? "bg-[#f59422] text-[#070d18]"
                                : "bg-[#095fd6] text-white"
                          }`}
                        >
                          {row.state}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-4 pt-2">
                    {currentSlide.kpis.map((kpi) => (
                      <div key={kpi.label} className="border-l-4 border-[#142238] pl-3">
                        <div className="text-evo-body font-bold text-[#f4f7fb] tabular-nums">
                          {kpi.value}
                        </div>
                        <div className="mt-0.5 text-evo-small text-[#a6b4c8]">
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

      {/* PART B: COMPLETE 9-SYSTEM EVOVI-VN DIRECTORY AS FULL-BLEED EDITORIAL BANDS */}
      <section
        id="ecosystem"
        className="bg-[#eef2f6] pt-20 text-[#0b1320] md:pt-28"
      >
        <div className="container-evo pb-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="max-w-[36ch] text-evo-body text-[#465468]">
                Lọc theo lĩnh vực để xem bài toán thực tế, kiến trúc kỹ thuật và quy mô phân hệ của toàn bộ 9 dòng sản phẩm thuộc tổ chức GitHub Evovi.
              </p>
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-evo-h2 font-extrabold text-[#0b1320]">
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
                      ? "bg-[#095fd6] text-white"
                      : "bg-white text-[#0b1320] hover:bg-[#dfe6ef]"
                  }`}
                >
                  <span>{v.label}</span>
                  <span
                    className={`rounded px-2 py-0.5 text-evo-small font-bold tabular-nums ${
                      active
                        ? "bg-[#070d18] text-[#f4f7fb]"
                        : "bg-[#eef2f6] text-[#465468]"
                    }`}
                  >
                    {v.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-bleed Alternating Editorial Bands (100% viewport width, 42% internal axis, zero icon cards) */}
        <div>
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className={`w-full py-12 md:py-16 ${
                idx % 2 === 0 ? "bg-white" : "bg-[#eef2f6]"
              }`}
            >
              <div
                data-project-row
                className="container-evo grid gap-8 lg:grid-cols-12"
              >
                {/* Left of 42% axis (5 cols): Title FIRST, then domain & stack beneath */}
                <div className="flex flex-col justify-between lg:col-span-5">
                  <div>
                    <h3 className="font-display text-evo-h3 font-extrabold text-[#0b1320]">
                      {project.name}
                    </h3>
                    <p className="mt-1.5 text-evo-small font-semibold text-[#095fd6]">
                      {project.verticalLabel} · {project.repoClusterCount} kho mã nguồn chuyên biệt
                    </p>
                    <p className="mt-3 max-w-[38ch] text-evo-body text-[#465468]">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded px-3 py-1 text-evo-small font-medium text-[#0b1320] ${
                          idx % 2 === 0 ? "bg-[#eef2f6]" : "bg-white"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right of 42% axis (7 cols): Narrative & Metrics */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div className="space-y-4">
                    <p className="max-w-[62ch] text-evo-body text-[#0b1320]">
                      <strong className="font-semibold">Bài toán: </strong>
                      {project.problem}
                    </p>
                    <p className="max-w-[62ch] text-evo-body text-[#0b1320]">
                      <strong className="font-semibold text-[#095fd6]">
                        Giải pháp Evovi:{" "}
                      </strong>
                      {project.solution}
                    </p>
                    <p className="max-w-[62ch] text-evo-small text-[#465468]">
                      {project.architectureNote}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-6">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-evo-small">
                          <strong className="font-bold text-[#0b1320] tabular-nums">
                            {m.value}
                          </strong>{" "}
                          <span className="text-[#465468]">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {project.href && project.hrefLabel && (
                        <Link
                          to={project.href}
                          className="text-evo-small font-bold text-[#095fd6] hover:underline"
                        >
                          {project.hrefLabel} ↗
                        </Link>
                      )}
                      {project.secondaryHref && project.secondaryLabel && (
                        <Link
                          to={project.secondaryHref}
                          className="text-evo-small font-semibold text-[#0b1320] hover:underline"
                        >
                          {project.secondaryLabel}
                        </Link>
                      )}
                      <a
                        href="#contact"
                        onClick={() => onSelectProjectScope(project.scopePreset)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#095fd6] px-4 py-2 text-evo-small font-semibold text-white transition-colors hover:bg-[#2480ff]"
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
