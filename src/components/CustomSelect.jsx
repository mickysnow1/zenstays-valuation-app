import { useState, useEffect, useRef } from 'react';

export const CustomSelect = ({ id, label, options, value, onChange, info, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const ref = useRef(null);
  const listboxId = `${id}-listbox`;
  const [activeDescendantId, setActiveDescendantId] = useState('');

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false); setFocusIndex(-1); setActiveDescendantId('');
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const toggle = () => {
    setIsOpen((o) => !o);
    if (!isOpen) {
      const idx = options.findIndex((o) => o === value);
      const newIdx = idx >= 0 ? idx : 0;
      setFocusIndex(newIdx);
      setActiveDescendantId(`${id}-option-${newIdx}`);
    }
  };

  const onKeyDown = (e) => {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); return; }
    if (!isOpen) return;
    if (e.key === 'Escape') { setIsOpen(false); setActiveDescendantId(''); }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.min((focusIndex < 0 ? 0 : focusIndex) + 1, options.length - 1);
      setFocusIndex(newIdx);
      setActiveDescendantId(`${id}-option-${newIdx}`);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.max((focusIndex < 0 ? 0 : focusIndex) - 1, 0);
      setFocusIndex(newIdx);
      setActiveDescendantId(`${id}-option-${newIdx}`);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const opt = options[Math.max(0, Math.min(focusIndex, options.length - 1))];
      if (opt) { onChange(opt); setIsOpen(false); setActiveDescendantId(''); }
    }
  };

  return (
    <div className="relative" ref={ref}>
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-500">
        {label} {info && <span className="text-xs text-gray-400">({info})</span>} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        id={id}
        type="button"
        className="w-full p-3 bg-white border border-gray-200 rounded-lg text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500/60"
        aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={listboxId} aria-activedescendant={activeDescendantId}
        onClick={toggle} onKeyDown={onKeyDown}
        required={required}
      >
        <span>{value || 'Select...'}</span>
        <svg className={`w-5 h-5 text-gray-400 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <div id={listboxId} role="listbox" className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          <ul className="py-1">
            {options.map((opt, i) => (
              <li
                key={opt}
                id={`${id}-option-${i}`}
                role="option"
                aria-selected={opt === value}
                tabIndex={-1}
                onMouseEnter={() => { setFocusIndex(i); setActiveDescendantId(`${id}-option-${i}`); }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onChange(opt); setIsOpen(false); setActiveDescendantId(''); }}
                className={`px-4 py-2 text-sm cursor-pointer ${i === focusIndex ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
