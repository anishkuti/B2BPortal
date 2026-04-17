import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  AlertCircle,
  Plus,
  FileText,
  Calendar,
  ArrowRightLeft,
  CheckCircle2,
  Building2,
  Wallet
} from 'lucide-react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function BillingAndPayments() {
  const { bills, paymentMethods, subscriptions } = useCustomer();
  const [autoPay, setAutoPay] = useState(true);
  const [billingLevel, setBillingLevel] = useState<'Account' | 'Subscription'>('Account');
  const [selectedSubId, setSelectedSubId] = useState<string>(subscriptions[0]?.id || '');
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [preferredMethodId, setPreferredMethodId] = useState<string>(paymentMethods.find(m => m.isDefault)?.id || paymentMethods[0]?.id || '');
  const [addingMethodType, setAddingMethodType] = useState<'Credit Card' | 'Debit Card' | 'BACS' | null>(null);

  const filteredBills = billingLevel === 'Account' 
    ? bills.filter(b => !b.subscriptionId) // Showing only account-level bills
    : bills.filter(b => b.subscriptionId === selectedSubId); // Showing only sub-level bills for selected sub

  const currentBill = filteredBills[0] || (billingLevel === 'Account' ? bills[0] : null) || { amount: 0, id: 'N/A', date: 'N/A', dueDate: 'N/A', status: 'Paid' };
  const defaultPaymentMethod = paymentMethods.find(m => m.isDefault) || paymentMethods[0];

  return (
    <div className="space-y-6">
      {/* Billing Level Toggle */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex bg-white p-1 rounded-lg border border-border-main shadow-sm">
          <button
            onClick={() => setBillingLevel('Account')}
            className={cn(
              "px-4 py-2 text-[12px] font-bold rounded-md transition-all",
              billingLevel === 'Account' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-muted hover:text-text-main"
            )}
          >
            Account Level
          </button>
          <button
            onClick={() => setBillingLevel('Subscription')}
            className={cn(
              "px-4 py-2 text-[12px] font-bold rounded-md transition-all",
              billingLevel === 'Subscription' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-muted hover:text-text-main"
            )}
          >
            Subscription Level
          </button>
        </div>

        {billingLevel === 'Subscription' && (
          <select 
            value={selectedSubId}
            onChange={(e) => setSelectedSubId(e.target.value)}
            className="bg-white border border-border-main rounded-md px-3 py-2 text-[12px] font-bold text-text-main outline-none focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
          >
            {subscriptions.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.phoneNumber} ({sub.type})</option>
            ))}
          </select>
        )}
      </div>

      {/* Current Balance Card */}
      <div className="bg-white rounded-lg border border-border-main overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border-main flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1 block">Current Balance</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-text-main">${currentBill.amount.toLocaleString()}</span>
              {currentBill.breakdown && (
                <div className="flex bg-[#f1f3f5] rounded-md px-2 py-1 gap-3 ml-2 border border-border-main">
                  <div className="text-[10px]">
                    <span className="text-text-muted font-bold block uppercase tracking-tighter">Product</span>
                    <span className="text-text-main font-bold">${currentBill.breakdown.productCharges.toFixed(2)}</span>
                  </div>
                  <div className="text-[10px]">
                    <span className="text-text-muted font-bold block uppercase tracking-tighter">Service</span>
                    <span className="text-text-main font-bold">${currentBill.breakdown.serviceCharges.toFixed(2)}</span>
                  </div>
                  <div className="text-[10px]">
                    <span className="text-text-muted font-bold block uppercase tracking-tighter">Usage</span>
                    <span className="text-red-500 font-bold">${currentBill.breakdown.usageCharges.toFixed(2)}</span>
                  </div>
                </div>
              )}
              <span className={cn(
                "text-[12px] font-bold px-2 py-0.5 rounded border italic font-medium",
                currentBill.status === 'Unpaid' ? "text-amber-600 bg-amber-50 border-amber-100" : "text-emerald-600 bg-emerald-50 border-emerald-100"
              )}>
                {currentBill.status === 'Unpaid' ? 'Action Required' : 'Paid in Full'}
              </span>
            </div>
            <p className="text-[12px] text-text-muted mt-2 font-medium flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-primary" /> Next autopay scheduled for {currentBill.dueDate}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setShowPaymentFlow(true)}
              className="px-5 py-2.5 bg-primary text-white text-[13px] font-bold rounded-md hover:bg-opacity-90 shadow-sm transition-all whitespace-nowrap flex items-center gap-2"
            >
              <CreditCard size={14} /> Pay Statement
            </button>
            <button 
              onClick={() => window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank')}
              className="px-5 py-2.5 bg-white border border-border-main text-text-main text-[13px] font-bold rounded-md hover:bg-bg-app transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>

        {showPaymentFlow && (
          <div className="p-6 bg-primary/5 border-t border-primary/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[14px] font-bold text-primary uppercase tracking-tight">Complete Payment</h4>
              <button onClick={() => setShowPaymentFlow(false)} className="text-[11px] font-bold text-primary hover:underline">Cancel</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setPreferredMethodId(method.id)}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer transition-all flex flex-col gap-2 relative",
                    preferredMethodId === method.id ? "border-primary bg-white shadow-md" : "border-border-main bg-white/50 hover:bg-white"
                  )}
                >
                  <div className="flex items-center justify-between">
                    {method.type === 'BACS' ? <Building2 size={18} className="text-primary" /> : <CreditCard size={18} className="text-primary" />}
                    {preferredMethodId === method.id && <CheckCircle2 size={14} className="text-primary fill-primary text-white" />}
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-text-main uppercase tracking-tighter">{method.type}</span>
                    <span className="block text-[12px] text-text-muted font-medium">
                      {method.type === 'BACS' ? `••••${method.accountNumber?.slice(-4)}` : `•••• ${method.last4}`}
                    </span>
                  </div>
                </div>
              ))}
              <div 
                className="p-4 border border-dashed border-border-main rounded-lg cursor-pointer hover:border-primary/50 flex flex-col items-center justify-center gap-1 group"
                onClick={() => setAddingMethodType('Credit Card')}
              >
                <Plus size={16} className="text-text-muted group-hover:text-primary" />
                <span className="text-[11px] font-bold text-text-muted uppercase group-hover:text-primary">New Method</span>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-white text-[14px] font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-all">
              Confirm Payment of ${currentBill.amount.toLocaleString()}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-main bg-bg-app">
          {[
            { label: 'Statement Date', value: currentBill.date, icon: FileText },
            { label: 'Due Date', value: currentBill.dueDate, icon: Calendar },
            { label: 'Payment Method', value: defaultPaymentMethod ? `${defaultPaymentMethod.type} ending in ${defaultPaymentMethod.last4}` : 'None Set', icon: CreditCard },
          ].map((item, i) => (
            <div key={i} className="p-4 flex items-center gap-3">
              <div className="p-2 bg-white rounded-md border border-border-main">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-text-muted uppercase tracking-tight">{item.label}</span>
                <span className="block text-[13px] font-bold text-text-main">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice History */}
        <div className="bg-white rounded-lg border border-border-main shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-app/50">
            <h3 className="text-[12px] font-extrabold text-text-main uppercase tracking-widest">Recent Invoices</h3>
            <button className="text-[11px] font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-3 text-[11px] font-bold text-text-muted uppercase border-b border-border-main">Invoice ID</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-text-muted uppercase border-b border-border-main">Date</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-text-muted uppercase border-b border-border-main text-right">Amount</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-text-muted uppercase border-b border-border-main text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-main">
                {filteredBills.slice(0, 4).map((bill) => (
                  <tr key={bill.id} className="hover:bg-bg-app transition-colors group">
                    <td className="px-4 py-3">
                      <span className="text-[13px] font-bold text-text-main">{bill.id}</span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-text-muted font-medium">{bill.date}</td>
                    <td className="px-4 py-3 text-[13px] font-extrabold text-text-main text-right">${bill.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank')}
                        className="p-1.5 text-text-muted hover:text-primary transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg border border-border-main shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-app/50">
            <h3 className="text-[12px] font-extrabold text-text-main uppercase tracking-widest">Payment Methods</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-text-muted">ADD:</span>
              <div className="flex border border-border-main rounded overflow-hidden">
                <button 
                  onClick={() => setAddingMethodType('Credit Card')}
                  className={cn("p-1.5 hover:bg-primary/5 transition-colors", addingMethodType === 'Credit Card' && "bg-primary/10")}
                  title="Add Credit Card"
                >
                  <CreditCard size={14} className={cn("text-text-muted", addingMethodType === 'Credit Card' && "text-primary")} />
                </button>
                <button 
                  onClick={() => setAddingMethodType('Debit Card')}
                  className={cn("p-1.5 hover:bg-primary/5 transition-colors border-l border-r border-border-main", addingMethodType === 'Debit Card' && "bg-primary/10")}
                  title="Add Debit Card"
                >
                  <Wallet size={14} className={cn("text-text-muted", addingMethodType === 'Debit Card' && "text-primary")} />
                </button>
                <button 
                  onClick={() => setAddingMethodType('BACS')}
                  className={cn("p-1.5 hover:bg-primary/5 transition-colors", addingMethodType === 'BACS' && "bg-primary/10")}
                  title="Add BACS"
                >
                  <Building2 size={14} className={cn("text-text-muted", addingMethodType === 'BACS' && "text-primary")} />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {addingMethodType && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-primary/5 border border-primary/20 rounded-md p-4 mb-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-primary">ADD NEW {addingMethodType.toUpperCase()}</span>
                  <button onClick={() => setAddingMethodType(null)} className="text-[10px] font-bold text-text-muted hover:text-text-main">CANCEL</button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Full Name on Account" className="col-span-2 bg-white border border-border-main rounded px-3 py-2 text-[12px] outline-none focus:border-primary/50" />
                    {addingMethodType === 'BACS' ? (
                      <>
                        <input type="text" placeholder="Sort Code" className="bg-white border border-border-main rounded px-3 py-2 text-[12px] outline-none focus:border-primary/50" />
                        <input type="text" placeholder="Account Number" className="bg-white border border-border-main rounded px-3 py-2 text-[12px] outline-none focus:border-primary/50" />
                      </>
                    ) : (
                      <>
                        <input type="text" placeholder="Card Number" className="col-span-2 bg-white border border-border-main rounded px-3 py-2 text-[12px] outline-none focus:border-primary/50" />
                        <input type="text" placeholder="MM/YY" className="bg-white border border-border-main rounded px-3 py-2 text-[12px] outline-none focus:border-primary/50" />
                        <input type="text" placeholder="CVV" className="bg-white border border-border-main rounded px-3 py-2 text-[12px] outline-none focus:border-primary/50" />
                      </>
                    )}
                  </div>
                  <button className="w-full py-2 bg-primary text-white text-[12px] font-bold rounded shadow-md shadow-primary/10 hover:bg-opacity-90">Save Method</button>
                </div>
              </motion.div>
            )}

            {paymentMethods.map((method) => (
              <div 
                key={method.id} 
                onClick={() => setPreferredMethodId(method.id)}
                className={cn(
                  "bg-white border p-3 rounded-md flex items-center justify-between group transition-all shadow-sm cursor-pointer",
                  preferredMethodId === method.id ? "border-primary ring-1 ring-primary/10" : "border-border-main hover:border-primary/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-md border",
                    preferredMethodId === method.id ? "bg-primary/5 border-primary/20" : "bg-[#f1f3f5] border-border-main"
                  )}>
                    {method.type === 'BACS' ? (
                      <Building2 className={cn("w-5 h-5", preferredMethodId === method.id ? "text-primary" : "text-text-muted")} />
                    ) : method.type === 'Debit' ? (
                      <Wallet className={cn("w-5 h-5", preferredMethodId === method.id ? "text-primary" : "text-text-muted")} />
                    ) : (
                      <CreditCard className={cn("w-5 h-5", preferredMethodId === method.id ? "text-primary" : "text-text-muted")} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-text-main uppercase leading-none">{method.type}</span>
                      {preferredMethodId === method.id && (
                        <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase border border-emerald-200">Preferred</span>
                      )}
                    </div>
                    {method.type === 'BACS' ? (
                      <span className="text-[12px] text-text-muted font-medium tracking-wide">
                        Acc: ••••{method.accountNumber?.slice(-4)} • Sort: {method.sortCode}
                      </span>
                    ) : (
                      <span className="text-[12px] text-text-muted font-medium tracking-widest">•••• {method.last4}</span>
                    )}
                  </div>
                </div>
                {preferredMethodId !== method.id && (
                  <button className="text-[11px] font-bold text-text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Set Preferred
                  </button>
                )}
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-border-main flex items-center justify-between">
              <div>
                <h4 className="text-[13px] font-bold text-text-main">Automatic Payments</h4>
                <p className="text-[11px] text-text-muted font-medium">Auto-charge your default method on due dates.</p>
              </div>
              <button 
                onClick={() => setAutoPay(!autoPay)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-offset-2 focus:ring-1 focus:ring-primary/20",
                  autoPay ? "bg-primary" : "bg-gray-200"
                )}
              >
                <div
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                    autoPay ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
