export const CONFIG = {
  LOCALE: 'en-NG',
  CURRENCY: 'NGN',
  CURRENT_YEAR: new Date().getFullYear(), // Dynamic now
  MIN_SQFT: 100,
  MAX_SQFT: 10000,
  MAX_AGE: 80,
  MAX_PARKING: 10,
  AGENT_FEE: 0.1,
  LEGAL_FEE: 0.15,
  SQM_TO_SQFT: 10.764,
  PROPERTY_TYPE_OPTIONS: ['Apartment','Duplex','Bungalow','Villa','Penthouse','Terrace','Self-Contain','Mini Flat'],
  BEDROOM_OPTIONS: ['1','2','3','4','5+'],
  FURNISHING_OPTIONS: ['Unfurnished','Partly Furnished','Fully Furnished'],
  POWER_OPTIONS: ['PHCN Only','Inverter Backup','Estate Generator','24/7 Power'],
  ESTATE_TYPE_OPTIONS: ['Standalone','Mini Estate','Gated Estate','High-Rise'],
  PAYMENT_TERMS_OPTIONS: ['Monthly','Quarterly','1 Year Upfront','2 Years Upfront'],
  FURNISHING_SCORES: { 'Unfurnished': 0.0, 'Partly Furnished': 0.03, 'Fully Furnished': 0.07 },
  POWER_SCORES: { 'PHCN Only': -0.10, 'Inverter Backup': 0.0, 'Estate Generator': 0.05, '24/7 Power': 0.12 },
  ESTATE_SCORES: { 'Standalone': -0.05, 'Mini Estate': 0.0, 'Gated Estate': 0.15, 'High-Rise': 0.10 },
  PARKING_SCORE_PER_SPACE: 0.02,
  PAYMENT_TERMS_MULTIPLIERS: { 'Monthly': 1.12, 'Quarterly': 1.08, '1 Year Upfront': 1.0, '2 Years Upfront': 0.95 },
  SHORT_LET_PREMIUM: 1.3,
  AMENITY_WEIGHTS: {
    'Swimming Pool': 0.07, 'Gym': 0.03, '24/7 Security': 0.05, 'Gated Estate': 0.05,
    'BQ': 0.02, 'Elevator': 0.04, 'Garden': 0.03, 'Parking': 0.02, 'Cinema': 0.03,
    'Clean Water': 0.03, 'Concierge': 0.05, '24/7 Power': 0.05, 'Rooftop Terrace': 0.03,
    'Gate House': 0.01, 'Spacious Compound': 0.02, 'Ocean View': 0.06, 'City View': 0.03,
    'Private Jetty': 0.06, 'Security': 0.03, 'Fitted Kitchen': 0.02, 'Large Garden': 0.03
  },
  AGE_RATE: { buy: 0.012, rent: 0.008 },
  AGE_CAP: { buy: 0.3, rent: 0.2 },
  NEW_BUILD_YEARS: 2,
  NEW_BUILD_PREMIUM: 0.1,
  ROOMS_RATE: 0.02,
  ROOMS_CLAMP: { min: -0.08, max: 0.1 },
  FURNISHING_CLAMP: { min: -0.15, max: 0.25 },
  RECENCY_THRESHOLD: 3,
  RECENCY_BOOST: 0.9,
};

export const API_CONFIG = {
  BASE: 'https://api.estateintel.com/v1',
  KEY: import.meta.env.VITE_ESTATE_INTEL_API_KEY, // Use env var
};
