import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Target,
  Layers,
  FileCheck2,
  CheckCircle2,
  XCircle,
  Users,
  Check,
  BarChart3,
  Building2,
  Sparkles,
  Award,
} from 'lucide-react';
import { CompanySlider } from '../common/CompanySlider';

export const BrandsView: React.FC = () => {
  const { navigate, setIsDemoModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 border-b border-slate-200/80 bg-white">
        {/* Background Image & Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=80"
            alt="B2B Tech Creators Strategy Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-15"
          />
          {/* Ambient Lighting & Scrim Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.16]" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6">
            <Target className="w-3.5 h-3.5" />
            <span>Naano for B2B Tech Brands</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Turn LinkedIn creators into your{' '}
            <span className="text-indigo-600">highest-ROI</span> sales channel.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Bypass feed blindness. Reach target software buyers through independent practitioners they already trust and read every morning.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => navigate('marketplace')}
              className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore 3,000+ Vetted Creators</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-all cursor-pointer"
            >
              Book a Strategy Call
            </button>
          </div>

          {/* Core Stat Callouts */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-5 bg-white/80 backdrop-blur-sm border border-slate-200/90 rounded-2xl shadow-xs hover:border-indigo-200 transition-colors">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Average CTR</span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">12.0%</span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">15x vs 0.8% LinkedIn Ads</span>
            </div>

            <div className="p-5 bg-white/80 backdrop-blur-sm border border-slate-200/90 rounded-2xl shadow-xs hover:border-indigo-200 transition-colors">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Avg Cost Per Lead</span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">€18.10</span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">Compared to €70+ on Ads</span>
            </div>

            <div className="p-5 bg-white/80 backdrop-blur-sm border border-slate-200/90 rounded-2xl shadow-xs hover:border-indigo-200 transition-colors">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Payment Escrow</span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">100%</span>
              <span className="text-xs text-slate-600 mt-1 block">Zero risk upfront</span>
            </div>

            <div className="p-5 bg-white/80 backdrop-blur-sm border border-slate-200/90 rounded-2xl shadow-xs hover:border-indigo-200 transition-colors">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Launch Speed</span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">7 Days</span>
              <span className="text-xs text-slate-600 mt-1 block">Median time-to-live</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof logos */}
      <section className="py-10 border-b border-slate-200/80 bg-slate-50">
        <CompanySlider variant="light" showSubtitle={true} />
      </section>

      {/* How Naano Works for Brands (4 Steps) */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            The 4-Step Orchestration Workflow
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How B2B SaaS companies scale campaigns on Naano
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Audience Matchmaking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filter by who actually reads the creator's posts: verified C-Level, VP/Directors, or senior engineers in North America & Europe.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">Scoped Brief & Escrow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Send your value propositions and UTM link. Funds are locked securely in milestone escrow; no creator is paid upfront.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Review & Approve Drafts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review post copy and slide carousels directly in Naano. Request unlimited copy revisions with 1 click before anything goes live.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Pipeline & Attribution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track real-time qualified clicks, signups, and pipeline value. Escrow is released to the creator 24h after post verification.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix: Naano vs LinkedIn Ads vs Agencies */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              The Channel Comparison
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why creator-led growth beats traditional LinkedIn Ads
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px]">Channel Dimension</th>
                  <th className="py-4 px-5 font-bold text-indigo-600 bg-indigo-50/60 text-sm">
                    Naano B2B Marketplace
                  </th>
                  <th className="py-4 px-5 font-bold text-slate-600">LinkedIn Sponsored Ads</th>
                  <th className="py-4 px-5 font-bold text-slate-600">Traditional PR Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Average Click-Through Rate</td>
                  <td className="py-3.5 px-5 font-extrabold text-indigo-700 bg-indigo-50/30">12.0% CTR</td>
                  <td className="py-3.5 px-5 text-slate-500">0.8% - 1.2% CTR</td>
                  <td className="py-3.5 px-5 text-slate-500">Unverifiable</td>
                </tr>

                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Cost Per Qualified Lead (CPL)</td>
                  <td className="py-3.5 px-5 font-extrabold text-emerald-600 bg-indigo-50/30">€18.10 Avg</td>
                  <td className="py-3.5 px-5 text-slate-500">€55.00 – €90.00</td>
                  <td className="py-3.5 px-5 text-slate-500">€120.00+</td>
                </tr>

                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Audience Trust & Receptivity</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-800 bg-indigo-50/30">
                    High (Respected peer endorsement)
                  </td>
                  <td className="py-3.5 px-5 text-slate-500">Low (Flagged as 'Promoted')</td>
                  <td className="py-3.5 px-5 text-slate-500">Mixed (General media)</td>
                </tr>

                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Payment Model</td>
                  <td className="py-3.5 px-5 font-semibold text-indigo-700 bg-indigo-50/30">
                    Fixed fee per post + Escrow
                  </td>
                  <td className="py-3.5 px-5 text-slate-500">Auction CPC / CPM</td>
                  <td className="py-3.5 px-5 text-slate-500">€5k–€10k/mo Retainers</td>
                </tr>

                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Content Pre-Approval</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-800 bg-indigo-50/30">
                    100% in-app before publishing
                  </td>
                  <td className="py-3.5 px-5 text-slate-500">Yes (Internal creative)</td>
                  <td className="py-3.5 px-5 text-slate-500">Slow email chains</td>
                </tr>

                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Organic Evergreen SEO & Reach</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-800 bg-indigo-50/30">
                    Permanent posts on creator profile
                  </td>
                  <td className="py-3.5 px-5 text-slate-500">Stops the second budget ends</td>
                  <td className="py-3.5 px-5 text-slate-500">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Ready to launch your first creator campaign?
        </h2>
        <p className="mt-3 text-slate-600 text-sm max-w-lg mx-auto">
          Explore our network of 3,000+ verified B2B creators, filter by ICP audience fit, and pay securely with escrow.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('marketplace')}
            className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors flex items-center gap-2"
          >
            <span>Browse Creators Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
