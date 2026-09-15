import React, { useState, useRef } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Hero({ onOpenWizard }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTrade, setActiveTrade] = useState(null);
  const videoRef = useRef(null);

  const trades = [
    { name: 'Carpentry', desc: 'Trim, cabinets & built-ins', icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' },
    { name: 'Drywall', desc: 'Seamless patch matching', icon: 'M3 3h18v18H3z' },
    { name: 'Electrical', desc: 'Fixtures, outlets & panels', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
    { name: 'Plumbing', desc: 'Faucets, valves & toilets', icon: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z' },
    { name: 'Decks', desc: 'Fascia, fences & patios', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { name: 'Painting', desc: 'Sherwin-Williams coatings', icon: 'M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 6.99 17.01 16l1.58-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z' },
    { name: 'Tile', desc: 'Flooring & backsplashes', icon: 'M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zm-11 0h7v7H3z' },
    { name: 'Punch-List', desc: 'Doors, TV mount & locks', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] bg-slate-50 dark:bg-onyx-950 text-neutral-900 dark:text-white overflow-hidden flex flex-col justify-between blueprint-grid transition-colors duration-200">
      
      {/* Subtle radial lighting backdrop */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-200/20 dark:bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-100/30 dark:bg-neutral-800/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Main Split Grid Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20 pb-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: Bold Typography & Dual Pill CTAs */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-neutral-200/90 dark:border-white/10 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-medium tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Serving Denison, Sherman & Lake Texoma, TX</span>
            </div>

            <a
              href="#gallery"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/20 border border-neutral-200/90 dark:border-white/20 text-neutral-700 dark:text-neutral-200 text-xs font-semibold transition shadow-xs"
            >
              <span className="flex -space-x-1.5 overflow-hidden">
                <img className="inline-block h-4 w-4 rounded-full ring-1 ring-white object-cover" src="/images/project-cabinets-laser.jpg" alt="Cabinet" />
                <img className="inline-block h-4 w-4 rounded-full ring-1 ring-white object-cover" src="/images/project-window-install.jpg" alt="Window" />
                <img className="inline-block h-4 w-4 rounded-full ring-1 ring-white object-cover" src="/images/project-drywall-hallway.jpg" alt="Drywall" />
              </span>
              <span>8 Job Photos →</span>
            </a>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-heading tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
            Crafting Reliable <br className="hidden sm:inline" />
            Home Masterpieces
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-xl font-normal leading-relaxed">
            Harnessing 25+ years of multi-trade craftsmanship and honest Texas work ethic to transform everyday home repairs into flawless, long-lasting precision.
          </p>

          {/* Dual Pill CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            
            {/* Pill 1: High-contrast primary button */}
            <button
              onClick={scrollToServices}
              className="inline-flex items-center space-x-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all active:scale-95 shadow-xl group cursor-pointer"
            >
              <span>SEE SERVICES</span>
              <div className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <svg className="w-3 h-3 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </button>

            {/* Pill 2: Secondary pill button with tactile border */}
            <button
              onClick={() => onOpenWizard()}
              className="inline-flex items-center space-x-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg border-2 border-neutral-300/80 dark:border-neutral-700 active:scale-95 group cursor-pointer"
            >
              <span>GET IN TOUCH</span>
              <div className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <svg className="w-3 h-3 text-white dark:text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </button>

          </div>

          {/* Social Proof Stats */}
          <div className="pt-4 flex items-center gap-6 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm border-t border-neutral-200/90 dark:border-neutral-800/80">
            <div>
              <span className="font-heading font-black text-neutral-950 dark:text-white text-lg sm:text-xl block">2,400+</span>
              <span className="text-neutral-500 text-xs">Projects Solved</span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-300 dark:bg-neutral-800" />
            <div>
              <span className="font-heading font-black text-neutral-950 dark:text-white text-lg sm:text-xl block">5.0 ★</span>
              <span className="text-neutral-500 text-xs">Yelp & Google Rating</span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-300 dark:bg-neutral-800" />
            <div>
              <span className="font-heading font-black text-emerald-600 dark:text-emerald-400 text-lg sm:text-xl block">1-Year</span>
              <span className="text-neutral-500 text-xs">Warranty on Labor</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: EMBEDDED HERO VIDEO & TACTILE TRADE BADGES */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-6">
          
          {/* Main Cinematic Video Player Container */}
          <div className="relative w-full max-w-lg lg:max-w-none rounded-3xl p-2 sm:p-2.5 bg-white dark:bg-neutral-900 border-2 border-neutral-200/90 dark:border-neutral-800 card-thick shadow-2xl transition-all duration-300 group">
            
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-neutral-950">
              {/* HTML5 Video Player */}
              <video
                ref={videoRef}
                src="/A_photorealistic_D_rendered_m.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Top Glass Badge & Controls */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto z-20">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Master Craftsmanship in Motion</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mute/Unmute */}
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition cursor-pointer"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition cursor-pointer"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Glass Caption & Quick Action */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white z-20">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                    Multi-Trade Standard
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-black text-white">
                    Laser Precision Woodworking & Framing
                  </span>
                </div>
                <button
                  onClick={() => onOpenWizard('Carpentry', 'Custom Trim & Built-Ins')}
                  className="px-3 py-1.5 rounded-lg bg-white text-black font-heading font-bold text-[11px] tracking-wide uppercase hover:bg-neutral-200 transition active:scale-95 cursor-pointer shrink-0"
                >
                  Quote This ↗
                </button>
              </div>

              {/* Dark Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            </div>

          </div>

          {/* Interactive Trade Badges Strip */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Explore Trade Disciplines:
              </span>
              <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                Click any trade for instant estimate
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {trades.map((trade) => (
                <button
                  key={trade.name}
                  onClick={() => onOpenWizard(trade.name)}
                  onMouseEnter={() => setActiveTrade(trade.name)}
                  onMouseLeave={() => setActiveTrade(null)}
                  className="flex items-center space-x-2 p-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/90 dark:border-neutral-800 text-left transition-all active:scale-95 card-thick cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={trade.icon} />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-heading font-bold text-xs text-neutral-900 dark:text-white block truncate">
                      {trade.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block truncate">
                      {trade.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Right Edge Vertical Honors Badge */}
      <aside className="hidden xl:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 flex-col items-center bg-white/95 dark:bg-black/90 border-l border-y border-neutral-300 dark:border-neutral-800 rounded-l-xl px-2 py-4 shadow-xl backdrop-blur-md">
        <span className="font-heading font-black text-xs tracking-widest text-neutral-950 dark:text-white uppercase mb-3">
          W.
        </span>
        <span className="text-[10px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-bold [writing-mode:vertical-lr] rotate-180">
          Licensed & Insured
        </span>
      </aside>

      {/* BOTTOM PARTNER LOGOS TICKER */}
      <div className="border-t border-neutral-200/90 dark:border-neutral-800/80 bg-white/90 dark:bg-black/80 backdrop-blur-md py-4 sm:py-5 px-4 w-full relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-6 sm:gap-10 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          
          <div className="flex items-center space-x-2 text-neutral-800 dark:text-neutral-300">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span className="text-neutral-900 dark:text-neutral-200 font-bold">Pro Equipment & Materials:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-9 text-neutral-500 dark:text-neutral-400 font-heading font-bold text-xs tracking-widest">
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-default">MILWAUKEE</span>
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-default">DEWALT</span>
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-default">BOSCH</span>
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-default">SHERWIN-WILLIAMS</span>
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-default">TREX DECKING</span>
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-default">KOHLER</span>
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-default">SIMPSON STRONG-TIE</span>
          </div>

        </div>
      </div>

    </section>
  );
}
