"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

type GameMode = "click" | "spacebar" | "arrow-keys" | "color-match";
type GameState = "waiting" | "ready" | "active" | "result";

interface ReactionResult {
  time: number;
  mode: GameMode;
  timestamp: Date;
}

export default function ReactionTimeTester() {
  const [gameMode, setGameMode] = useState<GameMode>("click");
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [results, setResults] = useState<ReactionResult[]>([]);
  const [currentColor, setCurrentColor] = useState<string>("#ff0000");
  const [targetColor, setTargetColor] = useState<string>("#00ff00");
  const [countdown, setCountdown] = useState<number>(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Calculate average reaction time
  const averageTime =
    results.length > 0
      ? results.reduce((sum, result) => sum + result.time, 0) / results.length
      : 0;

  // Best reaction time
  const bestTime =
    results.length > 0 ? Math.min(...results.map((r) => r.time)) : 0;

  // Start game with random delay
  const startGame = useCallback(() => {
    setGameState("ready");
    const delay = Math.random() * 3000 + 1000; // 1-4 seconds

    if (gameMode === "color-match") {
      const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
      setCurrentColor(colors[Math.floor(Math.random() * colors.length)]);
      setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    }

    setTimeout(() => {
      setGameState("active");
      setStartTime(performance.now());

      if (gameMode === "color-match") {
        setCurrentColor(targetColor);
      }
    }, delay);
  }, [gameMode, targetColor]);

  // Handle reaction
  const handleReaction = useCallback(() => {
    if (gameState !== "active") return;

    const endTime = performance.now();
    const reactionMs = endTime - startTime;

    setReactionTime(reactionMs);
    setGameState("result");

    const newResult: ReactionResult = {
      time: reactionMs,
      mode: gameMode,
      timestamp: new Date(),
    };

    setResults((prev) => [...prev, newResult].slice(-10)); // Keep last 10 results
  }, [gameState, startTime, gameMode]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameMode === "spacebar" && e.code === "Space") {
        e.preventDefault();
        handleReaction();
      } else if (
        gameMode === "arrow-keys" &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)
      ) {
        e.preventDefault();
        handleReaction();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [gameMode, handleReaction]);

  // Reset game
  const resetGame = () => {
    setGameState("waiting");
    setReactionTime(0);
  };

  // Get reaction time rating
  const getReactionRating = (time: number) => {
    if (time < 200) return { rating: "Superhuman", color: "text-purple-500" };
    if (time < 250) return { rating: "Excellent", color: "text-green-500" };
    if (time < 300) return { rating: "Good", color: "text-blue-500" };
    if (time < 400) return { rating: "Average", color: "text-yellow-500" };
    return { rating: "Needs Practice", color: "text-red-500" };
  };

  const modes = [
    {
      id: "click" as GameMode,
      name: "Click Test",
      description: "Click when the screen changes",
    },
    {
      id: "spacebar" as GameMode,
      name: "Spacebar Test",
      description: "Press spacebar when ready",
    },
    {
      id: "arrow-keys" as GameMode,
      name: "Arrow Keys",
      description: "Press any arrow key",
    },
    {
      id: "color-match" as GameMode,
      name: "Color Match",
      description: "React when colors match",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-8">
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
          Back to Tools
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Reaction Time Tester
          </h1>
          <p className="text-lg text-gray-300">
            Test and improve your reaction speed with different challenges
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              {/* Mode Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Game Mode
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setGameMode(mode.id);
                        resetGame();
                      }}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        gameMode === mode.id
                          ? "bg-blue-600 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-xs opacity-80">
                        {mode.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Area */}
              <div
                ref={gameAreaRef}
                className={`relative h-64 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  gameState === "active"
                    ? gameMode === "color-match"
                      ? ""
                      : "bg-green-500 border-green-400"
                    : gameState === "ready"
                    ? "bg-red-500/20 border-red-400"
                    : "bg-white/5"
                }`}
                style={
                  gameState === "active" && gameMode === "color-match"
                    ? { backgroundColor: currentColor }
                    : {}
                }
                onClick={gameMode === "click" ? handleReaction : undefined}
              >
                {gameState === "waiting" && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      Ready?
                    </div>
                    <button
                      onClick={startGame}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Start Test
                    </button>
                  </div>
                )}

                {gameState === "ready" && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      Get Ready...
                    </div>
                    <div className="text-sm text-gray-300 mt-2">
                      {gameMode === "click" &&
                        "Click when the area turns green"}
                      {gameMode === "spacebar" && "Press SPACEBAR when ready"}
                      {gameMode === "arrow-keys" &&
                        "Press any ARROW KEY when ready"}
                      {gameMode === "color-match" &&
                        `Click when the color matches ${targetColor}`}
                    </div>
                  </div>
                )}

                {gameState === "active" && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">NOW!</div>
                    {gameMode === "color-match" && (
                      <div className="text-sm text-white/80 mt-2">
                        Colors match!
                      </div>
                    )}
                  </div>
                )}

                {gameState === "result" && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {reactionTime.toFixed(0)}ms
                    </div>
                    <div
                      className={`text-lg font-medium mb-4 ${
                        getReactionRating(reactionTime).color
                      }`}
                    >
                      {getReactionRating(reactionTime).rating}
                    </div>
                    <button
                      onClick={startGame}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mr-3"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={resetGame}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Statistics
              </h3>

              {results.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-gray-300">Average Time</div>
                    <div className="text-2xl font-bold text-white">
                      {averageTime.toFixed(0)}ms
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-gray-300">Best Time</div>
                    <div className="text-2xl font-bold text-green-400">
                      {bestTime.toFixed(0)}ms
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-300 mb-2">
                      Recent Results
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {results
                        .slice(-5)
                        .reverse()
                        .map((result, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-300">{result.mode}</span>
                            <span className="text-white">
                              {result.time.toFixed(0)}ms
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setResults([])}
                    className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Clear History
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <div className="text-sm">No results yet</div>
                  <div className="text-xs mt-1">
                    Complete a test to see your stats
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Tips</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Stay focused and avoid distractions</li>
                <li>• Keep your hand/finger ready</li>
                <li>• Practice regularly to improve</li>
                <li>• Average human reaction: 200-300ms</li>
                <li>• Pro gamers average: 150-200ms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
