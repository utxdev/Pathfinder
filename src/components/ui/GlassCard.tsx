import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    hoverEffect?: boolean;
}

export default function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 30px -10px rgba(0, 243, 255, 0.2)" } : {}}
            className={cn(
                "glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        </motion.div>
    );
}
