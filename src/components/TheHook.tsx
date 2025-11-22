import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TheHookProps {
    onGenerate: (topic: string) => void;
}

const placeholders = [
    "Learn React",
    "Build a Rocket",
    "Master Sushi",
    "Speak Japanese",
    "Hack the Mainframe",
    "Design a City"
];

export default function TheHook({ onGenerate }: TheHookProps) {
    const [topic, setTopic] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim()) {
            onGenerate(topic);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-void relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-primary/10 via-transparent to-transparent opacity-50 animate-pulse-fast" />

            <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-2xl px-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative group"
                >
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-transparent text-4xl md:text-6xl font-bold text-center text-white placeholder-white/20 border-b-2 border-white/20 focus:border-neon-primary focus:outline-none py-8 transition-all duration-500"
                        autoFocus
                    />

                    <AnimatePresence mode='wait'>
                        {!topic && (
                            <motion.span
                                key={placeholders[placeholderIndex]}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-bold text-white/20 pointer-events-none"
                            >
                                {placeholders[placeholderIndex]}
                            </motion.span>
                        )}
                    </AnimatePresence>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: topic ? 1 : 0 }}
                        type="submit"
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-neon-primary hover:text-white transition-colors"
                    >
                        <ArrowRight className="w-12 h-12" />
                    </motion.button>
                </motion.div>

                <p className="text-center text-gray-500 mt-8 text-sm uppercase tracking-[0.2em]">
                    Type your obsession
                </p>
            </form>
        </div>
    );
}
