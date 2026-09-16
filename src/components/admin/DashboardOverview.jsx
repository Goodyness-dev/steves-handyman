import React, { useState, useEffect } from 'react';
import { quotesApi } from '../../services/api';

// Lightweight semantic inline SVGs
const Icons = {
  ArrowUpRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Play: ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  RotateCcw: ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  Phone: ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MapPin: ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Hammer: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 3.26-6.36 6.36" />
      <path d="m12.44 11.73 4.24 4.24" />
      <path d="m14.56 5.38 4.24 4.24" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
};

export default function DashboardOverview({ onNavigateTab, onSelectQuote, onOpenNewOrder }) {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Craftsman On-Site Job Timer (measures labor hours on-site)
  const [timerSeconds, setTimerSeconds] = useState(5048); // 01:24:08 initial demo time
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ limit: 10 }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Dashboard load note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const urgentOrder = quotes.find(q => q.status === 'pending') || quotes[0];

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------- */}
      {/* HEADER: Title & Quick Actions                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Live Dispatch Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white mt-1">
            Dispatch & Projects Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-medium mt-0.5">
            Manage residential work orders, quote requests, and client schedules in Denison, Sherman & Lake Texoma.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenNewOrder}
            className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm rounded-2xl transition shadow-md flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            <Icons.Plus className="w-4 h-4" />
            <span>+ New Work Order</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="py-2.5 px-4 bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-200 border border-slate-200 dark:border-neutral-800 font-bold text-xs sm:text-sm rounded-2xl transition shadow-xs active:scale-95 cursor-pointer"
          >
            All Work Orders
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 STAT CARDS                                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Obsidian Craftsman Hero Card */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-3xl p-6 shadow-xl border border-white/10 cursor-pointer transition hover:scale-[1.01] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Total Work Orders</span>
            <div className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition">
              <Icons.ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading tracking-tight">{stats.total}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full w-max font-medium">
            <span>↑ 18%</span>
            <span>seasonal increase</span>
          </div>
        </div>

        {/* Card 2: Completed Projects */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Completed Jobs</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-neutral-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition">
              <Icons.ArrowUpRight className="w-4 h-4 text-slate-700 dark:text-neutral-300" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-slate-900 dark:text-white">{stats.completed}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full w-max font-medium">
            <span>✓ 100%</span>
            <span>1-Year guarantee backed</span>
          </div>
        </div>

        {/* Card 3: Estimates Sent */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Estimates Delivered</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-neutral-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-neutral-800 transition">
              <Icons.ArrowUpRight className="w-4 h-4 text-slate-700 dark:text-neutral-300" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-slate-900 dark:text-white">{stats.quoted}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-full w-max font-medium">
            <span>📧 In discussion</span>
            <span>with homeowners</span>
          </div>
        </div>

        {/* Card 4: Pending Needs Review */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="bg-white dark:bg-[#0c0e14] border border-amber-200 dark:border-amber-900/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pending Review</span>
            <div className="w-8 h-8 rounded-full border border-amber-200 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center hover:opacity-80 transition">
              <Icons.ArrowUpRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="my-4">
            <div className="text-4xl font-black font-heading text-amber-600 dark:text-amber-400">{stats.pending}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-full w-max font-medium">
            <span>⏳ Action Required</span>
            <span>needs Steve's estimate</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECOND ROW: Weekly Trade Analytics + Priority Work Order      */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weekly Work Order Volume (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                Weekly Service Volume
              </h3>
              <span className="text-xs text-slate-400 dark:text-neutral-500">Grayson County Service Calls</span>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
              39 Jobs / Mo
            </span>
          </div>

          {/* Bar Chart Visual */}
          <div className="flex items-end justify-between gap-3 h-40 pt-4 px-2">
            {[
              { trade: 'Trim', height: '85%', count: 12, solid: true, label: 'Mon' },
              { trade: 'Drywall', height: '95%', count: 14, solid: true, highlight: 'High', label: 'Tue' },
              { trade: 'Plumb', height: '60%', count: 8, solid: true, label: 'Wed' },
              { trade: 'Elec', height: '75%', count: 10, solid: true, label: 'Thu' },
              { trade: 'Deck', height: '80%', count: 11, solid: true, label: 'Fri' },
              { trade: 'Doors', height: '40%', count: 5, solid: false, label: 'Sat' },
              { trade: 'Other', height: '25%', count: 3, solid: false, label: 'Sun' }
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {bar.highlight && (
                  <span className="absolute -top-7 text-[10px] font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-700 px-1.5 py-0.5 rounded-full shadow-xs">
                    {bar.highlight}
                  </span>
                )}
                <div 
                  className={`w-full max-w-[34px] rounded-full transition-all duration-300 ${
                    bar.solid 
                      ? 'bg-slate-900 dark:bg-white shadow-sm' 
                      : 'bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700'
                  }`}
                  style={{ height: bar.height }}
                />
                <span className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 mt-2">{bar.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-slate-100 dark:border-neutral-800 mt-2 text-xs">
            <span className="flex items-center space-x-2 text-slate-600 dark:text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white" />
              <span>Active Scheduled</span>
            </span>
            <span className="flex items-center space-x-2 text-slate-400 dark:text-neutral-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-neutral-800" />
              <span>Standby / Estimate</span>
            </span>
          </div>
        </div>

        {/* Middle: Priority Work Order Spotlight (3 Cols) */}
        <div className="lg:col-span-3 bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
              <span>Priority Job</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            </div>

            {urgentOrder ? (
              <div className="space-y-2">
                <h4 className="text-base font-black font-heading text-slate-900 dark:text-white leading-tight">
                  {urgentOrder.customer_name || urgentOrder.name || 'Homeowner Inquiry'}
                </h4>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                  <Icons.Hammer className="w-3.5 h-3.5" />
                  <span>{urgentOrder.detailed_service || urgentOrder.service_category || urgentOrder.detailedService || 'Handyman Service'}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-2 mt-1">
                  {urgentOrder.details || 'Customer requested custom repair consultation and price estimate.'}
                </p>
                <div className="text-[11px] text-slate-400 dark:text-neutral-500 flex items-center space-x-1 pt-1">
                  <Icons.MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{urgentOrder.location || 'Denison, TX'}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-6 text-center">
                All priority work orders are reviewed.
              </div>
            )}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between">
            <button
              onClick={() => urgentOrder && onSelectQuote(urgentOrder)}
              className="text-xs font-bold text-slate-900 dark:text-white hover:underline flex items-center space-x-1"
            >
              <span>Review Estimate</span>
              <Icons.ChevronRight className="w-3.5 h-3.5" />
            </button>
            {urgentOrder?.customer_phone && (
              <a
                href={`tel:${urgentOrder.customer_phone}`}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-slate-700 dark:text-neutral-300 hover:bg-slate-200"
                title="Call Homeowner"
              >
                <Icons.Phone className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Right: Field Labor Timer & Dispatch Status (4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              On-Site Labor Clock
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isTimerRunning 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                : 'bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-400'
            }`}>
              {isTimerRunning ? '● Recording On-Site' : 'Paused'}
            </span>
          </div>

          <div className="my-2 text-center py-2">
            <div className="font-mono text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {formatTimer(timerSeconds)}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-1">
              Active Job: Drywall Finish & Trim Joinery
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 pt-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition active:scale-95 cursor-pointer"
            >
              {isTimerRunning ? <Icons.Pause className="w-3 h-3" /> : <Icons.Play className="w-3 h-3" />}
              <span>{isTimerRunning ? 'Pause Clock' : 'Resume Clock'}</span>
            </button>
            <button
              onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); }}
              className="p-2 rounded-xl border border-slate-200 dark:border-neutral-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-neutral-800 transition"
              title="Reset Timer"
            >
              <Icons.RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>Primary Dispatch:</span>
            <span className="font-bold text-slate-800 dark:text-neutral-200">Steve Miller (Master Tech)</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* THIRD ROW: Recent Quotes & Inquiries Table                    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-black text-base text-slate-900 dark:text-white">
              Recent Work Orders & Estimates
            </h3>
            <p className="text-xs text-slate-400 dark:text-neutral-500">
              Incoming customer inquiries from the website and phone dispatch.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-slate-900 dark:text-white hover:underline flex items-center space-x-1"
          >
            <span>View All</span>
            <Icons.ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-neutral-300">
            <thead className="bg-slate-50 dark:bg-neutral-900/60 text-slate-400 dark:text-neutral-500 uppercase tracking-wider font-bold text-[10px] border-b border-slate-100 dark:border-neutral-800">
              <tr>
                <th className="py-3 px-3">Order #</th>
                <th className="py-3 px-3">Homeowner</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Project Scope</th>
                <th className="py-3 px-3">Timeline</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
              {quotes.slice(0, 5).map((q) => {
                const status = q.status || 'pending';
                return (
                  <tr 
                    key={q.id} 
                    onClick={() => onSelectQuote(q)}
                    className="hover:bg-slate-50/80 dark:hover:bg-neutral-900/50 cursor-pointer transition"
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      #{q.id}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                      {q.customer_name || q.name || 'Client'}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 dark:text-neutral-400">
                      {q.location || 'Denison, TX'}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-slate-800 dark:text-neutral-200">
                        {q.detailed_service || q.detailedService || q.service_category || 'Handyman Repair'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 dark:text-neutral-400">
                      {q.urgency || q.timeline || 'Flexible'}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        status === 'completed' 
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : status === 'quoted'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}>
                        {status === 'completed' ? 'Completed' : status === 'quoted' ? 'Estimate Sent' : 'Needs Review'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectQuote(q); }}
                        className="py-1 px-2.5 rounded-lg border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 text-[11px] font-bold"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
