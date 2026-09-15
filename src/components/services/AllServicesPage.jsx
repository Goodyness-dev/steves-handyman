import React, { useState, useEffect } from 'react';
import { SERVICES, CATEGORIES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';

const SERVICE_IMAGES = {
  'custom-trim-carpentry': '/images/project-cabinets-laser.jpg',
  'drywall-repair-texture-matching': '/images/project-drywall-hallway.jpg',
  'interior-exterior-painting': '/images/project-cabinets-complete.jpg',
  'plumbing-fixture-upgrades': '/images/project-framing-drywall.jpg',
  'electrical-fixtures-fans': '/images/project-window-historic.jpg',
  'deck-patio-rot-restoration': '/images/project-exterior-renovation.jpg',
  'doors-windows-weatherproofing': '/images/project-window-install.jpg',
  'kitchen-bath-refresh': '/images/project-cabinets-complete.jpg',
  'home-punch-list-assembly': '/images/project-drywall-hallway.jpg',
  'tile-flooring-repair': '/images/project-cabinets-laser.jpg',
  'gutter-pressure-washing': '/images/project-exterior-front.jpg',
  'senior-safety-accessibility': '/images/project-framing-drywall.jpg'
};

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.subType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black dark:bg-onyx-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 pb-32 blueprint-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Return Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-12">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-neutral-800 px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition active:scale-95 cursor-pointer"
            aria-label="Back to Homepage"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Home</span>
          </button>

          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <span className="text-neutral-500 hidden sm:inline">Questions or Urgent Repair?</span>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="text-white font-bold hover:text-emerald-400 flex items-center space-x-2 transition"
            >
              <span>Call Steve: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            <span>Complete Trade Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-6xl font-black font-heading text-white tracking-tight">
            Handyman & Contractor Services
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Browse our full catalog of residential repair, carpentry, painting, plumbing fixtures, and punch-list solutions across Denison & Grayson County.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search e.g. drywall, ceiling fan, deck, faucet, doors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-6 rounded-full bg-neutral-900 border-2 border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition shadow-xl text-sm"
            />
            <svg className="w-5 h-5 text-neutral-500 absolute left-4.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid with Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const cardImg = SERVICE_IMAGES[service.id] || '/images/project-cabinets-laser.jpg';
            return (
              <article
                key={service.id}
                onClick={() => onOpenWizard(service.category, service.title)}
                className="card-thick card-thick-hover rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900 to-onyx-900 border-2 border-neutral-800 hover:border-neutral-600 flex flex-col justify-between cursor-pointer group"
              >
                {/* Real Job Photo Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={cardImg}
                    alt={`${service.title} - Steve's Handyman Denison TX`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                  <div className="absolute top-3 left-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-neutral-200">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-xl font-black font-heading text-white mb-1.5 group-hover:text-neutral-200 transition-colors">
                      {service.title}
                    </h2>
                    <h3 className="text-xs font-bold text-neutral-400 mb-3 uppercase tracking-wide">
                      {service.subType}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-semibold">
                      ✓ 1-Yr Warranty
                    </span>
                    <span className="text-xs font-heading font-black text-white group-hover:underline flex items-center gap-1">
                      Book Service →
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 card-thick rounded-3xl p-8 bg-neutral-900/50 border border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-2">No exact service matched "{searchQuery}"</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Steve handles virtually all custom residential home repair requests. Contact us directly for a custom quote!
            </p>
            <button
              onClick={() => onOpenWizard()}
              className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition cursor-pointer"
            >
              REQUEST CUSTOM QUOTE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
