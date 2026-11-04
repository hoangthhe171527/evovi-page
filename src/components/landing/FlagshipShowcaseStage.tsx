import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { FLAGSHIP_SLIDES } from "@/data/evovi-projects";
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
    tag: "Thương mại & Dịch vụ Đô thị",
  },
  elevator: {
    src: elevatorArchImg,
    width: 1080,
    height: 1440,
    tag: "Quản trị & Vận hành Doanh nghiệp",
  },
  studio: {
    src: studioBlueprintImg,
    width: 1440,
    height: 810,
    tag: "Đào tạo & Tri thức Số",
  },
  factory: {
    src: factoryOpsImg,
    width: 1080,
    height: 1440,
    tag: "Trợ lý AI & Tự động hóa Nội bộ",
  },
} as const;

type FlagshipShowcaseProps = {
  onSelectProjectScope: (preset: string, projectName?: string) => void;
};

export function FlagshipShowcaseStage({
  onSelectProjectScope,
}: FlagshipShowcaseProps) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const currentSlide = FLAGSHIP_SLIDES[activeSlideIdx] ?? FLAGSHIP_SLIDES[0];
  const currentPhoto = PHOTO_MAP[currentSlide.photoKey];

  return (
    <section
      id="domains"
      className="bg-[#050b16] py-20 text-[#f5f8ff] md:py-24"
    >
      <div className="container-evo">
        {/* Pillar 2 & 3: H2 leads first on Mobile, 42%-axis split on Desktop */}
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5" data-section-sub>
            <p className="max-w-[36ch] text-evo-body text-[#d6e2f5]">
              Giải pháp công nghệ của Evovi được ứng dụng thực tế trong nhiều lĩnh vực trọng điểm.
            </p>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <h2
              data-section-heading
              className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
            >
              Lĩnh vực Evovi đồng hành
            </h2>
          </div>
        </div>

        {/* Interactive 4-Domain Split Stage */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left 42% Index: Semantic Tab Buttons */}
          <div className="lg:col-span-5">
            <div
              className="space-y-2"
              role="tablist"
              aria-label="Lĩnh vực ứng dụng của Evovi"
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
              className="evo-panel-enter evo-surface-card mt-5 rounded-xl p-6"
            >
              <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                {currentSlide.headline}
              </h3>
              <p className="mt-2.5 max-w-[42ch] text-evo-body text-[#d6e2f5]">
                {currentSlide.summary}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  onClick={() =>
                    onSelectProjectScope(currentSlide.title)
                  }
                  className="evo-btn-primary evo-btn-sm"
                >
                  <span>Nhận tư vấn lĩnh vực này</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                {currentSlide.routeHref && currentSlide.routeLabel && (
                  <Link
                    to={currentSlide.routeHref}
                    className="evo-btn-ghost evo-btn-sm"
                  >
                    <span>{currentSlide.routeLabel}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#5ca4ff]" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right 58% Live Domain Preview with Progressive Blur Photo + Flipped Tonal Chips */}
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

              <div data-ui="flagship-telemetry" className="p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-evo-small font-semibold text-[#f5f8ff]">
                    {currentSlide.livePanelTitle}
                  </span>
                  <span className="evo-chip-success text-evo-small font-semibold tabular-nums">
                    <span className="h-2 w-2 rounded-full bg-[#6ee7b7]" />
                    {currentSlide.liveStatus}
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {currentSlide.liveRows.map((row) => (
                    <div
                      key={row.label}
                      className="evo-surface-well flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-3"
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

                <div className="mt-5 grid grid-cols-3 gap-4 pt-1">
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
  );
}
