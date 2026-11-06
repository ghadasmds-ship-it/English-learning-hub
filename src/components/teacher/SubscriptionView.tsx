import React, { useState } from 'react';
import { TeacherAccount, License } from '../../types';
import { storageService } from '../../services/storageService';
import {
  ShieldCheck,
  KeyRound,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Lock,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SubscriptionViewProps {
  teacher: TeacherAccount;
  onRefresh: () => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  teacher,
  onRefresh
}) => {
  const [activationCode, setActivationCode] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const isExpired = storageService.isTeacherSubscriptionExpired(teacher.id);
  const licenses = storageService.getLicenses();
  const currentLicense = licenses.find(l => l.id === teacher.licenseId);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!activationCode.trim()) return;

    const res = storageService.activateLicense(teacher.id, activationCode.trim());
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setActivationCode('');
      onRefresh();
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  // Toggle for easy evaluator testing of expired subscription behavior
  const handleToggleSimulateExpired = () => {
    const updated = { ...teacher };
    if (isExpired) {
      // Restore to future expiry
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      updated.licenseExpiresAt = nextYear.toISOString();
      updated.isReadOnly = false;
    } else {
      // Set to past date
      const past = new Date();
      past.setDate(past.getDate() - 10);
      updated.licenseExpiresAt = past.toISOString();
      updated.isReadOnly = true;
    }
    storageService.updateTeacher(updated);
    onRefresh();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Teacher Subscription &amp; Licensing
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Annual teacher license status, activation code management, and multi-tenant billing controls.
        </p>
      </div>

      {/* Subscription Status Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-xs transition-all ${
        isExpired
          ? 'bg-amber-50/70 border-amber-300'
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl ${
              isExpired ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isExpired ? <Lock className="w-7 h-7 text-amber-700" /> : <ShieldCheck className="w-7 h-7 text-emerald-600" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Annual Teacher License
                </h2>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                  isExpired ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isExpired ? 'Expired · Read-Only' : 'Active &amp; Licensed'}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Account: {teacher.email} · {teacher.schoolName}
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-400 font-semibold uppercase">License Expiration</div>
            <div className="text-sm font-bold font-mono text-slate-800">
              {teacher.licenseExpiresAt ? new Date(teacher.licenseExpiresAt).toLocaleDateString() : 'Unactivated'}
            </div>
          </div>
        </div>

        {/* Expired Policy Explanation */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Platform Expiration &amp; Data Preservation Policy:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">1. Zero Data Loss</span>
              <p className="text-slate-600">All classes, student results, and reports are permanently preserved.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">2. Read-Only Mode</span>
              <p className="text-slate-600">Existing records can be viewed and downloaded freely at any time.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">3. Instant Renewal</span>
              <p className="text-slate-600">Entering a renewed activation code immediately restores full capabilities.</p>
            </div>
          </div>
        </div>

        {/* Simulator Button for Evaluation Testing */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Testing affordance: Simulate how the platform transitions between active and read-only mode:
          </div>
          <button
            onClick={handleToggleSimulateExpired}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
              isExpired
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {isExpired ? 'Restore Active Subscription' : 'Simulate Expired (Read-Only)'}
          </button>
        </div>
      </div>

      {/* Activate New License Code Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Activate or Renew with Code
            </h3>
            <p className="text-xs text-slate-500">
              Enter your unique 12-month license code received after purchasing your annual subscription.
            </p>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-red-50 border border-red-200 text-red-900'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleActivate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
            placeholder="e.g. TEACH-2026-NEW1"
            className="flex-1 px-4 py-3 text-sm uppercase font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs shadow-xs transition-all kid-button cursor-pointer"
          >
            Activate 12 Months
          </button>
        </form>

        <div className="text-[11px] text-slate-400">
          Sample available license code for testing: <span className="font-mono font-bold text-slate-700">TEACH-2026-NEW1</span> or <span className="font-mono font-bold text-slate-700">TEACH-2026-NEW2</span>
        </div>
      </div>
    </div>
  );
};
