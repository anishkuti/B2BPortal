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
  Building,
  ClipboardList,
  MapPin,
  User,
  Mail,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';
import { Offering, Contract } from '../types';

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

export default function AddSubscription({ onClose, onSuccess }: AddSubscriptionProps) {
  const { offerings, contracts, currentCustomer } = useCustomer();
  const [step, setStep] = useState(1);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<typeof BASE_PLANS[0] | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    contactNumber: '',
    email: '',
    location: currentCustomer?.location || ''
  });

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

  const monthlyTotal = basePrice + addonsTotal;

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

  const isStep1Valid = !!selectedContract;
  const isStep2Valid = !!selectedPlan;
  const isStep4Valid = userDetails.name && userDetails.contactNumber && userDetails.email && userDetails.location;

  const steps = [
    { title: 'Select Contract' },
    { title: 'Select Plan' },
    { title: 'Add-ons' },
    { title: 'End-user Details' },
    { title: 'Review Order' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-border-main p-0 shadow-2xl h-full flex flex-col overflow-hidden">
      {/* Dynamic Stepper Header */}
      <div className="bg-bg-app border-b border-border-main px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-text-main uppercase tracking-tight">Provision New Subscription</h2>
            <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Configure automated enterprise connectivity</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-border-main shadow-sm">
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all border-2",
                  step > i + 1 ? "bg-emerald-500 border-emerald-500 text-white" :
                  step === i + 1 ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" :
                  "bg-white border-border-main text-text-muted"
                )}>
                  {step > i + 1 ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest hidden sm:block",
                  step === i + 1 ? "text-primary" : "text-text-muted"
                )}>
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-border-main" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
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
              <div className="grid grid-cols-1 gap-4">
                {contracts.map((contract) => (
                  <button
                    key={contract.id}
                    onClick={() => setSelectedContract(contract)}
                    className={cn(
                      "p-6 rounded-xl border-2 text-left transition-all relative group flex items-start gap-5",
                      selectedContract?.id === contract.id 
                        ? "border-primary bg-primary-light/10 shadow-sm" 
                        : "border-border-main hover:border-primary/40 bg-white"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                      selectedContract?.id === contract.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-bg-app text-text-muted group-hover:text-primary transition-colors border border-border-main"
                    )}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-text-main text-[16px] uppercase tracking-tight">{contract.title}</h3>
                        <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 uppercase tracking-widest">{contract.id}</span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed font-medium">{contract.description}</p>
                      <div className="mt-3 flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Effective: {contract.date}</span>
                        <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Status: {contract.status}</span>
                      </div>
                    </div>
                    {selectedContract?.id === contract.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                        <Check className="w-4 h-4 text-white" />
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
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BASE_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={cn(
                      "p-5 rounded-xl border-2 text-left transition-all relative group flex flex-col items-stretch",
                      selectedPlan?.id === plan.id 
                        ? "border-primary bg-primary-light/5" 
                        : "border-border-main hover:border-primary/40 bg-white"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center border",
                        selectedPlan?.id === plan.id ? "bg-primary border-primary text-white shadow-md shadow-primary/20" : "bg-bg-app border-border-main text-text-muted group-hover:text-primary transition-colors"
                      )}>
                        {plan.type === 'Mobile' ? <Smartphone className="w-6 h-6" /> : <Wifi className="w-6 h-6" />}
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">Corporate Rate</span>
                        <span className="text-xl font-black text-text-main">£{plan.price}</span>
                      </div>
                    </div>
                    <h3 className="font-black text-text-main text-[15px] mb-1 uppercase tracking-tight">{plan.name}</h3>
                    <p className="text-xs text-text-muted font-medium line-clamp-2 leading-relaxed mb-4">{plan.description}</p>
                    <div className="mt-auto pt-4 border-t border-border-main/50 flex items-center justify-between">
                       <span className="px-2 py-1 bg-bg-app border border-border-main rounded text-[10px] font-black text-text-muted uppercase tracking-widest">{plan.data} DATA</span>
                       <span className="px-2 py-1 bg-bg-app border border-border-main rounded text-[10px] font-black text-text-muted uppercase tracking-widest">{plan.type} INFRA</span>
                    </div>
                    {selectedPlan?.id === plan.id && (
                      <div className="absolute top-4 right-4 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
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
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offerings.map((offering) => (
                  <div
                    key={offering.id}
                    onClick={() => toggleAddon(offering.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 hover:shadow-md",
                      selectedAddons.includes(offering.id)
                        ? "border-primary bg-primary-light/5"
                        : "border-border-main hover:border-primary/20"
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-bg-app border border-border-main flex items-center justify-center flex-shrink-0">
                       <div className={cn(
                         "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                         selectedAddons.includes(offering.id) ? "bg-primary border-primary" : "border-text-muted/30 mr-1"
                       )}>
                         {selectedAddons.includes(offering.id) && <Check className="w-4 h-4 text-white" />}
                       </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-black text-text-main text-[14px] uppercase tracking-tight truncate">{offering.title}</h4>
                        <span className="text-[12px] font-black text-primary whitespace-nowrap bg-primary/5 px-2 py-0.5 rounded border border-primary/10">{offering.price}</span>
                      </div>
                      <p className="text-xs text-text-muted mb-2 leading-tight font-medium line-clamp-2">{offering.description}</p>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{offering.benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-xl mx-auto space-y-8"
            >
              <div className="bg-bg-app border border-border-main rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-3 mb-2 px-1">
                  <div className="p-2 bg-primary text-white rounded-lg">
                    <User size={18} />
                  </div>
                  <h3 className="text-sm font-black text-text-main uppercase tracking-[2px]">End-User Assignment</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="text" 
                        value={userDetails.name}
                        onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-border-main rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="tel" 
                        value={userDetails.contactNumber}
                        onChange={(e) => setUserDetails(prev => ({ ...prev, contactNumber: e.target.value }))}
                        placeholder="+44 7XXX XXXXXX"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-border-main rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Work Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="email" 
                        value={userDetails.email}
                        onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john.doe@company.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-border-main rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Provisioning Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="text" 
                        value={userDetails.location}
                        onChange={(e) => setUserDetails(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Select Office Location"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-border-main rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-[11px] text-blue-800 font-bold leading-relaxed uppercase tracking-tight">
                  Internal authorization is required for assignment outside of HQ regional parameters. Regulatory compliance audit trail is automatically logged.
                </p>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                <div className="space-y-8">
                  <div className="bg-bg-app border border-border-main rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-white border-b border-border-main px-6 py-4 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="p-1.5 bg-primary text-white rounded shadow-sm">
                            <ClipboardList size={14} />
                         </div>
                         <h3 className="text-xs font-black text-text-main uppercase tracking-widest">Order Summary</h3>
                       </div>
                       <span className="text-[10px] font-bold text-text-muted uppercase tracking-[2px]">Ref: #ORD-NEW-{Math.floor(Math.random()*9000)+1000}</span>
                    </div>
                    <div className="p-6 space-y-8">
                       <div className="flex items-center gap-10">
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-text-muted uppercase tracking-[1px]">Selected Contract</span>
                             <span className="text-sm font-extrabold text-primary">{selectedContract?.id}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-text-muted uppercase tracking-[1px]">Infra Segment</span>
                             <span className="text-sm font-extrabold text-text-main">{selectedPlan?.type}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-text-muted uppercase tracking-[1px]">Provisioning Date</span>
                             <span className="text-sm font-extrabold text-text-main">Immediate (ASAP)</span>
                          </div>
                       </div>

                       <div className="bg-white rounded-xl border border-border-main p-5 shadow-sm">
                         <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-bg-app flex items-center justify-center text-primary-dark">
                               {selectedPlan?.type === 'Mobile' ? <Smartphone size={24} /> : <Wifi size={24} />}
                            </div>
                            <div>
                               <h4 className="text-[16px] font-black text-text-main uppercase tracking-tight">{selectedPlan?.name}</h4>
                               <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">{selectedPlan?.data} Shared Enterprise Pool</p>
                            </div>
                            <div className="ml-auto text-right">
                               <span className="text-lg font-black text-text-main">£{selectedPlan?.price.toFixed(2)}</span>
                               <span className="block text-[10px] font-bold text-text-muted uppercase leading-none">/Month</span>
                            </div>
                         </div>

                         {selectedAddons.length > 0 && (
                           <div className="space-y-3 pt-4 border-t border-border-main/50">
                              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Configuration Add-ons</span>
                              {selectedAddons.map(id => {
                                const addon = offerings.find(o => o.id === id);
                                return (
                                  <div key={id} className="flex items-center justify-between">
                                    <span className="text-[12px] font-bold text-text-main">• {addon?.title}</span>
                                    <span className="text-[12px] font-black text-text-main">{addon?.price}</span>
                                  </div>
                                );
                              })}
                           </div>
                         )}
                       </div>

                       <div className="bg-white rounded-xl border border-border-main p-5 shadow-sm">
                          <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">End-User Assignment Details</h4>
                          <div className="grid grid-cols-2 gap-y-4 gap-x-10">
                             <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Provisioned For</span>
                                <span className="text-[13px] font-black text-text-main">{userDetails.name}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Deployment Site</span>
                                <span className="text-[13px] font-black text-text-main uppercase tracking-tight">{userDetails.location}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">System Email</span>
                                <span className="text-[13px] font-black text-text-main">{userDetails.email}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Verified Number</span>
                                <span className="text-[13px] font-black text-text-main font-mono">{userDetails.contactNumber}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-primary-dark text-white rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center p-8 relative">
                     <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-none"></div>
                     <span className="text-[11px] font-black uppercase tracking-[3px] opacity-70 mb-2">Total Recurring</span>
                     <div className="flex items-baseline gap-2 mb-8">
                       <span className="text-5xl font-black">£{monthlyTotal.toFixed(2)}</span>
                       <span className="text-xl font-bold opacity-50">/mo</span>
                     </div>
                     <div className="w-full space-y-4 pt-8 border-t border-white/10 text-[11px] font-bold uppercase tracking-widest">
                        <div className="flex justify-between items-center opacity-70">
                           <span>Activation Fee</span>
                           <span className="text-emerald-400">Waived (BSA)</span>
                        </div>
                        <div className="flex justify-between items-center opacity-70">
                           <span>VAT (20%)</span>
                           <span>Inc. in Price</span>
                        </div>
                        <div className="flex justify-between items-center text-emerald-400 mt-2">
                           <span>Next Billing Run</span>
                           <span>May 1st, 2024</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-bg-app border border-border-main rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <ShieldCheck size={16} />
                       </div>
                       <h4 className="text-[11px] font-black text-text-main uppercase tracking-widest">Order Verification</h4>
                    </div>
                    <p className="text-[12px] text-text-muted font-medium leading-relaxed">
                      By submitting this order, you authorize the provisioning of services under MSA-2024-991 and agree to the subsequent billing adjustments.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Area */}
      <div className="bg-bg-app border-t border-border-main px-8 py-6 flex items-center justify-between">
        <button 
          onClick={step === 1 ? onClose : handleBack}
          className="px-6 py-3 text-[11px] font-black text-text-muted hover:text-text-main transition-colors uppercase tracking-[2px] flex items-center gap-2"
        >
          {step === 1 ? 'Discard Draft' : 'Previous Step'}
        </button>
        
        <div className="flex items-center gap-4">
           {step < 5 ? (
             <button
               onClick={handleNext}
               disabled={
                 (step === 1 && !isStep1Valid) || 
                 (step === 2 && !isStep2Valid) ||
                 (step === 4 && !isStep4Valid)
               }
               className={cn(
                 "px-10 py-4 bg-primary text-white text-[11px] font-black rounded-xl transition-all flex items-center gap-3 shadow-xl uppercase tracking-[2px]",
                 ((step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 4 && !isStep4Valid)) 
                   ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                   : "hover:bg-primary-dark shadow-primary/20 active:scale-95"
               )}
             >
               Confirm & Next <ArrowRight className="w-4 h-4" />
             </button>
           ) : (
             <button
               onClick={handleSubmit}
               className="px-10 py-4 bg-emerald-600 text-white text-[11px] font-black rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-3 shadow-xl uppercase tracking-[2px] active:scale-95 shadow-emerald-600/20"
             >
               Submit Provisioning Order <Check className="w-4 h-4" />
             </button>
           )}
        </div>
      </div>
    </div>
  );
}

