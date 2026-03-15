import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SectionCard from '@/components/SectionCard';
import GlowButton from '@/components/GlowButton';
import NoteVisualizer from '@/components/NoteVisualizer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Square, Sunrise, Sun, Sunset, Moon, CloudRain, Search, Music2, Activity } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Raga {
  name: string;
  thaat: string;
  mood: string;
  time: string;
  description: string;
  arohana: string;
  avarohana: string;
  vadi: string;
  samvadi: string;
  pakad: string;
}

const ragas: Raga[] = [
  {
    name: 'Raga Yaman',
    thaat: 'Kalyan',
    mood: 'Calm and devotional',
    time: 'Evening',
    description: 'Raga Yaman is one of the most popular ragas in Hindustani classical music. It evokes a sense of calm devotion and is believed to be auspicious for all occasions.',
    arohana: 'Ni Re Ga Ma Dha Ni Sa',
    avarohana: 'Sa Ni Dha Pa Ma Ga Re Sa',
    vadi: 'Ga',
    samvadi: 'Ni',
    pakad: 'Ni Re Ga, Re Ma Ga, Pa Re, Sa'
  },
  {
    name: 'Raga Bhairav',
    thaat: 'Bhairav',
    mood: 'Serious and peaceful',
    time: 'Morning',
    description: 'Raga Bhairav is performed in the early morning and is known for its serious, meditative quality. It has a mysterious and devotional character.',
    arohana: 'Sa Re Ga Ma Pa Dha Ni Sa',
    avarohana: 'Sa Ni Dha Pa Ma Ga Re Sa',
    vadi: 'Dha',
    samvadi: 'Re',
    pakad: 'Ga Ma Dha, Dha Pa, Ga Ma Re Re Sa'
  },
  {
    name: 'Raga Bhupali',
    thaat: 'Kalyan',
    mood: 'Joyful and uplifting',
    time: 'Evening', // Adjusted to Evening traditionally
    description: 'Raga Bhupali is a simple yet elegant raga that creates an uplifting and pleasant atmosphere. It is one of the pentatonic ragas without the 4th and 7th notes.',
    arohana: 'Sa Re Ga Pa Dha Sa',
    avarohana: 'Sa Dha Pa Ga Re Sa',
    vadi: 'Ga',
    samvadi: 'Dha',
    pakad: 'Sa Re Ga, Pa Ga, Dha Pa Ga, Re Sa'
  },
  {
    name: 'Raga Malhar',
    thaat: 'Kafi',
    mood: 'Monsoon and devotional',
    time: 'Rainy season',
    description: 'Raga Malhar is traditionally performed during the monsoon season. It has a soothing, cool quality that mirrors the rainy weather and brings out feelings of romance.',
    arohana: 'Sa Re Ma Pa Ni Sa',
    avarohana: 'Sa Ni Dha Pa Ma Re Sa',
    vadi: 'Ma',
    samvadi: 'Sa',
    pakad: 'Re Ma Pa, Ni Dha Ni Sa'
  },
];

const timeIcons: Record<string, React.ReactNode> = {
  'Morning': <Sunrise className="w-5 h-5 text-yellow-500" />,
  'Afternoon': <Sun className="w-5 h-5 text-orange-500" />,
  'Evening': <Sunset className="w-5 h-5 text-orange-400" />,
  'Night': <Moon className="w-5 h-5 text-blue-300" />,
  'Rainy season': <CloudRain className="w-5 h-5 text-gray-400" />,
};

