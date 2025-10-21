import { useMemo, useCallback } from 'react';

export const useAreas = (properties) => {
  const uniqueAreas = useMemo(() => {
    const all = [...properties.rent, ...properties.buy];
    return Array.from(new Set(all.map((p) => p.area))).sort();
  }, [properties]);

  const findAreaKey = useCallback((input) => {
    if (!input) return null;
    const s = input.trim().toLowerCase();
    if (!s) return null;
    const exact = uniqueAreas.find((a) => a.toLowerCase() === s);
    if (exact) return exact;
    const start = uniqueAreas.find((a) => a.toLowerCase().startsWith(s));
    if (start) return start;
    const incl = uniqueAreas.find((a) => a.toLowerCase().includes(s));
    return incl || null;
  }, [uniqueAreas]);

  const getAreaSuggestions = useCallback((input, limit = 6) => {
    if (!input) return uniqueAreas.slice(0, limit);
    const s = input.trim().toLowerCase();
    return uniqueAreas.filter((a) => a.toLowerCase().includes(s)).slice(0, limit);
  }, [uniqueAreas]);

  return { uniqueAreas, findAreaKey, getAreaSuggestions };
};
