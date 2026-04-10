import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      {subtitle && (
        <p className="text-xs font-extrabold font-heading tracking-[2px] uppercase text-primary mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-dark mb-3">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-sm text-body max-w-md",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
