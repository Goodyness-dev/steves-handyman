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
    <div className="min-h-screen bg-[#f4f6f8] dark:bg-[#07090d] text-slate-900 dark:text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans blueprint-grid transition-colors">
      {/* Return Link */}
      <div className="w-full max-w-md mb-6 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition px-4 py-2 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Return to Steve's Handyman Site</span>
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md card-thick rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#0d1017] border border-slate-200/90 dark:border-neutral-800 shadow-xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 dark:border-neutral-700 p-1.5 mb-4 shadow-md">
            <img src="/logo.png" alt="Steve's Handyman Services" className="w-full h-full object-contain" />
          </div>
          
          <h1 className="text-2xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 uppercase tracking-widest font-semibold">
            Estimates & Dispatch Portal
          </p>

          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 px-3 py-1 rounded-full mt-3 text-xs text-slate-700 dark:text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Denison & Texoma Master Dispatch</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-200 text-xs flex items-center gap-2.5">
            <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-400 uppercase tracking-wider mb-2">
              Admin Access Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-neutral-500">
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
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 focus:border-slate-900 dark:focus:border-white rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 transition outline-none"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-1.5 flex items-center justify-between">
              <span>Demo access key:</span>
              <button
                type="button"
                onClick={() => setPassword('steve2025')}
                className="font-mono text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                steve2025
              </button>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <span>Unlock Management Portal →</span>
            )}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-xs text-slate-400 dark:text-neutral-600">
        Steve's Handyman LLC • Denison, TX • Master Craftsman Portal
      </div>
    </div>
  );
}
