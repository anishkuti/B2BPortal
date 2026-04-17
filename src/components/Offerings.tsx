import React from 'react';
import { 
  Zap, 
  ShieldAlert, 
  Globe, 
  MessageSquare,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Package,
  Smartphone,
  Wifi,
  Phone
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useCustomer } from '../context/CustomerContext';
import { Offering } from '../types';

const IconMap: Record<string, React.ElementType> = {
  Zap,
  ShieldAlert,
  Globe,
  MessageSquare,
  Package,
  Smartphone,
  Wifi,
  Phone
};

export default function Offerings() {
  const { offerings } = useCustomer();
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[17px] font-extrabold text-text-main">Exclusive Offerings</h2>
          <p className="text-[12px] text-text-muted font-medium">Personalized upsell opportunities and new products for your business.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[11px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded border border-primary/10 uppercase tracking-tighter">
             {offerings.filter(o => o.isNew).length} New Offers
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offerings.map((offering, idx) => {
          const Icon = IconMap[offering.icon] || Sparkles;
          return (
            <motion.div
              layout
              key={offering.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-lg border border-border-main p-6 flex flex-col h-full hover:border-primary/20 transition-colors group shadow-sm relative overflow-hidden"
            >
              {offering.tag && (
                <div className="absolute top-0 right-0">
                   <div className="bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                     {offering.tag}
                   </div>
                </div>
              )}

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center border border-primary/10 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-bold text-text-main">{offering.title}</h3>
                    {offering.isNew && (
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-[12px] text-text-muted leading-relaxed font-medium">
                    {offering.description}
                  </p>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-bg-app p-3 rounded-md border border-border-main">
                      <span className="block text-[10px] font-bold text-text-muted uppercase tracking-tight mb-1">Investment</span>
                      <span className="block text-[13px] font-bold text-text-main">{offering.price}</span>
                   </div>
                   <div className="bg-bg-app p-3 rounded-md border border-border-main">
                      <span className="block text-[10px] font-bold text-text-muted uppercase tracking-tight mb-1">Business Value</span>
                      <span className="block text-[11px] font-bold text-emerald-600 leading-tight">{offering.benefit}</span>
                   </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                   <button className="flex-1 px-4 py-2.5 bg-primary text-white text-[12px] font-bold rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                     Activate Offer <ChevronRight className="w-4 h-4" />
                   </button>
                   <button className="px-4 py-2.5 bg-white border border-border-main text-text-main text-[12px] font-bold rounded-md hover:bg-bg-app transition-all">
                     Learn More
                   </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Banner */}
      <div className="bg-text-main rounded-lg p-8 text-white relative overflow-hidden group">
         <div className="relative z-10 max-w-lg">
            <span className="inline-block px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded mb-4 uppercase tracking-widest">Limited Time Offer</span>
            <h3 className="text-2xl font-extrabold mb-3 tracking-tight">Q2 Business Expansion Pack</h3>
            <p className="text-white/70 text-[14px] leading-relaxed mb-6 font-medium">
              Upgrade 10+ lines to our Enterprise Unlimited Pro plan and get a dedicated fiber circuit installed at your headquarters with 3 months free.
            </p>
            <button className="px-6 py-3 bg-white text-text-main font-bold rounded-md hover:bg-opacity-90 transition-all flex items-center gap-2 group/btn">
              Talk to Account Manager <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
         </div>

         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-primary/30 transition-colors"></div>
         <div className="absolute bottom-0 right-0 opacity-10 p-8 transform rotate-12 group-hover:rotate-0 transition-transform">
            <Zap size={160} strokeWidth={1} />
         </div>
      </div>

      {/* Trust & Upsell Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { title: 'Global Connectivity', desc: 'Secure connection wherever business takes your team.', icon: Globe },
           { title: 'Priority Support', desc: 'Enterprise-grade response times on all service requests.', icon: ShieldAlert },
           { title: 'Unified Billing', desc: 'Consolidate all services into a single monthly statement.', icon: MessageSquare }
         ].map((item, i) => (
           <div key={i} className="flex items-start gap-3 p-4 bg-white border border-border-main rounded-lg shadow-sm">
              <div className="p-2 bg-primary-light text-primary rounded-md">
                 <item.icon size={18} />
              </div>
              <div>
                 <h4 className="text-[13px] font-bold text-text-main mb-0.5">{item.title}</h4>
                 <p className="text-[11px] text-text-muted leading-normal font-medium">{item.desc}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
