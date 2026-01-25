import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          "inline-flex items-center justify-center font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]",
          "disabled:opacity-60 disabled:pointer-events-none rounded-lg",
          {
            // Variants
            "bg-[color:var(--primary)] text-[#041018] shadow-[0_0_0_1px_rgba(0,229,255,0.35)] hover:shadow-[0_0_25px_rgba(0,229,255,0.25)] hover:-translate-y-0.5":
              variant === "primary",
            "bg-[#1b2431] text-[color:var(--text)] border border-[color:var(--border)] hover:border-[color:var(--primary)]/60 hover:shadow-[0_0_18px_rgba(0,229,255,0.2)]":
              variant === "secondary",
            "border-2 border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)]/10 hover:shadow-[0_0_18px_rgba(0,229,255,0.2)]":
              variant === "outline",
            "text-[color:var(--text)] hover:text-[color:var(--primary)] hover:bg-white/5 border border-transparent hover:border-[color:var(--border)]":
              variant === "ghost",
            "bg-[color:var(--error)] text-white hover:bg-red-500 focus-visible:ring-red-500":
              variant === "danger",
            // Sizes
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-base": size === "md",
            "px-6 py-3 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