export default function RagaExplorer() {
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [thaatFilter, setThaatFilter] = useState('All');

  // Detail view state
  const [selectedRaga, setSelectedRaga] = useState<Raga | null>(null);

  // Derive unique filter options from data
  const moods = ['All', ...Array.from(new Set(ragas.map(r => r.mood)))];
  const times = ['All', ...Array.from(new Set(ragas.map(r => r.time)))];
  const thaats = ['All', ...Array.from(new Set(ragas.map(r => r.thaat)))];

  const filteredRagas = useMemo(() => {
    return ragas.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.mood.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMood = moodFilter === 'All' || r.mood === moodFilter;
      const matchesTime = timeFilter === 'All' || r.time === timeFilter;
      const matchesThaat = thaatFilter === 'All' || r.thaat === thaatFilter;
      
      return matchesSearch && matchesMood && matchesTime && matchesThaat;
    });
  }, [searchQuery, moodFilter, timeFilter, thaatFilter]);

  const handlePlayAudio = (itemName: string) => {
    setPlayingItem(playingItem === itemName ? null : itemName);
    // Create a simple tone using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = itemName.includes('Drone') ? 220 : 440;
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background via-card to-background pt-16">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex flex-col items-center text-center">
            {/* Using the new downloaded logo asset */}
            <img 
              src="/assets/music-logo.png" 
              alt="Music Logo" 
              className="w-24 h-24 mb-6 rounded-full opacity-90 object-cover border-4 border-primary/20"
              onError={(e) => {
                 // Fallback if the logo fails to load
                 (e.target as HTMLImageElement).style.display = 'none';
              }} 
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">Raga Explorer</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              A raga is a melodic framework in Indian classical music constructed from specific notes. Each raga has its own unique characteristics, emotional content, and prescribed time of performance. Ragas represent the foundation of Indian classical music improvisation.
            </p>
          </div>

          {/* Search and Filters Section */}
          <SectionCard className="mb-12 p-6 flex flex-col md:flex-row gap-4 items-end bg-card/60">
            <div className="w-full md:w-1/3">
              <label className="text-sm text-gray-400 mb-2 block">Search Ragas</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or mood..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background/50 border-input text-foreground font-medium"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/5">
              <label className="text-sm text-gray-400 mb-2 block">Thaat / Scale</label>
              <Select value={thaatFilter} onValueChange={setThaatFilter}>
                <SelectTrigger className="bg-background/50 border-input font-medium text-foreground">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {thaats.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/5">
              <label className="text-sm text-gray-400 mb-2 block">Time of Day</label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="bg-background/50 border-input font-medium text-foreground">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {times.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/5">
              <label className="text-sm text-gray-400 mb-2 block">Mood</label>
              <Select value={moodFilter} onValueChange={setMoodFilter}>
                <SelectTrigger className="bg-background/50 border-input font-medium text-foreground">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </SectionCard>

          {/* Ragas Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredRagas.length > 0 ? filteredRagas.map((raga, index) => (
              <SectionCard key={index} className="flex flex-col h-full bg-card shadow-lg shadow-black/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground">
                    {raga.name}
                  </h3>
                  <div title={raga.time}>
                    {timeIcons[raga.time]}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-6 flex-1 line-clamp-3">
                  {raga.description}
                </p>

                <div className="space-y-2 mb-6 border-t border-primary/20 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mood:</span>
                    <span className="text-white font-medium text-right">{raga.mood}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Thaat:</span>
                    <span className="text-white font-medium text-right">{raga.thaat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pakad:</span>
                    <span className="text-primary font-medium text-right line-clamp-1" title={raga.pakad}>{raga.pakad}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <GlowButton
                    onClick={() => handlePlayAudio(raga.name)}
                    variant={playingItem === raga.name ? 'secondary' : 'primary'}
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm"
                  >
                    {playingItem === raga.name ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    {playingItem === raga.name ? 'Stop' : 'Play'}
                  </GlowButton>
                  <GlowButton
                    onClick={() => setSelectedRaga(raga)}
                    variant="secondary"
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm bg-background hover:bg-background/80"
                  >
                    Explore More
                  </GlowButton>
                </div>
              </SectionCard>
            )) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No ragas match your current filters.
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-12 gap-6 mb-16">
            {/* Frequency Science Section (Span 7) */}
            <SectionCard title="Frequency Science & Consonance" icon={<Activity className="text-primary" />} className="md:col-span-7">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Indian Classical Music is deeply rooted in vibrational mathematics. Musical notes (Swaras) have specific frequency ratios with the base note (Sa), creating perfect consonance and resonance.
              </p>
              
              <div className="bg-background/50 rounded-lg p-5 border border-primary/10">
                <h4 className="text-white font-semibold mb-4 border-b border-primary/20 pb-2">Mathematical Harmony</h4>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="bg-card/80 p-3 rounded-md border border-primary/20">
                    <span className="block text-primary font-bold text-lg mb-1">Sa</span>
                    <span className="block text-gray-400 text-xs mb-1">Base</span>
                    <span className="text-white">240 Hz</span>
                  </div>
                  <div className="bg-card/80 p-3 rounded-md border border-primary/20">
                    <span className="block text-primary font-bold text-lg mb-1">Re</span>
                    <span className="block text-gray-400 text-xs mb-1">Ratio 9/8</span>
                    <span className="text-white">270 Hz</span>
                  </div>
                  <div className="bg-card/80 p-3 rounded-md border border-primary/20">
                    <span className="block text-primary font-bold text-lg mb-1">Ga</span>
                    <span className="block text-gray-400 text-xs mb-1">Ratio 5/4</span>
                    <span className="text-white">300 Hz</span>
                  </div>
                  <div className="bg-card/80 p-3 rounded-md border border-primary/20">
                    <span className="block text-primary font-bold text-lg mb-1">Ma</span>
                    <span className="block text-gray-400 text-xs mb-1">Ratio 4/3</span>
                    <span className="text-white">320 Hz</span>
                  </div>
                  <div className="bg-card/80 p-3 rounded-md border border-primary/20">
                    <span className="block text-primary font-bold text-lg mb-1">Pa</span>
                    <span className="block text-gray-400 text-xs mb-1">Ratio 3/2</span>
                    <span className="text-white">360 Hz</span>
                  </div>
                  <div className="bg-card/80 p-3 rounded-md border border-primary/20">
                    <span className="block text-primary font-bold text-lg mb-1">Dha</span>
                    <span className="block text-gray-400 text-xs mb-1">Ratio 5/3</span>
                    <span className="text-white">400 Hz</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Audio Demonstrations (Span 5) */}
            <SectionCard title="Audio Demonstrations" icon={<Music2 className="text-primary" />} className="md:col-span-5">
              <p className="text-gray-300 mb-6 text-sm">
                Experience the foundational elements of a raga performance through these audio demonstrations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-background/50 p-3 rounded-lg border border-primary/10">
                  <div>
                    <h5 className="text-white font-medium">Tanpura Drone</h5>
                    <p className="text-xs text-gray-400">The continuous background base</p>
                  </div>
                  <GlowButton onClick={() => handlePlayAudio('Drone')} variant={playingItem === 'Drone' ? 'secondary' : 'primary'} className="px-4 py-2">
                    {playingItem === 'Drone' ? <Square className="w-4 h-4 fill-current"/> : <Play className="w-4 h-4 fill-current"/>}
                  </GlowButton>
                </div>
                
                <div className="flex items-center justify-between bg-background/50 p-3 rounded-lg border border-primary/10">
                  <div>
                    <h5 className="text-white font-medium">Raga Scale</h5>
                    <p className="text-xs text-gray-400">Arohana & Avarohana</p>
                  </div>
                  <GlowButton onClick={() => handlePlayAudio('Scale')} variant={playingItem === 'Scale' ? 'secondary' : 'primary'} className="px-4 py-2">
                    {playingItem === 'Scale' ? <Square className="w-4 h-4 fill-current"/> : <Play className="w-4 h-4 fill-current"/>}
                  </GlowButton>
                </div>
                
                <div className="flex items-center justify-between bg-background/50 p-3 rounded-lg border border-primary/10">
                  <div>
                    <h5 className="text-white font-medium">Signature Phrase</h5>
                    <p className="text-xs text-gray-400">The Pakad (Catchphrase)</p>
                  </div>
                  <GlowButton onClick={() => handlePlayAudio('Phrase')} variant={playingItem === 'Phrase' ? 'secondary' : 'primary'} className="px-4 py-2">
                    {playingItem === 'Phrase' ? <Square className="w-4 h-4 fill-current"/> : <Play className="w-4 h-4 fill-current"/>}
                  </GlowButton>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Time and Season & Existing Sections below */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <SectionCard className="text-center p-6 flex flex-col items-center justify-center">
              <Sunrise className="w-12 h-12 text-yellow-500 mb-4" />
              <h4 className="text-white font-bold mb-2">Morning Ragas</h4>
              <p className="text-xs text-gray-400">Awakening & Serene (e.g. Bhairav)</p>
            </SectionCard>
            <SectionCard className="text-center p-6 flex flex-col items-center justify-center">
              <Sun className="w-12 h-12 text-orange-500 mb-4" />
              <h4 className="text-white font-bold mb-2">Afternoon Ragas</h4>
              <p className="text-xs text-gray-400">Vibrant & Contemplative (e.g. Bhimpalasi)</p>
            </SectionCard>
            <SectionCard className="text-center p-6 flex flex-col items-center justify-center">
              <Sunset className="w-12 h-12 text-orange-400 mb-4" />
              <h4 className="text-white font-bold mb-2">Evening Ragas</h4>
              <p className="text-xs text-gray-400">Calm & Devotional (e.g. Yaman)</p>
            </SectionCard>
            <SectionCard className="text-center p-6 flex flex-col items-center justify-center">
              <Moon className="w-12 h-12 text-blue-300 mb-4" />
              <h4 className="text-white font-bold mb-2">Night Ragas</h4>
              <p className="text-xs text-gray-400">Deep & Romantic (e.g. Bageshree)</p>
            </SectionCard>
          </div>

          {/* Understanding Ragas Section */}
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
            <SectionCard title="Vadi and Samvadi" icon={<img src="/music note.png" alt="Music Note" className="h-6 w-auto opacity-90 object-contain" />}>
              <p className="text-gray-300">
                Each raga has important notes called Vadi (dominant note) and Samvadi (subdominant note). These notes define the character and mood of the raga and are emphasized during performance.
              </p>
            </SectionCard>

            <SectionCard title="Improvisation Framework" icon={<img src="/creative-brain.png" alt="Creative Brain" className="h-6 w-auto opacity-90 object-contain" />}>
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

      {/* Raga Detail Modal */}
      <Dialog open={selectedRaga !== null} onOpenChange={(open) => !open && setSelectedRaga(null)}>
        <DialogContent className="sm:max-w-[700px] bg-card border-primary/20 shadow-2xl shadow-black">
          {selectedRaga && (
            <ScrollArea className="max-h-[85vh] pr-4">
              <DialogHeader className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <DialogTitle className="text-4xl font-bold glow-text">{selectedRaga.name}</DialogTitle>
                </div>
                <DialogDescription className="text-gray-300 text-lg">
                  {selectedRaga.description}
                </DialogDescription>
              </DialogHeader>

              {/* Note Visualization inside Dialog */}
              <div className="bg-background/80 rounded-xl p-6 mb-6 border border-primary/10">
                <h4 className="text-white font-medium mb-4 text-center text-lg">Interactive Note Visualization</h4>
                <NoteVisualizer arohana={selectedRaga.arohana} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-background/40 p-4 rounded-lg border border-border">
                    <span className="text-gray-400 text-sm block mb-1">Thaat (Parent Scale)</span>
                    <span className="text-white font-semibold text-lg">{selectedRaga.thaat}</span>
                  </div>
                  
                  <div className="bg-background/40 p-4 rounded-lg border border-border">
                    <span className="text-gray-400 text-sm block mb-1">Mood & Emotion</span>
                    <span className="text-white font-semibold text-lg">{selectedRaga.mood}</span>
                  </div>
                  
                  <div className="bg-background/40 p-4 rounded-lg border border-border">
                    <span className="text-gray-400 text-sm block mb-1">Performance Time</span>
                    <div className="flex items-center gap-2">
                      {timeIcons[selectedRaga.time]}
                      <span className="text-white font-semibold text-lg">{selectedRaga.time}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background/40 p-4 rounded-lg border border-border">
                    <span className="text-gray-400 text-sm block mb-1">Pivotal Notes</span>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-primary text-xs uppercase tracking-wider block">Vadi</span>
                        <span className="text-white font-bold">{selectedRaga.vadi}</span>
                      </div>
                      <div>
                        <span className="text-primary text-xs uppercase tracking-wider block">Samvadi</span>
                        <span className="text-white font-bold">{selectedRaga.samvadi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background/40 p-4 rounded-lg border border-border">
                    <span className="text-gray-400 text-sm block mb-1">Scale Notation</span>
                    <div className="space-y-2">
                      <div>
                        <span className="text-primary text-xs uppercase block">Arohana (Ascend)</span>
                        <span className="text-white text-sm">{selectedRaga.arohana}</span>
                      </div>
                      <div>
                        <span className="text-primary text-xs uppercase block">Avarohana (Descend)</span>
                        <span className="text-white text-sm">{selectedRaga.avarohana}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-primary/10 p-5 rounded-lg border border-primary/30">
                  <span className="text-primary font-semibold text-sm block mb-2">Pakad (Signature Phrase)</span>
                  <span className="text-white text-xl font-medium tracking-wide">{selectedRaga.pakad}</span>
                  <p className="text-gray-400 text-sm mt-3">
                    The melodic catchphrase that immediately identifies and establishes the unique personality of the raga.
                  </p>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
