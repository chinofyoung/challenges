"use client";

import { forwardRef } from "react";

interface TypingAreaProps {
  currentText: string;
  userInput: string;
  isActive: boolean;
  isFinished: boolean;
  currentWPM: number;
  currentAccuracy: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TypingArea = forwardRef<HTMLInputElement, TypingAreaProps>(
  (
    {
      currentText,
      userInput,
      isActive,
      isFinished,
      currentWPM,
      currentAccuracy,
      onInputChange,
    },
    ref
  ) => {
    // Get character styling
    const getCharacterStyle = (index: number) => {
      if (index >= userInput.length) {
        return "text-gray-400"; // Not typed yet
      }

      return userInput[index] === currentText[index]
        ? "text-green-400 bg-green-900/20" // Correct
        : "text-red-400 bg-red-900/20"; // Incorrect
    };

    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <div className="text-xl leading-relaxed font-mono mb-4 min-h-[120px] p-4 bg-black/20 rounded-lg">
          {currentText.split("").map((char, index) => (
            <span key={index} className={getCharacterStyle(index)}>
              {char}
            </span>
          ))}
          {userInput.length < currentText.length && (
            <span className="bg-blue-500 animate-pulse">|</span>
          )}
        </div>

        <input
          ref={ref}
          type="text"
          value={userInput}
          onChange={onInputChange}
          placeholder={isActive ? "Keep typing..." : "Start typing to begin..."}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-lg font-mono placeholder-gray-400 focus:outline-none focus:border-blue-400"
          disabled={isFinished}
          autoComplete="off"
          spellCheck={false}
        />

        {isFinished && (
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              Test Complete!
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm text-gray-300">Final WPM</div>
                <div className="text-xl font-bold text-white">{currentWPM}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm text-gray-300">Accuracy</div>
                <div className="text-xl font-bold text-white">
                  {currentAccuracy}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

TypingArea.displayName = "TypingArea";

export default TypingArea;
