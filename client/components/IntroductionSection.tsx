import SectionCard from './SectionCard';

export default function IntroductionSection() {
  const cards = [
    {
      title: 'Music and Sound',
      description: 'Music is created through vibrations that travel through air as sound waves.',
      icon: '🌊',
    },
    {
      title: 'Ragas and Structure',
      description: 'Ragas organize musical notes into patterns that create emotional expression and aesthetic experiences.',
      icon: '🎵',
    },
    {
      title: 'Rhythm and Mathematics',
      description: 'Indian rhythm cycles (taal) follow structured mathematical patterns with precise timing.',
      icon: '🔢',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="glow-text">Introduction to SwarVeda</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Indian classical music developed through centuries of knowledge traditions and is based on scientific ideas such as vibration, pitch, resonance, and rhythmic mathematics.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <SectionCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
