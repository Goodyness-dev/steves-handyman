import React, { useState, useRef } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AppleExactPage({ onOpenWizard, onNavigate, onOpenContacts }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

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

  return (
    <div className="w-full apple-canvas text-[#2b1a0e] dark:text-white selection:bg-[#d49b6a] selection:text-white transition-colors duration-300 overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 1: TOP HERO (WITH BROWN BRAND PALETTE & CLIENT TAGLINE)
         ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-6 sm:pt-10 pb-16 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
        
        {/* Background Watermark: Giant stacked typography on left in warm brown tint */}
        <div className="absolute top-12 sm:top-16 left-4 sm:left-10 select-none pointer-events-none z-0 text-left">
          <div className="font-heading font-black text-[13vw] sm:text-[10.5vw] lg:text-[9vw] text-[#3d2616]/[0.055] dark:text-white/[0.04] uppercase leading-[0.88] tracking-tighter">
            Steve's<br />
            Handyman<br />
            Services
          </div>
        </div>

        {/* Hero Grid Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto relative z-10 pt-6 sm:pt-10">
          
          {/* LEFT: Floating Showcase Object Angled over Watermark */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start relative">
            <div className="relative w-64 sm:w-72 lg:w-80 rounded-[32px] overflow-hidden p-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-[#e8decb] dark:border-white/15 apple-floating-shadow transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="relative h-72 sm:h-80 lg:h-96 rounded-[24px] overflow-hidden bg-[#2b1a0e]">
                <img
                  src="/images/project-cabinets-laser.jpg"
                  alt="Precision laser alignment and deck repair craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#3d2616]/80 backdrop-blur-md border border-white/20 text-white">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[10px] uppercase tracking-wider text-amber-200 block font-bold">
                      30+ Years Experience
                    </span>
                  </div>
                  <span className="text-xs font-heading font-bold text-white block">
                    Deck Repair & Trim Carpentry
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: Official Tagline & 30+ Years Copy from Image 2 */}
          <div className="lg:col-span-4 space-y-6 text-left flex flex-col items-start justify-center">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ede4d8] dark:bg-[#2b1a0e] text-[#5c3826] dark:text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-[#d8c8b0] dark:border-[#38271a]">
                ★ Serving Denison & Lake Texoma
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black font-heading tracking-tight leading-[0.94] text-[#2b1a0e] dark:text-white">
                Steve's<br />
                Handyman<br />
                <span className="text-[#7a4522] dark:text-amber-400">Services</span>
              </h1>
            </div>

            <div className="space-y-2.5">
              <p className="font-serif italic text-lg sm:text-xl font-bold text-[#3d2616] dark:text-amber-200 leading-snug">
                “We do it right or not at all.”
              </p>
              <p className="text-xs sm:text-[13px] text-[#5c3826] dark:text-neutral-300 max-w-[310px] leading-relaxed font-normal">
                Steve's Handyman Services has 30+ years experience in all phases of handyman tasks. Specializing in deck repair, but services extend to all handyman projects and painting. It all starts with your idea...
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <button
                onClick={() => onOpenWizard()}
                className="btn-wood-pill text-xs py-3 px-8 shadow-sm flex items-center gap-2 group cursor-pointer"
              >
                <span>Request Free Estimate</span>
                <span className="text-amber-300 group-hover:translate-x-1 transition-transform font-bold">↗</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-[#ede4d8] hover:bg-[#dfd3c3] dark:bg-white/10 dark:hover:bg-white/20 text-[#3d2616] dark:text-white font-bold text-xs transition border border-[#d8c8b0] dark:border-white/10"
              >
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Embedded Video Enclosure */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
            <div className="relative w-72 sm:w-80 lg:w-88 rounded-[36px] overflow-hidden p-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-[#e8decb] dark:border-white/15 apple-floating-shadow group">
              <div className="relative h-80 sm:h-96 lg:h-[430px] rounded-[28px] overflow-hidden bg-black">
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

                {/* Minimalist Controls */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-20">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition cursor-pointer"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
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
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition cursor-pointer"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
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

                {/* Bottom Caption Pill */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-[#3d2616]/85 backdrop-blur-md border border-white/15 text-white z-20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-heading font-extrabold text-white block">
                      Steve Kornblatt
                    </span>
                    <span className="text-[10px] text-amber-200 block font-serif italic">
                      “We do it right or not at all.”
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenWizard('Carpentry', 'Woodworking')}
                    className="px-3.5 py-1.5 rounded-full bg-[#ea580c] hover:bg-[#d84e03] text-white font-heading font-bold text-[10px] tracking-wide uppercase transition shadow-xs"
                  >
                    Quote ↗
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================================
          SECTION 2: "SOUNDS LIKE AN EPIPHANY" (WITH WARM WOOD GRAIN ACCENTS)
         ========================================================================= */}
      <section id="epiphany" className="relative py-28 sm:py-36 border-t border-[#e8decb] dark:border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center relative">
          
          {/* Left: Vertical Portrait Photo */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm rounded-none overflow-hidden bg-[#2b1a0e] shadow-[0_20px_45px_rgba(61,38,22,0.18)] border border-[#e8decb]">
              <img
                src="/images/o (1).jpg"
                alt="Craftsman stud framing, deck restoration, and structural alignment"
                className="w-full h-[420px] sm:h-[480px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Headline + Paragraphs + Circular Arrow Button */}
          <div className="md:col-span-7 space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ede4d8] dark:bg-[#2b1a0e] text-[#5c3826] dark:text-amber-300 text-xs font-bold tracking-wider uppercase border border-[#d8c8b0] dark:border-[#38271a]">
              <span>// 01 CRAFTSMANSHIP GUARANTEE</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-black font-heading tracking-tighter leading-[0.98] text-[#2b1a0e] dark:text-white">
              Sounds like<br />
              an epiphany
            </h2>

            <div className="space-y-4 text-xs sm:text-[13px] text-[#5c3826] dark:text-neutral-300 max-w-md leading-relaxed font-normal">
              <p>
                Industry-leading multi-trade craftsmanship counters external wear and tear. Backed by 30+ years of hands-on experience across deck repair, structural carpentry, drywall, and painting.
              </p>
              <p className="font-serif italic text-[#3d2616] dark:text-amber-200 font-semibold text-sm">
                “We do it right or not at all.” Every job is built to last through Texas sun, humidity, and years of daily family living.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenWizard('Carpentry', 'Custom Trim & Framing')}
                className="btn-apple-circle group border border-[#d8c8b0] hover:bg-[#3d2616] hover:text-white"
                aria-label="Request fast consultation"
                title="Get Instant Estimate"
              >
                <svg className="w-5 h-5 text-[#5c3826] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: "MAGICAL EXPERIENCE" (LUXURY FINISHES & DECK REPAIR)
         ========================================================================= */}
      <section id="experience" className="relative py-28 sm:py-36 border-t border-[#e8decb] dark:border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center relative">
          
          {/* Left: Stacked Headline + Paragraph + Brown Pill Button */}
          <div className="md:col-span-5 space-y-7 text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ede4d8] dark:bg-[#2b1a0e] text-[#5c3826] dark:text-amber-300 text-xs font-bold tracking-wider uppercase border border-[#d8c8b0] dark:border-[#38271a]">
              <span>// 02 FINISH QUALITY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-black font-heading tracking-tighter leading-[0.98] text-[#2b1a0e] dark:text-white">
              Magical<br />
              experience
            </h2>

            <p className="text-xs sm:text-[13px] text-[#5c3826] dark:text-neutral-300 max-w-sm leading-relaxed font-normal">
              Steve's Handyman Services inherits all the effortless mastery of three decades serving homeowners. From deck restoration to kitchen cabinetry and drywall texture matching, we make the repair experience fluid, clean, and completely stress-free.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenWizard()}
                className="btn-wood-pill text-xs py-3 px-8 shadow-xs font-bold"
              >
                Schedule Consultation ↗
              </button>
            </div>
          </div>

          {/* Right: Massive Hardware Showcase (Finished Luxury Cabinetry & Trim) */}
          <div className="md:col-span-7 flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative w-full max-w-xl rounded-[36px] overflow-hidden p-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-[#e8decb] dark:border-white/15 apple-floating-shadow">
              <div className="relative h-72 sm:h-88 md:h-[400px] rounded-[28px] overflow-hidden bg-[#2b1a0e]">
                <img
                  src="/images/project-cabinets-complete.jpg"
                  alt="Luxury kitchen cabinetry and home craftsmanship showcase"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: GOOGLE MAP & DISPATCH COVERAGE
         ========================================================================= */}
      <section id="contacts" className="relative py-28 sm:py-36 border-t border-[#e8decb] dark:border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-8 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center relative">
          
          {/* Left: Location Details, Hours, Direct Phone & Directions */}
          <div className="md:col-span-5 space-y-7 text-left">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#ede4d8] dark:bg-white/10 backdrop-blur-md border border-[#d8c8b0] dark:border-white/15 text-[#5c3826] dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Mobile Dispatch Hub • Texoma</span>
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-black font-heading tracking-tighter leading-[0.98] text-[#2b1a0e] dark:text-white">
                Denison &<br />
                Lake Texoma
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-[13px] text-[#5c3826] dark:text-neutral-300 max-w-sm leading-relaxed font-normal">
              <p>
                Headquartered out of Denison, TX 75020. Mobile service units dispatched daily across Sherman, Pottsboro, Whitesboro, and the entire Lake Texoma shoreline.
              </p>
              <p className="font-bold text-[#3d2616] dark:text-amber-200">
                Zero travel surcharge across Grayson County.
              </p>
            </div>

            {/* Hours & Contact Pills */}
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#ede4d8]/80 dark:bg-white/5 backdrop-blur-md border border-[#d8c8b0] dark:border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-[#7a4522] dark:text-amber-400 uppercase tracking-wider block">Hours of Operation</span>
                <span className="font-bold text-[#2b1a0e] dark:text-white block">Mon – Fri: 7:30 AM – 6:00 PM</span>
                <span className="text-[#6b4226] dark:text-neutral-400 block text-[11px]">Sat: 8:00 AM – 3:00 PM (By Appt) • Sun: Emergency On-Call</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="btn-wood-pill text-xs py-2.5 px-6 font-bold"
                >
                  Call {BUSINESS_INFO.phone}
                </a>
                <a
                  href={BUSINESS_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ede4d8] hover:bg-[#dfd3c3] text-[#3d2616] dark:text-white font-bold text-xs border border-[#d8c8b0] transition"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: Embedded Interactive Google Map */}
          <div className="md:col-span-7 flex justify-center md:justify-end">
            <div className="relative w-full max-w-xl rounded-[36px] overflow-hidden p-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-[#e8decb] dark:border-white/15 apple-floating-shadow group">
              <div className="relative h-80 sm:h-96 md:h-[420px] rounded-[28px] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <iframe
                  title="Steve's Handyman Services Denison TX Google Map Location"
                  src={BUSINESS_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-[28px]"
                />

                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#3d2616]/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Denison, TX 75020 • Grayson County</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
