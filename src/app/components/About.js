'use client';

import { useEffect, useRef } from 'react';

const FACTS = [
  { icon: '🛠️', title: 'Automation First',  desc: 'Selenium, Playwright, TestNG' },
  { icon: '🧠', title: 'AI Integration',    desc: 'Gemini, Ollama, LLM Pipelines' },
  { icon: '🐧', title: 'Linux Systems',     desc: 'Administration & Infrastructure' },
  { icon: '🚀', title: 'Entrepreneur',      desc: 'Educational Platform Founder' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.fact-card');
    cards?.forEach((card, i) => { 
      card.style.animationDelay = `${i * 120}ms`;
      card.classList.add('animate-fade-up');
    });
  }, []);

  return (
    <section id="about" className="py-24 relative z-10 bg-[#0d1225]/80 backdrop-blur-sm border-y border-slate-800/50" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// about_me</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">Who I Am</h2>
          <p className="max-w-xl text-slate-400">
            A passionate technologist at the intersection of automation, infrastructure, and AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Pseudo-3D Avatar / Logo */}
            <div className="relative w-48 h-48 mb-10 group perspective-1000">
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-[spin_10s_linear_infinite]" style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }} />
              <div className="absolute inset-2 rounded-full border border-violet-400/30 animate-[spin_15s_linear_infinite_reverse]" style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }} />
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-full border border-cyan-400/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.4)] transition-all duration-500 preserve-3d group-hover:rotate-y-180">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400 backface-hidden">
                  AK
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-cyan-400 backface-hidden [transform:rotateY(180deg)]">
                  &lt;/&gt;
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FACTS.map(({ icon, title, desc }) => (
                <div key={title} className="fact-card opacity-0 translate-y-4 bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col gap-2 hover:bg-slate-800/80 hover:border-cyan-500/30 transition-all">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <span className="block text-sm font-bold text-slate-200">{title}</span>
                    <span className="block text-xs text-slate-400 mt-1">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-slate-300 leading-relaxed text-lg">
            <p className="text-xl text-slate-200 font-medium border-l-4 border-cyan-400 pl-4 py-1" suppressHydrationWarning>
              I&apos;m an engineer who doesn&apos;t just write code - I build <strong className="text-cyan-400">systems</strong> that outlast sprints and scale beyond expectations.
            </p>
            <p>
              With a background spanning QA automation, full-stack development, and Linux system
              management, I&apos;ve shipped solutions across testing frameworks, educational
              platforms, and AI-powered tools. I founded and managed an educational platform from
              the ground up, which taught me as much about leadership and product thinking as any
              framework ever could.
            </p>
            <p suppressHydrationWarning>
              Today, I&apos;m especially excited about the intersection of <strong className="text-violet-400">AI and automation</strong> - building intelligent workflows with LLMs like Gemini and Ollama that don&apos;t just save hours but rethink what&apos;s possible.
            </p>
            <p>
              When I&apos;m not engineering, I&apos;m exploring emerging tech, contributing to open
              source, and helping teams level up their testing culture.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors">
                See My Work
              </a>
              <a href="/resume.pdf" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors" download>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
