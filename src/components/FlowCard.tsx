import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Step } from '../types/roadmap';
import { Check, ExternalLink } from 'lucide-react';

interface FlowCardProps {
    step: Step;
    index: number;
    onComplete: () => void;
}

export default function FlowCard({ step, index, onComplete }: FlowCardProps) {
    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (holding && !step.completed) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        onComplete();
                        return 100;
                    }
                    return prev + 2; // Speed of charge
                });
            }, 16); // ~60fps
        } else if (!step.completed) {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [holding, step.completed, onComplete]);

    // Dynamic gradient based on index
    const gradients = [
        "from-void via-void to-neon-primary/20",
        "from-void via-void to-neon-secondary/20",
        "from-void via-void to-neon-accent/20",
    ];
    const bgGradient = gradients[index % gradients.length];

    return (
        <div className={`h-screen w-full snap-center flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b ${bgGradient}`}>

            {/* Progress Bar (Background) */}
            <motion.div
                className="absolute inset-0 bg-white/5 origin-bottom z-0"
                style={{ scaleY: progress / 100 }}
            />

            <div className="relative z-10 max-w-2xl px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1 rounded-full border border-white/20 text-sm font-mono mb-6">
                        STEP {step.step_number < 10 ? `0${step.step_number}` : step.step_number}
                    </span>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        {step.title}
                    </h2>

                    <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
                        {step.description}
                    </p>

                    {/* Resources (Minimal) */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {step.resources.slice(0, 3).map((res) => (
                            <a
                                key={res.id}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-neon-accent hover:text-white transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                {res.title}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Interaction Zone */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                {step.completed ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2 text-neon-primary text-xl font-bold"
                    >
                        <Check className="w-8 h-8" />
                        MASTERED
                    </motion.div>
                ) : (
                    <button
                        onMouseDown={() => setHolding(true)}
                        onMouseUp={() => setHolding(false)}
                        onMouseLeave={() => setHolding(false)}
                        onTouchStart={() => setHolding(true)}
                        onTouchEnd={() => setHolding(false)}
                        className="group relative px-8 py-4"
                    >
                        <div className="absolute inset-0 border border-white/20 rounded-full" />
                        <div
                            className="absolute inset-0 bg-white/10 rounded-full transform scale-x-0 group-active:scale-x-100 transition-transform duration-[2000ms] ease-linear origin-left"
                            style={{ transform: `scaleX(${progress / 100})` }}
                        />
                        <span className="relative font-mono text-sm tracking-widest animate-pulse">
                            HOLD SPACE TO MASTER
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}
