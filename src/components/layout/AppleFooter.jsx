import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AppleFooter({ onOpenWizard, onNavigate }) {
  return (
    <footer className="w-full border-t border-[#e8decb] dark:border-[#38271a] bg-[#2b1a0e] text-[#e8decb] py-12 px-6 sm:px-12 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand logo & copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5 shadow-xs shrink-0">
            <img 
              src="/logo.png" 
              alt="Steve's Handyman Services Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-bold text-white">
                {BUSINESS_INFO.name}
              </span>
              <span className="text-[#a68261]">|</span>
              <span className="font-serif italic text-amber-200">
                “We do it right or not at all.”
              </span>
            </div>
            <p className="text-[11px] text-[#a68261] mt-0.5">
              Copyright © {new Date().getFullYear()} Steve's Handyman Services LLC. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right: Clean navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-[12px] font-semibold text-[#e8decb]">
          <button
            onClick={() => onNavigate && onNavigate('services')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => onOpenWizard()}
            className="hover:text-white transition-colors cursor-pointer text-amber-300 font-bold"
          >
            Get Estimate
          </button>
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="hover:text-white transition-colors"
          >
            {BUSINESS_INFO.phone}
          </a>
          <a
            href={BUSINESS_INFO.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            📍 Denison, TX 75020
          </a>
          <button
            onClick={() => onNavigate && onNavigate('admin')}
            className="text-[#a68261] hover:text-white transition-colors cursor-pointer"
          >
            Admin 🔐
          </button>
        </div>

      </div>
    </footer>
  );
}
