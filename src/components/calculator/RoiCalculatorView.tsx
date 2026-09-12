import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  BarChart3,
  DollarSign,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const RoiCalculatorView: React.FC = () => {
  const { navigate, setIsDemoModalOpen } = useApp();

  const [monthlyBudget, setMonthlyBudget] = useState<number>(5000);
  const [acv, setAcv] = useState<number>(24000);
  const [vertical, setVertical] = useState<string>('DevTools & Engineering');
  const [seniorityTier, setSeniorityTier] = useState<string>('VP / Director & C-Suite');

  // Calculations based on Naano real-world benchmarks:
  // Avg post cost = €500. Number of posts = budget / 500
  const estimatedPosts = Math.max(1, Math.round(monthlyBudget / 500));
  // Avg impressions per post = ~22,000
  const totalImpressions = estimatedPosts * 22000;
  // Naano 12.0% average CTR on LinkedIn creator posts
  const estimatedClicks = Math.round(totalImpressions * 0.12);
  // Qualified lead conversion from clicks = 4.5%
  const estimatedLeads = Math.max(1, Math.round(estimatedClicks * 0.045));
  // Lead to closed deal = 6%
  const estimatedDeals = Math.max(1, Math.round(estimatedLeads * 0.06));
  // Pipeline value = leads * (acv * 0.25)
  const pipelineValue = Math.round(estimatedLeads * (acv * 0.25));
  // Projected ARR = deals * acv
  const projectedArr = estimatedDeals * acv;
  // Equivalent cost on LinkedIn Ads (at €8.50 CPC)
  const linkedinAdsCost = Math.round(estimatedClicks * 8.5);
  const costSavings = Math.max(0, linkedinAdsCost - monthlyBudget);
  const roiMultiplier = ((projectedArr / monthlyBudget) || 1).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white pb-20">
      {/* Header */}
      <section className="pt-16 pb-14 border-b border-slate-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Interactive Pipeline Simulator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Calculate your LinkedIn creator{' '}
            <span className="text-indigo-600">pipeline ROI</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Estimate impressions, qualified clicks, MQLs, and pipeline generated based on audited Naano creator benchmarks.
          </p>
        </div>
      </section>

      {/* Main Simulator Card */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls (Left) */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                Campaign Parameters
              </h3>

              {/* Monthly Budget Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                  <span>Monthly Creator Budget</span>
                  <span className="text-indigo-600 font-extrabold text-base">
                    €{monthlyBudget.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="500"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>€1,000</span>
                  <span>€15,000</span>
                  <span>€30,000</span>
                </div>
              </div>

              {/* ACV Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                  <span>Average Contract Value (ACV)</span>
                  <span className="text-indigo-600 font-extrabold text-base">
                    €{acv.toLocaleString()} / yr
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="100000"
                  step="1000"
                  value={acv}
                  onChange={(e) => setAcv(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>€3,000</span>
                  <span>€50,000</span>
                  <span>€100,000</span>
                </div>
              </div>

              {/* Vertical Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Target B2B Vertical
                </label>
                <select
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="DevTools & Engineering">DevTools & Engineering</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Sales & RevOps">Sales & RevOps</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="FinTech & Finance">FinTech & Finance</option>
                </select>
              </div>

              {/* Seniority Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Target Buyer Seniority
                </label>
                <select
                  value={seniorityTier}
                  onChange={(e) => setSeniorityTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="VP / Director & C-Suite">VP / Director & C-Suite</option>
                  <option value="Senior Staff / Team Leads">Senior Staff / Technical Leads</option>
                  <option value="All Practitioners">All Practitioners & Mid-Level</option>
                </select>
              </div>

              {/* Benchmarks footnote */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-[11px] text-slate-500 space-y-1">
                <p>
                  <strong>Audited benchmark rates:</strong> Based on 12.0% average post CTR, €500 average creator post rate, and 4.5% qualified click-to-MQL conversion rate.
                </p>
              </div>
            </div>

            {/* Results (Right) */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Projected Campaign Outcomes
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  {roiMultiplier}x Estimated ROI
                </span>
              </div>

              {/* Main pipeline metric */}
              <div className="text-center py-2">
                <span className="text-xs text-slate-400 block font-medium">
                  Projected Pipeline Generated
                </span>
                <span className="text-4xl sm:text-5xl font-black text-white mt-1 block">
                  €{pipelineValue.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-400 font-semibold block mt-1">
                  €{projectedArr.toLocaleString()} estimated closed ARR
                </span>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-semibold block">Sponsored Posts</span>
                  <strong className="text-lg text-white block mt-0.5">{estimatedPosts} posts</strong>
                  <span className="text-[10px] text-slate-400">~€500 per creator</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-semibold block">Impressions</span>
                  <strong className="text-lg text-white block mt-0.5">
                    {totalImpressions.toLocaleString()}
                  </strong>
                  <span className="text-[10px] text-slate-400">Verified ICP reach</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-semibold block">Qualified Clicks</span>
                  <strong className="text-lg text-indigo-300 block mt-0.5">
                    {estimatedClicks.toLocaleString()}
                  </strong>
                  <span className="text-[10px] text-slate-400">12.0% average CTR</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 font-semibold block">Qualified MQLs</span>
                  <strong className="text-lg text-emerald-400 block mt-0.5">
                    {estimatedLeads} leads
                  </strong>
                  <span className="text-[10px] text-slate-400">
                    ~€{(monthlyBudget / estimatedLeads).toFixed(2)} CPL
                  </span>
                </div>
              </div>

              {/* LinkedIn Ads Comparison Callout */}
              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/60 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-indigo-200">
                  <span>LinkedIn Ads Equivalent Cost:</span>
                  <span className="line-through text-slate-400">€{linkedinAdsCost.toLocaleString()}</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  You save approximately{' '}
                  <strong className="text-emerald-400">€{costSavings.toLocaleString()}</strong> in media spend by running creator-led posts vs native Sponsored Content ads.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate('campaign-wizard')}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Build Campaign with €{monthlyBudget.toLocaleString()} Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="w-full py-2.5 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
                >
                  Have our team build a custom forecast
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
