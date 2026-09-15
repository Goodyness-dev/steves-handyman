import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutSection({ onOpenWizard }) {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white dark:bg-onyx-950 text-neutral-900 dark:text-white relative border-t border-neutral-200/90 dark:border-neutral-900 transition-colors duration-200" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Story & Real Job Site Photos */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real Project Photo Stack */}
            <div className="relative">
              <div className="card-thick rounded-3xl overflow-hidden border-2 border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 shadow-xl group">
                <img
                  src="/images/project-cabinets-laser.jpg"
                  alt="Steve Miller laser leveling custom kitchen cabinets in Denison TX"
                  loading="lazy"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-bold">
                    📍 On Site: Denison, TX
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Laser-Leveled Tolerance
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
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-md active:scale-95 cursor-pointer"
              >
                <span>CONSULT WITH STEVE</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
