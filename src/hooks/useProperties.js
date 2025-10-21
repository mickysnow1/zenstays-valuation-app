import { useState, useEffect } from 'react';
import { API_CONFIG, CONFIG } from '../config'; // Keep for API if you add key later

// Mock data loader (primary source)
const loadMockData = async () => {
  try {
    const response = await fetch('/data/mockProperties.json');
    if (!response.ok) throw new Error('Mock file not found');
    const data = await response.json();
    return data; // Returns { rent: [...], buy: [...] }
  } catch (error) {
    console.warn('Mock load failed:', error);
    return null; // Fallback to empty
  }
};

// API loader (fallback if you have key; optional)
const loadRealData = async () => {
  const apiKey = API_CONFIG.KEY;
  if (!apiKey || apiKey === 'YOUR_REAL_API_KEY_HERE') return null;
  // Your existing API code here if you want to keep it
  try {
    // ... (fetchFromEstateIntel logic)
    return null; // Placeholder; replace with real fetch if needed
  } catch {
    return null;
  }
};

export const useProperties = () => {
  const [properties, setProperties] = useState({ rent: [], buy: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const cached = JSON.parse(localStorage.getItem('properties'));
      if (cached && Date.now() - cached.timestamp < 86400000) { // 24h cache
        setProperties(cached.data);
        setIsLoading(false);
        return;
      }

      try {
        // Try mock first
        let data = await loadMockData();
        if (!data) {
          data = await loadRealData(); // Fallback to API if mock fails
        }
        if (!data) {
          throw new Error('No data source available');
        }

        // Optional: Enhance data (e.g., add variations or filter)
        const enhancedData = {
          rent: data.rent.map((p, i) => ({ ...p, id: p.id || `rent-${i}` })),
          buy: data.buy.map((p, i) => ({ ...p, id: p.id || `buy-${i}` })),
        };

        setProperties(enhancedData);
        localStorage.setItem('properties', JSON.stringify({ data: enhancedData, timestamp: Date.now() }));
      } catch (err) {
        console.error('Data load error:', err);
        setError('Failed to load data. Check console for details.');
        setProperties({ rent: [], buy: [] }); // Empty fallback
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { properties, isLoading, error };
};
