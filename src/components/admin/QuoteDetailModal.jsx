import React, { useState } from 'react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

// Semantic inline SVGs
const Icons = {
  X: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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
  Send: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  ShieldCheck: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
};

export default function QuoteDetailModal({ quote, onClose, onUpdate }) {
  const [status, setStatus] = useState(quote?.status || 'pending');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Estimate Composer State
  const [price, setPrice] = useState(quote?.quotedPrice || quote?.quoted_price || '');
  const [turnaround, setTurnaround] = useState(quote?.estimatedTurnaround || 'Prompt scheduling (1-3 days on-site)');
  const [warranty, setWarranty] = useState(quote?.warrantyNote || '1-Year Unconditional Craftsmanship Guarantee');
  
  const customerName = quote?.customer_name || quote?.name || 'Homeowner';
  const serviceTitle = quote?.detailed_service || quote?.detailedService || quote?.service_category || 'home repair project';

  const [message, setMessage] = useState(
    quote?.adminMessage || 
    `Hi ${customerName}, thanks for contacting Steve's Handyman LLC in Denison! I've reviewed your project request for "${serviceTitle}". Here is our official estimate. All labor and materials are backed by our unconditional 1-year craftsmanship guarantee. Please give us a call at ${BUSINESS_INFO.phone} or reply here to confirm your appointment.`
  );
  
  const [isSendingQuote, setIsSendingQuote] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!quote) return null;

  const handleStatusChange = async (newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const updated = await quotesApi.updateStatus(quote.id, newStatus);
      setStatus(newStatus);
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendQuote = async (e) => {
    e.preventDefault();
    if (!price.toString().trim()) {
      setSendError('Please enter an estimate price before sending.');
      return;
    }

    setIsSendingQuote(true);
    setSendError('');
    setSendSuccess(false);

    try {
      const result = await quotesApi.sendQuote(quote.id, {
        price,
        turnaround,
        warranty,
        message
      });

      setSendSuccess(true);
      setStatus('quoted');
      if (onUpdate && result.quote) {
        onUpdate(result.quote);
      }
    } catch (err) {
      setSendError(err.data?.error || err.message || 'Failed to dispatch estimate.');
    } finally {
      setIsSendingQuote(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to remove Work Order #${quote.id}?`)) return;
    setIsDeleting(true);
    try {
      await quotesApi.deleteQuote(quote.id);
      if (onUpdate) onUpdate({ ...quote, _deleted: true });
      onClose();
    } catch (err) {
      alert('Error removing quote: ' + err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#0d1017] border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 dark:bg-[#12151f]/70">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shadow-xs">
              <Icons.Hammer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white">
                  Estimate Studio #{quote.id}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  status === 'completed'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : status === 'quoted'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                }`}>
                  {status === 'completed' ? 'Completed' : status === 'quoted' ? 'Estimate Sent' : 'Needs Review'}
                </span>
              </div>
              <span className="text-xs text-slate-400 dark:text-neutral-500">
                Created: {new Date(quote.created_at || quote.createdAt || Date.now()).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleStatusChange(status === 'completed' ? 'pending' : 'completed')}
              disabled={isUpdatingStatus}
              className={`py-1.5 px-3 rounded-xl font-bold text-xs transition border cursor-pointer ${
                status === 'completed'
                  ? 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 dark:border-neutral-700'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
              }`}
            >
              {status === 'completed' ? 'Reopen Order' : '✓ Mark as Completed'}
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
              title="Delete Work Order"
            >
              <Icons.Trash className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split 2-Column Studio */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Homeowner & Property Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-neutral-500 block">
                Homeowner Contact
              </span>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {quote.customer_name || quote.name || 'Client'}
                </h4>
                <div className="mt-2 space-y-1 text-xs">
                  {(quote.customer_phone || quote.phone) && (
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-neutral-300">
                      <Icons.Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <a href={`tel:${quote.customer_phone || quote.phone}`} className="hover:underline font-medium">
                        {quote.customer_phone || quote.phone}
                      </a>
                    </div>
                  )}
                  {(quote.customer_email || quote.email) && (
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-neutral-300">
                      <Icons.Mail className="w-3.5 h-3.5 text-blue-500" />
                      <a href={`mailto:${quote.customer_email || quote.email}`} className="hover:underline truncate">
                        {quote.customer_email || quote.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-neutral-300">
                    <Icons.MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{quote.location || 'Denison, TX'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-neutral-500 block">
                Project & Scope of Work
              </span>
              <div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {quote.service_category || quote.serviceCategory || 'Handyman Service'}
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {quote.detailed_service || quote.detailedService || 'Repair Project'}
                </h5>
                <p className="text-xs text-slate-600 dark:text-neutral-400 mt-2 whitespace-pre-wrap leading-relaxed">
                  {quote.details || 'Customer requested consultation & estimate.'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 text-xs flex justify-between text-slate-500 dark:text-neutral-400">
                <span>Requested Urgency:</span>
                <span className="font-bold text-slate-800 dark:text-neutral-200">{quote.urgency || quote.timeline || 'Flexible'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Steve's Official Estimate Composer (7 Cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSendQuote} className="bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-neutral-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-black text-sm text-slate-900 dark:text-white">
                    Official Estimate Composer
                  </h4>
                  <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                    Draft and dispatch an estimate with 1-year guarantee directly to the client.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  Steve Miller Approved
                </span>
              </div>

              {sendSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  ✓ Estimate successfully saved and sent to homeowner!
                </div>
              )}

              {sendError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs">
                  {sendError}
                </div>
              )}

              {/* Price & Turnaround */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Estimate Price ($ USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="350.00"
                      className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl pl-7 pr-3 py-2 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                    Estimated Timeline / Turnaround
                  </label>
                  <input
                    type="text"
                    value={turnaround}
                    onChange={(e) => setTurnaround(e.target.value)}
                    placeholder="1-2 Days / Prompt scheduling"
                    className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
                  />
                </div>
              </div>

              {/* Warranty Guarantee */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Craftsmanship Warranty
                </label>
                <div className="flex items-center space-x-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs">
                  <Icons.ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    className="w-full bg-transparent outline-none text-slate-800 dark:text-neutral-200 font-medium"
                  />
                </div>
              </div>

              {/* Message to Homeowner */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                  Personal Estimate Note to Homeowner
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition resize-none leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="submit"
                  disabled={isSendingQuote}
                  className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-xs rounded-xl transition shadow-md flex items-center space-x-2 disabled:opacity-50 cursor-pointer active:scale-95"
                >
                  <Icons.Send className="w-3.5 h-3.5" />
                  <span>{isSendingQuote ? 'Sending Estimate...' : 'Dispatch Official Estimate'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
