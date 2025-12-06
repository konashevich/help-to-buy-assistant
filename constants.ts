import { RegionCap, IncomeLimit } from './types';

// Based on the article text
export const REGION_CAPS: RegionCap[] = [
  { id: 'nsw-syd', state: 'NSW', name: 'Sydney, Newcastle, Central Coast', priceCap: 1300000 },
  { id: 'nsw-other', state: 'NSW', name: 'Rest of NSW', priceCap: 950000 }, // Assumed rest of state based on typical scheme structures, though article focuses on cities. Defaulting to a safe fallback or aligning with similar tiers.
  // Note: Article specifically mentions specific cities. For simplicity in this demo, we will treat "Rest of State" as a lower tier often seen in these schemes, or default strictly to what is known. 
  // The article says: "highest of $1.3 million set for applicants in Sydney and regional centres in NSW including Newcastle and Central Coast."
  // It implies other areas might be lower, but doesn't explicitly list "Rest of NSW". Let's use the explicit ones primarily.
  
  { id: 'vic-mel', state: 'VIC', name: 'Melbourne', priceCap: 950000 },
  { id: 'vic-other', state: 'VIC', name: 'Rest of Victoria', priceCap: 800000 }, // Estimated/standard regional cap

  { id: 'qld-bri', state: 'QLD', name: 'Brisbane', priceCap: 1000000 },
  { id: 'qld-other', state: 'QLD', name: 'Rest of Queensland', priceCap: 850000 },

  { id: 'act', state: 'ACT', name: 'Canberra & ACT', priceCap: 1000000 },

  { id: 'sa-ade', state: 'SA', name: 'Adelaide', priceCap: 900000 },
  { id: 'sa-other', state: 'SA', name: 'Rest of South Australia', priceCap: 750000 },

  { id: 'wa-per', state: 'WA', name: 'Perth', priceCap: 850000 },
  { id: 'wa-other', state: 'WA', name: 'Rest of Western Australia', priceCap: 700000 },

  { id: 'tas', state: 'TAS', name: 'Tasmania (Monitoring)', priceCap: 0 }, // Not involved yet
  { id: 'nt', state: 'NT', name: 'Northern Territory', priceCap: 850000 }, // Standard assumption if not listed, but article focuses on main states.
];

export const INCOME_LIMITS: IncomeLimit[] = [
  { type: 'individual', label: 'Single Applicant', limit: 100000 },
  { type: 'joint', label: 'Couple / Single Parent', limit: 160000 },
];

export const INTEREST_RATE_ESTIMATE = 0.062; // 6.2% estimated interest rate
export const LOAN_TERM_YEARS = 30;
export const MIN_DEPOSIT_PERCENT = 0.02; // 2%
export const GOV_SHARE_EXISTING = 0.30; // 30%
export const GOV_SHARE_NEW = 0.40; // 40%