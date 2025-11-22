import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Zap, Brain } from 'lucide-react';
import { KnowledgeLevel } from '../types/roadmap';
import NeonButton from './ui/NeonButton';
import GlassCard from './ui/GlassCard';
import GlitchText from './ui/GlitchText';

interface HeroSectionProps {
  onGenerate: (topic: string, level: KnowledgeLevel, goal?: string) => void;
}

export default function HeroSection({ onGenerate }: HeroSectionProps) {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<KnowledgeLevel>('Beginner');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic, level, goal);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 overflow-hidden">

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
            <span className="text-sm font-medium text-gray-300">AI-Powered Learning Architect</span>
          </div>

          <GlitchText
            text="Master Anything."
            className="text-6xl md:text-8xl tracking-tight mb-2 block"
          />
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
            Faster Than Ever.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Stop wasting time on generic tutorials. Generate a <span className="text-neon-cyan font-bold">custom neural roadmap</span> tailored to your exact goals and skill level.
        </motion.p>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full max-w-2xl mx-auto mt-12"
        >
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-neon-purple" />
                  What do you want to learn?
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Quantum Computing, React Native, Pottery..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-neon-cyan" />
                    Current Level
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
                    {(['Beginner', 'Intermediate', 'Advanced'] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLevel(l)}
                        className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${level === l
                          ? 'bg-white/10 text-white shadow-lg'
                          : 'text-gray-500 hover:text-gray-300'
                          }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                    <Target className="w-4 h-4 text-neon-pink" />
                    Specific Goal (Optional)
                  </label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g. Get a job at Google"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 transition-all"
                  />
                </div>
              </div>

              <NeonButton type="submit" className="w-full mt-4 justify-center" glowColor="cyan">
                Generate Roadmap <ArrowRight className="w-5 h-5" />
              </NeonButton>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
