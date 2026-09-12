import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Campaign, CampaignCreatorDraft, CampaignBrief } from '../../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Plus,
  Trash2,
  ShieldCheck,
  Calendar,
  Layers,
  Globe,
  Target,
  FileText,
  Users
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const CampaignWizard: React.FC = () => {
  const {
    creators,
    selectedCreatorIds,
    toggleCreatorSelection,
    createCampaign,
    user,
    navigate,
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [campaignName, setCampaignName] = useState('Q4 Kubernetes Observability Growth');
  const [brandName, setBrandName] = useState(user.companyName || 'TelemetryFlow');
  const [productUrl, setProductUrl] = useState('https://telemetryflow.io/try');
  const [objective, setObjective] = useState<Campaign['objective']>('Product Signups');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-31');

  // ICP
  const [targetIcp, setTargetIcp] = useState(
    'Staff / Senior DevOps Engineers, SREs, and Platform Leads at Series A-C SaaS running multi-cloud Kubernetes clusters.'
  );

  // Brief
  const [talkingPoints, setTalkingPoints] = useState<string[]>([
    'Cut K8s telemetry indexing costs by 60% with zero-config eBPF auto-instrumentation.',
    'No manual code changes required — 1 Helm chart installs in under 3 minutes.',
    'Transparent pricing with a generous free tier for up to 5 clusters.',
  ]);
  const [newPoint, setNewPoint] = useState('');

  const [hooksToTest, setHooksToTest] = useState<string[]>([
    'The Datadog bill shock moment when your cluster hits 20 nodes',
    'Why distributed tracing usually breaks during production incidents',
  ]);
  const [newHook, setNewHook] = useState('');

  const [dos, setDos] = useState<string[]>([
    'Share authentic personal war stories or architecture diagrams',
    'Include the 3-minute setup time',
    'Tag our official page in the post body',
  ]);
  const [donts, setDonts] = useState<string[]>([
    'Do not sound like a corporate marketing press release',
    'Do not make negative attacks against specific competitor staff',
  ]);

  const [ctaText, setCtaText] = useState('Spin up a free cluster dashboard (link in comments)');

  // Selected creators for this campaign
  const [rosterIds, setRosterIds] = useState<string[]>(
    selectedCreatorIds.length > 0 ? selectedCreatorIds : ['creator-1', 'creator-8']
  );

  const [deliverables, setDeliverables] = useState<Record<string, 'Document Carousel' | 'Text + Custom Visual'>>({
    'creator-1': 'Document Carousel',
    'creator-8': 'Text + Custom Visual',
  });

  const selectedCreatorsList = creators.filter((c) => rosterIds.includes(c.id));
  const totalBudget = selectedCreatorsList.reduce((sum, c) => sum + c.ratePerPost, 0);

  // Add talking point
  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setTalkingPoints([...talkingPoints, newPoint.trim()]);
      setNewPoint('');
    }
  };

  // Add hook
  const handleAddHook = () => {
    if (newHook.trim()) {
      setHooksToTest([...hooksToTest, newHook.trim()]);
      setNewHook('');
    }
  };

  // Submit and launch
  const handleLaunch = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const campaignCreators: CampaignCreatorDraft[] = selectedCreatorsList.map((c) => ({
      creatorId: c.id,
      creatorName: c.name,
      creatorAvatar: c.avatar,
      stage: 'brief_sent',
      deliverableType: deliverables[c.id] || 'Document Carousel',
      scheduledDate: '2026-10-10',
      feedbackNotes: [],
    }));

    const brief: CampaignBrief = {
      productName: brandName,
      productUrl,
      targetIcp,
      keyTalkingPoints: talkingPoints,
      hooksToTest,
      dos,
      donts,
      ctaText,
      destinationUrlWithUtm: `${productUrl}?utm_source=linkedin&utm_medium=creator&utm_campaign=${encodeURIComponent(
        campaignName.toLowerCase().replace(/\s+/g, '-')
      )}`,
    };

    const newCamp: Campaign = {
      id: 'camp-' + Date.now().toString(36),
      name: campaignName,
      brandName,
      status: 'active',
      objective,
      totalBudget,
      startDate,
      endDate,
      creators: campaignCreators,
      brief,
      stats: {
        totalImpressions: 0,
        totalClicks: 0,
        totalLeads: 0,
        cpc: 0,
        pipelineValue: 0,
      },
    };

    createCampaign(newCamp);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Wizard Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('campaigns')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Campaigns</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create New Creator Campaign
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200/70">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Protected</span>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs mb-8">
          <div className="grid grid-cols-5 gap-2">
            {[
              { num: 1, title: 'Basics' },
              { num: 2, title: 'ICP & Audience' },
              { num: 3, title: 'Brief & Hooks' },
              { num: 4, title: 'Creators Roster' },
              { num: 5, title: 'Review & Escrow' },
            ].map((s) => {
              const isCurrent = step === s.num;
              const isCompleted = step > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => s.num < step && setStep(s.num)}
                  disabled={s.num > step}
                  className={`text-left p-2 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-indigo-50 border border-indigo-200'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3" /> : s.num}
                    </span>
                    <span
                      className={`text-xs font-bold truncate hidden md:inline ${
                        isCurrent ? 'text-indigo-900' : 'text-slate-600'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wizard Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Campaign Details</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Define your campaign goal, brand identity, and destination landing page.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    placeholder="e.g. Q4 Kubernetes Developer Acquisition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Brand / Product Name
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Destination Landing Page URL
                    </label>
                    <input
                      type="url"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                      placeholder="https://yourcompany.com/signup"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Primary Campaign Objective
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: 'Product Signups', desc: 'Free trial, freemium self-serve activations' },
                      { title: 'Qualified Pipeline', desc: 'Booked sales demos, whitepaper downloads' },
                      { title: 'Content & Awareness', desc: 'Thought leadership, brand authority' },
                      { title: 'Event Registrations', desc: 'Webinars, conferences, meetup attendees' },
                    ].map((item) => (
                      <div
                        key={item.title}
                        onClick={() => setObjective(item.title as any)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          objective === item.title
                            ? 'bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-500'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{item.title}</span>
                          {objective === item.title && (
                            <Check className="w-4 h-4 text-indigo-600" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ICP & AUDIENCE */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Target ICP & Audience</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Creators will use this profile to tailor their tone, pain points, and technical depth.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Target Persona Description
                  </label>
                  <textarea
                    rows={4}
                    value={targetIcp}
                    onChange={(e) => setTargetIcp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    placeholder="Describe specific job titles, tech stack, company size, and pain points..."
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800">Recommended ICP Highlights</h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      🎯 Titles: Staff SRE, VP Eng, CTO
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      🏢 Size: 50–1,000 Employees
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      🌍 Regions: US, UK, DACH
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BRIEF & TALKING POINTS */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Creative Brief & Hook Angles</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Give creators the raw materials they need to craft high-performing authentic posts in their own voice.
                </p>
              </div>

              <div className="space-y-5">
                {/* Talking Points */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Key Value Propositions / Talking Points
                  </label>
                  <div className="space-y-2 mb-2">
                    {talkingPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800"
                      >
                        <span>• {point}</span>
                        <button
                          onClick={() => setTalkingPoints(talkingPoints.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPoint}
                      onChange={(e) => setNewPoint(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPoint())}
                      placeholder="Add another value proposition..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    />
                    <button
                      onClick={handleAddPoint}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Hooks */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Scroll-Stopping Hook Angles to Test
                  </label>
                  <div className="space-y-2 mb-2">
                    {hooksToTest.map((hook, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-200/80 text-xs text-indigo-900"
                      >
                        <span>💡 "{hook}"</span>
                        <button
                          onClick={() => setHooksToTest(hooksToTest.filter((_, i) => i !== idx))}
                          className="text-indigo-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newHook}
                      onChange={(e) => setNewHook(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHook())}
                      placeholder="Add an angle/hook..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    />
                    <button
                      onClick={handleAddHook}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
                    >
                      Add Hook
                    </button>
                  </div>
                </div>

                {/* CTA text */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Call-to-Action Line (for post footer or first comment)
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CREATOR ROSTER */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Creator Roster & Deliverables</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Confirm the creators for this campaign and their desired post format.
                  </p>
                </div>
                <button
                  onClick={() => navigate('marketplace')}
                  className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Browse More Creators</span>
                </button>
              </div>

              {selectedCreatorsList.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-semibold">No creators currently in roster</p>
                  <button
                    onClick={() => setRosterIds(['creator-1', 'creator-2'])}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
                  >
                    Add Recommended Dev & RevOps Creators
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedCreatorsList.map((creator) => (
                    <div
                      key={creator.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{creator.name}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                              {creator.vertical}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{creator.headline}</p>
                          <span className="text-[11px] font-bold text-indigo-600">
                            €{creator.ratePerPost} / post
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <select
                          value={deliverables[creator.id] || 'Document Carousel'}
                          onChange={(e) =>
                            setDeliverables({
                              ...deliverables,
                              [creator.id]: e.target.value as any,
                            })
                          }
                          className="bg-white border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-700 font-medium"
                        >
                          <option value="Document Carousel">Document Carousel (PDF)</option>
                          <option value="Text + Custom Visual">Text + Custom Visual</option>
                        </select>

                        <button
                          onClick={() => setRosterIds(rosterIds.filter((id) => id !== creator.id))}
                          className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove from roster"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 5: REVIEW & ESCROW */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Review & Fund Escrow</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm your campaign details and allocate escrow funds. Creators are only paid once drafts are approved and posts go live.
                </p>
              </div>

              {/* Summary breakdown box */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-800 text-sm">Campaign Name</span>
                  <span className="font-bold text-slate-900 text-sm">{campaignName}</span>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Creators Booked</span>
                  <strong className="text-slate-900">{selectedCreatorsList.length} Creators</strong>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Estimated Reach</span>
                  <strong className="text-slate-900">
                    ~{(selectedCreatorsList.reduce((s, c) => s + c.avgImpressions, 0) / 1000).toFixed(0)}k impressions
                  </strong>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Platform Fee (Self-Serve Plan)</span>
                  <strong className="text-emerald-600 font-bold">€0 (100% to creators)</strong>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block">Total Escrow Allocation</span>
                    <span className="text-2xl font-extrabold text-slate-900">€{totalBudget.toLocaleString()}</span>
                  </div>
                  <Badge variant="success" size="lg">
                    Guaranteed Protection
                  </Badge>
                </div>
              </div>

              {/* Escrow Guarantee Statement */}
              <div className="p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <p className="font-bold">100% Naano Escrow Protection</p>
                  <p className="mt-0.5 text-emerald-800 leading-relaxed">
                    Your funds are held securely. Creators will draft posts for your explicit in-app review.
                    If a creator fails to deliver or you do not approve the content within 14 days, your escrow is immediately refunded.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md flex items-center gap-2 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleLaunch}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch & Fund Escrow (€{totalBudget.toLocaleString()})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
