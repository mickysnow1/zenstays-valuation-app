import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';

export const Hero = ({ propertyCount = 0, onCTAClick }) => {
  useEffect(() => {
    const id = 'inter-font';
    if (!document.getElementById(id)) {
      const l1 = document.createElement('link');
      l1.rel = 'preconnect'; l1.href = 'https://fonts.googleapis.com';
      const l2 = document.createElement('link');
      l2.rel = 'preconnect'; l2.href = 'https://fonts.gstatic.com'; l2.crossOrigin = 'anonymous';
      const l3 = document.createElement('link');
      l3.id = id;
      l3.rel = 'stylesheet';
      l3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
      document.head.append(l1, l2, l3);
    }
  }, []);

  // Fine-tuned: Slower durations (0.8-1.2s), longer staggers (0.3-0.5s delay), easeInOut for smoothness
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.3 }, // Increased stagger/delay
    },
  };

  const childVariants = {
    hidden: { y: 30, opacity: 0 }, // Increased slide for visibility
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeInOut' } }, // Slower duration
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.2, ease: 'easeInOut' } }, // Slower for emphasis
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative min-h-[88vh] w-full">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop')" }}
        role="img" aria-label="Mountain resort with outdoor lounge"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      <Header />
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 pt-36 md:pt-44 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          className="tracking-[0.35em] uppercase text-xs md:text-sm text-white/70"
          variants={childVariants}
        >
          Value your property with confidence
        </motion.p>
        <motion.h1 
          className="mt-3 text-5xl md:text-7xl font-extrabold"
          variants={childVariants}
        >
          Zenn-Valuation
        </motion.h1>
        <motion.div 
          className="mx-auto mt-3 h-px w-48 bg-white/60 origin-left"
          variants={underlineVariants}
        />
        <motion.p 
          className="mt-6 text-lg md:text-xl text-white/85"
          variants={childVariants}
        >
          Get instant, data-driven price predictions for your Lagos property.
          <br className="hidden md:block" />
          <span className="block md:inline">Whether renting out or selling, our tool analyzes location, amenities, and market trends for accurate valuations.</span>
        </motion.p>
        <motion.div 
          className="mt-10"
          variants={childVariants}
        >
          <motion.button
            onClick={onCTAClick}
            className="inline-flex items-center border border-white/70 hover:border-white bg-transparent hover:bg-white/10 text-white rounded-md px-6 py-2.5 transition"
            aria-label="Scroll to valuation form"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Get Valuation
          </motion.button>
        </motion.div>
        <motion.div 
          className="mt-10 text-white/80 text-sm" 
          aria-live="polite"
          variants={childVariants}
        >
          {propertyCount}+ properties valued
        </motion.div>
      </motion.div>
    </section>
  );
};
