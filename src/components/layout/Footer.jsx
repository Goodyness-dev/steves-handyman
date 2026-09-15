import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'services') {
      if (onNavigate) onNavigate('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (target === 'admin') {
      if (onNavigate) onNavigate('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-white dark:bg-onyx-950 text-neutral-600 dark:text-neutral-400 text-sm pb-16 sm:pb-0 border-t border-neutral-200/90 dark:border-neutral-900 transition-colors duration-200" role="contentinfo">
      
      {/* High-Impact Pre-footer Bar */}
      <div className="bg-slate-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-2xl sm:text-4xl font-black font-heading text-neutral-950 dark:text-white tracking-tight">
              Ready to fix, build, or refresh your home?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
              Get an honest upfront estimate with zero obligation. Call or submit photos online.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto shrink-0">
            <button
              onClick={() => onOpenWizard()}
              className="px-8 py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-heading font-black text-xs sm:text-sm tracking-wider uppercase transition shadow-md active:scale-95 cursor-pointer"
            >
              REQUEST A QUOTE ↗
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="px-7 py-4 rounded-full bg-white hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-900 dark:text-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase border border-neutral-300 dark:border-white/20 transition flex items-center gap-2.5 active:scale-95 shadow-xs"
            >
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Brand & Monogram */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-950 dark:bg-neutral-800 border border-neutral-800 dark:border-white/20 flex items-center justify-center font-heading font-black text-xs text-white shadow-xs">
              S
            </div>
            <div className="w-8 h-8 rounded-lg bg-neutral-950 dark:bg-neutral-800 border border-neutral-800 dark:border-white/20 flex items-center justify-center font-heading font-black text-xs text-white shadow-xs">
              H
            </div>
            <span className="font-heading font-black text-neutral-950 dark:text-white text-base tracking-wider uppercase ml-1">
              STEVE'S HANDYMAN
            </span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Multi-trade contractor and master handyman serving Denison, Sherman, Pottsboro, and Lake Texoma with precision repairs and transparent pricing.
          </p>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Licensed & Insured • 1-Year Craftsmanship Guarantee</span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h4 className="text-neutral-950 dark:text-white font-heading font-bold text-xs uppercase tracking-widest mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {[
              { label: 'All Services Catalog', target: 'services' },
              { label: '📸 Real Project Gallery', target: '#gallery' },
              { label: 'Craftsmanship Story', target: '#about' },
              { label: 'Contractor Guarantees', target: '#amenities' },
              { label: 'Service Areas & Hours', target: '#location' },
              { label: 'Customer Reviews', target: '#reviews' },
              { label: '🔐 Steve\'s Admin Portal', target: 'admin' },
            ].map(link => (
              <li key={link.label}>
                <button 
                  onClick={(e) => handleLinkClick(e, link.target)} 
                  className="hover:text-neutral-950 dark:hover:text-white transition text-neutral-600 dark:text-neutral-400 hover:underline text-left cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Core Service Pillars */}
        <div>
          <h4 className="text-neutral-950 dark:text-white font-heading font-bold text-xs uppercase tracking-widest mb-4">
            Specialties
          </h4>
          <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <li>• Finish Trim & Crown Molding</li>
            <li>• Drywall Water Damage & Texturing</li>
            <li>• Plumbing & Electrical Fixtures</li>
            <li>• Deck Restoration & Rot Repair</li>
            <li>• Interior & Exterior Paint Prep</li>
            <li>• Inspection Punch-List Odd Jobs</li>
          </ul>
        </div>

        {/* Col 4: Contact & Dispatch */}
        <div className="space-y-3">
          <h4 className="text-neutral-950 dark:text-white font-heading font-bold text-xs uppercase tracking-widest mb-4">
            Denison Dispatch Hub
          </h4>
          <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
            <p className="text-neutral-950 dark:text-white font-bold">{BUSINESS_INFO.legalName}</p>
            <p>{BUSINESS_INFO.address.formatted}</p>
            <p className="pt-1 font-bold text-neutral-950 dark:text-white">Call Steve: {BUSINESS_INFO.phone}</p>
            <p>Mon – Fri: 7:30 AM – 6:00 PM</p>
            <p>Sat: 8:00 AM – 3:00 PM (By Appt)</p>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-neutral-200 dark:border-neutral-900 py-6 px-4 text-center text-xs text-neutral-500 dark:text-neutral-600">
        <p>© {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved. Locally owned and operated in Grayson County, Texas.</p>
      </div>

    </footer>
  );
}
