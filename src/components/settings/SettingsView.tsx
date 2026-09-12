import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Users, CreditCard, Bell, Shield, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user } = useApp();
  const [saved, setSaved] = useState(false);
  const [companyName, setCompanyName] = useState(user.companyName);
  const [teamEmail, setTeamEmail] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] pb-24 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings & Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage company profile, team seats, and invoicing preferences.
          </p>
        </div>

        {/* Company profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Company Information</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Website / Domain
                </label>
                <input
                  type="text"
                  defaultValue="telemetryflow.io"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                EU VAT ID / Tax Number
              </label>
              <input
                type="text"
                defaultValue="DE319842109"
                className="w-full sm:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                {saved ? <Check className="w-4 h-4" /> : null}
                <span>{saved ? 'Changes Saved!' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Team seats */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Team Members & Collaborators</h2>
            </div>
            <span className="text-xs text-slate-400">Unlimited seats included</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-bold text-slate-900 block">{user.name} (You)</span>
                  <span className="text-slate-400">{user.email}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                Workspace Admin
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="email"
                placeholder="colleague@telemetryflow.io"
                value={teamEmail}
                onChange={(e) => setTeamEmail(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (teamEmail) {
                    alert(`Invite sent to ${teamEmail}`);
                    setTeamEmail('');
                  }
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Invite Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
