import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Linkedin,
  DollarSign,
  Shield,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Star,
  Sparkles,
} from 'lucide-react';

export const CreatorsInfoView: React.FC = () => {
  const { setIsCreatorApplyModalOpen } = useApp();

  // Interactive Creator Earnings Calculator
  const [postsPerMonth, setPostsPerMonth] = useState<number>(3);
  const [ratePerPost, setRatePerPost] = useState<number>(450);

  const monthlyEarnings = postsPerMonth * ratePerPost;
  const annualEarnings = monthlyEarnings * 12;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white pb-20">
      {/* Hero */}
      <section className="pt-16 pb-16 border-b border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6">
            <Linkedin className="w-3.5 h-3.5" />
            <span>Naano for LinkedIn Creators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Monetize your LinkedIn audience on{' '}
            <span className="text-indigo-600">your own terms.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Set your flat price per sponsored post, write in your authentic voice, and get paid within 24 hours of deal approval. No retainers, no contract haggling.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => setIsCreatorApplyModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Join as a Creator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#calculator"
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-all"
            >
              Calculate Your Earnings
            </a>
          </div>

          {/* Key creator badges */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Average Deal</span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">€500</span>
              <span className="text-xs text-indigo-600 font-semibold mt-1 block">Per sponsored post</span>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Payout Speed</span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">24 Hours</span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">Released immediately</span>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Upfront Escrow</span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">100%</span>
              <span className="text-xs text-slate-600 mt-1 block">Guaranteed before writing</span>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Exclusivity</span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">0%</span>
              <span className="text-xs text-slate-600 mt-1 block">You remain 100% free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Value Pillars */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Why Top LinkedIn Creators Choose Naano
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            The simplest way to turn your follower base into recurring income
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">You Set Your Own Price</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whether you charge €150 or €1,500 per post, you set your flat rate based on your audience seniority and niche. Brands book you at your published rate with zero haggling.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">24-Hour Payouts via Escrow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never chase invoices again. The brand funds 100% of the deal into escrow before you write a single word. Once the draft is approved and published, payouts hit your bank within 24 hours.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Total Editorial Control</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You own your voice. You review every campaign brief and have complete authority to decline any product or pitch that doesn't feel authentic to your audience.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Creator Earnings Calculator */}
      <section id="calculator" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              Interactive Income Calculator
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Estimate your monthly LinkedIn creator revenue
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                    <span>Sponsored Posts Per Month</span>
                    <span className="text-indigo-600 font-extrabold text-sm">{postsPerMonth} posts</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={postsPerMonth}
                    onChange={(e) => setPostsPerMonth(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 post</span>
                    <span>5 posts</span>
                    <span>10 posts</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                    <span>Your Flat Rate Per Post</span>
                    <span className="text-indigo-600 font-extrabold text-sm">€{ratePerPost}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={ratePerPost}
                    onChange={(e) => setRatePerPost(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>€100</span>
                    <span>€1,000</span>
                    <span>€2,000</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Most creators on Naano post 2 to 4 sponsored partnerships per month without fatiguing their audience.
                  </p>
                </div>
              </div>

              {/* Earnings Result Card */}
              <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-2xl shadow-lg space-y-5 text-center">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block">
                  Projected Creator Income
                </span>

                <div>
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    €{monthlyEarnings.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">per month</span>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-around text-xs">
                  <div>
                    <span className="text-slate-400 block">Annualized</span>
                    <strong className="text-white text-sm">€{annualEarnings.toLocaleString()}/yr</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Payout SLA</span>
                    <strong className="text-emerald-400 text-sm">24h Guaranteed</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsCreatorApplyModalOpen(true)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
                >
                  Start Monetizing on Naano
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator FAQ */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
          Frequently Asked Questions for Creators
        </h2>

        <div className="space-y-3 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">How does payment work?</h4>
            <p className="text-slate-600 leading-relaxed">
              When a brand sends you a deal, the total amount is locked into Naano’s escrow account. Once you submit the draft, receive brand approval, and publish the post on LinkedIn, funds are automatically transferred to your IBAN or Stripe Connect account within 24 hours.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Do I have to accept every brand that reaches out?</h4>
            <p className="text-slate-600 leading-relaxed">
              No. You maintain 100% control over your profile and audience. You can accept or politely decline any campaign brief that does not match your editorial standards.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">How many followers do I need to join Naano?</h4>
            <p className="text-slate-600 leading-relaxed">
              Most creators in our network have between 2,000 and 150,000 followers. We prioritize audience engagement quality and B2B seniority (e.g., senior developers, VPs, founders) over raw follower counts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
