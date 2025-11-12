interface ProgressBarProps {
  completedSteps: number;
  totalSteps: number;
}

export default function ProgressBar({ completedSteps, totalSteps }: ProgressBarProps) {
  const percentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">Progress</span>
        <span className="text-gray-600">
          {completedSteps} of {totalSteps} steps completed
        </span>
      </div>

      <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage}% complete`}
        />
      </div>

      <p className="text-right text-lg font-bold text-cyan-600">{percentage}%</p>
    </div>
  );
}
