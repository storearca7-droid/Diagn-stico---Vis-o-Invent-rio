import React, { useState, useMemo } from 'react';
import { Lead, SERVICES_BY_AREA } from '../data';
import { StepIntro, StepCompany, StepAreas } from '../components/LeadSteps';
import { StepDynamicArea, StepFinal, StepSuccess } from '../components/LeadStepsPart2';

export default function Home() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Lead>({
    companyName: '',
    contactName: '',
    whatsapp: '',
    email: '',
    city: '',
    state: '',
    segments: [],
    areasOfInterest: [],
    services: {},
    painPoints: {},
    biggestChallenge: ''
  });

  const updateData = (data: Partial<Lead>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const dynamicAreas = useMemo(() => {
    return formData.areasOfInterest.filter(area => !!SERVICES_BY_AREA[area]);
  }, [formData.areasOfInterest]);
  
  // Total steps: Intro (0), Company (1), Areas (2), dynamicAreas.length (3..), Final (+1), Success (+2)
  const totalSteps = 3 + dynamicAreas.length + 1; // 3 base steps + dynamic + final. Success isn't a "step" we go back from usually, but let's count it for progress.
  
  const submitLead = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      // Always proceed to next step even if backend API fails, since it's hosted statically
      setStepIndex(stepIndex + 1);
    } catch (e) {
      console.error(e);
      // Still proceed because the user wants WhatsApp fallback if pure static
      setStepIndex(stepIndex + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (stepIndex === 0) return <StepIntro nextStep={() => setStepIndex(1)} />;
    if (stepIndex === 1) return <StepCompany formData={formData} updateData={updateData} nextStep={() => setStepIndex(2)} prevStep={() => setStepIndex(0)} />;
    if (stepIndex === 2) return <StepAreas formData={formData} updateData={updateData} nextStep={() => setStepIndex(3)} prevStep={() => setStepIndex(1)} />;
    
    // Dynamic area steps
    const dynamicOffset = stepIndex - 3;
    if (dynamicOffset >= 0 && dynamicOffset < dynamicAreas.length) {
      const currentArea = dynamicAreas[dynamicOffset];
      return <StepDynamicArea 
        area={currentArea}
        formData={formData} 
        updateData={updateData} 
        nextStep={() => setStepIndex(stepIndex + 1)} 
        prevStep={() => setStepIndex(stepIndex - 1)} 
      />;
    }

    // Final step
    if (dynamicOffset === dynamicAreas.length) {
      return <StepFinal 
        formData={formData} 
        updateData={updateData} 
        prevStep={() => setStepIndex(stepIndex - 1)} 
        onSubmit={submitLead} 
        isSubmitting={isSubmitting} 
      />;
    }

    // Success step (dynamicOffset > dynamicAreas.length)
    return <StepSuccess formData={formData} />;
  };

  // Skip progress bar on intro and success screens
  const showProgress = stepIndex > 0 && stepIndex < totalSteps;
  const progressPercent = showProgress ? Math.max(5, (stepIndex / (totalSteps - 1)) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#001220] font-sans text-slate-200">
      <header className="absolute top-0 w-full p-4 lg:p-8 flex justify-between items-center z-10">
        <div className="hidden">Logo goes here</div>
      </header>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 w-full max-w-5xl mx-auto pt-20 pb-20">
        
        {showProgress && (
          <div className="w-full max-w-3xl mb-12">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-slate-400">Progresso do Diagnóstico</span>
              <span className="text-[#00E5FF] font-bold text-sm">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-[#001D36] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-[#00E5FF] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="w-full max-w-3xl">
          {renderStep()}
        </div>
      </main>

    </div>
  );
}
