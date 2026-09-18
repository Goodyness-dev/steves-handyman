import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate, darkMode, onToggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      {/* Top Brand Announcement Banner (Warm Espresso Brown from Image 2) */}
      <div className="bg-[#3d2616] text-[#faf6f0] text-xs font-semibold py-2 px-4 text-center border-b border-white/10 shadow-xs relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ea580c] text-white text-[10px] font-black uppercase tracking-wider">
            30+ Years Exp
          </span>
          <span className="font-serif italic text-amber-200">
            “We do it right or not at all.”
          </span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="hidden sm:inline text-white/90">
            Specializing in Deck Repair, Trim Carpentry & All Handyman Phases
          </span>
          <span className="hidden md:inline text-white/40">•</span>
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="text-amber-300 hover:text-white font-bold underline transition"
          >
            Call: {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>

      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#f6f0e6]/95 dark:bg-[#15100c]/95 backdrop-blur-xl border-b border-[#e8decb] dark:border-[#38271a] shadow-sm py-3' 
            : 'bg-[#f6f0e6]/70 dark:bg-[#15100c]/70 backdrop-blur-md border-b border-[#e8decb]/60 dark:border-[#38271a]/50 py-4 sm:py-5'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* LEFT: Official 4-Quadrant Brand Logo */}
          <button 
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-3.5 group cursor-pointer text-left"
            aria-label="Steve's Handyman Services Home"
          >
            {/* 4-Quadrant Logo Image */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-[#3d2616]/15 bg-white p-0.5 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <img 
                src="/logo.png" 
                alt="Steve's Handyman Services Logo" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-base sm:text-lg text-[#2b1a0e] dark:text-white tracking-tight leading-none">
                  Steve's Handyman
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-black tracking-widest text-[#7a4522] dark:text-amber-400 uppercase leading-none font-heading">
                  SERVICES
                </span>
                <span className="text-[9px] text-[#8b5a2b] dark:text-neutral-400 font-serif italic hidden sm:inline leading-none">
                  “We do it right or not at all”
                </span>
              </div>
            </div>
          </button>

          {/* CENTER: Navigation Links (Styled with the Brown "HOME" Pill from Image 2) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs sm:text-[13px] tracking-normal font-semibold">
            {/* Active Pill matching Image 2 */}
            <button
              onClick={(e) => handleNavClick(e, '#')}
              className="bg-[#3d2616] text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-[#2b1a0e] transition cursor-pointer"
            >
              HOME
            </button>

            <button
              onClick={(e) => handleNavClick(e, '#epiphany')}
              className="text-[#5c3826] hover:text-[#2b1a0e] dark:text-neutral-300 dark:hover:text-white px-2 py-1 transition-colors cursor-pointer uppercase tracking-wider text-xs font-bold"
            >
              ABOUT
            </button>

            <button
              onClick={(e) => handleNavClick(e, 'services')}
              className="text-[#5c3826] hover:text-[#2b1a0e] dark:text-neutral-300 dark:hover:text-white px-2 py-1 transition-colors cursor-pointer uppercase tracking-wider text-xs font-bold"
            >
              SERVICES
            </button>

            <button
              onClick={() => onOpenWizard()}
              className="text-[#5c3826] hover:text-[#2b1a0e] dark:text-neutral-300 dark:hover:text-white px-2 py-1 transition-colors cursor-pointer uppercase tracking-wider text-xs font-bold"
            >
              PRICES / FAQ
            </button>

            <button
              onClick={(e) => handleNavClick(e, '#experience')}
              className="text-[#5c3826] hover:text-[#2b1a0e] dark:text-neutral-300 dark:hover:text-white px-2 py-1 transition-colors cursor-pointer uppercase tracking-wider text-xs font-bold"
            >
              PROJECTS
            </button>

            <button
              onClick={(e) => handleNavClick(e, '#contacts')}
              className="text-[#5c3826] hover:text-[#2b1a0e] dark:text-neutral-300 dark:hover:text-white px-2 py-1 transition-colors cursor-pointer uppercase tracking-wider text-xs font-bold"
            >
              CONTACT
            </button>
          </nav>

          {/* RIGHT: Theme Toggle & Brown Pill CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#3d2616] dark:text-neutral-300 border border-[#3d2616]/10 dark:border-white/15 transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Toggle theme"
              title="Toggle theme"
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
                <svg className="w-4 h-4 text-[#3d2616]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => onOpenWizard()}
              className="btn-wood-pill hidden sm:inline-flex text-xs py-2 px-5 shadow-xs cursor-pointer"
            >
              <span>Get Fast Quote ↗</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded-xl bg-white/80 dark:bg-white/10 text-[#3d2616] dark:text-white border border-[#3d2616]/10 dark:border-white/10 cursor-pointer"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Tactile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-[#f6f0e6] dark:bg-[#140d08] border-r border-[#e8decb] dark:border-[#38271a] text-[#2b1a0e] dark:text-white p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#e8decb] dark:border-[#38271a]">
                <div className="flex items-center gap-3">
                  <img 
                    src="/logo.png" 
                    alt="Steve's Handyman Services" 
                    className="w-10 h-10 object-contain rounded-lg border border-black/10 bg-white"
                  />
                  <div>
                    <span className="font-heading font-black text-base text-[#2b1a0e] dark:text-white block">
                      Steve's Handyman
                    </span>
                    <span className="text-[10px] font-bold text-[#7a4522] dark:text-amber-400 uppercase block">
                      Services • 30+ Years Exp
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full bg-white/80 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-2">
                {[
                  { name: 'Home Page', target: '#' },
                  { name: 'About & 30+ Years Craftsmanship', target: '#epiphany' },
                  { name: 'All Services Catalog', target: 'services' },
                  { name: 'Recent Projects & Photos', target: '#experience' },
                  { name: 'Service Area & Map', target: '#contacts' },
                  { name: '🔐 Steve\'s Dispatch Portal', target: 'admin' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(e, item.target)}
                    className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/80 dark:hover:bg-white/5 border border-transparent hover:border-[#e8decb] dark:hover:border-neutral-800 transition flex items-center justify-between group cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[#2b1a0e] dark:text-neutral-200 group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                    <svg className="w-4 h-4 text-[#7a4522] group-hover:text-[#2b1a0e] dark:group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                ))}
              </nav>

              {/* Direct Phone & Quote Info */}
              <div className="mt-8 p-5 rounded-2xl bg-[#ede4d8] dark:bg-[#23150d] border border-[#d8c8b0] dark:border-[#38271a] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#7a4522] dark:text-amber-400 font-bold block">
                  Direct Dispatch • Steve Kornblatt
                </span>
                <a 
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="font-heading font-black text-2xl text-[#2b1a0e] dark:text-white hover:text-[#7a4522] transition block"
                >
                  {BUSINESS_INFO.phone}
                </a>
                <p className="text-xs text-[#5c3826] dark:text-neutral-400 leading-relaxed font-serif italic">
                  “We do it right or not at all.”
                </p>
              </div>
            </div>

            {/* Drawer Bottom CTA */}
            <div className="pt-6 border-t border-[#e8decb] dark:border-[#38271a]">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenWizard();
                }}
                className="w-full py-3.5 rounded-xl bg-[#3d2616] text-white font-heading font-bold text-sm uppercase tracking-wider hover:bg-[#2b1a0e] transition shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Request Free Estimate</span>
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
