import React, { useState } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Leaf, 
  FlaskConical, 
  Thermometer, 
  Droplets, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { CROPS_DATABASE } from '../data/cropKnowledgeBase';
import { CropInfo } from '../types';

interface CropEncyclopediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCropPreset?: (crop: CropInfo) => void;
}

export const CropEncyclopediaModal: React.FC<CropEncyclopediaModalProps> = ({
  isOpen,
  onClose,
  onSelectCropPreset
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCropId, setExpandedCropId] = useState<string | null>(null);

  if (!isOpen) return null;

  const crops = Object.values(CROPS_DATABASE);
  const categories = ['all', ...Array.from(new Set(crops.map(c => c.category)))];

  const filteredCrops = crops.filter(crop => {
    const matchesQuery = 
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      
      <div 
        id="crop-encyclopedia-container"
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">Agricultural Crop Knowledge Library</h3>
              <p className="text-xs text-slate-400">Optimal soil requirements & care directives for 18+ cultivated crops</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800/80 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search crops by name, scientific title, or characteristics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors capitalize ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Crops List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredCrops.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No crops found matching "{searchQuery}".
            </div>
          ) : (
            filteredCrops.map(crop => {
              const isExpanded = expandedCropId === crop.id;
              const growth = crop.growthRequirements;
              const care = crop.careInstructions;

              return (
                <div
                  key={crop.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-all"
                >
                  <div
                    onClick={() => setExpandedCropId(isExpanded ? null : crop.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                        {crop.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{crop.name}</h4>
                          <span className="text-xs text-emerald-400 font-mono italic">({crop.scientificName})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {crop.category}
                          </span>
                          <span className="text-xs text-slate-400 hidden sm:inline truncate max-w-md">
                            {crop.tagline}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden md:flex items-center gap-3 text-xs text-slate-400 font-mono">
                        <span>pH {growth.optimalPh[0]}-{growth.optimalPh[1]}</span>
                        <span>•</span>
                        <span>{growth.optimalTemp[0]}-{growth.optimalTemp[1]}°C</span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-teal-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </div>
                  </div>

                  {/* Expanded Detailed Specifications */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 bg-slate-900/60 border-t border-slate-800 space-y-4 text-xs animate-fadeIn">
                      <p className="text-slate-300 leading-relaxed">
                        {crop.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">Optimal pH Range</span>
                          <span className="font-mono font-bold text-emerald-400">{growth.optimalPh[0]} - {growth.optimalPh[1]}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">Target N-P-K (kg/ha)</span>
                          <span className="font-mono font-bold text-amber-400">{growth.optimalN[0]}-{growth.optimalP[0]}-{growth.optimalK[0]}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">Temperature (°C)</span>
                          <span className="font-mono font-bold text-white">{growth.optimalTemp[0]}°C - {growth.optimalTemp[1]}°C</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">Rainfall Needs</span>
                          <span className="font-mono font-bold text-blue-400">{growth.optimalRainfall[0]} - {growth.optimalRainfall[1]} mm</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        <div>
                          <span className="font-bold text-teal-400">Sowing & Season:</span>{' '}
                          <span className="text-slate-300">{care.season}. {care.sowingGuide}</span>
                        </div>
                        <div>
                          <span className="font-bold text-blue-400">Water Management:</span>{' '}
                          <span className="text-slate-300">{care.irrigationSchedule}</span>
                        </div>
                        <div>
                          <span className="font-bold text-amber-400">Fertilizer Protocol:</span>{' '}
                          <span className="text-slate-300">{care.fertilizerManagement}</span>
                        </div>
                        <div>
                          <span className="font-bold text-emerald-400">Expected Yield & Economics:</span>{' '}
                          <span className="text-slate-300">{care.expectedYield} — {care.economicValue}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};
