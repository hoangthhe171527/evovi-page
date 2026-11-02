import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TRANSFORMATION_BEATS } from "@/data/evovi-projects";

const BEAT_NAMES = [
  "Nguồn dữ liệu",
  "Luồng nghiệp vụ",
  "Hiện trường",
  "Mở rộng & AI",
] as const;

type SystemTransformerStageProps = {
  activeIndex: number;
  onSelectBeat: (idx: number) => void;
};

export function SystemTransformerStage({
  activeIndex,
  onSelectBeat,
}: SystemTransformerStageProps) {
  const [viewMode, setViewMode] = useState<"evovi" | "legacy">("evovi");
  const beat = TRANSFORMATION_BEATS[activeIndex] ?? TRANSFORMATION_BEATS[0];
  const isEvovi = viewMode === "evovi";

  const nodes = isEvovi
    ? [
        {
          name:
            activeIndex === 0
              ? "CRM · Hợp đồng · Kho"
              : activeIndex === 1
                ? "Màn hình theo vai trò"
                : activeIndex === 2
                  ? "App Offline-First"
                  : "Product Brief sống",
          stat: "Đồng bộ tức thời",
          dot: "#247eff",
        },
        {
          name:
            activeIndex === 0
              ? "Phân quyền Multi-Tenant"
              : activeIndex === 1
                ? "Quy tắc nghiệp vụ tự động"
                : activeIndex === 2
                  ? "Duyệt ảnh & Odometer"
                  : "CI/CD & Kiểm thử tự động",
          stat: "Không sai lệch tay",
          dot: "#5ca4ff",
        },
        {
          name:
            activeIndex === 0
              ? "Báo cáo lãi lỗ trực tiếp"
              : activeIndex === 1
                ? "Nhân sự mới dùng ngay"
                : activeIndex === 2
                  ? "Biên bản số minh bạch"
                  : "Kết nối tác nhân MCP AI",
          stat: "99.9% SLA vận hành",
          dot: "#34c759",
        },
      ]
    : [
        {
          name: "Bảng tính & tin nhắn rời",
          stat: "Nhập liệu lặp 3 lần",
          dot: "#f5a623",
        },
        {
          name: "Hỏi tiến độ thủ công",
          stat: "Trễ 24 đến 48 giờ",
          dot: "#f5a623",
        },
        {
          name: "Lệch số liệu cuối kỳ",
          stat: "Khó mở rộng quy mô",
          dot: "#f5a623",
        },
      ];

  return (
    <div
      data-ui="transformer-console"
      className="evo-surface-card rounded-xl p-6 text-[#f5f8ff] md:p-8"
    >
      {/* Top Bar: Window Status + Segmented Mode Switch (Pillar 1) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#247eff]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#34c759]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f5a623]" />
          <span className="ml-1.5 text-evo-small font-medium text-[#d6e2f5]">
            Kiến trúc vận hành · {BEAT_NAMES[activeIndex]}
          </span>
        </div>

        <div
          className="evo-segmented-track"
          role="tablist"
          aria-label="Chế độ so sánh vận hành"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!isEvovi}
            data-active={!isEvovi ? "false" : undefined}
            data-active-tone={!isEvovi ? "amber" : undefined}
            onClick={() => setViewMode("legacy")}
            className="evo-segmented-tab disabled:opacity-45"
          >
            Trước chuyển đổi
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isEvovi}
            data-active={isEvovi ? "true" : "false"}
            onClick={() => setViewMode("evovi")}
            className="evo-segmented-tab disabled:opacity-45"
          >
            Hệ thống Evovi
          </button>
        </div>
      </div>

      {/* Common-Region Segmented Beat Selector (Pillar 1) */}
      <div
        className="evo-segmented-track mt-5 w-full justify-start"
        role="tablist"
        aria-label="Chọn mạch nghiệp vụ"
      >
        {BEAT_NAMES.map((label, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              data-active={active ? "true" : "false"}
              onClick={() => onSelectBeat(idx)}
              className="evo-segmented-tab disabled:opacity-45"
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Recessed Well + Flipped Tonal Chip (Pillar 6) */}
      <div
        key={`${activeIndex}-${viewMode}`}
        className="evo-panel-enter evo-surface-well mt-6 rounded-lg p-5 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`text-evo-small font-semibold ${
              isEvovi ? "evo-chip-success" : "evo-chip-warning"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isEvovi ? "bg-[#6ee7b7]" : "bg-[#fcd34d]"
              }`}
            />
            {isEvovi ? "Luồng dữ liệu đồng bộ" : "Điểm nghẽn thủ công"}
          </span>
          <span className="text-evo-small font-semibold tabular-nums text-[#93c5fd]">
            {isEvovi ? beat.metricAfter : beat.metricBefore}
          </span>
        </div>

        <h3 className="mt-4 font-display text-evo-h3 font-semibold text-[#f5f8ff]">
          {isEvovi ? beat.systemTitle : beat.painTitle}
        </h3>
        <p className="mt-2 max-w-[54ch] text-evo-body text-[#d6e2f5]">
          {isEvovi ? beat.systemDesc : beat.painDesc}
        </p>

        {/* Live Telemetry Conduit Fragment */}
        <div data-ui="architecture-telemetry" className="mt-6">
          <svg
            aria-hidden="true"
            viewBox="0 0 600 28"
            className="mb-4 hidden h-7 w-full sm:block"
          >
            {isEvovi ? (
              <>
                <line
                  x1="24"
                  y1="14"
                  x2="576"
                  y2="14"
                  stroke="#193158"
                  strokeWidth="2"
                />
                <line
                  x1="24"
                  y1="14"
                  x2="576"
                  y2="14"
                  stroke="#247eff"
                  strokeWidth="2"
                  strokeOpacity="0.65"
                />
                <circle cx="96" cy="14" r="5" fill="#247eff" />
                <circle cx="300" cy="14" r="5" fill="#5ca4ff" />
                <circle cx="504" cy="14" r="5" fill="#34c759" />
                <circle r="4" fill="#f5f8ff">
                  <animateMotion
                    dur="2.8s"
                    repeatCount="indefinite"
                    path="M 24 14 L 576 14"
                  />
                </circle>
              </>
            ) : (
              <>
                <line x1="24" y1="14" x2="170" y2="14" stroke="#f5a623" strokeWidth="2" />
                <line x1="226" y1="14" x2="372" y2="14" stroke="#f5a623" strokeWidth="2" />
                <line x1="428" y1="14" x2="576" y2="14" stroke="#f5a623" strokeWidth="2" />
                <circle cx="96" cy="14" r="5" fill="#f5a623" />
                <circle cx="300" cy="14" r="5" fill="#f5a623" />
                <circle cx="504" cy="14" r="5" fill="#f5a623" />
              </>
            )}
          </svg>

          <div className="grid gap-3 sm:grid-cols-3">
            {nodes.map((node) => (
              <div
                key={node.name}
                className="rounded-lg bg-[#0d1b33] border-l-4 border-[#193158] px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: node.dot }}
                  />
                  <span className="text-evo-small font-semibold text-[#f5f8ff]">
                    {node.name}
                  </span>
                </div>
                <div className="mt-1 text-evo-small text-[#9eb2d0]">
                  {node.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pillar 2: Anti-Spreadsheet Relational Flow Outcome Bar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#081224] px-4 py-3 text-evo-small">
        <span className="inline-flex items-center gap-2 text-[#9eb2d0]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#fcd34d]" />
          <span className="tabular-nums">{beat.metricBefore}</span>
        </span>
        <span className="inline-flex items-center gap-2 font-semibold text-[#6ee7b7]">
          <ArrowRight className="h-4 w-4 shrink-0 text-[#5ca4ff]" aria-hidden="true" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#6ee7b7]" />
          <span className="tabular-nums">{beat.metricAfter}</span>
        </span>
      </div>
    </div>
  );
}
