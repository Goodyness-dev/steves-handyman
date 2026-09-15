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
            ? 'bg-white/95 dark:bg-onyx-950/90 backdrop-blur-xl border-b border-neutral-200/90 dark:border-neutral-800/80 shadow-md py-3' 
            : 'bg-white/80 dark:bg-onyx-950/60 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/40 py-4 sm:py-5'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LEFT: Pill MENU button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white/10 dark:hover:bg-white/20 dark:text-white font-semibold text-xs sm:text-sm tracking-wider uppercase border border-neutral-900 dark:border-white/20 transition-all active:scale-95 shadow-md cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span>MENU</span>
            </button>

            {/* Status indicator for business open/closed */}
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 shadow-xs">
              <span className={`w-2 h-2 rounded-full ${openStatus ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
              <span className="font-medium">{openStatus ? 'On Duty Today' : 'After Hours • Estimates Open'}</span>
            </div>
          </div>

          {/* CENTER: 3D Isometric Monogram Dice ("S" & "H" for Steve's Handyman) */}
          <button 
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Steve's Handyman Home"
          >
            {/* Cube 1: S */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-neutral-200 via-neutral-500 to-neutral-800 dark:from-neutral-300 dark:via-neutral-700 dark:to-neutral-900 p-[1.5px] shadow-lg transform -rotate-6 transition-transform group-hover:rotate-0 duration-300">
              <div className="w-full h-full bg-gradient-to-b from-neutral-900 to-black rounded-[7px] flex items-center justify-center border border-white/25">
                <span className="font-heading font-black text-sm sm:text-base text-white tracking-tighter drop-shadow-md">
                  S
                </span>
              </div>
            </div>

            {/* Cube 2: H */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-neutral-300 via-neutral-600 to-neutral-900 dark:from-neutral-400 dark:via-neutral-600 dark:to-neutral-950 p-[1.5px] shadow-lg transform rotate-6 transition-transform group-hover:rotate-0 duration-300">
              <div className="w-full h-full bg-gradient-to-b from-neutral-900 to-black rounded-[7px] flex items-center justify-center border border-white/25">
                <span className="font-heading font-black text-sm sm:text-base text-white tracking-tighter drop-shadow-md">
                  H
                </span>
              </div>
            </div>

            <div className="hidden xl:flex flex-col text-left ml-2">
              <span className="font-heading font-black text-sm text-neutral-950 dark:text-white tracking-tight leading-none">
                STEVE'S
              </span>
              <span className="text-[10px] font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase leading-none mt-1">
                HANDYMAN LLC
              </span>
            </div>
          </button>

          {/* RIGHT: Pill GET IN TOUCH / QUOTE button & Dark Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-neutral-700 dark:text-neutral-300 border border-neutral-300/80 dark:border-white/15 transition-all active:scale-95 cursor-pointer shadow-xs"
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
              className="inline-flex items-center space-x-2 px-5 sm:px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-heading font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Get in touch for home repair quote"
            >
              <span>GET IN TOUCH</span>
              <div className="w-4 h-4 rounded-full bg-white/20 dark:bg-black text-white flex items-center justify-center">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
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
