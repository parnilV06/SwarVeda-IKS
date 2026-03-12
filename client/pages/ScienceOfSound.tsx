import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SectionCard from '@/components/SectionCard';
import FrequencySlider from '@/components/FrequencySlider';
import WaveformVisualizer from '@/components/WaveformVisualizer';

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

export default function ScienceOfSound() {
  const [frequency, setFrequency] = useState(240);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-16">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">The Physics of Sound</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Sound is one of the fundamental phenomena in nature. Understanding how sound waves are created, how they travel, and how we perceive them is essential to understanding music.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
            <div className="space-y-6">
              <SectionCard>
                <h3 className="text-2xl font-bold text-white mb-4">What Creates Sound?</h3>
                <p className="text-gray-300 mb-4">
                  Sound is produced by vibration. When an object vibrates, it creates waves that travel through a medium (usually air) at a specific speed. These vibrations are what we perceive as sound.
                </p>
                <p className="text-gray-300">
                  In musical instruments, different vibration rates produce different pitches. A faster vibration creates a higher pitch, while a slower vibration creates a lower pitch.
                </p>
              </SectionCard>

              <SectionCard>
                <h3 className="text-2xl font-bold text-white mb-4">Frequency and Pitch</h3>
                <p className="text-gray-300 mb-4">
                  Frequency is measured in Hertz (Hz), which represents the number of vibrations per second. Higher frequency means more vibrations per second, resulting in a higher pitch.
                </p>
                <p className="text-gray-300">
                  For example, the note "Sa" in Indian classical music typically has a frequency of 240 Hz, while "Re" is around 270 Hz. The difference in frequency creates the difference in pitch we hear.
                </p>
              </SectionCard>
            </div>

            <div>
              <SectionCard title="Interactive Frequency Slider">
                <div className="space-y-6">
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
            </div>
          </div>

          {/* Note Buttons */}
          <div className="mb-12">
            <h3 className="text-white font-semibold mb-4">Indian Classical Notes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
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

          {/* Waveform Visualization */}
          <div className="mb-12">
            <SectionCard title="Waveform Visualization">
              <p className="text-gray-300 mb-6">
                As you adjust the slider above, watch how the waveform changes. A higher frequency creates more waves in the same time period.
              </p>
              <WaveformVisualizer frequency={frequency} color="rgb(139, 92, 246)" height={150} />
            </SectionCard>
          </div>

          {/* Key Concepts */}
          <div className="grid md:grid-cols-2 gap-6">
            <SectionCard title="Resonance" icon="🔊">
              <p className="text-gray-300">
                When an object vibrates at the right frequency, it can cause other objects to vibrate sympathetically. This principle is crucial in musical instruments and the human ear.
              </p>
            </SectionCard>

            <SectionCard title="Amplitude and Volume" icon="📈">
              <p className="text-gray-300">
                Amplitude refers to the height of the wave, which determines how loud the sound is. A larger amplitude means a louder sound, while a smaller amplitude means a quieter sound.
              </p>
            </SectionCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
