import React from 'react';
import { SERVICES } from '../../data/servicesData';

const SERVICE_IMAGES = {
  'custom-trim-carpentry': '/images/project-cabinets-laser.jpg',
  'drywall-repair-texture-matching': '/images/project-drywall-hallway.jpg',
  'interior-exterior-painting': '/images/project-cabinets-complete.jpg',
  'plumbing-fixture-upgrades': '/images/project-framing-drywall.jpg',
  'electrical-fixtures-fans': '/images/project-window-historic.jpg',
  'deck-patio-rot-restoration': '/images/project-exterior-renovation.jpg',
};

export default function ServicesSection({ onOpenWizard, onViewAllServices }) {
  const featuredServices = SERVICES.slice(0, 6);

  return (
    <section id="services" className="py-24 sm:py-32 bg-white dark:bg-onyx-950 text-neutral-900 dark:text-white relative blueprint-grid transition-colors duration-200" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider">
              <span>Multi-Trade Residential Solutions</span>
            </div>
            <h2 id="services-heading" className="text-3xl sm:text-5xl font-black font-heading text-neutral-950 dark:text-white tracking-tight">
              Engineered Craftsmanship For Every Room
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
              No project too meticulous, no repair too troublesome. We bring commercial-grade tools, honest upfront flat pricing, and clean work habits to every Denison home.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <a
              href="#gallery"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase border border-neutral-300/80 dark:border-white/20 transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <span>SEE JOB PHOTOS</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </a>

            <button
              onClick={onViewAllServices}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-heading font-black text-xs sm:text-sm tracking-wider uppercase transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <span>ALL SERVICES</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thick & Alive Bento Grid Service Cards with Real Job Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => {
            const cardImg = SERVICE_IMAGES[service.id] || '/images/project-cabinets-laser.jpg';
            return (
              <article
                key={service.id}
                onClick={() => onOpenWizard(service.category, service.title)}
                className="card-thick card-thick-hover group rounded-3xl bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-onyx-900 border-2 border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between cursor-pointer relative shadow-sm hover:shadow-xl transition-all"
              >
                {/* Photo Top Header */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={cardImg}
                    alt={`${service.title} - Steve's Handyman Denison TX`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-bold text-neutral-200">
                      {service.category}
                    </span>
                  </div>

                  {/* Arrow Action */}
                  <div className="absolute bottom-3 right-4 w-9 h-9 rounded-full bg-white/90 group-hover:bg-neutral-950 text-neutral-900 group-hover:text-white dark:bg-white/10 dark:group-hover:bg-white dark:text-neutral-300 dark:group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-md">
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-black font-heading text-neutral-950 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-neutral-100 transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wide">
                      {service.subType}
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-5 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Warranty Covered
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform font-bold text-neutral-800 dark:text-neutral-200">
                      Request Quote →
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mid-Section Callout Bar */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-neutral-100 dark:bg-neutral-900/60 border-2 border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>Got Multiple Fixes on a Punch-List?</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-neutral-950 dark:text-white">
              Bundle Small Repairs Into a Single Half-Day or Full-Day Visit
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm max-w-2xl">
              Save time and money by letting Steve knock out drywall patches, doors that won't latch, ceiling fans, and leaky faucets in one streamlined trip.
            </p>
          </div>

          <button
            onClick={() => onOpenWizard('Multiple Repairs', 'Punch-List Half-Day Package')}
            className="px-8 py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-heading font-black text-xs sm:text-sm tracking-wider uppercase transition shadow-md active:scale-95 shrink-0 cursor-pointer"
          >
            SCHEDULE PUNCH LIST ↗
          </button>
        </div>

      </div>
    </section>
  );
}
