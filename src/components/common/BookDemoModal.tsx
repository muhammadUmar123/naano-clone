import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Building,
  User,
  Mail,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookDemoModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, showToast } = useApp();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    website: '',
    monthlyBudget: '€2,500 - €10,000',
    primaryGoal: 'Qualified Pipeline & MQLs',
    targetSeniority: 'VP / Director & C-Suite',
  });

  if (!isDemoModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.workEmail || !formData.fullName) {
      showToast('Missing details', 'Please enter your name and work email.', 'error');
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setStep('success');
    showToast(
      'Demo Call Reserved!',
      `A calendar invitation has been sent to ${formData.workEmail}.`,
      'success'
    );
  };

  const handleClose = () => {
    setIsDemoModalOpen(false);
    setTimeout(() => setStep('form'), 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              n
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Book a Platform Demo</h3>
              <p className="text-xs text-slate-500">20-minute strategy session with a Naano B2B creator lead</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Linear or Datadog"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Monthly Budget</label>
                <select
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                >
                  <option value="Under €2,500">Under €2,500 / mo</option>
                  <option value="€2,500 - €10,000">€2,500 - €10,000 / mo</option>
                  <option value="€10,000 - €25,000">€10,000 - €25,000 / mo</option>
                  <option value="€25,000+">€25,000+ / mo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Campaign Objective</label>
              <select
                value={formData.primaryGoal}
                onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                <option value="Qualified Pipeline & MQLs">Qualified B2B Pipeline & Leads</option>
                <option value="Product Trial Signups">Developer / Product Trial Activations</option>
                <option value="Category Authority">Category Leadership & Brand Authority</option>
                <option value="Event Registrations">Virtual Summit or Webinar Signups</option>
              </select>
            </div>

            {/* Trust box */}
            <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-xs text-indigo-900 leading-relaxed">
                <strong>Zero hard pitch.</strong> We will analyze your ICP on LinkedIn and show you the top 5 creators currently followed by your target accounts.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <span>Confirm & Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Your Demo is Confirmed!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                We sent a calendar invite with a video meeting link to{' '}
                <span className="font-semibold text-slate-800">{formData.workEmail}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Next Available Slot: Tomorrow @ 3:00 PM CET</span>
              </div>
              <p className="text-slate-500">
                Our team will prepare a custom LinkedIn creator audience overlap report for{' '}
                <strong>{formData.companyName || 'your brand'}</strong> prior to the call.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
