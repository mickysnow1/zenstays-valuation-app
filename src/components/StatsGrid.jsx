import { formatPSF } from '../utils/utils';

export const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
    <div className="p-4 rounded-lg bg-gray-100">
      <div className="text-xs text-gray-500">Median ₦/sqft</div>
      <div className="text-2xl font-bold text-gray-900">{formatPSF(stats.medianPSF)}</div>
    </div>
    <div className="p-4 rounded-lg bg-gray-100">
      <div className="text-xs text-gray-500">Power Impact</div>
      <div className={`text-2xl font-bold ${stats.powerFactor > 1 ? 'text-green-700' : 'text-red-600'}`}>
        {((stats.powerFactor - 1) * 100).toFixed(1)}%
      </div>
    </div>
    <div className="p-4 rounded-lg bg-gray-100">
      <div className="text-xs text-gray-500">Uncertainty</div>
      <div className="text-2xl font-bold text-gray-900">±{(stats.errorPct * 100).toFixed(0)}%</div>
    </div>
  </div>
);
