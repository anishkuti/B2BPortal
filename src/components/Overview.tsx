import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Globe,
  Mail,
  MapPin,
  AlertTriangle,
  Info,
  History,
  MessageSquare,
  Video,
  User,
  CreditCard,
  MessageCircle,
  Hash,
  Target,
  Heart,
  CalendarDays,
  Briefcase
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';

export default function Overview() {
  const { currentCustomer, usageData, bills, serviceRequests, alerts } = useCustomer();
  
  const currentBillAmount = bills.length > 0 ? `$${bills[0].amount.toLocaleString()}` : '$0.00';
  const billTrend = bills.length > 1 
    ? (bills[0].amount > bills[1].amount ? '+1.2%' : '-2.4%')
    : 'New Account';

  const stats = [
    { label: 'Active Subscriptions', value: currentCustomer.activeLines, total: currentCustomer.totalLines, icon: Users, color: 'text-primary', bg: 'bg-primary-light' },
    { label: 'Network Usage', value: '1.2 TB', trend: '+12%', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50', up: true },
    { label: 'Current Bill', value: currentBillAmount, trend: billTrend, icon: TrendingDown, color: 'text-emerald-600', bg: 'bg-emerald-50', up: bills.length > 1 ? bills[0].amount > bills[1].amount : false },
    { label: 'Health Score', value: '99.9%', icon: Globe, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  const usageDistribution = [
    { name: 'Data Services', value: 55, color: '#0056b3' },
    { name: 'Voice Traffic', value: 20, color: '#4f46e5' },
    { name: 'Cloud Hosting', value: 15, color: '#059669' },
    { name: 'IoT Connectivity', value: 10, color: '#64748b' },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Network': return Zap;
      case 'Billing': return CreditCard;
      case 'Security': return ShieldCheck;
      default: return Info;
    }
  };

  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-50 border-red-100 text-red-800';
      case 'Warning': return 'bg-amber-50 border-amber-100 text-amber-800';
      default: return 'bg-blue-50 border-blue-100 text-blue-800';
    }
  };

  // Mock CreditCard import since it's not and actually we don't have it in lucide list here, oh it's in App.tsx. 
  // I will use Zap, PhoneCall, Globe for now instead of CreditCard if missing.
  // Actually let's use Activity or AlertTriangle.

  return (
    <div className="space-y-6 pb-12">
      {/* Alerts Section - Repositioned to Banner Style */}
      {alerts.length > 0 && (
        <div className="bg-bg-app border-x-4 border-l-red-500 border-r-transparent bg-white shadow-sm overflow-hidden rounded-lg">
          <div className="flex border-b border-border-main p-3 bg-red-50/30">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-700">Priority System Alerts</span>
            </div>
          </div>
          <div className="flex overflow-x-auto p-4 gap-4">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={cn(
                  "min-w-[300px] p-3 rounded-lg border border-opacity-50 flex gap-3 flex-shrink-0 transition-all hover:border-opacity-100",
                  getAlertStyles(alert.severity)
                )}
              >
                <div className="shrink-0 pt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] font-extrabold mb-0.5 truncate">{alert.title}</h4>
                  <p className="text-[11px] leading-tight font-medium opacity-80">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Header - Performance focused */}
      <div className="bg-white rounded-lg border border-border-main shadow-sm overflow-hidden mb-6">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl border border-primary/20 shrink-0">
              {currentCustomer.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-[20px] font-extrabold text-text-main leading-tight uppercase tracking-tight">{currentCustomer.companyName}</h2>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded border border-primary/10 uppercase tracking-tighter">
                  <ShieldCheck size={10} /> {currentCustomer.tier} Contract
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-text-muted font-bold">
                <span className="flex items-center gap-1.5 text-text-main hover:text-primary transition-colors cursor-pointer"><User className="w-3.5 h-3.5 text-primary" /> {currentCustomer.name}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {currentCustomer.industry}</span>
                <span className="flex items-center gap-1.5 text-emerald-600"><Target className="w-3.5 h-3.5" /> Strategic Partner</span>
                <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Since {currentCustomer.joinedDate || '2021'}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-bg-app border border-border-main px-4 py-2 rounded-lg min-w-[140px]">
              <span className="block text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1 text-left">Retention Health</span>
              <span className="text-[14px] font-extrabold text-emerald-600 flex items-center gap-1">
                <Heart size={14} className="fill-emerald-600" /> STABLE
              </span>
            </div>
          </div>
        </div>
        
        {/* Sub-header for additional data points */}
         <div className="bg-bg-app/50 border-t border-border-main px-6 py-3 flex flex-wrap gap-x-8 gap-y-2 justify-between">
           <div className="flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">LTV Projection</span>
               <span className="text-[13px] font-extrabold text-text-main">$450k Annually</span>
             </div>
             <div className="w-[1px] h-6 bg-border-main"></div>
             <div className="flex flex-col">
               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">SLA Compliance</span>
               <span className="text-[13px] font-extrabold text-emerald-600">100% (Last 30d)</span>
             </div>
             <div className="w-[1px] h-6 bg-border-main"></div>
             <div className="flex flex-col">
               <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Tickets Open</span>
               <span className="text-[13px] font-extrabold text-amber-600">{serviceRequests.filter(r => r.status !== 'Completed').length} Pending</span>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <button className="text-[11px] font-extrabold text-primary hover:underline flex items-center gap-1">
               ANALYZE CONTRACT <ArrowUpRight size={12} />
             </button>
           </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-lg border border-border-main shadow-sm group hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2.5 rounded-md", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              {stat.trend && (
                <span className={cn(
                  "flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md",
                  stat.up ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                )}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </span>
              )}
            </div>
            <span className="text-[12px] font-bold text-text-muted uppercase tracking-wider block mb-1">{stat.label}</span>
            <div className="flex items-end gap-2">
              <span className="text-xl font-extrabold text-text-main">{stat.value}</span>
              {stat.total && <span className="text-xs text-text-muted mb-1 font-medium pb-0.5">/ {stat.total}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-border-main shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-bold text-text-main uppercase tracking-tight">Enterprise Network Usage Analytics</h3>
                <p className="text-[12px] text-text-muted font-medium">Consumption trends across all active subscriptions</p>
              </div>
              <select className="bg-[#f1f3f5] border border-border-main rounded-md px-3 py-1.5 text-[11px] font-bold text-text-muted outline-none focus:ring-1 focus:ring-primary/20 transition-all">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Quarter</option>
              </select>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0056b3" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0056b3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#6c757d', fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#6c757d', fontWeight: 600 }}
                    tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}GB` : `${value}MB`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [value >= 1000 ? `${(value/1000).toFixed(1)} GB` : `${value} MB`, 'Usage']}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #dee2e6', 
                      fontSize: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="data" 
                    stroke="#0056b3" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorUsage)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interaction Log */}
          <div className="bg-white p-6 rounded-lg border border-border-main shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-bold text-text-main uppercase tracking-tight">Recent Account Interactions</h3>
                <p className="text-[12px] text-text-muted font-medium">Log of latest customer touchpoints across all channels</p>
              </div>
              <button className="text-[11px] font-bold text-primary hover:underline">View Full History</button>
            </div>
            
            <div className="space-y-4">
              {currentCustomer.interactions?.map((interaction) => (
                <div key={interaction.id} className="flex gap-4 p-4 bg-bg-app rounded-lg border border-border-main hover:border-primary/20 transition-all group cursor-pointer">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                    interaction.type === 'Phone' || interaction.type === 'Call' ? "bg-blue-50 text-blue-600 border-blue-100" :
                    interaction.type === 'SMS' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    interaction.type === 'WhatsApp' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    interaction.type === 'Email' ? "bg-purple-50 text-purple-600 border-purple-100" :
                    "bg-gray-50 text-gray-600 border-gray-100"
                  )}>
                    {(interaction.type === 'Phone' || interaction.type === 'Call') && <PhoneCall size={18} />}
                    {interaction.type === 'SMS' && <MessageSquare size={18} />}
                    {interaction.type === 'WhatsApp' && <MessageCircle size={18} />}
                    {interaction.type === 'Email' && <Mail size={18} />}
                    {interaction.type === 'Chat' && <MessageSquare size={18} />}
                    {interaction.type === 'In-Person' && <User size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-text-main group-hover:text-primary transition-colors">{interaction.type} Session</span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-border-main bg-white text-text-muted uppercase tracking-tighter shadow-sm">{interaction.id}</span>
                      </div>
                      <span className="text-[11px] font-bold text-text-muted bg-white px-2 py-0.5 rounded-full border border-border-main">{interaction.date}</span>
                    </div>
                    <p className="text-[12px] text-text-main font-semibold mb-2 leading-relaxed">{interaction.summary}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded-md border border-emerald-100/50">
                        <ShieldCheck size={12} /> {interaction.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Usage Distribution */}
          <div className="bg-white p-6 rounded-lg border border-border-main shadow-sm">
            <div className="mb-6">
              <h3 className="text-[15px] font-bold text-text-main uppercase tracking-wider mb-1">Usage Distribution</h3>
              <p className="text-[12px] text-text-muted font-medium">Consumption breakdown by service type</p>
            </div>
            
            <div className="h-[180px] w-full flex items-center justify-center mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageDistribution} layout="vertical" barSize={20} margin={{ left: -30 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #dee2e6', fontSize: '11px' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {usageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {usageDistribution.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[12px] font-semibold text-text-muted">{item.name}</span>
                  </div>
                  <span className="text-[12px] font-bold text-text-main">{item.value}%</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3 bg-white border border-border-main rounded-md text-text-main text-[12px] font-bold hover:bg-bg-app transition-colors flex items-center justify-center gap-2 border-dashed">
              Detailed Consumption Report <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Actions / Tips */}
          <div className="bg-primary p-6 rounded-lg text-white shadow-lg shadow-primary/20">
            <Zap className="w-6 h-6 mb-4 text-emerald-400" />
            <h4 className="text-[15px] font-bold mb-2 uppercase tracking-tighter">{currentCustomer.insightTitle || 'Proactive Insight'}</h4>
            <p className="text-[12px] opacity-80 leading-relaxed font-medium mb-6">
              {currentCustomer.insight || 'Monitoring account consumption patterns for optimization opportunities.'}
            </p>
            <button className="w-full py-2.5 bg-white text-primary rounded-md text-[13px] font-bold hover:bg-opacity-90 transition-all shadow-sm">
              Apply Recommendation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
