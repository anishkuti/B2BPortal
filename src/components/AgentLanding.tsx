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
  Bell,
  LineChart as LineChartIcon,
  CalendarDays,
  LogOut
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';

const portfolioData = [
  { name: 'Jan', data: 4500, cost: 8200 },
  { name: 'Feb', data: 5200, cost: 8900 },
  { name: 'Mar', data: 6100, cost: 9500 },
  { name: 'Apr', data: 7800, cost: 11200 },
];

const distributionData = [
  { account: 'TechSolutions', service: 'Fixed', count: 140 },
  { account: 'TechSolutions', service: 'Mobile', count: 320 },
  { account: 'TechSolutions', service: 'Fiber', count: 90 },
  { account: 'Chen Logistics', service: 'Fixed', count: 80 },
  { account: 'Chen Logistics', service: 'Mobile', count: 180 },
  { account: 'Chen Logistics', service: 'Fiber', count: 40 },
  { account: 'Rodriguez Media', service: 'Fixed', count: 110 },
  { account: 'Rodriguez Media', service: 'Mobile', count: 210 },
  { account: 'Rodriguez Media', service: 'Fiber', count: 60 },
  { account: 'Nexus Venture', service: 'Fixed', count: 120 },
  { account: 'Nexus Venture', service: 'Mobile', count: 180 },
  { account: 'Nexus Venture', service: 'Fiber', count: 130 },
];

