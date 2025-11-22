import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function GlitchText({ text, className, as: Component = "h1" }: GlitchTextProps) {
    return (
        <Component className={cn("relative inline-block font-bold text-white", className)}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-cyan opacity-70 animate-glitch clip-path-polygon-[0_0,100%_0,100%_45%,0_45%] translate-x-[-2px]">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-purple opacity-70 animate-glitch clip-path-polygon-[0_80%,100%_20%,100%_100%,0_100%] translate-x-[2px] animation-delay-200">
                {text}
            </span>
        </Component>
    );
}
