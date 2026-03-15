import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-md border-b border-primary/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground"
          >
            <img src="/swarveda-main-logo.png" alt="SwarVeda Logo" className="h-8 w-auto object-contain" />
            SwarVeda
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-300 pb-1 border-b-2 ${
                    isActive 
                      ? 'text-primary border-primary' 
                      : 'text-gray-300 border-transparent hover:text-white hover:border-white/20'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-2 rounded-lg transition-colors duration-300 text-sm ${
                    isActive
                      ? 'text-primary bg-primary/10 border-l-2 border-primary font-medium'
                      : 'text-gray-300 hover:text-white hover:bg-card/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
