import React, { useState, useEffect, useRef } from 'react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

// Semantic inline SVGs
const Icons = {
  Search: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Send: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
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
  Hammer: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 3.26-6.36 6.36" />
      <path d="m12.44 11.73 4.24 4.24" />
      <path d="m14.56 5.38 4.24 4.24" />
    </svg>
  ),
  DollarSign: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
};

export default function InboxView({ onOpenFullQuote }) {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [attachPrice, setAttachPrice] = useState(false);
  const [quotePrice, setQuotePrice] = useState('');
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadThreads();
    const interval = setInterval(loadThreads, 12000);
    return () => clearInterval(interval);
  }, []);

  const loadThreads = async () => {
    try {
      const res = await quotesApi.getInbox({ search: searchTerm });
      const threadList = res.threads || [];
      setThreads(threadList);

      if (!selectedThread && threadList.length > 0) {
        selectThread(threadList[0]);
      } else if (selectedThread) {
        const updated = threadList.find(t => t.id === selectedThread.id);
        if (updated) setSelectedThread(updated);
      }
    } catch (err) {
      console.warn('Inbox load note:', err);
    } finally {
      setIsLoadingThreads(false);
    }
  };

  const selectThread = async (thread) => {
    setSelectedThread(thread);
    try {
      const res = await quotesApi.getMessages(thread.id);
      setMessages(res.messages || []);
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSendReply = async (e) => {
    e?.preventDefault();
    if (!replyText.trim() && !quotePrice.trim()) return;

    setIsSending(true);
    try {
      const res = await quotesApi.sendMessage(selectedThread.id, {
        message: replyText.trim(),
        quotePrice: attachPrice && quotePrice ? quotePrice.trim() : null
      });

      if (res.message) {
        setMessages(prev => [...prev, res.message]);
        setReplyText('');
        if (attachPrice) {
          setQuotePrice('');
          setAttachPrice(false);
        }
        scrollToBottom();
        loadThreads();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const quickReplies = [
    "I can stop by Thursday morning to inspect and measure.",
    "Official estimate sent above — backed by our 1-year guarantee.",
    "Could you send a quick photo of the repair area?",
    "We have the cedar/drywall materials ready for install."
  ];

  return (
    <div className="bg-white dark:bg-[#0c0e14] border border-slate-200/90 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row h-[780px] text-slate-900 dark:text-slate-100">
      {/* ------------------------------------------------------------- */}
      {/* THREAD LIST (Left Panel)                                      */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-neutral-800 flex flex-col h-full bg-slate-50/50 dark:bg-neutral-900/30">
        <div className="p-4 border-b border-slate-200 dark:border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-black text-base text-slate-900 dark:text-white">
              Customer Conversations
            </h2>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {threads.length} Active
            </span>
          </div>

          <div className="relative">
            <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-neutral-800">
          {threads.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No conversations in inbox.
            </div>
          ) : (
            threads.map((t) => {
              const isSelected = selectedThread?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => selectThread(t)}
                  className={`p-4 cursor-pointer transition flex items-start space-x-3 ${
                    isSelected 
                      ? 'bg-white dark:bg-neutral-800/80 border-l-4 border-slate-900 dark:border-white shadow-xs' 
                      : 'hover:bg-white/60 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-neutral-300 shrink-0">
                    {(t.customer_name || t.name || 'H')[0].toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {t.customer_name || t.name || 'Homeowner'}
                      </h4>
                      <span className="text-[10px] text-slate-400 dark:text-neutral-500">
                        {new Date(t.created_at || t.createdAt || Date.now()).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold truncate mt-0.5">
                      {t.detailed_service || t.service_category || 'Handyman Service'}
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 truncate mt-1">
                      {t.lastMessage || t.details || 'Customer requested quote.'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONVERSATION VIEW (Right Panel)                               */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#0c0e14]">
        {selectedThread ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-[#0c0e14]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs">
                  {(selectedThread.customer_name || selectedThread.name || 'H')[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {selectedThread.customer_name || selectedThread.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 dark:text-neutral-500">
                    <span>{selectedThread.location || 'Denison, TX'}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {selectedThread.detailed_service || selectedThread.service_category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {selectedThread.customer_phone && (
                  <a
                    href={`tel:${selectedThread.customer_phone}`}
                    className="p-2 rounded-xl border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800"
                    title="Call Homeowner"
                  >
                    <Icons.Phone className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => onOpenFullQuote && onOpenFullQuote(selectedThread)}
                  className="py-1.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-xs hover:opacity-90 transition"
                >
                  Estimate Studio
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40 dark:bg-[#07090d]">
              {/* Original Project Scope Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs max-w-xl mx-auto space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-neutral-200">Initial Project Inquiry</span>
                  <span className="text-slate-400">Order #{selectedThread.id}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-neutral-300 whitespace-pre-wrap">
                  {selectedThread.details || 'Customer submitted project request.'}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-neutral-500 pt-1 border-t border-slate-100 dark:border-neutral-800 flex justify-between">
                  <span>Urgency: {selectedThread.urgency || selectedThread.timeline || 'Flexible'}</span>
                  <span>1-Year Guarantee Eligible</span>
                </div>
              </div>

              {/* Chat Bubbles */}
              {messages.map((m, idx) => {
                const isSteve = m.sender === 'admin' || m.sender === 'steve';
                return (
                  <div key={idx} className={`flex flex-col ${isSteve ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-md rounded-2xl p-3.5 text-xs ${
                      isSteve 
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-br-none shadow-sm' 
                        : 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white border border-slate-200 dark:border-neutral-700 rounded-bl-none shadow-xs'
                    }`}>
                      {m.quotePrice && (
                        <div className={`mb-2 p-2 rounded-xl text-xs font-bold flex items-center justify-between ${
                          isSteve ? 'bg-white/10 dark:bg-black/10 text-white dark:text-slate-950' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          <span>Official Estimate:</span>
                          <span className="font-mono text-sm">${m.quotePrice}</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap leading-relaxed">{m.text || m.message}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-neutral-500 mt-1 px-1">
                      {isSteve ? 'Steve Miller' : (selectedThread.customer_name || 'Homeowner')} • {new Date(m.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-neutral-800 bg-white dark:bg-[#0c0e14] overflow-x-auto flex items-center space-x-2 scrollbar-none">
              <span className="text-[10px] font-bold text-slate-400 shrink-0">Quick Reply:</span>
              {quickReplies.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setReplyText(chip)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 whitespace-nowrap transition cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Reply Composer */}
            <form onSubmit={handleSendReply} className="p-4 border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0c0e14] space-y-3">
              {attachPrice && (
                <div className="flex items-center space-x-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl p-2 max-w-xs">
                  <span className="text-xs font-bold text-slate-500">$</span>
                  <input
                    type="number"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    placeholder="Estimate Amount (USD)"
                    className="bg-transparent outline-none text-xs font-bold text-slate-900 dark:text-white w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setAttachPrice(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setAttachPrice(!attachPrice)}
                  className={`p-2.5 rounded-xl border transition ${
                    attachPrice 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                      : 'border-slate-200 dark:border-neutral-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-neutral-800'
                  }`}
                  title="Attach Formal Estimate Price"
                >
                  <Icons.DollarSign className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type message to homeowner..."
                  className="flex-1 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
                />

                <button
                  type="submit"
                  disabled={isSending || (!replyText.trim() && !quotePrice.trim())}
                  className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-xs rounded-xl transition shadow-xs flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer active:scale-95"
                >
                  <Icons.Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
            Select a conversation on the left to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}
