export const BrandLogo = ({ className = '' }) => (
  <div className={`flex items-center space-x-2 ${className}`} aria-label="Zennest">
    <div className="w-8 h-8 bg-blue-500 rounded-sm" />
    <span className="font-semibold text-xl tracking-tight">Zennest</span>
  </div>
);
