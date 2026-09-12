import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  ArrowRight,
  Target,
  CheckCircle2,
  Users,
  Building,
  BarChart3,
  Award,
} from 'lucide-react';

export const CaseStudiesView: React.FC = () => {
  const { navigate, setIsDemoModalOpen } = useApp();

  const cases = [
    {
      company: 'Supabase',
      logo: '⚡',
      brandColor: '#3ECF8E',
      tagline: 'Open Source Firebase Alternative',
      campaignType: 'Developer Adoption & Auth Launch',
      creatorCount: '6 Software Engineering Creators',
      totalSpend: '€3,400',
      results: {
        ctr: '14.8%',
        leads: '420 Developer Signups',
        cpl: '€8.10',
        pipeline: '€280,000 Pipeline',
      },
      quote:
        '“Naano allowed us to partner directly with Staff SREs and Postgres contributors. The developer response was immediate and authentic — zero negative comment spam compared to LinkedIn Ads.”',
      author: 'Head of Growth, Developer Infrastructure',
      highlights: [
        'Over 85,000 targeted engineering impressions across US and DACH',
        'Direct UTM attribution tracked in PostHog',
        'Top post drove 1,200 GitHub star clicks in 48 hours',
      ],
    },
    {
      company: 'Pigment',
      logo: 'P',
      brandColor: '#4F46E5',
      tagline: 'Enterprise Business Planning & FP&A',
      campaignType: 'CFO & Finance Leadership Demand Gen',
      creatorCount: '4 VP Finance & CFO Creators',
      totalSpend: '€4,800',
      results: {
        ctr: '11.4%',
        leads: '24 Enterprise Demo Requests',
        cpl: '€200.00',
        pipeline: '€720,000 Pipeline',
      },
      quote:
        '“Reaching real finance executives is nearly impossible with standard display ads. Partnering with credible FP&A voices generated demos with enterprise companies with zero friction.”',
      author: 'VP Demand Generation, Enterprise SaaS',
      highlights: [
        'Demographics verified: 68% audience in VP/CFO roles',
        '100% of posts delivered with custom CFO slide decks',
        '3 enterprise deals entered procurement stage within 30 days',
      ],
    },
    {
      company: 'Lemlist',
      logo: '✦',
      brandColor: '#FF5C35',
      tagline: 'Sales Engagement & Cold Email Platform',
      campaignType: 'RevOps & SDR Trial Acquisition',
      creatorCount: '8 Sales & RevOps Influencers',
      totalSpend: '€2,900',
      results: {
        ctr: '16.2%',
        leads: '890 Free Trial Activations',
        cpl: '€3.25',
        pipeline: '€140,000 ARR',
      },
      quote:
        '“Creator-led campaigns on Naano gave us a 5x lower CAC than LinkedIn Sponsored Content. The creators understand the exact pain points of SDRs because they do the job every day.”',
      author: 'Growth Marketing Lead',
      highlights: [
        '120,000+ organic impressions across B2B sales practitioners',
        'Average response time from creators under 4 hours',
        'Zero upfront risk with protected escrow release',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white pb-20">
      {/* Header */}
      <section className="pt-16 pb-14 border-b border-slate-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-5">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Customer Case Studies</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            How B2B SaaS teams drive pipeline with{' '}
            <span className="text-indigo-600">Naano creators</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Real campaign metrics, verified audience demographics, and first-party attribution benchmarks.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {cases.map((cs, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8"
          >
            {/* Case Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-sm"
                  style={{ backgroundColor: cs.brandColor }}
                >
                  {cs.logo}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xl">{cs.company}</h3>
                  <p className="text-xs text-slate-500 font-medium">{cs.tagline}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-700 text-xs font-semibold">
                  {cs.creatorCount}
                </span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
                  Spend: {cs.totalSpend}
                </span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Click-Through Rate
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-1 block">
                  {cs.results.ctr}
                </span>
                <span className="text-[10px] text-slate-500">vs 0.8% Ads benchmark</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Conversions
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 block">
                  {cs.results.leads}
                </span>
                <span className="text-[10px] text-slate-500">Verified UTM track</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Cost Per Acquisition
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1 block">
                  {cs.results.cpl}
                </span>
                <span className="text-[10px] text-slate-500">All-in creator cost</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Pipeline Value
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 block">
                  {cs.results.pipeline}
                </span>
                <span className="text-[10px] text-slate-500">CRM qualified ARR</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/80">
              <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">{cs.quote}</p>
              <p className="text-xs font-bold text-indigo-900 mt-2">— {cs.author}</p>
            </div>

            {/* Key Highlights */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Key Execution Highlights:
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                {cs.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-12 max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-extrabold text-slate-900">
          Want similar pipeline results for your SaaS product?
        </h3>
        <p className="text-xs text-slate-600 mt-2">
          Discover creators whose audience already matches your Ideal Customer Profile.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate('marketplace')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
          >
            Explore Marketplace
          </button>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
          >
            Book a Demo
          </button>
        </div>
      </section>
    </div>
  );
};
