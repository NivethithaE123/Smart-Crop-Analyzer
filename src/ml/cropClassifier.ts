import { CROPS_DATABASE } from '../data/cropKnowledgeBase';
import { 
  SoilParameters, 
  PredictionResultData, 
  CropPredictionScore,
  SoilType 
} from '../types';

// Soil type compatibility coefficients
const SOIL_COMPATIBILITY: Record<SoilType, Record<string, number>> = {
  alluvial: {
    rice: 1.0, wheat: 1.0, maize: 0.95, cotton: 0.85, chickpea: 0.9,
    coffee: 0.75, banana: 1.0, coconut: 0.9, apple: 0.8, mango: 0.95,
    grapes: 0.9, watermelon: 0.95, orange: 0.9, jute: 1.0, lentil: 0.95,
    pigeonpeas: 0.85, papaya: 0.95, pomegranate: 0.85
  },
  black: {
    rice: 0.7, wheat: 0.85, maize: 0.9, cotton: 1.0, chickpea: 1.0,
    coffee: 0.5, banana: 0.85, coconut: 0.6, apple: 0.4, mango: 0.85,
    grapes: 0.8, watermelon: 0.75, orange: 0.85, jute: 0.65, lentil: 0.9,
    pigeonpeas: 0.95, papaya: 0.75, pomegranate: 0.9
  },
  red_loam: {
    rice: 0.75, wheat: 0.8, maize: 0.95, cotton: 0.85, chickpea: 0.85,
    coffee: 0.95, banana: 0.9, coconut: 0.85, apple: 0.85, mango: 0.95,
    grapes: 0.9, watermelon: 0.85, orange: 0.9, jute: 0.75, lentil: 0.85,
    pigeonpeas: 1.0, papaya: 0.9, pomegranate: 0.95
  },
  clay: {
    rice: 1.0, wheat: 0.85, maize: 0.7, cotton: 0.75, chickpea: 0.65,
    coffee: 0.6, banana: 0.9, coconut: 0.7, apple: 0.6, mango: 0.7,
    grapes: 0.6, watermelon: 0.5, orange: 0.65, jute: 0.95, lentil: 0.7,
    pigeonpeas: 0.6, papaya: 0.6, pomegranate: 0.65
  },
  sandy_loam: {
    rice: 0.55, wheat: 0.8, maize: 0.85, cotton: 0.75, chickpea: 0.95,
    coffee: 0.7, banana: 0.75, coconut: 1.0, apple: 0.75, mango: 0.85,
    grapes: 1.0, watermelon: 1.0, orange: 0.85, jute: 0.7, lentil: 0.9,
    pigeonpeas: 0.85, papaya: 0.95, pomegranate: 0.9
  },
  silt_loam: {
    rice: 0.9, wheat: 1.0, maize: 0.95, cotton: 0.85, chickpea: 0.9,
    coffee: 0.8, banana: 0.95, coconut: 0.8, apple: 1.0, mango: 0.9,
    grapes: 0.9, watermelon: 0.85, orange: 0.9, jute: 0.95, lentil: 0.95,
    pigeonpeas: 0.85, papaya: 0.9, pomegranate: 0.85
  },
  laterite: {
    rice: 0.65, wheat: 0.6, maize: 0.7, cotton: 0.6, chickpea: 0.65,
    coffee: 1.0, banana: 0.75, coconut: 0.9, apple: 0.6, mango: 0.8,
    grapes: 0.65, watermelon: 0.6, orange: 0.7, jute: 0.6, lentil: 0.6,
    pigeonpeas: 0.75, papaya: 0.75, pomegranate: 0.7
  },
  peaty: {
    rice: 0.8, wheat: 0.7, maize: 0.75, cotton: 0.5, chickpea: 0.55,
    coffee: 0.7, banana: 0.85, coconut: 0.7, apple: 0.7, mango: 0.65,
    grapes: 0.6, watermelon: 0.65, orange: 0.65, jute: 0.8, lentil: 0.6,
    pigeonpeas: 0.6, papaya: 0.7, pomegranate: 0.55
  }
};

/**
 * Calculates Gaussian affinity score for a scalar parameter within an optimal range
 */
function calculateRangeScore(val: number, [min, max]: [number, number], toleranceFactor = 0.35): number {
  const center = (min + max) / 2;
  const halfWidth = (max - min) / 2;
  
  if (val >= min && val <= max) {
    // Inside optimal window: score 90-100%
    const distFromCenter = Math.abs(val - center);
    return Math.max(90, 100 - (distFromCenter / (halfWidth || 1)) * 10);
  }
  
  // Outside range: Gaussian decay
  const dist = val < min ? min - val : val - max;
  const sigma = Math.max(halfWidth * toleranceFactor, 1.0);
  const score = Math.exp(-Math.pow(dist / sigma, 2) / 2) * 88;
  return Math.max(5, Math.min(100, score));
}

