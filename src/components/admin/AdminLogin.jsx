import React, { useState } from 'react';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [password, setPassword] = useState('steve2025');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your admin access key.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.login(password);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Login failed. Try steve2025 or admin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black dark:bg-onyx-950 text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans blueprint-grid">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Return Link */}
      <div className="w-full max-w-md mb-6 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-2 text-xs font-bold text-neutral-400 hover:text-white transition px-4 py-2 rounded-full bg-white/5 border border-neutral-800 hover:border-neutral-600 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Customer Website</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md card-thick rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-neutral-900 to-onyx-900 border-2 border-neutral-800 shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/25 flex items-center justify-center font-heading font-black text-sm text-white shadow-lg">
              S
            </div>
            <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/25 flex items-center justify-center font-heading font-black text-sm text-white shadow-lg">
              H
            </div>
          </div>
          
          <h1 className="text-2xl font-black font-heading tracking-tight text-white">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest font-semibold">
            Estimates Dispatch & Client Portal
          </p>

          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full mt-3 text-xs text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Protected Management Portal</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2.5">
            <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Admin Password / Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. steve2025)"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-white rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-neutral-500 transition outline-none"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-white transition cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <div className="text-[11px] text-neutral-500 mt-2 flex items-center justify-between">
              <span>Demo Password: <strong className="text-neutral-300">steve2025</strong></span>
              <span>Encrypted Session</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-white text-black font-heading font-black text-xs uppercase tracking-wider hover:bg-neutral-200 transition shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? 'VERIFYING ACCESS...' : 'ENTER ADMIN PORTAL ↗'}
          </button>
        </form>

      </div>
    </div>
  );
}
