import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ClipboardList, TrendingUp, ShieldCheck, FileText, Calendar, CheckCircle2, Hash } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCustomer } from '../context/CustomerContext';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContractModal({ isOpen, onClose }: ContractModalProps) {
  const { currentCustomer } = useCustomer();

  if (!currentCustomer) return null;

  const contracts = [
    { 
      title: 'Master Service Agreement', 
      id: 'MSA-2024-991', 
      date: 'Jan 15, 2024', 
      status: 'In Force',
      type: 'Primary',
      description: 'Main governing document for all enterprise connectivity services and hardware procurement.'
    },
    { 
      title: 'Fleet Maintenance Addendum', 
      id: 'FMA-2024-102', 
      date: 'Feb 02, 2024', 
      status: 'In Force',
      type: 'Addendum',
      description: 'Extended support and replacement terms for mobile device fleet and field hardware.'
    },
    { 
      title: 'SLA Level: Platinum Plus', 
      id: 'SLA-PLAT-001', 
      date: 'Jan 15, 2024', 
      status: 'Active',
      type: 'SLA',
      description: 'Guaranteed 99.99% uptime with 2-hour onsite response time for infrastructure issues.'
    },
    { 
      title: 'Data Sovereignty Agreement', 
      id: 'DSA-2023-442', 
      date: 'Nov 12, 2023', 
      status: 'In Force',
      type: 'Compliance',
      description: 'Legal framework for data residency and encryption standards for international traffic.'
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border-main flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-text-main uppercase tracking-tight leading-none mb-1">Contract Analysis Hub</h2>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-widest">{currentCustomer.companyName} • Master Agreement Overview</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-bg-app rounded-full transition-colors text-text-muted hover:text-text-main"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-bg-app/30">
              {/* Summary Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-border-main shadow-sm">
                  <span className="block text-[10px] font-black text-text-muted uppercase tracking-[2px] mb-2">Contract Status</span>
                  <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-sm">
                    <CheckCircle2 size={16} /> FULLY COMPLIANT
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-border-main shadow-sm">
                  <span className="block text-[10px] font-black text-text-muted uppercase tracking-[2px] mb-2">Next Review Date</span>
                  <div className="flex items-center gap-2 text-text-main font-extrabold text-sm">
                    <Calendar size={16} className="text-primary" /> JUNE 15, 2024
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-border-main shadow-sm">
                  <span className="block text-[10px] font-black text-text-muted uppercase tracking-[2px] mb-2">SLA Health</span>
                  <div className="flex items-center gap-2 text-primary font-extrabold text-sm">
                    <TrendingUp size={16} /> 100% UPTIME (30D)
                  </div>
                </div>
              </div>

              {/* Master Agreement List */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-black text-text-main uppercase tracking-[2px]">Legal Documents & Addendums</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {contracts.map((contract, i) => (
                    <motion.div 
                      key={contract.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border border-border-main rounded-xl p-5 hover:border-primary/40 transition-all group shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-[15px] font-black text-text-main group-hover:text-primary transition-colors">{contract.title}</h4>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border",
                            contract.status === 'In Force' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-blue-50 text-blue-700 border-blue-100"
                          )}>
                            {contract.status}
                          </span>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 py-0.5 bg-bg-app rounded-md border border-border-main">{contract.type}</span>
                        </div>
                        <p className="text-[12px] text-text-muted font-medium leading-relaxed max-w-2xl">
                          {contract.description}
                        </p>
                        <div className="flex items-center gap-4 text-[10px] font-black text-text-muted uppercase tracking-[1px]">
                          <span className="flex items-center gap-1.5"><Hash size={12} className="text-primary" /> {contract.id}</span>
                          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> Effective: {contract.date}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <button className="flex items-center gap-2 px-4 py-2 bg-text-main text-white text-[11px] font-black rounded-lg hover:bg-black transition-all uppercase tracking-widest shadow-sm">
                          Analyze <TrendingUp size={14} />
                        </button>
                        <button className="p-2.5 bg-bg-app border border-border-main rounded-lg text-text-muted hover:text-primary hover:border-primary/20 transition-all shadow-sm">
                          <Download size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Compliance & Governance */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10 shrink-0">
                  <ShieldCheck size={32} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-[14px] font-black text-primary uppercase tracking-widest mb-1">Contract Compliance Verified</h4>
                  <p className="text-[11px] text-primary/70 font-bold leading-relaxed max-w-md uppercase tracking-tight">
                    This account is monitored via the Enterprise Compliance Engine. All regulatory and service level commitments are currently met.
                  </p>
                </div>
                <button className="px-6 py-2.5 bg-primary text-white text-[12px] font-black rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-widest whitespace-nowrap">
                  View Compliance Audit
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border-main bg-white flex items-center justify-end">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-[12px] font-black text-text-muted hover:text-text-main uppercase tracking-widest transition-colors"
                >
                  Close Analysis
                </button>
                <button className="px-5 py-2 bg-text-main text-white text-[12px] font-black rounded-lg uppercase tracking-widest shadow-md">
                  Export Document Bundle
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
