import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { CampaignListView } from './components/campaigns/CampaignListView';
import { CampaignWizard } from './components/campaigns/CampaignWizard';
import { CampaignDetailView } from './components/campaigns/CampaignDetailView';
import { DashboardView } from './components/dashboard/DashboardView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { WalletView } from './components/wallet/WalletView';
import { AuthView } from './components/auth/AuthView';
import { SettingsView } from './components/settings/SettingsView';
import { BrandsView } from './components/brands/BrandsView';
import { CreatorsInfoView } from './components/creators/CreatorsInfoView';
import { PricingView } from './components/pricing/PricingView';
import { CaseStudiesView } from './components/casestudies/CaseStudiesView';
import { RoiCalculatorView } from './components/calculator/RoiCalculatorView';
import { CreatorProfileModal } from './components/creators/CreatorProfileModal';
import { BookDemoModal } from './components/common/BookDemoModal';
import { CreatorApplyModal } from './components/common/CreatorApplyModal';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage />;
      case 'brands':
        return <BrandsView />;
      case 'creators-info':
        return <CreatorsInfoView />;
      case 'pricing':
        return <PricingView />;
      case 'case-studies':
        return <CaseStudiesView />;
      case 'roi-calculator':
        return <RoiCalculatorView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'campaigns':
        return <CampaignListView />;
      case 'campaign-wizard':
        return <CampaignWizard />;
      case 'campaign-detail':
        return <CampaignDetailView />;
      case 'dashboard':
        return <DashboardView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'wallet':
        return <WalletView />;
      case 'auth':
        return <AuthView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <MarketplaceView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View */}
      <main className="flex-1">{renderCurrentView()}</main>

      {/* Global Creator Profile Modal */}
      <CreatorProfileModal />

      {/* Book Demo Modal */}
      <BookDemoModal />

      {/* Join as Creator Modal */}
      <CreatorApplyModal />

      {/* Toast Notification Stack */}
      <ToastContainer />

      {/* Complete Naano Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
