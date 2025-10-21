import { useState, useEffect, useMemo, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toast } from './components/Toast';
import { Hero } from './components/Hero';
import { WhyStripe } from './components/WhyStripe';
import { Footer } from './components/Footer';
import { PropertyForm } from './components/PropertyForm';
import { ResultPanel } from './components/ResultPanel';
import { useProperties } from './hooks/useProperties';
import { useAreas } from './hooks/useAreas';
import { useValuation } from './hooks/useValuation';

function ErrorFallback({ error }) {
  return <div className="p-4 bg-red-50 text-red-700">Error: {error.message}</div>;
}

export default function App() {
  const [mode, setMode] = useState('buy');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [rooms, setRooms] = useState('3');
  const [sqft, setSqft] = useState('');
  const [bathroomsToilets, setBathroomsToilets] = useState('3'); // New: Replaced age
  const [area, setArea] = useState('');
  const [furnishing, setFurnishing] = useState('Unfurnished');
  const [powerSupply, setPowerSupply] = useState('Estate Generator');
  const [estateType, setEstateType] = useState('Gated Estate');
  const [parkingAvailable, setParkingAvailable] = useState(false); // New: Checkbox for parking
  const [shortLet, setShortLet] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState('1 Year Upfront');
  const [savedEstimates, setSavedEstimates] = useState([]);
  const [toast, setToast] = useState(null);

  const { properties, isLoading, error: propertiesError } = useProperties();
  const { findAreaKey, getAreaSuggestions } = useAreas(properties);
  const { prediction, isCalculating, calculate, setPrediction } = useValuation();

  const analyzedCount = useMemo(() => properties.rent.length + properties.buy.length, [properties]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sanitize = (v) => decodeURIComponent(v || '').trim();
    const setIf = (k, setter, f = (x) => x) => {
      const v = params.get(k);
      if (v !== null) setter(f(sanitize(v)));
    };
    setIf('mode', setMode, (v) => ['buy', 'rent'].includes(v) ? v : 'buy');
    setIf('propertyType', setPropertyType);
    setIf('rooms', setRooms);
    setIf('sqft', setSqft);
    setIf('bathroomsToilets', setBathroomsToilets); // New
    setIf('area', setArea);
    setIf('furnishing', setFurnishing);
    setIf('powerSupply', setPowerSupply);
    setIf('estateType', setEstateType);
    setIf('parkingAvailable', setParkingAvailable, (v) => v === 'true');
    setIf('shortLet', setShortLet, (v) => v === 'true');
    setIf('paymentTerms', setPaymentTerms);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    calculate(
      { mode, propertyType, rooms, sqft, bathroomsToilets, area, furnishing, powerSupply, estateType, parkingAvailable, shortLet, paymentTerms, findAreaKey },
      properties
    );
  }, [calculate, mode, propertyType, rooms, sqft, bathroomsToilets, area, furnishing, powerSupply, estateType, parkingAvailable, shortLet, paymentTerms, findAreaKey, properties]);

  const onClear = useCallback(() => {
    setMode('buy'); setPropertyType('Apartment'); setRooms('3'); setSqft(''); setBathroomsToilets('3'); setArea('');
    setFurnishing('Unfurnished'); setPowerSupply('Estate Generator'); setEstateType('Gated Estate');
    setParkingAvailable(false); setShortLet(false); setPaymentTerms('1 Year Upfront'); setPrediction(null);
  }, [setPrediction]);

  const onSave = useCallback(() => {
    if (!prediction || prediction.error) return;
    const item = { id: Date.now(), mode, area, type: propertyType, rooms, sqft, bathroomsToilets, estimate: prediction.estimate, modeKey: prediction.modeKey };
    setSavedEstimates((prev) => [item, ...prev].slice(0, 5));
    setToast('Estimate saved');
  }, [prediction, mode, area, propertyType, rooms, sqft, bathroomsToilets]);

  const onShare = useCallback(() => {
    const params = new URLSearchParams({
      mode, propertyType, rooms, sqft, bathroomsToilets, area, furnishing, powerSupply, estateType, parkingAvailable: parkingAvailable.toString(), shortLet: shortLet.toString(), paymentTerms,
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => setToast('Link copied')).catch(() => {
      setToast('Copy failed');
      console.log(url);
    });
  }, [mode, propertyType, rooms, sqft, bathroomsToilets, area, furnishing, powerSupply, estateType, parkingAvailable, shortLet, paymentTerms]);

  const onPrint = useCallback(() => window.print(), []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-900">Loading properties...</div>;
  if (propertiesError) return <div className="min-h-screen flex items-center justify-center text-red-700">Error loading data: {propertiesError}</div>;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="bg-white text-gray-900 font-sans">
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        <Hero propertyCount={analyzedCount} onCTAClick={() => {
          const panel = document.getElementById('valuation-panel');
          if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }} />
        <section id="valuation-panel" className="relative -mt-28 md:-mt-36 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <PropertyForm
                formData={{ mode, propertyType, rooms, sqft, bathroomsToilets, area, furnishing, powerSupply, estateType, parkingAvailable, shortLet, paymentTerms }}
                handlers={{ setMode, setPropertyType, setRooms, setSqft, setBathroomsToilets, setArea, setFurnishing, setPowerSupply, setEstateType, setParkingAvailable, setShortLet, setPaymentTerms }}
                findAreaKey={findAreaKey}
                getAreaSuggestions={getAreaSuggestions}
                savedEstimates={savedEstimates}
                isCalculating={isCalculating}
                onSubmit={onSubmit}
                onClear={onClear}
              />
              <ResultPanel
                prediction={prediction}
                isCalculating={isCalculating}
                mode={mode}
                shortLet={shortLet}
                onSave={onSave}
                onShare={onShare}
                onPrint={onPrint}
              />
            </div>
          </div>
        </section>
        <WhyStripe />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};
