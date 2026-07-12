'use client';

import { useEffect, useRef } from 'react';

const TIMELINE = [
  {
    side: 'left',
    role: 'Founder & Platform Architect',
    company: 'EduTech Startup',
    period: '2021 – Present',
    typeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    typeLabel: 'Entrepreneurial',
    bullets: [
      'Founded and architected a full-stack educational platform serving 500+ learners, designing the curriculum delivery engine, user management system, and payment flows.',
      'Built and led a cross-functional team of developers, content creators, and QA engineers — establishing coding standards, sprint cadences, and deployment pipelines.',
      'Drove platform uptime to 99.7% through proactive Linux server monitoring, automated backup workflows, and zero-downtime deployment strategies.',
      'Integrated AI-powered features (adaptive quizzes, AI tutor chatbot) using Gemini API, increasing learner engagement by 40%.',
    ],
    tags: ['Linux', 'Full-Stack', 'Gemini API', 'Leadership', 'System Design'],
  },
  {
    side: 'right',
    role: 'QA Automation Engineer',
    company: 'Software Solutions Firm',
    period: '2022 – Present',
    typeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    typeLabel: 'Operational',
    bullets: [
      'Designed and implemented end-to-end automation frameworks using Selenium WebDriver and TestNG, reducing regression cycle time from 3 days to 4 hours.',
      'Architected API test automation suites covering 300+ endpoints with comprehensive positive, negative, and boundary test cases.',
      'Migrated legacy test scripts to Playwright, improving flakiness rates from 22% to under 2% and enabling parallel cross-browser execution.',
      'Mentored junior QA engineers on automation best practices, design patterns (POM, factory), and CI/CD integration strategies.',
    ],
    tags: ['Selenium', 'Playwright', 'TestNG', 'API Testing', 'CI/CD'],
  },
  {
    side: 'left',
    role: 'Hub Operations Manager',
    company: 'Logistics & Operations',
    period: '2019 – 2021',
    typeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    typeLabel: 'Operational',
    bullets: [
      'Managed end-to-end hub operations for a regional logistics network, overseeing daily throughput of 2,000+ packages with a team of 25.',
      'Designed and rolled out process optimization workflows using data tracking spreadsheets and automated reporting scripts, reducing errors by 35%.',
      'Implemented a new shift scheduling system that cut overtime costs by 18% while maintaining SLA compliance.',
    ],
    tags: ['Operations', 'Process Optimization', 'Team Leadership', 'Automation Scripts'],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  // Mouse-tracking 3D tilt on cards
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.timeline-card');
    if (!cards) return;
    const handlers = Array.from(cards).map((card) => {
      let ticking = false;
      const onMove = (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
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
    <section id="experience" className="py-24 relative z-10" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// work_history</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">Experience &amp; Leadership</h2>
          <p className="max-w-xl text-slate-400">A track record of building, shipping, and leading across diverse domains.</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Center Line for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-slate-700 to-transparent" />

          <div className="flex flex-col gap-12 md:gap-0">
            {TIMELINE.map(({ side, role, company, period, typeClass, typeLabel, bullets, tags }) => (
              <div key={role} className={`relative flex flex-col md:flex-row items-center w-full ${side === 'left' ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center bg-[#080c18] rounded-full z-10">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
                </div>

                {/* Card */}
                <div className={`timeline-card w-full md:w-[calc(50%-3rem)] bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 transition-transform duration-300 ease-out preserve-3d shadow-[0_4px_32px_rgba(0,0,0,0.3)] ${side === 'left' ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100">{role}</h3>
                      <div className="text-cyan-400 font-medium text-sm mt-1">{company}</div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <span className="text-slate-400 font-mono text-sm">{period}</span>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${typeClass}`}>{typeLabel}</span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-3 mb-6">
                    {bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <span className="text-cyan-400 mt-1.5 opacity-60">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[11px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
