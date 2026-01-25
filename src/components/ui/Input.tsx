import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[color:var(--text)] mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg transition-all duration-200",
            "bg-[#0d131b] text-[color:var(--text)] placeholder:text-[color:var(--muted)]/80",
            "focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] focus:border-[color:var(--primary)] shadow-[0_0_0_1px_rgba(0,229,255,0.15)]",
            "disabled:bg-[#0f1520] disabled:cursor-not-allowed",
            {
              "border-[color:var(--error)] focus:ring-[color:var(--error)] focus:border-[color:var(--error)]": error,
              "border-[color:var(--border)]": !error,
            },
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[color:var(--muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
