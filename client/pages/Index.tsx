import { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import IntroductionSection from '@/components/IntroductionSection';
import ScienceOfSoundSection from '@/components/ScienceOfSoundSection';
import RagaExplorerSection from '@/components/RagaExplorerSection';
import TaalRhythmSection from '@/components/TaalRhythmSection';
import FrequencyVisualizerSection from '@/components/FrequencyVisualizerSection';
import ClosingSection from '@/components/ClosingSection';

export default function Index() {
  const introductionRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    introductionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section */}
      <HeroSection onExplore={handleExplore} />

      {/* Introduction Section */}
      <div ref={introductionRef}>
        <IntroductionSection />
      </div>

      {/* Science of Sound Section */}
      <ScienceOfSoundSection />

      {/* Raga Explorer Section */}
      <RagaExplorerSection />

      {/* Taal Rhythm Lab Section */}
      <TaalRhythmSection />

      {/* Frequency Visualizer Section */}
      <FrequencyVisualizerSection />

      {/* Closing Sections (Philosophy + Conclusion) */}
      <ClosingSection />

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-black/30 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="mb-2">
            SwarVeda – Exploring Raga, Rhythm and Sound
          </p>
          <p className="text-sm">
            An educational journey through the intersection of ancient knowledge systems and modern science
          </p>
        </div>
      </footer>
    </div>
  );
}
