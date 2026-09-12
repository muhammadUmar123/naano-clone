import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Check,
  Plus,
  Building,
  MapPin,
  Clock,
  Sparkles,
  BarChart3,
  FileText,
  Star,
  Users,
  Globe
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { LinkedInPostPreview } from '../common/LinkedInPostPreview';

export const CreatorProfileModal: React.FC = () => {
  const {
    selectedCreator,
    closeCreatorDetail,
    selectedCreatorIds,
    toggleCreatorSelection,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'audience' | 'posts' | 'reviews'>('audience');

  if (!selectedCreator) return null;

  const isSelected = selectedCreatorIds.includes(selectedCreator.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header & Banner */}
        <div className="relative bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shrink-0">
          <button
            onClick={closeCreatorDetail}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <div className="relative">
              <img
                src={selectedCreator.avatar}
                alt={selectedCreator.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                referrerPolicy="no-referrer"
              />
              <span
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-xs"
                title="Verified LinkedIn Creator"
              >
                in
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {selectedCreator.name}
                </h2>
                <Badge variant="purple" size="sm">
                  {selectedCreator.vertical}
                </Badge>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{selectedCreator.matchScore}% Match</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 max-w-xl">
                {selectedCreator.headline}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>{selectedCreator.currentCompany}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedCreator.location}</span>
                </span>
                <a
                  href={selectedCreator.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-300 hover:text-white flex items-center gap-1 underline transition-colors"
                >
                  <span>LinkedIn profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-4 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Followers</span>
              <span className="text-base font-extrabold text-white">
                {selectedCreator.followers.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Avg Views</span>
              <span className="text-base font-extrabold text-white">
                {selectedCreator.avgImpressions.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Engagement</span>
              <span className="text-base font-extrabold text-emerald-400">
                {selectedCreator.engagementRate}%
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Rating</span>
              <span className="text-base font-extrabold text-amber-400">
                ★ {selectedCreator.rating} ({selectedCreator.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex items-center gap-6 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('audience')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'audience'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Audience Demographics</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'posts'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Past Sponsored Posts ({selectedCreator.pastSponsorships.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Brand Reviews ({selectedCreator.reviewCount})</span>
          </button>
        </div>

        {/* Tab Content Area (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {activeTab === 'audience' && (
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Creator Bio
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedCreator.bio}
                </p>
              </div>

              {/* Topics */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Core Content Topics
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCreator.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audited Audience Titles Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Top Job Titles Reached
                  </h4>
                  <div className="space-y-2.5">
                    {selectedCreator.audience.topTitles.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-700">{item.title}</span>
                          <span className="font-bold text-slate-900">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Job Functions
                  </h4>
                  <div className="space-y-2.5">
                    {selectedCreator.audience.topFunctions.map((func, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-700">{func.func}</span>
                          <span className="font-bold text-slate-900">{func.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{ width: `${func.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Sizes & Geographies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Company Size Distribution
                  </h4>
                  <div className="space-y-2">
                    {selectedCreator.audience.topCompanySizes.map((size, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-600">
                        <span>{size.size}</span>
                        <strong className="text-slate-800">{size.percentage}%</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Top Audience Locations
                  </h4>
                  <div className="space-y-2">
                    {selectedCreator.audience.topCountries.map((c, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-600">
                        <span>
                          {c.flag} {c.country}
                        </span>
                        <strong className="text-slate-800">{c.percentage}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enterprise companies engaging */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
                <h4 className="text-xs font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Audited Enterprise Engagement</span>
                </h4>
                <p className="text-xs text-indigo-700">
                  Employees from the following tech organizations frequently like, repost, and comment on{' '}
                  {selectedCreator.name}'s posts:
                </p>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {selectedCreator.audience.notableEngagers.map((brand, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white text-indigo-900 font-bold text-xs border border-indigo-200/80 shadow-2xs"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-500">
                Verified previous sponsored posts booked through Naano or directly on LinkedIn:
              </p>
              {selectedCreator.pastSponsorships.map((post) => (
                <div key={post.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span className="font-semibold text-slate-800">Brand Partner: {post.brandName}</span>
                    <span>{post.date}</span>
                  </div>
                  <LinkedInPostPreview
                    authorName={selectedCreator.name}
                    authorHeadline={selectedCreator.headline}
                    authorAvatar={selectedCreator.avatar}
                    postCopy={post.contentSnippet}
                    sponsorName={post.brandName}
                    likesCount={post.likes}
                    commentsCount={post.comments}
                    repostsCount={post.reposts}
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                <div className="text-2xl font-extrabold text-amber-900">
                  ★ {selectedCreator.rating}
                </div>
                <div className="text-xs text-amber-800">
                  <p className="font-bold">Verified B2B Advertiser Rating</p>
                  <p>Based on {selectedCreator.reviewCount} completed campaigns with escrow delivery.</p>
                </div>
              </div>

              {/* Sample reviews */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Head of Growth @ Postman</span>
                    <span className="text-amber-500">★★★★★</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    "{selectedCreator.name} understood our developer API product immediately. The draft was submitted in 48 hours and required zero edits. Drove over 180 signups."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">VP Marketing @ Series B SaaS</span>
                    <span className="text-amber-500">★★★★★</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    "Super high-quality engagement. We saw comments from Staff Engineers at Vercel and Datadog. Easily our highest ROI LinkedIn channel this quarter."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="p-5 border-t border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">
              Fixed Per-Post Price
            </span>
            <span className="text-2xl font-extrabold text-slate-900">
              €{selectedCreator.ratePerPost}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={closeCreatorDetail}
              className="px-4 py-2.5 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded-xl"
            >
              Close
            </button>

            <button
              onClick={() => {
                toggleCreatorSelection(selectedCreator.id);
              }}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-colors ${
                isSelected
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Selected in Campaign Tray</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Campaign</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
