import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Target,
  Layers,
  FileCheck2,
  CheckCircle2,
  Users,
  Check,
  BarChart3,
  Building2,
  Sparkles,
  Award,
  ChevronRight,
  Clock,
  ExternalLink,
  ChevronDown,
  DollarSign,
  Linkedin,
} from 'lucide-react';
import { CompanySlider } from '../common/CompanySlider';
import { B2BVertical } from '../../types';

export const LandingPage: React.FC = () => {
  const {
    navigate,
    creators,
    openCreatorDetail,
    setIsDemoModalOpen,
    setIsCreatorApplyModalOpen,
    toggleCreatorSelection,
    selectedCreatorIds,
  } = useApp();

  // Category filter for hero creator preview
  const [activeCategory, setActiveCategory] = useState<string>('DevTools & Engineering');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter creators for the interactive preview showcase
  const showcaseCreators = creators
    .filter((c) => (activeCategory === 'All' ? true : c.vertical === activeCategory))
    .slice(0, 3);

  // Hero sample creator for the live interactive post card
  const heroFeaturedCreator = creators[0]; // Alex Mercer or first creator
  const isHeroCreatorSelected = selectedCreatorIds.includes(heroFeaturedCreator?.id || '');

  // Quick ROI preview slider
  const [budgetSlider, setBudgetSlider] = useState<number>(4000);
  const estimatedPosts = Math.max(1, Math.round(budgetSlider / 500));
  const estimatedImpressions = estimatedPosts * 22000;
  const estimatedClicks = Math.round(estimatedImpressions * 0.12);
  const estimatedLeads = Math.max(1, Math.round(estimatedClicks * 0.045));
  const estimatedPipeline = Math.round(estimatedLeads * 6000);

  const faqs = [
    {
      q: 'How does Naano differ from LinkedIn Sponsored Content ads?',
      a: 'Sponsored Content ads appear with a Promoted tag in user feeds and suffer from banner blindness, averaging a 0.8% CTR and €55–€90 CPL. Naano connects you with vetted industry creators who publish authentic organic posts to their followers. Naano campaigns average a 12.0% CTR and €18.10 CPL, delivering peer-level trust and 5x higher engagement.',
    },
    {
      q: 'How does milestone escrow payment protection work?',
      a: 'When you create a campaign, your budget is held safely in escrow. Creators write the draft and submit it for your review. Creators are only paid after you review, approve, and verify that the post has gone live on LinkedIn. Payouts are released within 24 hours of approval.',
    },
    {
      q: 'Can our team review and edit the post copy before it goes live?',
      a: 'Yes, 100%. Every deal on Naano includes mandatory in-app draft review. You can review the post copy, image/carousel assets, and UTM links, and request revisions with specific feedback in 1 click before publication.',
    },
    {
      q: 'How are creator prices determined?',
      a: 'Creators set their own transparent flat fee per post based on their audience seniority, engagement rate, and vertical (ranging from €150 to €2,500). On our Self-Serve plan (€0/month), you pay the creator’s published price directly with zero platform markup.',
    },
    {
      q: 'Can we boost the creator’s post using LinkedIn Thought Leader Ads?',
      a: 'Yes! All creators in our network provide their direct post URL, allowing you to sponsor and boost their post directly from your LinkedIn Campaign Manager as an official Thought Leader Ad.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 text-center border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-medium">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 font-bold text-[10px] uppercase tracking-wide">
            New
          </span>
          <span>
            Over 3,000+ vetted B2B creators across 100+ countries • Flat fees, no retainers • 24h Payouts
          </span>
          <button
            onClick={() => navigate('marketplace')}
            className="underline text-indigo-300 hover:text-white ml-1 font-semibold inline-flex items-center gap-1"
          >
            Browse Directory <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-20 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span>The B2B LinkedIn Creator Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Turn LinkedIn creators into your{' '}
                <span className="text-indigo-600">highest-ROI</span> sales channel.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Discover 3,000+ vetted B2B practitioners with real industry authority. Book fixed-price sponsored posts, review drafts before they go live, and track verified pipeline attribution — without agency retainers.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => navigate('marketplace')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-all"
                >
                  Book a Demo
                </button>

                <button
                  onClick={() => navigate('roi-calculator')}
                  className="w-full sm:w-auto px-5 py-3.5 text-slate-600 hover:text-indigo-600 font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Calculate ROI</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust metric bullets */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-100 max-w-lg text-xs">
                <div>
                  <strong className="text-slate-900 font-bold block text-sm">12.0% Avg CTR</strong>
                  <span className="text-slate-500 text-[11px]">15x vs 0.8% LinkedIn Ads</span>
                </div>
                <div>
                  <strong className="text-slate-900 font-bold block text-sm">€18.10 CPL</strong>
                  <span className="text-slate-500 text-[11px]">Verified B2B lead cost</span>
                </div>
                <div>
                  <strong className="text-slate-900 font-bold block text-sm">100% Escrow</strong>
                  <span className="text-slate-500 text-[11px]">Zero upfront risk</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Deal Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="text-xs font-bold text-slate-700">Verified Marketplace Deal</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                    Escrow Protected
                  </span>
                </div>

                {/* Creator Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={heroFeaturedCreator?.avatar}
                    alt={heroFeaturedCreator?.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 text-sm truncate">
                        {heroFeaturedCreator?.name}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 truncate">{heroFeaturedCreator?.headline}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                      <span>{heroFeaturedCreator?.followers.toLocaleString()} followers</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">
                        {heroFeaturedCreator?.engagementRate}% engagement
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Copy Mockup */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed font-sans shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Sponsored Post Preview</span>
                    <span className="text-indigo-600 font-bold">12.0% Historical CTR</span>
                  </div>
                  <p>
                    Most DevOps teams still treat observability as an afterthought until production goes down at 2 AM.
                  </p>
                  <p>
                    Here is the 3-step pipeline monitoring architecture we built to catch latency spikes in under 4 seconds before customers notice: 🧵👇
                  </p>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">CTA: Try Developer Sandbox (Free)</span>
                    <span className="text-indigo-600 font-semibold">utm_source=naano</span>
                  </div>
                </div>

                {/* Verified Audience Breakdown */}
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                    <span>Audited Seniority Breakdown</span>
                    <span className="text-indigo-600">82% Tech / SaaS</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-600">
                      <span>VP / Director / C-Suite</span>
                      <strong className="text-slate-900">42%</strong>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Senior Staff & Lead Engineers</span>
                      <strong className="text-slate-900">44%</strong>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '44%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Action */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Published Fixed Price
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900">
                      €{heroFeaturedCreator?.ratePerPost}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (heroFeaturedCreator) {
                        toggleCreatorSelection(heroFeaturedCreator.id);
                      }
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-sm ${
                      isHeroCreatorSelected
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isHeroCreatorSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Campaign Tray</span>
                      </>
                    ) : (
                      <>
                        <span>Book Sponsored Post</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies Marquee */}
      <section className="py-10 border-b border-slate-200/80 bg-slate-50">
        <CompanySlider variant="light" showSubtitle={true} />
      </section>

      {/* 5 Core Pillars: The Naano Difference */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            The Naano Advantage
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built from the ground up for B2B tech growth teams
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Say goodbye to endless agency contracts, opaque markups, and vanity influencer metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Audience Fit Over Vanity Counts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filter creators by who actually likes and reposts their content: verified C-Level, VP/Directors, or senior engineers across North America and Europe.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Fixed Price, No Agency Retainers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Creators set their published rate per post (from €150 to €2,500). No €5,000/mo retainer commitments, zero opaque markups.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Content Approval Before It Goes Live</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review and request copy revisions in our dedicated draft studio. Creators never publish to LinkedIn until you approve the draft.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">100% Milestone Escrow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your budget is held in protected escrow. Creators are paid automatically within 24 hours only after deliverables are confirmed live on LinkedIn.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">First-Party Pipeline Attribution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Measure real-time qualified clicks, leads, and pipeline revenue with dedicated UTM links and CRM attribution hooks.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Thought Leader Ad Ready</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Turn top-performing creator posts into LinkedIn Thought Leader Ads directly inside your LinkedIn Campaign Manager for maximum scale.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Creator Showcase Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                Curated Creator Network
              </h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Browse 3,000+ vetted B2B practitioners
              </p>
            </div>
            <button
              onClick={() => navigate('marketplace')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View full directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              'DevTools & Engineering',
              'AI & Data Science',
              'Cybersecurity',
              'Sales & RevOps',
              'Product & Design',
              'FinTech & Finance',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Creator Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseCreators.map((creator) => {
              const isSelected = selectedCreatorIds.includes(creator.id);
              return (
                <div
                  key={creator.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{creator.name}</h4>
                          <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 truncate">{creator.headline}</p>
                        <span className="text-[10px] font-semibold text-indigo-600 block mt-0.5">
                          {creator.vertical}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {creator.bio}
                    </p>

                    <div className="pt-2 grid grid-cols-2 gap-2 text-xs border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Audience</span>
                        <strong className="text-slate-900 font-bold">
                          {creator.followers.toLocaleString()}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Engagement</span>
                        <strong className="text-emerald-600 font-bold">
                          {creator.engagementRate}%
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Per Post
                      </span>
                      <strong className="text-lg font-extrabold text-slate-900">
                        €{creator.ratePerPost}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openCreatorDetail(creator.id)}
                        className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => toggleCreatorSelection(creator.id)}
                        className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Book'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual Persona Spotlight: Brands vs Creators */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Brands Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Naano for B2B Brands</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Reach decision-makers where they actually spend attention. Run creator campaigns with predictable fixed pricing, in-app draft approvals, and guaranteed escrow protection.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>12.0% average post CTR (15x higher than LinkedIn Ads)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>€18.10 average cost per qualified lead</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero upfront risk with protected milestone escrow</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate('brands')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Brand Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* For Creators Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Linkedin className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Naano for LinkedIn Creators</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Monetize your technical audience on your own terms. Set your own flat price, maintain 100% editorial authority, and get paid within 24 hours of post verification.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Average creator deal size of €500 per post</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct payouts released within 24 hours via escrow</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero agency retainers or exclusive lock-in</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsCreatorApplyModalOpen(true)}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Apply as a Creator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Interactive ROI Calculator */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              Interactive ROI Forecaster
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Simulate your LinkedIn creator campaign
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Monthly Creator Budget</span>
                <span className="text-indigo-600 font-extrabold text-base">
                  €{budgetSlider.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={budgetSlider}
                onChange={(e) => setBudgetSlider(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Sponsored Posts
                </span>
                <strong className="text-xl font-black text-slate-900 mt-1 block">
                  {estimatedPosts} posts
                </strong>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Target Reach
                </span>
                <strong className="text-xl font-black text-slate-900 mt-1 block">
                  {estimatedImpressions.toLocaleString()}
                </strong>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Qualified Clicks (12% CTR)
                </span>
                <strong className="text-xl font-black text-indigo-600 mt-1 block">
                  {estimatedClicks.toLocaleString()}
                </strong>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Est. Pipeline Value
                </span>
                <strong className="text-xl font-black text-emerald-600 mt-1 block">
                  €{estimatedPipeline.toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => navigate('roi-calculator')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
              >
                <span>Open Advanced Multi-Touch Pipeline Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Pricing
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Transparent plans for every growth stage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-4">
            <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700 inline-block">
              Self-Serve
            </span>
            <div className="text-4xl font-black text-slate-900">€0 <span className="text-xs font-semibold text-slate-500">/ mo</span></div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct access to 3,000+ creators. Pay creators directly at their published rates with 100% escrow protection.
            </p>
            <button
              onClick={() => navigate('marketplace')}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Get Started Free
            </button>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold inline-block">
              Managed Campaigns
            </span>
            <div className="text-4xl font-black text-white">€700 <span className="text-xs font-semibold text-slate-400">/ mo</span></div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated Naano strategist handling creator sourcing, brief writing, execution, and attribution.
            </p>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
            >
              Book Strategy Call
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('pricing')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
          >
            <span>View Full Pricing Comparison & Creator Rate Ranges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
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
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Bar */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Start scaling your B2B creator pipeline today
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">
            Explore 3,000+ vetted LinkedIn tech practitioners, filter by verified audience seniority, and launch your first campaign in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('marketplace')}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
            >
              Explore Creator Marketplace
            </button>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
