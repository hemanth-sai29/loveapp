import React, { useState } from 'react';
import { ShieldAlert, KeyRound, Eye, EyeOff, Lock, X, Sparkles } from 'lucide-react';
import { loginAdmin } from '../../utils/adminDatabase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(true);
      setErrorMessage('Please enter the admin password');
      return;
    }

    if (loginAdmin(password)) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
      setErrorMessage('Incorrect admin password. Default is: admin777');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 mb-3">
            <Lock className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800 text-rose-400 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Authorization</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-editorial text-white">
            User Database Vault
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-xs">
            Enter master credentials to view, inspect, and manage all submitted questionnaire profiles.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Master Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <KeyRound className="w-4 h-4 text-rose-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Enter admin password (default: admin777)"
                autoFocus
                className="w-full pl-10 pr-10 py-3 text-sm bg-slate-800/80 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-white placeholder:text-slate-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-xs text-rose-400 flex items-center gap-1 font-medium animate-shake">
                <span>⚠️</span> {errorMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Log In to Database</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
          Default Master Key: <code className="text-rose-400 font-mono">admin777</code>
        </div>
      </div>
    </div>
  );
};
