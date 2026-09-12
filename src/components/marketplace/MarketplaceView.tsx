import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterSidebar } from './FilterSidebar';
import { CreatorCard } from './CreatorCard';
import { CreatorDrawer } from './CreatorDrawer';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  Users,
  Compass,
  RotateCcw,
  X
} from 'lucide-react';
import { B2BVertical } from '../../types';

const quickVerticalTags: (B2BVertical | 'All')[] = [
  'All',
  'DevTools & Engineering',
  'Sales & RevOps',
  'AI & Data Science',
  'Cybersecurity',
  'Product & Design',
  'FinTech & Finance',
];

export const MarketplaceView: React.FC = () => {
  const { creators, filterState, setFilterState, resetFilters } = useApp();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort creators
  const filteredCreators = useMemo(() => {
    return creators
      .filter((c) => {
        // Search query
        if (filterState.searchQuery.trim()) {
          const q = filterState.searchQuery.toLowerCase();
          const matchName = c.name.toLowerCase().includes(q);
          const matchCompany = c.currentCompany.toLowerCase().includes(q);
          const matchHeadline = c.headline.toLowerCase().includes(q);
          const matchBio = c.bio.toLowerCase().includes(q);
          const matchTopics = c.topics.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchCompany && !matchHeadline && !matchBio && !matchTopics) {
            return false;
          }
        }

        // Vertical
        if (filterState.vertical !== 'All' && c.vertical !== filterState.vertical) {
          return false;
        }

        // Follower count
        if (c.followers < filterState.minFollowers || c.followers > filterState.maxFollowers) {
          return false;
        }

        // Price range
        if (c.ratePerPost < filterState.minPrice || c.ratePerPost > filterState.maxPrice) {
          return false;
        }

        // Engagement
        if (c.engagementRate < filterState.minEngagement) {
          return false;
        }

        // Country
        if (filterState.country !== 'All') {
          if (filterState.country === 'US' && c.countryCode !== 'US' && c.countryCode !== 'CA') return false;
          if (filterState.country === 'EU' && !['GB', 'DE', 'FR', 'NL', 'SE', 'IE', 'CH'].includes(c.countryCode)) return false;
          if (filterState.country === 'GB' && c.countryCode !== 'GB') return false;
          if (filterState.country === 'DE' && c.countryCode !== 'DE') return false;
        }

        // Seniority
        if (filterState.targetSeniority !== 'All') {
          const vpPct = c.audience.topTitles.find(t => t.title.includes('VP') || t.title.includes('Head') || t.title.includes('Director'))?.percentage || 0;
          if (filterState.targetSeniority === 'vp_director' && vpPct < 20) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filterState.sortBy) {
          case 'followers_desc':
            return b.followers - a.followers;
          case 'price_asc':
            return a.ratePerPost - b.ratePerPost;
          case 'price_desc':
            return b.ratePerPost - a.ratePerPost;
          case 'engagement_desc':
            return b.engagementRate - a.engagementRate;
          case 'match':
          default:
            return b.matchScore - a.matchScore;
        }
      });
  }, [creators, filterState]);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] pb-32">
      {/* Top Header & Search Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-20 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Discover B2B Creators
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {filteredCreators.length} Available
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Vetted LinkedIn practitioners with audited audience demographics & fixed pricing.
              </p>
            </div>

            {/* Search Input & Sort Controls */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by topic, name, company (e.g. Kubernetes, RevOps)..."
                  value={filterState.searchQuery}
                  onChange={(e) =>
                    setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))
                  }
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                {filterState.searchQuery && (
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, searchQuery: '' }))}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Select */}
              <div className="relative hidden sm:flex items-center">
                <select
                  value={filterState.sortBy}
                  onChange={(e) =>
                    setFilterState((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any,
                    }))
                  }
                  className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 pr-8 hover:bg-slate-50 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="match">Sort: Highest Match</option>
                  <option value="followers_desc">Sort: Most Followers</option>
                  <option value="price_asc">Sort: Price: Low to High</option>
                  <option value="price_desc">Sort: Price: High to Low</option>
                  <option value="engagement_desc">Sort: Highest Engagement</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="md:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Quick Vertical Horizontal Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar">
            {quickVerticalTags.map((v) => {
              const isSelected = filterState.vertical === v;
              return (
                <button
                  key={v}
                  onClick={() => setFilterState((prev) => ({ ...prev, vertical: v }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-44">
              <FilterSidebar />
            </div>
          </div>

          {/* Creator Cards Grid (9 cols) */}
          <div className="lg:col-span-9">
            {filteredCreators.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">No creators found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  No creators match your current filter combination. Try resetting filters or searching a different term.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredCreators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Tray for Selected Creators */}
      <CreatorDrawer />

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
