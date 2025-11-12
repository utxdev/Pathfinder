import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import RoadmapPage from './components/RoadmapPage';
import LoaderModal from './components/LoaderModal';
import { ToastProvider } from './components/ToastContainer';
import { Roadmap, KnowledgeLevel } from './types/roadmap';
import { generateMockRoadmap } from './utils/mockData';

type AppView = 'home' | 'loading' | 'roadmap';

function App() {
  const [view, setView] = useState<AppView>('home');
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  const handleGenerate = async (topic: string, level: KnowledgeLevel, goal?: string) => {
    setView('loading');
    try {
      const generatedRoadmap = await generateMockRoadmap(topic, level, goal);
      if (generatedRoadmap) {
        setRoadmap(generatedRoadmap);
        setView('roadmap');
      } else {
        console.error("Failed to generate roadmap.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setView('roadmap');
    }
  };
  

  const handleBack = () => {
    setView('home');
  };

  const handleUpdateStep = (stepNumber: number, completed: boolean) => {
    if (!roadmap) return;

    const updatedRoadmap = {
      ...roadmap,
      steps: roadmap.steps.map((step) =>
        step.step_number === stepNumber ? { ...step, completed } : step
      ),
    };
    setRoadmap(updatedRoadmap);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-600 focus:text-white focus:rounded">
          Skip to content
        </a>

        <Header />

        <main id="main" className="flex-1">
          {view === 'home' && <HeroSection onGenerate={handleGenerate} />}
          {view === 'roadmap' && roadmap && (
            <RoadmapPage roadmap={roadmap} onBack={handleBack} onUpdateStep={handleUpdateStep} />
          )}
        </main>

        {view === 'home' && <Footer />}

        <LoaderModal open={view === 'loading'} />
      </div>
    </ToastProvider>
  );
}

export default App;
