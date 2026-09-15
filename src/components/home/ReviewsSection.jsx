import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ReviewsSection({ onOpenWizard }) {
  return (
    <section id="reviews" className="py-24 sm:py-32 bg-slate-50 dark:bg-onyx-950 text-neutral-900 dark:text-white relative border-t border-neutral-200/90 dark:border-neutral-900 transition-colors duration-200" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Verified Customer Feedback</span>
          </div>
          <h2 id="reviews-heading" className="text-3xl sm:text-5xl font-black font-heading text-neutral-950 dark:text-white tracking-tight">
            5.0 Stars Across Denison & Grayson County
          </h2>
          <div className="flex items-center justify-center space-x-2 text-amber-500 text-lg">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i}>{s}</span>
            ))}
            <span className="text-sm text-neutral-600 dark:text-neutral-400 font-semibold ml-2">
              (Yelp & Google Verified Ratings)
            </span>
          </div>
        </div>

        {/* Thick & Alive Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BUSINESS_INFO.reviews.map((rev, idx) => (
            <article
              key={idx}
              className="card-thick card-thick-hover rounded-3xl p-8 sm:p-10 bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-onyx-900 border-2 border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
            >
              <div>
                {/* Header: Stars & Source */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex text-amber-500 text-base tracking-wider" aria-label={`${rev.rating} out of 5 stars`}>
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {rev.source}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex justify-between items-center">
                <div>
                  <h3 className="font-heading font-black text-neutral-950 dark:text-white text-base sm:text-lg">
                    {rev.author}
                  </h3>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium">
                    {rev.location}
                  </span>
                </div>
                <span className="text-neutral-400 dark:text-neutral-500 text-xs font-medium">
                  {rev.date}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onOpenWizard()}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-heading font-black text-xs sm:text-sm tracking-wider uppercase transition shadow-md active:scale-95 cursor-pointer"
          >
            <span>JOIN OUR SATISFIED CLIENTS — GET A QUOTE</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
