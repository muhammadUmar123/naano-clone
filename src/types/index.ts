export type B2BVertical =
  | 'DevTools & Engineering'
  | 'Sales & RevOps'
  | 'Product & Design'
  | 'AI & Data Science'
  | 'Cybersecurity'
  | 'HR & People Ops'
  | 'FinTech & Finance';

export type SeniorityLevel = 'Founder / C-Level' | 'VP / Director' | 'Senior Practitioner' | 'Mid-Level';

export interface CreatorAudienceBreakdown {
  topTitles: { title: string; percentage: number }[];
  topFunctions: { func: string; percentage: number }[];
  topCountries: { country: string; flag: string; percentage: number }[];
  topCompanySizes: { size: string; percentage: number }[];
  notableEngagers: string[]; // e.g. ['Stripe', 'Datadog', 'Snowflake', 'Vercel']
}

export interface PastSponsoredPost {
  id: string;
  brandName: string;
  brandLogo: string;
  date: string;
  contentSnippet: string;
  likes: number;
  comments: number;
  reposts: number;
  postUrl?: string;
  postType: 'Text + Visual' | 'Document Carousel' | 'Case Study' | 'Short Video';
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  headline: string;
  currentCompany: string;
  location: string;
  countryCode: string;
  vertical: B2BVertical;
  bio: string;
  followers: number;
  avgImpressions: number;
  engagementRate: number; // e.g. 4.8 (%)
  ratePerPost: number; // in EUR (€)
  verifiedLinkedIn: boolean;
  matchScore: number; // 0-100% fit score for typical B2B SaaS
  topics: string[];
  audience: CreatorAudienceBreakdown;
  pastSponsorships: PastSponsoredPost[];
  rating: number; // e.g. 4.9
  reviewCount: number;
  availableForNewCampaigns: boolean;
  responseTimeHours: number;
  linkedinUrl: string;
}

export type CampaignStatus = 'draft' | 'active' | 'in_review' | 'completed';

export type PostWorkflowStage =
  | 'brief_sent'
  | 'draft_submitted'
  | 'brand_review'
  | 'revision_requested'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'completed';

export interface CampaignCreatorDraft {
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  stage: PostWorkflowStage;
  deliverableType: 'Text + Custom Visual' | 'Document Carousel' | 'Short Video' | 'Personal Case Study';
  scheduledDate: string;
  postCopy?: string;
  draftContent?: string;
  assetUrl?: string;
  feedbackNotes?: string[];
  publishedPostUrl?: string;
  livePostUrl?: string;
  performance?: {
    impressions: number;
    clicks: number;
    ctr: number;
    leads: number;
    spend: number;
  };
}

export interface CampaignBrief {
  productName: string;
  productUrl: string;
  targetIcp: string;
  keyTalkingPoints: string[];
  hooksToTest: string[];
  dos: string[];
  donts: string[];
  ctaText: string;
  destinationUrlWithUtm: string;
}

export interface Campaign {
  id: string;
  name: string;
  brandName: string;
  brandLogo?: string;
  status: CampaignStatus;
  objective: 'Product Signups' | 'Qualified Pipeline' | 'Content & Awareness' | 'Event Registrations';
  totalBudget: number;
  startDate: string;
  endDate: string;
  creators: CampaignCreatorDraft[];
  brief: CampaignBrief;
  stats: {
    totalImpressions: number;
    totalClicks: number;
    totalLeads: number;
    cpc: number;
    pipelineValue: number;
  };
}

export interface MarketplaceFilterState {
  searchQuery: string;
  vertical: B2BVertical | 'All';
  minFollowers: number;
  maxFollowers: number;
  minPrice: number;
  maxPrice: number;
  minEngagement: number;
  targetSeniority: string | 'All';
  country: string | 'All';
  sortBy: 'match' | 'followers_desc' | 'price_asc' | 'price_desc' | 'engagement_desc';
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  companyName: string;
  companyDomain: string;
  role: string;
  avatar: string;
  plan: 'Self-Serve (€0/mo)' | 'Managed (€700/mo)';
  walletBalance: number;
  escrowLocked: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'draft_submitted' | 'campaign_live' | 'approval_needed' | 'payment';
  linkToCampaignId?: string;
}
