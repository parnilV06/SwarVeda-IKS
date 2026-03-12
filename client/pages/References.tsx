import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SectionCard from '@/components/SectionCard';

interface Reference {
  category: string;
  items: string[];
}

const references: Reference[] = [
  {
    category: 'Indian Classical Music Theory',
    items: [
      'Natya Shastra - Sage Bharata (ancient Sanskrit text on music and arts)',
      'Sangit Ratnakara - Sharangdeva (comprehensive music treatise)',
      'Brihat Sama Samuccaya - Matanga (detailed raga classification)',
      'Abhinaya Darpana - Nandikesvara (guide to musical expression)',
    ],
  },
  {
    category: 'Sound and Vibration Science',
    items: [
      'Introduction to Sound and Vibrations - Douglas Fowler',
      'The Healing Power of Sound and Music - Mitchell L. Gaynor, MD',
      'Cymatics: A Study of Wave Phenomena and Vibration - Hans Jenny',
      'The Mozart Effect - Don Campbell',
      'Sound Healing: Vibrational Medicine for the 21st Century - Jonathan Goldman',
    ],
  },
  {
    category: 'Indian Knowledge Systems',
    items: [
      'Introduction to Indian Knowledge Systems - Mahadevan et al.',
      'The Vedas: Sacred Texts of Hinduism',
      'Upanishads - Ancient Indian Philosophical Texts',
      'Ayurveda: The Ancient Indian Medicine System',
      'Sacred Geometry and Sound - Ernest McClain',
    ],
  },
  {
    category: 'Physics and Acoustics',
    items: [
      'Fundamentals of Acoustics - Lawrence E. Kinsler',
      'The Physics of Musical Instruments - Neville H. Fletcher & Thomas D. Rossing',
      'Understanding Sound - Don Williamson',
      'Acoustic Fundamentals - Fritz M. Busch',
    ],
  },
  {
    category: 'Historical and Cultural Studies',
    items: [
      'The Raga Guide: A Survey of 74 Hindustani Ragas - Joep Bor',
      'The Classical Music of North India - Alain Daniélou',
      'Indian Music: History and Structure - Willi Apel',
      'Hindustani Classical Music: An Overview - Martin Clayton',
    ],
  },
  {
    category: 'Spiritual and Philosophical Texts',
    items: [
      'The Bhagavad Gita - Ancient Indian philosophical text',
      'Yoga Sutras of Patanjali - Framework for spiritual practice',
      'Sacred Geometry - Robert Lawlor',
      'The Tao of Physics - Fritjof Capra',
      'The Conscious Universe - Dean Radin',
    ],
  },
];

export default function References() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pt-16">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">References and Resources</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              Explore a curated collection of resources, academic materials, and further learning on Indian classical music, sound science, and the philosophical foundations of these knowledge systems.
            </p>
          </div>

          {/* References by Category */}
          <div className="space-y-8 mb-16">
            {references.map((section, idx) => (
              <SectionCard key={idx} title={section.category} className="">
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <span className="text-purple-400 font-bold text-lg mt-0.5">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <SectionCard title="Online Learning Platforms" icon="💻" hoverable>
              <ul className="space-y-3 text-gray-300">
                <li>• Coursera - Indian Classical Music and Philosophy courses</li>
                <li>• Khan Academy - Music and Acoustics fundamentals</li>
                <li>• YouTube - University lectures on music and sound</li>
                <li>• Spotify/YouTube Music - Audio recordings of classical ragas</li>
              </ul>
            </SectionCard>

            <SectionCard title="Academic Journals" icon="📰" hoverable>
              <ul className="space-y-3 text-gray-300">
                <li>• Journal of South Asian Studies</li>
                <li>• Ethnomusicology</li>
                <li>• The Musical Quarterly</li>
                <li>• Journal of Consciousness Studies</li>
              </ul>
            </SectionCard>

            <SectionCard title="Museums and Archives" icon="🏛️" hoverable>
              <ul className="space-y-3 text-gray-300">
                <li>• Indian National Centre for the Performing Arts (NCPA)</li>
                <li>• Sangeet Natak Akademi Archives</li>
                <li>• British Library - Indian Music Collections</li>
                <li>• Library of Congress - American Folklife Center</li>
              </ul>
            </SectionCard>

            <SectionCard title="Audio and Visual Resources" icon="🎬" hoverable>
              <ul className="space-y-3 text-gray-300">
                <li>• Documentaries on Indian classical musicians</li>
                <li>• Concert recordings from major festivals</li>
                <li>• Virtual museum exhibitions</li>
                <li>• Educational YouTube channels on music theory</li>
              </ul>
            </SectionCard>
          </div>

          {/* Key Concepts Summary */}
          <SectionCard title="Key Concepts to Explore" className="">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Music Concepts</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Raga structure and classification</li>
                  <li>• Taal systems and rhythm cycles</li>
                  <li>• Swaras (musical notes)</li>
                  <li>• Gharanas (musical traditions)</li>
                  <li>• Improvisation techniques</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Scientific Concepts</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Sound wave physics</li>
                  <li>• Frequency and pitch</li>
                  <li>• Acoustics and resonance</li>
                  <li>• Harmonics and timbre</li>
                  <li>• Psychoacoustics</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Philosophical Concepts</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Nada Brahma</li>
                  <li>• Shabda Brahman</li>
                  <li>• Nada Yoga</li>
                  <li>• Vibrational healing</li>
                  <li>• Sound consciousness</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Historical Context</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Evolution of Indian classical music</li>
                  <li>• Ancient music systems</li>
                  <li>• Development of ragas</li>
                  <li>• Classical vs. folk traditions</li>
                  <li>• Modern innovations</li>
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* Suggested Learning Path */}
          <SectionCard title="Suggested Learning Path" className="mt-8">
            <div className="space-y-4">
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <h4 className="text-white font-semibold mb-2">Beginner Level</h4>
                <p className="text-gray-300 text-sm">
                  Start with "The Raga Guide" and listen to foundational ragas. Explore basic concepts of sound and vibration. Understand the structure of Indian classical music.
                </p>
              </div>

              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <h4 className="text-white font-semibold mb-2">Intermediate Level</h4>
                <p className="text-gray-300 text-sm">
                  Study Sangit Ratnakara and explore different gharanas. Learn about taal systems. Research the philosophical foundations in the Vedas and Upanishads.
                </p>
              </div>

              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <h4 className="text-white font-semibold mb-2">Advanced Level</h4>
                <p className="text-gray-300 text-sm">
                  Engage with Natya Shastra. Study acoustics and psychoacoustics research. Explore connections between sound, consciousness, and healing. Consider spiritual applications through Nada Yoga.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Final Note */}
          <SectionCard title="A Note on Learning" className="mt-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="space-y-4 text-gray-300">
              <p>
                Indian classical music is a vast and deep tradition that cannot be fully understood through books and articles alone. The best way to learn is through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Listening attentively to recordings and live performances</li>
                <li>Learning directly from master musicians (gurus)</li>
                <li>Regular practice and hands-on engagement</li>
                <li>Meditation and introspection on the spiritual aspects</li>
                <li>Studying both the science and the philosophy</li>
              </ul>
              <p className="pt-2 text-sm italic">
                May this journey of exploration deepen your appreciation and understanding of the beautiful science and art of Indian classical music.
              </p>
            </div>
          </SectionCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
