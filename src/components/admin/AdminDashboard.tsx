import React, { useState } from 'react';
import { License, TeacherAccount, PlatformSettings } from '../../types';
import { storageService } from '../../services/storageService';
import {
  ShieldAlert,
  KeyRound,
  Plus,
  Users,
  Settings,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  CreditCard
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [licenses, setLicenses] = useState<License[]>(storageService.getLicenses());
  const [teachers, setTeachers] = useState<TeacherAccount[]>(storageService.getTeachers());
  const [settings, setSettings] = useState<PlatformSettings>(storageService.getSettings());

  // New Code Form
  const [newCodeName, setNewCodeName] = useState('');
  const [newDuration, setNewDuration] = useState(12);
  const [newPrice, setNewPrice] = useState(settings.subscriptionPriceYearly || 149);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleIssueLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const code = newCodeName.trim()
      ? newCodeName.trim().toUpperCase()
      : `TEACH-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newLic: License = {
      id: `lic_${Date.now()}`,
      code,
      durationMonths: newDuration,
      createdAt: new Date().toISOString(),
      status: 'available',
      priceUsd: newPrice
    };

    const updated = [newLic, ...licenses];
    storageService.saveLicenses(updated);
    setLicenses(updated);
    setNewCodeName('');
    setFeedback(`New activation code issued: ${code}`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleRevokeLicense = (licenseId: string) => {
    const updated = licenses.map(l => {
      if (l.id === licenseId) {
        return { ...l, status: 'revoked' as const };
      }
      return l;
    });
    storageService.saveLicenses(updated);
    setLicenses(updated);
  };

  const handleUpdatePrice = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.updateSettings(settings);
    setFeedback('Platform subscription settings updated.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full w-fit mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Platform Owner &amp; Administration Console</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Commercial Licensing Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Issue annual activation codes, configure commercial pricing, and monitor multi-tenant teacher accounts.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Two Column Grid: Issue Code & Commercial Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Issue New Code */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">Issue Activation Code</h2>
              <p className="text-xs text-slate-500">Generate a unique 12-month commercial license code</p>
            </div>
          </div>

          <form onSubmit={handleIssueLicense} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Custom Code (Leave blank for random generation):
              </label>
              <input
                type="text"
                value={newCodeName}
                onChange={(e) => setNewCodeName(e.target.value.toUpperCase())}
                placeholder="e.g. TEACH-2026-RIYADH"
                className="w-full px-4 py-2.5 text-xs uppercase font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Duration (Months):
                </label>
                <input
                  type="number"
                  min={1}
                  max={36}
                  value={newDuration}
                  onChange={(e) => setNewDuration(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price (USD):
                </label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs transition-all kid-button cursor-pointer"
            >
              Issue Activation Code
            </button>
          </form>
        </div>

        {/* Global Pricing & Subscription Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">Subscription Settings</h2>
              <p className="text-xs text-slate-500">Configure global commercial pricing and duration</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePrice} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Subscription Price ($ USD):
              </label>
              <input
                type="number"
                value={settings.subscriptionPriceYearly}
                onChange={(e) => setSettings({ ...settings, subscriptionPriceYearly: parseFloat(e.target.value) })}
                className="w-full px-4 py-2.5 text-xs font-mono rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Duration (Months):
              </label>
              <input
                type="number"
                value={settings.defaultDurationMonths}
                onChange={(e) => setSettings({ ...settings, defaultDurationMonths: parseInt(e.target.value, 10) })}
                className="w-full px-4 py-2.5 text-xs font-mono rounded-xl border border-slate-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              Save Platform Settings
            </button>
          </form>
        </div>
      </div>

      {/* Licenses Roster Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Activation Code</span>
          <span>Status</span>
          <span>Associated Teacher</span>
          <span>Expires At</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {licenses.map((lic) => (
            <div key={lic.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="font-mono font-bold text-slate-900 flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                <span>{lic.code}</span>
              </div>

              <div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                  lic.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                  lic.status === 'available' ? 'bg-sky-100 text-sky-800' :
                  lic.status === 'revoked' ? 'bg-red-100 text-red-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {lic.status.toUpperCase()}
                </span>
              </div>

              <div className="text-slate-600">
                {lic.teacherEmail || 'Unassigned'}
              </div>

              <div className="font-mono text-slate-500">
                {lic.expiresAt ? new Date(lic.expiresAt).toLocaleDateString() : 'Pending Activation'}
              </div>

              <div className="text-right">
                {lic.status !== 'revoked' ? (
                  <button
                    onClick={() => handleRevokeLicense(lic.id)}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer underline"
                  >
                    Revoke
                  </button>
                ) : (
                  <span className="text-slate-400 italic">Revoked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
