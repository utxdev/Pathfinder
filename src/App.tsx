import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TheHook from './components/TheHook';
import TheFlow from './components/TheFlow';
import { Roadmap } from './types/roadmap';
import { generateMockRoadmap } from './utils/mockData';

type AppState = 'hook' | 'generating' | 'flow';

function App() {
  const [state, setState] = useState<AppState>('hook');
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  const handleGenerate = async (topic: string) => {
    setState('generating');
    // Simulate "Hacking" delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = await generateMockRoadmap(topic, 'Beginner');
    if (data) {
      setRoadmap(data);
      setState('flow');
    } else {
      setState('hook');
    }
  };

  const handleUpdateStep = (stepNumber: number, completed: boolean) => {
    if (!roadmap) return;
    setRoadmap({
      ...roadmap,
      steps: roadmap.steps.map(s =>
        s.step_number === stepNumber ? { ...s, completed } : s
      )
    });
  };

  return (
    <main className="bg-void min-h-screen text-white selection:bg-neon-primary selection:text-black">
      <AnimatePresence mode='wait'>
        {state === 'hook' && (
          <motion.div
            key="hook"
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
          >
            <TheHook onGenerate={handleGenerate} />
          </motion.div>
        )}

        {state === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-void z-50"
          >
            <div className="text-center">
              <div className="text-6xl md:text-9xl font-bold text-neon-primary animate-pulse-fast">
                HACKING...
              </div>
              <div className="mt-4 text-xl font-mono text-neon-accent">
                BREACHING MAINFRAME
              </div>
            </div>
          </motion.div>
        )}

        {state === 'flow' && roadmap && (
          <motion.div
            key="flow"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TheFlow roadmap={roadmap} onUpdateStep={handleUpdateStep} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
