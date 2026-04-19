import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  TrendingUp, 
  Activity, 
  CreditCard, 
  AlertTriangle,
  ArrowUpRight,
  Package,
  ArrowRight,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
  Filter,
  Plus,
  Clock,
  Star,
  Settings,
  X,
  ChevronRight,
  LayoutGrid,
  Command,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';

export default function AgentLanding() {
  const { allCustomers, setCustomer } = useCustomer();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlerts, setShowAlerts] = useState(false);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allCustomers.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allCustomers, searchQuery]);

  const frequentAccounts = useMemo(() => allCustomers.slice(0, 4), [allCustomers]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 lg:p-8 overflow-x-hidden font-sans">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- Top Command & Stats Bar --- */}
        <div className="lg:col-span-12 flex flex-col md:flex-row items-stretch gap-4">
          {/* Integrated Search Command Bar */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Command className="w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Execute Account Search (Company, Industry, ID...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-border-main rounded-2xl py-4 pl-12 pr-4 text-[15px] font-bold outline-none shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-text-main placeholder:text-text-muted/40"
            />
            
            {/* Command Results Popover - Integrated */}
            <AnimatePresence>
              {searchQuery.trim() !== '' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white border border-border-main rounded-2xl shadow-2xl overflow-hidden z-[100] p-1.5"
                >
                  <div className="p-2.5 text-[10px] font-black text-text-muted uppercase tracking-[0.15em] bg-bg-app rounded-lg mb-1.5 flex justify-between items-center">
                    <span>Ecosystem Matches</span>
                    <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-primary/10 rounded-full"><X size={14} className="text-primary" /></button>
                  </div>
                  <div className="space-y-1 max-h-[400px] overflow-y-auto no-scrollbar">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map(customer => (
                        <div 
                          key={customer.id} 
                          onClick={() => setCustomer(customer.id)}
                          className="flex items-center justify-between p-3.5 hover:bg-primary-light rounded-xl transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white border border-border-main rounded-xl flex items-center justify-center text-primary font-black text-lg transition-all shadow-sm group-hover:scale-105 group-hover:border-primary/20">
                              {customer.companyName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-[14px] font-black text-text-main group-hover:text-primary">{customer.companyName}</h4>
                              <p className="text-[10px] font-bold text-text-muted uppercase tracking-tight">{customer.industry} • {customer.id}</p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-text-muted group-hover:text-primary transition-transform group-hover:translate-x-1" />
                        </div>
                      ))
                    ) : (
                      <div className="py-10 text-center text-text-muted font-bold text-[13px]">No records found for that query.</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Stat Ribbon */}
          <div className="flex items-center gap-2 bg-white border border-border-main rounded-2xl p-2 px-4 shadow-sm">
             <div className="flex items-center gap-4 px-3 last:border-0 h-full">
                <div className="text-right">
                   <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Priority Alerts</p>
                   <p className="text-[14px] font-black text-red-600 leading-tight leading-none mt-0.5">24</p>
                </div>
                <div onClick={() => setShowAlerts(true)} className="p-1.5 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                  <Bell size={16} className="text-red-600" />
                </div>
             </div>
          </div>
        </div>

        {/* --- Main Bento Grid --- */}
        
        {/* Identity & Security Tile (Top Left) */}
        <div className="lg:col-span-3">
          <div className="bg-[#1a1a1a] rounded-[2rem] p-8 h-full text-white shadow-xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <ShieldCheck size={100} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white text-2xl font-black border border-white/20 shadow-lg">
                  SM
                </div>
              </div>
              
              <div className="mb-auto">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Authenticated Terminal</p>
                <h2 className="text-2xl font-black tracking-tighter mb-1">Sarah Mitchell</h2>
                <p className="text-[12px] font-bold text-white/60 mb-8 border-l-2 border-primary pl-3">Senior B2B Specialist</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-[10px] font-bold text-white/40 uppercase">Clearance</span>
                    <span className="text-[12px] font-black text-emerald-400">LEVEL 4-SIGMA</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-[10px] font-bold text-white/40 uppercase">Node ID</span>
                    <span className="text-[12px] font-black">#992-TX</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Ready for Command</span>
                </div>
                <Settings size={16} className="text-white/20 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Focal Work Area: Accounts Bento (Sub-grid) */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-border-main shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-primary" />
                <h3 className="text-[13px] font-black text-text-main uppercase tracking-[0.1em]">Frequent Accounts Hub</h3>
              </div>
              <button className="text-[11px] font-black text-primary hover:underline uppercase tracking-tighter">View Master List</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {frequentAccounts.map((customer) => (
                <div 
                  key={customer.id} 
                  onClick={() => setCustomer(customer.id)}
                  className="p-5 bg-[#f8f9fa] rounded-2xl border border-border-main hover:border-primary/30 hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-white border border-border-main rounded-xl flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-110 transition-transform">
                      {customer.companyName.charAt(0)}
                    </div>
                    <Star size={14} className="text-primary fill-primary" />
                  </div>
                  <h4 className="font-extrabold text-[15px] text-text-main group-hover:text-primary mb-1 truncate">{customer.companyName}</h4>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-tight mb-4">{customer.industry}</p>
                  <div className="flex items-center justify-between text-[11px] font-black text-text-main pt-4 border-t border-border-main/50">
                    <span>{customer.totalLines} Units</span>
                    <ArrowRight size={14} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Monitoring & Rapid Actions (Right Column) */}
        <div className="lg:col-span-3 space-y-6">
          {/* NOC Monitoring Module */}
          <div className="bg-white rounded-[2rem] border border-border-main overflow-hidden shadow-sm group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[12px] font-black text-text-main uppercase tracking-widest">Ops Overview</h3>
                <Activity size={16} className="text-emerald-500 animate-pulse" />
              </div>
              <div className="aspect-video bg-bg-app rounded-xl mb-4 relative overflow-hidden">
                <img src="https://picsum.photos/seed/heatmap/400/250?grayscale" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-[8s]" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-end p-4">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Zone: Global North</span>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">Launch NOC Visualizer</button>
            </div>
          </div>

          {/* Efficiency Analytics Module */}
          <div className="bg-white rounded-[2rem] border border-border-main p-8 shadow-sm">
            <h3 className="text-[12px] font-black text-text-main uppercase tracking-widest mb-6">Execution Analytics</h3>
            <div className="space-y-6">
              {[
                { label: 'CSAT Score', value: '4.92', progress: 92, color: 'bg-emerald-500' },
                { label: 'SLA Adherence', value: '99.8%', progress: 98, color: 'bg-primary' },
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">{metric.label}</span>
                    <span className="text-[14px] font-black text-text-main">{metric.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-app rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${metric.progress}%` }} className={cn("h-full rounded-full", metric.color)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Shortcut Panel (Across full width if needed or split) */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-border-main flex items-center justify-between group cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                 <ArrowRightLeft size={20} />
              </div>
              <div>
                <p className="text-[12px] font-black text-text-main uppercase tracking-tight">Bulk Transfer</p>
                <p className="text-[9px] font-bold text-text-muted uppercase">Fleet Migration Engine</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-text-muted group-hover:text-primary" />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border-main flex items-center justify-between group cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                 <Package size={20} />
              </div>
              <div>
                <p className="text-[12px] font-black text-text-main uppercase tracking-tight">Catalog Sync</p>
                <p className="text-[9px] font-bold text-text-muted uppercase">Commercial Deployment</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-text-muted group-hover:text-purple-600" />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border-main flex items-center justify-between group cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                 <Settings size={20} />
              </div>
              <div>
                <p className="text-[12px] font-black text-text-main uppercase tracking-tight">Node Config</p>
                <p className="text-[9px] font-bold text-text-muted uppercase">Station Protocol Opts</p>
              </div>
            </div>
            <ArrowUpRight size={18} className="text-text-muted group-hover:text-amber-600" />
          </div>

          <div className="bg-white shadow-xl shadow-primary/10 border-2 border-primary/20 rounded-2xl p-6 flex items-center justify-between group cursor-pointer hover:bg-primary hover:text-white transition-all overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
               <Plus size={80} />
             </div>
             <div className="flex items-center gap-4 relative z-10">
               <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                 <Plus size={24} />
               </div>
               <div>
                  <p className="text-[12px] font-black uppercase tracking-tight">Onboard Client</p>
                  <p className="text-[9px] font-black group-hover:text-white/60 uppercase">Manual Entry Mode</p>
               </div>
             </div>
             <ChevronRight size={20} className="relative z-10" />
          </div>
        </div>
      </div>

      {/* --- Overlay Modals --- */}
      <AnimatePresence>
        {showAlerts && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAlerts(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
              <div className="bg-red-600 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <AlertTriangle className="animate-bounce" />
                   <div>
                     <h2 className="text-xl font-black uppercase tracking-tight">System Incident Hub</h2>
                     <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Aggregated Priority Items</p>
                   </div>
                </div>
                <button onClick={() => setShowAlerts(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
              </div>
              <div className="p-6 max-h-[50vh] overflow-y-auto space-y-3">
                {[
                  { id: 'AL-001', company: 'Nexus Logistics', companyId: 'ACC-771100', type: 'Billing Discrepancy', severity: 'CRITICAL' },
                  { id: 'AL-002', company: 'Summit Energy', companyId: 'ACC-982341', type: 'Usage Spike', severity: 'WARNING' },
                  { id: 'AL-003', company: 'CloudCore Inc', companyId: 'ACC-110293', type: 'Contract Exp.', severity: 'CRITICAL' },
                  { id: 'AL-004', company: 'Global Solutions', companyId: 'ACC-552109', type: 'SIM Hijack', severity: 'IMMEDIATE' }
                ].map((alert) => (
                  <div key={alert.id} className="p-4 bg-bg-app border border-border-main rounded-2xl hover:border-red-600/20 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black text-primary uppercase tracking-widest">{alert.company}</span>
                       <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter", alert.severity === 'CRITICAL' || alert.severity === 'IMMEDIATE' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700")}>{alert.severity}</span>
                    </div>
                    <h3 className="font-bold text-[14px] text-text-main mb-1">{alert.type}</h3>
                    <div className="mt-3 pt-3 border-t border-border-main flex items-center justify-between">
                       <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Case ID: {alert.id}</span>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           setCustomer(alert.companyId);
                           setShowAlerts(false);
                         }} 
                         className="text-[11px] font-black text-primary hover:underline"
                       >
                         Execute Resolution Strategy
                       </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-bg-app border-t border-border-main text-center">
                 <button onClick={() => setShowAlerts(false)} className="text-[11px] font-black text-text-muted hover:text-text-main uppercase tracking-widest">Acknowledge All</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
