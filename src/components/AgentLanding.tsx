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
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';

export default function AgentLanding() {
  const { allCustomers, setCustomer } = useCustomer();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allCustomers.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allCustomers, searchQuery]);

  // Aggregate Stats
  const stats = useMemo(() => {
    const totalLines = allCustomers.reduce((acc, c) => acc + c.totalLines, 0);
    const activeLines = allCustomers.reduce((acc, c) => acc + c.activeLines, 0);
    const criticalAlerts = 24; // Mock aggregate
    const monthlyRevenue = "$482.4K"; // Mock aggregate
    
    return [
      { label: 'Network Reach', value: activeLines.toLocaleString(), total: totalLines.toLocaleString(), sub: 'Active Subscriptions', icon: Activity, color: 'text-primary', bg: 'bg-primary-light' },
      { label: 'System Load', value: '42.8%', trend: '+2.4%', sub: 'Real-time Traffic', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50', up: true },
      { label: 'MTD Revenue', value: monthlyRevenue, trend: '+12.4%', sub: 'Target: $520K', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50', up: true },
      { label: 'Priority Alerts', value: criticalAlerts.toString(), sub: 'Requiring Action', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    ];
  }, [allCustomers]);

  return (
    <div className="min-h-screen bg-bg-app pb-20">
      {/* Search Hero Section */}
      <section className="bg-white border-b border-border-main pt-16 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-[14px] text-text-muted font-medium max-w-xl mx-auto">
              Search the ecosystem for customer accounts, infrastructure assets, or specific service identifiers to begin management.
            </p>
          </motion.div>

          {/* Large Search Bar */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative flex items-center bg-white border-2 border-border-main group-focus-within:border-primary rounded-2xl p-2 transition-all shadow-lg shadow-black/5">
              <Search className="ml-4 w-6 h-6 text-text-muted group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Find customer, company, or account identifier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-4 py-3.5 text-lg font-bold outline-none placeholder:text-text-muted/60"
              />
              <button 
                className={cn(
                  "px-6 py-3.5 bg-primary text-white rounded-xl font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-2",
                  !searchQuery.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90 shadow-md shadow-primary/20"
                )}
                disabled={!searchQuery.trim()}
              >
                Execute <ArrowRight size={18} />
              </button>
            </div>
            
            {/* Rapid Results Dropdown */}
            {searchQuery.trim() !== '' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white border border-border-main rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
              >
                <div className="p-3 text-[10px] font-bold text-text-muted uppercase tracking-[2px] bg-bg-app rounded-lg mb-2 flex justify-between items-center">
                  <span>Matched Customer Profiles</span>
                  <span className="text-primary">{filteredCustomers.length} Found</span>
                </div>
                <div className="space-y-1 max-h-[400px] overflow-y-auto no-scrollbar">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map(customer => (
                      <div 
                        key={customer.id} 
                        onClick={() => setCustomer(customer.id)}
                        className="flex items-center justify-between p-4 hover:bg-primary-light rounded-xl transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white border border-border-main rounded-xl flex items-center justify-center text-primary font-black text-xl shadow-sm group-hover:border-primary/30 group-hover:scale-105 transition-all">
                            {customer.companyName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-[15px] font-black text-text-main group-hover:text-primary transition-colors">{customer.companyName}</h4>
                            <div className="flex items-center gap-3 text-[11px] font-bold text-text-muted uppercase tracking-tighter">
                              <span>{customer.id}</span>
                              <span className="w-1 h-1 bg-border-main rounded-full"></span>
                              <span>{customer.industry}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-6">
                           <div className="hidden sm:block">
                              <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wide mb-0.5">Subscriptions</span>
                              <span className="text-[14px] font-extrabold text-text-main">{customer.totalLines} Lines</span>
                           </div>
                           <div className="p-2 bg-white rounded-lg border border-border-main group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                             <ArrowUpRight size={18} />
                           </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <div className="w-12 h-12 bg-bg-app rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="text-text-muted" />
                      </div>
                      <p className="text-[13px] font-bold text-text-main">No exact matches found</p>
                      <p className="text-[11px] text-text-muted mt-1 uppercase tracking-widest font-bold">Try searching by company domain or ID</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white p-6 rounded-2xl border border-border-main shadow-xl shadow-black/5 group hover:border-primary/30 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={cn("p-3 rounded-xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                {stat.trend && (
                  <span className={cn(
                    "flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg",
                    stat.up ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                  )}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                    {stat.trend}
                  </span>
                )}
              </div>
              <span className="text-[12px] font-bold text-text-muted uppercase tracking-[2px] block mb-2">{stat.label}</span>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-text-main tracking-tighter">{stat.value}</span>
                {stat.total && <span className="text-[13px] text-text-muted font-bold pb-1">/ {stat.total}</span>}
              </div>
              <p className="text-[11px] text-text-muted font-bold uppercase tracking-tight">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Activity / Global Map placeholder */}
      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-2xl border border-border-main p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-[16px] font-black text-text-main uppercase tracking-widest">Global Network Operations</h3>
                  <p className="text-[12px] text-text-muted font-medium mt-1">Real-time infrastructure health across territories</p>
               </div>
               <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">
                    <Activity size={12} className="animate-pulse" /> ALL SYSTEMS OPTIMAL
                  </span>
               </div>
            </div>
            
            <div className="aspect-[21/9] bg-[#f8f9fa] rounded-xl relative overflow-hidden group">
               <img 
                 src="https://picsum.photos/seed/heatmap/1200/500?grayscale" 
                 alt="Network Map" 
                 className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-[10s]" 
                 referrerPolicy="no-referrer" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-center justify-center">
                  <div className="text-center">
                     <span className="block text-4xl font-black text-primary opacity-20 mb-2">LIVE MONITOR</span>
                     <button className="px-6 py-2 bg-primary text-white text-[12px] font-black uppercase rounded-full tracking-widest hover:scale-105 active:scale-95 transition-all">Launch NOC View</button>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-border-main p-8 shadow-sm">
               <h3 className="text-[14px] font-black text-text-main uppercase tracking-widest mb-6">Agent Efficiency Analytics</h3>
               <div className="space-y-6">
                  {[
                    { label: 'Avg Solve Time', value: '14.2m', progress: 75, color: 'bg-primary' },
                    { label: 'Customer CSAT', value: '4.92', progress: 92, color: 'bg-emerald-500' },
                    { label: 'SLA Adherence', value: '99.8%', progress: 98, color: 'bg-purple-600' },
                  ].map((metric, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-tight">{metric.label}</span>
                        <span className="text-[14px] font-black text-text-main">{metric.value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#f1f3f5] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.progress}%` }}
                          className={cn("h-full rounded-full transition-all", metric.color)}
                        />
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary p-8 rounded-2xl text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                  <ShieldCheck size={120} />
               </div>
               <h4 className="text-[16px] font-black uppercase tracking-tighter mb-2">Security Posture: HIGH</h4>
               <p className="text-[12px] opacity-80 leading-relaxed font-medium mb-6">
                 Protocol delta-4 active. Your agent session is encrypted and hardware-verified.
               </p>
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black tracking-widest uppercase">Agent #992-TX VERIFIED</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
