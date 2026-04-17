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
  Package,
  ArrowRightLeft,
  Settings2,
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';
import { Subscription } from '../types';

export default function ManageLines() {
  const { subscriptions } = useCustomer();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Suspended'>('All');

  const filteredLines = subscriptions.filter(sub => {
    const matchesSearch = sub.phoneNumber.includes(searchTerm) || sub.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || sub.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

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

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3 rounded-lg border border-border-main shadow-sm">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search phone summary..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f1f3f5] border border-border-main rounded-md text-[13px] outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
          <div className="flex items-center bg-[#f1f3f5] p-1 rounded-md border border-border-main">
            {['All', 'Active', 'Suspended'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={cn(
                  "px-3 py-1 rounded-[4px] text-[11px] font-bold transition-all",
                  activeFilter === filter 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-text-muted hover:text-text-main"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <button className="px-4 py-2 bg-primary text-white text-[12px] font-bold rounded-md hover:bg-opacity-90 transition-all flex items-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Add New Line
        </button>
      </div>

      {/* Subscription List */}
      <div className="grid grid-cols-1 gap-3">
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

                <div className="flex items-center gap-1.5">
                  <button className="p-2 text-text-muted hover:text-primary hover:bg-primary-light rounded-md transition-all border border-transparent" title="Modify">
                    <Settings2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-text-muted hover:text-primary hover:bg-primary-light rounded-md transition-all border border-transparent" title="Change">
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-md transition-all border border-transparent" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="h-6 w-[1px] bg-border-main mx-1"></div>
                  <button className="px-3 py-1.5 bg-text-main text-white text-[11px] font-bold rounded-md hover:opacity-90 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredLines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-border-main">
            <div className="w-12 h-12 bg-bg-app rounded-full flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-text-muted" />
            </div>
            <h3 className="text-[15px] font-bold text-text-main">No lines found</h3>
            <p className="text-[12px] text-text-muted">Adjust filters to see lines.</p>
          </div>
        )}
      </div>

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
