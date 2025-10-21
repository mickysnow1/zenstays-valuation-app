export const ExplainPanel = ({ stats, mode, shortLet }) => {
  const pairs = [
    { label: 'Rooms', v: stats.roomsFactor },
    { label: 'Age', v: stats.ageFactor },
    { label: 'Furnishing', v: stats.furnishingFactor },
    { label: 'Power', v: stats.powerFactor },
    { label: 'Estate Type', v: stats.estateFactor },
    { label: 'Parking', v: stats.parkingFactor },
    ...(mode === 'rent' ? [{ label: 'Payment Terms', v: stats.paymentTermsFactor }] : []),
    ...(mode === 'rent' && shortLet ? [{ label: 'Short-Let', v: stats.shortLetFactor }] : []),
  ];
  return (
    <div id="explain-panel" className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {pairs.map((item) => (
          <div key={item.label}>
            <div className="text-xs text-gray-500">{item.label}</div>
            <div className={`text-lg font-semibold ${item.v >= 1 ? 'text-green-700' : 'text-red-700'}`}>
              {((item.v - 1) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-500">
        Uncertainty: ±{(stats.errorPct * 100).toFixed(0)}% • Data Points: {stats.compsCount}
      </div>
    </div>
  );
};
