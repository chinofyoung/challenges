"use client";

import HeroSection from "@/components/homepage/HeroSection";
import ToolCard from "@/components/homepage/ToolCard";
import ComingSoonSection from "@/components/homepage/ComingSoonSection";

export default function HomePage() {
  const tools = [
    {
      id: "screen",
      name: "OLED Screen Maintenance",
      description:
        "Protect your OLED display from burn-in with various colors and screensavers. Features fullscreen mode for comprehensive screen protection.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "from-blue-600 to-purple-600",
      features: [
        "Multiple Color Modes",
        "Animated Screensavers",
        "Fullscreen Support",
        "Hidden Controls",
      ],
      href: "/screen",
    },
    {
      id: "reaction",
      name: "Reaction Time Tester",
      description:
        "Test and improve your reaction speed with different challenges. Perfect for gamers, athletes, and anyone wanting to sharpen their reflexes.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "from-green-600 to-teal-600",
      features: [
        "Multiple Game Modes",
        "Statistics Tracking",
        "Performance Analytics",
        "Progress Monitoring",
      ],
      href: "/reaction",
    },
    {
      id: "typing",
      name: "Typing Speed Tester",
      description:
        "Improve your typing speed with live WPM tracking, accuracy measurement, and real-time performance charts. Multiple text types and test modes available.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      color: "from-orange-600 to-red-600",
      features: [
        "Live WPM Chart",
        "Accuracy Tracking",
        "Multiple Text Types",
        "Timed Tests",
      ],
      href: "/typing",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <HeroSection />

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              icon={tool.icon}
              color={tool.color}
              features={tool.features}
              href={tool.href}
            />
          ))}
        </div>

        <ComingSoonSection />

        {/* Footer */}
        <div className="mt-16 text-center border-t border-white/10 pt-8">
          <p className="text-gray-400 text-sm">
            Built for enthusiasts who invest in quality hardware. More
            professional tools coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
