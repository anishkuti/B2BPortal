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
import AddSubscription from './AddSubscription';
import BulkOrder from './BulkOrder';

interface ServiceRequestsAndOrdersProps {
  initialTab?: 'Requests' | 'Orders';
  hideTabs?: boolean;
}

export default function ServiceRequestsAndOrders({ initialTab = 'Requests', hideTabs = false }: ServiceRequestsAndOrdersProps) {
  const { serviceRequests, orders } = useCustomer();
  const [activeTab, setActiveTab] = useState<'Requests' | 'Orders'>(initialTab);
  
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>('All');
  const [orderSegmentFilter, setOrderSegmentFilter] = useState<string>('All');
  const [showOrderFilters, setShowOrderFilters] = useState(false);

  const [view, setView] = useState<'List' | 'Add' | 'Bulk'>('List');

  const filteredRequests = serviceRequests.filter(sr => {
    const statusMatch = statusFilter === 'All' || sr.status === statusFilter;
    const priorityMatch = priorityFilter === 'All' || sr.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const filteredOrders = orders.filter(order => {
    const statusMatch = orderStatusFilter === 'All' || order.status === orderStatusFilter;
    const typeMatch = orderTypeFilter === 'All' || order.type === orderTypeFilter;
    const segmentMatch = orderSegmentFilter === 'All' || order.segment === orderSegmentFilter;
    return statusMatch && typeMatch && segmentMatch;
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

  if (view === 'Add') {
    return <AddSubscription onClose={() => setView('List')} onSuccess={() => setView('List')} />;
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-xl border border-border-main shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Tab System */}
        {!hideTabs && (
          <div className="flex border-b border-border-main bg-bg-app/30">
            <button 
              onClick={() => setActiveTab('Requests')}
              className={cn(
                "px-8 py-4 text-[13px] font-black uppercase tracking-widest transition-all border-b-2 flex items-center gap-3",
                activeTab === 'Requests' 
                  ? "border-primary text-primary bg-white shadow-[0_-4px_0_0_inset_#3b82f6]" 
                  : "border-transparent text-text-muted hover:text-text-main"
              )}
            >
              <ClipboardList size={18} />
              Service Requests
            </button>
            <button 
              onClick={() => setActiveTab('Orders')}
              className={cn(
                "px-8 py-4 text-[13px] font-black uppercase tracking-widest transition-all border-b-2 flex items-center gap-3",
                activeTab === 'Orders' 
                  ? "border-primary text-primary bg-white shadow-[0_-4px_0_0_inset_#3b82f6]" 
                  : "border-transparent text-text-muted hover:text-text-main"
              )}
            >
              <Package size={18} />
              Orders
            </button>
          </div>
        )}

        {/* Dynamic Content Area */}
        {activeTab === 'Requests' ? (
          <div className="flex flex-col flex-1">
            <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-app/50 relative">
              {!hideTabs ? (
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-primary" />
                  <h3 className="text-[12px] font-extrabold text-text-main uppercase tracking-widest">Service Requests</h3>
                </div>
              ) : <div className="w-[120px]" />}
              <div className="flex items-center gap-2 text-text-muted text-[11px] font-bold">
                 Subscription: <span className="text-primary-dark">Associated Mobile / Link ID</span>
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
            
            <div className="divide-y divide-border-main overflow-y-auto flex-1">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((sr) => (
                  <div key={sr.id} className="p-6 hover:bg-bg-app transition-colors group cursor-pointer border-l-4 border-transparent hover:border-primary">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-mono font-bold text-text-muted bg-bg-app px-2 py-1 rounded border border-border-main">{sr.id}</span>
                        <span className={cn(
                          "px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest",
                          getPriorityBadge(sr.priority)
                        )}>
                          {sr.priority}
                        </span>
                        {sr.subscriptionId && (
                           <div className="flex items-center gap-2 px-2.5 py-1 bg-primary/5 rounded border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
                             <Clock size={12} /> {sr.subscriptionId}
                           </div>
                        )}
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider",
                        getStatusBadge(sr.status)
                      )}>
                        {sr.status}
                      </span>
                    </div>
                    <h4 className="text-[16px] font-black text-text-main mb-2 tracking-tight group-hover:text-primary transition-colors">{sr.subject}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-[11px] font-bold text-text-muted opacity-80 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Updated {sr.updatedAt}</span>
                        <span className="flex items-center gap-2">Category: {sr.type}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center flex flex-col items-center justify-center flex-1">
                  <div className="w-16 h-16 bg-bg-app rounded-full flex items-center justify-center mb-6 opacity-50">
                    <AlertCircle className="w-8 h-8 text-text-muted" />
                  </div>
                  <h4 className="text-[18px] font-black text-text-main mb-2">No Service Requests found</h4>
                  <p className="text-[13px] text-text-muted max-w-[280px] mx-auto leading-relaxed">No requests match your current filtering criteria.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-app/50 relative">
              {!hideTabs ? (
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <h3 className="text-[12px] font-extrabold text-text-main uppercase tracking-widest">Orders</h3>
                </div>
              ) : <div className="w-[120px]" />}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowOrderFilters(!showOrderFilters)}
                  className={cn(
                    "p-1.5 rounded-md border transition-all flex items-center gap-1.5 text-[11px] font-bold",
                    showOrderFilters || orderStatusFilter !== 'All' || orderTypeFilter !== 'All' || orderSegmentFilter !== 'All'
                      ? "bg-primary-light text-primary border-primary/20" 
                      : "bg-white text-text-muted border-border-main hover:text-text-main"
                  )}
                >
                  <Filter className="w-3 h-3" />
                  Filters {(orderStatusFilter !== 'All' || orderTypeFilter !== 'All' || orderSegmentFilter !== 'All') && '•'}
                </button>
                <button className="text-[11px] font-bold text-primary hover:underline cursor-default">New Order</button>
              </div>

              <AnimatePresence>
                {showOrderFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="absolute top-full left-0 right-0 bg-white border-b border-border-main p-6 z-20 shadow-2xl flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-3">
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Status Flow</p>
                          <div className="flex flex-wrap gap-1.5">
                            {['All', 'Order Placed', 'In Progress', 'Shipped', 'Completed'].map((s) => (
                              <button key={s} onClick={() => setOrderStatusFilter(s)} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all border", orderStatusFilter === s ? "bg-primary text-white border-primary" : "bg-bg-app text-text-muted border-transparent hover:border-border-main")}>{s}</button>
                            ))}
                          </div>
                       </div>
                       <div className="space-y-3">
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Order Category</p>
                          <div className="flex flex-wrap gap-1.5">
                            {['All', 'New', 'Modify', 'Cease', 'Move'].map((t) => (
                              <button key={t} onClick={() => setOrderTypeFilter(t)} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all border", orderTypeFilter === t ? "bg-primary text-white border-primary" : "bg-bg-app text-text-muted border-transparent hover:border-border-main")}>{t}</button>
                            ))}
                          </div>
                       </div>
                       <div className="space-y-3">
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Segment</p>
                          <div className="flex flex-wrap gap-1.5">
                            {['All', 'Fixed', 'Mobile', 'Fiber'].map((seg) => (
                              <button key={seg} onClick={() => setOrderSegmentFilter(seg)} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all border", orderSegmentFilter === seg ? "bg-primary text-white border-primary" : "bg-bg-app text-text-muted border-transparent hover:border-border-main")}>{seg}</button>
                            ))}
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="divide-y divide-border-main overflow-y-auto flex-1">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-bg-app transition-colors group border-l-4 border-transparent hover:border-emerald-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-[11px] font-mono font-bold text-text-muted bg-white border border-border-main px-2 py-0.5 rounded shadow-sm">{order.id}</span>
                           <span className={cn(
                             "px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border shadow-sm",
                             order.segment === 'Mobile' ? "bg-blue-50 text-blue-600 border-blue-100" : 
                             order.segment === 'Fiber' ? "bg-amber-50 text-amber-600 border-amber-100" :
                             "bg-emerald-50 text-emerald-600 border-emerald-100"
                           )}>{order.segment}</span>
                           <span className="text-[10px] font-black bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-tighter border border-gray-200">
                             {order.type}
                           </span>
                        </div>
                        <h4 className="text-[16px] font-black text-text-main tracking-tight group-hover:text-primary transition-colors flex items-center gap-3">
                           {order.subscriptionId || 'NEW LINE ACTIVATION'}
                           {order.subscriptionId && <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">(Assoc. Subscription)</span>}
                        </h4>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[11px] font-black border uppercase tracking-widest",
                        getStatusBadge(order.status)
                      )}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {order.items.map((item, i) => (
                        <span key={i} className="text-[10px] text-text-muted bg-white border border-border-main px-2.5 py-1 rounded-lg font-bold uppercase tracking-tighter">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border-main/50">
                      <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest opacity-80">
                        <div className="flex items-center gap-2 text-text-main">
                           <span className="text-text-muted font-bold tracking-normal">Cost:</span> £{order.total.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-text-muted font-bold tracking-normal">Order Date:</span> {order.date}
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-[11px] font-black text-primary px-4 py-2 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary hover:text-white transition-all uppercase tracking-widest">
                         Track Order <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center flex flex-col items-center justify-center flex-1">
                  <div className="w-16 h-16 bg-bg-app rounded-full flex items-center justify-center mb-6 opacity-50">
                    <Package className="w-8 h-8 text-text-muted" />
                  </div>
                  <h4 className="text-[18px] font-black text-text-main mb-2">No Orders found</h4>
                  <p className="text-[13px] text-text-muted max-w-[280px] mx-auto leading-relaxed">Adjust your filters to see historical or pending orders.</p>
                </div>
              )}
            </div>
          </div>
        )}
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
