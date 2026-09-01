import React, { useState } from 'react';
import { 
  Sprout, 
  Lock, 
  Mail, 
  User, 
  MapPin, 
  TreePine, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onSuccess: (user: UserType, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFarmName, setSignupFarmName] = useState('');
  const [signupLocation, setSignupLocation] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please verify credentials.');
      }

      onSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          farmName: signupFarmName,
          location: signupLocation
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      onSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to register account.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/demo', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.user, data.token);
      }
    } catch (err) {
      setErrorMsg('Failed to launch demo mode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      <div 
        id="auth-container"
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-emerald-950/40 overflow-hidden grid grid-cols-1 md:grid-cols-12"
      >
        
        {/* Left Feature Showcase (Agritech Theme) */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
              <Sprout className="w-4 h-4 text-emerald-400" />
              Machine Learning Agriculture
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
              Smart Crop <span className="text-emerald-400">Analyzer</span>
            </h2>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <button
              id="btn-demo-quick-login"
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Explore Instant Demo Mode</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Right Form Area (Login / Signup) */}
        <div className="md:col-span-7 p-6 sm:p-8 bg-slate-900 flex flex-col justify-center">
          
          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-slate-800/80 p-1 border border-slate-700/60 mb-6">
            <button
              id="tab-btn-login"
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In (Existing Farmer)
            </button>
            <button
              id="tab-btn-signup"
              type="button"
              onClick={() => { setActiveTab('signup'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'signup'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create New Account (Sign Up)
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-center gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4" id="form-login">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="farmer@smartcrop.ai or your email"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-login-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <button
                id="btn-submit-login"
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] shadow-md shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <span>Sign In & Open Smart Crop Analyzer</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-3" id="form-signup">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name / Farmer Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-signup-name"
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. John Doe / Maria Garcia"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-signup-email"
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="farmer@domain.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-signup-password"
                      type="password"
                      required
                      minLength={5}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Min 5 characters"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Agro Location / State
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-signup-location"
                    type="text"
                    value={signupLocation}
                    onChange={(e) => setSignupLocation(e.target.value)}
                    placeholder="e.g. Punjab, California, Deccan"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                id="btn-submit-signup"
                type="submit"
                disabled={loading}
                className="w-full mt-3 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] shadow-md shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Profile...
                  </span>
                ) : (
                  <>
                    <span>Create Account & Start Soil Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
