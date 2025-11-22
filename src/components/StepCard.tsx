import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Check, ExternalLink, BookOpen, PlayCircle, FileText } from 'lucide-react';
import { Step, Resource } from '../types/roadmap';
import GlassCard from './ui/GlassCard';
import NeonButton from './ui/NeonButton';

interface StepCardProps {
  step: Step;
  onToggleDone: (stepNumber: number) => void;
  onOpenResource: (url: string) => void;
  index: number;
}

export default function StepCard({ step, onToggleDone, onOpenResource, index }: StepCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'course': return <BookOpen className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard
        className={`transition-all duration-300 ${step.completed ? 'border-green-500/30 bg-green-500/5' : 'hover:border-neon-cyan/30'
          }`}
      >
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggleDone(step.step_number)}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step.completed
                ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                : 'bg-white/10 text-white hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]'
              }`}
          >
            {step.completed ? <Check className="w-6 h-6" /> : step.step_number}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className={`text-xl font-bold ${step.completed ? 'text-green-400' : 'text-white'}`}>
                {step.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${step.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  step.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                }`}>
                {step.difficulty}
              </span>
            </div>

            <p className="text-gray-400 mb-4 leading-relaxed">{step.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-neon-purple" />
                {step.estimated_time_hours}h
              </span>
              {step.resources.length > 0 && (
                <span className="text-neon-cyan">{step.resources.length} resources</span>
              )}
            </div>

            {step.resources.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-sm font-bold text-neon-cyan hover:text-white transition-colors"
                >
                  {expanded ? (
                    <>Hide Resources <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Show Resources <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-2 pt-3 border-t border-white/10">
                        {step.resources.map((resource) => (
                          <div
                            key={resource.id}
                            onClick={() => onOpenResource(resource.url)}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group"
                          >
                            <div className="p-2 rounded-md bg-black/20 text-neon-purple group-hover:text-white transition-colors">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-200 group-hover:text-neon-cyan truncate">
                                {resource.title}
                              </h4>
                              <p className="text-xs text-gray-500 truncate">{resource.source}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
