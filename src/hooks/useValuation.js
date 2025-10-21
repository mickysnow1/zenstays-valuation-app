import { useState, useEffect, useRef, useCallback } from 'react';
import { CONFIG } from '../config';
import { clamp, median, stdDev, mean, amenityScore } from '../utils/utils';

export const useValuation = () => {
  const [prediction, setPrediction] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const calculate = useCallback((inputs, properties) => {
    const { mode, propertyType, rooms, sqft, bathroomsToilets, area, furnishing, powerSupply, estateType, parkingAvailable, shortLet, paymentTerms, findAreaKey } = inputs;
    setIsCalculating(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const sqftVal = Number(sqft);
      const bathroomsToiletsNum = Number(bathroomsToilets);
      const parkingSpaces = parkingAvailable ? 2 : 0; // Assume 2 spaces if available for factor

      if (!propertyType || !rooms) {
        setPrediction({ error: 'Please select type and bedrooms.' });
        setIsCalculating(false);
        return;
      }
      if (isNaN(sqftVal) || sqftVal < CONFIG.MIN_SQFT || sqftVal > CONFIG.MAX_SQFT) {
        setPrediction({ error: `Size must be a number between ${CONFIG.MIN_SQFT} and ${CONFIG.MAX_SQFT} sqft.` });
        setIsCalculating(false);
        return;
      }
      if (isNaN(bathroomsToiletsNum) || bathroomsToiletsNum < 1 || bathroomsToiletsNum > 10) {
        setPrediction({ error: `Bathrooms/Toilets must be a number between 1 and 10.` });
        setIsCalculating(false);
        return;
      }
      if (parkingAvailable === undefined) {
        setPrediction({ error: 'Please select parking availability.' });
        setIsCalculating(false);
        return;
      }
      if (!area || !findAreaKey(area)) {
        setPrediction({ error: 'Please enter a valid area from suggestions.' });
        setIsCalculating(false);
        return;
      }

      const tabKey = mode === 'buy' ? 'buy' : 'rent';
      const allInMode = properties[tabKey];
      const areaKey = findAreaKey(area);

      let dataPool = allInMode.filter((p) => p.area === areaKey && p.type === propertyType);
      if (dataPool.length < 5) dataPool = allInMode.filter((p) => p.area === areaKey);
      if (dataPool.length < 5) dataPool = allInMode.filter((p) => p.type === propertyType);
      if (dataPool.length < 2) {
        setPrediction({ error: 'Not enough market data. Please try a different area or property type.' });
        setIsCalculating(false);
        return;
      }

      const psfList = dataPool.map((p) => p.price / Math.max(1, p.sqft));
      const basePSF = median(psfList);
      if (basePSF <= 0) {
        setPrediction({ error: 'Could not determine a baseline price.' });
        setIsCalculating(false);
        return;
      }

      let estimate = basePSF * sqftVal;
      const psfStd = stdDev(psfList);

      const poolRoomsMedian = median(dataPool.map((c) => c.rooms));
      const subjRooms = rooms === '5+' ? 5 : Number(rooms);
      const roomDelta = subjRooms - poolRoomsMedian;
      const roomsFactor = 1 + clamp(roomDelta * CONFIG.ROOMS_RATE, CONFIG.ROOMS_CLAMP.min, CONFIG.ROOMS_CLAMP.max);
      estimate *= roomsFactor;

      // New: Bathrooms/Toilets factor (replaces age)
      const bathroomsFactor = 1 + clamp(bathroomsToiletsNum * 0.02, 0, 0.1);
      estimate *= bathroomsFactor;

      const subjFurnScore = CONFIG.FURNISHING_SCORES[furnishing] || 0;
      const poolAmenityAvg = mean(dataPool.map((c) => amenityScore(c.amenities)));
      const furnishingDelta = subjFurnScore - poolAmenityAvg;
      const furnishingFactor = 1 + clamp(furnishingDelta, CONFIG.FURNISHING_CLAMP.min, CONFIG.FURNISHING_CLAMP.max);
      estimate *= furnishingFactor;

      const powerFactor = 1 + (CONFIG.POWER_SCORES[powerSupply] || 0);
      const estateFactor = 1 + (CONFIG.ESTATE_SCORES[estateType] || 0);
      const parkingFactor = parkingAvailable ? 1.02 : 1.0; // New: 2% boost if available
      estimate *= powerFactor * estateFactor * parkingFactor;

      const shortLetFactor = mode === 'rent' && shortLet ? CONFIG.SHORT_LET_PREMIUM : 1.0;
      const paymentTermsFactor = mode === 'rent' ? (CONFIG.PAYMENT_TERMS_MULTIPLIERS[paymentTerms] || 1.0) : 1.0;
      estimate *= shortLetFactor * paymentTermsFactor;

      const count = dataPool.length;
      const relStd = basePSF > 0 ? psfStd / basePSF : 0;
      let errorPct = (relStd || 0) + (count >= 10 ? 0.05 : count >= 5 ? 0.08 : 0.15);
      errorPct = clamp(errorPct, 0.1, 0.4);

      const poolAges = dataPool.map((p) => CONFIG.CURRENT_YEAR - p.builtYear);
      const poolAgeAvg = mean(poolAges);
      const ageDiff = Math.abs(bathroomsToiletsNum - poolAgeAvg); // New: Use bathrooms as proxy for 'age' in recency
      if (ageDiff < CONFIG.RECENCY_THRESHOLD) {
        errorPct *= CONFIG.RECENCY_BOOST;
      }

      const low = Math.max(estimate * (1 - errorPct), 0);
      const high = estimate * (1 + errorPct);
      const confidence = count >= 10 && errorPct < 0.2 ? 'High' : count >= 5 && errorPct < 0.3 ? 'Medium' : 'Low';

      setPrediction({
        estimate, low, high, confidence,
        stats: {
          compsCount: count,
          medianPSF: basePSF,
          roomsFactor, bathroomsFactor, furnishingFactor, powerFactor, estateFactor, parkingFactor, // Updated stats
          shortLetFactor, paymentTermsFactor,
          errorPct, areaMedianPSF: basePSF,
          estimateVsAreaMedian: estimate / (basePSF * sqftVal) - 1,
        },
        modeKey: tabKey,
      });
      setIsCalculating(false);
    }, 220);
  }, []);

  return { prediction, isCalculating, calculate, setPrediction };
};
