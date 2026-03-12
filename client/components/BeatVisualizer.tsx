import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BeatVisualizerProps {
  beats: string[];
  beatsPerMeasure?: number;
  isPlaying?: boolean;
}

export default function BeatVisualizer({
  beats,
  beatsPerMeasure = 4,
  isPlaying = false,
}: BeatVisualizerProps) {
  const [currentBeat, setCurrentBeat] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setCurrentBeat(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentBeat((prev) => (prev + 1) % beats.length);
    }, 300);

    return () => clearInterval(interval);
  }, [isPlaying, beats.length]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${beatsPerMeasure}, 1fr)` }}>
        {beats.map((beat, index) => (
          <div
            key={index}
            className={cn(
              'aspect-square rounded-lg font-bold text-white flex items-center justify-center transition-all duration-300 cursor-default',
              currentBeat === index && isPlaying
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-110 shadow-lg shadow-primary/50'
                : 'bg-card/40 border border-primary/30'
            )}
          >
            <div className="text-center">
              <div className="text-sm font-semibold text-purple-300">{beat}</div>
              {currentBeat === index && isPlaying && (
                <div className="text-xs text-purple-200 mt-1">●</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
