import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Check,
  ShieldCheck,
  Zap,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Building,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export const PricingView: React.FC = () => {
  const { navigate, setIsDemoModalOpen } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How does pricing work on Naano?',
      a: 'Naano uses a transparent, flat-fee pricing model. Creators set their own rate per post (ranging from €20 to €2,500+ based on audience seniority and size). On our Self-Serve plan (€0/month), you pay only the creator’s published price with zero percentage markup. On our Managed tier (€700/month), our team handles strategy, creator recruitment, and campaign coordination for you.',
    },
    {
      q: 'How does escrow protection work?',
      a: 'When you book a creator, your campaign budget is placed in a secure escrow account. The creator is notified and drafts your content. Funds are only released to the creator after you review and approve the draft, and the post has gone live on LinkedIn.',
    },
    {
      q: 'What if I do not like the creator’s content draft?',
      a: 'You have full review control. You can submit revision feedback directly through Naano’s draft studio with specific requests. Creators make the edits before publication. If a creator fails to meet the agreed brief after revisions, you can cancel the deal and receive a 100% refund of your escrow balance.',
    },
    {
      q: 'What is included in the €700/month Managed plan?',
      a: 'With Managed, you get a dedicated Naano B2B growth strategist. We analyze your ICP, curate the optimal creator roster, write high-converting creative briefs, coordinate deadlines, manage draft revisions, and provide executive attribution reports showing verified clicks and pipeline.',
    },
    {
      q: 'Can we boost creator posts using LinkedIn Thought Leader Ads?',
      a: 'Yes! All creators in the Naano network agree to standard promotional terms. You can request their Direct Post URL to boost their organic post directly through your LinkedIn Campaign Manager as a Thought Leader Ad.',
    },
    {
      q: 'Do you require contracts or long-term retainers?',
      a: 'No. Both the Self-Serve plan and the Managed tier are month-to-month. You can cancel at any time with zero penalty.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white pb-20">
      {/* Header */}
      <section className="pt-16 pb-14 border-b border-slate-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-5">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Transparent B2B Creator Pricing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Simple, predictable pricing for{' '}
            <span className="text-indigo-600">creator-led growth</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            No agency retainers. No percentage commission on creator fees. Pick the plan that matches your team’s bandwidth.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Plan 1: Self-Serve */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">
                Self-Serve Platform
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">€0</span>
                <span className="text-xs text-slate-500 font-semibold">/ month</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Full platform access for marketing teams that prefer to discover creators and coordinate briefs directly.
              </p>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  What's included:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Browse 3,000+ verified B2B LinkedIn creators</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Pay flat creator fees directly with 0% platform markup</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>100% protected milestone escrow payments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>In-app content draft review & revision studio</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>First-party click, CTR, and pipeline attribution</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => navigate('marketplace')}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Marketplace Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 2: Managed Campaigns */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-500 text-white rounded-full text-[11px] font-extrabold uppercase tracking-wide">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-white/10 rounded-lg text-xs font-bold text-indigo-300">
                Fully Managed Campaigns
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">€700</span>
                <span className="text-xs text-slate-400 font-semibold">/ month</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Turnkey creator orchestration. A dedicated Naano strategist handles sourcing, brief writing, and execution.
              </p>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">
                  Everything in Self-Serve, plus:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Naano B2B Campaign Strategist</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom creator shortlisting matched to your ICP</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>High-converting copy briefs & hook optimization</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Guaranteed 7-day time to launch SLA</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Executive attribution & pipeline review calls</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Typical Creator Rate Benchmarks */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">Typical Creator Rates on Naano</h3>
          </div>
          <p className="text-xs text-slate-500">
            Creators choose their own flat rate based on audience seniority and engagement. Here are typical market rates:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-bold text-slate-900 block">Nano / Niche Specialists</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">2k – 10k followers</span>
              <div className="mt-3 text-lg font-extrabold text-indigo-600">€150 – €350</div>
              <span className="text-[10px] text-slate-400 block">High IC & technical engagement</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-bold text-slate-900 block">Mid-Tier Authority</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">10k – 40k followers</span>
              <div className="mt-3 text-lg font-extrabold text-indigo-600">€400 – €750</div>
              <span className="text-[10px] text-slate-400 block">Engineers, VP/Directors & RevOps</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-bold text-slate-900 block">Industry Keynotes & C-Suite</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">40k – 200k+ followers</span>
              <div className="mt-3 text-lg font-extrabold text-indigo-600">€800 – €2,500</div>
              <span className="text-[10px] text-slate-400 block">C-Suite & Enterprise Founders</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-indigo-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
