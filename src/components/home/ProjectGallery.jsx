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
    <section id="gallery" className="py-24 sm:py-32 bg-onyx-950 text-white relative border-t border-neutral-900 blueprint-grid" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Real Local Job Site Photography</span>
            </div>
            <h2 id="gallery-heading" className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              Recent Projects Across Denison & Texoma
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
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
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-600'
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
              className="card-thick card-thick-hover group rounded-3xl bg-gradient-to-b from-neutral-900 to-onyx-900 border-2 border-neutral-800 hover:border-neutral-600 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Image Container with Smooth Hover Scale */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
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
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-black text-lg text-white mb-2 leading-snug group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2">
                    {project.scope}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                  <span className="text-emerald-400 font-medium">✓ Verified Local Job</span>
                  <span className="text-neutral-300 font-bold group-hover:text-white group-hover:underline">
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
              className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity cursor-pointer"
              onClick={() => setActiveImageModal(null)}
            />
            
            <div className="relative w-full max-w-3xl card-thick rounded-3xl bg-onyx-950 border-2 border-neutral-700 overflow-hidden z-10 shadow-2xl">
              <div className="relative h-80 sm:h-[450px] w-full bg-black">
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
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-neutral-300">
                    {activeImageModal.category}
                  </span>
                  <span className="text-xs text-neutral-400">
                    Location: <strong className="text-white">{activeImageModal.location}</strong>
                  </span>
                </div>

                <h4 className="font-heading font-black text-xl sm:text-2xl text-white">
                  {activeImageModal.title}
                </h4>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activeImageModal.scope}
                </p>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                  <strong className="text-white block mb-1">Craftsmanship Highlight:</strong>
                  {activeImageModal.details}
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      setActiveImageModal(null);
                      onOpenWizard(activeImageModal.category, activeImageModal.title);
                    }}
                    className="w-full py-3.5 rounded-full bg-white text-black font-heading font-black text-xs uppercase tracking-wider hover:bg-neutral-200 transition shadow-xl cursor-pointer"
                  >
                    REQUEST A SIMILAR PROJECT ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
