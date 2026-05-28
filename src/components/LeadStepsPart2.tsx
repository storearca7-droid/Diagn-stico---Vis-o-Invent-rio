import React from 'react';
import { SERVICES_BY_AREA } from '../data';
import { StepProps } from './types';
import { Input, TextArea } from './Input';
import { CardCheckbox } from './CardCheckbox';
import { Button } from './Button';
import { ArrowLeft, ArrowRight, Check, TrendingUp, Presentation, Send } from 'lucide-react';
import { motion } from 'motion/react';

// --- Step 3: Dynamic Area Details ---
export function StepDynamicArea({ formData, updateData, nextStep, prevStep, area }: StepProps & { area: string }) {
  const dataList = SERVICES_BY_AREA[area];
  if (!dataList) return null;

  const currentServices = formData.services[area] || [];
  const currentPains = formData.painPoints[area] || [];

  const toggleService = (srv: string) => {
    const arr = currentServices.includes(srv) ? currentServices.filter(s => s !== srv) : [...currentServices, srv];
    updateData({ services: { ...formData.services, [area]: arr } });
  };

  const togglePain = (pain: string) => {
    const arr = currentPains.includes(pain) ? currentPains.filter(p => p !== pain) : [...currentPains, pain];
    updateData({ painPoints: { ...formData.painPoints, [area]: arr } });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">{area}</h2>
        <p className="text-slate-400">Marque quais serviços interessam e quais são seus maiores desafios logísticos.</p>
      </div>

      <div className="space-y-8">
        <div>
           <h3 className="text-lg font-medium text-white mb-3 flex items-center"><Check className="w-5 h-5 mr-2 text-[#00E5FF]" /> Serviços de interesse</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
             {dataList.services.map(srv => (
               <CardCheckbox key={srv} label={srv} checked={currentServices.includes(srv)} onChange={() => toggleService(srv)} />
             ))}
           </div>
        </div>

        <div>
           <h3 className="text-lg font-medium text-white mb-3 flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-[#00E5FF]" /> {dataList.painQuestion}</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
             {dataList.pains.map(pain => (
               <CardCheckbox key={pain} label={pain} checked={currentPains.includes(pain)} onChange={() => togglePain(pain)} />
             ))}
           </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
        </Button>
        <Button onClick={nextStep}>
          Avançar <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- Step Final (Biggest Challenge) ---
export function StepFinal({ formData, updateData, prevStep, onSubmit, isSubmitting }: Omit<StepProps, 'nextStep'> & { onSubmit: () => void, isSubmitting: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Quase lá!</h2>
        <p className="text-slate-400">Para finalizar, conte-nos um pouco mais sobre o seu contexto atual.</p>
      </div>

      <TextArea 
        id="biggestChallenge" 
        label="📝 Descreva rapidamente o maior desafio da sua empresa hoje" 
        rows={6}
        value={formData.biggestChallenge} 
        onChange={e => updateData({ biggestChallenge: e.target.value })} 
        placeholder="Temos muita dificuldade em controlar as perdas de estoque e não sabemos o lucro real..."
      />

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting || !formData.biggestChallenge.trim()}>
          {isSubmitting ? "Enviando..." : "Enviar Diagnóstico"} <Send className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- Success Step ---
export function StepSuccess({ formData }: { formData?: any }) {
  let waLink = "https://wa.me/5571983032979?text=Ol%C3%A1,%20acabei%20de%20preencher%20o%20diagn%C3%B3stico%20inteligente.";
  
  if (formData) {
     let text = `*NOVO DIAGNÓSTICO - INVENTÁRIO VISÃO*\n\n`;
     text += `*Empresa:* ${formData.companyName}\n`;
     text += `*Contato:* ${formData.contactName}\n`;
     text += `*WhatsApp:* ${formData.whatsapp}\n`;
     if (formData.email) text += `*E-mail:* ${formData.email}\n`;
     text += `*Local:* ${formData.city}/${formData.state}\n`;
     text += `*Segmentos:* ${formData.segments.join(', ')}\n\n`;
     
     if (formData.areasOfInterest && formData.areasOfInterest.length > 0) {
       text += `*Áreas de Interesse:*\n- ${formData.areasOfInterest.join('\n- ')}\n\n`;
     }
     
     if (formData.services) {
       Object.keys(formData.services).forEach(area => {
         if (formData.services[area] && formData.services[area].length > 0) {
           text += `*Serviços (${area}):*\n- ${formData.services[area].join('\n- ')}\n\n`;
         }
       });
     }
     
     if (formData.painPoints) {
       Object.keys(formData.painPoints).forEach(area => {
         if (formData.painPoints[area] && formData.painPoints[area].length > 0) {
           text += `*Dores (${area}):*\n- ${formData.painPoints[area].join('\n- ')}\n\n`;
         }
       });
     }
     
     if (formData.biggestChallenge) {
       text += `*Maior Desafio:*\n${formData.biggestChallenge}\n`;
     }
     waLink = `https://wa.me/5571983032979?text=${encodeURIComponent(text)}`;
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-8">
      <div className="w-24 h-24 mx-auto rounded-full bg-[#00E5FF]/20 flex items-center justify-center border-2 border-[#00E5FF]">
        <Check className="w-12 h-12 text-[#00E5FF]" />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-white">Diagnóstico detalhado gerado!</h2>
        <p className="text-lg text-slate-400 max-w-md mx-auto">
          Clique no botão abaixo para nos enviar todas as informações do seu diagnóstico pelo WhatsApp. Nossa equipe receberá seus dados e retornará com uma solução personalizada.
        </p>
      </div>

      <div className="bg-[#001D36] border border-[#003366] rounded-xl p-6 inline-block text-left w-full max-w-sm">
        <div className="space-y-4">
          <a href={waLink} target="_blank" rel="noreferrer" className="block w-full text-center px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-colors">
            📲 Enviar Dados no WhatsApp
          </a>
          <div className="flex justify-between text-sm text-slate-400 pt-2 border-t border-[#003366]">
            <span>Instagram:</span>
            <a href="https://instagram.com/visaoinventario" target="_blank" rel="noreferrer" className="text-[#00E5FF] hover:underline">@visaoinventario</a>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>Site:</span>
            <a href="https://www.inventariovisao.netlify.app" target="_blank" rel="noreferrer" className="text-[#00E5FF] hover:underline">Site Oficial</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
