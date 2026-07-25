'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';

const COMMANDS = [
  'build --platform scalable',
  'automate --everything',
  'integrate --ai gemini',
  'deploy --zero-downtime',
];

const STATS = [
  { target: 2,  suffix: '+', label: 'Years Exp.' },
  { target: 30, suffix: '+', label: 'Projects' },
  { target: 98, suffix: '%', label: 'Coverage' },
  { target: 12, suffix: '+', label: 'Tech Stacks' },
];

const NAVBAR_HEIGHT = 75;

export default function Hero() {
  const typedRef  = useRef(null);
  const statsRef  = useRef(null);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  /* ---- Typing effect ---- */
  useEffect(() => {
    let cmdIdx = 0, charIdx = 0, isDeleting = false, delay = 80;
    let timer;
    const tick = () => {
      const el = typedRef.current;
      if (!el) return;
      const current = COMMANDS[cmdIdx];
      if (!isDeleting) {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) { isDeleting = true; delay = 2200; }
        else delay = 75;
      } else {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) { isDeleting = false; cmdIdx = (cmdIdx + 1) % COMMANDS.length; delay = 400; }
        else delay = 38;
      }
      timer = setTimeout(tick, delay);
    };
    const t = setTimeout(tick, 1000);
    return () => { clearTimeout(t); clearTimeout(timer); };
  }, []);

  /* ---- Counter animation — single rAF loop ---- */
  useEffect(() => {
    const statsEl = statsRef.current;
    if (!statsEl) return;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();
          const duration = 1800;
          const startTime = performance.now();
          const raf = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounts(STATS.map(({ target }) => Math.floor(target * ease)));
            if (progress < 1) requestAnimationFrame(raf);
          };
          requestAnimationFrame(raf);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsEl);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - NAVBAR_HEIGHT, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 px-4 sm:px-6">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start gap-5 sm:gap-6">
        <div className="absolute top-1/3 left-0 w-[40rem] h-[30rem] bg-cyan-400/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Badge */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 text-xs sm:text-sm text-emerald-500 font-medium shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse flex-shrink-0" />
          <span>Available for new opportunities</span>
        </motion.div>

        {/* Terminal line — capped width to prevent overflow on 320px phones */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex items-center gap-1.5 sm:gap-2.5 font-mono text-xs sm:text-sm bg-white/5 border border-slate-700/50 rounded-lg px-3 sm:px-4 py-2 shadow-lg backdrop-blur-md overflow-hidden max-w-full"
        >
          <div className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.06) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite',
            }}
          />
          <span className="text-emerald-400 relative z-10 flex-shrink-0">~/portfolio</span>
          <span className="text-cyan-400 relative z-10 flex-shrink-0">$</span>
          {/* min-w capped at 120px on mobile, 200px on sm+ */}
          <span className="text-slate-200 min-w-[100px] sm:min-w-[200px] relative z-10 truncate" ref={typedRef} />
          <span className="text-cyan-400 animate-pulse relative z-10 flex-shrink-0">▮</span>
        </motion.div>

        {/* H1 — LCP element, no opacity animation */}
        <motion.h1
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-100 drop-shadow-lg"
        >
          Building <span className="text-gradient">Scalable Platforms</span>
          <br />
          & Automating <span className="text-gradient-2">Complex Systems</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed mt-1 sm:mt-2 drop-shadow-md"
        >
          QA Automation Engineer · Full-Stack Developer · AI Integration Specialist
          <br className="hidden sm:block" />
          <span className="block sm:inline sm:ml-0"> Crafting resilient infrastructure and intelligent workflows that scale.</span>
        </motion.p>

        {/* CTA buttons — full width on mobile */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-4 w-full sm:w-auto"
        >
          <MagneticWrapper>
            <a
              href="#projects"
              onClick={scrollTo('#projects')}
              className="group flex justify-center items-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] active:scale-95 transition-all"
            >
              <span>View Projects</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a
              href="#contact"
              onClick={scrollTo('#contact')}
              className="flex justify-center items-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-cyan-400/40 text-cyan-400 font-semibold hover:bg-cyan-400/10 active:scale-95 transition-all backdrop-blur-md"
            >
              <span>Let&apos;s Connect</span>
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Stats strip — 2×2 on mobile, horizontal row on md+ */}
        <motion.div
          ref={statsRef}
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:flex items-stretch md:items-center gap-0 bg-slate-900/40 border border-slate-700/50 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-xl mt-4 sm:mt-8 w-full md:w-auto shadow-2xl"
        >
          {STATS.map(({ suffix, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5
                border-slate-700/50 border-r border-b
                [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:last:border-r-0
                md:border-b-0 hover:bg-white/5 transition-colors min-w-0"
            >
              <div className="flex items-baseline gap-0.5 sm:gap-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 leading-none drop-shadow-md">{counts[i]}</span>
                <span className="text-lg sm:text-xl font-bold text-cyan-400">{suffix}</span>
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-slate-400 tracking-wide text-center mt-1 uppercase whitespace-nowrap">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint — hidden on very small screens to avoid crowding */}
      <a
        href="#about"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-10 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Scroll to explore"
        onClick={scrollTo('#about')}
      >
        <span className="relative w-0.5 h-10 sm:h-12 bg-cyan-400/20 rounded-full overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-4 bg-cyan-400 rounded-full animate-[floatY_1.5s_ease-in-out_infinite]" />
        </span>
        <span className="text-[10px] text-slate-400 tracking-widest uppercase drop-shadow-sm">Scroll</span>
      </a>
    </section>
  );
}
