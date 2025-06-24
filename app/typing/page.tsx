"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NavigationHeader from "@/components/shared/NavigationHeader";
import PageHeader from "@/components/shared/PageHeader";
import StatisticsPanel from "@/components/shared/StatisticsPanel";
import TypingSettings from "@/components/typing/TypingSettings";
import TypingArea from "@/components/typing/TypingArea";
import WPMChart from "@/components/typing/WPMChart";
import { useTextSamples } from "@/components/typing/useTextSamples";

interface TypingStats {
  wpm: number;
  accuracy: number;
  timestamp: number;
}

interface TestResult {
  wpm: number;
  accuracy: number;
  duration: number;
  textType: string;
  timestamp: Date;
}

type TestMode = "practice" | "1min" | "3min" | "5min";
type TextType = "common" | "quotes" | "code" | "numbers";

export default function TypingTester() {
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [testMode, setTestMode] = useState<TestMode>("practice");
  const [textType, setTextType] = useState<TextType>("common");
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentWPM, setCurrentWPM] = useState(0);
  const [currentAccuracy, setCurrentAccuracy] = useState(100);
  const [wpmHistory, setWpmHistory] = useState<TypingStats[]>([]);
  const [results, setResults] = useState<TestResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { getRandomText } = useTextSamples();

  // Initialize test
  const initializeTest = useCallback(() => {
    const text = getRandomText(textType);
    setCurrentText(text);
    setUserInput("");
    setStartTime(null);
    setIsActive(false);
    setIsFinished(false);
    setCurrentWPM(0);
    setCurrentAccuracy(100);
    setWpmHistory([]);

    if (testMode !== "practice") {
      const duration =
        testMode === "1min" ? 60 : testMode === "3min" ? 180 : 300;
      setTimeLeft(duration);
    }
  }, [testMode, textType, getRandomText]);

  // Start test
  const startTest = () => {
    setStartTime(Date.now());
    setIsActive(true);
    inputRef.current?.focus();
  };

  // Calculate WPM and accuracy
  const calculateStats = useCallback(() => {
    if (!startTime) return;

    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    const charactersTyped = userInput.length;
    const wpm = Math.round(charactersTyped / 5 / timeElapsed) || 0;

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentText[i]) {
        correctChars++;
      }
    }
    const accuracy =
      userInput.length > 0
        ? Math.round((correctChars / userInput.length) * 100)
        : 100;

    setCurrentWPM(wpm);
    setCurrentAccuracy(accuracy);

    // Add to WPM history for chart
    if (timeElapsed > 0.05) {
      // Only add after 3 seconds
      setWpmHistory((prev) => [
        ...prev,
        {
          wpm,
          accuracy,
          timestamp: Date.now() - startTime,
        },
      ]);
    }
  }, [startTime, userInput, currentText]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isActive && value.length === 1) {
      startTest();
    }

    setUserInput(value);

    // Check if test is complete
    if (value.length >= currentText.length) {
      finishTest();
    }
  };

  // Finish test
  const finishTest = () => {
    if (!startTime) return;

    const duration = (Date.now() - startTime) / 1000;
    const result: TestResult = {
      wpm: currentWPM,
      accuracy: currentAccuracy,
      duration,
      textType,
      timestamp: new Date(),
    };

    setResults((prev) => [...prev, result].slice(-10));
    setIsActive(false);
    setIsFinished(true);
  };

  // Timer effect for timed tests
  useEffect(() => {
    if (isActive && testMode !== "practice" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, testMode, timeLeft]);

  // Calculate stats continuously
  useEffect(() => {
    if (isActive) {
      calculateStats();
    }
  }, [userInput, isActive, calculateStats]);

  // Initialize on mount and when settings change
  useEffect(() => {
    initializeTest();
  }, [initializeTest]);

  // Calculate statistics for StatisticsPanel
  const averageWPM =
    results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length)
      : 0;

  const bestWPM =
    results.length > 0 ? Math.max(...results.map((r) => r.wpm)) : 0;

  const currentStats = [
    { label: "WPM", value: currentWPM, color: "text-blue-400" },
    {
      label: "Accuracy",
      value: `${currentAccuracy}%`,
      color: "text-green-400",
    },
    {
      label: "Progress",
      value: `${userInput.length}/${currentText.length}`,
      color: "text-white",
    },
  ];

  const historicalStats =
    results.length > 0
      ? [
          { label: "Best WPM", value: bestWPM, color: "text-green-400" },
          { label: "Average WPM", value: averageWPM, color: "text-blue-400" },
        ]
      : undefined;

  const recentResults = results
    .slice(-5)
    .reverse()
    .map((result) => ({
      label: result.textType,
      value: `${result.wpm} WPM`,
    }));

  const tips = [
    "Keep your fingers on home row",
    "Don't look at the keyboard",
    "Focus on accuracy over speed",
    "Take breaks to avoid fatigue",
    "Practice regularly for improvement",
    "Average typing speed: 40 WPM",
    "Professional goal: 70+ WPM",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <NavigationHeader />

      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Typing Speed Tester"
          description="Improve your typing speed with live WPM tracking and accuracy measurement"
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main typing area */}
          <div className="xl:col-span-3 space-y-6">
            <TypingSettings
              testMode={testMode}
              textType={textType}
              timeLeft={timeLeft}
              isActive={isActive}
              onTestModeChange={setTestMode}
              onTextTypeChange={setTextType}
              onNewText={initializeTest}
              onFocus={() => inputRef.current?.focus()}
            />

            <TypingArea
              ref={inputRef}
              currentText={currentText}
              userInput={userInput}
              isActive={isActive}
              isFinished={isFinished}
              currentWPM={currentWPM}
              currentAccuracy={currentAccuracy}
              onInputChange={handleInputChange}
            />

            <WPMChart wpmHistory={wpmHistory} />
          </div>

          {/* Statistics Panel */}
          <div className="xl:col-span-1">
            <StatisticsPanel
              title="Current Stats"
              currentStats={currentStats}
              historicalStats={historicalStats}
              recentResults={recentResults}
              onClearHistory={() => setResults([])}
              tips={tips}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
