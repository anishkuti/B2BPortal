import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  Smartphone, 
  Wifi, 
  Phone, 
  ShieldCheck, 
  Globe, 
  Zap,
  ArrowRight,
  Clock,
  CreditCard,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';
import { Offering } from '../types';

interface AddSubscriptionProps {
  onClose: () => void;
  onSuccess: () => void;
}

const BASE_PLANS = [
  { id: 'plan-1', name: 'Standard Business Mobile', price: 25, type: 'Mobile', data: '10GB', description: 'Essential connectivity for your team.' },
  { id: 'plan-2', name: 'Premium Fleet Mobile', price: 45, type: 'Mobile', data: '50GB', description: 'High-speed data for logistics and mobile workforce.' },
  { id: 'plan-3', name: 'Elite Enterprise Unlimited', price: 65, type: 'Mobile', data: 'Unlimited', description: 'Uncapped performance for high-demand users.' },
  { id: 'fibre-1', name: 'Business Fibre 100', price: 80, type: 'Fibre', data: '100Mbps', description: 'Reliable high-speed office connectivity.' },
  { id: 'fibre-2', name: 'Gigabit Enterprise Fibre', price: 150, type: 'Fibre', data: '1Gbps', description: 'Ultra-fast symmetric bandwidth for HQ.' },
];

const DURATIONS = [
  { label: '12 Months', value: 12, discount: 0 },
  { label: '24 Months', value: 24, discount: 10 },
  { label: '36 Months', value: 36, discount: 20 },
];

