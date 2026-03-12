import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SectionCard from '@/components/SectionCard';

export default function PhilosophyOfSound() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-16">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">Nada – The Philosophy of Sound</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              In Indian knowledge traditions, sound is considered a fundamental force of the universe. The concept of Nada Brahma suggests that the entire cosmos is woven from vibration, and music is a manifestation of this universal principle.
            </p>
          </div>

          {/* Core Concepts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <SectionCard title="Nada Brahma" icon="☮️" hoverable>
              <div className="space-y-3 text-gray-300">
                <p>
                  "Nada Brahma" translates to "The Absolute is Sound." This foundational concept suggests that the universe originates from and is sustained by sound vibration.
                </p>
                <p className="text-sm">
                  All matter, energy, and consciousness are expressions of this primordial sound. Understanding music becomes a pathway to understanding the nature of existence itself.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Om – Universal Frequency" icon="🔊" hoverable>
              <div className="space-y-3 text-gray-300">
                <p>
                  Om (ॐ) is considered the sacred syllable representing the vibration of the universe. Chanting or meditating on Om is believed to align consciousness with cosmic vibration.
                </p>
                <p className="text-sm">
                  The sound is composed of three elements: A, U, M – representing creation, sustenance, and dissolution – the eternal cycle of existence.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Shabda Brahman" icon="✨" hoverable>
              <div className="space-y-3 text-gray-300">
                <p>
                  Shabda Brahman means "The Absolute expressed as Sound." This concept describes how the infinite consciousness manifests as the word or sound, which is the foundation of all creation.
                </p>
                <p className="text-sm">
                  Language and sound are not merely tools for communication but expressions of the ultimate reality.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Nada Yoga" icon="🎼" hoverable>
              <div className="space-y-3 text-gray-300">
                <p>
                  Nada Yoga is the yoga of sound – a spiritual practice using sound vibration for inner transformation and enlightenment.
                </p>
                <p className="text-sm">
                  Through listening to inner sounds and engaging with music, practitioners aim to raise consciousness and experience the cosmic unity.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Sonic Resonance" icon="📊" hoverable>
              <div className="space-y-3 text-gray-300">
                <p>
                  Different frequencies resonate with different parts of our being. Low frequencies affect the physical body, while higher frequencies influence mental and spiritual states.
                </p>
                <p className="text-sm">
                  This is why different ragas are believed to have specific healing and transformative properties.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Consciousness and Sound" icon="💫" hoverable>
              <div className="space-y-3 text-gray-300">
                <p>
                  Sound is seen as intimately connected with consciousness. The vibration that creates sound is the same vibration that constitutes consciousness.
                </p>
                <p className="text-sm">
                  By working with sound through music, we can directly influence and refine our consciousness.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-8 mb-16">
            <SectionCard title="The Nature of Vibration" className="">
              <div className="space-y-4 text-gray-300">
                <p>
                  In both ancient Indian philosophy and modern physics, vibration is recognized as the fundamental nature of existence. Everything in the universe vibrates at different frequencies.
                </p>
                <p>
                  The visible world is just one manifestation of this vibrational reality. Beyond what we perceive are infinite layers of vibration at different frequencies – from the subatomic level to the cosmic level.
                </p>
                <p>
                  Indian classical music works with this understanding, using sound vibrations to influence not just our ears, but our entire being.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Ragas as Healing Systems" className="">
              <div className="space-y-4 text-gray-300">
                <p>
                  Each raga is designed to produce specific effects on the listener. The choice of notes, their relationships, and the order in which they are presented create a unique vibrational signature.
                </p>
                <p>
                  Traditional wisdom suggests that specific ragas can:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Balance the physical body and its systems</li>
                  <li>Calm or energize the mind</li>
                  <li>Evoke specific emotions and states of consciousness</li>
                  <li>Promote healing and well-being</li>
                </ul>
              </div>
            </SectionCard>

            <SectionCard title="Sound and the Elements" className="">
              <div className="space-y-4 text-gray-300">
                <p>
                  In Indian philosophy, sound is associated with the element of space (Akasha), the most subtle element from which all others emerge. Sound travels through space and is intimately connected with the cosmic ether.
                </p>
                <p>
                  The other elements (air, fire, water, earth) are also believed to have corresponding frequencies and sonic characteristics. Music that incorporates these frequencies can influence all levels of our being.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="The Power of Mantras" className="">
              <div className="space-y-4 text-gray-300">
                <p>
                  Mantras are sacred sounds or phrases that carry spiritual significance. They are believed to have the power to transform consciousness through the vibrations they create.
                </p>
                <p>
                  While ragas are melodic frameworks, mantras are specific sound sequences designed for spiritual practice. Both operate on the principle that sound vibration directly affects consciousness.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* Philosophical Links */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <SectionCard title="Modern Scientific Validation" icon="🔬" hoverable>
              <p className="text-gray-300">
                Modern science is increasingly validating ancient understanding of sound. Research shows that specific frequencies affect brain waves, influence healing, and can alter consciousness. The ancient wisdom and modern science are converging in their understanding of sound's power.
              </p>
            </SectionCard>

            <SectionCard title="Personal Practice" icon="🧘" hoverable>
              <p className="text-gray-300">
                By listening attentively to Indian classical music, one can experience the transformative power of sound. Whether through ragas or mantras, engaging with these sound traditions offers a pathway to deeper understanding and inner development.
              </p>
            </SectionCard>
          </div>

          {/* Key Quotes/Concepts */}
          <SectionCard title="Key Philosophical Concepts" className="">
            <div className="space-y-4">
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <p className="text-white font-semibold mb-2">From the Vedas:</p>
                <p className="text-gray-300 text-sm italic">
                  "In the beginning was Nada (Sound). From Nada came all creation. The universe moves to the rhythm of cosmic sound."
                </p>
              </div>

              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <p className="text-white font-semibold mb-2">Principle of Resonance:</p>
                <p className="text-gray-300 text-sm italic">
                  "Just as physical objects vibrate at their natural frequency, consciousness too vibrates at different frequencies. Music allows us to attune our vibration with the cosmic vibration."
                </p>
              </div>

              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <p className="text-white font-semibold mb-2">The Path of Music:</p>
                <p className="text-gray-300 text-sm italic">
                  "Music is not entertainment; it is a science, a medicine, and a path to self-realization. Through music, we can experience the unity of all existence."
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
