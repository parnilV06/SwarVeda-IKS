import { useState } from 'react';
import FrequencySlider from './FrequencySlider';
import WaveformVisualizer from './WaveformVisualizer';
import SectionCard from './SectionCard';

const noteMapping: Record<number, string> = {
  240: 'Sa',
  270: 'Re',
  300: 'Ga',
  320: 'Ma',
  360: 'Pa',
  400: 'Dha',
  450: 'Ni',
  480: 'Sa (High)',
};

function getNoteLabel(frequency: number) {
  const closest = Object.keys(noteMapping)
    .map(Number)
    .reduce((prev, curr) => 
      Math.abs(curr - frequency) < Math.abs(prev - frequency) ? curr : prev
    );
  return noteMapping[closest] || 'Unknown';
}

export default function ScienceOfSoundSection() {
  const [frequency, setFrequency] = useState(240);

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="glow-text">The Physics of Sound</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Sound is produced by vibration. Frequency determines the pitch of a musical note, with higher frequencies producing higher pitches.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <SectionCard>
              <div className="space-y-4">
                <FrequencySlider
                  value={frequency}
                  onChange={setFrequency}
                  min={240}
                  max={480}
                  label="Frequency Slider"
                />
                <div className="pt-4 border-t border-purple-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Note:</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {getNoteLabel(frequency)}
                    </span>
                  </div>
                </div>
              </div>
            </SectionCard>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[240, 270, 300, 320, 360, 400, 450, 480].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`p-3 rounded-lg font-semibold transition-all duration-300 ${
                    frequency === freq
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-purple-900/40 border border-purple-500/30 text-gray-300 hover:border-purple-500/60'
                  }`}
                >
                  <div className="text-sm">{noteMapping[freq]}</div>
                  <div className="text-xs text-gray-400">{freq} Hz</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <SectionCard title="Waveform Visualization">
              <WaveformVisualizer frequency={frequency} color="rgb(139, 92, 246)" height={150} />
            </SectionCard>
          </div>
        </div>
      </div>
    </section>
  );
}
