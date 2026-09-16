import React, { useState, useEffect } from 'react';
import { quotesApi } from '../../services/api';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';

// Semantic inline SVGs
const Icons = {
  Search: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  RefreshCw: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  CheckCircle2: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Send: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
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
  Loader2: ({ className = "w-6 h-6 animate-spin" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  )
};

export default function OrdersView({ onSelectQuote }) {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 12000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ status: statusFilter, search: searchTerm }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Quotes fetch fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleQuoteUpdated = (updatedQuote) => {
    if (updatedQuote._deleted) {
      setQuotes(prev => prev.filter(q => q.id !== updatedQuote.id));
    } else {
      setQuotes(prev => prev.map(q => q.id === updatedQuote.id ? updatedQuote : q));
    }
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const handleNewOrderCreated = (newQuote) => {
    setQuotes(prev => [newQuote, ...prev]);
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const filteredQuotes = quotes.filter(q => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const name = (q.customer_name || q.name || '').toLowerCase();
    const email = (q.customer_email || q.email || '').toLowerCase();
    const phone = (q.customer_phone || q.phone || '').toLowerCase();
    const location = (q.location || '').toLowerCase();
    const category = (q.service_category || q.serviceCategory || '').toLowerCase();
    const task = (q.detailed_service || q.detailedService || '').toLowerCase();
    const id = (q.id || '').toLowerCase();

    return (
      name.includes(term) ||
      email.includes(term) ||
      phone.includes(term) ||
      location.includes(term) ||
      category.includes(term) ||
      task.includes(term) ||
      id.includes(term)
    );
  });

  const openQuoteModal = (quote) => {
    if (onSelectQuote) {
      onSelectQuote(quote);
    } else {
      setSelectedQuote(quote);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Quotes */}
        <div className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Work Orders</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-slate-700 dark:text-neutral-300">
              <Icons.Hammer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">{stats.total}</div>
          <span className="text-[11px] text-slate-400 dark:text-neutral-500 mt-1 block">All project inquiries</span>
        </div>

        {/* Pending Awaiting Quote */}
        <div className="bg-white dark:bg-[#0c0e14] border border-amber-200 dark:border-amber-900/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Awaiting Estimate</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Icons.Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-amber-600 dark:text-amber-400">{stats.pending}</div>
          <span className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-1 block font-medium">Needs pricing & scope review</span>
        </div>

        {/* Quoted */}
        <div className="bg-white dark:bg-[#0c0e14] border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-blue-700 dark:text-blue-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Estimates Delivered</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Icons.Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-blue-600 dark:text-blue-400">{stats.quoted}</div>
          <span className="text-[11px] text-blue-700/80 dark:text-blue-400/80 mt-1 block font-medium">Sent to homeowner for approval</span>
        </div>

        {/* Completed */}
        <div className="bg-white dark:bg-[#0c0e14] border border-emerald-200 dark:border-emerald-900/60 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Projects</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Icons.CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-600 dark:text-emerald-400">{stats.completed}</div>
          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-1 block font-medium">1-Year warranty active</span>
        </div>
      </div>

      {/* Control Bar: Search, Filter Tabs, Action CTAs */}
      <div className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Icons.Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search homeowner, phone, project category, address, or #ID..."
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 focus:border-slate-900 dark:focus:border-white focus:bg-white dark:focus:bg-neutral-900 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 outline-none transition"
            />
          </form>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setIsLoading(true); loadData(); }}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-300 transition"
              title="Refresh Quotes"
            >
              <Icons.RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-500' : ''}`} />
            </button>

            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center space-x-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              <Icons.Plus className="w-4 h-4" />
              <span>+ Record Call / Walk-In</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {[
            { id: 'all', label: 'All Orders', count: stats.total },
            { id: 'pending', label: '⏳ Needs Estimate', count: stats.pending },
            { id: 'quoted', label: '📧 Estimate Sent', count: stats.quoted },
            { id: 'completed', label: '✅ Completed', count: stats.completed },
            { id: 'archived', label: '📦 Archived' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1.5 cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200/80 dark:hover:bg-neutral-700 text-slate-600 dark:text-neutral-300 border border-slate-200/60 dark:border-neutral-700'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  statusFilter === tab.id ? 'bg-white/20 dark:bg-black/20 text-white dark:text-slate-950' : 'bg-slate-200 dark:bg-neutral-700 text-slate-700 dark:text-neutral-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-2xl text-slate-400 space-y-3">
          <Icons.Loader2 className="w-8 h-8 text-emerald-500" />
          <span className="text-sm font-medium">Retrieving project inquiries from database...</span>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-2xl text-slate-500 dark:text-neutral-400 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-slate-400 mx-auto">
            <Icons.Hammer className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Work Orders Found</h3>
          <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm mx-auto">
            {searchTerm ? 'No results matched your search query.' : 'When homeowners submit quote requests on the website, they will appear here in real-time.'}
          </p>
          <button
            onClick={() => setIsNewOrderOpen(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-900 dark:text-white hover:underline pt-2"
          >
            <Icons.Plus className="w-3.5 h-3.5" />
            <span>Create a manual work order</span>
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-neutral-300">
              <thead className="bg-slate-50 dark:bg-neutral-900/60 text-slate-400 dark:text-neutral-500 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-neutral-800 text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Order ID / Date</th>
                  <th className="py-3.5 px-4">Homeowner</th>
                  <th className="py-3.5 px-4">Property / Location</th>
                  <th className="py-3.5 px-4">Project & Trade</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Estimate ($)</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                {filteredQuotes.map((q) => {
                  const status = q.status || 'pending';
                  return (
                    <tr 
                      key={q.id}
                      onClick={() => openQuoteModal(q)}
                      className="hover:bg-slate-50/80 dark:hover:bg-neutral-900/50 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">#{q.id}</span>
                        <span className="text-[11px] text-slate-400 dark:text-neutral-500">
                          {new Date(q.created_at || q.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {q.customer_name || q.name || 'Client'}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-neutral-500 flex items-center space-x-1 mt-0.5">
                          <span>{q.customer_phone || q.phone || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-1.5 text-slate-600 dark:text-neutral-300">
                          <Icons.MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[170px]">{q.location || 'Denison, TX'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800 dark:text-neutral-200">
                          {q.detailed_service || q.detailedService || q.service_category || 'Handyman Service'}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-neutral-500 line-clamp-1 max-w-[220px]">
                          {q.details || 'Scope requested'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : status === 'quoted'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        }`}>
                          {status === 'completed' ? 'Completed' : status === 'quoted' ? 'Estimate Sent' : 'Needs Estimate'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {q.quotedPrice || q.quoted_price ? `$${q.quotedPrice || q.quoted_price}` : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); openQuoteModal(q); }}
                          className="py-1 px-3 rounded-lg border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-bold text-xs"
                        >
                          Estimate Studio
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-neutral-800">
            {filteredQuotes.map((q) => (
              <div 
                key={q.id}
                onClick={() => openQuoteModal(q)}
                className="p-4 space-y-2 hover:bg-slate-50 dark:hover:bg-neutral-900 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">#{q.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    q.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : q.status === 'quoted'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}>
                    {q.status === 'completed' ? 'Completed' : q.status === 'quoted' ? 'Estimate Sent' : 'Needs Estimate'}
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  {q.customer_name || q.name}
                </div>
                <div className="text-xs text-slate-600 dark:text-neutral-300">
                  {q.detailed_service || q.service_category || 'Handyman Service'}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-neutral-500">
                  {q.location || 'Denison, TX'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onUpdate={handleQuoteUpdated}
        />
      )}

      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={handleNewOrderCreated}
      />
    </div>
  );
}
