import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Trash2, Users, Eye, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const CreatorDrawer: React.FC = () => {
  const {
    selectedCreatorIds,
    creators,
    clearCreatorSelection,
    removeCreatorSelection,
    navigate,
  } = useApp();

  if (selectedCreatorIds.length === 0) return null;

  const selectedCreators = creators.filter((c) => selectedCreatorIds.includes(c.id));
  const totalCost = selectedCreators.reduce((sum, c) => sum + c.ratePerPost, 0);
  const totalReach = selectedCreators.reduce((sum, c) => sum + c.avgImpressions, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[calc(100%-2rem)] bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700/80 p-4 backdrop-blur-md"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Creator Avatars & Info */}
          <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
            <div className="flex -space-x-3 overflow-hidden p-0.5 shrink-0">
              {selectedCreators.slice(0, 5).map((c) => (
                <div key={c.id} className="relative group">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-900"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => removeCreatorSelection(c.id)}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] hidden group-hover:flex items-center justify-center"
                    title={`Remove ${c.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
              {selectedCreators.length > 5 && (
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-slate-300">
                  +{selectedCreators.length - 5}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white truncate">
                  {selectedCreators.length} Creator{selectedCreators.length > 1 ? 's' : ''} in Roster
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Ready to Brief
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-0.5">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>~{(totalReach / 1000).toFixed(0)}k est. impressions</span>
                </span>
              </div>
            </div>
          </div>

          {/* Budget & Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Escrow</span>
              <span className="text-xl font-extrabold text-white">€{totalCost.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearCreatorSelection}
                className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                title="Clear selection"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('campaign-wizard')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <span>Launch Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
