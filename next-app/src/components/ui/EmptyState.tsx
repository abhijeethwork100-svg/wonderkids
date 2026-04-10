import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  icon = "🧸",
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <span className="text-6xl mb-4">{icon}</span>
      <h3 className="text-xl font-extrabold font-heading text-dark mb-2">
        {title}
      </h3>
      <p className="text-sm text-body max-w-sm mx-auto mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-primary text-white rounded-full px-7 py-3 font-extrabold font-heading text-sm hover:opacity-90 transition-opacity"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
