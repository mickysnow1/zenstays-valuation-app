import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export const AreaInput = ({ area, setArea, findAreaKey, getAreaSuggestions }) => {
  const [open, setOpen] = useState(false);
  const debArea = useDebounce(area, 200);
  const suggestions = getAreaSuggestions(debArea);
  const match = findAreaKey(area);
  const invalid = area.trim().length > 0 && !match;

  useEffect(() => {
    if (open && suggestions.length === 0 && debArea.trim()) {
      setOpen(false);
    }
  }, [open, suggestions.length, debArea]);

  return (
    <div className="relative">
      <label htmlFor="area-input" className="block text-sm font-medium mb-1 text-gray-500">
        Area <span className="text-gray-400">(required)</span>
      </label>
      <input
        id="area-input"
        type="text"
        value={area}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={(e) => { setArea(e.target.value); setOpen(true); }}
        placeholder="e.g., Lekki Phase 1, Ikoyi..."
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500/60 ${invalid ? 'border-red-300' : 'border-gray-200'}`}
        aria-invalid={invalid}
        aria-describedby="area-help"
        aria-autocomplete="list"
        aria-expanded={open}
        required
      />
      <p id="area-help" className="mt-1 text-xs text-gray-500">
        Start typing and choose a matching area.
      </p>
      {invalid && (
        <p className="mt-1 text-xs text-red-600" role="alert">Please choose a valid area from suggestions.</p>
      )}
      {open && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          <ul className="py-1 max-h-60 overflow-y-auto" role="listbox" aria-label="Area suggestions">
            {suggestions.map((opt) => (
              <li
                key={opt}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { setArea(opt); setOpen(false); }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                role="option"
                aria-selected={opt === match}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
      {match && <p className="mt-1 text-xs text-gray-500">✓ Matching area: {match}</p>}
    </div>
  );
};
