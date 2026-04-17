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
  Globe
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
  const { currentCustomer, usageData, bills } = useCustomer();
  
  const currentBillAmount = bills.length > 0 ? `$${bills[0].amount.toLocaleString()}` : '$0.00';
  const billTrend = bills.length > 1 
    ? (bills[0].amount > bills[1].amount ? '+1.2%' : '-2.4%')
    : 'New Account';

  const stats = [
    { label: 'Active Subscriptions', value: currentCustomer.activeLines, total: currentCustomer.totalLines, icon: Users, color: 'text-primary', bg: 'bg-primary-light' },
    { label: 'Monthly Data Usage', value: '1.2 TB', trend: '+12%', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50', up: true },
    { label: 'Current Bill', value: currentBillAmount, trend: billTrend, icon: TrendingDown, color: 'text-emerald-600', bg: 'bg-emerald-50', up: bills.length > 1 ? bills[0].amount > bills[1].amount : false },
    { label: 'Security Alerts', value: '0', icon: ShieldCheck, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const devices = [
    { name: 'Apple Suite', value: 45, color: '#0056b3' },
    { name: 'Samsung Group', value: 25, color: '#4f46e5' },
    { name: 'Google Pixel', value: 20, color: '#059669' },
    { name: 'Others', value: 10, color: '#64748b' },
  ];

  return (
    <div className="space-y-6 pb-12">
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
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-border-main shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-bold text-text-main">Network Usage Analytics</h3>
              <p className="text-[12px] text-text-muted font-medium">Consumption trends over the last 7 days</p>
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
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #dee2e6', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    padding: '8px',
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

        {/* Device Distribution */}
        <div className="bg-white p-6 rounded-lg border border-border-main shadow-sm">
          <div className="mb-6">
            <h3 className="text-[15px] font-bold text-text-main uppercase tracking-wider mb-1">Asset Distribution</h3>
            <p className="text-[12px] text-text-muted font-medium">Breakdown across organization</p>
          </div>
          
          <div className="h-[180px] w-full flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={devices} layout="vertical" barSize={20} margin={{ left: -30 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ borderRadius: '8px', border: '1px solid #dee2e6', fontSize: '11px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {devices.map((device, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: device.color }}></div>
                  <span className="text-[12px] font-semibold text-text-muted">{device.name}</span>
                </div>
                <span className="text-[12px] font-bold text-text-main">{device.value}%</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-3 bg-white border border-border-main rounded-md text-text-main text-[12px] font-bold hover:bg-bg-app transition-colors flex items-center justify-center gap-2 border-dashed">
            View All Assets <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
