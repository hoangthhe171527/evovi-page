import { useState } from "react";
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
    <div className="rounded-lg bg-[#0d1b33] p-6 text-[#f5f8ff] md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#247eff]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#34c759]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f5a623]" />
          <span className="ml-2 text-evo-small font-medium text-[#d6e2f5]">
            Kiến trúc vận hành · {BEAT_NAMES[activeIndex]}
          </span>
        </div>

        <div className="inline-flex rounded-md bg-[#050b16] p-1">
          <button
            type="button"
            onClick={() => setViewMode("legacy")}
            className={`rounded px-3 py-1.5 text-evo-small font-semibold transition-colors ${
              !isEvovi
                ? "bg-[#f5a623] text-[#050b16]"
                : "text-[#9eb2d0] hover:text-[#f5f8ff]"
            }`}
          >
            Trước chuyển đổi
          </button>
          <button
            type="button"
            onClick={() => setViewMode("evovi")}
            className={`rounded px-3 py-1.5 text-evo-small font-semibold transition-colors ${
              isEvovi
                ? "bg-[#0b63e5] text-white"
                : "text-[#9eb2d0] hover:text-[#f5f8ff]"
            }`}
          >
            Hệ thống Evovi
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {BEAT_NAMES.map((label, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelectBeat(idx)}
              className={`rounded-md px-3.5 py-2 text-left text-evo-small font-semibold transition-colors ${
                active
                  ? "bg-[#0b63e5] text-white"
                  : "bg-[#050b16] text-[#9eb2d0] hover:bg-[#132747] hover:text-[#f5f8ff]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        key={`${activeIndex}-${viewMode}`}
        className="evo-panel-enter mt-6 rounded-md bg-[#050b16] p-5 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded px-3 py-1 text-evo-small font-semibold ${
              isEvovi
                ? "bg-[#34c759] text-[#050b16]"
                : "bg-[#f5a623] text-[#050b16]"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#050b16]" />
            {isEvovi ? "Luồng dữ liệu đồng bộ" : "Điểm nghẽn thủ công"}
          </span>
          <span className="text-evo-small font-medium tabular-nums text-[#9eb2d0]">
            {isEvovi ? beat.metricAfter : beat.metricBefore}
          </span>
        </div>

        <h3 className="mt-4 font-display text-evo-h3 font-semibold text-[#f5f8ff]">
          {isEvovi ? beat.systemTitle : beat.painTitle}
        </h3>
        <p className="mt-2.5 max-w-[54ch] text-evo-body text-[#d6e2f5]">
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

          <div className="grid gap-4 sm:grid-cols-3">
            {nodes.map((node) => (
              <div
                key={node.name}
                className="rounded bg-[#0d1b33] border-l-4 border-[#193158] px-3.5 py-3"
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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-evo-small text-[#9eb2d0]">
        <span>
          Trước: <strong className="font-semibold text-[#f5f8ff]">{beat.metricBefore}</strong>
        </span>
        <span className="font-semibold text-[#34c759]">
          Sau chuyển đổi → {beat.metricAfter}
        </span>
      </div>
    </div>
  );
}
