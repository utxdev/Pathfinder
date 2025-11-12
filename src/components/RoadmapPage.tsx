import { useState } from 'react';
import { ArrowLeft, Share2, Download, Save, Clock, Tag } from 'lucide-react';
import { Roadmap } from '../types/roadmap';
import StepCard from './StepCard';
import ProgressBar from './ProgressBar';
import ShareModal from './ShareModal';
import { useToast } from './ToastContainer';

interface RoadmapPageProps {
  roadmap: Roadmap;
  onBack: () => void;
  onUpdateStep: (stepNumber: number, completed: boolean) => void;
}

export default function RoadmapPage({ roadmap, onBack, onUpdateStep }: RoadmapPageProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { showToast } = useToast();

  const completedSteps = roadmap.steps.filter((step) => step.completed).length;

  const handleToggleDone = (stepNumber: number) => {
    const step = roadmap.steps.find((s) => s.step_number === stepNumber);
    if (step) {
      onUpdateStep(stepNumber, !step.completed);
    }
  };

  const handleOpenResource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleSave = () => {
    showToast('info', 'Please sign in to save your roadmap.');
  };

  const handleDownload = () => {
    showToast('info', 'PDF download feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Edit topic
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.title}</h1>
              <p className="text-gray-600 mb-3">{roadmap.summary}</p>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1 text-gray-700">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {roadmap.estimated_total_time_hours}h total
                </span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
                  {roadmap.difficulty}
                </span>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4 text-gray-500" aria-hidden="true" />
                  {roadmap.tags.map((tag, index) => (
                    <span key={index} className="text-gray-600">
                      {tag}
                      {index < roadmap.tags.length - 1 && ','}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Save roadmap"
              >
                <Save className="w-4 h-4" aria-hidden="true" />
                Save
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Share roadmap"
              >
                <Share2 className="w-4 h-4" aria-hidden="true" />
                Share
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Download as PDF"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                PDF
              </button>
            </div>
          </div>

          <ProgressBar completedSteps={completedSteps} totalSteps={roadmap.steps.length} />
        </div>

        <div className="space-y-4">
          {roadmap.steps.map((step) => (
            <StepCard
              key={step.step_number}
              step={step}
              onToggleDone={handleToggleDone}
              onOpenResource={handleOpenResource}
            />
          ))}
        </div>

        {completedSteps === roadmap.steps.length && roadmap.steps.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-cyan-50 rounded-2xl border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h3>
            <p className="text-gray-700">
              You've completed all steps in this roadmap. Keep up the great work on your learning
              journey!
            </p>
          </div>
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
