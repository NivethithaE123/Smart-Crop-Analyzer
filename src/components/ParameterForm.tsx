import React, { useState } from 'react';
import { 
  FlaskConical, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Gauge, 
  Sparkles, 
  Sun
} from 'lucide-react';
import { SoilParameters, SoilType } from '../types';

interface ParameterFormProps {
  initialValues: SoilParameters;
  onSubmit: (params: SoilParameters) => void;
  isLoading: boolean;
}

export const ParameterForm: React.FC<ParameterFormProps> = ({
  initialValues,
  onSubmit,
  isLoading
}) => {
  const [params, setParams] = useState<SoilParameters>(initialValues);

  const updateParam = <K extends keyof SoilParameters>(key: K, value: SoilParameters[K]) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* Title Section */}
      <div className="text-center pt-2 pb-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          Land & Soil Parameter Analysis
        </h2>
      </div>

      {/* Main Parameters Form */}
      <form onSubmit={handleSubmit} id="smart-crop-form" className="space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Card 1: Soil Chemistry & pH */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Soil Chemistry & pH</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                
                {/* Soil pH */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <span>Soil pH Level</span>
                      <span className="text-[10px] text-slate-500 font-normal">(3.5 - 9.5)</span>
                    </label>
                    <span className="font-mono font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {params.ph.toFixed(1)}
                    </span>
                  </div>
                  <input
                    id="input-param-ph"
                    type="range"
                    min={3.5}
                    max={9.5}
                    step={0.1}
                    value={params.ph}
                    onChange={(e) => updateParam('ph', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>3.5 (Acidic)</span>
                    <span>7.0 (Neutral)</span>
                    <span>9.5 (Alkaline)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Card 2: Climate & Atmospheric Variables */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Climate & Weather</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                
                {/* Temperature */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Temperature</span>
                      <span className="text-[10px] text-slate-500 font-normal">°C</span>
                    </label>
                    <span className="font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {params.temperature}°C
                    </span>
                  </div>
                  <input
                    id="input-param-temperature"
                    type="range"
                    min={8}
                    max={45}
                    step={1}
                    value={params.temperature}
                    onChange={(e) => updateParam('temperature', parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>8°C (Cold)</span>
                    <span>26°C (Moderate)</span>
                    <span>45°C (Hot)</span>
                  </div>
                </div>

                {/* Humidity */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Relative Humidity</span>
                      <span className="text-[10px] text-slate-500 font-normal">%</span>
                    </label>
                    <span className="font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {params.humidity}%
                    </span>
                  </div>
                  <input
                    id="input-param-humidity"
                    type="range"
                    min={14}
                    max={100}
                    step={1}
                    value={params.humidity}
                    onChange={(e) => updateParam('humidity', parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>14% (Dry)</span>
                    <span>60% (Moderate)</span>
                    <span>100% (Humid)</span>
                  </div>
                </div>

                {/* Rainfall */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                      <span>Seasonal Rainfall</span>
                      <span className="text-[10px] text-slate-500 font-normal">mm</span>
                    </label>
                    <span className="font-mono font-bold text-blue-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {params.rainfall} mm
                    </span>
                  </div>
                  <input
                    id="input-param-rainfall"
                    type="range"
                    min={20}
                    max={300}
                    step={5}
                    value={params.rainfall}
                    onChange={(e) => updateParam('rainfall', parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>20mm (Arid)</span>
                    <span>140mm (Average)</span>
                    <span>300mm (Heavy)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Card 3: Soil Moisture & Soil Type */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Soil Moisture & Type</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                
                {/* Soil Moisture */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-blue-400" />
                      <span>Soil Moisture Content</span>
                      <span className="text-[10px] text-slate-500 font-normal">%</span>
                    </label>
                    <span className="font-mono font-bold text-blue-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {params.soilMoisture}%
                    </span>
                  </div>
                  <input
                    id="input-param-moisture"
                    type="range"
                    min={10}
                    max={95}
                    step={1}
                    value={params.soilMoisture}
                    onChange={(e) => updateParam('soilMoisture', parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>10% (Dry)</span>
                    <span>50% (Moist)</span>
                    <span>95% (Saturated)</span>
                  </div>
                </div>

                {/* Soil Type Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Soil Texture Classification
                  </label>
                  <select
                    id="select-param-soiltype"
                    value={params.soilType}
                    onChange={(e) => updateParam('soilType', e.target.value as SoilType)}
                    className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="alluvial">Alluvial Loam</option>
                    <option value="black">Black Soil</option>
                    <option value="red_loam">Red Loam</option>
                    <option value="clay">Clay Soil</option>
                    <option value="sandy_loam">Sandy Loam</option>
                    <option value="silt_loam">Silt Loam</option>
                    <option value="laterite">Laterite Soil</option>
                    <option value="peaty">Peaty Soil</option>
                  </select>
                </div>

                {/* Field Name & Region */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Field / Plot Name
                    </label>
                    <input
                      id="input-param-fieldname"
                      type="text"
                      value={params.fieldName || ''}
                      onChange={(e) => updateParam('fieldName', e.target.value)}
                      placeholder="e.g. North Plot #2"
                      className="w-full py-2 px-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Geographic Region
                    </label>
                    <input
                      id="input-param-location"
                      type="text"
                      value={params.location || ''}
                      onChange={(e) => updateParam('location', e.target.value)}
                      placeholder="e.g. Western Plains"
                      className="w-full py-2 px-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Submit Prediction Button */}
        <div className="pt-2 flex items-center justify-center">
          <button
            id="btn-predict-crop"
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto min-w-[280px] px-8 py-3.5 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 active:scale-[0.98] shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider font-['Outfit']"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Predicting Suitable Crop...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Predict Suitable Crop</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
