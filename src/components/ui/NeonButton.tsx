import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary";
    glowColor?: "cyan" | "purple";
}

export default function NeonButton({
    children,
    className,
    variant = "primary",
    glowColor = "cyan",
    ...props
}: NeonButtonProps) {
    const baseStyles = "relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group";

    const variants = {
        primary: "bg-transparent border border-neon-cyan/50 text-white hover:border-neon-cyan",
        secondary: "bg-dark-card border border-white/10 text-white/80 hover:text-white hover:border-white/30",
    };

    const glows = {
        cyan: "shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)]",
        purple: "shadow-[0_0_20px_rgba(188,19,254,0.3)] hover:shadow-[0_0_40px_rgba(188,19,254,0.6)]",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variants[variant], variant === 'primary' && glows[glowColor], className)}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
        </motion.button>
    );
}
