import GlowButton from './GlowButton';

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* SVG Sound Wave Pattern */}
        <div className="mb-8 flex justify-center opacity-20">
          <svg width="200" height="100" viewBox="0 0 200 100" className="w-full max-w-xs">
            {[...Array(5)].map((_, i) => (
              <path
                key={i}
                d={`M${i * 50 + 10} 50 Q${i * 50 + 20} 30 ${i * 50 + 30} 50 T${i * 50 + 50} 50`}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-purple-400 animate-wave"
              />
            ))}
          </svg>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="glow-text">SwarVeda</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Exploring how ragas, rhythm, and sound vibration connect music with science
        </p>

        <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Indian classical music is not only an art form but a system deeply rooted in scientific principles. Discover how vibration frequencies, mathematical rhythm cycles, and vibrational principles shape one of the world's oldest musical traditions.
        </p>

        <GlowButton onClick={onExplore} className="text-lg px-8 py-4">
          Start Exploring
        </GlowButton>
      </div>
    </section>
  );
}
