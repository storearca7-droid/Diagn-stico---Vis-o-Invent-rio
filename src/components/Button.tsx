import React from 'react';
import { cn } from './types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === 'primary' && "bg-[#00E5FF] text-[#001220] hover:bg-[#00c5dd] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]",
        variant === 'secondary' && "bg-white text-[#001220] hover:bg-slate-200",
        variant === 'outline' && "bg-transparent border border-[#003366] text-white hover:border-[#00E5FF]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
