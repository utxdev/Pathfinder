import { useState, FormEvent } from 'react';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';
import { KnowledgeLevel } from '../types/roadmap';

interface HeroSectionProps {
  onGenerate: (topic: string, level: KnowledgeLevel, goal?: string) => void;
}

export default function HeroSection({ onGenerate }: HeroSectionProps) {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<KnowledgeLevel>('Beginner');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setError('');
    onGenerate(topic, level, goal || undefined);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" id="home">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Personal Learning Roadmap Generator
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Enter any skill and get a clear, step-by-step roadmap with trusted resources — made by AI.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="topic" className="sr-only">
                  What do you want to learn?
                </label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g., Learn 3D Modeling in Blender"
                  className={`w-full px-4 py-3 border ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all`}
                  maxLength={200}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'topic-error' : undefined}
                />
                {error && (
                  <p id="topic-error" className="mt-1 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                    Knowledge Level
                  </label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as KnowledgeLevel)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                    Goal / Timeline (optional)
                  </label>
                  <input
                    id="goal"
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Job-ready in 6 months"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!topic.trim()}
                className="w-full sm:w-auto px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
              >
                Generate My Roadmap
              </button>

              <button
                type="button"
                className="w-full sm:w-auto sm:ml-4 px-8 py-3 text-cyan-600 font-semibold rounded-lg hover:bg-cyan-50 transition-colors"
              >
                See example roadmaps
              </button>
            </form>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <Sparkles className="w-32 h-32 text-cyan-600" />
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Zap className="w-8 h-8 text-cyan-600 mx-auto mb-2" aria-hidden="true" />
                <p className="text-xs font-medium text-gray-700">Instant Roadmaps</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Sparkles className="w-8 h-8 text-cyan-600 mx-auto mb-2" aria-hidden="true" />
                <p className="text-xs font-medium text-gray-700">Curated Resources</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <TrendingUp className="w-8 h-8 text-cyan-600 mx-auto mb-2" aria-hidden="true" />
                <p className="text-xs font-medium text-gray-700">Progress Tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
