import React from 'react';
import { Lead, SEGMENTS, AREAS_OF_INTEREST, SERVICES_BY_AREA } from '../data';
import { StepProps } from './types';
import { Input, TextArea } from './Input';
import { CardCheckbox } from './CardCheckbox';
import { Button } from './Button';
import { ArrowLeft, ArrowRight, Check, TrendingUp, BarChart, Presentation, Send } from 'lucide-react';
import { motion } from 'motion/react';

// --- Step 0: Intro ---
export function StepIntro({ nextStep }: { nextStep: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto flex flex-col items-center text-center space-y-8 py-10"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-[#00E5FF] to-blue-600 rounded-2xl flex items-center justify-center p-0.5 shadow-[0_0_30px_rgba(0,229,255,0.3)]">
        <div className="w-full h-full bg-[#001220] rounded-[14px] flex items-center justify-center">
          <TrendingUp className="w-10 h-10 text-[#00E5FF]" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Diagnóstico Inteligente <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-400">para o Seu Negócio</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed mt-4 mb-4">
          Descubra onde sua empresa está perdendo dinheiro e como a <strong className="text-white">Inventário Visão</strong> pode ajudar a sua operação.
        </p>
      </div>

      <Button onClick={nextStep} className="w-full sm:w-auto px-10 text-lg mt-8">
        Começar Diagnóstico <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  );
}

// --- Step 1: Company Data ---
export function StepCompany({ formData, updateData, nextStep }: StepProps) {
  const toggleSegment = (seg: string) => {
    const segments = formData.segments.includes(seg)
      ? formData.segments.filter(s => s !== seg)
      : [...formData.segments, seg];
    updateData({ segments });
  };

  const isValid = formData.companyName && formData.contactName && formData.whatsapp && formData.segments.length > 0;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Sobre a Empresa</h2>
        <p className="text-slate-400">Por favor, preencha os dados básicos para iniciarmos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input 
          id="companyName" label="Nome da Empresa *" required
          value={formData.companyName} onChange={e => updateData({ companyName: e.target.value })} 
          placeholder="Ex: Supermercados Silva" 
        />
        <Input 
          id="contactName" label="Nome do Responsável *" required
          value={formData.contactName} onChange={e => updateData({ contactName: e.target.value })} 
          placeholder="Ex: João da Silva" 
        />
        <Input 
          id="whatsapp" label="WhatsApp *" required
          value={formData.whatsapp} onChange={e => updateData({ whatsapp: e.target.value })} 
          placeholder="(11) 99999-9999" 
        />
        <Input 
          id="email" label="E-mail" type="email"
          value={formData.email} onChange={e => updateData({ email: e.target.value })} 
          placeholder="contato@empresa.com" 
        />
        <Input 
          id="city" label="Cidade *" required
          value={formData.city} onChange={e => updateData({ city: e.target.value })} 
          placeholder="Ex: Salvador" 
        />
        <Input 
          id="state" label="Estado *" required
          value={formData.state} onChange={e => updateData({ state: e.target.value })} 
          placeholder="Ex: BA" 
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-300 mb-3">Qual o seu segmento? (Selecione um ou mais) *</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SEGMENTS.map(seg => (
            <CardCheckbox 
              key={seg} label={seg} 
              checked={formData.segments.includes(seg)} 
              onChange={() => toggleSegment(seg)} 
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={nextStep} disabled={!isValid}>
          Avançar <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- Step 2: Areas of Interest ---
export function StepAreas({ formData, updateData, nextStep, prevStep }: StepProps) {
  const toggleArea = (area: string) => {
    const areas = formData.areasOfInterest.includes(area)
      ? formData.areasOfInterest.filter(a => a !== area)
      : [...formData.areasOfInterest, area];
    updateData({ areasOfInterest: areas });
  };

  const isValid = formData.areasOfInterest.length > 0;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">📌 Quais áreas você deseja melhorar?</h2>
        <p className="text-slate-400">Selecione todas as áreas que são desafios para o seu negócio hoje.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {AREAS_OF_INTEREST.map(area => (
          <CardCheckbox 
            key={area} label={area} 
            checked={formData.areasOfInterest.includes(area)} 
            onChange={() => toggleArea(area)} 
          />
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
        </Button>
        <Button onClick={nextStep} disabled={!isValid}>
          Avançar <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
