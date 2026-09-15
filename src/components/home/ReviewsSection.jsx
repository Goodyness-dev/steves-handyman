import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ReviewsSection({ onOpenWizard }) {
  return (
    <section id="reviews" className="py-24 sm:py-32 bg-black dark:bg-onyx-950 text-white relative border-t border-neutral-900" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Verified Customer Feedback</span>
          </div>
          <h2 id="reviews-heading" className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            5.0 Stars Across Denison & Grayson County
          </h2>
          <div className="flex items-center justify-center space-x-2 text-amber-400 text-lg">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i}>{s}</span>
            ))}
            <span className="text-sm text-neutral-400 font-semibold ml-2">
              (Yelp & Google Verified Ratings)
            </span>
          </div>
        </div>

        {/* Thick & Alive Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BUSINESS_INFO.reviews.map((rev, idx) => (
            <article
              key={idx}
              className="card-thick card-thick-hover rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-neutral-900 to-onyx-900 border-2 border-neutral-800 flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Source */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex text-amber-400 text-base tracking-wider" aria-label={`${rev.rating} out of 5 stars`}>
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-xs font-bold text-neutral-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {rev.source}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-6 border-t border-neutral-800/80 flex justify-between items-center">
                <div>
                  <h3 className="font-heading font-black text-white text-base sm:text-lg">
                    {rev.author}
                  </h3>
                  <span className="text-neutral-400 text-xs font-medium">
                    {rev.location}
                  </span>
                </div>
                <span className="text-neutral-500 text-xs">
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
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-heading font-black text-xs sm:text-sm tracking-wider uppercase transition shadow-2xl active:scale-95"
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
