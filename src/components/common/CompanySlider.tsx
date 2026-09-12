import React from 'react';

export interface Company {
  name: string;
  category: string;
  symbol: string;
  brandColor?: string;
  badge?: string;
}

export const FEATURED_COMPANIES: Company[] = [
  { name: 'Datadog', category: 'Observability', symbol: 'DD', brandColor: '#632CA6' },
  { name: 'Stripe', category: 'Payments', symbol: 'S', brandColor: '#635BFF' },
  { name: 'Vercel', category: 'Frontend Cloud', symbol: '▲', brandColor: '#000000' },
  { name: 'Supabase', category: 'Postgres & Auth', symbol: '⚡', brandColor: '#3ECF8E' },
  { name: 'Snowflake', category: 'Data Cloud', symbol: '❄', brandColor: '#29B5E8' },
  { name: 'Postman', category: 'API Platform', symbol: '🚀', brandColor: '#FF6C37' },
  { name: 'Deel', category: 'Global HR', symbol: 'D', brandColor: '#0A2540' },
  { name: 'Linear', category: 'Issue Tracking', symbol: '◆', brandColor: '#5E6AD2' },
  { name: 'Ramp', category: 'FinTech', symbol: 'R', brandColor: '#2C3E50' },
  { name: 'Clay', category: 'GTM & Data', symbol: '✦', brandColor: '#6366F1' },
  { name: 'Pinecone', category: 'Vector DB', symbol: '▲', brandColor: '#000000' },
  { name: 'Notion', category: 'Workspace', symbol: 'N', brandColor: '#000000' },
  { name: 'MongoDB', category: 'Database', symbol: '🍃', brandColor: '#00ED64' },
  { name: 'Sentry', category: 'Error Tracking', symbol: '⛑', brandColor: '#8C44F7' },
  { name: 'Docker', category: 'DevOps', symbol: '🐳', brandColor: '#2496ED' },
  { name: 'HubSpot', category: 'CRM Platform', symbol: '⚙', brandColor: '#FF7A59' },
  { name: 'GitLab', category: 'DevSecOps', symbol: '🦊', brandColor: '#FC6D26' },
  { name: 'Cloudflare', category: 'Cloud Security', symbol: '☁', brandColor: '#F38020' },
];

interface CompanySliderProps {
  variant?: 'light' | 'dark' | 'glass';
  showSubtitle?: boolean;
  speed?: 'normal' | 'fast' | 'slow';
  reverse?: boolean;
  className?: string;
}

export const CompanySlider: React.FC<CompanySliderProps> = ({
  variant = 'light',
  showSubtitle = true,
  reverse = false,
  className = '',
}) => {
  // We duplicate the array 3 times to ensure completely seamless infinite scrolling on all viewports
  const list = [...FEATURED_COMPANIES, ...FEATURED_COMPANIES, ...FEATURED_COMPANIES];

  const isDark = variant === 'dark';
  const isGlass = variant === 'glass';

  return (
    <div className={`relative overflow-hidden w-full ${className}`}>
      {showSubtitle && (
        <div className="text-center mb-5 px-4">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-slate-400">
            Trusted by fast-scaling B2B tech companies & unicorn teams
          </p>
        </div>
      )}

      {/* Moving Marquee Container */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left Gradient Mask for smooth fade */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 ${
            isDark
              ? 'bg-gradient-to-r from-slate-900 to-transparent'
              : isGlass
              ? 'bg-gradient-to-r from-slate-900/80 to-transparent'
              : 'bg-gradient-to-r from-white via-white/80 to-transparent'
          }`}
        />

        {/* Right Gradient Mask for smooth fade */}
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 ${
            isDark
              ? 'bg-gradient-to-l from-slate-900 to-transparent'
              : isGlass
              ? 'bg-gradient-to-l from-slate-900/80 to-transparent'
              : 'bg-gradient-to-l from-white via-white/80 to-transparent'
          }`}
        />

        {/* Continuous Animated Track */}
        <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
          {list.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className={`inline-flex items-center gap-2.5 mx-2.5 sm:mx-3 px-4 py-2.5 rounded-2xl transition-all duration-200 cursor-default shrink-0 ${
                isDark
                  ? 'bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 text-white shadow-xs'
                  : isGlass
                  ? 'bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 text-white'
                  : 'bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-xs text-slate-800'
              }`}
            >
              {/* Brand Glyph / Monogram */}
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs"
                style={{
                  backgroundColor: company.brandColor
                    ? isDark || isGlass
                      ? company.brandColor
                      : `${company.brandColor}15`
                    : '#0F172A',
                  color:
                    isDark || isGlass
                      ? '#FFFFFF'
                      : company.brandColor || '#0F172A',
                }}
              >
                {company.symbol}
              </div>

              {/* Company Info */}
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight leading-tight">
                  {company.name}
                </span>
                <span
                  className={`text-[9px] font-medium leading-none mt-0.5 ${
                    isDark || isGlass ? 'text-slate-400' : 'text-slate-400'
                  }`}
                >
                  {company.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
