import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { classifyCrop } from './src/ml/cropClassifier';
import { CROPS_DATABASE, PRESET_SCENARIOS } from './src/data/cropKnowledgeBase';
import { SoilParameters, User, PredictionResultData } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory persistent datastore for users and prediction history
interface StoredUser extends User {
  passwordHash: string;
}

const users: Map<string, StoredUser> = new Map();
const userHistories: Map<string, PredictionResultData[]> = new Map();

// Seed initial demo farmer account
const demoUser: StoredUser = {
  id: 'usr_demo_smartcrop',
  name: 'Rajesh Sharma',
  email: 'farmer@smartcrop.ai',
  passwordHash: 'demo123',
  farmName: 'GreenValley Agro Farms',
  location: 'Deccan Agri Zone',
  preferredUnits: 'metric',
  createdAt: new Date().toISOString(),
};
users.set(demoUser.email.toLowerCase(), demoUser);

// Seed demo user initial history
const initialParams: SoilParameters = {
  nitrogen: 85,
  phosphorus: 50,
  potassium: 45,
  temperature: 26,
  humidity: 84,
  ph: 6.5,
  rainfall: 220,
  soilMoisture: 80,
  soilType: 'alluvial',
  fieldName: 'East River Plot #3',
  location: 'Eastern River Delta'
};
const seedPred = classifyCrop(initialParams);
userHistories.set(demoUser.id, [seedPred]);

// Gemini AI client initialization
let genAI: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    try {
      genAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.warn('Failed to initialize GoogleGenAI client:', err);
    }
  }
  return genAI;
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Smart Crop Analyzer Engine',
    geminiEnabled: !!process.env.GEMINI_API_KEY
  });
});

// 2. Auth: Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, farmName, location } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (users.has(normalizedEmail)) {
    return res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
  }

  const newUser: StoredUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: password, // In production app this is hashed; for prototype local store plain
    farmName: farmName?.trim() || 'My Agro Field',
    location: location?.trim() || 'Regional Agro Zone',
    preferredUnits: 'metric',
    createdAt: new Date().toISOString()
  };

  users.set(normalizedEmail, newUser);
  userHistories.set(newUser.id, []);

  const token = `token_${newUser.id}_${Date.now()}`;
  const { passwordHash, ...userSafe } = newUser;

  return res.status(201).json({
    success: true,
    user: userSafe,
    token,
    message: 'Account created successfully! Welcome to Smart Crop Analyzer.'
  });
});

// 3. Auth: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = users.get(normalizedEmail);

  if (!existing || existing.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid email or password. Please check your credentials.' });
  }

  const token = `token_${existing.id}_${Date.now()}`;
  const { passwordHash, ...userSafe } = existing;

  return res.json({
    success: true,
    user: userSafe,
    token,
    message: 'Welcome back!'
  });
});

// 4. Auth: Demo 1-Click Login
app.post('/api/auth/demo', (req, res) => {
  const token = `token_${demoUser.id}_${Date.now()}`;
  const { passwordHash, ...userSafe } = demoUser;
  return res.json({
    success: true,
    user: userSafe,
    token,
    message: 'Logged in as Demo Farmer (Rajesh Sharma)'
  });
});

// 5. Presets
app.get('/api/presets', (req, res) => {
  res.json({ presets: PRESET_SCENARIOS });
});

// 6. Crop Knowledgebase catalog
app.get('/api/crops', (req, res) => {
  res.json({ crops: Object.values(CROPS_DATABASE) });
});

