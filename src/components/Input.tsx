import React, { InputHTMLAttributes } from 'react';
import { cn } from './types';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "bg-[#001D36] border border-[#003366] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent transition-all placeholder:text-slate-500",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function TextArea({ label, className, id, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <textarea
        id={id}
        className={cn(
          "bg-[#001D36] border border-[#003366] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent transition-all placeholder:text-slate-500 resize-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
