import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download, Save, Clock, Tag, Sparkles } from 'lucide-react';
import { Roadmap } from '../types/roadmap';
import StepCard from './StepCard';
import ShareModal from './ShareModal';
import { useToast } from './ToastContainer';
import NeonButton from './ui/NeonButton';
import GlitchText from './ui/GlitchText';

interface RoadmapPageProps {
  roadmap: Roadmap;
  onBack: () => void;
  onUpdateStep: (stepNumber: number, completed: boolean) => void;
}

export default function RoadmapPage({ roadmap, onBack, onUpdateStep }: RoadmapPageProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { showToast } = useToast();

  const completedSteps = roadmap.steps.filter((step) => step.completed).length;
  const progress = (completedSteps / roadmap.steps.length) * 100;

  const handleToggleDone = (stepNumber: number) => {
    const step = roadmap.steps.find((s) => s.step_number === stepNumber);
    if (step) {
      onUpdateStep(stepNumber, !step.completed);
      if (!step.completed) {
        // Could trigger a confetti effect here
      }
    }
  };

  const handleOpenResource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Generator
        </motion.button>

        {/* Roadmap Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div>
              <GlitchText text={roadmap.title} as="h1" className="text-4xl md:text-5xl mb-4" />
              <p className="text-xl text-gray-400 max-w-2xl">{roadmap.summary}</p>
            </div>

            <div className="flex gap-3">
              <NeonButton variant="secondary" onClick={() => showToast('info', 'Sign in to save')} className="px-4">
                <Save className="w-4 h-4" />
              </NeonButton>
              <NeonButton variant="secondary" onClick={() => setShareModalOpen(true)} className="px-4">
                <Share2 className="w-4 h-4" />
              </NeonButton>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neon-purple" />
              {roadmap.estimated_total_time_hours}h Total Time
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              {roadmap.difficulty} Level
            </span>
            <span className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-neon-pink" />
              {roadmap.tags.map((tag, i) => (
                <span key={i} className="bg-white/10 px-2 py-0.5 rounded text-xs text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="sticky top-4 z-40 mb-12">
          <div className="bg-dark-card/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-white">Progress</span>
              <span className="text-neon-cyan">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent opacity-30" />

          {roadmap.steps.map((step, index) => (
            <div key={step.step_number} className="relative pl-4">
              <StepCard
                step={step}
                index={index}
                onToggleDone={handleToggleDone}
                onOpenResource={handleOpenResource}
              />
            </div>
          ))}
        </div>

        {/* Completion State */}
        {completedSteps === roadmap.steps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 p-8 text-center bg-gradient-to-b from-neon-cyan/10 to-transparent rounded-3xl border border-neon-cyan/30"
          >
            <h3 className="text-4xl font-bold text-white mb-4">Mission Accomplished! 🚀</h3>
            <p className="text-gray-400 mb-8">You've mastered this roadmap. Ready for the next challenge?</p>
            <NeonButton onClick={onBack} glowColor="purple">
              Start New Journey
            </NeonButton>
          </motion.div>
        )}
      </div>

      <ShareModal
        open={shareModalOpen}
        shareUrl={`https://pfndr.ai/${roadmap.id}`}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}
