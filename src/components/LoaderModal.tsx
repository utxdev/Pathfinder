import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderModalProps {
  open: boolean;
  onCancel?: () => void;
}

const tips = [
  'Breaking learning into small steps helps your brain retain information better.',
  'Studies show structured learning paths increase success rates by 60%.',
  'The best time to learn is now — consistency beats perfection every time.',
];

export default function LoaderModal({ open, onCancel }: LoaderModalProps) {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loader-title"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" aria-hidden="true" />
        </div>

        <div>
          <h2 id="loader-title" className="text-2xl font-bold text-gray-900 mb-2">
            Generating your learning roadmap…
          </h2>
          <p className="text-gray-600" aria-live="polite">
            {tips[currentTip]}
          </p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-cyan-600 h-full rounded-full animate-progress"></div>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        )}

        <p className="sr-only" aria-live="assertive">
          Roadmap generation in progress.
        </p>
      </div>
    </div>
  );
}
