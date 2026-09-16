import React, { useState } from 'react';
import { quotesApi } from '../../services/api';

const HANDYMAN_CATEGORIES = [
  'Custom Carpentry & Trim Work',
  'Drywall Repair & Texture Matching',
  'Interior & Exterior Painting',
  'Plumbing Fixtures & Minor Repairs',
  'Lighting, Ceiling Fans & Electrical',
  'Deck Restoration, Fencing & Rot Repair',
  'Doors, Windows & Weatherproofing',
  'General Punch-List & Home Maintenance'
];

export default function NewOrderModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Denison, TX',
    serviceCategory: 'Custom Carpentry & Trim Work',
    detailedService: '',
    details: '',
    timeline: 'Within 1-2 Weeks',
    materialsProvided: 'Steve to Supply Materials'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || (!formData.email.trim() && !formData.phone.trim())) {
      setError('Please provide customer name and at least a phone number or email.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        id: `SH-${Math.floor(100000 + Math.random() * 900000)}`,
        customer_name: formData.name.trim(),
        customer_phone: formData.phone.trim() || '(903) 465-2244',
        customer_email: formData.email.trim() || 'homeowner@texoma.com',
        location: formData.location.trim(),
        service_category: formData.serviceCategory,
        detailed_service: formData.detailedService.trim() || formData.serviceCategory,
        details: `${formData.details} [Materials: ${formData.materialsProvided}]`,
        urgency: formData.timeline,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const res = await quotesApi.submitPublicQuote(payload);
      if (onCreated) onCreated(res.quote || payload);
      onClose();
    } catch (err) {
      setError(err.data?.error || err.message || 'Failed to record work order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#0d1017] border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-auto text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold text-base shadow-sm">
              +
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-heading text-slate-900 dark:text-white leading-tight">
                Record Manual Work Order
              </h2>
              <p className="text-xs text-slate-400 dark:text-neutral-500">
                Log phone calls, text inquiries, or in-person walk-in requests.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                Homeowner Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="First & Last Name"
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(903) 465-XXXX"
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
              />
            </div>
          </div>

          {/* Email & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="homeowner@gmail.com"
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                Property Address / Town
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. 412 W Main St, Denison, TX"
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
              />
            </div>
          </div>

          {/* Trade / Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Trade / Service Category
            </label>
            <select
              value={formData.serviceCategory}
              onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            >
              {HANDYMAN_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Specific Task */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Specific Task / Job Headline
            </label>
            <input
              type="text"
              value={formData.detailedService}
              onChange={(e) => setFormData({ ...formData, detailedService: e.target.value })}
              placeholder="e.g., Crown molding installation in living room (approx 45 lin ft)"
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition"
            />
          </div>

          {/* Project Details */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
              Scope of Work & Notes
            </label>
            <textarea
              rows={3}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Room condition, dimensions, existing paint/trim type, access notes, or homeowner requests..."
              className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition resize-none"
            />
          </div>

          {/* Timeline & Materials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                Requested Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
              >
                <option value="Immediate / Urgent">Immediate / Urgent</option>
                <option value="This Week">This Week</option>
                <option value="Within 1-2 Weeks">Within 1-2 Weeks</option>
                <option value="Flexible / Routine">Flexible / Routine</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1">
                Materials Provision
              </label>
              <select
                value={formData.materialsProvided}
                onChange={(e) => setFormData({ ...formData, materialsProvided: e.target.value })}
                className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white"
              >
                <option value="Steve to Supply Materials">Steve to Supply Materials</option>
                <option value="Homeowner Has Materials On-Site">Homeowner Has Materials On-Site</option>
                <option value="Needs Site Measurement First">Needs Site Measurement First</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 font-bold text-xs transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-slate-950 font-bold text-xs transition shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Saving Order...' : 'Create Work Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
