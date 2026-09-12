import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ShieldCheck, Linkedin, Twitter, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setIsDemoModalOpen, setIsCreatorApplyModalOpen } = useApp();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">
                n
              </div>
              <span className="text-xl font-black tracking-tight text-white font-sans">
                naano<span className="text-indigo-400">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The premier B2B LinkedIn creator marketplace. Discover vetted industry practitioners, launch fixed-price sponsored campaigns, and drive verified pipeline — without agency retainers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Escrow System Operational</span>
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Marketplace</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Discover Creators
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('brands')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  For B2B Brands
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('creators-info')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  For LinkedIn Creators
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Transparent Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('case-studies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('roi-calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive ROI Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Verticals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Verticals</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  DevTools & Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI & Data Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cybersecurity
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sales & RevOps
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Product & Design
                </button>
              </li>
            </ul>
          </div>

          {/* Get Started & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Quick Start</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="hover:text-indigo-400 font-semibold transition-colors cursor-pointer"
                >
                  Book a Platform Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCreatorApplyModalOpen(true)}
                  className="hover:text-indigo-400 font-semibold transition-colors cursor-pointer"
                >
                  Apply as a Creator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('campaign-wizard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Launch New Campaign
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('wallet')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Escrow Guarantee SLA
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} Naano. All rights reserved. B2B Creator Marketplace.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('pricing')}
              className="hover:text-slate-400 transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigate('pricing')}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('wallet')}
              className="hover:text-slate-400 transition-colors"
            >
              Security & Escrow
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
