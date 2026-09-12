import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Creator,
  Campaign,
  MarketplaceFilterState,
  UserAccount,
  NotificationItem,
  PostWorkflowStage,
} from '../types';
import { mockCreators } from '../data/creators';
import { mockCampaigns } from '../data/campaigns';

export type AppRoute =
  | 'landing'
  | 'dashboard'
  | 'marketplace'
  | 'campaigns'
  | 'campaign-detail'
  | 'campaign-wizard'
  | 'analytics'
  | 'wallet'
  | 'settings'
  | 'auth'
  | 'brands'
  | 'creators-info'
  | 'pricing'
  | 'case-studies'
  | 'roi-calculator';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentRoute: AppRoute;
  navigate: (route: AppRoute, params?: { creatorId?: string; campaignId?: string }) => void;
  user: UserAccount;
  creators: Creator[];
  campaigns: Campaign[];
  selectedCreatorIds: string[];
  selectedCreator: Creator | null;
  selectedCampaign: Campaign | null;
  activeCampaign: Campaign | null;
  activeCreatorDetailId: string | null;
  activeCampaignDetailId: string | null;
  filterState: MarketplaceFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<MarketplaceFilterState>>;
  resetFilters: () => void;
  toggleCreatorSelection: (creatorId: string) => void;
  removeCreatorSelection: (creatorId: string) => void;
  clearCreatorSelection: () => void;
  openCreatorDetail: (creatorId: string) => void;
  closeCreatorDetail: () => void;
  openCampaignDetail: (campaignId: string) => void;
  createCampaign: (newCampaign: Campaign) => void;
  updateDraftStage: (
    campaignId: string,
    creatorId: string,
    stage: PostWorkflowStage,
    feedbackNote?: string
  ) => void;
  approveDraft: (campaignId: string, creatorId: string) => void;
  requestRevision: (campaignId: string, creatorId: string, feedbackNote?: string) => void;
  publishPost: (campaignId: string, creatorId: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  addWalletFunds: (amount: number) => void;
  addFundsToWallet: (amount: number) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  loginUser: (
    emailOrPayload: string | { email: string; companyName?: string; name?: string; avatar?: string },
    company?: string
  ) => void;
  logoutUser: () => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  isCreatorApplyModalOpen: boolean;
  setIsCreatorApplyModalOpen: (open: boolean) => void;
}

const initialFilterState: MarketplaceFilterState = {
  searchQuery: '',
  vertical: 'All',
  minFollowers: 0,
  maxFollowers: 100000,
  minPrice: 0,
  maxPrice: 2000,
  minEngagement: 0,
  targetSeniority: 'All',
  country: 'All',
  sortBy: 'match',
};

