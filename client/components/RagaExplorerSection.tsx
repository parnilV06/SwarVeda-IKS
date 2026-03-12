import { useState } from 'react';
import SectionCard from './SectionCard';
import GlowButton from './GlowButton';

interface Raga {
  name: string;
  mood: string;
  time: string;
  arohana: string;
  avarohana: string;
}

const ragas: Raga[] = [
  {
    name: 'Raga Yaman',
    mood: 'Calm and devotional',
    time: 'Evening',
    arohana: 'Sa Re Ga Ma Pa Dha Ni Sa',
    avarohana: 'Sa Ni Dha Pa Ma Ga Re Sa',
  },
  {
    name: 'Raga Bhairav',
    mood: 'Serious and peaceful',
    time: 'Morning',
    arohana: 'Sa Re Ga Ma Pa Dha Ni Sa',
    avarohana: 'Sa Ni Dha Pa Ma Ga Re Sa',
  },
  {
    name: 'Raga Bhupali',
    mood: 'Joyful and uplifting',
    time: 'Afternoon',
    arohana: 'Sa Re Ga Pa Dha Sa',
    avarohana: 'Sa Dha Pa Ga Re Sa',
  },
];

export default function RagaExplorerSection() {
  const [playingRaga, setPlayingRaga] = useState<string | null>(null);

  const handlePlayRaga = (ragaName: string) => {
    setPlayingRaga(playingRaga === ragaName ? null : ragaName);
    // Create a simple tone using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440;
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-background/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="glow-text">Raga Explorer</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A raga is a melodic framework used in Indian classical music built from specific notes. Each raga has unique emotional qualities and is traditionally performed at specific times.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ragas.map((raga, index) => (
            <SectionCard key={index} className="flex flex-col">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground mb-3">
                {raga.name}
              </h3>
              
              <div className="space-y-3 mb-6 flex-1">
                <div>
                  <span className="text-gray-400 text-sm">Mood:</span>
                  <p className="text-white font-semibold">{raga.mood}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Best Time:</span>
                  <p className="text-white font-semibold">{raga.time}</p>
                </div>
              </div>

              <GlowButton
                onClick={() => handlePlayRaga(raga.name)}
                variant={playingRaga === raga.name ? 'primary' : 'secondary'}
                className="w-full"
              >
                {playingRaga === raga.name ? '⏸ Stop' : '▶ Play'}
              </GlowButton>
            </SectionCard>
          ))}
        </div>

        <SectionCard title="Understanding Raga Scales" className="max-w-3xl mx-auto">
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-semibold mb-2">Arohana (Ascending Scale)</h4>
              <p className="text-gray-300">The ascending pattern of notes in a raga, showing the progression from lower to higher notes.</p>
            </div>
            <div className="border-t border-primary/30 pt-4">
              <h4 className="text-white font-semibold mb-2">Avarohana (Descending Scale)</h4>
              <p className="text-gray-300">The descending pattern of notes in a raga, returning from higher to lower notes, often different from the ascending pattern.</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </section>
  );
}
