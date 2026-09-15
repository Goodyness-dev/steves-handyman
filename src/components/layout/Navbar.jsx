import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate, darkMode, onToggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openStatus = isOpenNow();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setDrawerOpen(false);

    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'admin') {
      if (onNavigate) onNavigate('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#eaebed]/90 dark:bg-[#0b0d10]/90 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm py-3.5' 
            : 'bg-transparent py-5 sm:py-6'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* LEFT: Minimalist Apple-style Brand Mark */}
          <button 
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-3 group cursor-pointer text-left"
            aria-label="Steve's Handyman Home"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-950 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 font-black text-xs shadow-xs transition-transform duration-300 group-hover:scale-105">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white tracking-tight leading-none">
                Steve's
              </span>
              <span className="text-[10px] font-medium tracking-wider text-neutral-500 dark:text-neutral-400 uppercase leading-none mt-0.5">
                Handyman Co.
              </span>
            </div>
          </button>

          {/* CENTER/RIGHT: Minimal Text Nav Links from Template */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs sm:text-[13px] font-medium text-neutral-600 dark:text-neutral-300 tracking-wide">
            <button
              onClick={(e) => handleNavClick(e, '#services')}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={(e) => handleNavClick(e, '#craft')}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={(e) => handleNavClick(e, '#gallery')}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Work
            </button>
            <button
              onClick={(e) => handleNavClick(e, '#reviews')}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={(e) => handleNavClick(e, '#location')}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Contacts
            </button>
          </nav>

          {/* RIGHT: Theme Toggle & Apple Pill CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-neutral-700 dark:text-neutral-300 border border-black/5 dark:border-white/15 transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg className="w-4 h-4 text-neutral-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => onOpenWizard()}
              className="btn-apple-pill hidden sm:inline-flex text-xs py-2.5 px-6 shadow-xs cursor-pointer"
            >
              <span>Get Estimate</span>
            </button>

            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded-full bg-white/70 dark:bg-white/10 text-neutral-800 dark:text-white border border-black/5 dark:border-white/10 cursor-pointer"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Tactile Drawer when MENU is clicked */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-white dark:bg-onyx-950 border-r border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white/10 border border-neutral-900 dark:border-white/20 text-white flex items-center justify-center font-black text-xs">
                    SH
                  </div>
                  <span className="font-heading font-black text-sm tracking-wider uppercase text-neutral-900 dark:text-neutral-300">
                    Steve's Handyman LLC
                  </span>
                </div>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 space-y-3">
                {[
                  { name: 'All Services Catalog', target: 'services' },
                  { name: '📸 Real Project Gallery', target: '#gallery' },
                  { name: 'Craftsmanship & Story', target: '#about' },
                  { name: 'Warranties & Perks', target: '#amenities' },
                  { name: 'Verified Customer Reviews', target: '#reviews' },
                  { name: 'Service Area & Hours', target: '#location' },
                  { name: '🔐 Steve\'s Admin Portal', target: 'admin' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(e, item.target)}
                    className="w-full text-left py-3 px-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition flex items-center justify-between group cursor-pointer"
                  >
                    <span className="font-heading font-bold text-base sm:text-lg text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                ))}
              </nav>

              {/* Direct Phone & Service Area Pill */}
              <div className="mt-8 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold block">
                  Direct Phone / Dispatch
                </span>
                <a 
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="font-heading font-black text-2xl text-neutral-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-2"
                >
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Serving Denison, Sherman, Pottsboro, Lake Texoma, and all of Grayson County, TX.
                </p>
              </div>
            </div>

            {/* Drawer Bottom CTA */}
            <div className="pt-6 border-t border-neutral-800">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenWizard();
                }}
                className="w-full py-4 rounded-xl bg-white text-black font-heading font-black text-base uppercase tracking-wider hover:bg-neutral-200 transition shadow-xl flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Request Fast Estimate</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
