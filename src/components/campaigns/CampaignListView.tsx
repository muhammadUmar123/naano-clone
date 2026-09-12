import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Megaphone,
  Plus,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MousePointerClick,
  Euro
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const CampaignListView: React.FC = () => {
  const { campaigns, navigate } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'draft'>('all');

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  // Aggregated campaign metrics
  const totalSpend = campaigns.reduce((sum, c) => sum + c.totalBudget, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.stats.totalImpressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.stats.totalClicks, 0);
  const totalPipeline = campaigns.reduce((sum, c) => sum + c.stats.pipelineValue, 0);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header with Title & New Campaign CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campaign Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track creator deliverables, review submitted LinkedIn drafts, and monitor live B2B pipeline.
            </p>
          </div>

          <button
            onClick={() => navigate('campaign-wizard')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Campaign</span>
          </button>
        </div>

        {/* Aggregate KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Total Escrow Budget</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
              €{totalSpend.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">{campaigns.length} campaigns active</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Delivered Impressions</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
              {(totalImpressions / 1000).toFixed(1)}k
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">100% verified B2B</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Total Qualified Clicks</span>
            <span className="text-2xl font-extrabold text-indigo-600 mt-1 block">
              {totalClicks.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Avg CTR 4.1%</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Generated Pipeline</span>
            <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
              €{totalPipeline.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">
              {(totalPipeline / (totalSpend || 1)).toFixed(1)}x Verified ROI
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
          {[
            { id: 'all', label: 'All Campaigns', count: campaigns.length },
            {
              id: 'active',
              label: 'Active & In-Progress',
              count: campaigns.filter((c) => c.status === 'active').length,
            },
            {
              id: 'completed',
              label: 'Completed',
              count: campaigns.filter((c) => c.status === 'completed').length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                filter === tab.id
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === tab.id ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.map((camp) => {
            const draftsUnderReview = camp.creators.filter(
              (c) => c.stage === 'draft_submitted'
            ).length;
            const livePosts = camp.creators.filter((c) => c.stage === 'published').length;

            return (
              <div
                key={camp.id}
                onClick={() => navigate('campaign-detail', { campaignId: camp.id })}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Campaign Title, Status & Dates */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {camp.name}
                      </h3>
                      <Badge
                        variant={
                          camp.status === 'active'
                            ? 'success'
                            : camp.status === 'completed'
                            ? 'neutral'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {camp.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {camp.objective}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Flight dates: {camp.startDate} to {camp.endDate}
                      </span>
                    </p>

                    {/* Creator avatar roster */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex -space-x-2 overflow-hidden">
                        {camp.creators.map((c, i) => (
                          <img
                            key={i}
                            src={c.creatorAvatar}
                            alt={c.creatorName}
                            className="w-7 h-7 rounded-full object-cover border-2 border-white"
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-slate-600">
                        {camp.creators.length} Creators
                      </span>

                      {draftsUnderReview > 0 && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 animate-pulse">
                          ⚡ {draftsUnderReview} Draft to Review
                        </span>
                      )}

                      {livePosts > 0 && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ✓ {livePosts} Live
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle / Right: Performance Stats & Action */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                          Budget
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          €{camp.totalBudget.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                          Impressions
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {(camp.stats.totalImpressions / 1000).toFixed(1)}k
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                          Pipeline
                        </span>
                        <span className="text-sm font-bold text-emerald-600">
                          €{camp.stats.pipelineValue.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button className="px-4 py-2 bg-slate-100 group-hover:bg-indigo-600 text-slate-700 group-hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0">
                      <span>Manage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
