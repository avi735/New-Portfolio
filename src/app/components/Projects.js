'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import thumb1 from '../../../public/project_thumb_1.png';
import thumb2 from '../../../public/project_thumb_2.png';
import thumb3 from '../../../public/project_thumb_3.png';
import thumb4 from '../../../public/project_thumb_4.png';

const GITHUB_PATH = 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';

const GithubIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={GITHUB_PATH} /></svg>;
const ExternalIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const PROJECTS = [
  {
    id: 'project-telegram-bot',
    num: '01',
    featured: true,
    title: 'Automated Telegram Code Redeemer Bot',
    titleId: 'proj1-title',
    desc: "Built an automated bot that monitors Telegram channels for promo codes, validates them in real-time against a target platform's API, and executes redemption workflows — eliminating manual effort entirely. The bot now handles 200+ redemptions daily with zero human intervention, saving 3+ hours of manual work per day and achieving a 99.2% success rate.",
    tags: ['Python', 'Telegram Bot API', 'REST API', 'Asyncio', 'Linux Cron'],
    thumb: <Image src={thumb1} alt="Telegram Code Redeemer Bot" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain object-center p-4 md:p-6" />,
    status: 'live',
    statusLabel: '● Live',
    links: [
      { label: 'GitHub', href: '#', icon: <GithubIcon /> },
      { label: 'Live Demo', href: '#', icon: <ExternalIcon />, primary: true },
    ],
  },
  {
    id: 'project-qa-framework',
    num: '02',
    featured: false,
    title: 'Enterprise QA Automation Framework',
    titleId: 'proj2-title',
    desc: 'Architected a modular, multi-layer test automation framework from scratch using Selenium + TestNG with a robust Page Object Model. Integrated with CI/CD via GitHub Actions and generates rich Allure reports. Reduced regression cycle from 3 days to 4 hours and slashed flakiness to under 2%.',
    tags: ['Selenium', 'TestNG', 'Java', 'POM Pattern', 'Allure', 'GitHub Actions'],
    thumb: <Image src={thumb2} alt="Enterprise QA Automation Framework" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain object-center p-4 md:p-6" />,
    status: 'in-use',
    statusLabel: '● In Use',
    links: [{ label: 'GitHub', href: '#', icon: <GithubIcon /> }],
  },
  {
    id: 'project-ai-tutor',
    num: '03',
    featured: false,
    title: 'AI-Powered Tutor Chatbot (Gemini)',
    titleId: 'proj3-title',
    desc: 'Built an adaptive AI tutor integrated into the educational platform using the Gemini API. The bot understands course context, answers student queries, generates practice questions, and adapts difficulty based on performance history. Increased learner engagement by 40% and reduced instructor support tickets by 60%.',
    tags: ['Gemini API', 'Python', 'JavaScript', 'RAG', 'Prompt Engineering'],
    thumb: <Image src={thumb3} alt="AI-Powered Tutor Chatbot (Gemini)" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain object-center p-4 md:p-6" />,
    status: 'live',
    statusLabel: '● Live',
    links: [
      { label: 'GitHub', href: '#', icon: <GithubIcon /> },
      { label: 'Live', href: '#', icon: <ExternalIcon />, primary: true },
    ],
  },
  {
    id: 'project-local-llm',
    num: '04',
    featured: false,
    title: 'Local LLM Workflow Orchestrator',
    titleId: 'proj4-title',
    desc: "Created a privacy-first workflow orchestration tool that routes prompts intelligently between local Ollama models and cloud LLMs based on task sensitivity and complexity. Features a CLI interface, task queue management, and a lightweight web UI for monitoring. Enables fully offline AI-powered automation.",
    tags: ['Ollama', 'Python', 'LangChain', 'FastAPI', 'Docker'],
    thumb: <Image src={thumb4} alt="Local LLM Workflow Orchestrator" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain object-center p-4 md:p-6" />,
    status: 'oss',
    statusLabel: '● Open Source',
    links: [{ label: 'GitHub', href: '#', icon: <GithubIcon /> }],
  },
];

export default function Projects() {
  const gridRef = useRef(null);

  // Enhanced 3D tilt effect
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (!cards) return;
    const handlers = Array.from(cards).map((card) => {
      let ticking = false;
      const onMove = (e) => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
            card.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px rgba(0,0,0,0.4), 0 0 40px rgba(34,211,238,0.1)`;
            ticking = false;
          });
          ticking = true;
        }
      };
      const onLeave = () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      };
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
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// featured_work</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">Featured Projects</h2>
          <p className="max-w-xl text-slate-400">Selected work that demonstrates engineering depth and real-world impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={gridRef}>
          {PROJECTS.map(({ id, num, featured, title, titleId, desc, tags, thumb, status, statusLabel, links }, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={titleId}
              className={`project-card group relative flex flex-col ${featured ? 'md:flex-row md:col-span-2' : ''} bg-[#111827]/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 rounded-3xl overflow-hidden transition-all duration-500`}
              style={{ perspective: '1000px' }}
            >
              {/* Thumbnail Area */}
              <div 
                className={`relative ${featured ? 'md:w-1/2' : 'w-full'} min-h-[300px] overflow-hidden bg-slate-900 border-r border-white/5 group-hover:border-cyan-500/20 transition-colors`}
              >
                {thumb}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${status === 'live' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                      status === 'in-use' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                        'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    }`}>
                    {statusLabel}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className={`p-8 flex flex-col justify-center ${featured ? 'md:w-1/2' : 'flex-1'}`}>
                <div className="font-mono text-4xl font-bold text-slate-800/80 mb-2">{num}</div>
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors" id={titleId}>{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{desc}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[11px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  {links.map(({ label, href, icon, primary }) => (
                    <a key={label} href={href} className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${primary ? 'text-cyan-400 hover:text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                      }`} aria-label={label}>
                      {icon}
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a href="https://github.com/avi735" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-400 bg-slate-900/50 hover:bg-cyan-400/10 transition-all" target="_blank" rel="noopener">
            View All Projects on GitHub
            <ExternalIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
