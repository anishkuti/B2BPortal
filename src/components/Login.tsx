import React, { useState } from 'react';
import { Smartphone, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_50%),_radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from),_transparent_50%)] from-primary/5 to-transparent flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl shadow-primary/5 border border-border-main p-8 md:p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
              <Smartphone size={32} />
            </div>
            <h1 className="text-2xl font-black text-text-main tracking-tighter text-center">
              TELCO<span className="text-primary">CONNECT</span>
            </h1>
            <p className="text-[12px] text-text-muted font-bold uppercase tracking-widest mt-2">B2B Selfcare Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider ml-1">User Credentials</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email.id@telcoconnect.com"
                  className="w-full bg-white border border-border-main rounded-xl px-10 py-3 text-[14px] outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Access Token</label>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline uppercase">Forgot Key?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-border-main rounded-xl px-10 py-3 text-[14px] outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <div className="w-4 h-4 rounded border border-border-main bg-white flex items-center justify-center cursor-pointer">
                <ShieldCheck size={10} className="text-primary" />
              </div>
              <span className="text-[11px] font-medium text-text-muted capitalize">Enforce 2FA session for this workstation</span>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Authorize Access <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-border-main text-center">
            <p className="text-[12px] text-text-muted font-medium mb-4">Secured by Enterprise Trust Engine</p>
            <div className="flex justify-center gap-6">
              <img src="https://picsum.photos/seed/secure1/40/40" alt="ISO" className="opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/secure2/40/40" alt="SOC2" className="opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
