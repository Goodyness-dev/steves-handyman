import React, { useState } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Hero({ onOpenWizard }) {
  const [activeDisc, setActiveDisc] = useState(null);

  const trades = [
    { name: 'Custom Carpentry', desc: 'Trim, cabinets & built-ins', icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z', angle: 0, gradient: 'from-neutral-100 via-neutral-300 to-neutral-500' },
    { name: 'Drywall & Texture', desc: 'Seamless patch matching', icon: 'M3 3h18v18H3z', angle: 45, gradient: 'from-neutral-200 via-neutral-400 to-neutral-600' },
    { name: 'Electrical & Fans', desc: 'Fixtures, outlets & panels', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', angle: 90, gradient: 'from-neutral-300 via-neutral-500 to-neutral-700' },
    { name: 'Plumbing Fixtures', desc: 'Faucets, valves & toilets', icon: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z', angle: 135, gradient: 'from-neutral-400 via-neutral-600 to-neutral-800' },
    { name: 'Decks & Rot Repair', desc: 'Fascia, fences & patios', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', angle: 180, gradient: 'from-neutral-300 via-neutral-500 to-neutral-700' },
    { name: 'Precision Paint', desc: 'Sherwin-Williams coating', icon: 'M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 6.99 17.01 16l1.58-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z', angle: 225, gradient: 'from-neutral-200 via-neutral-400 to-neutral-600' },
    { name: 'Tile & Transition', desc: 'Flooring & backsplashes', icon: 'M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zm-11 0h7v7H3z', angle: 270, gradient: 'from-neutral-100 via-neutral-300 to-neutral-500' },
    { name: 'Punch-List Odd Jobs', desc: 'Doors, TV mount & locks', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', angle: 315, gradient: 'from-neutral-200 via-neutral-400 to-neutral-600' },
  ];

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] bg-black dark:bg-onyx-950 text-white overflow-hidden flex flex-col justify-between blueprint-grid">
      
      {/* Subtle radial lighting backdrop */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-neutral-800/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Main Split Grid Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-28 pb-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Bold Typography & Dual Pill CTAs */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs sm:text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Serving Denison, Sherman & Lake Texoma, TX</span>
            </div>

            <a
              href="#gallery"
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-neutral-300 hover:text-white text-xs font-semibold transition"
            >
              <span className="flex -space-x-1.5 overflow-hidden">
                <img className="inline-block h-4 w-4 rounded-full ring-1 ring-white object-cover" src="/images/project-cabinets-laser.jpg" alt="Cabinet" />
                <img className="inline-block h-4 w-4 rounded-full ring-1 ring-white object-cover" src="/images/project-window-install.jpg" alt="Window" />
                <img className="inline-block h-4 w-4 rounded-full ring-1 ring-white object-cover" src="/images/project-drywall-hallway.jpg" alt="Drywall" />
              </span>
              <span>8 Job Photos →</span>
            </a>
          </div>

          {/* Headline (Matching "Crafting Digital Masterpieces" visual weight) */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-heading tracking-tight text-white leading-[1.08]">
            Crafting Reliable <br className="hidden sm:inline" />
            Home Masterpieces
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-neutral-400 max-w-xl font-normal leading-relaxed">
            Harnessing 25+ years of multi-trade craftsmanship and honest Texas work ethic to transform everyday home repairs into flawless, long-lasting precision.
          </p>

          {/* Dual Pill CTA Buttons (Matching reference screenshot exactly) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            {/* Pill 1: Dark button with diagonal arrow */}
            <button
              onClick={scrollToServices}
              className="inline-flex items-center space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#121212] hover:bg-neutral-800 text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase border border-neutral-700 hover:border-neutral-500 transition-all active:scale-95 shadow-xl group"
            >
              <span>SEE SERVICES</span>
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </button>

            {/* Pill 2: High-contrast white button with black diagonal arrow */}
            <button
              onClick={() => onOpenWizard()}
              className="inline-flex items-center space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-2xl active:scale-95 group"
            >
              <span>GET IN TOUCH</span>
              <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </button>

          </div>

          {/* Social Proof Stats */}
          <div className="pt-4 flex items-center gap-6 text-neutral-400 text-xs sm:text-sm border-t border-neutral-800/80">
            <div>
              <span className="font-heading font-black text-white text-lg sm:text-xl block">2,400+</span>
              <span className="text-neutral-500 text-xs">Projects Solved</span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-800" />
            <div>
              <span className="font-heading font-black text-white text-lg sm:text-xl block">5.0 ★</span>
              <span className="text-neutral-500 text-xs">Yelp & Google Rating</span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-800" />
            <div>
              <span className="font-heading font-black text-emerald-400 text-lg sm:text-xl block">1-Year</span>
              <span className="text-neutral-500 text-xs">Warranty on Labor</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 3D Radial Orbital Trade Discs (Exact match to circular arrangement in screenshot) */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[480px]">
          
          {/* Radial Wheel Container */}
          <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full flex items-center justify-center">
            
            {/* Center Core Hub with Steve's Monogram */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-neutral-800 to-black border border-white/20 flex flex-col items-center justify-center shadow-2xl z-20 text-center p-3">
              <span className="font-heading font-black text-xs sm:text-sm text-white tracking-wider uppercase">
                {activeDisc !== null ? trades[activeDisc].name : "MULTI-TRADE"}
              </span>
              <span className="text-[10px] text-neutral-400 mt-0.5 leading-tight">
                {activeDisc !== null ? trades[activeDisc].desc : "Precision Repairs"}
              </span>
            </div>

            {/* Orbiting Discs arranged in a circle */}
            {trades.map((trade, idx) => {
              const radius = 140; // in px for sm screens
              const rad = (trade.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              const isHovered = activeDisc === idx;

              return (
                <div
                  key={trade.name}
                  onMouseEnter={() => setActiveDisc(idx)}
                  onMouseLeave={() => setActiveDisc(null)}
                  onClick={() => onOpenWizard(trade.name)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className="absolute cursor-pointer transition-all duration-300 z-10"
                  title={`${trade.name} - ${trade.desc}`}
                >
                  {/* Outer disc with brushed metallic radial gradient */}
                  <div className={`w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br ${trade.gradient} p-[1.5px] shadow-2xl transition-all duration-300 ${isHovered ? 'scale-125 ring-2 ring-white shadow-[0_0_25px_rgba(255,255,255,0.4)]' : 'hover:scale-110'}`}>
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center">
                      <svg 
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${isHovered ? 'text-white' : 'text-neutral-300'}`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d={trade.icon} />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>

      {/* Right Edge Vertical Honors Badge (Matching "Honors W." tab in screenshot) */}
      <aside className="hidden xl:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 flex-col items-center bg-black/90 border-l border-y border-neutral-800 rounded-l-xl px-2 py-4 shadow-2xl backdrop-blur-md">
        <span className="font-heading font-black text-xs tracking-widest text-white uppercase mb-3">
          W.
        </span>
        <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold [writing-mode:vertical-lr] rotate-180">
          Licensed & Insured
        </span>
      </aside>

      {/* BOTTOM PARTNER LOGOS TICKER (Matching bottom row in template) */}
      <div className="border-t border-neutral-800/80 bg-black/80 backdrop-blur-md py-5 sm:py-6 px-4 w-full relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-6 sm:gap-10 text-neutral-500 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          
          <div className="flex items-center space-x-2 text-neutral-400">
            <svg className="w-4 h-4 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span className="text-neutral-300 font-bold">Pro Equipment & Materials:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 hover:opacity-100 transition-opacity">
            <span className="hover:text-white transition-colors cursor-default tracking-widest font-heading font-black">MILWAUKEE</span>
            <span className="hover:text-white transition-colors cursor-default tracking-widest font-heading font-black">DEWALT</span>
            <span className="hover:text-white transition-colors cursor-default tracking-widest font-heading font-black">BOSCH</span>
            <span className="hover:text-white transition-colors cursor-default tracking-widest font-heading font-black">SHERWIN-WILLIAMS</span>
            <span className="hover:text-white transition-colors cursor-default tracking-widest font-heading font-black">TREX DECKING</span>
            <span className="hover:text-white transition-colors cursor-default tracking-widest font-heading font-black">KOHLER</span>
            <span className="hover:text-white transition-colors cursor-default tracking-widest font-heading font-black">SIMPSON STRONG-TIE</span>
          </div>

        </div>
      </div>

    </section>
  );
}
