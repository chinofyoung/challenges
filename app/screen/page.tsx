"use client";

import { useState, useEffect, useRef } from "react";

type ScreenMode =
  | "black"
  | "white"
  | "red"
  | "green"
  | "blue"
  | "gray"
  | "moving-dots"
  | "gradient-shift";

export default function OLEDMaintenance() {
  const [currentMode, setCurrentMode] = useState<ScreenMode>("black");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHiddenExitButton, setShowHiddenExitButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle fullscreen toggle
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error attempting to exit fullscreen:", err);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle mouse movement in lower right corner for hidden exit button
  useEffect(() => {
    if (!isFullscreen) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const cornerSize = 100; // 100px corner area

      // Check if mouse is in the lower right corner
      const isInCorner =
        e.clientX >= innerWidth - cornerSize &&
        e.clientY >= innerHeight - cornerSize;

      setShowHiddenExitButton(isInCorner);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFullscreen]);

  // Get background style based on current mode
  const getBackgroundStyle = () => {
    switch (currentMode) {
      case "black":
        return { backgroundColor: "#000000" };
      case "white":
        return { backgroundColor: "#ffffff" };
      case "red":
        return { backgroundColor: "#ff0000" };
      case "green":
        return { backgroundColor: "#00ff00" };
      case "blue":
        return { backgroundColor: "#0000ff" };
      case "gray":
        return { backgroundColor: "#808080" };
      case "moving-dots":
        return {
          backgroundColor: "#000000",
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 120px 120px, 80px 80px",
          animation: "moveDots 10s linear infinite",
        };
      case "gradient-shift":
        return {
          background:
            "linear-gradient(-45deg, #1a1a1a, #2d2d2d, #1a1a1a, #404040)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
        };
      default:
        return { backgroundColor: "#000000" };
    }
  };

  const modes = [
    { id: "black" as ScreenMode, name: "Black", color: "#000000" },
    { id: "white" as ScreenMode, name: "White", color: "#ffffff" },
    { id: "red" as ScreenMode, name: "Red", color: "#ff0000" },
    { id: "green" as ScreenMode, name: "Green", color: "#00ff00" },
    { id: "blue" as ScreenMode, name: "Blue", color: "#0000ff" },
    { id: "gray" as ScreenMode, name: "Gray", color: "#808080" },
    {
      id: "moving-dots" as ScreenMode,
      name: "Moving Dots",
      color: "linear-gradient(45deg, #333, #666)",
    },
    {
      id: "gradient-shift" as ScreenMode,
      name: "Gradient Shift",
      color: "linear-gradient(45deg, #1a1a1a, #404040)",
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes moveDots {
          0% {
            background-position: 0% 50%, 100% 50%, 50% 0%;
          }
          50% {
            background-position: 100% 50%, 0% 50%, 50% 100%;
          }
          100% {
            background-position: 0% 50%, 100% 50%, 50% 0%;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        body {
          margin: 0;
          padding: 0;
          overflow: ${isFullscreen ? "hidden" : "auto"};
          cursor: ${isFullscreen ? "none" : "auto"};
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative w-screen h-screen overflow-hidden"
        style={getBackgroundStyle()}
      >
        {/* Main Content Area - Only show when not in fullscreen */}
        {!isFullscreen && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
                OLED Monitor Maintenance Tool
              </h1>
              <p className="text-lg text-gray-300 drop-shadow-md">
                Protect your OLED display from burn-in with various colors and
                screensavers
              </p>
            </div>
          </div>
        )}

        {/* Controls Panel - Only show when not in fullscreen */}
        {!isFullscreen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/70 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-3 mb-4">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCurrentMode(mode.id)}
                    className={`
                     px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                     ${
                       currentMode === mode.id
                         ? "bg-white text-black shadow-lg"
                         : "bg-white/20 text-white hover:bg-white/30"
                     }
                   `}
                    style={{
                      background:
                        currentMode === mode.id
                          ? "#ffffff"
                          : mode.color.includes("gradient")
                          ? mode.color
                          : `${mode.color}40`,
                    }}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-white/80 text-sm">
                  Current:{" "}
                  <span className="font-semibold text-white">
                    {modes.find((m) => m.id === currentMode)?.name}
                  </span>
                </div>

                {/* Fullscreen Toggle Button */}
                <button
                  onClick={toggleFullscreen}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
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
                      d="M3 7v2a3 3 0 003 3h2m0-8V2a3 3 0 013-3h2m8 0h2a3 3 0 013 3v2m0 8v2a3 3 0 01-3 3h-2m-8 0H6a3 3 0 01-3-3v-2m0-8V4a3 3 0 013-3h2"
                    />
                  </svg>
                  Enter Fullscreen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Exit Button - Only show in fullscreen when hovering lower right corner */}
        {isFullscreen && (
          <div
            className={`fixed bottom-0 right-0 w-24 h-24 transition-all duration-300 ${
              showHiddenExitButton
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{ cursor: showHiddenExitButton ? "pointer" : "none" }}
          >
            <button
              onClick={toggleFullscreen}
              className="w-full h-full bg-red-600/80 hover:bg-red-600 text-white transition-all duration-200 flex items-center justify-center rounded-tl-2xl"
              title="Exit Fullscreen (or press ESC)"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Instructions for fullscreen mode - Only show briefly when entering fullscreen */}
        {isFullscreen && !showHiddenExitButton && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 animate-pulse">
            <div className="bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-sm opacity-75">
              Press ESC or hover bottom-right corner to exit fullscreen
            </div>
          </div>
        )}
      </div>
    </>
  );
}
