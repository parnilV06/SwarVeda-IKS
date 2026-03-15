import React from 'react';

interface HarmonicSpectrumProps {
  baseFrequency: number;
}

export default function HarmonicSpectrum({ baseFrequency }: HarmonicSpectrumProps) {
  const harmonics = [
    { multiplier: 1, name: 'Fundamental (f)', intensity: 100 },
    { multiplier: 2, name: '2nd Harmonic (2f)', intensity: 50 },
    { multiplier: 3, name: '3rd Harmonic (3f)', intensity: 30 },
    { multiplier: 4, name: '4th Harmonic (4f)', intensity: 15 },
    { multiplier: 5, name: '5th Harmonic (5f)', intensity: 10 },
  ];

  return (
    <div className="w-full bg-card/30 p-6 rounded-lg border border-primary/20">
      <div className="relative h-48 flex items-end mb-8 border-b border-primary/40 pb-6 gap-2">
        {harmonics.map((harmonic, idx) => {
          const freq = Math.round(baseFrequency * harmonic.multiplier);
          
          return (
            <div key={idx} className="relative flex flex-col items-center flex-1 group h-full justify-end">
              {/* Tooltip on hover */}
              <div 
                className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 py-1 px-2 rounded -translate-y-8 whitespace-nowrap z-10 border border-primary/30 pointer-events-none"
                style={{ color: '#F5E6B3', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.5)', fontSize: '0.85rem' }}
              >
                {freq} Hz
              </div>
              
              {/* Bar */}
              <div 
                className="w-full max-w-[48px] bg-gradient-to-t from-primary/40 to-primary rounded-t-sm transition-all duration-300 ease-in-out group-hover:from-primary/60 group-hover:to-accent shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                style={{ height: `${harmonic.intensity}%` }}
              />
              
              {/* Label Below */}
              <div 
                className="absolute -bottom-6 text-xs font-semibold"
                style={{ color: '#EADFB5' }}
              >
                {harmonic.multiplier === 1 ? 'f' : `${harmonic.multiplier}f`}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 space-y-2">
        {harmonics.map((h, i) => (
          <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-1">
            <span style={{ color: '#EADFB5' }}>{h.name}:</span>
            <span className="font-semibold" style={{ color: '#E8D28A', textShadow: '0 0 6px rgba(255,215,130,0.3)' }}>
              {Math.round(baseFrequency * h.multiplier)} Hz
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
