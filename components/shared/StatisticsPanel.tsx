interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface RecentResult {
  label: string;
  value: string | number;
}

interface StatisticsPanelProps {
  title: string;
  currentStats: StatItem[];
  historicalStats?: StatItem[];
  recentResults?: RecentResult[];
  onClearHistory?: () => void;
  tips?: string[];
}

export default function StatisticsPanel({
  title,
  currentStats,
  historicalStats,
  recentResults,
  onClearHistory,
  tips,
}: StatisticsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Current Stats */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>

        <div className="space-y-4">
          {currentStats.map((stat, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4">
              <div className="text-sm text-gray-300">{stat.label}</div>
              <div
                className={`text-3xl font-bold ${stat.color || "text-white"}`}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Stats */}
      {historicalStats && historicalStats.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Your Records
          </h3>

          <div className="space-y-4">
            {historicalStats.map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <div className="text-sm text-gray-300">{stat.label}</div>
                <div
                  className={`text-2xl font-bold ${stat.color || "text-white"}`}
                >
                  {stat.value}
                </div>
              </div>
            ))}

            {recentResults && recentResults.length > 0 && (
              <div>
                <div className="text-sm text-gray-300 mb-2">Recent Results</div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {recentResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm bg-white/10 rounded px-2 py-1"
                    >
                      <span className="text-gray-300">{result.label}</span>
                      <span className="text-white">{result.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {onClearHistory && (
              <button
                onClick={onClearHistory}
                className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Clear History
              </button>
            )}
          </div>
        </div>
      )}

      {/* No Data State */}
      {(!historicalStats || historicalStats.length === 0) && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Your Records
          </h3>
          <div className="text-center text-gray-400">
            <div className="text-sm">No results yet</div>
            <div className="text-xs mt-1">
              Complete a test to see your stats
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      {tips && tips.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Tips</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            {tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
