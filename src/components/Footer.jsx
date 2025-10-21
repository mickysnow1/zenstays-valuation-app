import { motion } from 'framer-motion';
import { BrandLogo } from './BrandLogo';

export const Footer = () => (
  <motion.footer
    className="bg-white border-t border-gray-200"
    role="contentinfo"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-12"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        initial="hidden"
        whileInView="visible"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <BrandLogo />
          <p className="mt-4 text-gray-500">
            Africa's trusted property valuation platform. Predict prices for rent or buy with data-driven accuracy—no guesswork, no stress.
          </p>
          <div className="mt-8">
            <div className="text-xs uppercase tracking-wide text-gray-500">Stay connected</div>
            <p className="mt-2 text-gray-500">Get updates on new features and market insights.</p>
            <form className="mt-3 flex rounded-md border border-gray-200 overflow-hidden max-w-sm" onSubmit={(e) => e.preventDefault()} aria-label="Subscribe form">
              <input placeholder="Your email address" className="flex-1 px-3 py-2 outline-none" type="email" aria-label="Email address" required />
              <button className="px-4 bg-gray-200 text-gray-700 font-medium" type="submit">Subscribe</button>
            </form>
          </div>
        </motion.div>
        <motion.nav aria-label="Footer buyers" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
          <h4 className="text-sm font-semibold text-gray-900">FOR BUYERS</h4>
          <ul className="mt-4 space-y-2">
            <li><a className="text-gray-500 hover:text-blue-500" href="#">Value Properties</a></li>
            <li><a className="text-gray-500 hover:text-blue-500" href="#">Market Insights</a></li>
          </ul>
        </motion.nav>
        <motion.nav aria-label="Footer sellers" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
          <h4 className="text-sm font-semibold text-gray-900">FOR SELLERS</h4>
          <ul className="mt-4 space-y-2">
            <li><a className="text-gray-500 hover:text-blue-500" href="#">Price Your Property</a></li>
            <li><a className="text-gray-500 hover:text-blue-500" href="#">Valuation Tools</a></li>
          </ul>
        </motion.nav>
        <motion.nav aria-label="Footer valuation" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
          <h4 className="text-sm font-semibold text-gray-900">VALUATION</h4>
          <ul className="mt-4 space-y-2">
            <li><a className="text-gray-500 hover:text-blue-500" href="#">Rent Predictions</a></li>
            <li><a className="text-gray-500 hover:text-blue-500" href="#">Buy/Sell Estimates</a></li>
          </ul>
        </motion.nav>
      </motion.div>
    </div>
  </motion.footer>
);
