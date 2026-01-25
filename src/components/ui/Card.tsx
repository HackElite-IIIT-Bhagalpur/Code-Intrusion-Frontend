import { HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] text-[color:var(--text)]",
          {
            "shadow-[0_10px_35px_rgba(0,0,0,0.35)]": variant === "default",
            "border border-[color:var(--border)]/80": variant === "bordered",
            "shadow-[0_14px_45px_rgba(0,0,0,0.45)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.55)] hover:border-[color:var(--primary)]/25 transition-all duration-200":
              variant === "elevated",
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "px-6 py-4 border-b border-[color:var(--border)] bg-[color:var(--surface)]/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

export const CardBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx("px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
});

CardBody.displayName = "CardBody";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "px-6 py-4 border-t border-[color:var(--border)] bg-[color:var(--surface)]/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

export default Card;
