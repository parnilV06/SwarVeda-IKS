import { useState } from 'react';
import BeatVisualizer from './BeatVisualizer';
import GlowButton from './GlowButton';
import SectionCard from './SectionCard';

export default function TaalRhythmSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const teentaalBeats = ['Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Dhin', 'Dhin', 'Dha', 'Na', 'Tin', 'Tin', 'Ta', 'Ta', 'Dhin', 'Dhin', 'Dha'];

  const handlePlayRhythm = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="glow-text">Taal: Rhythm and Mathematical Cycles</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Rhythm in Indian music follows repeating beat cycles called "Taal". These cycles are mathematical in nature and provide the rhythmic foundation for all performances.
          </p>
        </div>

        <SectionCard className="mb-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Teentaal – 16 Beats</h3>
              <p className="text-gray-300 mb-6">The most common rhythmic cycle in Indian classical music, with 16 beats arranged in 4 cycles of 4 beats each.</p>
            </div>

            <BeatVisualizer
              beats={teentaalBeats}
              beatsPerMeasure={4}
              isPlaying={isPlaying}
            />

            <div className="flex gap-4 justify-center pt-4">
              <GlowButton onClick={handlePlayRhythm}>
                {isPlaying ? '⏸ Stop Rhythm' : '▶ Play Rhythm'}
              </GlowButton>
            </div>
          </div>
        </SectionCard>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <SectionCard title="Mathematical Pattern" icon="🔢">
            <p className="text-gray-300">
              The Teentaal is divided into cycles (vibhag) of equal duration. The mathematical precision allows musicians to improvise while maintaining rhythmic accuracy.
            </p>
          </SectionCard>
          <SectionCard title="Synchronization" icon="⏱️">
            <p className="text-gray-300">
              Multiple musicians stay synchronized by keeping track of the beat pattern, allowing for complex improvisations without losing the rhythmic framework.
            </p>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
