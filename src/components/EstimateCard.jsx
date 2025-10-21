import { formatPrice } from '../utils/utils';
import { CONFIG } from '../config';
import { formatPSF } from '../utils/utils';

export const EstimateCard = ({ prediction, mode }) => {
  const totalMoveIn = prediction.estimate * (1 + CONFIG.AGENT_FEE + CONFIG.LEGAL_FEE);

  return (
    <div className="p-6 bg-gray-100 rounded-xl text-center" aria-live="polite">
      <div className="text-sm text-gray-500 mb-1">Estimated Value</div>
      <div className="text-5xl font-extrabold text-blue-500">{formatPrice(prediction.estimate, prediction.modeKey)}</div>
      <div className="text-md text-gray-500 mt-2">
        Expected range: {formatPrice(prediction.low, prediction.modeKey)} — {formatPrice(prediction.high, prediction.modeKey)}
      </div>
      <div className="mt-4 inline-block px-3 py-1 text-xs rounded-full bg-white border border-gray-200 text-gray-700">
        Confidence: {prediction.confidence}
      </div>
      {prediction.stats.areaMedianPSF ? (
        <div className="mt-4 text-sm text-gray-500">
          Area median ₦/sqft: {formatPSF(prediction.stats.areaMedianPSF)} • Estimate vs area:{' '}
          <span className={prediction.stats.estimateVsAreaMedian >= 0 ? 'text-green-700' : 'text-red-700'}>
            {(prediction.stats.estimateVsAreaMedian * 100).toFixed(1)}%
          </span>
        </div>
      ) : null}
      {mode === 'rent' && (
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <div className="text-sm font-semibold text-gray-700">Estimated Total Move-In Cost</div>
          <div className="text-xs text-gray-500 mt-1 space-y-0.5">
            <div>Annual Rent: {formatPrice(prediction.estimate, 'rent')}</div>
            <div>Agent Fee ({(CONFIG.AGENT_FEE * 100).toFixed(0)}%): {formatPrice(prediction.estimate * CONFIG.AGENT_FEE, 'rent')}</div>
            <div>Legal/Caution ({(CONFIG.LEGAL_FEE * 100).toFixed(0)}%): {formatPrice(prediction.estimate * CONFIG.LEGAL_FEE, 'rent')}</div>
            <div className="pt-1 border-t border-amber-200 font-semibold text-gray-700">
              Total: {formatPrice(totalMoveIn, 'rent')}
            </div>
          </div>
        </div>
      )}
      <div className="mt-3">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          aria-expanded={false}
          aria-controls="explain-panel"
        >
          Explain my estimate
        </button>
      </div>
    </div>
  );
};
