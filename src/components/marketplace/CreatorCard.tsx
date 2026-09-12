import React from 'react';
import { Creator } from '../../types';
import { useApp } from '../../context/AppContext';
import { Check, Plus, Eye, Sparkles, MapPin, Building, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';

interface CreatorCardProps {
  creator: Creator;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const {
    selectedCreatorIds,
    toggleCreatorSelection,
    openCreatorDetail,
  } = useApp();

  const isSelected = selectedCreatorIds.includes(creator.id);

  // Derive top audience percentages
  const primaryTitle = creator.audience.topTitles[0];
  const secondaryTitle = creator.audience.topTitles[1];

  return (
    <div
      className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md ${
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/10'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      <div className="p-5">
        {/* Top bar: Vertical tag & Match Score */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <Badge variant="purple" size="sm">
            {creator.vertical}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>{creator.matchScore}% Match</span>
          </div>
        </div>

        {/* Profile info: Avatar, Name, Company, LinkedIn */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="relative shrink-0">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-13 h-13 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
            {creator.verifiedLinkedIn && (
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-2xs"
                title="Verified LinkedIn Creator"
              >
                in
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3
                onClick={() => openCreatorDetail(creator.id)}
                className="font-bold text-slate-900 text-base leading-tight hover:text-indigo-600 cursor-pointer truncate transition-colors"
              >
                {creator.name}
              </h3>
            </div>
            <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-0.5 truncate">
              <Building className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{creator.currentCompany}</span>
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{creator.location}</span>
            </p>
          </div>
        </div>

        {/* Headline */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 min-h-[36px]">
          {creator.headline}
        </p>

        {/* Audience Demographic Snapshot */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 mb-4 space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Top Audience Title:</span>
            <span className="font-semibold text-slate-800 truncate max-w-[170px]">
              {primaryTitle?.percentage}% {primaryTitle?.title}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Decision Makers:</span>
            <span className="font-semibold text-emerald-700">
              {secondaryTitle ? `${secondaryTitle.percentage}% ${secondaryTitle.title}` : '24% VP / Exec'}
            </span>
          </div>
          <div className="pt-1 border-t border-slate-200/60 flex items-center gap-1 text-[10px] text-slate-500 truncate">
            <span className="font-semibold text-slate-700">Engagers:</span>
            <span className="truncate">{creator.audience.notableEngagers.slice(0, 3).join(', ')}</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Followers</span>
            <span className="text-sm font-bold text-slate-900">
              {(creator.followers / 1000).toFixed(1)}k
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Avg Views</span>
            <span className="text-sm font-bold text-slate-900">
              {(creator.avgImpressions / 1000).toFixed(1)}k
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Engagement</span>
            <span className="text-sm font-bold text-emerald-600">
              {creator.engagementRate}%
            </span>
          </div>
        </div>

        {/* Response speed */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Avg {creator.responseTimeHours}h reply</span>
          </span>
          <span className="text-slate-500 font-medium">★ {creator.rating} ({creator.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Fixed Rate</span>
          <span className="text-base font-extrabold text-slate-900">€{creator.ratePerPost}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openCreatorDetail(creator.id)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
            title="View Full Profile & Audience Demographics"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleCreatorSelection(creator.id)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
              isSelected
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-slate-500" />
                <span>Add to Campaign</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
