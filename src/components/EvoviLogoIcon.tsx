import logo from "@/assets/evovi-logo.png";
import { cn } from "@/lib/utils";

type EvoviLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

/** Logo Evovi đầy đủ (icon + chữ evovi trong ảnh) — không thêm chữ HTML bên cạnh. */
const sizeClasses = {
  sm: "h-9 w-[4.25rem]",
  md: "h-11 w-[5.25rem]",
  lg: "h-14 w-[6.5rem]",
} as const;

export function EvoviLogoIcon({ className, size = "md" }: EvoviLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizeClasses[size],
        className,
      )}
    >
      <img
        src={logo}
        alt="Evovi"
        width={84}
        height={56}
        className="h-full w-full object-contain object-center"
      />
    </span>
  );
}
