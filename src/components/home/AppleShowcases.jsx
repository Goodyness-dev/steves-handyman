import React from 'react';

export default function AppleShowcases({ onOpenWizard }) {
  return (
    <div id="craft" className="apple-canvas text-neutral-900 dark:text-white transition-colors duration-200 overflow-hidden">
      
      {/* SECTION 2: "Built like an epiphany" (AirPods Max Section 2 DNA) */}
      <section className="relative py-24 sm:py-32 lg:py-40 border-t border-black/[0.05] dark:border-white/[0.06]">
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 select-none pointer-events-none text-[20vw] font-black text-black/[0.035] dark:text-white/[0.03] tracking-tighter leading-none whitespace-nowrap z-0 font-heading">
          CRAFT
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Vertical Portrait Craftsmanship Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md rounded-[32px] overflow-hidden bg-neutral-900 p-2 apple-floating-shadow border border-white/80 dark:border-white/10 group">
                <div className="relative h-[440px] sm:h-[520px] rounded-[24px] overflow-hidden">
                  <img
                    src="/images/project-cabinets-laser.jpg"
                    alt="Precision laser-guided carpentry and cabinet leveling"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Floating Minimal Glass Badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
                      Laser Alignment & Leveling
                    </span>
                    <span className="text-sm font-heading font-bold text-white block mt-0.5">
                      Zero-Tolerance Precision Woodworking
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bold Title, Editorial Subtitle, Neumorphic Circular Arrow Button */}
            <div className="lg:col-span-6 space-y-7 text-left">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tighter text-neutral-950 dark:text-white leading-[1.02]">
                Built like<br />
                an epiphany
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed font-normal">
                Industry-leading multi-trade craftsmanship counters external wear and tear, allowing you to immerse yourself in a home that works flawlessly. Seamless drywall blending, laser-guided custom cabinetry, structural framing, plumbing upgrades, and electrical precision.
              </p>

              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
                Click the circular button to transition into immediate project consultation, which lets outside renovation stress fade away as master Texas precision takes over.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenWizard('Carpentry', 'Custom Trim & Built-Ins')}
                  className="btn-apple-circle group"
                  aria-label="Request consultation for precision carpentry"
                  title="Explore & Get Estimate"
                >
                  <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-300 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: "Magical experience" (AirPods Max Section 3 DNA) */}
      <section className="relative py-24 sm:py-32 lg:py-40 border-t border-black/[0.05] dark:border-white/[0.06]">
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 select-none pointer-events-none text-[20vw] font-black text-black/[0.035] dark:text-white/[0.03] tracking-tighter leading-none whitespace-nowrap z-0 font-heading">
          MASTER
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Bold Title, Editorial Subtitle, Neumorphic Pill Button */}
            <div className="lg:col-span-5 space-y-7 text-left order-2 lg:order-1">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tighter text-neutral-950 dark:text-white leading-[1.02]">
                Magical<br />
                experience
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed font-normal">
                Steve's Handyman inherits all of the effortless, multi-trade mastery of 25+ years in Texas residential service. From setup to spotless cleanup, they make the home repair experience completely fluid — day to day, room to room.
              </p>

              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
                Complete kitchen trim, door hardware, drywall patches, and electrical fixtures installed with obsessive attention to aesthetic perfection.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenWizard()}
                  className="btn-apple-pill"
                >
                  Read More
                </button>
              </div>
            </div>

            {/* Right: Massive Architectural Finish Showcase */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-2xl rounded-[36px] overflow-hidden p-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-xl apple-floating-shadow border border-white dark:border-white/10 group">
                <div className="relative h-72 sm:h-96 md:h-[420px] rounded-[28px] overflow-hidden bg-neutral-900">
                  <img
                    src="/images/project-cabinets-complete.jpg"
                    alt="Finished luxury kitchen cabinetry and home transformation by Steve's Handyman"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
                  
                  {/* Floating Glass Specs Pill */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
                        Master Architectural Finish
                      </span>
                      <span className="text-xs sm:text-sm font-heading font-bold text-white">
                        Full Kitchen Cabinetry & Custom Trim Showcase
                      </span>
                    </div>
                    <button
                      onClick={() => onOpenWizard('Carpentry', 'Kitchen & Cabinet Upgrades')}
                      className="px-3.5 py-1.5 rounded-full bg-white text-black font-heading font-bold text-xs tracking-wide uppercase hover:bg-neutral-200 transition active:scale-95 cursor-pointer shrink-0"
                    >
                      Book ↗
                    </button>
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
