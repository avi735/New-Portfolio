'use client';
import SpotlightCard from './SpotlightCard';

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    backIcon: '⚡',
    iconClass: 'text-cyan-400 bg-cyan-400/10',
    title: 'QA Automation',
    description: 'End-to-end test frameworks using Selenium, Playwright & TestNG — turning manual regression into automated pipelines that catch bugs before users do.',
    tags: ['Selenium', 'Playwright', 'TestNG', 'API Testing'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    backIcon: '🌐',
    iconClass: 'text-emerald-400 bg-emerald-400/10',
    title: 'Full-Stack Development',
    description: 'Building robust web platforms from database schema to pixel-perfect UI — scalable architecture with clean, maintainable code at every layer.',
    tags: ['JavaScript', 'Python', 'HTML/CSS', 'REST APIs'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    backIcon: '🐧',
    iconClass: 'text-teal-400 bg-teal-400/10',
    title: 'Linux & Infrastructure',
    description: 'Server administration, automated deployments, monitoring and zero-downtime strategies that keep platforms healthy and resilient around the clock.',
    tags: ['Linux', 'Bash', 'Nginx', 'Docker'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    backIcon: '🧠',
    iconClass: 'text-purple-400 bg-purple-400/10',
    title: 'AI Integration',
    description: 'Embedding LLMs (Gemini, Ollama) into real products — chatbots, adaptive tools and intelligent automation that rethink what software can do.',
    tags: ['Gemini API', 'Ollama', 'LangChain', 'Prompt Eng.'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative z-20 bg-[#080c18]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// what_i_do</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">What I Bring to the Table</h2>
          <p className="max-w-xl text-slate-400">Four core disciplines I practice daily to build systems that last.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon, iconClass, title, description, tags }) => (
            <SpotlightCard key={title} className="group h-[360px] bg-[#0f172a] border border-slate-800 rounded-2xl p-6 overflow-hidden hover:border-cyan-400/30 transition-colors duration-500">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-t-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="h-full relative z-10 flex flex-col">
                
                {/* Header (Icon + Title) - Starts shifted down, moves up to natural position on hover */}
                <div className="flex flex-col gap-4 transition-transform duration-500 ease-out transform translate-y-12 group-hover:translate-y-0">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass} transition-all duration-500 group-hover:scale-90 group-hover:-translate-x-1 origin-left`}>
                    <div className="w-7 h-7">{icon}</div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-xl tracking-tight transition-colors duration-500 group-hover:text-cyan-400">{title}</h3>
                </div>

                {/* Content (Description + Tags) - Fades in and slides up naturally into the flex space */}
                <div className="mt-2 flex flex-col justify-end flex-1 opacity-0 translate-y-8 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{description}</p>
                  
                  <ul className="flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((t) => (
                      <li key={t} className="text-[11px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2.5 py-1 shadow-sm">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
