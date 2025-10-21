import { useState } from 'react';
import { motion } from 'framer-motion';
import { ResultSkeleton } from './ResultSkeleton';
import { EstimateCard } from './EstimateCard';
import { ExplainPanel } from './ExplainPanel';
import { StatsGrid } from './StatsGrid';

export const ResultPanel = ({ prediction, isCalculating, mode, shortLet, onSave, onShare, onPrint }) => {
  const [showExplain, setShowExplain] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className="lg:col-span-3 bg-white rounded-xl shadow-xl border border-gray-200 p-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Property Valuation</h2>
        <div className="flex items-center gap-2">
          {prediction && !prediction.error && (
            <button
              onClick={onSave}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100"
              aria-label="Save estimate"
            >
              Save
            </button>
          )}
          <button onClick={onShare} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100" aria-label="Share estimate">
            Share
          </button>
          <button onClick={onPrint} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100" aria-label="Print estimate">
            Print
          </button>
        </div>
      </div>
      {isCalculating && <ResultSkeleton />}
      {!isCalculating && !prediction && (
        <div className="text-center py-24 text-gray-500 flex flex-col items-center" aria-live="polite">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeWidth="2" d="M9 7h6M9 11h6m-9 4h6" />
          </svg>
          <p>Your property valuation will appear here.</p>
          <p className="text-sm mt-2">Fill the form and click "Predict Price" to get started.</p>
        </div>
      )}
      {!isCalculating && prediction?.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">{prediction.error}</div>
      )}
      {!isCalculating && prediction && !prediction.error && (
        <motion.div className="space-y-8" aria-live="polite" role="status" variants={containerVariants} initial="hidden" animate="visible">
          <EstimateCard prediction={prediction} mode={mode} />
          <button
            type="button"
            onClick={() => setShowExplain(!showExplain)}
            className="text-sm text-blue-600 hover:underline"
            whileHover={{ scale: 1.05 }}
            aria-expanded={showExplain}
            aria-controls="explain-panel"
          >
            {showExplain ? 'Hide' : 'Explain my estimate'}
          </button>
          {showExplain && <ExplainPanel stats={prediction.stats} mode={mode} shortLet={shortLet} />}
          <StatsGrid stats={prediction.stats} />
          <p className="text-xs text-gray-500">Note: Estimates are indicative based on available market data and assumptions.</p>
        </motion.div>
      )}
    </motion.div>
  );
};
