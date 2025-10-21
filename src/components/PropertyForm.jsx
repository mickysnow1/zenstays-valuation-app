import { useCallback } from 'react';
import { CONFIG } from '../config';
import { CustomSelect } from './CustomSelect';
import { AreaInput } from './AreaInput';

export const PropertyForm = ({
  formData, handlers, findAreaKey, getAreaSuggestions, savedEstimates, isCalculating, onSubmit, onClear,
}) => {
  const { mode, propertyType, rooms, sqft, bathroomsToilets, area, furnishing, powerSupply, estateType, parkingAvailable, shortLet, paymentTerms } = formData;
  const { setMode, setPropertyType, setRooms, setSqft, setBathroomsToilets, setArea, setFurnishing, setPowerSupply, setEstateType, setParkingAvailable, setShortLet, setPaymentTerms } = handlers;

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(e);
  }, [onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-xl shadow-xl border border-gray-200 p-6" aria-labelledby="form-title">
      <h2 id="form-title" className="text-xl font-semibold mb-6 text-gray-900">Enter Property Details for Valuation</h2>
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-500">Valuation for</label>
        <div className="grid grid-cols-2 gap-3" role="group" aria-label="Valuation mode">
          <button type="button" onClick={() => setMode('buy')} className={`p-3 text-center rounded-lg border-2 font-medium transition-all ${mode === 'buy' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-400'}`} aria-pressed={mode==='buy'}>Buy</button>
          <button type="button" onClick={() => setMode('rent')} className={`p-3 text-center rounded-lg border-2 font-medium transition-all ${mode === 'rent' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-400'}`} aria-pressed={mode==='rent'}>Rent</button>
        </div>
      </div>
      <div className="mt-4">
        <AreaInput area={area} setArea={setArea} findAreaKey={findAreaKey} getAreaSuggestions={getAreaSuggestions} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <CustomSelect id="type" label="Type" options={CONFIG.PROPERTY_TYPE_OPTIONS} value={propertyType} onChange={setPropertyType} required />
        <CustomSelect id="rooms" label="Bedrooms" options={CONFIG.BEDROOM_OPTIONS} value={rooms} onChange={setRooms} required />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="sqft-input" className="block text-sm font-medium mb-1 text-gray-500">Size (sqft)</label>
          <input id="sqft-input" type="number" min={CONFIG.MIN_SQFT} max={CONFIG.MAX_SQFT} value={sqft} onChange={(e) => setSqft(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/60" placeholder="2500" required aria-describedby="sqft-help" />
          <p id="sqft-help" className="mt-1 text-xs text-gray-500">Enter the interior area in square feet ({CONFIG.MIN_SQFT}-{CONFIG.MAX_SQFT}).</p>
        </div>
        <div>
          <label htmlFor="bathrooms-toilets-input" className="block text-sm font-medium mb-1 text-gray-500">Number of Bathrooms and Toilets</label>
          <input id="bathrooms-toilets-input" type="number" min="1" max="10" value={bathroomsToilets} onChange={(e) => setBathroomsToilets(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/60" placeholder="3" required aria-describedby="bathrooms-toilets-help" />
          <p id="bathrooms-toilets-help" className="mt-1 text-xs text-gray-500">Total count (e.g., 2 baths + 1 toilet = 3); more facilities boost value.</p>
        </div>
      </div>
      <div className="pt-2 border-t border-gray-200 mt-4">
        <h3 className="text-sm font-semibold text-gray-900 my-3">Infrastructure & Features</h3>
        <div className="grid grid-cols-2 gap-4">
          <CustomSelect id="power" label="Power Supply" options={CONFIG.POWER_OPTIONS} value={powerSupply} onChange={setPowerSupply} />
          <CustomSelect id="estate" label="Estate Type" options={CONFIG.ESTATE_TYPE_OPTIONS} value={estateType} onChange={setEstateType} />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <CustomSelect id="furnishing" label="Furnishing" options={CONFIG.FURNISHING_OPTIONS} value={furnishing} onChange={setFurnishing} />
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">Parking Available?</label>
            <input id="parking-available" type="checkbox" checked={parkingAvailable} onChange={(e) => setParkingAvailable(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" aria-describedby="parking-help" />
            <p id="parking-help" className="mt-1 text-xs text-gray-500">Check if parking is available; boosts valuation by ~2%.</p>
          </div>
        </div>
      </div>
      {mode === 'rent' && (
        <div className="pt-2 border-t border-gray-200 mt-4">
          <h3 className="text-sm font-semibold text-gray-900 my-3">Payment Preferences</h3>
          <CustomSelect id="pay-terms" label="Payment Terms" info="affects annual cost" options={CONFIG.PAYMENT_TERMS_OPTIONS} value={paymentTerms} onChange={setPaymentTerms} />
          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer mt-3">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" checked={shortLet} onChange={(e) => setShortLet(e.target.checked)} />
            <span>Available for Short-Let ({((CONFIG.SHORT_LET_PREMIUM - 1) * 100).toFixed(0)}% premium)</span>
          </label>
        </div>
      )}
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onClear} className="flex-1 px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold transition">Clear</button>
        <button type="submit" disabled={isCalculating} className="flex-1 px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-60 transition shadow-md">
          {isCalculating ? 'Calculating...' : 'Predict Price'}
        </button>
      </div>
      {savedEstimates.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold mb-3 text-gray-900">Saved Estimates ({savedEstimates.length})</h3>
          <div className="space-y-2" role="list">
            {savedEstimates.map((est) => (
              <div key={est.id} className="p-2 bg-gray-50 rounded text-xs" role="listitem">
                <div className="font-medium text-gray-900">{est.area || 'Area N/A'} • {est.rooms}-bed {est.type}</div>
                <div className="text-blue-600 font-semibold">{formatPrice(est.estimate, est.modeKey)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};
