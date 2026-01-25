import { HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          {
            "bg-[#0f1724] text-[color:var(--text)] border border-[color:var(--border)]": variant === "default",
            "bg-[color:var(--success)]/15 text-[color:var(--success)] border border-[color:var(--success)]/30": variant === "success",
            "bg-[color:var(--warning)]/15 text-[color:var(--warning)] border border-[color:var(--warning)]/30": variant === "warning",
            "bg-[color:var(--error)]/15 text-[color:var(--error)] border border-[color:var(--error)]/30": variant === "danger",
            "bg-[color:var(--primary)]/15 text-[color:var(--primary)] border border-[color:var(--primary)]/30": variant === "info",
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
