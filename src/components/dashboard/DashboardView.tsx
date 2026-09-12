import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  TrendingUp,
  Megaphone,
  Compass,
  ArrowRight,
  ShieldCheck,
  Eye,
  MousePointerClick,
  Users,
  CheckCircle2,
  Clock,
  Zap,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DashboardView: React.FC = () => {
  const { user, campaigns, creators, navigate, openCreatorDetail } = useApp();

  const totalSpent = campaigns.reduce((sum, c) => sum + c.totalBudget, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.stats.totalImpressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.stats.totalClicks, 0);
  const totalPipeline = campaigns.reduce((sum, c) => sum + c.stats.pipelineValue, 0);

  // Active drafts needing review across all campaigns
  const pendingReviews: { campaignId: string; campaignName: string; creatorName: string; creatorAvatar: string }[] = [];
  campaigns.forEach((camp) => {
    camp.creators.forEach((c) => {
      if (c.stage === 'draft_submitted') {
        pendingReviews.push({
          campaignId: camp.id,
          campaignName: camp.name,
          creatorName: c.creatorName,
          creatorAvatar: c.creatorAvatar,
        });
      }
    });
  });

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {user.companyName}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {user.plan}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Welcome back, <span className="font-semibold text-slate-700">{user.name}</span>. Here is your LinkedIn creator performance overview.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('marketplace')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Creators</span>
              </button>

              <button
                onClick={() => navigate('campaign-wizard')}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5"
              >
                <Megaphone className="w-4 h-4" />
                <span>New Campaign</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Alert for Pending Drafts */}
        {pendingReviews.length > 0 && (
          <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-900">
                  {pendingReviews.length} Creator Draft{pendingReviews.length > 1 ? 's' : ''} Ready for Review
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  {pendingReviews[0].creatorName} submitted a LinkedIn draft for "{pendingReviews[0].campaignName}".
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('campaign-detail', { campaignId: pendingReviews[0].campaignId })}
              className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
            >
              Review Draft Now
            </button>
          </div>
        )}

        {/* High-Level B2B Growth Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Verified Impressions</span>
              <Eye className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {(totalImpressions / 1000).toFixed(1)}k
            </span>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+34% vs last month</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>High-Intent Clicks</span>
              <MousePointerClick className="w-4 h-4 text-indigo-500" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
              {totalClicks.toLocaleString()}
            </span>
            <div className="mt-2 text-[11px] text-slate-500 font-medium">
              Effective CPC: <strong className="text-slate-800">€{(totalSpent / (totalClicks || 1)).toFixed(2)}</strong> (vs €12.50 Ads)
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Pipeline Value</span>
              <Zap className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              €{totalPipeline.toLocaleString()}
            </span>
            <div className="mt-2 text-[11px] text-emerald-700 font-bold">
              {(totalPipeline / (totalSpent || 1)).toFixed(1)}x Verified Pipeline ROI
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Protected Escrow</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              €{user.walletBalance.toLocaleString()}
            </span>
            <div className="mt-2 text-[11px] text-slate-500 font-medium">
              100% money-back guarantee
            </div>
          </div>
        </div>

        {/* Active Campaigns Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Active Creator Campaigns</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitor post approvals and performance metrics across flights.
              </p>
            </div>
            <button
              onClick={() => navigate('campaigns')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View all ({campaigns.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {campaigns.slice(0, 3).map((camp) => (
              <div
                key={camp.id}
                onClick={() => navigate('campaign-detail', { campaignId: camp.id })}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 p-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {camp.name}
                    </h3>
                    <Badge variant="success" size="sm">
                      {camp.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{camp.creators.length} Creators</span>
                    <span>•</span>
                    <span>{camp.objective}</span>
                    <span>•</span>
                    <span>€{camp.totalBudget.toLocaleString()} Budget</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Pipeline
                    </span>
                    <strong className="text-emerald-600 font-bold text-sm">
                      €{camp.stats.pipelineValue.toLocaleString()}
                    </strong>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Creators for Next Sprint */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Audience Matchmaker</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Recommended Creators for Your ICP
              </h2>
            </div>
            <button
              onClick={() => navigate('marketplace')}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>Explore full directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {creators.slice(0, 3).map((creator) => (
              <div
                key={creator.id}
                onClick={() => openCreatorDetail(creator.id)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-2xs transition-all cursor-pointer bg-slate-50/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3 mb-2.5">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{creator.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{creator.currentCompany}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {creator.headline}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">€{creator.ratePerPost}</span>
                  <span className="font-semibold text-emerald-600">{creator.engagementRate}% Eng.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
