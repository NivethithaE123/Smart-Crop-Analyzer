export type SoilType = 
  | 'alluvial'
  | 'black'
  | 'red_loam'
  | 'clay'
  | 'sandy_loam'
  | 'silt_loam'
  | 'laterite'
  | 'peaty';

export interface SoilParameters {
  nitrogen: number; // N (kg/ha), 0 - 140
  phosphorus: number; // P (kg/ha), 5 - 145
  potassium: number; // K (kg/ha), 5 - 205
  temperature: number; // °C, 8 - 45
  humidity: number; // %, 14 - 100
  ph: number; // pH scale 3.5 - 9.5
  rainfall: number; // mm, 20 - 300
  soilMoisture: number; // %, 10 - 95
  soilType: SoilType;
  fieldName?: string;
  location?: string;
}

export interface GrowthRequirement {
  soilType: string[];
  optimalPh: [number, number]; // [min, max]
  optimalTemp: [number, number]; // [min, max] °C
  optimalHumidity: [number, number]; // [min, max] %
  optimalRainfall: [number, number]; // [min, max] mm
  optimalMoisture: [number, number]; // [min, max] %
  optimalN: [number, number]; // kg/ha
  optimalP: [number, number]; // kg/ha
  optimalK: [number, number]; // kg/ha
  sunlightHours: string;
  growthDuration: string; // e.g. "90-120 days"
  waterRequirement: 'Low' | 'Moderate' | 'High' | 'Very High';
}

export interface CareInstructions {
  sowingGuide: string;
  season: string; // e.g. "Kharif (June-July)", "Rabi (Oct-Nov)", "Zaid (March-June)"
  soilPreparation: string;
  irrigationSchedule: string;
  fertilizerManagement: string;
  pestAndDiseases: {
    name: string;
    symptoms: string;
    prevention: string;
  }[];
  harvestingGuidelines: string;
  expectedYield: string;
  economicValue: string;
}

export interface CropInfo {
  id: string;
  name: string;
  scientificName: string;
  category: 'Cereal / Grain' | 'Pulse / Legume' | 'Fruit' | 'Cash Crop' | 'Fiber' | 'Beverage / Plantation' | 'Vegetable' | 'Oilseed';
  icon: string;
  color: string;
  tagline: string;
  description: string;
  growthRequirements: GrowthRequirement;
  careInstructions: CareInstructions;
}

export interface CropPredictionScore {
  cropId: string;
  cropName: string;
  scientificName: string;
  category: string;
  confidence: number; // 0 - 100 (%)
  matchScore: number; // 0 - 100
  icon: string;
  color: string;
  parameterFit: {
    phFit: number; // 0 - 100
    npkFit: number; // 0 - 100
    climateFit: number; // 0 - 100
    moistureFit: number; // 0 - 100
    soilTypeFit: number; // 0 - 100
  };
  keyAdvantages: string[];
  cautions: string[];
}

export interface PredictionResultData {
  id: string;
  timestamp: string;
  inputParameters: SoilParameters;
  primaryRecommendation: CropPredictionScore & {
    cropDetails: CropInfo;
  };
  alternativeCrops: CropPredictionScore[];
  soilHealthAssessment: {
    overallScore: number; // 0 - 100
    soilFertilityIndex: 'Poor' | 'Moderate' | 'Optimal' | 'Rich';
    phCategory: 'Strongly Acidic' | 'Moderately Acidic' | 'Neutral' | 'Slightly Alkaline' | 'Highly Alkaline';
    primaryDeficiencyOrExcess: string[];
    suggestedAmendments: string[];
  };
  aiAdvisory?: {
    summary: string;
    climateAdjustmentTips: string[];
    customFertilizerFormula: string;
    irrigationStrategy: string;
    pestForecast: string;
    marketOutlook: string;
    organicAlternativePractices: string[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  farmName?: string;
  location?: string;
  preferredUnits?: 'metric' | 'imperial';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface PresetScenario {
  id: string;
  name: string;
  tag: string;
  description: string;
  soilParameters: SoilParameters;
}
