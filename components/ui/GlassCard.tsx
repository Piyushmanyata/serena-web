interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function GlassCard({
  children,
  className = "",
  dark = false,
  hover = false,
  padding = "md",
}: GlassCardProps) {
  return (
    <div
      className={[
        dark ? "glass-dark" : "glass-card",
        paddings[padding],
        hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(198,161,91,0.2)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
