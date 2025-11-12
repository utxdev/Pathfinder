import { ExternalLink, Video, FileText, BookOpen, FileCode } from 'lucide-react';
import { Resource } from '../types/roadmap';

interface ResourceItemProps {
  resource: Resource;
  onOpen: (url: string) => void;
}

export default function ResourceItem({ resource, onOpen }: ResourceItemProps) {
  const icons = {
    video: <Video className="w-4 h-4" aria-hidden="true" />,
    article: <FileText className="w-4 h-4" aria-hidden="true" />,
    course: <BookOpen className="w-4 h-4" aria-hidden="true" />,
    documentation: <FileCode className="w-4 h-4" aria-hidden="true" />,
  };

  const typeColors = {
    video: 'bg-red-100 text-red-700',
    article: 'bg-blue-100 text-blue-700',
    course: 'bg-purple-100 text-purple-700',
    documentation: 'bg-green-100 text-green-700',
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
      <div className={`p-2 rounded ${typeColors[resource.type]}`}>
        {icons[resource.type]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-gray-900 text-sm group-hover:text-cyan-600 transition-colors">
            {resource.title}
          </h4>
          {resource.recommended && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 text-cyan-700 whitespace-nowrap">
              Recommended
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
          <span>{resource.source}</span>
          {resource.duration && (
            <>
              <span className="text-gray-400">•</span>
              <span>{resource.duration}</span>
            </>
          )}
        </div>

        <button
          onClick={() => onOpen(resource.url)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
          aria-label={`Open ${resource.title} in new tab`}
        >
          Open resource
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
