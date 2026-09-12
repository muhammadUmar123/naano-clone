import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CampaignCreatorDraft } from '../../types';
import { LinkedInPostPreview } from '../common/LinkedInPostPreview';
import { Badge } from '../common/Badge';
import {
  ArrowLeft,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  AlertCircle,
  FileCheck2,
  TrendingUp
} from 'lucide-react';

export const CampaignDetailView: React.FC = () => {
  const {
    activeCampaign,
    navigate,
    approveDraft,
    requestRevision,
    publishPost,
  } = useApp();

  // Active reviewing creator
  const [reviewingCreatorId, setReviewingCreatorId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [copiedUtm, setCopiedUtm] = useState(false);

  if (!activeCampaign) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <h2 className="text-xl font-bold text-slate-800">Campaign not found</h2>
        <button
          onClick={() => navigate('campaigns')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
        >
          Back to Campaigns
        </button>
      </div>
    );
  }

  const reviewingCreator = activeCampaign.creators.find(
    (c) => c.creatorId === reviewingCreatorId
  );

  const handleCopyUtm = () => {
    navigator.clipboard.writeText(activeCampaign.brief.destinationUrlWithUtm);
    setCopiedUtm(true);
    setTimeout(() => setCopiedUtm(false), 2000);
  };

  const handleApprove = (creatorId: string) => {
    approveDraft(activeCampaign.id, creatorId);
    setReviewingCreatorId(null);
  };

  const handleRequestRevision = (creatorId: string) => {
    if (feedbackText.trim()) {
      requestRevision(activeCampaign.id, creatorId, feedbackText.trim());
      setFeedbackText('');
      setReviewingCreatorId(null);
    }
  };

  const handlePublish = (creatorId: string) => {
    publishPost(activeCampaign.id, creatorId);
    setReviewingCreatorId(null);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('campaigns')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Campaigns</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <Badge
              variant={
                activeCampaign.status === 'active'
                  ? 'success'
                  : activeCampaign.status === 'completed'
                  ? 'neutral'
                  : 'warning'
              }
              size="sm"
            >
              {activeCampaign.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Campaign Header Title Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {activeCampaign.objective}
                </span>
                <span className="text-xs text-slate-400">
                  {activeCampaign.startDate} — {activeCampaign.endDate}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {activeCampaign.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Brand: <strong className="text-slate-800">{activeCampaign.brandName}</strong> • Escrow Allocation:{' '}
                <strong className="text-slate-800">€{activeCampaign.totalBudget.toLocaleString()}</strong>
              </p>
            </div>

            {/* Campaign Stats Strip */}
            <div className="flex items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
              <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-center min-w-[90px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Impressions</span>
                <span className="text-lg font-extrabold text-slate-900">
                  {(activeCampaign.stats.totalImpressions / 1000).toFixed(1)}k
                </span>
              </div>

              <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-center min-w-[90px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Clicks</span>
                <span className="text-lg font-extrabold text-indigo-600">
                  {activeCampaign.stats.totalClicks.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-center min-w-[90px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Pipeline</span>
                <span className="text-lg font-extrabold text-emerald-600">
                  €{activeCampaign.stats.pipelineValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables Pipeline Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Creator Deliverables & In-App Review</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review submitted LinkedIn copy before posts go live. Request edits or approve with 1 click.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {activeCampaign.creators.length} Creators
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {activeCampaign.creators.map((c) => {
              const hasDraft = !!c.draftContent;
              const isApproved = c.stage === 'approved';
              const isPublished = c.stage === 'published';
              const needsReview = c.stage === 'draft_submitted';

              return (
                <div
                  key={c.creatorId}
                  className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    needsReview ? 'bg-amber-50/30' : ''
                  }`}
                >
                  {/* Creator Info */}
                  <div className="flex items-center gap-3.5">
                    <img
                      src={c.creatorAvatar}
                      alt={c.creatorName}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{c.creatorName}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {c.deliverableType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Scheduled publication: {c.scheduledDate}
                      </p>
                    </div>
                  </div>

                  {/* Stage & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    {/* Stage status indicator */}
                    <div>
                      {c.stage === 'brief_sent' && (
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Draft in progress</span>
                        </span>
                      )}

                      {c.stage === 'draft_submitted' && (
                        <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 bg-amber-100 px-3 py-1.5 rounded-xl animate-pulse">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Draft ready for review</span>
                        </span>
                      )}

                      {c.stage === 'revision_requested' && (
                        <span className="text-xs font-semibold text-rose-700 flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Revision requested</span>
                        </span>
                      )}

                      {c.stage === 'approved' && (
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 bg-emerald-100 px-3 py-1.5 rounded-xl">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Approved • Ready to post</span>
                        </span>
                      )}

                      {c.stage === 'published' && (
                        <span className="text-xs font-bold text-indigo-800 flex items-center gap-1.5 bg-indigo-100 px-3 py-1.5 rounded-xl">
                          <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Live on LinkedIn</span>
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      {hasDraft && (
                        <button
                          onClick={() => setReviewingCreatorId(c.creatorId)}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
                        >
                          {needsReview ? 'Review Draft' : 'View Post Preview'}
                        </button>
                      )}

                      {isApproved && (
                        <button
                          onClick={() => handlePublish(c.creatorId)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
                        >
                          Simulate Publish Live
                        </button>
                      )}

                      {isPublished && c.livePostUrl && (
                        <a
                          href={c.livePostUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>Open Post</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campaign Brief & UTM Assets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Brief Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Campaign Creative Brief</h3>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Target Persona
              </span>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {activeCampaign.brief.targetIcp}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Approved Talking Points
              </span>
              <ul className="mt-1 space-y-1.5 text-xs text-slate-700">
                {activeCampaign.brief.keyTalkingPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Hooks to Test
              </span>
              <div className="mt-1 space-y-1 text-xs">
                {activeCampaign.brief.hooksToTest.map((hk, i) => (
                  <p key={i} className="p-2 bg-indigo-50/50 text-indigo-900 rounded-lg border border-indigo-100">
                    💡 "{hk}"
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Destination URL & Tracking */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Attribution & Escrow Safeguard</h3>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Tracked UTM Destination URL
              </span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 break-all font-mono">
                {activeCampaign.brief.destinationUrlWithUtm}
              </div>
              <button
                onClick={handleCopyUtm}
                className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                {copiedUtm ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUtm ? 'Copied to clipboard' : 'Copy Tracked Link'}</span>
              </button>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Escrow Status: Active & Secured</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Creators are not paid until you click "Approve Draft" and the post is live. You have full control over brand safety and accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DRAFT REVIEW MODAL */}
      {reviewingCreator && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={reviewingCreator.creatorAvatar}
                  alt={reviewingCreator.creatorName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Draft by {reviewingCreator.creatorName}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Format: {reviewingCreator.deliverableType}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setReviewingCreatorId(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* LinkedIn Preview Component */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Simulated LinkedIn Feed Appearance
              </span>
              <LinkedInPostPreview
                authorName={reviewingCreator.creatorName}
                authorHeadline="Staff DevOps / SRE • Tech Creator"
                authorAvatar={reviewingCreator.creatorAvatar}
                postCopy={
                  reviewingCreator.draftContent ||
                  'No draft submitted yet. The creator is preparing the initial copy.'
                }
                sponsorName={activeCampaign.brandName}
                likesCount={142}
                commentsCount={28}
                repostsCount={12}
              />
            </div>

            {/* Revision Feedback Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Request Edits or Feedback
              </label>
              <textarea
                rows={2}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Suggest specific wording tweaks, ask for link placement, or request visual revisions..."
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => handleRequestRevision(reviewingCreator.creatorId)}
                  disabled={!feedbackText.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Revision Request</span>
                </button>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => setReviewingCreatorId(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
              >
                Close Preview
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleApprove(reviewingCreator.creatorId)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Draft for Publication</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
