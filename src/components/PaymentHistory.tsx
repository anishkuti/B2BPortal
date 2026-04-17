import React from 'react';
import { 
  History, 
  Search, 
  Download, 
  CheckCircle2, 
  ExternalLink,
  Filter
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useCustomer } from '../context/CustomerContext';

export default function PaymentHistory() {
  const { bills, paymentMethods } = useCustomer();
  const defaultMethod = paymentMethods.find(m => m.isDefault) || paymentMethods[0];
  const methodStr = defaultMethod ? `${defaultMethod.type} •••• ${defaultMethod.last4}` : 'System Default';

  // We'll use bills as base for history
  const history = [...bills, ...bills].map((b, i) => ({
    ...b,
    id: `PAY-${2026000 + i}`,
    method: methodStr,
    reference: `REF-${Math.sin(i).toString(36).substring(7).toUpperCase()}`,
    status: 'Verified'
  }));

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-lg border border-border-main shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-main flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-primary-light rounded-md">
                <History className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-[17px] font-extrabold text-text-main">Transaction Log</h2>
            </div>
            <p className="text-[12px] text-text-muted font-medium ml-11">Review all past transactions and download associated receipts</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search history..." 
                className="pl-9 pr-4 py-2 bg-[#f1f3f5] border border-border-main rounded-md text-[13px] outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
            <button className="p-2 bg-[#f1f3f5] border border-border-main rounded-md text-text-muted hover:text-text-main transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa]">
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-main">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-main">Method</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-main">Reference</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-main text-right">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border-main">Status</th>
                <th className="px-6 py-4 text-right border-b border-border-main"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main">
              {history.map((item, idx) => (
                <tr key={idx} className="hover:bg-bg-app transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-text-main">{item.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-medium text-text-muted whitespace-nowrap">{item.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-mono text-text-muted opacity-60">{item.reference}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[13px] font-extrabold text-text-main">${item.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[11px] font-bold border border-emerald-100">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-text-muted hover:text-primary hover:bg-white rounded-md transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-text-muted hover:text-primary hover:bg-white rounded-md transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-[#f8f9fa] border-t border-border-main flex items-center justify-between">
           <span className="text-[12px] font-medium text-text-muted italic">Showing records from the last 24 months</span>
           <div className="flex items-center gap-2">
             <button className="px-4 py-2 bg-white border border-border-main rounded-md text-[11px] font-bold text-text-muted cursor-not-allowed opacity-50 shadow-sm">Previous</button>
             <button className="px-4 py-2 bg-white border border-border-main rounded-md text-[11px] font-bold text-text-main hover:bg-bg-app shadow-sm transition-colors">Next Page</button>
           </div>
        </div>
      </div>
    </div>
  );
}
