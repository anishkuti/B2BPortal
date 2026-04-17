import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  AlertCircle,
  Plus,
  FileText,
  Calendar
} from 'lucide-react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';

export default function BillingAndPayments() {
  const { bills, paymentMethods } = useCustomer();
  const [autoPay, setAutoPay] = useState(true);

  const currentBill = bills[0] || { amount: 0, id: 'N/A', date: 'N/A', dueDate: 'N/A', status: 'Paid' };
  const defaultPaymentMethod = paymentMethods.find(m => m.isDefault) || paymentMethods[0];

  return (
    <div className="space-y-6">
      {/* Current Balance Card */}
      <div className="bg-white rounded-lg border border-border-main overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border-main flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1 block">Current Balance</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-text-main">${currentBill.amount.toLocaleString()}</span>
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
            <button className="px-5 py-2.5 bg-primary text-white text-[13px] font-bold rounded-md hover:bg-opacity-90 shadow-sm transition-all whitespace-nowrap">
              Pay Statement
            </button>
            <button className="px-5 py-2.5 bg-white border border-border-main text-text-main text-[13px] font-bold rounded-md hover:bg-bg-app transition-all flex items-center gap-2 whitespace-nowrap">
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>

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
                {bills.slice(0, 4).map((bill) => (
                  <tr key={bill.id} className="hover:bg-bg-app transition-colors group">
                    <td className="px-4 py-3">
                      <span className="text-[13px] font-bold text-text-main">{bill.id}</span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-text-muted font-medium">{bill.date}</td>
                    <td className="px-4 py-3 text-[13px] font-extrabold text-text-main text-right">${bill.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="p-1.5 text-text-muted hover:text-primary transition-colors">
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
            <button className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline">
              <Plus className="w-3 h-3" /> Add New
            </button>
          </div>
          <div className="p-4 space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white border border-border-main p-3 rounded-md flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#f1f3f5] rounded-md border border-border-main">
                    <CreditCard className="w-5 h-5 text-text-muted" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-text-main uppercase">{method.type}</span>
                      {method.isDefault && (
                        <span className="text-[9px] font-bold bg-primary-light text-primary px-1.5 py-0.5 rounded uppercase border border-primary/10">Primary</span>
                      )}
                    </div>
                    <span className="text-[12px] text-text-muted font-medium tracking-widest">•••• {method.last4}</span>
                  </div>
                </div>
                <button className="text-[11px] font-bold text-text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Remove
                </button>
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
