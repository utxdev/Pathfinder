import { useRef, useEffect } from 'react';
import { Roadmap } from '../types/roadmap';
import FlowCard from './FlowCard';

interface TheFlowProps {
    roadmap: Roadmap;
    onUpdateStep: (stepNumber: number, completed: boolean) => void;
}

export default function TheFlow({ roadmap, onUpdateStep }: TheFlowProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleComplete = (stepNumber: number) => {
        onUpdateStep(stepNumber, true);

        // Auto-scroll to next step after delay
        setTimeout(() => {
            if (containerRef.current) {
                const nextStep = document.getElementById(`step-${stepNumber + 1}`);
                if (nextStep) {
                    nextStep.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 500);
    };

    // Keyboard interaction (Space to hold)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                // Logic for spacebar holding would go here, but it's complex to map to specific cards without context.
                // For MVP, we stick to mouse/touch.
            }
            import { useRef, useEffect } from 'react';
            import { Roadmap } from '../types/roadmap';
            import FlowCard from './FlowCard';

            interface TheFlowProps {
                roadmap: Roadmap;
                onUpdateStep: (stepNumber: number, completed: boolean) => void;
            }

            export default function TheFlow({ roadmap, onUpdateStep }: TheFlowProps) {
                const containerRef = useRef<HTMLDivElement>(null);

                const handleComplete = (stepNumber: number) => {
                    onUpdateStep(stepNumber, true);

                    // Auto-scroll to next step after delay
                    setTimeout(() => {
                        if (containerRef.current) {
                            const nextStep = document.getElementById(`step-${stepNumber + 1}`);
                            if (nextStep) {
                                nextStep.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    }, 500);
                };

                // Keyboard interaction (Space to hold)
                useEffect(() => {
                    const handleKeyDown = (e: KeyboardEvent) => {
                        if (e.code === 'Space') {
                            // Logic for spacebar holding would go here, but it's complex to map to specific cards without context.
                            // For MVP, we stick to mouse/touch.
                        }
                    };
                    window.addEventListener('keydown', handleKeyDown);
                    return () => window.removeEventListener('keydown', handleKeyDown);
                }, []);

                return (
                    <div
                        ref={containerRef}
                        className="h-screen w-full overflow-y-scroll snap-y-mandatory hide-scrollbar bg-void"
                    >
                        {/* Intro Card / Title */}
                        <div className="h-screen w-full snap-center flex flex-col items-center justify-center text-center px-4">
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{roadmap.title}</h1>
                            <p className="text-lg text-gray-500">{roadmap.steps.length} Steps to Mastery</p>
                            <div className="mt-12 animate-bounce text-neon-primary">
                                ↓ SCROLL TO BEGIN
                            </div>
                        </div>

                        {roadmap.steps.map((step, index) => (
                            <div key={step.step_number} id={`step-${step.step_number}`}>
                                <FlowCard
                                    step={step}
                                    index={index}
                                    onComplete={() => handleComplete(step.step_number)}
                                />
                            </div>
                        ))}

                        {/* Outro Card */}
                        <div className="h-screen w-full snap-center flex flex-col items-center justify-center text-center bg-neon-primary text-black">
                            <h1 className="text-5xl md:text-7xl font-bold mb-8">DONE.</h1>
                            <p className="text-xl font-bold">WHAT'S NEXT?</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-12 px-8 py-4 border-2 border-black rounded-full font-bold hover:bg-black hover:text-neon-primary transition-colors"
                            >
                                START NEW PATH
                            </button>
                        </div>
                    </div>
                );
            }
