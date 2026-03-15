import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SectionCard from '@/components/SectionCard';
import FrequencySlider from '@/components/FrequencySlider';
import WaveformVisualizer from '@/components/WaveformVisualizer';
import CompressionWave from '@/components/CompressionWave';
import HarmonicSpectrum from '@/components/HarmonicSpectrum';
import ResonanceAnimation from '@/components/ResonanceAnimation';
import { useSound } from '@/hooks/useSound';
import { Volume2, VolumeX, Play, Square } from 'lucide-react';

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
  const [amplitude, setAmplitude] = useState(0.5);
  const { isPlaying, playTone, stopTone, updateFrequency, updateAmplitude, analyser } = useSound();

  // Keep sound updated when sliders change if playing
  const handleFrequencyChange = (newFreq: number) => {
    setFrequency(newFreq);
    if (isPlaying) updateFrequency(newFreq);
  };

  const handleAmplitudeChange = (newAmp: number) => {
    setAmplitude(newAmp);
    if (isPlaying) updateAmplitude(newAmp);
  };

  const toggleSound = () => {
    if (isPlaying) stopTone();
    else playTone(frequency, amplitude);
  };

  const playNote = (freq: number) => {
    setFrequency(freq);
    playTone(freq, amplitude);
    // Auto-stop after 1.5 seconds for demo notes
    setTimeout(() => stopTone(), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background via-card to-background pt-16">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">The Science of Sound</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Explore the physics behind musical sound and its deep mathematical connection to Indian classical music. Discover how simple vibrations create the complex emotions we feel.
            </p>
          </div>

          {/* 2. What is Sound */}
          <div className="mb-16">
            <SectionCard title="What is Sound?">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Sound is a mechanical wave produced by vibrating objects. As an object vibrates, it pushes and pulls on the surrounding medium (usually air), creating regions of high pressure (compression) and low pressure (rarefaction).
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    These waves travel through the air until they reach our ears, where they are converted into electrical signals that our brain interprets as sound. Unlike light, sound requires a medium to travel—it cannot exist in a vacuum.
                  </p>
                </div>
                <div className="bg-black/30 p-6 rounded-xl border border-primary/20">
                  <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">Compression Wave Visualization</h4>
                  <CompressionWave frequency={frequency} amplitude={amplitude} height={120} />
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 3 & 4. Interactive Sound Lab (Frequency & Amplitude) */}
          <div className="mb-16">
            <SectionCard>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Interactive Sound Lab</h3>
                  <p style={{ color: '#EADFB5' }}>Experience how frequency and amplitude shape what we hear.</p>
                </div>
                <button
                  onClick={toggleSound}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                  }`}
                >
                  {isPlaying ? (
                    <><Square className="w-5 h-5" /> Stop Sound</>
                  ) : (
                    <><Play className="w-5 h-5" /> Play Tone</>
                  )}
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start mb-8">
                <div className="space-y-10">
                  <div>
                    <FrequencySlider
                      value={frequency}
                      onChange={handleFrequencyChange}
                      min={100}
                      max={2000}
                      step={1}
                      label="Frequency (Pitch)"
                    />
                    <p className="text-sm mt-2" style={{ color: '#EADFB5' }}>Determines how high or low the note sounds. Higher frequency = faster vibration.</p>
                  </div>
                  
                  <div>
                    <FrequencySlider
                      value={amplitude * 100}
                      onChange={(val) => handleAmplitudeChange(val / 100)}
                      min={0}
                      max={100}
                      step={1}
                      label="Amplitude (Loudness)"
                    />
                    <p className="text-sm mt-2" style={{ color: '#EADFB5' }}>Determines the volume of the sound. Larger amplitude = more energetic vibration.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/40 rounded-xl p-4 border border-primary/20">
                    <WaveformVisualizer 
                      frequency={frequency} 
                      amplitude={amplitude} 
                      color={isPlaying ? '#D4AF37' : '#8B5CF6'} 
                      height={180} 
                      analyser={analyser}
                    />
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 bg-card/40 rounded-lg border border-primary/10">
                    <span style={{ color: '#EADFB5' }}>Current Closest Note:</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-muted-foreground to-primary">
                      {getNoteLabel(frequency)}
                    </span>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 5. Musical Notes and Frequency */}

          {/* 5. Musical Notes and Frequency */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6">Indian Classical Notes (Swaras)</h3>
            <p className="text-gray-300 mb-6 max-w-3xl">
              In Indian Classical Music, the octave is divided into seven basic notes (Swaras): Sa, Re, Ga, Ma, Pa, Dha, Ni. Click any note below to hear its frequency and see its relationship to the root note (Sa).
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {[240, 270, 300, 320, 360, 400, 450, 480].map((freq) => (
                <button
                  key={freq}
                  onClick={() => playNote(freq)}
                  className={`p-4 rounded-xl font-bold transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                    frequency === freq
                      ? 'bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-105 transform border-transparent'
                      : 'bg-card/60 border border-primary/20 text-gray-300 hover:border-primary/60 hover:bg-card hover:-translate-y-1 transform'
                  }`}
                >
                  <div className="text-xl">{noteMapping[freq]}</div>
                  <div className="text-xs text-primary/80 tracking-wider">{freq} Hz</div>
                </button>
              ))}
            </div>
          </div>

          {/* 6. Harmonics and Overtones */}
          <div className="mb-16">
            <SectionCard title="Harmonics and Overtones">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    When you pluck a string on a sitar or tanpura, it doesn't just vibrate at one frequency. It vibrates at its fundamental frequency, plus a series of multiples called harmonics or overtones.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    This rich blend of frequencies is what gives an instrument its unique <span className="text-primary font-semibold">timbre</span> (tone color). Indian classical instruments are specifically designed to have extremely rich harmonic overtones.
                  </p>
                  <p className="text-sm mt-4 italic" style={{ color: '#EADFB5' }}>
                    The chart shows the harmonic spectrum for your currently selected fundamental frequency.
                  </p>
                </div>
                <div>
                  <HarmonicSpectrum baseFrequency={frequency} />
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 7 & 8. Resonance and Math */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <SectionCard title="Sympathetic Resonance" icon="🔊">
              <div className="space-y-6">
                <p className="text-gray-300">
                  Resonance occurs when one vibrating object causes another object to vibrate. Instruments like the Sitar and Sarod have "sympathetic strings"—extra strings that are never plucked, but ring out automatically when their corresponding notes are played.
                </p>
                <ResonanceAnimation isPlaying={isPlaying} frequency={frequency} />
              </div>
            </SectionCard>

            <SectionCard title="Mathematical Ratios in Music" icon="➗">
              <div className="space-y-6">
                <p className="text-gray-300">
                  The beauty of music lies in pure mathematics. Pleasant sounding intervals (consonance) have simple frequency ratios. This mathematical perfection was deeply understood in Ancient Indian texts on music.
                </p>
                
                <div className="bg-black/30 rounded-xl border border-primary/20 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-primary/20">
                      <tr>
                        <th className="px-4 py-3" style={{ color: '#F2D27A' }}>Swara</th>
                        <th className="px-4 py-3" style={{ color: '#F2D27A' }}>Ratio to Sa</th>
                        <th className="px-4 py-3" style={{ color: '#F2D27A' }}>Western Eq.</th>
                        <th className="px-4 py-3" style={{ color: '#F2D27A' }}>Consonance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10 text-gray-300">
                      <tr className="hover:bg-primary/5">
                        <td className="px-4 py-3 font-semibold text-white">Sa (Root)</td>
                        <td className="px-4 py-3 font-mono" style={{ color: '#E8D28A', fontWeight: 600 }}>1/1</td>
                        <td className="px-4 py-3">Unison</td>
                        <td className="px-4 py-3">Perfect</td>
                      </tr>
                      <tr className="hover:bg-primary/5">
                        <td className="px-4 py-3 font-semibold text-white">Pa (Fifth)</td>
                        <td className="px-4 py-3 font-mono" style={{ color: '#E8D28A', fontWeight: 600 }}>3/2</td>
                        <td className="px-4 py-3">Perfect 5th</td>
                        <td className="px-4 py-3">Highly Consonant</td>
                      </tr>
                      <tr className="hover:bg-primary/5">
                        <td className="px-4 py-3 font-semibold text-white">Ma (Fourth)</td>
                        <td className="px-4 py-3 font-mono" style={{ color: '#E8D28A', fontWeight: 600 }}>4/3</td>
                        <td className="px-4 py-3">Perfect 4th</td>
                        <td className="px-4 py-3">Consonant</td>
                      </tr>
                      <tr className="hover:bg-primary/5">
                        <td className="px-4 py-3 font-semibold text-white">Ga (Third)</td>
                        <td className="px-4 py-3 font-mono" style={{ color: '#E8D28A', fontWeight: 600 }}>5/4</td>
                        <td className="px-4 py-3">Major 3rd</td>
                        <td className="px-4 py-3">Sweet/Consonant</td>
                      </tr>
                      <tr className="hover:bg-primary/5">
                        <td className="px-4 py-3 font-semibold text-white">Re (Second)</td>
                        <td className="px-4 py-3 font-mono" style={{ color: '#E8D28A', fontWeight: 600 }}>9/8</td>
                        <td className="px-4 py-3">Major 2nd</td>
                        <td className="px-4 py-3">Mild Dissonance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 10. Connection to IKS */}
          <SectionCard title="Connection to Indian Classical Music" icon="🪷">
             <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  The Indian knowledge system (SwarVeda) views sound (Nada) as the fundamental fabric of the universe. <strong>Nada Brahma</strong> translates to "The Universe is Sound". 
                </p>
                <p className="text-gray-300 leading-relaxed">
                  While Western music moved towards "equal temperament" (slightly altering pure mathematical ratios so instruments could easily play in any key), Indian classical music retained "just intonation"—using the pure, mathematically perfect frequency ratios.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This is why a Raga played against the continuous drone of a Tanpura creates such powerful emotional resonance. The drone provides the fundamental frequency, and every note played interacts with its harmonics in mathematically predictable, emotionally potent ways.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-accent/10 p-6 rounded-2xl border border-primary/30 flex items-center justify-center min-h-48 shadow-lg">
                <div className="text-center">
                  <img src="/om.png" alt="Om" className="w-12 h-12 mb-4 mx-auto object-contain drop-shadow-[0_0_8px_rgba(242,210,122,0.6)]" />
                  <h4 className="text-xl font-bold text-white mb-2">Nada Brahma</h4>
                  <p style={{ color: '#F5E6C8', fontSize: '1rem', opacity: 0.95 }}>Sound is creation</p>
                </div>
              </div>
            </div>
          </SectionCard>


        </div>
      </section>

      <Footer />
    </div>
  );
}
