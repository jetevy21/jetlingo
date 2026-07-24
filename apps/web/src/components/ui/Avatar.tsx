import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar({
  name,
  imageUrl,
  size = "md",
  className,
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-xl",
  };

  if (imageUrl) {
    return (
      <div
        className={cn(
          "rounded-full overflow-hidden flex-shrink-0",
          sizeClasses[size],
          className
        )}
      >
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold bg-gradient-to-br from-teal-500 to-teal-600 text-white flex-shrink-0",
        sizeClasses[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