const initialUser: UserAccount = {
  id: 'user-001',
  name: 'Alex Thorne',
  email: 'alex@telemetryflow.io',
  companyName: 'TelemetryFlow',
  companyDomain: 'telemetryflow.io',
  role: 'Head of Growth',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  plan: 'Self-Serve (€0/mo)',
  walletBalance: 3450,
  escrowLocked: 1800,
};

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New LinkedIn Post Draft Submitted',
    message: 'Julian Thorne submitted their draft copy for "Q3 DevTools Adoption". Review and approve before scheduling.',
    timestamp: '25m ago',
    read: false,
    type: 'draft_submitted',
    linkToCampaignId: 'camp-101',
  },
  {
    id: 'notif-2',
    title: 'Creator Post Live & Generating Pipeline',
    message: 'Marcus Vance’s sponsored carousel has crossed 26k impressions with 134 verified leads.',
    timestamp: '2h ago',
    read: false,
    type: 'campaign_live',
    linkToCampaignId: 'camp-102',
  },
  {
    id: 'notif-3',
    title: 'Draft Approval Requested',
    message: 'Priya Narang submitted updated carousel slides for your GTM review.',
    timestamp: '1d ago',
    read: true,
    type: 'approval_needed',
    linkToCampaignId: 'camp-102',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('naano_logged_in');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });
  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('naano_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && typeof parsed.email === 'string') {
          return { ...initialUser, ...parsed };
        }
      }
    } catch {
      // ignore
    }
    return initialUser;
  });
  const [creators] = useState<Creator[]>(mockCreators);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>([]);
  const [activeCreatorDetailId, setActiveCreatorDetailId] = useState<string | null>(null);
  const [activeCampaignDetailId, setActiveCampaignDetailId] = useState<string | null>('camp-101');
  const [filterState, setFilterState] = useState<MarketplaceFilterState>(initialFilterState);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isCreatorApplyModalOpen, setIsCreatorApplyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('naano_logged_in', String(isLoggedIn));
    } catch {
      // ignore
    }
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem('naano_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  const selectedCreator = creators.find((c) => c.id === activeCreatorDetailId) || null;
  const selectedCampaign = campaigns.find((c) => c.id === activeCampaignDetailId) || null;

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (route: AppRoute, params?: { creatorId?: string; campaignId?: string }) => {
    if (params?.creatorId) {
      setActiveCreatorDetailId(params.creatorId);
    }
    if (params?.campaignId) {
      setActiveCampaignDetailId(params.campaignId);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCreatorSelection = (creatorId: string) => {
    setSelectedCreatorIds((prev) => {
      const exists = prev.includes(creatorId);
      const creator = creators.find((c) => c.id === creatorId);
      if (exists) {
        showToast('Creator Removed', `Removed ${creator?.name ?? 'creator'} from campaign draft tray.`, 'info');
        return prev.filter((id) => id !== creatorId);
      } else {
        showToast('Creator Added', `Added ${creator?.name ?? 'creator'} to campaign draft tray!`, 'success');
        return [...prev, creatorId];
      }
    });
  };

  const removeCreatorSelection = (creatorId: string) => {
    setSelectedCreatorIds((prev) => prev.filter((id) => id !== creatorId));
  };

  const clearCreatorSelection = () => {
    setSelectedCreatorIds([]);
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
  };

  const openCreatorDetail = (creatorId: string) => {
    setActiveCreatorDetailId(creatorId);
  };

  const closeCreatorDetail = () => {
    setActiveCreatorDetailId(null);
  };

  const openCampaignDetail = (campaignId: string) => {
    setActiveCampaignDetailId(campaignId);
    navigate('campaign-detail', { campaignId });
  };

  const createCampaign = (newCampaign: Campaign) => {
    setCampaigns((prev) => [newCampaign, ...prev]);
    // Deduct total budget from user wallet or lock in escrow
    setUser((prev) => ({
      ...prev,
      walletBalance: Math.max(0, prev.walletBalance - newCampaign.totalBudget),
      escrowLocked: prev.escrowLocked + newCampaign.totalBudget,
    }));
    clearCreatorSelection();
    showToast('Campaign Launched!', `"${newCampaign.name}" has been created with €${newCampaign.totalBudget} escrow funded.`, 'success');
    navigate('campaign-detail', { campaignId: newCampaign.id });
  };

  const updateDraftStage = (
    campaignId: string,
    creatorId: string,
    stage: PostWorkflowStage,
    feedbackNote?: string
  ) => {
    setCampaigns((prev) =>
      prev.map((camp) => {
        if (camp.id !== campaignId) return camp;
        return {
          ...camp,
          creators: camp.creators.map((c) => {
            if (c.creatorId !== creatorId) return c;
            const updatedNotes = feedbackNote
              ? [...(c.feedbackNotes || []), feedbackNote]
              : c.feedbackNotes;
            return {
              ...c,
              stage,
              feedbackNotes: updatedNotes,
            };
          }),
        };
      })
    );

    const stageLabel =
      stage === 'scheduled'
        ? 'Draft Approved & Scheduled'
        : stage === 'revision_requested'
        ? 'Revision Feedback Sent'
        : stage === 'published'
        ? 'Post Marked as Live'
        : 'Status Updated';

    showToast(stageLabel, `Updated status for creator in campaign.`, 'success');
  };

  const addWalletFunds = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
    }));
    showToast('Funds Added', `Successfully topped up €${amount.toLocaleString()} into your escrow wallet.`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const loginUser = (
    emailOrPayload: string | { email: string; companyName?: string; name?: string; avatar?: string },
    company?: string
  ) => {
    let cleanEmail = 'sarah.chen@telemetryflow.io';
    let cleanCompanyName = 'TelemetryFlow';
    let cleanName = 'Sarah Chen';
    let avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

    if (typeof emailOrPayload === 'object' && emailOrPayload !== null) {
      if (typeof emailOrPayload.email === 'string' && emailOrPayload.email.trim()) {
        cleanEmail = emailOrPayload.email.trim();
      }
      if (typeof emailOrPayload.companyName === 'string' && emailOrPayload.companyName.trim()) {
        cleanCompanyName = emailOrPayload.companyName.trim();
      } else if (typeof company === 'string' && company.trim()) {
        cleanCompanyName = company.trim();
      }
      if (typeof emailOrPayload.name === 'string' && emailOrPayload.name.trim()) {
        cleanName = emailOrPayload.name.trim();
      } else if (cleanEmail.includes('@')) {
        cleanName = cleanEmail.split('@')[0].replace('.', ' ');
      }
      if (typeof emailOrPayload.avatar === 'string' && emailOrPayload.avatar.trim()) {
        avatar = emailOrPayload.avatar.trim();
      }
    } else if (typeof emailOrPayload === 'string') {
      cleanEmail = emailOrPayload.trim() || 'sarah.chen@telemetryflow.io';
      if (typeof company === 'string' && company.trim()) {
        cleanCompanyName = company.trim();
      }
      if (cleanEmail.includes('@')) {
        cleanName = cleanEmail.split('@')[0].replace('.', ' ');
      }
    }

    setUser((prev) => ({
      ...prev,
      email: cleanEmail,
      companyName: cleanCompanyName,
      name: cleanName,
      avatar: prev.avatar || avatar,
    }));
    setIsLoggedIn(true);
    showToast('Welcome back!', `Logged in as ${cleanEmail}`, 'success');
    navigate('dashboard');
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    showToast('Signed out', 'You have been signed out successfully.', 'info');
    navigate('landing');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigate,
        user,
        creators,
        campaigns,
        selectedCreatorIds,
        selectedCreator,
        selectedCampaign,
        activeCampaign: selectedCampaign,
        activeCreatorDetailId,
        activeCampaignDetailId,
        filterState,
        setFilterState,
        resetFilters,
        toggleCreatorSelection,
        removeCreatorSelection,
        clearCreatorSelection,
        openCreatorDetail,
        closeCreatorDetail,
        openCampaignDetail,
        createCampaign,
        updateDraftStage,
        approveDraft: (campaignId: string, creatorId: string) =>
          updateDraftStage(campaignId, creatorId, 'scheduled'),
        requestRevision: (campaignId: string, creatorId: string, feedbackNote?: string) =>
          updateDraftStage(campaignId, creatorId, 'revision_requested', feedbackNote),
        publishPost: (campaignId: string, creatorId: string) =>
          updateDraftStage(campaignId, creatorId, 'published'),
        notifications,
        markNotificationRead,
        toasts,
        showToast,
        removeToast,
        addWalletFunds,
        addFundsToWallet: addWalletFunds,
        isLoggedIn,
        setIsLoggedIn,
        loginUser,
        logoutUser,
        isDemoModalOpen,
        setIsDemoModalOpen,
        isCreatorApplyModalOpen,
        setIsCreatorApplyModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
