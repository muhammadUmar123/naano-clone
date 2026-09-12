import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Target,
  ExternalLink,
  ShieldCheck,
  MousePointerClick,
  Eye,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const AnalyticsView: React.FC = () => {
  const { campaigns } = useApp();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('all');

  const selectedCampaigns =
    selectedCampaignId === 'all'
      ? campaigns
      : campaigns.filter((c) => c.id === selectedCampaignId);

  const totalSpent = selectedCampaigns.reduce((sum, c) => sum + c.totalBudget, 0);
  const totalImpressions = selectedCampaigns.reduce(
    (sum, c) => sum + c.stats.totalImpressions,
    0
  );
  const totalClicks = selectedCampaigns.reduce((sum, c) => sum + c.stats.totalClicks, 0);
  const totalLeads = selectedCampaigns.reduce((sum, c) => sum + c.stats.totalLeads, 0);
  const totalPipeline = selectedCampaigns.reduce((sum, c) => sum + c.stats.pipelineValue, 0);

  const avgCpc = (totalSpent / (totalClicks || 1)).toFixed(2);
  const avgCpl = (totalSpent / (totalLeads || 1)).toFixed(0);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Analytics & Pipeline Attribution
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              End-to-end attribution from LinkedIn creator impressions down to qualified pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3.5 py-2 hover:bg-slate-50 cursor-pointer shadow-2xs"
            >
              <option value="all">All Campaigns (Consolidated)</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Total Spend</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
              €{totalSpent.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">100% to vetted creators</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Impressions</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
              {(totalImpressions / 1000).toFixed(1)}k
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Verified B2B reach</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">High-Intent Clicks</span>
            <span className="text-2xl font-extrabold text-indigo-600 mt-1 block">
              {totalClicks.toLocaleString()}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Avg CPC: €{avgCpc}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Product Signups</span>
            <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
              {totalLeads}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Cost/Lead: €{avgCpl}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs col-span-2 lg:col-span-1">
            <span className="text-xs font-semibold text-slate-500 block">Pipeline Value</span>
            <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
              €{totalPipeline.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 font-bold mt-0.5 block">
              {(totalPipeline / (totalSpent || 1)).toFixed(1)}x ROI
            </span>
          </div>
        </div>

        {/* Comparison: Naano vs Traditional B2B Channels */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Channel Efficiency Benchmark
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real benchmark metrics comparing your Naano creator campaign performance vs industry standard LinkedIn Sponsored Ads.
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
              84% Cost Advantage
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-slate-200/80 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Marketing Channel</th>
                  <th className="py-3 px-4">Effective CPM</th>
                  <th className="py-3 px-4">Avg CTR</th>
                  <th className="py-3 px-4">Effective CPC</th>
                  <th className="py-3 px-4">ICP Trust Factor</th>
                  <th className="py-3 px-4">Audience Delivery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr className="bg-emerald-50/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Naano Creator Marketplace</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">€24.20</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">4.8%</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">€{avgCpc}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success" size="sm">
                      Peer Practitioner (High)
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">Organic feed injection</td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    LinkedIn Sponsored Content (Feed Ads)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">€115.00</td>
                  <td className="py-3.5 px-4 text-slate-500">0.65%</td>
                  <td className="py-3.5 px-4 text-slate-500">€12.50+</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="neutral" size="sm">
                      Corporate "Promoted" (Low)
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">Ad banner unit</td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    Organic B2B Search Keywords
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">N/A</td>
                  <td className="py-3.5 px-4 text-slate-500">1.8%</td>
                  <td className="py-3.5 px-4 text-slate-500">€9.40</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="neutral" size="sm">
                      Search Intent (Medium)
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">Search SERP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Creator Posts Performance */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Published Creator Posts Breakdown
          </h2>

          <div className="space-y-3">
            {campaigns.flatMap((c) =>
              c.creators
                .filter((item) => item.stage === 'published')
                .map((post) => (
                  <div
                    key={post.creatorId}
                    className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={post.creatorAvatar}
                        alt={post.creatorName}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{post.creatorName}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Live Post
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Campaign: {c.name} • {post.deliverableType}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                          Impressions
                        </span>
                        <strong className="text-slate-900 font-bold">18.4k</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                          Clicks
                        </span>
                        <strong className="text-indigo-600 font-bold">342</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                          Signups
                        </span>
                        <strong className="text-emerald-600 font-bold">29</strong>
                      </div>

                      {post.livePostUrl && (
                        <a
                          href={post.livePostUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>View on LinkedIn</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
