import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi, quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

// Inline Icons (No external lucide-react dependencies)
const Icons = {
  Dashboard: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  Clipboard: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  ),
  MessageSquare: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Settings: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  ExternalLink: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  LogOut: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Search: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Bell: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Menu: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Phone: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
};

export default function AdminLayout({ user, darkMode, onToggleDarkMode, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'inbox' | 'settings'
  const [modalQuote, setModalQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });

  useEffect(() => {
    quotesApi.getStats().then(setStats).catch(() => {});
  }, [activeTab]);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'orders', label: 'Work Orders & Estimates', icon: Icons.Clipboard, badge: stats.total > 0 ? stats.total : null },
    { id: 'inbox', label: 'Customer Inbox', icon: Icons.MessageSquare, badge: stats.pending > 0 ? stats.pending : null },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#07090d] text-slate-900 dark:text-slate-100 font-sans flex antialiased selection:bg-slate-900 selection:text-white">
      {/* Backdrop for mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* LEFT CRAFTSMAN SIDEBAR                                        */}
      {/* ------------------------------------------------------------- */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0c0e14] border-r border-slate-200 dark:border-neutral-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 space-y-7 flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5 min-w-0">
              {/* Steve's Handyman Custom Squircle Mark */}
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-[#111318] dark:bg-[#181b22] border border-white/10 flex items-center justify-center shadow-md relative group">
                <span className="font-heading font-black text-white text-base tracking-wider">S</span>
                <span className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#111318]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-heading font-black text-sm tracking-tight text-slate-900 dark:text-white block leading-tight truncate" title={BUSINESS_INFO.name}>
                  {BUSINESS_INFO.name}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block mt-0.5">
                  Master Craftsman Portal
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Location Badge */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200/80 dark:border-neutral-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-neutral-400 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              <span className="font-medium truncate">{BUSINESS_INFO.address.formatted}</span>
            </div>
          </div>

          {/* MAIN MENU */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest px-3 block">
              Dispatch & Management
            </span>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md shadow-slate-900/10'
                        : 'text-slate-600 dark:text-neutral-300 hover:bg-slate-100/90 dark:hover:bg-neutral-900 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-slate-950' : 'text-slate-400 dark:text-neutral-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 dark:bg-black/20 text-white dark:text-slate-950'
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* GENERAL & SETTINGS */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest px-3 block">
              System & Preferences
            </span>
            <nav className="space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md shadow-slate-900/10'
                    : 'text-slate-600 dark:text-neutral-300 hover:bg-slate-100/90 dark:hover:bg-neutral-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icons.Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white dark:text-slate-950' : 'text-slate-400 dark:text-neutral-500'}`} />
                <span>Shop Settings & Alerts</span>
              </button>

              <button
                onClick={onBackToSite}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 dark:text-neutral-300 hover:bg-slate-100/90 dark:hover:bg-neutral-900 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Icons.ExternalLink className="w-4 h-4 text-slate-400" />
                  <span>View Public Website</span>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
              >
                <Icons.LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Craftsman Card */}
        <div className="p-4 m-4 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white space-y-2.5 shadow-xl border border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
              ★
            </div>
            <h5 className="font-heading font-black text-xs">1-Year Guarantee</h5>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            All trim carpentry, drywall, fixtures, and rot repair backed by Steve Miller's unconditional warranty.
          </p>
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="w-full py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center space-x-2 active:scale-95"
          >
            <Icons.Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Call Shop: {BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN TOP BAR & ACTIVE CANVAS                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-20 bg-white/80 dark:bg-[#0c0e14]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-neutral-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          {/* Left: Mobile hamburger & Search */}
          <div className="flex items-center space-x-3 flex-1 max-w-md">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-900"
            >
              <Icons.Menu className="w-5 h-5" />
            </button>

            <div className="relative flex-1">
              <Icons.Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search homeowner, project type, or Grayson Co address..."
                className="w-full bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 focus:border-slate-900 dark:focus:border-white focus:bg-white dark:focus:bg-neutral-900 rounded-2xl pl-10 pr-12 py-2 text-xs text-slate-800 dark:text-neutral-200 placeholder-slate-400 dark:placeholder-neutral-500 outline-none transition"
              />
              <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 dark:text-neutral-500 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 px-1.5 py-0.5 rounded shadow-2xs">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right: Quick CTAs & Profile */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Quick Inbox Shortcut */}
            <button
              onClick={() => setActiveTab('inbox')}
              className="w-10 h-10 rounded-2xl border border-slate-200/80 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-900 flex items-center justify-center text-slate-600 dark:text-neutral-300 relative transition cursor-pointer"
              title="Customer Inbox"
            >
              <Icons.Mail className="w-4 h-4" />
              {stats.pending > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {stats.pending}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="w-10 h-10 rounded-2xl border border-slate-200/80 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800 flex items-center justify-center text-slate-600 dark:text-neutral-300 transition cursor-pointer"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? (
                  <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            {/* Quick Work Order Trigger */}
            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 py-2 px-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-sm hover:opacity-90 transition active:scale-95 cursor-pointer"
            >
              <span>+ Record Work Order</span>
            </button>

            {/* Admin Profile Card */}
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-neutral-800 border border-white/10 text-white font-black text-xs flex items-center justify-center shadow-sm">
                SM
              </div>
              <div className="hidden sm:block text-left">
                <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                  {BUSINESS_INFO.owner.name}
                </h4>
                <span className="text-[11px] text-slate-400 dark:text-neutral-400 block leading-tight">
                  Denison, TX
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY CANVAS */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectQuote={(q) => setModalQuote(q)}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'orders' && <OrdersView onSelectQuote={(q) => setModalQuote(q)} />}

          {activeTab === 'inbox' && (
            <InboxView onOpenFullQuote={(q) => setModalQuote(q)} />
          )}

          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

      {/* Quote Detail Modal */}
      {modalQuote && (
        <QuoteDetailModal
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdate={(updated) => setModalQuote(updated)}
        />
      )}

      {/* New Manual Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={() => {
          quotesApi.getStats().then(setStats).catch(() => {});
        }}
      />
    </div>
  );
}
