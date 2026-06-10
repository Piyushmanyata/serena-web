"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  shimmer?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">)
    | ({ href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">)
  );

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#52111c] text-[#f8efe2] border border-[#c6a15b] hover:bg-[#8b1e2d] hover:shadow-[0_0_20px_rgba(198,161,91,0.4)] active:scale-95",
  secondary:
    "bg-transparent text-[#52111c] border border-[#c6a15b] hover:bg-[#f8efe2] hover:shadow-[0_0_12px_rgba(198,161,91,0.25)] active:scale-95",
  ghost:
    "bg-transparent text-[#7b6a62] border border-transparent hover:border-[#c6a15b] hover:text-[#52111c] active:scale-95",
  gold:
    "bg-gradient-to-r from-[#c6a15b] via-[#e8c97a] to-[#c6a15b] text-[#1d1512] border-0 hover:shadow-[0_0_24px_rgba(198,161,91,0.6)] font-semibold active:scale-95",
  danger:
    "bg-[#8b1e2d] text-white border border-red-800 hover:bg-red-700 active:scale-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-4 py-2 rounded-full",
  md: "text-sm px-6 py-3 rounded-full",
  lg: "text-base px-8 py-4 rounded-full",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", loading, shimmer, className = "", children, ...props }, ref) {
    const classes = [
      "inline-flex items-center justify-center gap-2 font-medium tracking-wide",
      "transition-all duration-300 cursor-pointer select-none",
      variantClasses[variant],
      sizeClasses[size],
      shimmer ? "btn-shimmer" : "",
      loading ? "opacity-70 pointer-events-none" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if ("href" in props && props.href) {
      const { href, ...rest } = props as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <Link href={href} className={classes} {...rest}>
          {loading ? <span className="animate-spin">⏳</span> : children}
        </Link>
      );
    }

    const btnProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={loading || btnProps.disabled}
        {...btnProps}
      >
        {loading ? <span className="animate-spin text-sm">⟳</span> : children}
      </button>
    );
  }
);
