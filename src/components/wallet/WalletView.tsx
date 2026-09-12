import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  FileText,
  Clock,
  Download,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const WalletView: React.FC = () => {
  const { user, addFundsToWallet, campaigns } = useApp();
  const [depositAmount, setDepositAmount] = useState<number>(2500);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);

  // Calculate locked escrow from active campaigns
  const lockedInCampaigns = campaigns
    .filter((c) => c.status === 'active')
    .reduce((sum, c) => sum + c.totalBudget, 0);

  const handleDeposit = () => {
    if (depositAmount > 0) {
      addFundsToWallet(depositAmount);
      setDepositSuccess(true);
      setTimeout(() => {
        setDepositSuccess(false);
        setShowDepositModal(false);
      }, 1500);
    }
  };

  // Sample transactions
  const transactions = [
    {
      id: 'tx-101',
      date: '2026-09-10',
      description: 'Escrow Locked for Q4 Kubernetes Observability',
      type: 'lock',
      amount: -1850,
      status: 'Held in Escrow',
      invoiceId: 'INV-2026-089',
    },
    {
      id: 'tx-100',
      date: '2026-09-08',
      description: 'Deposit via Wire (SEPA B2B)',
      type: 'deposit',
      amount: 5000,
      status: 'Completed',
      invoiceId: 'DEP-2026-044',
    },
    {
      id: 'tx-099',
      date: '2026-08-28',
      description: 'Payout to Alex Vance (DevTools Post Live)',
      type: 'payout',
      amount: -650,
      status: 'Released',
      invoiceId: 'INV-2026-072',
    },
    {
      id: 'tx-098',
      date: '2026-08-15',
      description: 'Deposit via Corporate Card',
      type: 'deposit',
      amount: 10000,
      status: 'Completed',
      invoiceId: 'DEP-2026-031',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Escrow & Billing Wallet
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Zero-risk creator payments protected by Naano Escrow. Funds are only released upon your explicit approval.
            </p>
          </div>

          <button
            onClick={() => setShowDepositModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Deposit Escrow Funds</span>
          </button>
        </div>

        {/* Wallet Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <ShieldCheck className="w-32 h-32" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Available Escrow Balance
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white mt-2 block">
                €{user.walletBalance.toLocaleString()}
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Ready for campaign allocation</span>
              <button
                onClick={() => setShowDepositModal(true)}
                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
              >
                Top up +
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Locked in Active Campaigns
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 mt-2 block">
                €{lockedInCampaigns.toLocaleString()}
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Pending creator draft delivery & approval</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Platform Plan
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-extrabold text-slate-900">{user.plan}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  €0 / mo fee
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>100% of budget goes to creators</span>
              <span className="text-emerald-700 font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* How Escrow Works */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>The 100% Naano Escrow Protection Guarantee</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">1. Deposit Securely</span>
              <p className="text-slate-500 leading-relaxed">
                Deposit funds into your EU-regulated escrow account via SEPA, ACH, or Corporate Card.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">2. Lock to Campaign</span>
              <p className="text-slate-500 leading-relaxed">
                When you book creators, exact rates are held safely. Creators see funds are guaranteed.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">3. In-App Draft Review</span>
              <p className="text-slate-500 leading-relaxed">
                You review and approve the LinkedIn post draft. Creators cannot publish without your approval.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">4. Post & Auto-Payout</span>
              <p className="text-slate-500 leading-relaxed">
                Once the post goes live on LinkedIn, the creator is paid and VAT invoices are generated.
              </p>
            </div>
          </div>
        </div>

        {/* Transaction History & Invoices */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Transaction History & Invoices</h2>
            <span className="text-xs text-slate-400">All amounts in EUR (€)</span>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.type === 'deposit'
                        ? 'bg-emerald-50 text-emerald-600'
                        : tx.type === 'lock'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    {tx.type === 'deposit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{tx.description}</span>
                    <span className="text-slate-400 mt-0.5 block">
                      {tx.date} • Reference: {tx.invoiceId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-right">
                    <span
                      className={`font-extrabold text-sm block ${
                        tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {tx.amount > 0 ? `+€${tx.amount.toLocaleString()}` : `-€${Math.abs(tx.amount).toLocaleString()}`}
                    </span>
                    <span className="text-[11px] text-slate-400 block">{tx.status}</span>
                  </div>

                  <button
                    onClick={() => alert(`Downloading Invoice ${tx.invoiceId} (PDF)...`)}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Download Invoice PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Top Up Escrow Balance</h3>
              </div>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Escrow funds are 100% refundable at any time until allocated to and approved for live creator posts.
            </p>

            {/* Quick Amount Chips */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Amount
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1000, 2500, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      depositAmount === amt
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    €{amt >= 1000 ? `${amt / 1000}k` : amt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Custom Amount (€)
              </label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                min={100}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Protected under EU PSD2 client fund segregation</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDepositModal(false)}
                className="w-1/2 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeposit}
                className="w-1/2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                {depositSuccess ? 'Deposited!' : `Deposit €${depositAmount.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
