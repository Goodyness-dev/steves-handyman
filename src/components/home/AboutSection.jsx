import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutSection({ onOpenWizard }) {
  return (
    <section id="about" className="py-24 sm:py-32 apple-canvas text-neutral-900 dark:text-white relative border-t border-black/[0.05] dark:border-white/[0.06] transition-colors duration-200" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Story & Real Job Site Photos */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real Project Photo Stack */}
            <div className="relative">
              <div className="rounded-[32px] overflow-hidden border border-white dark:border-white/10 bg-neutral-900 apple-floating-shadow group p-1 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
                <img
                  src="/images/project-cabinets-laser.jpg"
                  alt="Steve Miller laser leveling custom kitchen cabinets in Denison TX"
                  loading="lazy"
                  className="w-full h-80 sm:h-96 object-cover rounded-[26px] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-1 rounded-[26px] bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 font-bold">
                    📍 On Site: Denison, TX
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Laser Tolerance
                  </span>
                </div>
              </div>

              {/* Inset Secondary Real Photo Thumbnail */}
              <div className="hidden sm:block absolute -top-6 -right-6 w-36 h-36 rounded-2xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-700 shadow-2xl z-10 bg-neutral-900">
                <img
                  src="/images/project-framing-drywall.jpg"
                  alt="Structural stud framing and electrical"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="card-thick rounded-2xl p-5 bg-slate-50 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-onyx-900 border-2 border-neutral-200/90 dark:border-neutral-800 flex items-center justify-between shadow-xs">
              <div>
                <span className="font-heading font-black text-2xl text-neutral-950 dark:text-white block">25+ Years</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider">Hands-On Mastery</span>
              </div>
              <div className="w-[1px] h-8 bg-neutral-300 dark:bg-neutral-800" />
              <div>
                <span className="font-heading font-black text-neutral-950 dark:text-white block">2,400+</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider">Texoma Jobs</span>
              </div>
              <div className="w-[1px] h-8 bg-neutral-300 dark:bg-neutral-800" />
              <div>
                <span className="font-heading font-black text-emerald-600 dark:text-emerald-400 block">365 Days</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider">Labor Warranty</span>
              </div>
            </div>

          </div>

          {/* Right Column: Founder Quote & Heritage Details */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider">
                <span>The Steve's Handyman Difference</span>
              </div>
              <h2 id="about-heading" className="text-3xl sm:text-5xl font-black font-heading text-neutral-950 dark:text-white tracking-tight leading-tight">
                Respect For Your Home. Pride In Every Nail.
              </h2>
            </div>

            {/* Founder Quote Block */}
            <div className="p-8 rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/50 border-2 border-neutral-200/90 dark:border-neutral-800/80 relative">
              <svg className="w-8 h-8 text-neutral-400 dark:text-neutral-600 mb-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-neutral-800 dark:text-neutral-300 text-base sm:text-lg italic leading-relaxed">
                "{BUSINESS_INFO.owner.quote}"
              </p>
              <div className="mt-4 text-sm font-bold text-neutral-950 dark:text-white font-heading tracking-wide">
                — {BUSINESS_INFO.owner.name}, <span className="text-neutral-500 dark:text-neutral-400 font-normal">{BUSINESS_INFO.owner.role}</span>
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
              Steve Miller didn't learn home repair from YouTube tutorials. He trained as an apprentice cabinetmaker and residential framer, honing the exact tolerances required for plumb framing, tight mitered trim, and rock-solid mechanical installations.
            </p>

            {/* Guarantees List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-300">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-onyx-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Licensed & $1M General Liability Insured</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-onyx-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Shoe covers & HEPA vacuum dust cleanup</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-onyx-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Upfront fixed pricing with zero surprises</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-onyx-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>All labor backed by 1-Year Guarantee</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-2">
              <button
                onClick={() => onOpenWizard()}
                className="btn-apple-pill py-3.5 px-8 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <span>Consult With Steve →</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
