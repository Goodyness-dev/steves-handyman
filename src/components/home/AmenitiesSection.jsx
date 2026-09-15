import React from 'react';
import { AMENITIES_AVAILABLE, PAYMENT_METHODS } from '../../data/amenitiesData';

export default function AmenitiesSection({ onOpenWizard }) {
  return (
    <section id="amenities" className="py-24 sm:py-32 bg-black dark:bg-onyx-950 text-white relative border-t border-neutral-900 blueprint-grid" aria-labelledby="amenities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Guaranteed Peace Of Mind</span>
          </div>
          <h2 id="amenities-heading" className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Why Texoma Homeowners Trust Steve
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Hiring a contractor shouldn't be a gamble. We operate with radical transparency, total cleanliness, and ironclad craftsmanship guarantees on every project.
          </p>
        </div>

        {/* Thick & Alive 8-Pillar Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {AMENITIES_AVAILABLE.map((item, index) => (
            <div 
              key={item.name}
              className="card-thick card-thick-hover rounded-3xl p-7 bg-gradient-to-b from-neutral-900 to-onyx-900 border-2 border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-heading font-black text-xs text-white">
                    0{index + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <h3 className="font-heading font-black text-lg text-white mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment & Invoicing Badge Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/40 border-2 border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="space-y-1 text-left">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block">
              Flexible Payment Options
            </span>
            <h4 className="text-xl font-bold font-heading text-white">
              Transparent Billing & Instant Digital Invoicing
            </h4>
            <p className="text-xs text-neutral-400">
              We accept Cash, Personal Checks, Credit Cards, Zelle, Venmo & Commercial HOA Invoicing.
            </p>
          </div>

          <button
            onClick={() => onOpenWizard()}
            className="whitespace-nowrap px-8 py-3.5 rounded-full bg-white text-black font-heading font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-neutral-200 transition shadow-xl active:scale-95"
          >
            START AN ESTIMATE ↗
          </button>
        </div>

      </div>
    </section>
  );
}
