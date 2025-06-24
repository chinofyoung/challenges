interface ComingSoonItem {
  name: string;
  status: string;
}

interface ComingSoonSectionProps {
  items?: ComingSoonItem[];
}

export default function ComingSoonSection({
  items = [
    { name: "Color Calibration Assistant", status: "In Development" },
    { name: "GPU Thermal Monitor", status: "Planned" },
    { name: "Input Lag Tester", status: "Planned" },
  ],
}: ComingSoonSectionProps) {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold text-white mb-8">
        More Tools Coming Soon
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((tool, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {tool.name}
            </h3>
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              {tool.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
