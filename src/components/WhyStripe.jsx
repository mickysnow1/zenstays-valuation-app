import { motion } from 'framer-motion';

export const WhyStripe = () => (
  <motion.section
    className="bg-white"
    aria-labelledby="why-title"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 md:py-20 text-center">
      <motion.h2
        id="why-title"
        className="text-3xl md:text-4xl font-semibold text-gray-900"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Why Choose Zenn-Valuation
      </motion.h2>
      <div className="mx-auto mt-4 h-px w-12 bg-gray-200" />
      <motion.p
        className="mt-3 text-gray-500 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Accurate, effortless property valuations powered by market data.
      </motion.p>
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        role="list"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="visible"
      >
        {[
          { title: 'Accurate Predictions', text: 'AI-driven valuations based on real Lagos market data.' },
          { title: 'Instant Results', text: 'Get rent or buy estimates in seconds.' },
          { title: 'Custom Factors', text: 'Account for amenities, location, and more.' },
          { title: 'Easy to Use', text: 'Simple form for quick, reliable insights.' },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            role="listitem"
            className="px-2"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-gray-500">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.section>
);
