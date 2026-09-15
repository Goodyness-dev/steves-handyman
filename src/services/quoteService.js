/**
 * Quote Submission Service for Steve's Handyman LLC
 */

import { quotesApi } from './api';

export const formatQuoteSummary = (data) => {
  return {
    submittedAt: new Date().toLocaleString(),
    id: `SH-${Date.now().toString().slice(-6)}`,
    customer: {
      name: data.name,
      email: data.email || 'Not provided',
      phone: data.phone || 'Not provided',
      address: data.address || 'Denison / Grayson County area',
    },
    project: {
      category: data.serviceCategory || 'General Handyman',
      taskType: data.taskType || data.detailedService || 'General Repair',
      propertyType: data.propertyType || 'Residential',
      locationInHome: data.locationInHome || 'Interior',
      description: data.description || data.details || 'None provided',
    },
    timing: {
      urgency: data.urgency || data.timeline || 'This Week',
      preferredDate: data.preferredDate || data.specificDate || 'Flexible',
    }
  };
};

export const submitQuoteRequest = async (rawData) => {
  const quote = formatQuoteSummary(rawData);

  console.group('%c 🔨 STEVE\'S HANDYMAN — NEW QUOTE REQUEST! ', 'background: #000000; color: #ffffff; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
  console.log('Quote Summary:', quote);
  console.log('Raw Form Data:', rawData);
  console.groupEnd();

  // Persist locally in localStorage
  try {
    const existing = JSON.parse(localStorage.getItem('steves_handyman_quotes') || '[]');
    existing.unshift(quote);
    localStorage.setItem('steves_handyman_quotes', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }

  // Attempt backend persistence if server is running
  try {
    await quotesApi.submitPublicQuote({
      id: quote.id,
      name: quote.customer.name,
      email: quote.customer.email,
      phone: quote.customer.phone,
      location: quote.customer.address,
      serviceCategory: quote.project.category,
      detailedService: quote.project.taskType,
      details: quote.project.description,
      timeline: quote.timing.urgency,
      specificDate: quote.timing.preferredDate
    });
  } catch (backendErr) {
    // Graceful offline fallback
  }

  await new Promise(resolve => setTimeout(resolve, 400));

  return {
    success: true,
    quoteId: quote.id,
    data: quote
  };
};
