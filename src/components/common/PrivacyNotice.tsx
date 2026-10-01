import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyNotice: React.FC = () => {
  return (
    <div className="mt-12 max-w-xl mx-auto p-4 rounded-2xl bg-white/70 border border-rose-100 shadow-xs text-center text-xs text-slate-500 flex items-center justify-center gap-2">
      <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
        <Lock className="w-3.5 h-3.5" />
      </div>
      <p>
        <strong className="text-slate-700 font-medium">Your privacy is respected:</strong> Your answers stay securely on this device unless you choose to export or share them.
      </p>
    </div>
  );
};
