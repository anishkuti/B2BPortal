import React, { useState } from 'react';
import { 
  ClipboardList, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';
import { ServiceRequest, Order } from '../types';

export default function ServiceRequestsAndOrders() {
  const { serviceRequests, orders } = useCustomer();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRequests = serviceRequests.filter(sr => {
    const statusMatch = statusFilter === 'All' || sr.status === statusFilter;
    const priorityMatch = priorityFilter === 'All' || sr.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'In Progress':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Shipped':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Pending':
      case 'Order Placed':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Action Required':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-amber-600 bg-amber-50';
      case 'Low':
        return 'text-emerald-600 bg-emerald-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Cases Section */}
        <div className="bg-white rounded-lg border border-border-main shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-app/50 relative">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-primary" />
              <h3 className="text-[12px] font-extrabold text-text-main uppercase tracking-widest">Service Requests</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "p-1.5 rounded-md border transition-all flex items-center gap-1.5 text-[11px] font-bold",
                  showFilters || statusFilter !== 'All' || priorityFilter !== 'All'
                    ? "bg-primary-light text-primary border-primary/20" 
                    : "bg-white text-text-muted border-border-main hover:text-text-main"
                )}
              >
                <Filter className="w-3 h-3" />
                Filters {(statusFilter !== 'All' || priorityFilter !== 'All') && '•'}
              </button>
              <button className="text-[11px] font-bold text-primary hover:underline">New Request</button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white border-b border-border-main p-4 z-20 shadow-lg flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Status Filter</span>
                      {(statusFilter !== 'All' || priorityFilter !== 'All') && (
                        <button 
                          onClick={() => { setStatusFilter('All'); setPriorityFilter('All'); }}
                          className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                        >
                          <X className="w-2.5 h-2.5" /> Clear All
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Pending', 'In Progress', 'Completed', 'Action Required'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-[11px] font-bold transition-all border",
                            statusFilter === s
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-[#f1f3f5] text-text-muted border-transparent hover:border-border-main"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Priority Filter</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'High', 'Medium', 'Low'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setPriorityFilter(p)}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-[11px] font-bold transition-all border",
                            priorityFilter === p
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-[#f1f3f5] text-text-muted border-transparent hover:border-border-main"
                          )}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="divide-y divide-border-main overflow-y-auto max-h-[500px] min-h-[300px]">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((sr) => (
                <div key={sr.id} className="p-4 hover:bg-bg-app transition-colors group cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-text-muted">{sr.id}</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-bold uppercase",
                        getPriorityBadge(sr.priority)
                      )}>
                        {sr.priority}
                      </span>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                      getStatusBadge(sr.status)
                    )}>
                      {sr.status}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-bold text-text-main mb-1 group-hover:text-primary transition-colors">{sr.subject}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] font-medium text-text-muted">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated {sr.updatedAt}</span>
                      <span className="flex items-center gap-1">Type: {sr.type}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center flex flex-col items-center justify-center flex-1">
                <div className="w-12 h-12 bg-bg-app rounded-full flex items-center justify-center mb-4 opacity-50">
                  <AlertCircle className="w-6 h-6 text-text-muted" />
                </div>
                <h4 className="text-[15px] font-bold text-text-main mb-1">No matches found</h4>
                <p className="text-[12px] text-text-muted max-w-[200px] mx-auto leading-relaxed">Adjust your status or priority filters to see more results.</p>
                {(statusFilter !== 'All' || priorityFilter !== 'All') && (
                  <button 
                    onClick={() => { setStatusFilter('All'); setPriorityFilter('All'); }}
                    className="mt-4 px-4 py-2 bg-white border border-border-main rounded-md text-[11px] font-bold text-primary hover:bg-bg-app transition-colors shadow-sm"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Customer Orders Section */}
        <div className="bg-white rounded-lg border border-border-main shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-app/50">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              <h3 className="text-[12px] font-extrabold text-text-main uppercase tracking-widest">Service Orders</h3>
            </div>
            <button className="text-[11px] font-bold text-primary hover:underline">Track All</button>
          </div>

          <div className="divide-y divide-border-main overflow-y-auto max-h-[500px]">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-bg-app transition-colors group">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[11px] font-mono text-text-muted block mb-0.5">{order.id}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-text-main">{order.type}</span>
                      </div>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                      getStatusBadge(order.status)
                    )}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {order.items.map((item, i) => (
                      <span key={i} className="text-[11px] text-text-muted bg-gray-100 px-2 py-0.5 rounded font-medium">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-[11px] font-bold">
                      <span className="text-text-main">${order.total.toLocaleString()}</span>
                      <span className="text-text-muted font-medium">{order.date}</span>
                    </div>
                    <button className="p-1.5 text-text-muted hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <Package className="w-8 h-8 text-text-muted mx-auto mb-3 opacity-20" />
                <p className="text-[13px] font-medium text-text-muted">No recent orders found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-md shadow-sm border border-primary/20">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-[13px] text-primary">Service Level Agreement</h4>
            <p className="text-[12px] text-text-muted font-medium">You have 1 High priority request pending. Expected response time: 2 hours.</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-white text-[12px] font-bold rounded-md hover:bg-opacity-90 transition-all shadow-sm">
          Connect to Specialist
        </button>
      </div>
    </div>
  );
}