export function classifyCrop(params: SoilParameters): PredictionResultData {
  const cropScores: CropPredictionScore[] = [];

  for (const crop of Object.values(CROPS_DATABASE)) {
    const req = crop.growthRequirements;

    // 1. pH fit
    const phFit = calculateRangeScore(params.ph, req.optimalPh, 0.4);

    // 2. NPK fit
    const nFit = calculateRangeScore(params.nitrogen, req.optimalN, 0.45);
    const pFit = calculateRangeScore(params.phosphorus, req.optimalP, 0.45);
    const kFit = calculateRangeScore(params.potassium, req.optimalK, 0.45);
    const npkFit = (nFit * 0.4) + (pFit * 0.3) + (kFit * 0.3);

    // 3. Climate fit (Temperature, Humidity, Rainfall)
    const tempFit = calculateRangeScore(params.temperature, req.optimalTemp, 0.35);
    const humidFit = calculateRangeScore(params.humidity, req.optimalHumidity, 0.35);
    const rainFit = calculateRangeScore(params.rainfall, req.optimalRainfall, 0.4);
    const climateFit = (tempFit * 0.35) + (humidFit * 0.3) + (rainFit * 0.35);

    // 4. Moisture fit
    const moistureFit = calculateRangeScore(params.soilMoisture, req.optimalMoisture, 0.4);

    // 5. Soil Type fit
    const soilCompatTable = SOIL_COMPATIBILITY[params.soilType] || {};
    const soilTypeFit = (soilCompatTable[crop.id] ?? 0.7) * 100;

    // Weighted Overall Score (mimicking Random Forest feature importances)
    // Feature Weights: Climate (30%), Soil pH (20%), NPK (25%), Moisture (15%), Soil Type (10%)
    const rawMatch = (climateFit * 0.30) + (phFit * 0.20) + (npkFit * 0.25) + (moistureFit * 0.15) + (soilTypeFit * 0.10);

    // Key advantages & cautions
    const keyAdvantages: string[] = [];
    const cautions: string[] = [];

    if (climateFit > 85) keyAdvantages.push(`Ideal climate: ${params.temperature}°C & ${params.humidity}% humidity perfectly match growth thresholds`);
    if (phFit > 85) keyAdvantages.push(`Soil pH of ${params.ph} is within the prime zone (${req.optimalPh[0]} - ${req.optimalPh[1]})`);
    if (npkFit > 80) keyAdvantages.push('Field nutrient levels support robust vegetative & reproductive development');
    if (moistureFit > 85) keyAdvantages.push(`Moisture level (${params.soilMoisture}%) satisfies ${req.waterRequirement.toLowerCase()} water requirements`);
    if (soilTypeFit >= 90) keyAdvantages.push(`${params.soilType.replace('_', ' ').toUpperCase()} soil provides excellent root anchoring & nutrient exchange`);

    if (phFit < 65) cautions.push(`Soil pH ${params.ph} deviates from optimal ${req.optimalPh[0]}-${req.optimalPh[1]}; amendments advised`);
    if (params.nitrogen < req.optimalN[0]) cautions.push(`Nitrogen (${params.nitrogen} kg/ha) is below optimal ${req.optimalN[0]} kg/ha`);
    if (params.rainfall < req.optimalRainfall[0] * 0.7) cautions.push(`Rainfall (${params.rainfall}mm) may require supplemental irrigation`);
    if (params.soilMoisture < req.optimalMoisture[0] * 0.7) cautions.push('Low soil moisture may cause early vegetative water stress');

    cropScores.push({
      cropId: crop.id,
      cropName: crop.name,
      scientificName: crop.scientificName,
      category: crop.category,
      confidence: 0, // calculated next
      matchScore: Math.round(rawMatch * 10) / 10,
      icon: crop.icon,
      color: crop.color,
      parameterFit: {
        phFit: Math.round(phFit),
        npkFit: Math.round(npkFit),
        climateFit: Math.round(climateFit),
        moistureFit: Math.round(moistureFit),
        soilTypeFit: Math.round(soilTypeFit),
      },
      keyAdvantages: keyAdvantages.length ? keyAdvantages : ['Good general agronomic suitability for current land profile'],
      cautions: cautions.length ? cautions : ['Follow standard agronomic best management practices']
    });
  }

  // Sort descending by match score
  cropScores.sort((a, b) => b.matchScore - a.matchScore);

  // Softmax-like calibration for top confidence probabilities
  const topScores = cropScores.slice(0, 5);
  const expScores = topScores.map(c => Math.exp((c.matchScore - 50) / 12));
  const sumExp = expScores.reduce((a, b) => a + b, 0);

  topScores.forEach((crop, idx) => {
    // Confidence percentage scaled nicely
    const rawConf = (expScores[idx] / sumExp) * 100;
    // Blend with absolute match score for realistic agritech confidence
    crop.confidence = Math.min(99.4, Math.max(55, Math.round(((crop.matchScore * 0.6) + (rawConf * 0.4)) * 10) / 10));
  });

  const bestCrop = topScores[0];
  const alternatives = topScores.slice(1, 4);

  // 6. Soil Health Assessment
  let phCategory: PredictionResultData['soilHealthAssessment']['phCategory'] = 'Neutral';
  if (params.ph < 5.5) phCategory = 'Strongly Acidic';
  else if (params.ph < 6.5) phCategory = 'Moderately Acidic';
  else if (params.ph <= 7.5) phCategory = 'Neutral';
  else if (params.ph <= 8.5) phCategory = 'Slightly Alkaline';
  else phCategory = 'Highly Alkaline';

  const deficiencies: string[] = [];
  const amendments: string[] = [];

  if (params.nitrogen < 40) {
    deficiencies.push('Low Available Nitrogen (N < 40 kg/ha)');
    amendments.push('Apply 50-75 kg/ha Urea or incorporate green manure (Sesbania/Sunnhemp) to enrich nitrogen.');
  } else if (params.nitrogen > 130) {
    deficiencies.push('Excessive Nitrogen (N > 130 kg/ha)');
    amendments.push('Reduce synthetic N fertilizers to prevent vegetative lodging and vulnerability to pests.');
  }

  if (params.phosphorus < 25) {
    deficiencies.push('Low Phosphorus (P < 25 kg/ha)');
    amendments.push('Apply Single Super Phosphate (SSP) or Diammonium Phosphate (DAP) during basal seedbed preparation.');
  }

  if (params.potassium < 25) {
    deficiencies.push('Low Potassium (K < 25 kg/ha)');
    amendments.push('Apply Muriate of Potash (MOP) at 40-50 kg/ha to improve crop drought tolerance and grain quality.');
  }

  if (params.ph < 5.8) {
    amendments.push(`Acidic soil (pH ${params.ph}): Apply agricultural lime (CaCO3) or dolomite at 1.5 - 2.5 tonnes/ha.`);
  } else if (params.ph > 8.0) {
    amendments.push(`Alkaline soil (pH ${params.ph}): Apply agricultural gypsum (CaSO4·2H2O) at 2 - 3 tonnes/ha with farmyard manure.`);
  }

  if (params.soilMoisture < 35) {
    amendments.push('Low moisture reserve: Implement drip irrigation or organic straw mulching to conserve topsoil moisture.');
  }

  const npkAvg = (params.nitrogen + params.phosphorus + params.potassium) / 3;
  let fertilityIndex: PredictionResultData['soilHealthAssessment']['soilFertilityIndex'] = 'Optimal';
  if (npkAvg < 30 || params.ph < 5.0 || params.ph > 8.8) fertilityIndex = 'Poor';
  else if (npkAvg < 55) fertilityIndex = 'Moderate';
  else if (npkAvg > 110) fertilityIndex = 'Rich';

  const overallHealth = Math.round(
    Math.min(100, Math.max(30, 
      (calculateRangeScore(params.ph, [6.0, 7.5]) * 0.3) +
      (calculateRangeScore(params.nitrogen, [50, 110]) * 0.25) +
      (calculateRangeScore(params.phosphorus, [35, 75]) * 0.2) +
      (calculateRangeScore(params.potassium, [30, 90]) * 0.25)
    ))
  );

  return {
    id: `pred_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date().toISOString(),
    inputParameters: params,
    primaryRecommendation: {
      ...bestCrop,
      cropDetails: CROPS_DATABASE[bestCrop.cropId] || CROPS_DATABASE.rice
    },
    alternativeCrops: alternatives,
    soilHealthAssessment: {
      overallScore: overallHealth,
      soilFertilityIndex: fertilityIndex,
      phCategory: phCategory,
      primaryDeficiencyOrExcess: deficiencies.length ? deficiencies : ['Nutrient levels (N-P-K) are balanced within productive thresholds'],
      suggestedAmendments: amendments.length ? amendments : ['Maintain regular organic compost additions to preserve soil biology']
    }
  };
}
