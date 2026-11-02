import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

type CopyContactChipProps = {
  icon: ReactNode;
  href: string;
  displayValue: string;
  copyValue: string;
  note?: string;
  alignEnd?: boolean;
};

export function CopyContactChip({
  icon,
  href,
  displayValue,
  copyValue,
  note,
  alignEnd = false,
}: CopyContactChipProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = copyValue;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-2.5 ${
        alignEnd ? "lg:justify-end" : ""
      }`}
    >
      <span className="inline-flex items-center gap-2.5">
        {icon}
        <a
          href={href}
          className="font-semibold text-[#f5f8ff] tabular-nums transition-colors hover:text-[#5ca4ff]"
        >
          {displayValue}
        </a>
        {note && <span className="text-evo-small text-[#9eb2d0]">({note})</span>}
      </span>

      <button
        type="button"
        onClick={handleCopy}
        data-copied={copied ? "true" : "false"}
        aria-label={`Sao chép ${displayValue}`}
        aria-live="polite"
        className="evo-copy-btn hover:text-[#f5f8ff] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5ca4ff] disabled:opacity-45"
      >
        <span className="evo-copy-default">
          <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Sao chép</span>
        </span>
        <span className="evo-copy-toast" aria-hidden={!copied}>
          <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Đã sao chép</span>
        </span>
      </button>
    </div>
  );
}
