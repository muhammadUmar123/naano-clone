import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  Linkedin,
  DollarSign,
  TrendingUp,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CreatorApplyModal: React.FC = () => {
  const { isCreatorApplyModalOpen, setIsCreatorApplyModalOpen, showToast } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    followers: '5,000 - 20,000',
    vertical: 'DevTools & Engineering',
    desiredRate: '450',
    contentStyle: 'Technical Breakdowns & Architecture',
  });

  if (!isCreatorApplyModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.linkedinUrl || !formData.email) {
      showToast('Required fields', 'Please enter your LinkedIn profile link and email.', 'error');
      return;
    }

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setSubmitted(true);
    showToast(
      'Application Submitted!',
      'Our creator curation team reviews profiles within 24 hours.',
      'success'
    );
  };

  const handleClose = () => {
    setIsCreatorApplyModalOpen(false);
    setTimeout(() => setSubmitted(false), 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              <Linkedin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Join Naano as a Creator</h3>
              <p className="text-xs text-slate-500">Monetize your LinkedIn audience on your own terms</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Elena Rostova"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                LinkedIn Profile URL <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="url"
                  required
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary B2B Vertical</label>
                <select
                  value={formData.vertical}
                  onChange={(e) => setFormData({ ...formData, vertical: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                >
                  <option value="DevTools & Engineering">DevTools & Engineering</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Sales & RevOps">Sales & RevOps</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="HR & People Ops">HR & People Ops</option>
                  <option value="FinTech & Finance">FinTech & Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Follower Count</label>
                <select
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                >
                  <option value="1,000 - 5,000">1,000 - 5,000 followers</option>
                  <option value="5,000 - 20,000">5,000 - 20,000 followers</option>
                  <option value="20,000 - 50,000">20,000 - 50,000 followers</option>
                  <option value="50,000+">50,000+ followers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Desired Flat Rate Per Sponsored Post (€)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">€</span>
                <input
                  type="number"
                  min="50"
                  max="5000"
                  step="50"
                  value={formData.desiredRate}
                  onChange={(e) => setFormData({ ...formData, desiredRate: e.target.value })}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-semibold"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                You can change your rate anytime. Most creators charge €350 – €800 per sponsored post.
              </p>
            </div>

            {/* Creator Perks Card */}
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-1.5 text-xs text-indigo-950">
              <div className="flex items-center gap-2 font-bold text-indigo-900">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span>Naano Creator Guarantee</span>
              </div>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                <li>• 100% upfront escrow funding before writing</li>
                <li>• Payout released directly to your bank in 24 hours</li>
                <li>• Complete editorial control — decline deals anytime</li>
              </ul>
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
                <span>Submit Profile for Verification</span>
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
              <h4 className="text-lg font-bold text-slate-900">Application Received!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Our creator curation team is reviewing your LinkedIn profile demographics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1.5 text-xs">
              <div className="font-bold text-slate-900">What happens next:</div>
              <p className="text-slate-600">
                1. We audit your audience engagement metrics and verify B2B seniority.
              </p>
              <p className="text-slate-600">
                2. Within 24 hours, your profile will be activated on the Naano Marketplace at your published rate of{' '}
                <strong>€{formData.desiredRate}/post</strong>.
              </p>
              <p className="text-slate-600">
                3. Brands will be able to send you sponsored campaign briefs directly.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              Back to Naano
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
