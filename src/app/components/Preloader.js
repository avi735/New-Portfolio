'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Preloader renders synchronously (SSR) and covers the page briefly.
 * Kept SHORT (total ~600ms) so LCP elements are exposed quickly.
 *
 * Timeline:
 *  t=0ms   : Preloader visible (SSR renders it, covers page)
 *  t=400ms : setIsLoading(false) triggered
 *  t=400ms : exit animation starts (slides up, 400ms)
 *  t=800ms : Preloader gone, hero content visible → LCP measured here
 */
export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]"
          aria-hidden="true"
        >
          {/* Brand mark */}
          <div className="font-mono text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-0.5">
            <span className="text-cyan-400">&lt;</span>
            <span className="shimmer-text">Avinash</span>
            <span className="text-cyan-400">/&gt;</span>
          </div>

          {/* Thin progress line — pure CSS animation, no JS delay */}
          <div className="mt-6 w-40 h-0.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
              style={{ animation: 'preloaderBar 0.38s cubic-bezier(0.2,0.8,0.2,1) forwards' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
