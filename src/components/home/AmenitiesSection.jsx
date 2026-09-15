import React from 'react';
import { AMENITIES_AVAILABLE, PAYMENT_METHODS } from '../../data/amenitiesData';

export default function AmenitiesSection({ onOpenWizard }) {
  return (
    <section id="amenities" className="py-24 sm:py-32 apple-canvas text-neutral-900 dark:text-white relative border-t border-black/[0.05] dark:border-white/[0.06] transition-colors duration-200" aria-labelledby="amenities-heading">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/80 dark:border-white/15 text-neutral-600 dark:text-neutral-300 text-xs font-semibold uppercase tracking-wider shadow-xs">
            <span>Guaranteed Peace Of Mind</span>
          </div>
          <h2 id="amenities-heading" className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-neutral-950 dark:text-white tracking-tighter leading-tight">
            Why Texoma Homeowners Trust Steve
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Hiring a contractor shouldn't be a gamble. We operate with radical transparency, total cleanliness, and ironclad craftsmanship guarantees on every project.
          </p>
        </div>

        {/* Apple Tactile 8-Pillar Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {AMENITIES_AVAILABLE.map((item, index) => (
            <div 
              key={item.name}
              className="rounded-[28px] p-7 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 apple-floating-shadow flex flex-col justify-between hover:scale-[1.02] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/20 flex items-center justify-center font-heading font-black text-xs text-neutral-900 dark:text-white">
                    0{index + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-950 dark:text-white mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment & Invoicing Badge Strip */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 apple-floating-shadow flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold block">
              Flexible Payment Options
            </span>
            <h4 className="text-xl font-bold font-heading text-neutral-950 dark:text-white">
              Transparent Billing & Instant Digital Invoicing
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              We accept Cash, Personal Checks, Credit Cards, Zelle, Venmo & Commercial HOA Invoicing.
            </p>
          </div>

          <button
            onClick={() => onOpenWizard()}
            className="btn-apple-pill whitespace-nowrap text-xs uppercase tracking-wider font-bold py-3.5 px-8 cursor-pointer"
          >
            Start An Estimate →
          </button>
        </div>

      </div>
    </section>
  );
}
