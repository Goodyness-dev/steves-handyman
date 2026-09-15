import React from 'react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard }) {
  const shopOpen = isOpenNow();
  const currentDayIndex = new Date().getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];

  const serviceTowns = [
    'Denison, TX (Primary Hub)',
    'Sherman, TX',
    'Pottsboro, TX',
    'Lake Texoma Shoreline',
    'Whitesboro, TX',
    'Van Alstyne, TX',
    'Howe, TX',
    'Bells & Savoy, TX'
  ];

  return (
    <section id="location" className="py-24 sm:py-32 bg-white dark:bg-onyx-950 text-neutral-900 dark:text-white relative border-t border-neutral-200/90 dark:border-neutral-900 blueprint-grid transition-colors duration-200" aria-labelledby="location-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Service Territory & Availability</span>
          </div>
          <h2 id="location-heading" className="text-3xl sm:text-5xl font-black font-heading text-neutral-950 dark:text-white tracking-tight">
            Serving Denison & The Texoma Region
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
            We bring our mobile service van right to your driveway equipped with professional trade tooling, hardware inventory, and dust containment gear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hours Card */}
          <div className="lg:col-span-5 card-thick rounded-3xl p-8 sm:p-10 bg-slate-50 dark:bg-gradient-to-b dark:from-neutral-900 dark:to-onyx-900 border-2 border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between shadow-sm">
            <div>
              {/* Open/Closed Badge */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 mb-6 shadow-xs">
                <div className="flex items-center space-x-3.5">
                  <span className={`w-3.5 h-3.5 rounded-full ${shopOpen ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
                  <div>
                    <span className={`font-heading font-black text-base block ${shopOpen ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-800 dark:text-neutral-300'}`}>
                      {shopOpen ? 'Technician On Duty Today' : 'After Hours • Quotes Active'}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Today is {currentDayName}</span>
                  </div>
                </div>
              </div>

              {/* Weekly Hours */}
              <div>
                <h3 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
                  Operating Hours & Dispatch Schedule
                </h3>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800/80 text-sm">
                  {BUSINESS_INFO.hours.map((h) => {
                    const isToday = h.day.toLowerCase() === currentDayName.toLowerCase();
                    return (
                      <div
                        key={h.day}
                        className={`py-2.5 px-3 flex justify-between items-center rounded-xl transition-colors ${
                          isToday ? 'bg-neutral-950 text-white dark:bg-white/10 dark:text-white font-bold' : 'text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {h.day}
                          {isToday && (
                            <span className="text-[10px] uppercase px-2 py-0.5 rounded-md bg-white text-neutral-950 dark:bg-white dark:text-black font-black">
                              Today
                            </span>
                          )}
                        </span>
                        <div className="text-right">
                          <span className={h.open === 'Closed' ? 'text-neutral-400 dark:text-neutral-500 font-medium' : isToday ? 'text-white' : 'text-neutral-800 dark:text-neutral-200'}>
                            {h.open === 'Closed' ? 'Closed (Emergency On-Call)' : `${h.open} – ${h.close}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Direct Phone link */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 mt-6">
              <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold block mb-1">
                Direct Dispatch & Quotes
              </span>
              <a 
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} 
                className="font-heading font-black text-2xl text-neutral-950 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-2"
              >
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>

          </div>

          {/* Service Area Grid Card */}
          <div className="lg:col-span-7 card-thick rounded-3xl p-8 sm:p-10 bg-slate-50 dark:bg-gradient-to-b dark:from-neutral-900 dark:to-onyx-900 border-2 border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                  Coverage Radius
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  Zero Travel Surcharge in Grayson Co.
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-heading text-neutral-950 dark:text-white mb-4">
                Primary Cities & Communities Served
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Whether you live in historic downtown Denison, a lakeside cabin on Lake Texoma, or a family home in Sherman, Steve provides on-time, fully equipped handyman and remodeling services.
              </p>

              {/* Towns List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {serviceTowns.map((town) => (
                  <div key={town} className="p-3 rounded-xl bg-white dark:bg-black/40 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 font-medium shadow-xs">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{town}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Embed or Direct Directions Link */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Operating locally out of Denison, TX 75020.
              </span>
              <button
                onClick={() => onOpenWizard()}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-heading font-black text-xs uppercase tracking-wider transition shadow-md active:scale-95 cursor-pointer"
              >
                CHECK MY ADDRESS ↗
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
