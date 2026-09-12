import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, Sparkles, Building2, Mail, Lock, CheckCircle2, Star } from 'lucide-react';
import { CompanySlider } from '../common/CompanySlider';

export const AuthView: React.FC = () => {
  const { loginUser, navigate } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('sarah.chen@telemetryflow.io');
  const [company, setCompany] = useState('TelemetryFlow');
  const [name, setName] = useState('Sarah Chen');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      name,
      companyName: company,
      email,
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {/* Nature Background Image with Ambient Atmosphere & Grid */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2160&q=80"
          alt="Scenic mountain landscape nature background"
          className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity filter saturate-150"
          referrerPolicy="no-referrer"
        />
        {/* Deep Slate/Atmospheric Mountain Mist Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-900/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#38bdf815,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 py-10 sm:py-14">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Brand Story & Social Proof (Desktop) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-6 pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/25 text-indigo-300 text-xs font-semibold w-fit">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span>2,000+ Vetted LinkedIn Creators</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-white">
              The B2B creator network built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-indigo-200">
                high-velocity pipeline.
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Skip overpriced corporate ads. Partner directly with verified software engineers,
              VPs of Tech, and growth practitioners who your buyers actually follow and trust.
            </p>

            {/* Value Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero platform subscription fee — 100% of budget goes to creators</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>100% Escrow Protection: funds only release after your post approval</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Audited first-party demographic insights (job titles, geos, company sizes)</span>
              </div>
            </div>

            {/* Mini Creator Spotlight Quote */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mt-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Sarah Chen"
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-200 font-medium mt-0.5">
                    "Naano outperformed our sponsored LinkedIn campaigns by 4.2x on qualified signups."
                  </p>
                  <span className="text-[11px] text-slate-400">Head of Growth, DevTools Unicorn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In / Sign Up Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/15 p-7 sm:p-9 shadow-2xl w-full max-w-md">
              {/* Brand Header */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-indigo-500/20 mx-auto mb-3">
                  n
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {isSignUp ? 'Create your Naano Account' : 'Welcome back to Naano'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  The B2B LinkedIn creator marketplace for fast-growing tech teams.
                </p>
              </div>

              {/* 1-Click LinkedIn Auth Button */}
              <button
                type="button"
                onClick={() =>
                  loginUser({
                    name: 'Sarah Chen',
                    companyName: 'TelemetryFlow',
                    email: 'sarah.chen@telemetryflow.io',
                  })
                }
                className="w-full py-3 bg-[#0A66C2] hover:bg-[#084e96] text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2.5 mb-5 active:scale-[0.99]"
              >
                <span className="font-bold text-base">in</span>
                <span>Continue with LinkedIn</span>
              </button>

              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/80"></div>
                </div>
                <span className="relative bg-slate-900 px-3 text-[11px] uppercase font-bold text-slate-400">
                  or work email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {isSignUp && (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                        placeholder="Elena Rostova"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                        placeholder="TelemetryFlow"
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    placeholder="sarah.chen@company.io"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Password
                    </label>
                    {!isSignUp && (
                      <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                        Forgot password?
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    defaultValue="password123"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
                >
                  <span>{isSignUp ? 'Create Free Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Toggle between Sign in and Sign up */}
              <div className="mt-5 text-center text-xs text-slate-400">
                {isSignUp ? (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="font-bold text-indigo-400 hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p>
                    New to Naano?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="font-bold text-indigo-400 hover:underline"
                    >
                      Create free account
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Company Slider Section at Bottom */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-5">
        <CompanySlider variant="glass" showSubtitle={true} />
      </div>
    </div>
  );
};

