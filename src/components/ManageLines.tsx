import React, { useState } from 'react';
import { 
  Smartphone, 
  Wifi, 
  Phone, 
  MoreVertical, 
  Plus, 
  Search, 
  Filter, 
  AlertCircle,
  ClipboardList,
  Activity,
  Package,
  ArrowRightLeft,
  Settings2,
  Trash2,
  TrendingUp,
  PhoneCall,
  MessageSquare,
  MapPin,
  Download,
  Play,
  XCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';
import { Subscription } from '../types';

export default function ManageLines() {
  const { subscriptions } = useCustomer();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Subscription['status']>('All');
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

  const filteredLines = subscriptions.filter(sub => {
    const matchesSearch = sub.phoneNumber.includes(searchTerm) || 
                         sub.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.device.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedLine = subscriptions.find(s => s.id === selectedLineId);

  const getStatusColor = (status: Subscription['status']) => {
    switch (status) {
      case 'Active': return 'bg-[#d4edda] text-[#155724] border-[#c3e6cb]';
      case 'Suspended': return 'bg-[#f8d7da] text-[#721c24] border-[#f5c6cb]';
      case 'Pending': return 'bg-[#fff3cd] text-[#856404] border-[#ffeeba]';
      default: return 'bg-[#e2e3e5] text-[#383d41] border-[#d6d8db]';
    }
  };

  const getIcon = (type: Subscription['type']) => {
    switch (type) {
      case 'Mobile': return Smartphone;
      case 'Fiber': return Wifi;
      case 'VoIP': return Phone;
      default: return Package;
    }
  };

  if (selectedLine) {
    const Icon = getIcon(selectedLine.type);
    const usagePercent = selectedLine.dataTotal > 0 ? selectedLine.dataUsed / selectedLine.dataTotal : 0;

    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedLineId(null)}
          className="flex items-center gap-2 text-[13px] font-bold text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <ArrowRightLeft className="w-4 h-4 rotate-180" /> Back to Subscriptions
        </button>

        <div className="bg-white rounded-xl border border-border-main p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
            <div className="flex items-start gap-6">
              <div className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center border-2",
                selectedLine.status === 'Active' ? "bg-primary-light text-primary border-primary/10" : "bg-bg-app text-text-muted border-border-main"
              )}>
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-extrabold text-text-main">{selectedLine.phoneNumber}</h2>
                  <span className={cn(
                    "px-3 py-1 text-[11px] uppercase font-bold tracking-widest rounded-full border",
                    getStatusColor(selectedLine.status)
                  )}>
                    {selectedLine.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[14px] font-medium text-text-muted">
                  <span className="flex items-center gap-1.5"><Package className="w-4 h-4" /> {selectedLine.plan}</span>
                  <span className="flex items-center gap-1.5"><Smartphone className="w-4 h-4" /> {selectedLine.device}</span>
                  <span className="text-primary font-bold">ID: {selectedLine.id}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              <div className="text-right mb-2">
                <span className="block text-[11px] font-bold text-text-muted uppercase tracking-widest mb-1">Monthly Cost</span>
                <span className="text-3xl font-extrabold text-text-main">${selectedLine.monthlyCost.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-[320px]">
                <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-primary text-white text-[12px] font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-md shadow-primary/10">
                  <Settings2 className="w-4 h-4" /> Modify Plan
                </button>
                {selectedLine.type === 'Fiber' ? (
                  <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-600 text-white text-[12px] font-bold rounded-lg hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20">
                    <MapPin className="w-4 h-4" /> Move Location
                  </button>
                ) : (
                  <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-border-main text-text-main text-[12px] font-bold rounded-lg hover:bg-bg-app transition-all">
                    <Smartphone className="w-4 h-4 text-primary" /> Change Device
                  </button>
                )}
                <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-border-main text-text-main text-[12px] font-bold rounded-lg hover:bg-bg-app transition-all">
                  <Activity className="w-4 h-4 text-primary" /> Change Speed
                </button>
                {selectedLine.status === 'Suspended' ? (
                  <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[12px] font-bold rounded-lg hover:bg-emerald-100 transition-all">
                    <Play className="w-4 h-4" /> Resume
                  </button>
                ) : (
                  <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 text-red-600 text-[12px] font-bold rounded-lg hover:bg-red-100 transition-all">
                    <Trash2 className="w-4 h-4" /> Suspend
                  </button>
                )}
              </div>
              <button className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-red-200 text-red-600 text-[12px] font-bold rounded-lg hover:bg-red-50 transition-all border-dashed group">
                <XCircle className="w-4 h-4 group-hover:animate-pulse" /> Terminate Subscription
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 border-t border-border-main">
            {/* Services inside the offer */}
            <div className="space-y-8">
              <div>
                <h3 className="text-[14px] font-bold text-text-main uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" /> Included Services & Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedLine.services.map((service, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-bg-app rounded-lg border border-border-main hover:border-primary/20 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                      <span className="text-[13px] font-semibold text-text-main">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Billing Insights */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="text-[14px] font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Subscription Billing Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-primary/70 font-medium">Standard Plan Charges</span>
                    <span className="font-bold text-primary">${selectedLine.monthlyCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-primary/70 font-medium">Add-on Service Charges</span>
                    <span className="font-bold text-primary">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-primary/70 font-medium">Out-of-Bundle (Voice/SMS)</span>
                      <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">LIVE</span>
                    </div>
                    <span className="font-bold text-red-600">+${selectedLine.unbilledUsage.estimatedCost.toFixed(2)}</span>
                  </div>
                  {selectedLine.unbilledUsage.voice > 0 && (
                    <div className="flex justify-between items-center text-[11px] pl-4 text-primary/50 italic">
                      <span>• Voice ({selectedLine.unbilledUsage.voice} Mins)</span>
                      <span>Included in estimate</span>
                    </div>
                  )}
                  {selectedLine.unbilledUsage.sms > 0 && (
                    <div className="flex justify-between items-center text-[11px] pl-4 text-primary/50 italic">
                      <span>• SMS ({selectedLine.unbilledUsage.sms} Units)</span>
                      <span>Included in estimate</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-primary/20 flex justify-between items-center">
                    <span className="text-[14px] font-bold text-primary">Projected Next Bill</span>
                    <span className="text-[16px] font-extrabold text-primary">
                      ${(selectedLine.monthlyCost + selectedLine.unbilledUsage.estimatedCost).toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank')}
                    className="w-full mt-2 py-2.5 bg-white border border-primary/30 text-primary text-[11px] font-bold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download size={13} /> View Full Statement (PDF)
                  </button>
                  <p className="text-[10px] text-primary/60 italic font-medium leading-relaxed">
                    * Projections include real-time usage data and active product subscriptions. Final amounts may vary based on exact billing cycle cutoff.
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-[14px] font-bold text-text-main uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" /> Current Cycle Usage
                </h3>
                <div className="space-y-6">
                  {/* Data Usage */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <Wifi className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="block text-[12px] font-bold text-text-main uppercase leading-none mb-1">Data Consumption</span>
                          <span className="text-[10px] text-text-muted font-bold tracking-tighter">NETWORK CONNECTED</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-[14px] font-extrabold text-text-main">{selectedLine.dataUsed} / {selectedLine.dataLimit}</span>
                        <span className="text-[10px] text-text-muted font-bold uppercase">{selectedLine.dataTotal > 0 ? `${(selectedLine.dataTotal - selectedLine.dataUsed).toFixed(1)} GB remaining` : 'Unlimited Data Account'}</span>
                      </div>
                    </div>
                    <div className="h-4 w-full bg-bg-app rounded-full overflow-hidden border border-border-main p-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(usagePercent * 100, 100)}%` }}
                        className={cn(
                          "h-full rounded-full transition-all",
                          usagePercent > 0.9 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-primary"
                        )}
                      />
                    </div>
                  </div>

                  {/* Voice Usage */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <PhoneCall className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="block text-[12px] font-bold text-text-main uppercase leading-none mb-1">Voice Usage</span>
                          <span className="text-[10px] text-text-muted font-bold tracking-tighter">REAL-TIME ANALYTICS</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-[14px] font-extrabold text-text-main">
                          {selectedLine.voiceUsed} / {selectedLine.voiceTotal === 0 ? 'Unlimited' : selectedLine.voiceTotal}
                        </span>
                        <span className="text-[10px] text-text-muted font-bold uppercase">MINUTES</span>
                      </div>
                    </div>
                    {selectedLine.voiceTotal > 0 && (
                      <div className="h-4 w-full bg-bg-app rounded-full overflow-hidden border border-border-main p-1">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((selectedLine.voiceUsed / selectedLine.voiceTotal) * 100, 100)}%` }}
                          className={cn(
                            "h-full rounded-full transition-all",
                            (selectedLine.voiceUsed / selectedLine.voiceTotal) > 0.9 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-primary"
                          )}
                        />
                      </div>
                    )}
                  </div>

                  {/* SMS Usage */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="block text-[12px] font-bold text-text-main uppercase leading-none mb-1">SMS Status</span>
                          <span className="text-[10px] text-text-muted font-bold tracking-tighter">GLOBAL REACH ENABLED</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-[14px] font-extrabold text-text-main">
                          {selectedLine.smsUsed} / {selectedLine.smsTotal === 0 ? 'Unlimited' : selectedLine.smsTotal}
                        </span>
                        <span className="text-[10px] text-text-muted font-bold uppercase">MESSAGES</span>
                      </div>
                    </div>
                    {selectedLine.smsTotal > 0 && (
                      <div className="h-4 w-full bg-bg-app rounded-full overflow-hidden border border-border-main p-1">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((selectedLine.smsUsed / selectedLine.smsTotal) * 100, 100)}%` }}
                          className={cn(
                            "h-full rounded-full transition-all",
                            (selectedLine.smsUsed / selectedLine.smsTotal) > 0.9 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-primary"
                          )}
                        />
                      </div>
                    )}
                  </div>

                  {/* Out-of-bundle Summary */}
                  <div className="pt-2">
                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[11px] font-bold text-red-800 uppercase tracking-tight leading-none mb-1">Estimated Out-of-Bundle Costs</span>
                          <span className="text-[10px] text-red-600/70 font-medium">Real-time charge projection based on current cycle activity</span>
                        </div>
                      </div>
                      <span className="text-xl font-black text-red-600">${selectedLine.unbilledUsage.estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Unbilled Usage */}
              <div>
                <h3 className="text-[14px] font-bold text-text-main uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Unbilled / Real-time Usage
                </h3>
                <div className="bg-white border border-border-main rounded-lg overflow-hidden">
                  <div className="bg-bg-app p-3 border-b border-border-main flex items-center justify-between">
                    <span className="text-[11px] font-bold text-text-main uppercase tracking-tighter">Usage Type</span>
                    <span className="text-[11px] font-bold text-text-main uppercase tracking-tighter text-right">Volume</span>
                  </div>
                  <div className="divide-y divide-border-main">
                    {[
                      { label: 'Unbilled Data', value: selectedLine.unbilledUsage.data >= 1000 ? `${(selectedLine.unbilledUsage.data/1000).toFixed(2)} GB` : `${selectedLine.unbilledUsage.data} MB`, icon: Wifi },
                      { label: 'Unbilled Voice', value: `${selectedLine.unbilledUsage.voice} Mins`, icon: PhoneCall },
                      { label: 'Unbilled SMS', value: `${selectedLine.unbilledUsage.sms} Units`, icon: Package },
                    ].map((usage, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 hover:bg-bg-app transition-colors group">
                        <div className="flex items-center gap-3">
                          <usage.icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                          <span className="text-[13px] font-medium text-text-main">{usage.label}</span>
                        </div>
                        <span className="text-[13px] font-bold text-text-main">{usage.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
                     <span className="text-[11px] font-bold text-emerald-700 uppercase">Estimated Real-time Charges</span>
                     <span className="text-[14px] font-extrabold text-emerald-700">${selectedLine.unbilledUsage.estimatedCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line History/Logs placeholder */}
        <div className="bg-white rounded-lg border border-border-main max-w-2xl">
           <div className="p-4 border-b border-border-main">
             <h3 className="text-[12px] font-bold text-text-main uppercase tracking-wider">Line Lifecycle Log</h3>
           </div>
           <div className="divide-y divide-border-main">
              <div className="p-3 text-[12px] flex items-center justify-between">
                 <span className="text-text-muted">Subscription Renewed</span>
                 <span className="font-bold">Jan 01, 2024</span>
              </div>
              <div className="p-3 text-[12px] flex items-center justify-between">
                 <span className="text-text-muted">SIM Card Replaced (eSIM)</span>
                 <span className="font-bold">Nov 15, 2023</span>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3 rounded-lg border border-border-main shadow-sm">
        <div className="flex-1 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by phone, plan or device..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f1f3f5] border border-border-main rounded-md text-[13px] outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Status:</span>
              <div className="flex items-center bg-[#f1f3f5] p-1 rounded-md border border-border-main">
                {['All', 'Active', 'Suspended', 'Pending'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter as any)}
                    className={cn(
                      "px-3 py-1 rounded-[4px] text-[10px] font-bold transition-all",
                      statusFilter === filter 
                        ? "bg-white text-primary shadow-sm" 
                        : "text-text-muted hover:text-text-main"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <span className="hidden xl:block text-[11px] font-black text-primary uppercase tracking-[0.1em] border-l border-border-main pl-4">
            {filteredLines.length} Results
          </span>
        </div>

        <button className="px-4 py-2 bg-primary text-white text-[12px] font-bold rounded-md hover:bg-opacity-90 transition-all flex items-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          New Subscription
        </button>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
           <Filter size={14} className="text-text-muted" />
           <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Enterprise Fleet Overview ({useCustomer().currentCustomer?.totalLines} Total Lines)</span>
        </div>
        <div className="flex items-center gap-4">
           <button className="text-[11px] font-black text-primary flex items-center gap-1 hover:underline">
             CSV Export <Download size={12} />
           </button>
        </div>
      </div>

      {/* Subscription List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center gap-2 px-1 mb-2">
            <Smartphone size={14} className="text-text-muted" />
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Active Subscriptions</span>
          </div>
          {filteredLines.map((sub, idx) => {
            const Icon = getIcon(sub.type);
            const usagePercent = sub.dataTotal > 0 ? sub.dataUsed / sub.dataTotal : 0;
            const isNearingLimit = usagePercent >= 0.9;

            return (
              <motion.div
                layout
                key={sub.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "bg-white rounded-lg border p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-primary/40 transition-all group shadow-sm",
                  isNearingLimit ? "border-red-200 bg-red-50/10 shadow-red-100/50" : "border-border-main"
                )}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-colors border",
                    sub.status === 'Active' 
                      ? (isNearingLimit ? "bg-red-100 text-red-600 border-red-200" : "bg-primary-light text-primary border-primary/10") 
                      : "bg-[#f1f3f5] text-text-muted border-border-main"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-[15px] font-bold text-text-main">{sub.phoneNumber}</h3>
                      <span className={cn(
                        "px-2 py-0.5 text-[9px] uppercase font-bold tracking-tight rounded-md border",
                        getStatusColor(sub.status)
                      )}>
                        {sub.status}
                      </span>
                      {isNearingLimit && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase font-bold tracking-tight rounded-md bg-red-600 text-white border-red-600 animate-pulse">
                          <AlertCircle className="w-2.5 h-2.5" /> Limit Warning
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[12px] font-medium text-text-muted">
                      <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {sub.plan}</span>
                      <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" /> {sub.device}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {/* Data Usage bar */}
                  <div className="min-w-[140px] flex-1 lg:flex-none">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider",
                          isNearingLimit ? "text-red-600" : "text-text-muted"
                        )}>Data Usage</span>
                        {isNearingLimit && <AlertCircle className="w-3 h-3 text-red-600" />}
                      </div>
                      <span className={cn(
                        "text-[11px] font-bold",
                        isNearingLimit ? "text-red-700" : "text-text-main"
                      )}>{sub.dataUsed} / {sub.dataLimit}</span>
                    </div>
                    <div className="h-2 w-full bg-[#f1f3f5] rounded-full overflow-hidden border border-border-main">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${usagePercent * 100}%` }}
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          isNearingLimit ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" : "bg-primary"
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button 
                      onClick={() => setSelectedLineId(sub.id)}
                      className="px-4 py-2 bg-text-main text-white text-[11px] font-extrabold rounded-md hover:bg-black transition-colors uppercase tracking-wider shadow-sm"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contract/Document Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2 px-1 mb-2">
            <ClipboardList size={14} className="text-text-muted" />
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Active Contracts</span>
          </div>
          <div className="bg-white border border-border-main rounded-xl p-4 shadow-sm space-y-4">
            {[
              { title: 'Master Service Agreement', id: 'MSA-2024-991', date: 'Jan 2024', status: 'In Force' },
              { title: 'Fleet Maintenance Addendum', id: 'FMA-2024-102', date: 'Feb 2024', status: 'In Force' },
              { title: 'SLA Level: Platinum', id: 'SLA-PLAT-001', date: 'Jan 2024', status: 'Active' },
            ].map((contract, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-[12px] font-bold text-text-main group-hover:text-primary transition-colors">{contract.title}</h4>
                  <div className="p-1 px-1.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black uppercase">
                    {contract.status}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-text-muted uppercase tracking-tighter">ID: {contract.id} • {contract.date}</span>
                  <button className="text-text-muted group-hover:text-primary transition-colors">
                    <Download size={12} />
                  </button>
                </div>
                {i < 2 && <div className="mt-4 border-b border-border-main/50"></div>}
              </div>
            ))}
            <button className="w-full py-3 mt-2 bg-bg-app border border-border-main rounded-lg text-[11px] font-black text-text-main uppercase tracking-widest hover:bg-white transition-all border-dashed">
              Archive & History
            </button>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
             <div className="flex items-center gap-2 mb-3">
               <TrendingUp size={14} className="text-primary" />
               <h4 className="text-[11px] font-black text-primary uppercase tracking-widest">Contract Health</h4>
             </div>
             <p className="text-[11px] text-text-muted font-medium mb-4 leading-relaxed">
               All active contracts are currently in compliance with agreed SLAs. Next review period: <span className="text-text-main font-bold">June 2024</span>.
             </p>
             <button className="w-full py-2 bg-primary text-white text-[11px] font-bold rounded-lg shadow-sm">
               Download Contract Bundle
             </button>
          </div>
        </div>
      </div>

        {filteredLines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-border-main">
            <div className="w-12 h-12 bg-bg-app rounded-full flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-text-muted" />
            </div>
            <h3 className="text-[15px] font-bold text-text-main">No subscriptions found</h3>
            <p className="text-[12px] text-text-muted">Adjust filters to see your active subscriptions.</p>
          </div>
        )}

        {filteredLines.length > 0 && useCustomer().currentCustomer && filteredLines.length < (useCustomer().currentCustomer?.activeLines || 0) && (
          <button className="w-full py-4 bg-white border border-border-main border-dashed text-text-muted text-[11px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-bg-app transition-all hover:text-primary hover:border-primary/30 flex items-center justify-center gap-3 group">
             View more subscriptions
             <ArrowRightLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

      {/* Alert Banner */}
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-5 flex items-start gap-4">
        <div className="p-1.5 bg-white rounded-md shadow-sm border border-primary/20">
          <AlertCircle className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h4 className="font-bold text-[13px] text-primary mb-0.5">Expiring Contracts</h4>
          <p className="text-[12px] text-text-muted leading-relaxed font-medium">
            3 Mobile lines are nearing end-of-contract. Review renewal options to maintain enterprise rates.
          </p>
        </div>
      </div>
    </div>
  );
}
