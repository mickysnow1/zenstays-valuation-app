import { BrandLogo } from './BrandLogo';

export const Header = () => (
  <div className="absolute top-0 left-0 right-0 z-20" role="banner">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between text-white">
      <div className="flex items-center gap-3">
        <span className="inline-flex md:hidden" aria-hidden="true">
          <svg className="w-6 h-6 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M3 6h18M3 12h18M3 18h18"/></svg>
        </span>
        <BrandLogo className="text-white" />
      </div>
      <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm">
        <a className="hover:text-gray-200" href="#">Home</a>
        <a className="hover:text-gray-200" href="#">Stays</a>
        <a className="hover:text-gray-200" href="#">Tenants</a>
        <a className="hover:text-gray-200" href="#">Owners</a>
        <a className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-1.5" href="#">Register</a>
      </nav>
    </div>
  </div>
);
