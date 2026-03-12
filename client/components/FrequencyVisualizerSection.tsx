import { useState } from 'react';
import WaveformVisualizer from './WaveformVisualizer';
import SectionCard from './SectionCard';

interface Note {
  label: string;
  frequency: number;
  color: string;
}

const notes: Note[] = [
  { label: 'Sa', frequency: 240, color: 'rgb(139, 92, 246)' },
  { label: 'Re', frequency: 270, color: 'rgb(168, 85, 247)' },
  { label: 'Ga', frequency: 300, color: 'rgb(192, 132, 250)' },
  { label: 'Ma', frequency: 320, color: 'rgb(147, 112, 219)' },
  { label: 'Pa', frequency: 360, color: 'rgb(139, 92, 246)' },
];

export default function FrequencyVisualizerSection() {
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
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="glow-text">Musical Note Frequency Visualizer</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Click on any note button to hear its frequency and see the corresponding waveform visualization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <SectionCard>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Selected Note</h3>
                <div className="text-center p-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/30">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                    {selectedNote.label}
                  </div>
                  <div className="text-xl text-gray-300">
                    {selectedNote.frequency} Hz
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {notes.map((note) => (
                  <button
                    key={note.label}
                    onClick={() => playNote(note)}
                    className={`p-4 rounded-lg font-bold transition-all duration-300 ${
                      selectedNote.label === note.label
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                        : 'bg-purple-900/40 border border-purple-500/30 text-gray-300 hover:border-purple-500/60'
                    }`}
                  >
                    <div className="text-xl">{note.label}</div>
                    <div className="text-xs text-gray-400">{note.frequency} Hz</div>
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Waveform Pattern">
            <WaveformVisualizer
              frequency={selectedNote.frequency}
              color={selectedNote.color}
              height={200}
            />
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
