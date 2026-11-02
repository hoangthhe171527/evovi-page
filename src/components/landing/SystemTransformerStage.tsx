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
          dot: "#f59422",
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
          dot: "#2480ff",
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
          dot: "#3cb34a",
        },
      ]
    : [
        {
          name: "Bảng tính & tin nhắn rời",
          stat: "Nhập liệu lặp 3 lần",
          dot: "#f59422",
        },
        {
          name: "Hỏi tiến độ thủ công",
          stat: "Trễ 24 đến 48 giờ",
          dot: "#f59422",
        },
        {
          name: "Lệch số liệu cuối kỳ",
          stat: "Khó mở rộng quy mô",
          dot: "#f59422",
        },
      ];

  return (
    <div className="rounded-lg bg-[#070d18] p-6 text-[#f4f7fb] md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f59422]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2480ff]" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#3cb34a]" />
          <span className="ml-2 text-evo-small font-medium text-[#a6b4c8]">
            Mô phỏng kiến trúc Evovi · {BEAT_NAMES[activeIndex]}
          </span>
        </div>

        <div className="inline-flex rounded-md bg-[#0d1728] p-1">
          <button
            type="button"
            onClick={() => setViewMode("legacy")}
            className={`rounded px-3 py-1.5 text-evo-small font-semibold transition-colors ${
              !isEvovi
                ? "bg-[#f59422] text-[#070d18]"
                : "text-[#a6b4c8] hover:text-[#f4f7fb]"
            }`}
          >
            Trước Evovi
          </button>
          <button
            type="button"
            onClick={() => setViewMode("evovi")}
            className={`rounded px-3 py-1.5 text-evo-small font-semibold transition-colors ${
              isEvovi
                ? "bg-[#095fd6] text-white"
                : "text-[#a6b4c8] hover:text-[#f4f7fb]"
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
                  ? "bg-[#095fd6] text-white"
                  : "bg-[#0d1728] text-[#a6b4c8] hover:text-[#f4f7fb]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-md bg-[#0d1728] p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded px-3 py-1 text-evo-small font-semibold ${
              isEvovi
                ? "bg-[#3cb34a] text-[#070d18]"
                : "bg-[#f59422] text-[#070d18]"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#070d18]" />
            {isEvovi ? "Kiến trúc đồng bộ" : "Điểm nghẽn vận hành"}
          </span>
          <span className="text-evo-small font-medium tabular-nums text-[#a6b4c8]">
            {isEvovi ? beat.metricAfter : beat.metricBefore}
          </span>
        </div>

        <h3 className="mt-4 font-display text-evo-h3 font-bold text-[#f4f7fb]">
          {isEvovi ? beat.systemTitle : beat.painTitle}
        </h3>
        <p className="mt-2.5 max-w-[54ch] text-evo-body text-[#a6b4c8]">
          {isEvovi ? beat.systemDesc : beat.painDesc}
        </p>

        <div
          data-ui="architecture-telemetry"
          className="mt-6 grid gap-5 sm:grid-cols-3"
        >
          {nodes.map((node) => (
            <div key={node.name} className="border-l-4 border-[#142238] pl-3.5">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: node.dot }}
                />
                <span className="text-evo-small font-semibold text-[#f4f7fb]">
                  {node.name}
                </span>
              </div>
              <div className="mt-1 text-evo-small text-[#a6b4c8]">
                {node.stat}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-evo-small text-[#a6b4c8]">
        <span>
          Trước: <strong className="text-[#f4f7fb]">{beat.metricBefore}</strong>
        </span>
        <span className="font-semibold text-[#3cb34a]">
          Sau chuyển đổi → {beat.metricAfter}
        </span>
      </div>
    </div>
  );
}
