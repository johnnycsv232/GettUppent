"use client";
import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "gold" | "pink";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({ 
  children, 
  className, 
  variant = "gold", 
  onClick,
  disabled,
  type = "button"
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => setPosition({ x: 0, y: 0 });
  const { x, y } = position;

  const baseStyles = "relative px-8 py-4 rounded-xl text-[#0B0B0D] font-bold uppercase tracking-wider overflow-hidden transition-colors duration-300 font-oswald cursor-pointer";
  const variantStyles = {
    gold: "bg-[#D9AE43] hover:bg-[#FFD700] shadow-[0_0_20px_rgba(217,174,67,0.4)]",
    pink: "bg-[#FF3C93] text-white shadow-[0_0_20px_rgba(255,60,147,0.4)]",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variantStyles[variant], className)}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
