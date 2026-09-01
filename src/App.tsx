import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { ParameterForm } from './components/ParameterForm';
import { PredictionResult } from './components/PredictionResult';
import { HistoryDrawer } from './components/HistoryDrawer';
import { classifyCrop } from './ml/cropClassifier';
import { 
  SoilParameters, 
  PredictionResultData, 
  User 
} from './types';

const DEFAULT_SOIL_PARAMS: SoilParameters = {
  nitrogen: 90,
  phosphorus: 42,
  potassium: 43,
  temperature: 24,
  humidity: 82,
  ph: 6.5,
  rainfall: 202,
  soilMoisture: 75,
  soilType: 'alluvial',
  fieldName: 'Main Agri Plot #1',
  location: 'Central Valley'
};

export default function App() {
  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);

  // Application View State
  const [view, setView] = useState<'form' | 'result'>('form');
  const [currentParams, setCurrentParams] = useState<SoilParameters>(DEFAULT_SOIL_PARAMS);
  const [predictionResult, setPredictionResult] = useState<PredictionResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<PredictionResultData[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // History Drawer state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Toast alert
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Restore session from localStorage if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('smartcrop_user');
      const savedToken = localStorage.getItem('smartcrop_token');
      if (savedUser && savedToken) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setToken(savedToken);
        setIsAuthModalOpen(false);
        fetchHistory(parsed.id);
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  }, []);

  const fetchHistory = async (userId: string) => {
    try {
      const res = await fetch(`/api/history?userId=${encodeURIComponent(userId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.history) {
          setHistory(data.history);
        }
      }
    } catch (e) {
      // Fallback
    }
  };

  const handleAuthSuccess = (authenticatedUser: User, sessionToken: string) => {
    setUser(authenticatedUser);
    setToken(sessionToken);
    setIsAuthModalOpen(false);
    try {
      localStorage.setItem('smartcrop_user', JSON.stringify(authenticatedUser));
      localStorage.setItem('smartcrop_token', sessionToken);
    } catch (e) {}
    showToast(`Welcome back, ${authenticatedUser.name}!`);
    fetchHistory(authenticatedUser.id);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsAuthModalOpen(true);
    setView('form');
    setPredictionResult(null);
    try {
      localStorage.removeItem('smartcrop_user');
      localStorage.removeItem('smartcrop_token');
    } catch (e) {}
    showToast('Signed out successfully.');
  };

  const handleRunPrediction = async (params: SoilParameters) => {
    setIsLoading(true);
    setCurrentParams(params);

    try {
      // Attempt full-stack server API call with Gemini integration
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.prediction) {
          setPredictionResult(data.prediction);
          setView('result');
          setIsSaved(false);
          // Auto-save to user history
          saveAnalysisToHistory(data.prediction, false);
          return;
        }
      }
      throw new Error('Server prediction fallback');
    } catch (err) {
      // Robust client-side fallback using ported Scikit-learn Random Forest classifier
      console.log('Running client-side ML engine fallback');
      const fallbackResult = classifyCrop(params);
      setPredictionResult(fallbackResult);
      setView('result');
      setIsSaved(false);
      saveAnalysisToHistory(fallbackResult, false);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnalysisToHistory = async (pred: PredictionResultData, notify = true) => {
    const updated = [pred, ...history.filter(h => h.id !== pred.id)].slice(0, 25);
    setHistory(updated);
    setIsSaved(true);

    if (user) {
      try {
        await fetch('/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            prediction: pred
          })
        });
      } catch (e) {}
    }

    if (notify) {
      showToast('Analysis saved to your farm field records!');
    }
  };

  const handleDeleteHistoryRecord = async (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
    if (user) {
      try {
        await fetch(`/api/history/${id}?userId=${encodeURIComponent(user.id)}`, {
          method: 'DELETE'
        });
      } catch (e) {}
    }
    showToast('Record removed from history.');
  };

  const handleClearAllHistory = async () => {
    setHistory([]);
    if (user) {
      try {
        await fetch(`/api/history?userId=${encodeURIComponent(user.id)}`, {
          method: 'DELETE'
        });
      } catch (e) {}
    }
    showToast('All history records cleared.');
  };

  const handleSelectHistoryRecord = (record: PredictionResultData) => {
    setPredictionResult(record);
    setCurrentParams(record.inputParameters);
    setView('result');
    setIsSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navigation Header */}
      <Navbar
        user={user}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onLogout={handleLogout}
        onNewAnalysis={() => {
          setView('form');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-slideUp">
            <span>{toastMsg}</span>
          </div>
        )}

        {/* View 1: Parameter Input Form */}
        {view === 'form' && (
          <ParameterForm
            initialValues={currentParams}
            onSubmit={handleRunPrediction}
            isLoading={isLoading}
          />
        )}

        {/* View 2: Clean Output Recommendation Page */}
        {view === 'result' && predictionResult && (
          <PredictionResult
            result={predictionResult}
            onNewAnalysis={() => setView('form')}
            onSaveToHistory={(res) => saveAnalysisToHistory(res, true)}
            isSaved={isSaved}
          />
        )}

      </main>

      {/* Auth Modal (Opens on start or when logged out) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onSuccess={handleAuthSuccess}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectRecord={handleSelectHistoryRecord}
        onDeleteRecord={handleDeleteHistoryRecord}
        onClearAllHistory={handleClearAllHistory}
      />

    </div>
  );
}
