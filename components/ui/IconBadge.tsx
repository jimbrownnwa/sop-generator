import { LucideIcon } from "lucide-react";

interface IconBadgeProps {
  icon: LucideIcon;
  color?: "blue" | "emerald" | "indigo" | "purple" | "pink" | "slate";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export default function IconBadge({
  icon: Icon,
  color = "blue",
  size = "md",
  animate = true,
  className = "",
}: IconBadgeProps) {
  const colors = {
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    emerald:
      "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    indigo:
      "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    purple:
      "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
    slate:
      "bg-slate-100 text-slate-600 group-hover:bg-slate-600 group-hover:text-white",
  };

  const sizes = {
    sm: { container: "w-10 h-10", icon: "w-5 h-5" },
    md: { container: "w-14 h-14", icon: "w-7 h-7" },
    lg: { container: "w-16 h-16", icon: "w-8 h-8" },
  };

  const animateClass = animate ? "transition-colors duration-300" : "";

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl ${colors[color]} ${sizes[size].container} ${animateClass} ${className}`}
    >
      <Icon className={sizes[size].icon} />
    </div>
  );
}
