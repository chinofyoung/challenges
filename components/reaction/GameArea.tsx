"use client";

import { forwardRef } from "react";

type GameMode = "click" | "spacebar" | "arrow-keys" | "color-match";
type GameState = "waiting" | "ready" | "active" | "result";

interface GameAreaProps {
  gameMode: GameMode;
  gameState: GameState;
  currentColor: string;
  targetColor: string;
  reactionTime: number;
  onStartTest: () => void;
  onReaction: () => void;
  onReset: () => void;
}

const GameArea = forwardRef<HTMLDivElement, GameAreaProps>(
  (
    {
      gameMode,
      gameState,
      currentColor,
      targetColor,
      reactionTime,
      onStartTest,
      onReaction,
      onReset,
    },
    ref
  ) => {
    const getReactionRating = (time: number) => {
      if (time < 200) return { rating: "Superhuman", color: "text-purple-500" };
      if (time < 250) return { rating: "Excellent", color: "text-green-500" };
      if (time < 300) return { rating: "Good", color: "text-blue-500" };
      if (time < 400) return { rating: "Average", color: "text-yellow-500" };
      return { rating: "Needs Practice", color: "text-red-500" };
    };

    return (
      <div
        ref={ref}
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
        onClick={gameMode === "click" ? onReaction : undefined}
      >
        {gameState === "waiting" && (
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">Ready?</div>
            <button
              onClick={onStartTest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Test
            </button>
          </div>
        )}

        {gameState === "ready" && (
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Get Ready...</div>
            <div className="text-sm text-gray-300 mt-2">
              {gameMode === "click" && "Click when the area turns green"}
              {gameMode === "spacebar" && "Press SPACEBAR when ready"}
              {gameMode === "arrow-keys" && "Press any ARROW KEY when ready"}
              {gameMode === "color-match" &&
                `Click when the color matches ${targetColor}`}
            </div>
          </div>
        )}

        {gameState === "active" && (
          <div className="text-center">
            <div className="text-3xl font-bold text-white">NOW!</div>
            {gameMode === "color-match" && (
              <div className="text-sm text-white/80 mt-2">Colors match!</div>
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
              onClick={onStartTest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mr-3"
            >
              Try Again
            </button>
            <button
              onClick={onReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    );
  }
);

GameArea.displayName = "GameArea";

export default GameArea;
