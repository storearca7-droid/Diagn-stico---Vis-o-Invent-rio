import React from 'react';
import { cn } from './types';
import { Check } from 'lucide-react';

interface CardCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CardCheckbox({ label, checked, onChange }: CardCheckboxProps) {
  return (
    <label
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none",
        checked
          ? "bg-[#00264A] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          : "bg-[#001D36] border-[#003366] hover:border-slate-500"
      )}
    >
      <input 
        type="checkbox" 
        className="hidden" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <span className={cn("font-medium", checked ? "text-white" : "text-slate-300")}>{label}</span>
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-md border transition-all duration-200",
          checked ? "bg-[#00E5FF] border-[#00E5FF]" : "border-slate-500 bg-transparent"
        )}
      >
        {checked && <Check className="w-4 h-4 text-[#001220]" strokeWidth={3} />}
      </div>
    </label>
  );
}
