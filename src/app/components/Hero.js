'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';

const COMMANDS = [
  'build --platform scalable',
  'automate --everything',
  'integrate --ai gemini',
  'deploy --zero-downtime',
];

const STATS = [
  { target: 2, suffix: '+', label: 'Years Experience' },
  { target: 30, suffix: '+', label: 'Projects Shipped' },
  { target: 98, suffix: '%', label: 'Test Coverage' },
  { target: 12, suffix: '+', label: 'Tech Stacks' },
];

export default function Hero() {
  const typedRef = useRef(null);
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
        delay = charIdx === current.length ? (isDeleting = true, 2200) : 75;
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

  /* ---- Counter animation ---- */
  useEffect(() => {
    let started = false;
    const startCounters = () => {
      if (started) return;
      const hero = document.getElementById('home');
      if (!hero) return;
      if (hero.getBoundingClientRect().top < window.innerHeight) {
        started = true;
        STATS.forEach(({ target }, i) => {
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            setCounts((prev) => { const next = [...prev]; next[i] = Math.floor(current); return next; });
          }, 16);
        });
      }
    };
    window.addEventListener('scroll', startCounters, { passive: true });
    const t = setTimeout(startCounters, 500);
    return () => { window.removeEventListener('scroll', startCounters); clearTimeout(t); };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-6">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start gap-6">
        {/* Subtle cinematic glow behind text */}
        <div className="absolute top-1/3 left-0 w-[40rem] h-[30rem] bg-cyan-400/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 text-sm text-emerald-500 font-medium shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
          <span>Available for new opportunities</span>
        </motion.div>

        {/* Terminal line */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2.5 font-mono text-sm bg-white/5 border border-slate-700/50 rounded-lg px-4 py-2 shadow-lg backdrop-blur-md"
        >
          <span className="text-emerald-400">~/portfolio</span>
          <span className="text-cyan-400">$</span>
          <span className="text-slate-200 min-w-[200px]" ref={typedRef} />
          <span className="text-cyan-400 animate-pulse">▮</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-100 drop-shadow-lg"
        >
          Building <span className="text-gradient">Scalable Platforms</span>
          <br />
          &amp; Automating <span className="text-gradient-2">Complex Systems</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-base md:text-lg text-slate-400 leading-relaxed mt-2 drop-shadow-md"
        >
          QA Automation Engineer · Full-Stack Developer · AI Integration Specialist
          <br />
          Crafting resilient infrastructure and intelligent workflows that scale.
        </motion.p>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4 w-full sm:w-auto"
        >
          <MagneticWrapper>
            <a href="#projects" className="group flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] transition-all">
              <span>View Projects</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="#contact" className="flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl border border-cyan-400/40 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-all backdrop-blur-md">
              <span>Let&apos;s Connect</span>
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:flex items-center gap-0 bg-slate-900/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-xl mt-8 w-full md:w-auto shadow-2xl"
        >
          {STATS.map(({ suffix, label }, i) => (
            <div key={label} className="flex flex-col items-center justify-center p-4 md:px-8 md:py-5 border-slate-700/50 border-r border-b md:border-b-0 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:last:border-r-0 hover:bg-white/5 transition-colors">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-bold text-cyan-400 leading-none drop-shadow-md">{counts[i]}</span>
                <span className="text-xl font-bold text-cyan-400">{suffix}</span>
              </div>
              <span className="text-[10px] md:text-xs text-slate-400 tracking-wider text-center mt-1 uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70 hover:opacity-100 transition-opacity" aria-label="Scroll to explore"
        onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}>
        <span className="relative w-0.5 h-12 bg-cyan-400/20 rounded-full overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-4 bg-cyan-400 rounded-full animate-[floatY_1.5s_ease-in-out_infinite]" />
        </span>
        <span className="text-[10px] text-slate-500 tracking-widest uppercase drop-shadow-sm">Scroll</span>
      </a>
    </section>
  );
}
