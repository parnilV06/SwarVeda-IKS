import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SectionCard from '@/components/SectionCard';
import WaveformVisualizer from '@/components/WaveformVisualizer';

interface Note {
  label: string;
  frequency: number;
  color: string;
  swaraName: string;
}

const notes: Note[] = [
  { label: 'Sa', frequency: 240, color: 'rgb(139, 92, 246)', swaraName: 'Shadja' },
  { label: 'Re', frequency: 270, color: 'rgb(168, 85, 247)', swaraName: 'Rishab' },
  { label: 'Ga', frequency: 300, color: 'rgb(192, 132, 250)', swaraName: 'Gandhar' },
  { label: 'Ma', frequency: 320, color: 'rgb(147, 112, 219)', swaraName: 'Madhyam' },
  { label: 'Pa', frequency: 360, color: 'rgb(139, 92, 246)', swaraName: 'Pancham' },
  { label: 'Dha', frequency: 400, color: 'rgb(168, 85, 247)', swaraName: 'Dhaivat' },
  { label: 'Ni', frequency: 450, color: 'rgb(192, 132, 250)', swaraName: 'Nishad' },
  { label: 'Sa (H)', frequency: 480, color: 'rgb(139, 92, 246)', swaraName: 'Shadja (High)' },
];

export default function FrequencyVisualizer() {
  const [selectedNote, setSelectedNote] = useState<Note>(notes[0]);

  const playNote = (note: Note) => {
    setSelectedNote(note);
    // Create a simple tone using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = note.frequency;
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
              <span className="glow-text">Musical Note Frequency Visualizer</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Explore the seven fundamental notes (swaras) of Indian classical music. Click on any note to hear its frequency and watch the corresponding waveform visualization. Each note has a unique frequency that creates its distinctive pitch.
            </p>
          </div>

          {/* Main Interactive Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
            {/* Left Side - Controls */}
            <SectionCard>
              <div className="space-y-8">
                {/* Selected Note Display */}
                <div>
                  <h3 className="text-white font-semibold mb-4">Selected Note</h3>
                  <div className="text-center p-8 bg-gradient-to-r from-background/40 to-background/40 rounded-lg border border-primary/30">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-muted-foreground to-primary mb-3">
                      {selectedNote.label}
                    </div>
                    <div className="text-xl text-gray-300 mb-2">
                      {selectedNote.frequency} Hz
                    </div>
                    <div className="text-sm text-gray-400">
                      {selectedNote.swaraName}
                    </div>
                  </div>
                </div>

                {/* Note Buttons Grid */}
                <div>
                  <h3 className="text-white font-semibold mb-4">Swaras (Notes)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {notes.map((note) => (
                      <button
                        key={note.label}
                        onClick={() => playNote(note)}
                        className={`p-4 rounded-lg font-bold transition-all duration-300 ${
                          selectedNote.label === note.label
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50'
                            : 'bg-card/40 border border-primary/30 text-gray-300 hover:border-primary/60'
                        }`}
                      >
                        <div className="text-lg">{note.label}</div>
                        <div className="text-xs text-gray-400">{note.frequency} Hz</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Right Side - Waveform */}
            <SectionCard title="Waveform Pattern">
              <p className="text-gray-300 mb-6">
                This animation shows the sound wave pattern for the selected note. Higher frequencies create more waves per second, resulting in a higher pitch.
              </p>
              <WaveformVisualizer
                frequency={selectedNote.frequency}
                color={selectedNote.color}
                height={200}
              />
            </SectionCard>
          </div>

          {/* Information Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <SectionCard title="Understanding Frequencies" icon="📊">
              <div className="space-y-4 text-gray-300">
                <p>
                  Frequency determines the pitch of a note. It's measured in Hertz (Hz), representing the number of vibrations per second.
                </p>
                <p className="text-sm">
                  • Lower frequencies (200-300 Hz) = Lower pitches<br/>
                  • Higher frequencies (400-500 Hz) = Higher pitches
                </p>
              </div>
            </SectionCard>

            <SectionCard title="The Seven Swaras" icon="🎵">
              <div className="space-y-2 text-gray-300 text-sm">
                <p><strong>Sa (Shadja)</strong> - The root note, foundation of all music</p>
                <p><strong>Re (Rishab)</strong> - Second note, creates intervals</p>
                <p><strong>Ga (Gandhar)</strong> - Third note, adds color and emotion</p>
                <p><strong>Ma (Madhyam)</strong> - Fourth note, creates consonance or dissonance</p>
              </div>
            </SectionCard>

            <SectionCard title="Octaves and Registers" icon="🎼">
              <p className="text-gray-300">
                The same note can be played at different octaves (higher or lower). Notice how "Sa (H)" at 480 Hz has the same label as "Sa" at 240 Hz, but at a higher pitch due to doubled frequency.
              </p>
            </SectionCard>

            <SectionCard title="Harmonics and Timbre" icon="✨">
              <p className="text-gray-300">
                Every musical instrument produces not just the fundamental frequency but also harmonics - additional frequencies that create the unique timbre or "color" of the instrument.
              </p>
            </SectionCard>
          </div>

          {/* Note Details Table */}
          <SectionCard title="Complete Note Reference">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-primary/30">
                    <th className="text-left py-2 px-4">Note</th>
                    <th className="text-left py-2 px-4">Swara (Sanskrit)</th>
                    <th className="text-left py-2 px-4">Frequency</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note) => (
                    <tr key={note.label} className="border-b border-primary/20 hover:bg-card/20 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">{note.label}</td>
                      <td className="py-3 px-4">{note.swaraName}</td>
                      <td className="py-3 px-4">{note.frequency} Hz</td>
                      <td className="py-3 px-4 text-xs text-gray-400">
                        {note.frequency < 300 ? 'Lower range' : note.frequency < 400 ? 'Middle range' : 'Higher range'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
