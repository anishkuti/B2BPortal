import React, { useState } from 'react';
import { 
  CreditCard, 
  History, 
  Smartphone, 
  Search,
  Users2,
  Smartphone as SmartphoneIcon,
  Wifi,
  Package,
  Settings2,
  ArrowRightLeft,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { useCustomer } from './context/CustomerContext';
import Overview from './components/Overview';
import ManageLines from './components/ManageLines';
import BillingAndPayments from './components/BillingAndPayments';
import PaymentHistory from './components/PaymentHistory';
import Offerings from './components/Offerings';
import CasesAndOrders from './components/CasesAndOrders';
import ChatAssistant from './components/ChatAssistant';

type TabType = 'overview' | 'lines' | 'billing' | 'history' | 'offerings' | 'cases';

export default function App() {
  const { currentCustomer, allCustomers, setCustomer } = useCustomer();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'lines', label: 'Manage Lines' },
    { id: 'billing', label: 'Billing & Payments' },
    { id: 'cases', label: 'Orders & Cases' },
    { id: 'offerings', label: 'Offerings' },
    { id: 'history', label: 'Payment History' },
  ];

  const filteredCustomers = searchQuery.trim() === '' 
    ? [] 
    : allCustomers.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="flex flex-col h-screen bg-bg-app text-text-main font-sans overflow-hidden">
      {/* Header - Top Bar */}
      <header className="h-[60px] bg-white border-b border-border-main px-6 flex items-center justify-between flex-shrink-0 z-50">
        <div className="flex items-center gap-2">
          <div className="font-extrabold text-xl tracking-tighter text-primary flex items-center gap-2">
            <div className="p-1 bg-primary text-white rounded">
              <SmartphoneIcon size={20} />
            </div>
            TELCO<span className="text-text-main font-bold">CONNECT</span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search customer name, account number, or industry..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-10 pr-4 py-2 bg-[#f1f3f5] border border-border-main rounded-md text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
            />
          </div>

          <AnimatePresence>
            {isSearchFocused && filteredCustomers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-full mt-2 left-0 right-0 bg-white border border-border-main rounded-lg shadow-xl overflow-hidden z-[100]"
              >
                <div className="p-2 text-[10px] font-bold text-text-muted uppercase tracking-widest bg-bg-app border-b border-border-main">
                  Customer Search Results
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      onMouseDown={(e) => e.preventDefault()} // Prevent blur from closing before click
                      onClick={() => {
                        setCustomer(customer.id);
                        setSearchQuery('');
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-bg-app border-b border-border-main last:border-0 flex items-center gap-3 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {customer.companyName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-text-main">{customer.companyName}</div>
                        <div className="text-[11px] text-text-muted">{customer.name} • {customer.id}</div>
                      </div>
                      <div className="ml-auto">
                         <span className={cn(
                           "text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter",
                           customer.tier === 'Enterprise' ? "bg-emerald-100 text-emerald-700" :
                           customer.tier === 'Premium' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                         )}>
                           {customer.tier}
                         </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[13px] font-bold text-text-main">Agent: Sarah Mitchell</div>
            <div className="text-[11px] text-text-muted font-medium">L2 Support Specialist</div>
          </div>
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20">
            SM
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-border-main flex px-6 flex-shrink-0 z-40">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabType)}
            className={cn(
              "px-5 py-4 text-[13px] font-semibold transition-all border-b-2 cursor-pointer outline-none",
              activeTab === item.id 
                ? "text-primary border-primary" 
                : "text-text-muted border-transparent hover:text-text-main"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Main Container - 3 Column Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_240px] bg-border-main gap-[1px] overflow-hidden">
        
        {/* Left Panel: Customer 360 Summary */}
        <section className="bg-white p-6 overflow-y-auto hidden lg:flex flex-col border-r border-border-main lg:border-r-0">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-[#e9ecef] rounded-full mx-auto mb-3 flex items-center justify-center text-primary text-2xl font-bold border border-border-main">
              {currentCustomer.companyName.charAt(0)}
            </div>
            <h2 className="text-[17px] font-bold text-text-main">{currentCustomer.companyName}</h2>
            <p className="text-[12px] text-text-muted mb-3 font-medium">{currentCustomer.id}</p>
            <span className="inline-block px-3 py-1 bg-[#d4edda] text-[#155724] text-[10px] font-bold rounded-full uppercase tracking-tight">
              {currentCustomer.tier} PARTNER
            </span>
          </div>

          <div className="space-y-1 divide-y divide-gray-100">
            {[
              { label: 'Contact', value: currentCustomer.name },
              { label: 'Total Lines', value: `${currentCustomer.totalLines} Active` },
              { label: 'Tenure', value: '4.5 Years' },
              { label: 'Plan Type', value: currentCustomer.tier === 'Enterprise' ? 'Enterprise XL' : 'Business Pro' },
              { label: 'Industry', value: currentCustomer.industry },
              { label: 'Account Manager', value: currentCustomer.accountManager },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between py-3 text-[13px]">
                <span className="text-text-muted">{stat.label}</span>
                <span className="font-semibold text-text-main text-right">{stat.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-lg">
             <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">Account Health</div>
             <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-primary/10">
                <div className="h-full bg-primary w-[92%]"></div>
             </div>
             <div className="mt-2 text-[10px] text-primary/80 font-semibold">92% Satisfaction Index</div>
          </div>
        </section>

        {/* Center Panel: Main Content */}
        <section className="bg-bg-app overflow-y-auto p-6 relative no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="max-w-5xl mx-auto"
            >
              {activeTab === 'overview' && <Overview />}
              {activeTab === 'lines' && <ManageLines />}
              {activeTab === 'billing' && <BillingAndPayments />}
              {activeTab === 'offerings' && <Offerings />}
              {activeTab === 'history' && <PaymentHistory />}
              {activeTab === 'cases' && <CasesAndOrders />}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Right Panel: Actions & Static Chat */}
        <section className="bg-white p-5 hidden xl:flex flex-col overflow-hidden border-l border-border-main">
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-full mb-6 py-4 bg-primary text-white text-[13px] font-extrabold rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            CONNECT TO AN AGENT
          </button>

          <div className="text-[11px] font-extrabold text-text-muted uppercase tracking-[0.5px] mb-4">
            Service Management
          </div>
          <div className="space-y-2 mb-6">
            {[
              { label: 'Add a New Line', icon: '➕' },
              { label: 'Modify Subscription', icon: '⚙️' },
              { label: 'Change Device', icon: '📱' },
              { label: 'Change Speed', icon: '⚡' },
              { label: 'Stop Service', icon: '🛑' },
            ].map((action, i) => (
              <button 
                key={i}
                className="w-full flex items-center gap-3 p-3 bg-white border border-border-main rounded-md text-[13px] font-semibold text-text-main hover:bg-bg-app transition-colors text-left group"
              >
                <span className="text-base group-hover:scale-110 transition-transform">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col h-[320px] border border-border-main rounded-lg overflow-hidden bg-[#fdfdfd]">
            <div className="bg-primary text-white p-3 text-[12px] font-bold flex items-center justify-between">
              Agent Support Chat
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 p-3 text-[12px] overflow-y-auto space-y-3 no-scrollbar scroll-smooth">
              <div className="bg-[#e9ecef] p-3 rounded-lg rounded-tl-none self-start max-w-[90%] leading-relaxed text-text-main shadow-sm">
                Hello! I see you're looking at {currentCustomer.companyName}'s current billing cycle. How can I help?
              </div>
              <div className="bg-primary-light p-3 rounded-lg rounded-tr-none self-end max-w-[90%] ml-auto leading-relaxed text-primary shadow-sm border border-primary/10">
                The data usage for the marketing team line seems higher than usual this month.
              </div>
              <div className="bg-[#e9ecef] p-3 rounded-lg rounded-tl-none self-start max-w-[90%] leading-relaxed text-text-main shadow-sm">
                Checking that now. I'll analyze the top data sessions for Line 8845...
              </div>
            </div>
            <div className="p-3 border-t border-border-main bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="w-full bg-slate-50 border border-border-main rounded px-3 py-2 text-[12px] outline-none text-text-main focus:border-primary/50 transition-colors"
                  onFocus={() => setIsChatOpen(true)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat Assistant (Interactive Experience) */}
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
