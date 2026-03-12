import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SectionCard from '@/components/SectionCard';
import GlowButton from '@/components/GlowButton';

interface Raga {
  name: string;
  mood: string;
  time: string;
  description: string;
  arohana: string;
  avarohana: string;
}

const ragas: Raga[] = [
  {
    name: 'Raga Yaman',
    mood: 'Calm and devotional',
    time: 'Evening',
    description: 'Raga Yaman is one of the most popular ragas in Hindustani classical music. It evokes a sense of calm devotion and is believed to be auspicious for all occasions.',
    arohana: 'Sa Re Ga Ma Pa Dha Ni Sa',
    avarohana: 'Sa Ni Dha Pa Ma Ga Re Sa',
  },
  {
    name: 'Raga Bhairav',
    mood: 'Serious and peaceful',
    time: 'Morning',
    description: 'Raga Bhairav is performed in the early morning and is known for its serious, meditative quality. It has a mysterious and devotional character.',
    arohana: 'Sa Re Ga Ma Pa Dha Ni Sa',
    avarohana: 'Sa Ni Dha Pa Ma Ga Re Sa',
  },
  {
    name: 'Raga Bhupali',
    mood: 'Joyful and uplifting',
    time: 'Afternoon',
    description: 'Raga Bhupali is a simple yet elegant raga that creates an uplifting and pleasant atmosphere. It is one of the pentatonic ragas without the 4th and 7th notes.',
    arohana: 'Sa Re Ga Pa Dha Sa',
    avarohana: 'Sa Dha Pa Ga Re Sa',
  },
  {
    name: 'Raga Malhar',
    mood: 'Monsoon and devotional',
    time: 'Rainy season',
    description: 'Raga Malhar is traditionally performed during the monsoon season. It has a soothing, cool quality that mirrors the rainy weather and brings out feelings of romance.',
    arohana: 'Sa Re Ma Pa Ni Sa',
    avarohana: 'Sa Ni Dha Pa Ma Re Sa',
  },
];

export default function RagaExplorer() {
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
    <div className="min-h-screen w-full bg-gradient-to-b from-background via-card to-background pt-16">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">Raga Explorer</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              A raga is a melodic framework in Indian classical music constructed from specific notes. Each raga has its own unique characteristics, emotional content, and prescribed time of performance. Ragas represent the foundation of Indian classical music improvisation.
            </p>
          </div>

          {/* Ragas Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {ragas.map((raga, index) => (
              <SectionCard key={index} className="flex flex-col">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground mb-4">
                  {raga.name}
                </h3>
                
                <p className="text-gray-300 mb-6 flex-1">
                  {raga.description}
                </p>

                <div className="space-y-3 mb-6 border-t border-primary/30 pt-4">
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

          {/* Understanding Ragas */}
          <SectionCard title="Understanding Raga Scales" className="mb-12">
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-3 text-lg">Arohana (Ascending Scale)</h4>
                <p className="text-gray-300">
                  The ascending pattern of notes in a raga, showing the progression from lower to higher notes. This is the sequence used when ascending in pitch. For example, in Raga Yaman, the ascending scale is Sa Re Ga Ma Pa Dha Ni Sa.
                </p>
              </div>
              <div className="border-t border-primary/30 pt-6">
                <h4 className="text-white font-semibold mb-3 text-lg">Avarohana (Descending Scale)</h4>
                <p className="text-gray-300">
                  The descending pattern of notes in a raga, returning from higher to lower notes. This is often different from the ascending pattern, adding complexity and uniqueness to each raga's character.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Key Concepts */}
          <div className="grid md:grid-cols-2 gap-6">
            <SectionCard title="Vadi and Samvadi" icon="🎼">
              <p className="text-gray-300">
                Each raga has important notes called Vadi (dominant note) and Samvadi (subdominant note). These notes define the character and mood of the raga and are emphasized during performance.
              </p>
            </SectionCard>

            <SectionCard title="Time and Season" icon="⏰">
              <p className="text-gray-300">
                Ragas are traditionally assigned to specific times of day and seasons. This practice is believed to align the performance with the natural rhythms and moods of different periods.
              </p>
            </SectionCard>

            <SectionCard title="Improvisation Framework" icon="🎨">
              <p className="text-gray-300">
                Ragas provide a framework for improvisation rather than a fixed composition. Musicians explore the raga's character while staying within its melodic and rhythmic rules.
              </p>
            </SectionCard>

            <SectionCard title="Emotional Resonance" icon="💫">
              <p className="text-gray-300">
                Each raga is designed to evoke specific emotions and states of consciousness. The choice of notes and their relationships create a unique emotional landscape for listeners.
              </p>
            </SectionCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
