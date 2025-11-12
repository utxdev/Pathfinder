import { useState } from 'react';
import { X, Link as LinkIcon, Check } from 'lucide-react';

interface ShareModalProps {
  open: boolean;
  shareUrl: string;
  onClose: () => void;
}

export default function ShareModal({ open, shareUrl, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="share-title" className="text-xl font-bold text-gray-900">
            Share your roadmap
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Share this learning roadmap with others to help them on their learning journey.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
            aria-label="Shareable link"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-cyan-600 text-white hover:bg-cyan-700'
            }`}
            aria-label={copied ? 'Link copied' : 'Copy link'}
          >
            {copied ? (
              <Check className="w-5 h-5" aria-hidden="true" />
            ) : (
              <LinkIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {copied && (
          <p className="mt-2 text-sm text-green-600" role="status">
            Link copied to clipboard!
          </p>
        )}
      </div>
    </div>
  );
}
