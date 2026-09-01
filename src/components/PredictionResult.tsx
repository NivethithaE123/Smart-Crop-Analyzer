import React, { useState } from 'react';
import { 
  Sprout, 
  Award, 
  Droplets, 
  ShieldAlert, 
  RotateCcw, 
  Save, 
  Calendar,
  Check,
  Share2,
  Printer
} from 'lucide-react';
import { PredictionResultData } from '../types';
import confetti from 'canvas-confetti';

interface PredictionResultProps {
  result: PredictionResultData;
  onNewAnalysis: () => void;
  onSaveToHistory: (result: PredictionResultData) => void;
  isSaved: boolean;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  result,
  onNewAnalysis,
  onSaveToHistory,
  isSaved
}) => {
  const [activeTab, setActiveTab] = useState<'care' | 'pests'>('care');
  const [copiedLink, setCopiedLink] = useState(false);

  const { primaryRecommendation: topCrop, inputParameters } = result;
  const cropDetails = topCrop.cropDetails;
  const care = cropDetails.careInstructions;

  // Trigger celebration confetti on view mount
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669', '#f59e0b']
      });
    } catch (e) {
      // benign
    }
  }, [result.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Smart Crop Analyzer Recommendation: ${topCrop.cropName} (${topCrop.confidence}% Match) for field pH ${inputParameters.ph}, temperature ${inputParameters.temperature}°C, rainfall ${inputParameters.rainfall}mm.`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <button
            id="btn-back-analysis"
            onClick={onNewAnalysis}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Test Another Field</span>
          </button>
          
          <span className="text-xs text-slate-500 hidden md:inline">|</span>
          
          <div className="text-xs text-slate-400">
            Field: <span className="font-semibold text-white">{inputParameters.fieldName || 'Cultivation Zone'}</span> ({inputParameters.location || 'Local Region'})
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-save-record"
            onClick={() => onSaveToHistory(result)}
            disabled={isSaved}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isSaved
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 cursor-default'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-900/30 cursor-pointer'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved to Records</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Analysis</span>
              </>
            )}
          </button>

          <button
            id="btn-print-report"
            onClick={handlePrint}
            className="p-2 rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            title="Print or Save PDF Report"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            id="btn-share-report"
            onClick={handleShare}
            className="p-2 rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            title="Copy Report Summary"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Recommended Crop Result Card */}
      <div 
        id="recommendation-hero-card"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/50"
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left: Crop Identity */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20">
                <Award className="w-3.5 h-3.5" />
                Recommended Crop
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {cropDetails.category}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-4xl sm:text-5xl p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-inner flex items-center justify-center">
                {cropDetails.icon}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                  {cropDetails.name}
                </h1>
                <p className="text-sm font-mono text-emerald-400 italic">
                  {cropDetails.scientificName}
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {cropDetails.tagline}
            </p>
          </div>

          {/* Right: Confidence Metric Badge */}
          <div className="flex sm:flex-col items-center justify-between sm:items-end gap-3 bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-emerald-500/30 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Model Match Confidence
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                  {topCrop.confidence}%
                </span>
              </div>
            </div>

            <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${topCrop.confidence}%` }}
              />
            </div>
          </div>

        </div>

        {/* Parameter Match Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold block">Soil pH Match</span>
            <div className="text-sm font-bold text-white mt-0.5">{topCrop.parameterFit.phFit}%</div>
            <span className="text-[10px] text-emerald-400 font-mono">Input: {inputParameters.ph}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold block">Climate Fit</span>
            <div className="text-sm font-bold text-white mt-0.5">{topCrop.parameterFit.climateFit}%</div>
            <span className="text-[10px] text-teal-400 font-mono">{inputParameters.temperature}°C / {inputParameters.humidity}%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold block">Soil Moisture</span>
            <div className="text-sm font-bold text-white mt-0.5">{topCrop.parameterFit.moistureFit}%</div>
            <span className="text-[10px] text-blue-400 font-mono">{inputParameters.soilMoisture}%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold block">Soil Texture</span>
            <div className="text-sm font-bold text-white mt-0.5">{topCrop.parameterFit.soilTypeFit}%</div>
            <span className="text-[10px] text-emerald-400 font-mono capitalize">{inputParameters.soilType.replace('_', ' ')}</span>
          </div>

        </div>
      </div>

      {/* Tabs Navigation: Sowing & Care Instructions and Pest & Disease Defense */}
      <div className="flex border-b border-slate-800 gap-3 pb-2">
        
        <button
          id="tab-btn-care"
          onClick={() => setActiveTab('care')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'care'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Sowing & Care Instructions</span>
        </button>

        <button
          id="tab-btn-pests"
          onClick={() => setActiveTab('pests')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'pests'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Pest & Disease Defense</span>
        </button>

      </div>

      {/* Tab: Sowing & Care Instructions */}
      {activeTab === 'care' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Sprout className="w-4 h-4" />
              Sowing & Seedbed Preparation
            </h3>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Soil Preparation:
                </span>
                <p>{care.soilPreparation}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Sowing Method & Spacing:
                </span>
                <p>{care.sowingGuide}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Ideal Season & Expected Yield:
                </span>
                <p><strong>Season:</strong> {care.season} | <strong>Yield:</strong> {care.expectedYield}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Water & Irrigation Scheduling
            </h3>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Irrigation Guidelines:
                </span>
                <p>{care.irrigationSchedule}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Harvesting & Maturity Indicators:
                </span>
                <p>{care.harvestingGuidelines}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Fertilizer Management:
                </span>
                <p>{care.fertilizerManagement}</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab: Pest & Disease Defense */}
      {activeTab === 'pests' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 animate-fadeIn">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Integrated Pest & Disease Management (IPM)
            </h3>
            <p className="text-xs text-slate-400">Preventative biological and crop protection directives for {cropDetails.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {care.pestAndDiseases.map((pest, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400">{pest.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-950 text-rose-300 border border-rose-800">
                    High Risk Alert
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Diagnostic Symptoms:</span>
                  <p className="text-xs text-slate-300">{pest.symptoms}</p>
                </div>
                <div className="pt-2 border-t border-slate-900">
                  <span className="text-[11px] text-emerald-400 block font-medium">Prevention & Control:</span>
                  <p className="text-xs text-slate-300">{pest.prevention}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
