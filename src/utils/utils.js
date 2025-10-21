import { CONFIG } from '../config';

export const amenityScore = (amenities) => (amenities || []).reduce((s, a) => s + (CONFIG.AMENITY_WEIGHTS[a] || 0), 0);

export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export const mean = (arr) => (arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : 0);

export const median = (arr) => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const m = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[m] : (sorted[m - 1] + sorted[m]) / 2;
};

export const stdDev = (arr) => {
  if (!arr.length) return 0;
  const m = mean(arr);
  return Math.sqrt(mean(arr.map((x) => (x - m) ** 2)));
};

export const formatPrice = (price, modeKey) => {
  const f = new Intl.NumberFormat(CONFIG.LOCALE, { style: 'currency', currency: CONFIG.CURRENCY, minimumFractionDigits: 0 }).format(Math.round(price));
  return modeKey === 'rent' ? `${f} / yr` : f;
};

export const formatPSF = (v) => new Intl.NumberFormat(CONFIG.LOCALE, { maximumFractionDigits: 0 }).format(Math.round(v));
