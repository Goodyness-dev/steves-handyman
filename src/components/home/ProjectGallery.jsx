import React, { useState } from 'react';
import { PROJECTS_GALLERY } from '../../data/projectsData';

export default function ProjectGallery({ onOpenWizard }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImageModal, setActiveImageModal] = useState(null);

  const categories = ['All', 'Cabinetry & Kitchen', 'Framing & Drywall', 'Windows & Exterior'];

  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS_GALLERY 
    : PROJECTS_GALLERY.filter(p => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-slate-50 dark:bg-onyx-950 text-neutral-900 dark:text-white relative border-t border-neutral-200/90 dark:border-neutral-900 blueprint-grid transition-colors duration-200" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Real Local Job Site Photography</span>
            </div>
            <h2 id="gallery-heading" className="text-3xl sm:text-5xl font-black font-heading text-neutral-950 dark:text-white tracking-tight">
              Recent Projects Across Denison & Texoma
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
              Real work from real Grayson County homes. From laser-leveled kitchen cabinetry to full exterior window replacements and structural drywall repairs.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-black shadow-md scale-105'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Thick & Alive Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setActiveImageModal(project)}
              className="card-thick card-thick-hover group rounded-3xl bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-onyx-900 border-2 border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              {/* Image Container with Smooth Hover Scale */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                <img
                  src={project.image}
                  alt={`${project.title} - Steve's Handyman Denison TX`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wide">
                    📍 {project.location}
                  </span>
                </div>

                {/* Enlarge Indicator */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-7 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-black text-lg text-neutral-950 dark:text-white mb-2 leading-snug group-hover:text-emerald-700 dark:group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {project.scope}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Verified Local Job</span>
                  <span className="text-neutral-800 dark:text-neutral-300 font-bold group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Full-Screen Image Modal */}
        {activeImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div 
              className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity cursor-pointer"
              onClick={() => setActiveImageModal(null)}
            />
            
            <div className="relative w-full max-w-3xl card-thick rounded-3xl bg-white dark:bg-onyx-950 border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden z-10 shadow-2xl">
              <div className="relative h-80 sm:h-[450px] w-full bg-neutral-950">
                <img
                  src={activeImageModal.image}
                  alt={activeImageModal.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setActiveImageModal(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-black border border-white/20 transition cursor-pointer"
                  aria-label="Close image preview"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      {activeImageModal.category}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-xs text-neutral-500">📍 {activeImageModal.location}</span>
                  </div>
                  <h4 className="font-heading font-black text-xl text-neutral-950 dark:text-white">
                    {activeImageModal.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-xl">
                    {activeImageModal.scope}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const cat = activeImageModal.category;
                    const title = activeImageModal.title;
                    setActiveImageModal(null);
                    onOpenWizard(cat, title);
                  }}
                  className="px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-heading font-black text-xs uppercase tracking-wider transition active:scale-95 shrink-0 shadow-md cursor-pointer"
                >
                  Quote Similar Job ↗
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
