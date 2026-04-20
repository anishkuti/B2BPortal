import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  Check, 
  AlertCircle, 
  Download,
  ShieldCheck,
  Zap,
  Info,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface BulkOrderProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function BulkOrder({ onClose, onSuccess }: BulkOrderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please upload an Excel or CSV file.');
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDone = () => {
    onSuccess();
  };

  return (
    <div className="bg-white rounded-xl border border-border-main p-8 shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-text-main">Bulk Subscription</h2>
          <p className="text-sm text-text-muted">Import multiple subscriptions using our Excel template</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-bg-app rounded-full transition-colors">
          <X className="w-6 h-6 text-text-muted" />
        </button>
      </div>

      <div className="flex-1 space-y-8">
        {!isSuccess ? (
          <>
            <div className="bg-bg-app border border-dashed border-border-main rounded-2xl p-12 flex flex-col items-center justify-center text-center group transition-all hover:border-primary/40 hover:bg-primary-light/10">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv" 
                className="hidden" 
              />
              
              <div className={cn(
                "w-20 h-20 rounded-3xl mb-6 flex items-center justify-center transition-all",
                file ? "bg-emerald-100 text-emerald-600 rotate-0" : "bg-white text-text-muted group-hover:bg-primary group-hover:text-white -rotate-6 group-hover:rotate-0 shadow-sm"
              )}>
                {file ? <Check className="w-10 h-10" /> : <FileSpreadsheet className="w-10 h-10" />}
              </div>

              {file ? (
                <div className="space-y-1">
                  <h3 className="text-[16px] font-extrabold text-text-main">{file.name}</h3>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">File Ready for Submission</p>
                  <button 
                    onClick={() => setFile(null)}
                    className="mt-4 text-xs font-bold text-red-500 hover:underline"
                  >
                    Remove and choose another
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-[18px] font-extrabold text-text-main">Drop your Excel file here</h3>
                  <p className="text-xs text-text-muted max-w-[280px]">Support for .xlsx, .xls and .csv formats. Use our standard template for faster processing.</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-6 px-6 py-2.5 bg-text-main text-white text-[12px] font-black rounded-lg hover:bg-black transition-all uppercase tracking-widest"
                  >
                    Select File
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 bg-white border border-border-main rounded-xl flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-bg-app flex items-center justify-center text-primary flex-shrink-0">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-extrabold text-text-main">Download Template</h4>
                    <p className="text-[11px] text-text-muted leading-tight mt-0.5">Ensure your data headers match our automated ingestion system.</p>
                  </div>
               </div>
               <div className="p-4 bg-white border border-border-main rounded-xl flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-bg-app flex items-center justify-center text-amber-500 flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-extrabold text-text-main">Fast Processing</h4>
                    <p className="text-[11px] text-text-muted leading-tight mt-0.5">Bulk orders are typically provisioned within 2-4 business hours.</p>
                  </div>
               </div>
            </div>

            <div className="p-4 bg-white border border-border-main rounded-xl flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-text-main">Security Check Integrated</h4>
                  <p className="text-[11px] text-text-muted">Files are automatically scanned for compliance and malware before ingestion.</p>
               </div>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center bg-emerald-50/30 rounded-3xl border border-emerald-100 p-8"
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200 mb-6">
               <Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-text-main mb-2">Subscriptions Submitted Successfully</h2>
            <p className="text-sm text-text-muted max-w-[320px] mb-8">
              We've received your bulk file and started the automated validation process. 
              You'll receive a confirmation email once provisioning begins.
            </p>
            <div className="w-full max-w-[400px] bg-white border border-border-main rounded-2xl p-6 text-left">
               <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-main">
                  <span className="text-[11px] font-bold text-text-muted uppercase">Reference ID</span>
                  <span className="text-[13px] font-black text-text-main">BLK-992281-UK</span>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                     <span className="text-[12px] font-bold text-text-main">File validation passed</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                     <span className="text-[12px] font-bold text-text-main">Compliance check in progress</span>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-border-main flex items-center justify-between">
        <button 
          onClick={onClose}
          className="px-6 py-3 text-sm font-bold text-text-muted hover:text-text-main transition-colors uppercase tracking-widest"
        >
          {isSuccess ? 'Exit' : 'Cancel'}
        </button>
        
        {!isSuccess && (
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={cn(
              "px-8 py-3 bg-primary text-white text-sm font-black rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-primary/20",
              (!file || isUploading) ? "opacity-50 cursor-not-allowed" : "hover:translate-x-1"
            )}
          >
            {isUploading ? (
              <>
                Uploading {uploadProgress}%
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </>
            ) : (
              <>
                Submit Bulk Subscription <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        ) || (
          <button
            onClick={handleDone}
            className="px-8 py-3 bg-text-main text-white text-sm font-black rounded-lg hover:bg-black transition-all shadow-lg"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}
