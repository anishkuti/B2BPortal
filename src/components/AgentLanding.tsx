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
  ChevronRight
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

  const frequentAccounts = useMemo(() => allCustomers.slice(0, 3), [allCustomers]);

  return (
    <div className="min-h-screen bg-bg-app pb-20 overflow-x-hidden">
      {/* Search Hero Section */}
      <section className="bg-white border-b border-border-main pt-12 pb-12 px-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded border border-primary/20">Agent Control Center</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Session Active</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-text-main tracking-tight mb-4 leading-tight">
              Welcome back, <span className="text-primary underline decoration-primary/20">Agent Mitchell</span>.
            </h1>
            <p className="text-[15px] text-text-muted font-medium max-w-xl mb-8 leading-relaxed">
              Your mission-critical dashboard for managing enterprise relationships.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[450px]"
          >
            <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <ShieldCheck size={80} className="text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white text-xl font-black border border-white/20">
                  SM
                </div>
                <div>
                  <h4 className="text-white font-bold leading-none mb-1">Sarah Mitchell</h4>
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">Senior B2B Account Executive</p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-[11px] font-bold text-white/80 uppercase">Target Achievement</span>
                  </div>
                  <span className="text-[13px] font-black text-white">92.4%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-bold text-white/80 uppercase">System Clearance</span>
                  </div>
                  <span className="text-[13px] font-black text-emerald-400">LEVEL 4-SIGMA</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Verified Secure</span>
                </div>
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[px]">ID: #992-TX-ALPHA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Search Interface - Re-positioned into a floating bar within the hero flow */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-40">
        <div className="bg-white rounded-2xl border-2 border-border-main p-3 shadow-2xl flex items-center gap-4 group focus-within:border-primary transition-all">
          <Search className="ml-4 w-6 h-6 text-text-muted group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search enterprise ecosystem (Account #, Company Name, Industry...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3.5 text-lg font-bold outline-none placeholder:text-text-muted/40"
          />
          <button 
             onClick={() => {}}
            className={cn(
              "px-8 py-3.5 bg-primary text-white rounded-xl font-black text-sm tracking-widest uppercase transition-all flex items-center gap-2",
              !searchQuery.trim() ? "opacity-50" : "hover:bg-primary/90 shadow-lg shadow-primary/30"
            )}
          >
            Command Search
          </button>
        </div>
        
        {/* Results Popover */}
        {searchQuery.trim() !== '' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white border border-border-main rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] overflow-hidden z-[100] p-2"
          >
            <div className="p-3 text-[10px] font-bold text-text-muted uppercase tracking-[2px] bg-bg-app rounded-lg mb-2 flex justify-between items-center">
              <span>Matched Customer Profiles</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="hover:bg-primary/10 p-1 rounded-full transition-colors"
              >
                <X size={14} className="text-primary" />
              </button>
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
                         <ChevronRight size={18} />
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-text-muted">
                  <Users className="mx-auto mb-2 opacity-20" size={40} />
                  <p className="text-[13px] font-bold text-text-main">No exact matches found</p>
                  <p className="text-[11px] uppercase tracking-widest font-bold">Try searching by company domain or ID</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </section>

      {/* Frequently Accessed & Quick Actions */}
      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="text-[13px] font-black text-text-main uppercase tracking-widest">Recent & Frequently Accessed Accounts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {frequentAccounts.map((customer) => (
              <motion.div
                whileHover={{ y: -4 }}
                key={customer.id}
                onClick={() => setCustomer(customer.id)}
                className="bg-white border border-border-main rounded-2xl p-4 cursor-pointer hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-black border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                    {customer.companyName.charAt(0)}
                  </div>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <h4 className="font-bold text-[14px] text-text-main mb-1 truncate">{customer.companyName}</h4>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-tight">{customer.industry}</p>
                <div className="mt-4 pt-4 border-t border-border-main flex items-center justify-between">
                  <span className="text-[11px] font-black text-text-main">{customer.totalLines} Lines</span>
                  <ArrowRight size={14} className="text-text-muted group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-4 h-4 text-primary" />
            <h3 className="text-[13px] font-black text-text-main uppercase tracking-widest">Rapid Command Shortcuts</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Network Operational Audit', icon: Activity, desc: 'Scan infrastructure health' },
              { label: 'Bulk Subscription Transfer', icon: ArrowRightLeft, desc: 'Migrate enterprise fleets' },
              { label: 'Service Catalog Update', icon: Package, desc: 'Manage commercial offerings' },
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center gap-4 p-4 bg-white border border-border-main rounded-2xl hover:bg-bg-app transition-all text-left group">
                <div className="w-10 h-10 bg-bg-app rounded-xl flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
                  <action.icon size={20} />
                </div>
                <div>
                  <span className="block text-[12px] font-black text-text-main uppercase tracking-tight">{action.label}</span>
                  <span className="text-[10px] text-text-muted font-bold">{action.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              onClick={() => stat.label === 'Priority Alerts' && setShowAlerts(true)}
              className={cn(
                "bg-white p-6 rounded-2xl border border-border-main shadow-xl shadow-black/5 group hover:border-primary/30 transition-all hover:-translate-y-1",
                stat.label === 'Priority Alerts' && "cursor-pointer border-red-100 bg-red-50/5"
              )}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={cn("p-3 rounded-xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                {stat.trend ? (
                  <span className={cn(
                    "flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg",
                    stat.up ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                  )}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                    {stat.trend}
                  </span>
                ) : stat.label === 'Priority Alerts' ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-red-600 uppercase tracking-widest animate-pulse">
                    Action Required
                  </span>
                ) : null}
              </div>
              <span className="text-[12px] font-bold text-text-muted uppercase tracking-[2px] block mb-2">{stat.label}</span>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-text-main tracking-tighter">{stat.value}</span>
                {stat.total && <span className="text-[13px] text-text-muted font-bold pb-1">/ {stat.total}</span>}
              </div>
              <p className="text-[11px] text-text-muted font-bold uppercase tracking-tight">{stat.sub}</p>
              
              {stat.label === 'Priority Alerts' && (
                <div className="mt-4 pt-4 border-t border-red-100 flex items-center justify-between text-red-600">
                  <span className="text-[10px] font-black uppercase tracking-widest">View Active Alerts</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Alerts Detail Modal */}
      <AnimatePresence>
        {showAlerts && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAlerts(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-red-600 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight leading-none">Critical Priority Alerts</h2>
                    <p className="text-[11px] font-bold opacity-80 uppercase tracking-widest mt-1">Aggregated System Health Monitoring</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAlerts(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                {[
                  { id: 'AL-001', company: 'Nexus Logistics', type: 'Billing Discrepancy', msg: 'Multiple failed payments detected for international fiber accounts.', severity: 'CRITICAL' },
                  { id: 'AL-002', company: 'Summit Energy', type: 'Usage Spike', msg: 'Sub-unit #4 reporting 400% increase in data egress in last 2 hours.', severity: 'WARNING' },
                  { id: 'AL-003', company: 'CloudCore Inc', type: 'Contract Expiration', msg: 'Primary enterprise agreement expires in 48 hours. No renewal active.', severity: 'CRITICAL' },
                  { id: 'AL-004', company: 'Global Solutions', type: 'SIM Hijack Alert', msg: 'Suspicious activity detected on line +1 (555) 0123. Location mismatch.', severity: 'IMMEDIATE' }
                ].map((alert) => (
                  <div key={alert.id} className="p-4 bg-bg-app border border-border-main rounded-2xl hover:border-red-200 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black text-primary uppercase tracking-widest">{alert.company}</span>
                       <span className={cn(
                         "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter",
                         alert.severity === 'CRITICAL' || alert.severity === 'IMMEDIATE' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
                       )}>{alert.severity}</span>
                    </div>
                    <h3 className="font-bold text-[14px] text-text-main mb-1">{alert.type}</h3>
                    <p className="text-[12px] text-text-muted font-medium leading-relaxed">{alert.msg}</p>
                    <div className="mt-3 pt-3 border-t border-border-main flex items-center justify-between">
                       <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Case ID: {alert.id}</span>
                       <button className="text-[11px] font-black text-primary hover:underline">Execute Resolution Strategy</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-bg-app border-t border-border-main text-center">
                 <button 
                   onClick={() => setShowAlerts(false)}
                   className="text-[11px] font-black text-text-muted hover:text-text-main uppercase tracking-widest"
                 >
                   View Full System Incident Log
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                  <span className="text-[10px] font-black tracking-widest uppercase text-white/90">AGENT SARAH MITCHELL • ID: #992-TX</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
