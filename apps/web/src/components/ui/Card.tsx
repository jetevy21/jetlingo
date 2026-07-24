import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "interactive";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-200",
          {
            "bg-slate-800/50 border border-slate-700/50":
              variant === "default",
            "bg-slate-800/30 backdrop-blur-xl border border-white/10":
              variant === "glass",
            "bg-slate-800/50 border border-slate-700/50 hover:border-teal-500/50 hover:bg-slate-800/80 cursor-pointer":
              variant === "interactive",
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

export default Card;
