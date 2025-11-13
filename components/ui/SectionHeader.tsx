import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string | ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  gradient?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  gradient = false,
  className = "",
}: SectionHeaderProps) {
  const alignmentClass = align === "center" ? "text-center" : "text-left";

  const titleClasses = gradient
    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent"
    : "text-slate-900";

  return (
    <div className={`${alignmentClass} ${className}`}>
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${titleClasses}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface PageHeaderProps {
  title: string | ReactNode;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {badge && (
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            {badge}
          </span>
        </div>
      )}
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
