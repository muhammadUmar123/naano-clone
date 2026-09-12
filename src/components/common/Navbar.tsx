import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Megaphone,
  BarChart3,
  Wallet,
  Bell,
  Sparkles,
  Plus,
  ChevronDown,
  LogOut,
  Settings,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2,
  Search,
  ArrowUpRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { Badge } from './Badge';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigate,
    user,
    selectedCreatorIds,
    notifications,
    markNotificationRead,
    logoutUser,
    isLoggedIn,
    setIsDemoModalOpen,
    setIsCreatorApplyModalOpen,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const scrollToSection = (sectionId: string) => {
    if (currentRoute !== 'landing') {
      navigate('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  const appNavItems = [
    {
      id: 'marketplace',
      label: 'Discover Creators',
      icon: <Compass className="w-4 h-4" />,
      badge: '2k+ vetted',
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: <Megaphone className="w-4 h-4" />,
      badge: 'Active',
    },
    {
      id: 'analytics',
      label: 'Analytics & ROI',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'wallet',
      label: 'Escrow & Billing',
      icon: <Wallet className="w-4 h-4" />,
    },
  ];

  const landingNavItems = [
    {
      label: 'For Brands',
      action: () => navigate('brands'),
      isActive: currentRoute === 'brands',
    },
    {
      label: 'For Creators',
      action: () => navigate('creators-info'),
      isActive: currentRoute === 'creators-info',
    },
    {
      label: 'Creators Marketplace',
      badge: '3k+ vetted',
      action: () => navigate('marketplace'),
      isActive: currentRoute === 'marketplace',
    },
    {
      label: 'Pricing',
      action: () => navigate('pricing'),
      isActive: currentRoute === 'pricing',
    },
    {
      label: 'Case Studies',
      action: () => navigate('case-studies'),
      isActive: currentRoute === 'case-studies',
    },
    {
      label: 'ROI Calculator',
      action: () => navigate('roi-calculator'),
      isActive: currentRoute === 'roi-calculator',
    },
  ];

  const isPublicRoute = [
    'landing',
    'brands',
    'creators-info',
    'pricing',
    'case-studies',
    'roi-calculator',
  ].includes(currentRoute);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => navigate('landing')}
              className="flex items-center gap-2.5 group text-left focus:outline-hidden cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-lg tracking-tighter shadow-sm group-hover:bg-indigo-600 transition-colors">
                n
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
                  naano<span className="text-indigo-600">.</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                  B2B Creators
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {isPublicRoute ? (
                // Marketing / Public Page Navigation
                landingNavItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                      item.isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/70">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                // In-App Platform Navigation
                <>
                  <button
                    onClick={() => navigate('landing')}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </button>

                  <div className="w-px h-4 bg-slate-200 mx-1"></div>

                  {appNavItems.map((item) => {
                    const isActive = currentRoute === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.id as any)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-200/80'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </>
              )}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('auth')}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('auth')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            ) : (
              <>
                {/* Quick Search Shortcut to Discover Creators */}
                <button
                  onClick={() => navigate('marketplace')}
                  className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs border border-slate-200/60 transition-colors cursor-pointer"
                  title="Search 2,000+ vetted B2B creators"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search 2k+ creators...</span>
                  <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-400 border border-slate-200 shadow-2xs font-mono">
                    ⌘K
                  </kbd>
                </button>

                {/* Creator Basket Indicator if any selected */}
                {selectedCreatorIds.length > 0 && (
                  <button
                    onClick={() => navigate('marketplace')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all shadow-xs animate-pulse cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    <span>Tray ({selectedCreatorIds.length})</span>
                  </button>
                )}

                {/* Escrow Balance Chip */}
                <button
                  onClick={() => navigate('wallet')}
                  className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                  title="Protected escrow wallet balance"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Escrow: <strong className="text-slate-950 font-bold">€{user.walletBalance.toLocaleString()}</strong>
                  </span>
                </button>

                {/* Book Demo / Creator quick triggers */}
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Book Demo
                </button>

                <button
                  onClick={() => setIsCreatorApplyModalOpen(true)}
                  className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Join as Creator
                </button>

                {/* Primary CTA: Launch Campaign or Browse */}
                {isPublicRoute ? (
                  <button
                    onClick={() => navigate('marketplace')}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Browse Creators</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('campaign-wizard')}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs shadow-indigo-600/20 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Campaign</span>
                  </button>
                )}

                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileMenu(false);
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative transition-colors cursor-pointer"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-900">Notifications</span>
                          {unreadCount > 0 && (
                            <Badge variant="primary" size="sm">
                              {unreadCount} new
                            </Badge>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">All updates</span>
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-xs text-slate-400">
                            No notifications right now
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => {
                                markNotificationRead(n.id);
                                if (n.linkToCampaignId) {
                                  navigate('campaign-detail', { campaignId: n.linkToCampaignId });
                                  setShowNotifications(false);
                                }
                              }}
                              className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                                !n.read ? 'bg-indigo-50/40' : ''
                              }`}
                            >
                              <div className="shrink-0 mt-0.5">
                                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-900 leading-tight">
                                  {n.title}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">
                                  {n.message}
                                </p>
                                <span className="text-[10px] text-slate-400 mt-1 block">
                                  {n.timestamp}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="hidden sm:block text-left">
                      <p className="text-xs font-bold text-slate-900 leading-tight">{user.companyName}</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50">
                      <div className="px-3.5 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {user.plan}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('marketplace');
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-slate-400" />
                        <span>Discover Creators</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('campaigns');
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <Megaphone className="w-3.5 h-3.5 text-slate-400" />
                        <span>My Campaigns</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('wallet');
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <Wallet className="w-3.5 h-3.5 text-slate-400" />
                        <span>Escrow Wallet</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('settings');
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings & Team</span>
                      </button>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          logoutUser();
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          <div className="pb-2 mb-2 border-b border-slate-100">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block px-2 mb-1">
              Navigation
            </span>

            {currentRoute === 'landing' ? (
              <>
                <button
                  onClick={() => {
                    navigate('marketplace');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-indigo-600" />
                    <span>Discover Creators</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    2,000+
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                >
                  How it Works
                </button>

                <button
                  onClick={() => scrollToSection('roi-calculator')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                >
                  ROI Calculator
                </button>

                <button
                  onClick={() => scrollToSection('pricing')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                >
                  Pricing (€0/mo)
                </button>
              </>
            ) : (
              appNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    currentRoute === item.id
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        currentRoute === item.id
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate('auth');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Sign In / Get Started</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    navigate('marketplace');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Discover Creators</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('campaign-wizard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Campaign</span>
                </button>

                <button
                  onClick={() => {
                    navigate('marketplace');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <span>Search 2,000+ Creators</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

