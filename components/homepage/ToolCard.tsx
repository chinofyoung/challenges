import Link from "next/link";

interface ToolCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  href: string;
}

export default function ToolCard({
  name,
  description,
  icon,
  color,
  features,
  href,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${
            color.split(" ")[1]
          }, ${color.split(" ")[3]})`,
        }}
      />

      <div className="relative p-8">
        {/* Icon and Title */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white`}
          >
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

        {/* Features */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
            <span className="font-medium">Launch Tool</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded">
            Free
          </div>
        </div>
      </div>
    </Link>
  );
}
