'use client';

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
    iconClass: 'text-violet-400 bg-violet-400/10',
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
    iconClass: 'text-orange-400 bg-orange-400/10',
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
    <section id="services" className="py-24 relative z-10 bg-[#080c18]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// what_i_do</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">What I Bring to the Table</h2>
          <p className="max-w-xl text-slate-400">Four core disciplines I practice daily to build systems that last.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon, backIcon, iconClass, title, description, tags }) => (
            <div key={title} className="group relative h-[320px] perspective-1000">
              <div className="w-full h-full preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass}`}>
                    <div className="w-6 h-6">{icon}</div>
                  </div>
                  <h3 className="font-bold text-slate-100 text-lg">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{description}</p>
                  <ul className="flex flex-wrap gap-2 mt-auto">
                    {tags.slice(0,3).map((t) => (
                      <li key={t} className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2 py-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-400/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)]">
                  <div className="text-4xl mb-3">{backIcon}</div>
                  <div className="font-bold text-slate-100 text-lg mb-4">{title}</div>
                  <ul className="flex flex-wrap justify-center gap-2 mb-4">
                    {tags.map((t) => (
                      <li key={t} className="text-[11px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2.5 py-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-400">Hover reveals my expertise — click links below to explore.</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
