import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  KeyRound,
  Copy,
  Check,
  Lock,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  getSecurityConfig,
  saveSecurityConfig,
  generateShareableLink,
  lockApp,
} from '../../utils/security';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLockNow: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose, onLockNow }) => {
  const currentConfig = getSecurityConfig();
  const [passcode, setPasscode] = useState(currentConfig.passcode);
  const [hint, setHint] = useState(currentConfig.hint);
  const [showPasscode, setShowPasscode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSecurityConfig({
      passcode: passcode.trim() || 'ourlove',
      hint: hint.trim() || 'Our special secret word',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const shareableLink = generateShareableLink(passcode);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareableLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLock = () => {
    lockApp();
    onClose();
    onLockNow();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-slate-800">
                Security & Privacy Controls
              </h3>
              <p className="text-xs text-slate-500">
                Manage passcode and link-only shareable access
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Shareable Link Box */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-rose-900 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-rose-500" />
                <span>Link-Only Shareable URL</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Auto-Unlocks
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Share this exact link with her. When opened, it automatically unlocks the book without needing to manually type the passcode!
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white border border-rose-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 truncate select-all">
                {shareableLink}
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Passcode & Hint Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-rose-500" />
                  <span>Secret Passcode / Word</span>
                </span>
                <span className="text-[11px] text-slate-400 font-normal lowercase">
                  (Used to unlock manually)
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="e.g. ourlove or a special date"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all text-slate-800 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Romantic Hint for Her</span>
              </label>
              <input
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="e.g. The nickname I call you or our anniversary date"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all text-slate-800"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Save Passcode Settings</span>
              </button>
              {savedSuccess && (
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </span>
              )}
            </div>
          </form>

          {/* Privacy Guarantee Note */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1.5">
            <p className="font-semibold text-slate-700 flex items-center gap-1.5">
              <span>🔒</span> Privacy & Security Features Active:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500 ml-1">
              <li>Search engine index blocking (<code className="text-rose-600">noindex, nofollow</code>).</li>
              <li>HTTP security headers preventing iframe embeds or referrer leaks.</li>
              <li>Answers stored securely and obfuscated on device storage.</li>
              <li>Only individuals who receive your link or passcode can view the app.</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleLock}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock App Now</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
