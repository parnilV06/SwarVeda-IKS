import { Link } from 'react-router-dom';
import SectionCard from '@/components/SectionCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const features: FeatureCard[] = [
  {
    title: 'Science of Sound',
    description: 'Explore how vibrations create sound waves and how frequency determines pitch in music.',
    icon: '🌊',
    href: '/science-of-sound',
  },
  {
    title: 'Raga Explorer',
    description: 'Discover the melodic frameworks of Indian classical music and the emotions they evoke.',
    icon: '🎵',
    href: '/raga-explorer',
  },
  {
    title: 'Rhythm Lab',
    description: 'Understand the mathematical cycles (taal) that form the rhythmic foundation of music.',
    icon: '⏱️',
    href: '/taal-rhythm-lab',
  },
  {
    title: 'Frequency Visualizer',
    description: 'Interact with musical notes and visualize the waveforms that create each frequency.',
    icon: '📊',
    href: '/frequency-visualizer',
  },
  {
    title: 'Philosophy of Sound',
    description: 'Explore the concept of Nada Brahma and the spiritual dimensions of sound vibration.',
    icon: '✨',
    href: '/philosophy-of-sound',
  },
  {
    title: 'References',
    description: 'Access curated resources, academic materials, and further learning on Indian classical music.',
    icon: '📚',
    href: '/references',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-16">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="glow-text">SwarVeda</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Exploring how ragas, rhythm, and sound vibration connect music with science
          </p>

          <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Indian classical music is grounded in scientific principles including vibration frequencies, mathematical rhythm cycles, and vibrational principles that bridge ancient knowledge traditions with modern science.
          </p>

          <Link
            to="/#features"
            className="glow-button inline-block px-8 py-4 text-lg rounded-lg"
          >
            Explore Topics
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="glow-text">Explore the Science</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Each section provides an in-depth exploration of different aspects of Indian classical music
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <SectionCard
                key={feature.href}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className="flex flex-col"
              >
                <Link
                  to={feature.href}
                  className="mt-auto glow-button inline-block px-4 py-2 text-sm rounded-lg text-center w-full"
                >
                  Learn More
                </Link>
              </SectionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="glow-text">Why Study Indian Classical Music?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <SectionCard title="Music and Sound" icon="🌊">
              <p className="text-gray-300">
                Music is created through vibrations that travel as sound waves, revealing the physical nature of what we hear.
              </p>
            </SectionCard>

            <SectionCard title="Ragas and Structure" icon="🎵">
              <p className="text-gray-300">
                Ragas organize musical notes into patterns that create specific emotional and aesthetic experiences.
              </p>
            </SectionCard>

            <SectionCard title="Rhythm and Mathematics" icon="🔢">
              <p className="text-gray-300">
                Rhythm cycles (taal) follow structured mathematical patterns with precise mathematical timing principles.
              </p>
            </SectionCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
