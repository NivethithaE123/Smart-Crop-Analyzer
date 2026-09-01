import React from 'react';
import { 
  X, 
  Trash2, 
  ExternalLink, 
  History, 
  Calendar, 
  Sparkles, 
  MapPin,
  Sprout
} from 'lucide-react';
import { PredictionResultData } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: PredictionResultData[];
  onSelectRecord: (record: PredictionResultData) => void;
  onDeleteRecord: (id: string) => void;
  onClearAllHistory?: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectRecord,
  onDeleteRecord,
  onClearAllHistory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      
      <div 
        id="history-drawer-panel"
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-slideInRight"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Saved Field Analyses</h3>
              <p className="text-xs text-slate-400">{history.length} soil & crop recommendation records</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && onClearAllHistory && (
              <button
                onClick={onClearAllHistory}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-400 bg-rose-950/30 border border-rose-800/40 hover:bg-rose-900/40 transition-colors"
                title="Delete all history records"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Records List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
              <Sprout className="w-10 h-10 stroke-[1.5] text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-400">No saved field records yet</p>
                <p className="text-[11px] text-slate-500 mt-1">Run a crop recommendation and click "Save Analysis" to store records here.</p>
              </div>
            </div>
          ) : (
            history.map((item) => {
              const crop = item.primaryRecommendation;
              const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div
                  key={item.id}
                  className="group p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="text-2xl p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        {crop.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {crop.cropName}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span className="font-mono text-emerald-400 font-bold">{crop.confidence}% Match</span>
                          <span>•</span>
                          <span>{item.inputParameters.fieldName || 'Cultivation Plot'}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRecord(item.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Summary parameters pills */}
                  <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono text-center">
                    <div className="p-1 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-500 block text-[9px]">pH</span>
                      {item.inputParameters.ph}
                    </div>
                    <div className="p-1 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-500 block text-[9px]">N-P-K</span>
                      {item.inputParameters.nitrogen}-{item.inputParameters.phosphorus}
                    </div>
                    <div className="p-1 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-500 block text-[9px]">Temp</span>
                      {item.inputParameters.temperature}°C
                    </div>
                    <div className="p-1 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-500 block text-[9px]">Rain</span>
                      {item.inputParameters.rainfall}mm
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {dateStr}
                    </span>
                    <button
                      onClick={() => {
                        onSelectRecord(item);
                        onClose();
                      }}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Full Analysis</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};
