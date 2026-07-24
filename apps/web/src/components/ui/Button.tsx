import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/25":
              variant === "primary",
            "bg-slate-700 hover:bg-slate-600 text-white":
              variant === "secondary",
            "hover:bg-slate-700/50 text-slate-300 hover:text-white":
              variant === "ghost",
            "bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/25":
              variant === "danger",
            "border border-slate-600 hover:border-teal-500 text-slate-300 hover:text-teal-400":
              variant === "outline",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-base": size === "md",
            "px-7 py-3.5 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
