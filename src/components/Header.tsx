import { useState } from 'react';
import { Menu, X, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './ui/NeonButton';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-dark-bg/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Compass className="w-8 h-8 text-neon-cyan animate-pulse-slow" aria-hidden="true" />
            <span className="text-xl font-bold text-white tracking-tight">Pathfinder <span className="text-neon-purple">AI</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'How it works', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-gray-400 hover:text-neon-cyan transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors font-medium">
              Sign In
            </button>
            <NeonButton variant="primary" className="px-6 py-2 text-sm" glowColor="purple">
              Get Started
            </NeonButton>
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/10 bg-dark-card"
            >
              <div className="flex flex-col gap-4 p-4">
                {['Home', 'How it works', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-400 hover:text-neon-cyan transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <button className="text-gray-400 hover:text-white text-left">
                    Sign In
                  </button>
                  <NeonButton variant="primary" className="w-full justify-center" glowColor="purple">
                    Get Started
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
