import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AppleFooter({ onOpenWizard, onNavigate }) {
  return (
    <footer className="w-full border-t border-black/[0.06] dark:border-white/[0.08] apple-canvas py-12 px-6 sm:px-12 text-neutral-500 dark:text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            Steve's Handyman LLC
          </span>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
          <span>Copyright © {new Date().getFullYear()} All rights reserved.</span>
        </div>

        {/* Right: Clean links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[12px]">
          <button
            onClick={() => onNavigate && onNavigate('services')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Products
          </button>
          <button
            onClick={() => onOpenWizard()}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Prices
          </button>
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {BUSINESS_INFO.phone}
          </a>
          <span className="text-neutral-400">Denison, TX 75020</span>
          <button
            onClick={() => onNavigate && onNavigate('admin')}
            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Admin
          </button>
        </div>

      </div>
    </footer>
  );
}
