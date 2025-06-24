"use client";

import { useEffect, useRef } from "react";

interface TypingStats {
  wpm: number;
  accuracy: number;
  timestamp: number;
}

interface WPMChartProps {
  wpmHistory: TypingStats[];
  width?: number;
  height?: number;
}

export default function WPMChart({
  wpmHistory,
  width = 800,
  height = 300,
}: WPMChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || wpmHistory.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Set up chart parameters
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find max values
    const maxWPM = Math.max(...wpmHistory.map((d) => d.wpm), 60);
    const maxTime = Math.max(...wpmHistory.map((d) => d.timestamp));

    // Draw grid lines
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 4; i++) {
      const x = padding + (chartWidth / 4) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Draw WPM line
    if (wpmHistory.length > 1) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      ctx.beginPath();

      wpmHistory.forEach((point, index) => {
        const x = padding + (point.timestamp / maxTime) * chartWidth;
        const y = height - padding - (point.wpm / maxWPM) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw data points
      ctx.fillStyle = "#3b82f6";
      wpmHistory.forEach((point) => {
        const x = padding + (point.timestamp / maxTime) * chartWidth;
        const y = height - padding - (point.wpm / maxWPM) * chartHeight;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Draw labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px monospace";

    // Y-axis labels (WPM)
    for (let i = 0; i <= 4; i++) {
      const wpm = Math.round((maxWPM / 4) * (4 - i));
      const y = padding + (chartHeight / 4) * i + 4;
      ctx.fillText(wpm.toString(), 5, y);
    }

    // X-axis labels (time)
    for (let i = 0; i <= 4; i++) {
      const time = Math.round((maxTime / 1000 / 4) * i);
      const x = padding + (chartWidth / 4) * i - 10;
      ctx.fillText(`${time}s`, x, height - 5);
    }
  }, [wpmHistory, width, height]);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Live WPM Chart</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full h-auto border border-white/20 rounded-lg bg-black/20"
        />
        {wpmHistory.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Start typing to see your WPM chart
          </div>
        )}
      </div>
    </div>
  );
}
