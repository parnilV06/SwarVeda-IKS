import { Link } from 'react-router-dom';

export default function Footer() {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Science of Sound', href: '/science-of-sound' },
    { label: 'Raga Explorer', href: '/raga-explorer' },
    { label: 'Rhythm Lab', href: '/taal-rhythm-lab' },
    { label: 'Frequency Visualizer', href: '/frequency-visualizer' },
    { label: 'Philosophy', href: '/philosophy-of-sound' },
    { label: 'References', href: '/references' },
  ];

  return (
    <footer className="bg-black/50 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-8">
          {/* About Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/swarveda-main-logo.png" alt="SwarVeda Logo" className="h-10 w-auto object-contain" />
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground">
                SwarVeda
              </h3>
            </Link>
            <p className="text-gray-400">
              An educational journey exploring the scientific and mathematical principles behind Indian classical music, connecting ancient knowledge traditions with modern science.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary/20 pt-8 text-center text-gray-400">
          <p className="mb-2">
            Exploring how ragas, rhythm, and sound vibration connect music with science
          </p>
          <p className="text-xs">
            © 2024 SwarVeda - The Science of Indian Classical Music. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
