import React from 'react';
import { 
  Sprout, 
  History, 
  LogOut 
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  historyCount: number;
  onOpenHistory: () => void;
  onLogout: () => void;
  onNewAnalysis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  historyCount,
  onOpenHistory,
  onLogout,
  onNewAnalysis
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-800/40 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Project Branding */}
        <div 
          onClick={onNewAnalysis}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-['Outfit']">
              Smart Crop <span className="text-emerald-400">Analyzer</span>
            </h1>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          {/* History */}
          <button
            id="nav-btn-history"
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-emerald-300 border border-slate-700/60 transition-colors cursor-pointer"
            title="Saved Field Analyses"
          >
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-white bg-emerald-600 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* Log Out */}
          <button
            id="nav-btn-logout"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700/60 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            <span>Log Out</span>
          </button>
        </div>

      </div>
    </header>
  );
};
