import SectionCard from './SectionCard';

export default function ClosingSection() {
  return (
    <>
      {/* Indian Philosophy of Sound */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="glow-text">Nada – The Philosophy of Sound</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              In Indian knowledge traditions, sound is considered a fundamental vibration of the universe. The concept of <span className="font-semibold">Nada Brahma</span> suggests that the universe itself is sound and vibration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <SectionCard title="Nada Brahma" icon="🎼" hoverable>
              <p className="text-gray-300">
                The philosophical concept that the entire universe is composed of sound vibrations. All existence emerges from and returns to this primordial sound.
              </p>
            </SectionCard>

            <SectionCard title="Om – Universal Vibration" icon="☮️" hoverable>
              <p className="text-gray-300">
                The sacred syllable representing the fundamental vibration of existence. Chanting Om is believed to attune oneself with the universal frequency.
              </p>
            </SectionCard>

            <SectionCard title="Music and Consciousness" icon="✨" hoverable>
              <p className="text-gray-300">
                Music is believed to influence emotions, consciousness, and mental states, creating harmony between body, mind, and spirit.
              </p>
            </SectionCard>
          </div>

          <SectionCard className="max-w-3xl mx-auto">
            <p className="text-gray-300 leading-relaxed">
              The ancient texts recognize that sound vibrations have profound effects on our physical and mental well-being. Through centuries of practice and refinement, Indian classical music became a science of sound that could evoke specific emotional and spiritual states.
            </p>
          </SectionCard>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="glow-text">Conclusion</span>
            </h2>
          </div>

          <SectionCard>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                SwarVeda beautifully connects art, science, mathematics, and philosophy. Through ragas, rhythm cycles, and sound vibrations, it demonstrates how ancient knowledge traditions understood the scientific nature of music centuries before modern science.
              </p>

              <p>
                The intricate system of ragas represents a sophisticated understanding of how specific note sequences can evoke precise emotional and spiritual responses. The mathematical precision of taal shows how rhythm follows exact patterns that can be expressed numerically.
              </p>

              <p>
                The science of sound frequencies reveals that what our ancestors developed as an art form was, in essence, a practical application of acoustic principles. Every aspect of Indian classical music—from the selection of notes to the rhythmic cycles—is grounded in scientific understanding.
              </p>

              <p className="text-purple-300 font-semibold">
                As we continue to explore the intersections of traditional knowledge systems and modern science, Indian classical music stands as a remarkable example of how ancient wisdom and scientific principles are not contradictory but deeply interconnected.
              </p>
            </div>
          </SectionCard>

          {/* References */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">References</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <SectionCard hoverable>
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Academic Resources</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Introduction to Indian Knowledge Systems</li>
                    <li>• Indian Classical Music Theory</li>
                    <li>• Physics of Sound and Vibration</li>
                  </ul>
                </div>
              </SectionCard>

              <SectionCard hoverable>
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Traditional Texts</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Natya Shastra</li>
                    <li>• Bharat Mata Nritya Sastra</li>
                    <li>• Samaveda (Ancient Musical Texts)</li>
                  </ul>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
