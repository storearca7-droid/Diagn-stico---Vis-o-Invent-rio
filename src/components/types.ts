import React from 'react';
import { Lead } from '../data';

interface StepProps {
  formData: Lead;
  updateData: (data: Partial<Lead>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");
