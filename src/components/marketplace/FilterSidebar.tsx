import React from 'react';
import { useApp } from '../../context/AppContext';
import { B2BVertical } from '../../types';
import { Filter, RotateCcw, Check } from 'lucide-react';

const verticals: (B2BVertical | 'All')[] = [
  'All',
  'DevTools & Engineering',
  'Sales & RevOps',
  'AI & Data Science',
  'Cybersecurity',
  'Product & Design',
  'FinTech & Finance',
  'HR & People Ops',
];

const seniorityOptions = [
  { label: 'All Seniorities', value: 'All' },
  { label: '20%+ VP / Director+', value: 'vp_director' },
  { label: '10%+ C-Level / Founders', value: 'c_level' },
  { label: '40%+ Senior Practitioners', value: 'senior' },
];

const geographyOptions = [
  { label: 'All Geographies', value: 'All' },
  { label: '🇺🇸 North America (US/CA)', value: 'US' },
  { label: '🇪🇺 Europe (UK/EU)', value: 'EU' },
  { label: '🇬🇧 United Kingdom', value: 'GB' },
  { label: '🇩🇪 Germany / DACH', value: 'DE' },
];

const priceOptions = [
  { label: 'Any Price', min: 0, max: 2000 },
  { label: 'Under €500', min: 0, max: 500 },
  { label: '€500 - €800', min: 500, max: 800 },
  { label: '€800+', min: 800, max: 2000 },
];

const followerOptions = [
  { label: 'Any Size', min: 0, max: 100000 },
  { label: '1k – 10k (Nano)', min: 1000, max: 10000 },
  { label: '10k – 25k (Micro)', min: 10000, max: 25000 },
  { label: '25k – 50k+ (Authority)', min: 25000, max: 100000 },
];

export const FilterSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { filterState, setFilterState, resetFilters } = useApp();

  return (
    <aside className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-6 text-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Tech Vertical */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          B2B Tech Vertical
        </label>
        <div className="space-y-1">
          {verticals.map((v) => {
            const isSelected = filterState.vertical === v;
            return (
              <button
                key={v}
                onClick={() => setFilterState((prev) => ({ ...prev, vertical: v }))}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="truncate">{v}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Seniority Audience Reach */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Audience Seniority
        </label>
        <div className="space-y-1">
          {seniorityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterState((prev) => ({ ...prev, targetSeniority: opt.value }))}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filterState.targetSeniority === opt.value
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{opt.label}</span>
              {filterState.targetSeniority === opt.value && (
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price per Post */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Rate per Post (€)
        </label>
        <div className="space-y-1">
          {priceOptions.map((p, idx) => {
            const isMatch = filterState.minPrice === p.min && filterState.maxPrice === p.max;
            return (
              <button
                key={idx}
                onClick={() =>
                  setFilterState((prev) => ({ ...prev, minPrice: p.min, maxPrice: p.max }))
                }
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isMatch
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{p.label}</span>
                {isMatch && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Follower Tier */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Follower Audience
        </label>
        <div className="space-y-1">
          {followerOptions.map((f, idx) => {
            const isMatch = filterState.minFollowers === f.min && filterState.maxFollowers === f.max;
            return (
              <button
                key={idx}
                onClick={() =>
                  setFilterState((prev) => ({ ...prev, minFollowers: f.min, maxFollowers: f.max }))
                }
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isMatch
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{f.label}</span>
                {isMatch && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Geography */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Primary Location
        </label>
        <div className="space-y-1">
          {geographyOptions.map((geo) => (
            <button
              key={geo.value}
              onClick={() => setFilterState((prev) => ({ ...prev, country: geo.value }))}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filterState.country === geo.value
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{geo.label}</span>
              {filterState.country === geo.value && (
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {onCloseMobile && (
        <div className="pt-4 border-t border-slate-100 md:hidden">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
          >
            Apply Filters
          </button>
        </div>
      )}
    </aside>
  );
};
