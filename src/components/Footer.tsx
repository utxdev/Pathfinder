import { Compass, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 mt-20 backdrop-blur-sm" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-6 h-6 text-neon-cyan" aria-hidden="true" />
              <span className="text-white font-bold">Pathfinder AI</span>
            </div>
            <p className="text-sm text-gray-500">
              Your personal learning roadmap generator. Stop researching, start doing.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-neon-cyan transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-neon-cyan transition-colors">Pricing</a></li>
              <li><a href="#examples" className="hover:text-neon-cyan transition-colors">Example Roadmaps</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#docs" className="hover:text-neon-cyan transition-colors">Documentation</a></li>
              <li><a href="#blog" className="hover:text-neon-cyan transition-colors">Blog</a></li>
              <li><a href="#support" className="hover:text-neon-cyan transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#privacy" className="hover:text-neon-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-neon-cyan transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            &copy; 2025 Pathfinder AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-neon-cyan transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-neon-cyan transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-neon-cyan transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
