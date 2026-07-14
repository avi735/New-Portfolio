'use client';

const CERTS = [
  {
    name: 'Selenium WebDriver with Java',
    issuer: 'Udemy',
    year: '2022',
    iconClass: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  },
  {
    name: 'Playwright Test Automation',
    issuer: 'Udemy',
    year: '2023',
    iconClass: 'text-green-400 bg-green-400/10 border-green-400/20',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>,
  },
  {
    name: 'Linux System Administration',
    issuer: 'Coursera',
    year: '2022',
    iconClass: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  },
  {
    name: 'Generative AI with LLMs',
    issuer: 'DeepLearning.AI',
    year: '2024',
    iconClass: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Python for Automation & Scripting',
    issuer: 'Udemy',
    year: '2023',
    iconClass: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    name: 'REST API Testing with Postman',
    issuer: 'Postman Academy',
    year: '2023',
    iconClass: 'text-red-400 bg-red-400/10 border-red-400/20',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>,
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10 bg-[#0d1225]/80 backdrop-blur-sm border-y border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// education_&amp;_certs</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">Education &amp; Certifications</h2>
          <p className="max-w-xl text-slate-400">Academic foundations and professional credentials that back my expertise.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Degree card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md relative overflow-hidden group hover:border-cyan-400/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
              <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            
            <div className="w-14 h-14 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-100 mb-2 leading-tight">Bachelor of Science (B.Sc.)</h3>
            <p className="text-cyan-400 font-medium mb-6">Nalanda Open University</p>
            
            <div className="flex items-center justify-between">
              <span className="font-mono text-slate-400 text-sm">2022 – 2026</span>
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold rounded-full animate-pulse">
                Pursuing
              </span>
            </div>
          </div>

          {/* Certifications */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTS.map(({ name, issuer, year, iconClass, icon }) => (
              <div key={name} className="flex items-center gap-4 bg-slate-900/40 border border-slate-700/40 rounded-xl p-5 hover:bg-slate-800/60 hover:border-slate-600/60 transition-colors group">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl border ${iconClass} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <div className="w-6 h-6">{icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-200 text-sm truncate">{name}</h4>
                  <div className="text-xs text-slate-400 mt-1">{issuer}</div>
                </div>
                <div className="font-mono text-xs text-slate-500">{year}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
