import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SectionCard from '@/components/SectionCard';
import BeatVisualizer from '@/components/BeatVisualizer';
import GlowButton from '@/components/GlowButton';

export default function TaalRhythmLab() {
  const [isPlaying, setIsPlaying] = useState(false);

  const teentaalBeats = ['Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Dhin', 'Dhin', 'Dha', 'Na', 'Tin', 'Tin', 'Ta', 'Ta', 'Dhin', 'Dhin', 'Dha'];

  const handlePlayRhythm = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-16">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">Taal: Rhythm and Mathematical Cycles</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Rhythm in Indian classical music follows repeating beat cycles called "Taal". These cycles are mathematical in nature and provide the rhythmic foundation for all performances. The most common taal is Teentaal with 16 beats.
            </p>
          </div>

          {/* Introduction Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <SectionCard title="What is Taal?" icon="⏱️">
              <p className="text-gray-300">
                Taal is a rhythmic cycle that repeats throughout a performance. It provides a temporal framework within which improvisation takes place. Musicians mark the cycle through rhythmic patterns (theka) and count to stay synchronized.
              </p>
            </SectionCard>

            <SectionCard title="Mathematical Precision" icon="🔢">
              <p className="text-gray-300">
                Each taal is constructed with mathematical precision. The beats are divided into cycles, and the duration of each cycle is exact. This allows multiple musicians to improvise together while maintaining perfect synchronization.
              </p>
            </SectionCard>
          </div>

          {/* Teentaal Section */}
          <SectionCard className="mb-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Teentaal – 16 Beats</h3>
                <p className="text-gray-300 mb-6">
                  Teentaal is the most fundamental and commonly used rhythm cycle in Hindustani classical music. It consists of 16 beats arranged in 4 cycles of 4 beats each, making it mathematically elegant and rhythmically balanced.
                </p>
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

              <div className="pt-6 border-t border-purple-500/30">
                <h4 className="text-white font-semibold mb-3">Beat Patterns</h4>
                <p className="text-gray-300 text-sm mb-4">
                  The syllables (bols) used in Teentaal are: Dha Dhin Dhin Dha (first cycle), Dha Dhin Dhin Dha (second cycle), Na Tin Tin Ta (third cycle), Ta Dhin Dhin Dha (fourth cycle).
                </p>
                <p className="text-gray-300 text-sm">
                  The first beat is called "sam" (beginning) and marks the start of a new cycle. Musicians use this point to align their improvisations with the rhythmic structure.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Other Taals */}
          <div className="mb-16">
            <h3 className="text-white font-semibold mb-6 text-xl">Other Common Taals</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <SectionCard title="Dhamar Tal (14 Beats)" icon="📍">
                <p className="text-gray-300">
                  A 14-beat rhythm cycle divided into 7 beats + 7 beats. It is often used in the Dhamar form of vocal music and has a slightly different feel compared to Teentaal.
                </p>
              </SectionCard>

              <SectionCard title="Ektaal (12 Beats)" icon="📍">
                <p className="text-gray-300">
                  A 12-beat rhythm cycle commonly used in vocal, instrumental, and dance music. It is considered one of the most popular taals along with Teentaal.
                </p>
              </SectionCard>

              <SectionCard title="Jhaptaal (10 Beats)" icon="📍">
                <p className="text-gray-300">
                  A 10-beat rhythm cycle that creates an asymmetrical feeling. It's popular in modern Hindustani classical music and offers unique improvisational possibilities.
                </p>
              </SectionCard>

              <SectionCard title="Rupak Tal (7 Beats)" icon="📍">
                <p className="text-gray-300">
                  A 7-beat rhythm cycle that is interesting because the sam (downbeat) comes at different points relative to the typical 4-beat structure, creating complexity.
                </p>
              </SectionCard>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="grid md:grid-cols-3 gap-6">
            <SectionCard title="Theka" icon="🎼">
              <p className="text-gray-300">
                The basic pattern of syllables (bols) that defines a taal. The tabla player maintains the theka while other musicians improvise over it.
              </p>
            </SectionCard>

            <SectionCard title="Sam" icon="🎯">
              <p className="text-gray-300">
                The first beat of the rhythm cycle that marks the beginning. Musicians structure their improvisations to climax or resolve at the sam.
              </p>
            </SectionCard>

            <SectionCard title="Synchronization" icon="⏱️">
              <p className="text-gray-300">
                The mathematical nature of taals allows multiple musicians to stay perfectly synchronized despite complex improvisation and rhythmic variations.
              </p>
            </SectionCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
