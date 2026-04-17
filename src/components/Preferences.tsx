import React from 'react';
import { ShieldCheck, Mail, MessageSquare, Phone, Users, Share2, Info } from 'lucide-react';
import { useCustomer } from '../context/CustomerContext';
import { cn } from '../lib/utils';

export default function Preferences() {
  const { currentCustomer, updatePreferences } = useCustomer();
  const prefs = currentCustomer.preferences;

  const togglePreference = (key: keyof typeof prefs) => {
    updatePreferences({
      ...prefs,
      [key]: !prefs[key]
    });
  };

  const preferenceItems = [
    { 
      key: 'email', 
      label: 'Email Marketing', 
      description: 'Receive personalized offers and news via email.',
      icon: Mail 
    },
    { 
      key: 'sms', 
      label: 'SMS Notifications', 
      description: 'Get urgent updates and limited-time deals on your mobile.',
      icon: MessageSquare 
    },
    { 
      key: 'phone', 
      label: 'Phone Consultation', 
      description: 'Our specialists may call you with high-value service insights.',
      icon: Phone 
    },
    { 
      key: 'thirdParty', 
      label: 'Third-Party Partners', 
      description: 'Allow us to share relevant offers from our verified partners.',
      icon: Users 
    },
    { 
      key: 'dataSharing', 
      label: 'Data Sharing for Personalization', 
      description: 'Share non-sensitive usage data to help us build a better experience for you.',
      icon: Share2 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-border-main p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-md">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-text-main uppercase tracking-widest">Privacy & Consent Settings</h3>
            <p className="text-[12px] text-text-muted font-medium">Manage how we communicate with you and handle your data.</p>
          </div>
        </div>

        <div className="space-y-4">
          {preferenceItems.map((item) => (
            <div 
              key={item.key} 
              className="flex items-center justify-between p-4 bg-bg-app rounded-lg border border-border-main hover:border-primary/20 transition-all group"
            >
              <div className="flex gap-4">
                <div className="p-2 bg-white rounded-md border border-border-main group-hover:border-primary/20 transition-all">
                  <item.icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-text-main">{item.label}</h4>
                  <p className="text-[11px] text-text-muted font-medium leading-relaxed max-w-md">{item.description}</p>
                </div>
              </div>
              <button 
                onClick={() => togglePreference(item.key as any)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-offset-2 focus:ring-1 focus:ring-primary/20",
                  prefs[item.key as keyof typeof prefs] ? "bg-primary" : "bg-gray-200"
                )}
              >
                <div
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                    prefs[item.key as keyof typeof prefs] ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 bg-amber-50 border border-amber-100 rounded-lg flex gap-4">
        <Info className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <h4 className="text-[13px] font-bold text-amber-700">Enterprise Data Compliance</h4>
          <p className="text-[12px] text-amber-800 font-medium leading-relaxed mt-1">
            As an Enterprise client, certain communication channels (like service status alerts and emergency technical updates) are mandatory and cannot be disabled to ensure your business continuity.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button className="px-5 py-2.5 bg-white border border-border-main text-text-main text-[13px] font-bold rounded-md hover:bg-bg-app transition-all shadow-sm">
          Reset to Factory Defaults
        </button>
        <button className="px-5 py-2.5 bg-primary text-white text-[13px] font-bold rounded-md hover:bg-opacity-90 transition-all shadow-sm">
          Save All Preferences
        </button>
      </div>
    </div>
  );
}