// 7. ML Prediction Endpoint
app.post('/api/predict', async (req, res) => {
  try {
    const params: SoilParameters = req.body;

    // Validate parameters
    if (
      params.ph === undefined ||
      params.nitrogen === undefined ||
      params.phosphorus === undefined ||
      params.potassium === undefined ||
      params.temperature === undefined ||
      params.humidity === undefined ||
      params.rainfall === undefined ||
      params.soilMoisture === undefined
    ) {
      return res.status(400).json({ error: 'Missing required soil or environmental parameters.' });
    }

    // Run Scikit-learn style ML classification engine
    const predictionResult = classifyCrop(params);

    // If Gemini client is available, generate an enhanced agronomist advisory asynchronously
    const ai = getGeminiClient();
    if (ai) {
      try {
        const topCrop = predictionResult.primaryRecommendation;
        const prompt = `You are a world-class senior agronomist and soil scientist.
Analyze the following land soil and environmental parameters:
- Crop Recommended: ${topCrop.cropName} (${topCrop.scientificName})
- Soil pH: ${params.ph} (Status: ${predictionResult.soilHealthAssessment.phCategory})
- Nitrogen (N): ${params.nitrogen} kg/ha (Optimal for ${topCrop.cropName}: ${topCrop.cropDetails.growthRequirements.optimalN[0]}-${topCrop.cropDetails.growthRequirements.optimalN[1]} kg/ha)
- Phosphorus (P): ${params.phosphorus} kg/ha (Optimal: ${topCrop.cropDetails.growthRequirements.optimalP[0]}-${topCrop.cropDetails.growthRequirements.optimalP[1]} kg/ha)
- Potassium (K): ${params.potassium} kg/ha (Optimal: ${topCrop.cropDetails.growthRequirements.optimalK[0]}-${topCrop.cropDetails.growthRequirements.optimalK[1]} kg/ha)
- Soil Moisture: ${params.soilMoisture}%
- Soil Type: ${params.soilType}
- Temperature: ${params.temperature}°C
- Humidity: ${params.humidity}%
- Rainfall: ${params.rainfall} mm
- Field Name / Location: ${params.fieldName || 'Cultivation Plot'} in ${params.location || 'Local Agri Zone'}

Provide a highly practical agronomic advisory in JSON format with exactly these keys:
{
  "summary": "1-2 sentences summarizing why ${topCrop.cropName} will flourish in this field condition and expected outcome",
  "climateAdjustmentTips": ["tip 1 on managing temperature/humidity", "tip 2 on sun/rain management"],
  "customFertilizerFormula": "Specific fertilizer recommendation (e.g. basal DAP + Urea split doses + MOP) tailored to current NPK (${params.nitrogen}-${params.phosphorus}-${params.potassium})",
  "irrigationStrategy": "Precise watering schedule and water-saving advice tailored to ${params.soilMoisture}% moisture and ${params.rainfall}mm rainfall",
  "pestForecast": "Key pest or disease risk to monitor given current humidity (${params.humidity}%) and temperature (${params.temperature}°C) with preventative action",
  "marketOutlook": "Commercial viability, seasonal price trend, and post-harvest storage tip",
  "organicAlternativePractices": ["organic bio-fertilizer or neem compost practice", "companion planting or mulching tip"]
}`;

        const aiResponse = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        if (aiResponse.text) {
          const parsedAdvisory = JSON.parse(aiResponse.text);
          predictionResult.aiAdvisory = parsedAdvisory;
        }
      } catch (aiErr) {
        console.warn('Gemini Advisory generation note (using fallback):', aiErr);
      }
    }

    // Default fallback AI advisory if Gemini wasn't called or had network delay
    if (!predictionResult.aiAdvisory) {
      const topCrop = predictionResult.primaryRecommendation;
      predictionResult.aiAdvisory = {
        summary: `${topCrop.cropName} is an exceptional match for this field profile, displaying ${topCrop.confidence}% affinity with your soil's pH (${params.ph}) and climate index.`,
        climateAdjustmentTips: [
          `Maintain adequate air drainage during peak heat (${params.temperature}°C).`,
          `High ambient humidity (${params.humidity}%) requires wider row spacing to reduce fungal stagnation.`
        ],
        customFertilizerFormula: `Apply balanced NPK with special attention to basal phosphorus (${params.phosphorus} kg/ha available). Top-dress nitrogen in 2-3 split applications.`,
        irrigationStrategy: `Maintain soil moisture around ${topCrop.cropDetails.growthRequirements.optimalMoisture[0]}-${topCrop.cropDetails.growthRequirements.optimalMoisture[1]}% through micro-drip or furrow irrigation.`,
        pestForecast: `Monitor for common sap-suckers and leaf spot during humid cycles; apply preventative neem oil spray (1500 ppm).`,
        marketOutlook: `High regional market demand with excellent post-harvest storage stability and lucrative returns.`,
        organicAlternativePractices: [
          'Incorporate well-decomposed vermicompost (2 tonnes/ha) prior to seedbed preparation.',
          'Adopt legume intercropping to biologically replenish residual soil nitrogen.'
        ]
      };
    }

    return res.json({
      success: true,
      prediction: predictionResult
    });
  } catch (error) {
    console.error('Prediction Error:', error);
    return res.status(500).json({ error: 'Failed to process crop analysis. Please try again.' });
  }
});

// 8. User History Endpoints
app.get('/api/history', (req, res) => {
  const userId = (req.query.userId as string) || demoUser.id;
  const history = userHistories.get(userId) || [];
  res.json({ history });
});

app.post('/api/history', (req, res) => {
  const { userId, prediction } = req.body;
  const targetUser = userId || demoUser.id;
  const existing = userHistories.get(targetUser) || [];
  
  // Prepend new prediction
  const updated = [prediction, ...existing.filter(p => p.id !== prediction.id)].slice(0, 20);
  userHistories.set(targetUser, updated);
  
  res.json({ success: true, history: updated });
});

app.delete('/api/history/:id', (req, res) => {
  const { id } = req.params;
  const userId = (req.query.userId as string) || demoUser.id;
  const existing = userHistories.get(userId) || [];
  const filtered = existing.filter(item => item.id !== id);
  userHistories.set(userId, filtered);
  res.json({ success: true, history: filtered });
});

// ----------------------------------------------------
// Vite Dev Middleware & Production Static Serving
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 Smart Crop Analyzer Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