const serviceMap: Record<string, string> = {
  'Fixed': '#1a56db',
  'Mobile': '#10b981',
  'Fiber': '#f59e0b'
};

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

          {/* Logout Action */}
          <button 
            className="flex items-center gap-3 bg-white border border-border-main rounded-2xl p-2 px-5 shadow-sm hover:bg-gray-50 transition-all active:scale-95 group"
            onClick={() => window.location.href = '/'}
          >
            <div className="text-right hidden sm:block">
               <p className="text-[9px] font-black text-text-muted uppercase tracking-widest leading-none">Session</p>
               <p className="text-[12px] font-black text-text-main mt-1">Logout</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
               <LogOut size={16} />
            </div>
          </button>
        </div>

        {/* --- Main Dashboard Area --- */}
        
        {/* Portfolio Intelligence Dashboard - Left Side */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-border-main shadow-sm h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-text-main tracking-tight uppercase">Portfolio Intelligence</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Global Ecosystem Performance • Q2 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-bg-app rounded-full border border-border-main">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[9px] font-black text-text-main uppercase tracking-widest">Stream Active</span>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {[
                { name: 'TechSolutions Global Ltd.', id: 'ACC-982341', fixed: 142, mobile: 324, fiber: 92, status: 'Healthy' },
                { name: 'Chen Logistics & Supply', id: 'ACC-552109', fixed: 84, mobile: 182, fiber: 42, status: 'Critical' },
                { name: 'Rodriguez Media Group', id: 'ACC-110293', fixed: 112, mobile: 214, fiber: 64, status: 'Healthy' },
                { name: 'Nexus Venture Group', id: 'ACC-771100', fixed: 124, mobile: 188, fiber: 132, status: 'Healthy' }
              ].map((account, i) => (
                <div 
                  key={i} 
                  onClick={() => setCustomer(account.id)}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-[#fcfdfe] border border-border-main rounded-2xl hover:bg-white hover:shadow-xl transition-all hover:border-primary/20 cursor-pointer"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <p className="text-[14px] font-black text-text-main group-hover:text-primary transition-colors">{account.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">ID: {account.id}</p>
                      <span className="text-text-muted/30">•</span>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">Active Nodes</p>
                    </div>
                  </div>
                  <div className="flex items-center flex-wrap gap-x-8 gap-y-2 w-full md:w-auto md:text-right">
                    <div className="text-center md:text-right">
                      <p className="text-[9px] font-bold text-text-muted uppercase mb-0.5">Fixed</p>
                      <p className="text-[14px] font-black text-text-main">{account.fixed}</p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-[9px] font-bold text-text-muted uppercase mb-0.5">Mobile</p>
                      <p className="text-[14px] font-black text-text-main">{account.mobile}</p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-[9px] font-bold text-text-muted uppercase mb-0.5">Fiber</p>
                      <p className="text-[14px] font-black text-text-main">{account.fiber}</p>
                    </div>
                    <div className="md:w-20 text-right">
                      <span className={cn(
                        "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest inline-block border",
                        account.status === 'Healthy' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                      )}>{account.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border-main grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-bg-app rounded-2xl border border-border-main">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Portfolio MRR</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-text-main">£142.5k</p>
                  <TrendingUp size={14} className="text-emerald-500" />
                </div>
              </div>
              <div className="p-4 bg-bg-app rounded-2xl border border-border-main">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Active Issues</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-red-600">18</p>
                  <AlertTriangle size={14} className="text-red-500" />
                </div>
              </div>
              <div className="p-4 bg-bg-app rounded-2xl border border-border-main">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Open Orders</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-text-main">42</p>
                  <Package size={14} className="text-primary" />
                </div>
              </div>
              <div className="p-4 bg-bg-app rounded-2xl border border-border-main">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">SLA Health</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-emerald-600">99.8%</p>
                  <Activity size={14} className="text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Account Ecosystem & Shortcuts */}
        <div className="lg:col-span-3 space-y-6 flex flex-col h-full">
          {/* Account Ecosystem */}
          <div className="bg-white rounded-[2rem] p-6 border border-border-main shadow-sm flex flex-col flex-1 min-h-0">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-4 h-4 text-primary" />
              <h3 className="text-[11px] font-black text-text-main uppercase tracking-[0.15em]">Account Ecosystem</h3>
            </div>
            
            <div className="flex-1 overflow-auto pr-1 custom-scrollbar max-h-[320px] w-full border-b border-transparent">
              <div className="relative pl-6 pb-2 min-w-[450px]">
                {/* Vertical Connector Line */}
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border-main/60"></div>

                {/* Primary Parent Node */}
                <div className="relative mb-6">
                  <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm z-10"></div>
                  <div 
                    onClick={() => setCustomer('ACC-982341')}
                    className="p-3 bg-primary text-white rounded-xl cursor-pointer hover:bg-primary-dark transition-all shadow-md group flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Parent</p>
                      <p className="text-[13px] font-black truncate">TechSolutions Global</p>
                    </div>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Sub-Account Children */}
                <div className="space-y-2">
                  {[
                    { name: 'Chen Logistics', id: 'ACC-552109', industry: 'Logistics' },
                    { name: 'Rodriguez Media', id: 'ACC-110293', industry: 'Digital' },
                    { name: 'Nexus Venture', id: 'ACC-771100', industry: 'Capital' },
                    { name: 'Global Connect', id: 'ACC-123456', industry: 'Network' },
                    { name: 'Quantum Data', id: 'ACC-789012', industry: 'Cloud' }
                  ].map((child, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-3 h-px bg-border-main group-hover:bg-primary transition-colors"></div>
                      <div 
                        onClick={() => child.id !== 'ACC-123456' && child.id !== 'ACC-789012' && child.id !== 'ACC-345678' ? setCustomer(child.id) : null}
                        className="ml-3 p-2.5 bg-[#f8f9fa] border border-border-main rounded-lg flex items-center justify-between hover:bg-white hover:border-primary/30 transition-all cursor-pointer group/item"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                           <div className="w-6 h-6 rounded bg-white border border-border-main flex items-center justify-center text-[10px] font-black text-primary shadow-sm shrink-0">
                             {child.name.charAt(0)}
                           </div>
                           <div className="min-w-0">
                             <p className="text-[12px] font-bold text-text-main group-hover/item:text-primary transition-colors truncate">{child.name}</p>
                           </div>
                        </div>
                        <ArrowRight size={12} className="text-text-muted group-hover/item:text-primary transition-transform group-hover/item:translate-x-0.5 shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-xl p-4 border border-border-main flex items-center justify-between group cursor-pointer hover:border-primary/40 hover:-translate-y-0.5 transition-all shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                     <ArrowRightLeft size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-text-main uppercase tracking-tight leading-none">Bulk Transfer</p>
                    <p className="text-[8px] font-bold text-text-muted uppercase mt-1">Fleet Migration</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="bg-white rounded-xl p-4 border border-border-main flex items-center justify-between group cursor-pointer hover:border-purple-600/40 hover:-translate-y-0.5 transition-all shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                     <Package size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-text-main uppercase tracking-tight leading-none">Catalog Sync</p>
                    <p className="text-[8px] font-bold text-text-muted uppercase mt-1">Commercial Deploy</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="bg-white rounded-xl p-4 border border-border-main flex items-center justify-between group cursor-pointer hover:border-amber-600/40 hover:-translate-y-0.5 transition-all shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
                     <Settings size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-text-main uppercase tracking-tight leading-none">Node Config</p>
                    <p className="text-[8px] font-bold text-text-muted uppercase mt-1">Station Protocols</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="bg-primary/95 shadow-lg shadow-primary/20 border-2 border-primary/20 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-primary transition-all overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-2 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                   <Plus size={40} />
                 </div>
                 <div className="flex items-center gap-3 relative z-10">
                   <div className="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center">
                     <Plus size={20} />
                   </div>
                   <div>
                      <p className="text-[11px] font-black text-white uppercase tracking-tight leading-none">Onboard Client</p>
                      <p className="text-[8px] font-black text-white/60 uppercase mt-1">Manual Entry</p>
                   </div>
                 </div>
                 <ChevronRight size={16} className="text-white opacity-60 group-hover:opacity-100 transition-all" />
              </div>
            </div>
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
                  { id: 'AL-001', company: 'Nexus Venture Group', companyId: 'ACC-771100', type: 'High Consumption Spike', severity: 'CRITICAL' },
                  { id: 'AL-002', company: 'TechSolutions Global', companyId: 'ACC-982341', type: 'Unpaid Statement', severity: 'WARNING' },
                  { id: 'AL-003', company: 'Rodriguez Media Group', companyId: 'ACC-110293', type: 'Payment Method Expiring', severity: 'CRITICAL' },
                  { id: 'AL-004', company: 'Chen Logistics & Supply', companyId: 'ACC-552109', type: 'Regional Outage', severity: 'IMMEDIATE' }
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
