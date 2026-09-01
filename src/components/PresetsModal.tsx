import React from 'react';
import { X, Layers, ArrowRight, Sparkles, Check } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/cropKnowledgeBase';
import { PresetScenario } from '../types';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetScenario) => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      
      <div 
        id="presets-modal-container"
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">Agricultural Ecosystem Presets</h3>
              <p className="text-xs text-slate-400">Calibrated real-world soil chemistry & climate scenarios</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {PRESET_SCENARIOS.map((preset) => {
            const p = preset.soilParameters;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className="group p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {preset.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {preset.tag}
                    </span>
                  </div>

                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Load Ecosystem</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {preset.description}
                </p>

                {/* Parameters pill breakdown */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 text-[10px] font-mono text-center pt-1 border-t border-slate-900">
                  <div className="p-1 bg-slate-900 rounded text-slate-300">
                    <span className="text-slate-500 block text-[9px]">pH</span>
                    {p.ph}
                  </div>
                  <div className="p-1 bg-slate-900 rounded text-slate-300">
                    <span className="text-slate-500 block text-[9px]">N</span>
                    {p.nitrogen}
                  </div>
                  <div className="p-1 bg-slate-900 rounded text-slate-300">
                    <span className="text-slate-500 block text-[9px]">P</span>
                    {p.phosphorus}
                  </div>
                  <div className="p-1 bg-slate-900 rounded text-slate-300">
                    <span className="text-slate-500 block text-[9px]">K</span>
                    {p.potassium}
                  </div>
                  <div className="p-1 bg-slate-900 rounded text-slate-300">
                    <span className="text-slate-500 block text-[9px]">Temp</span>
                    {p.temperature}°C
                  </div>
                  <div className="p-1 bg-slate-900 rounded text-slate-300">
                    <span className="text-slate-500 block text-[9px]">Rain</span>
                    {p.rainfall}mm
                  </div>
                  <div className="p-1 bg-slate-900 rounded text-slate-300">
                    <span className="text-slate-500 block text-[9px]">Moisture</span>
                    {p.soilMoisture}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
