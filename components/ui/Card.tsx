import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export default function Card({
  children,
  hover = true,
  padding = "lg",
  className = "",
}: CardProps) {
  const baseStyles =
    "bg-white rounded-2xl border border-slate-100 transition-all duration-300";

  const hoverStyles = hover
    ? "shadow-md hover:shadow-2xl hover:-translate-y-1"
    : "shadow-sm";

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className} group`}
    >
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <Card className={className}>
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </Card>
  );
}
