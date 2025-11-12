import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Check } from 'lucide-react';
import { Step } from '../types/roadmap';
import ResourceItem from './ResourceItem';

interface StepCardProps {
  step: Step;
  onToggleDone: (stepNumber: number) => void;
  onOpenResource: (url: string) => void;
}

export default function StepCard({ step, onToggleDone, onOpenResource }: StepCardProps) {
  const [expanded, setExpanded] = useState(false);

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  };

  return (
    <div
      className={`border rounded-xl p-6 transition-all ${
        step.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            step.completed ? 'bg-green-600 text-white' : 'bg-cyan-100 text-cyan-700'
          }`}
        >
          {step.completed ? <Check className="w-5 h-5" aria-hidden="true" /> : step.step_number}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
            <button
              onClick={() => onToggleDone(step.step_number)}
              className={`flex-shrink-0 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                step.completed
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={step.completed}
            >
              {step.completed ? 'Done' : 'Mark done'}
            </button>
          </div>

          <p className="text-gray-600 mb-3">{step.description}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {step.estimated_time_hours}h
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[step.difficulty]}`}>
              {step.difficulty}
            </span>
            {step.resources.length > 0 && (
              <span className="text-gray-500">{step.resources.length} resources</span>
            )}
          </div>

          {step.resources.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    Hide resources
                    <ChevronUp className="w-4 h-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Show resources
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>

              {expanded && (
                <div className="mt-3 space-y-2 border-t border-gray-200 pt-3">
                  {step.resources.map((resource) => (
                    <ResourceItem key={resource.id} resource={resource} onOpen={onOpenResource} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
