import React from 'react';
import { ThumbsUp, MessageSquare, Repeat2, Send, ExternalLink, Globe } from 'lucide-react';

interface LinkedInPostPreviewProps {
  authorName: string;
  authorHeadline: string;
  authorAvatar: string;
  postTime?: string;
  postCopy: string;
  assetUrl?: string;
  sponsorName?: string;
  sponsorLogo?: string;
  ctaText?: string;
  ctaUrl?: string;
  likesCount?: number;
  commentsCount?: number;
  repostsCount?: number;
  isDraftReview?: boolean;
}

export const LinkedInPostPreview: React.FC<LinkedInPostPreviewProps> = ({
  authorName,
  authorHeadline,
  authorAvatar,
  postTime = '1d • Edited • ',
  postCopy,
  assetUrl,
  sponsorName,
  ctaText = 'Learn more',
  ctaUrl,
  likesCount = 842,
  commentsCount = 114,
  repostsCount = 49,
  isDraftReview = false,
}) => {
  // Format body text with paragraphs and highlighted hashtags
  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <br key={i} />;
      
      const words = line.split(' ');
      return (
        <p key={i} className="mb-2.5 leading-relaxed text-slate-800 text-[14px]">
          {words.map((word, wIdx) => {
            if (word.startsWith('#')) {
              return (
                <span key={wIdx} className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                  {word}{' '}
                </span>
              );
            }
            if (word.startsWith('@')) {
              return (
                <span key={wIdx} className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                  {word}{' '}
                </span>
              );
            }
            return word + ' ';
          })}
        </p>
      );
    });
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs font-sans max-w-xl mx-auto">
      {/* Header bar */}
      <div className="p-4 pb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-12 h-12 rounded-full object-cover border border-slate-200"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm font-bold text-slate-900 hover:text-indigo-600 hover:underline cursor-pointer">
                {authorName}
              </h4>
              <span className="text-xs text-slate-400">• 1st</span>
              {sponsorName && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  Promoted
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-1 leading-normal max-w-sm">
              {authorHeadline}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <span>{postTime}</span>
              <Globe className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>

        {isDraftReview && (
          <span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-200 shrink-0">
            Draft Preview
          </span>
        )}
      </div>

      {/* Post text copy */}
      <div className="px-4 pb-3">
        {formatContent(postCopy)}
      </div>

      {/* Asset / Carousel Image */}
      {assetUrl && (
        <div className="relative border-y border-slate-100 bg-slate-950 overflow-hidden">
          <img
            src={assetUrl}
            alt="Post content visual"
            className="w-full object-cover max-h-96"
            referrerPolicy="no-referrer"
          />
          {ctaUrl && (
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-800">{sponsorName || 'Sponsored Partner'}</p>
                <p className="text-[11px] text-slate-500 truncate max-w-xs">{ctaUrl}</p>
              </div>
              <a
                href={ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
              >
                <span>{ctaText}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Social Engagement counts */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">👍</span>
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px]">💡</span>
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">👏</span>
          </div>
          <span className="ml-1 text-[11px]">{likesCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span>{commentsCount} comments</span>
          <span>•</span>
          <span>{repostsCount} reposts</span>
        </div>
      </div>

      {/* Social Action buttons */}
      <div className="px-2 py-1.5 flex items-center justify-between text-slate-600">
        <button className="flex-1 py-2 flex items-center justify-center gap-1.5 hover:bg-slate-50 rounded-md text-xs font-medium transition-colors">
          <ThumbsUp className="w-4 h-4 text-slate-500" />
          <span>Like</span>
        </button>
        <button className="flex-1 py-2 flex items-center justify-center gap-1.5 hover:bg-slate-50 rounded-md text-xs font-medium transition-colors">
          <MessageSquare className="w-4 h-4 text-slate-500" />
          <span>Comment</span>
        </button>
        <button className="flex-1 py-2 flex items-center justify-center gap-1.5 hover:bg-slate-50 rounded-md text-xs font-medium transition-colors">
          <Repeat2 className="w-4 h-4 text-slate-500" />
          <span>Repost</span>
        </button>
        <button className="flex-1 py-2 flex items-center justify-center gap-1.5 hover:bg-slate-50 rounded-md text-xs font-medium transition-colors">
          <Send className="w-4 h-4 text-slate-500" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
