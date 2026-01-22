import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'success' | 'danger' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-bold tracking-wide transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-neon-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] border border-neon-purple/50",
    success: "bg-neon-green text-slate-950 shadow-[0_0_15px_rgba(74,222,128,0.5)] hover:shadow-[0_0_25px_rgba(74,222,128,0.7)] border border-neon-green/50",
    danger: "bg-neon-red text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] border border-neon-red/50",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;