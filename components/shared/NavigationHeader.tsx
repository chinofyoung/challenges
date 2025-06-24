import Link from "next/link";

interface NavigationHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export default function NavigationHeader({
  title = "Back to Tools",
  showBackButton = true,
}: NavigationHeaderProps) {
  if (!showBackButton) return null;

  return (
    <div className="max-w-7xl mx-auto mb-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {title}
      </Link>
    </div>
  );
}