export default function AddSubscription({ onClose, onSuccess }: AddSubscriptionProps) {
  const { offerings } = useCustomer();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<typeof BASE_PLANS[0] | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [duration, setDuration] = useState(24);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const getAddonPrice = (priceStr: string) => {
    const match = priceStr.match(/£(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const basePrice = selectedPlan?.price || 0;
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const addon = offerings.find(o => o.id === id);
    return acc + (addon ? getAddonPrice(addon.price) : 0);
  }, 0);

  const durationDiscount = DURATIONS.find(d => d.value === duration)?.discount || 0;
  const subtotal = basePrice + addonsTotal;
  const monthlyTotal = subtotal * (1 - durationDiscount / 100);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    // Simulate API call
    onSuccess();
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="bg-white rounded-xl border border-border-main p-8 shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-text-main">Configure New Subscription</h2>
          <p className="text-sm text-text-muted">Step {step} of 3: {step === 1 ? 'Select a Plan' : step === 2 ? 'Customize Offerings' : 'Review & Confirm'}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-bg-app rounded-full transition-colors">
          <X className="w-6 h-6 text-text-muted" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BASE_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={cn(
                      "p-5 rounded-xl border-2 text-left transition-all relative group",
                      selectedPlan?.id === plan.id 
                        ? "border-primary bg-primary-light/30" 
                        : "border-border-main hover:border-primary/40 bg-white"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        selectedPlan?.id === plan.id ? "bg-primary text-white" : "bg-bg-app text-text-muted group-hover:text-primary transition-colors"
                      )}>
                        {plan.type === 'Mobile' ? <Smartphone className="w-6 h-6" /> : <Wifi className="w-6 h-6" />}
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">Starts From</span>
                        <span className="text-xl font-black text-text-main">£{plan.price}</span>
                      </div>
                    </div>
                    <h3 className="font-extrabold text-text-main text-[16px] mb-1">{plan.name}</h3>
                    <p className="text-xs text-text-muted line-clamp-2">{plan.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-bg-app border border-border-main rounded text-[10px] font-bold text-text-muted uppercase">{plan.data}</span>
                      <span className="px-2 py-0.5 bg-bg-app border border-border-main rounded text-[10px] font-bold text-text-muted uppercase">{plan.type}</span>
                    </div>
                    {selectedPlan?.id === plan.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <div>
                <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-4 flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4" /> Contract Duration
                </h3>
                <div className="flex gap-4">
                  {DURATIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDuration(d.value)}
                      className={cn(
                        "flex-1 p-4 rounded-xl border-2 transition-all",
                        duration === d.value 
                          ? "border-primary bg-primary-light/30" 
                          : "border-border-main hover:border-primary/40"
                      )}
                    >
                      <span className="block font-bold text-text-main">{d.label}</span>
                      {d.discount > 0 && <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Save {d.discount}%</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-4 flex items-center gap-2 text-primary">
                  <Zap className="w-4 h-4" /> Available Add-ons & Offers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offerings.map((offering) => (
                    <div
                      key={offering.id}
                      onClick={() => toggleAddon(offering.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4",
                        selectedAddons.includes(offering.id)
                          ? "border-primary bg-primary-light/30 shadow-sm"
                          : "border-border-main hover:border-primary/20"
                      )}
                    >
                      <div className="w-8 h-8 rounded bg-bg-app border border-border-main flex items-center justify-center flex-shrink-0 mt-1">
                         <div className={cn(
                           "w-4 h-4 rounded-sm border-2 transition-all",
                           selectedAddons.includes(offering.id) ? "bg-primary border-primary" : "border-text-muted/30"
                         )}>
                           {selectedAddons.includes(offering.id) && <Check className="w-3 h-3 text-white" />}
                         </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-bold text-text-main text-[14px]">{offering.title}</h4>
                          <span className="text-[12px] font-black text-primary whitespace-nowrap">{offering.price}</span>
                        </div>
                        <p className="text-xs text-text-muted mb-2 leading-tight">{offering.description}</p>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{offering.benefit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <div className="bg-bg-app border border-border-main rounded-2xl p-8">
                 <div className="flex items-start justify-between mb-8 pb-8 border-bottom border-border-main/50">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                        {selectedPlan?.type === 'Mobile' ? <Smartphone className="w-8 h-8" /> : <Wifi className="w-8 h-8" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-text-main mb-1">{selectedPlan?.name}</h3>
                        <p className="text-sm text-text-muted">{selectedPlan?.description}</p>
                      </div>
                    </div>
                 </div>

                 <div className="space-y-4 mb-4">
                    <div className="flex items-center justify-between pb-4 border-b border-border-main border-dashed">
                      <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Base Subscription</span>
                      <span className="text-[16px] font-extrabold text-text-main">£{basePrice.toFixed(2)}</span>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="space-y-2 pb-4 border-b border-border-main border-dashed">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block mb-2">Selected Add-ons</span>
                        {selectedAddons.map(id => {
                          const addon = offerings.find(o => o.id === id);
                          return (
                            <div key={id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                <span className="text-xs font-semibold text-text-main">{addon?.title}</span>
                              </div>
                              <span className="text-xs font-bold text-text-main">{addon?.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex items-center justify-between pb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-text-muted" />
                        <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Contract Length</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[14px] font-extrabold text-text-main">{duration} Months</span>
                        {durationDiscount > 0 && <span className="text-[10px] font-black text-emerald-600 uppercase">-{durationDiscount}% Loyalty Discount Applied</span>}
                      </div>
                    </div>
                 </div>

                 <div className="mt-10 pt-6 border-t-2 border-primary/20 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-1">Final Monthly Cost</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-primary">£{monthlyTotal.toFixed(2)}</span>
                      <span className="text-lg font-bold text-text-muted">/mo</span>
                    </div>
                    <p className="mt-4 text-[11px] text-text-muted text-center max-w-[300px]">VAT inclusive. Subject to our standard Enterprise Terms of Service and data protection policies.</p>
                 </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                 <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-emerald-900">Compliance Verified</h4>
                    <p className="text-[11px] text-emerald-700">This subscription configuration adheres to your corporate governance policy for UK regional operations.</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-8 border-t border-border-main flex items-center justify-between">
        <button 
          onClick={step === 1 ? onClose : handleBack}
          className="px-6 py-3 text-sm font-bold text-text-muted hover:text-text-main transition-colors uppercase tracking-widest"
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        
        <div className="flex items-center gap-4">
           {step < 3 ? (
             <button
               onClick={handleNext}
               disabled={step === 1 && !selectedPlan}
               className={cn(
                 "px-8 py-3 bg-primary text-white text-sm font-black rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-primary/20",
                 (step === 1 && !selectedPlan) ? "opacity-50 cursor-not-allowed transform-none" : "hover:translate-x-1"
               )}
             >
               Continue <ArrowRight className="w-4 h-4" />
             </button>
           ) : (
             <button
               onClick={handleSubmit}
               className="px-8 py-3 bg-text-main text-white text-sm font-black rounded-lg hover:bg-black transition-all flex items-center gap-2 shadow-lg"
             >
               Submit Order <Check className="w-4 h-4" />
             </button>
           )}
        </div>
      </div>
    </div>
  );
}
