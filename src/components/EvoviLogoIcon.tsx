import logoDark from "@/assets/evovi-logo-dark.svg";
import { cn } from "@/lib/utils";

type EvoviLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  surface?: "plain" | "panel";
};

/**
 * Bộ nhận diện ngang Evovi (biểu tượng 3 cánh + chữ evovi vector sáng)
 * thiết kế trên nền trong suốt để đồng bộ tuyệt đối với hệ nền xanh đen.
 */
const sizeClasses = {
  sm: "h-8 w-[6.25rem] sm:h-9 sm:w-[7rem]",
  md: "h-11 w-[8.6rem]",
  lg: "h-14 w-[10.9rem]",
} as const;

export function EvoviLogoIcon({
  className,
  size = "md",
  surface = "plain",
}: EvoviLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-start select-none",
        surface === "panel" && "rounded-md bg-[#0d1b33] px-3 py-1.5",
        sizeClasses[size],
        className,
      )}
    >
      <img
        src={logoDark}
        alt="Evovi"
        width={140}
        height={45}
        decoding="async"
        className="h-full w-full object-contain object-left"
      />
    </span>
  );
}
