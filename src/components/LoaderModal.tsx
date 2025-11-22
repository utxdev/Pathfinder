import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LoaderModalProps {
  open: boolean;
}

const loadingMessages = [
  "Initializing neural link...",
  "Scanning global knowledge base...",
  "Optimizing learning vectors...",
  "Synthesizing curriculum...",
  "Decrypting success patterns...",
  "Finalizing roadmap..."
];

export default function LoaderModal({ open }: LoaderModalProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 800);
      return () => clearInterval(interval);
    } else {
      setMessageIndex(0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      >
        <div className="w-full max-w-md p-8 font-mono">
          <div className="flex items-center gap-2 text-neon-cyan mb-4">
            <Terminal className="w-5 h-5" />
            <span className="text-sm">SYSTEM_OVERRIDE_ACTIVE</span>
          </div>

          <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-neon-cyan"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="space-y-2">
            {loadingMessages.slice(0, messageIndex + 1).slice(-3).map((msg, i) => (
              <motion.div
                key={msg}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-500 text-sm"
              >
                {">"} {msg}
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-green-500 align-middle ml-1"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
