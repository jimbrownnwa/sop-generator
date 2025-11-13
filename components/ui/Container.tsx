import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "7xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export default function Container({
  children,
  maxWidth = "7xl",
  padding = "lg",
  className = "",
}: ContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: "px-4 py-8",
    md: "px-6 py-12 sm:px-8",
    lg: "px-6 py-20 sm:px-8 lg:px-12",
  };

  return (
    <div
      className={`${maxWidthClasses[maxWidth]} mx-auto ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  background?: "transparent" | "white" | "slate" | "gradient";
  className?: string;
}

export function Section({
  children,
  background = "transparent",
  className = "",
}: SectionProps) {
  const backgrounds = {
    transparent: "",
    white: "bg-white",
    slate: "bg-slate-50",
    gradient: "bg-gradient-to-br from-slate-50 via-blue-50/30 to-white",
  };

  return (
    <section className={`relative ${backgrounds[background]} ${className}`}>
      {children}
    </section>
  );
}
