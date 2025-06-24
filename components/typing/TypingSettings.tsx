type TestMode = "practice" | "1min" | "3min" | "5min";
type TextType = "common" | "quotes" | "code" | "numbers";

interface TypingSettingsProps {
  testMode: TestMode;
  textType: TextType;
  timeLeft: number;
  isActive: boolean;
  onTestModeChange: (mode: TestMode) => void;
  onTextTypeChange: (type: TextType) => void;
  onNewText: () => void;
  onFocus: () => void;
}

export default function TypingSettings({
  testMode,
  textType,
  timeLeft,
  isActive,
  onTestModeChange,
  onTextTypeChange,
  onNewText,
  onFocus,
}: TypingSettingsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Test Mode
          </label>
          <select
            value={testMode}
            onChange={(e) => onTestModeChange(e.target.value as TestMode)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            disabled={isActive}
          >
            <option value="practice">Practice</option>
            <option value="1min">1 Minute</option>
            <option value="3min">3 Minutes</option>
            <option value="5min">5 Minutes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Text Type
          </label>
          <select
            value={textType}
            onChange={(e) => onTextTypeChange(e.target.value as TextType)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            disabled={isActive}
          >
            <option value="common">Common Words</option>
            <option value="quotes">Famous Quotes</option>
            <option value="code">Code Snippets</option>
            <option value="numbers">Numbers</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onNewText}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            disabled={isActive}
          >
            New Text
          </button>
        </div>

        <div className="flex items-end">
          <button
            onClick={onFocus}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Focus Input
          </button>
        </div>
      </div>

      {/* Timer for timed tests */}
      {testMode !== "practice" && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-white">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}
    </div>
  );
}
