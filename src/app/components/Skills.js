'use client';

import { useEffect, useRef } from 'react';

const SKILL_CATEGORIES = [
  {
    title: 'Automation & QA',
    iconClass: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    accent: 'bg-cyan-400',
    skills: [
      { name: 'Selenium WebDriver', pct: 95 },
      { name: 'Playwright',         pct: 88 },
      { name: 'TestNG / JUnit',     pct: 90 },
      { name: 'API Test Automation', pct: 92 },
    ],
  },
  {
    title: 'Systems & Infrastructure',
    iconClass: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8M12 17v4" /></svg>,
    accent: 'bg-orange-400',
    skills: [
      { name: 'Linux Administration',   pct: 88 },
      { name: 'Shell Scripting (Bash)',  pct: 85 },
      { name: 'System Architecture',    pct: 80 },
      { name: 'CI/CD Pipelines',        pct: 82 },
    ],
  },
  {
    title: 'Development',
    iconClass: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    accent: 'bg-indigo-400',
    skills: [
      { name: 'JavaScript / Node.js', pct: 85 },
      { name: 'HTML & CSS',           pct: 90 },
      { name: 'Python',               pct: 78 },
      { name: 'Java',                 pct: 82 },
    ],
  },
  {
    title: 'AI & Emerging Tech',
    iconClass: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    accent: 'bg-purple-400',
    skills: [
      { name: 'LLM Integration',       pct: 85 },
      { name: 'Gemini API',            pct: 88 },
      { name: 'Ollama / Local LLMs',   pct: 80 },
      { name: 'Prompt Engineering',    pct: 87 },
    ],
  },
];

const TECH_PILLS = [
  'Git', 'Docker', 'Postman', 'REST APIs', 'MySQL', 'MongoDB',
  'VS Code', 'GitHub Actions', 'Jira', 'Figma', 'Telegram Bot API', 'Nginx',
];

export default function Skills() {
  const sectionRef = useRef(null);

  // Animate skill bars on intersection
  useEffect(() => {
    const bars = sectionRef.current?.querySelectorAll('.skill-bar-fill');
    if (!bars?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.getAttribute('data-width') + '%';
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach((bar) => observer.observe(bar));
    return () => observer.disconnect();
  }, []);

  // Mouse-tracking 3D tilt on skill category cards
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.skill-category');
    if (!cards) return;
    const handlers = Array.from(cards).map((card) => {
      let ticking = false;
      const onMove = (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
            ticking = false;
          });
          ticking = true;
        }
      };
      const onLeave = () => { card.style.transform = ''; };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      return { card, onMove, onLeave };
    });
    return () => handlers.forEach(({ card, onMove, onLeave }) => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
  }, []);

  return (
    <section id="skills" className="py-24 relative z-10" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// tech_stack</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">Skills Matrix</h2>
          <p className="max-w-xl text-slate-400">Technologies and tools I use to architect, build, and automate.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map(({ title, iconClass, icon, accent, skills }) => (
            <div key={title} className="skill-category bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm transition-transform duration-300 ease-out preserve-3d shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-4 mb-8 translate-z-[20px]">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${iconClass}`}>
                  <div className="w-6 h-6">{icon}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-100">{title}</h3>
              </div>
              <div className="flex flex-col gap-5 translate-z-[10px]">
                {skills.map(({ name, pct }) => (
                  <div key={name} className="w-full">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-slate-300">{name}</span>
                      <span className="text-xs font-mono text-cyan-400">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`skill-bar-fill h-full w-0 ${accent} rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]`}
                        data-width={pct}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center text-center">
          <p className="text-sm text-slate-400 mb-6 uppercase tracking-wider">Also experienced with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_PILLS.map((pill) => (
              <span key={pill} className="px-4 py-2 text-sm text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
