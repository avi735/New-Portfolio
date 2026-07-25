'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const EXPERTISE = [
  {
    index: '01',
    title: 'QA Automation Engineering',
    tagline: 'Turn 3-day regression cycles into 4-hour pipelines.',
    glowColor: 'rgba(34,211,238,0.15)',
    borderColor: 'border-cyan-400/50',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-400/10',
    accentBorder: 'border-cyan-400/20',
    statColor: 'text-cyan-400',
    stats: [
      { value: '95%',  label: 'Flakiness eliminated' },
      { value: '4h',   label: 'Regression cycle (was 3d)' },
      { value: '300+', label: 'API endpoints covered' },
    ],
    description:
      "I don't just write tests — I architect test ecosystems. From Selenium POM frameworks to Playwright parallel cross-browser suites, I've built automation that actually gets maintained and extended. The frameworks I've shipped have cut release risk by 80% while giving teams the confidence to deploy daily.",
    tools: ['Selenium WebDriver', 'Playwright', 'TestNG', 'JUnit', 'API Testing', 'Allure Reports', 'GitHub Actions', 'CI/CD'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
  },
  {
    index: '02',
    title: 'AI Integration & LLM Engineering',
    tagline: 'Ship products that think — not just tools that respond.',
    glowColor: 'rgba(167,139,250,0.15)',
    borderColor: 'border-purple-400/50',
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-400/10',
    accentBorder: 'border-purple-400/20',
    statColor: 'text-purple-400',
    stats: [
      { value: '40%', label: 'Learner engagement increase' },
      { value: '60%', label: 'Support ticket reduction' },
      { value: '2',   label: 'Production LLM systems shipped' },
    ],
    description:
      "I've shipped real production AI features — not prototypes. An adaptive chatbot tutor built with Gemini API that reduced instructor load by 60%, and a local LLM orchestrator that routes tasks intelligently between Ollama and cloud models. I understand context windows, prompt chaining, RAG pipelines, and the difference between a demo and a product.",
    tools: ['Gemini API', 'Ollama', 'LangChain', 'RAG Pipelines', 'Prompt Engineering', 'FastAPI', 'Python', 'Vector DBs'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    index: '03',
    title: 'Full-Stack Platform Development',
    tagline: 'From zero to production — database to deployment.',
    glowColor: 'rgba(52,211,153,0.15)',
    borderColor: 'border-emerald-400/50',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-400/10',
    accentBorder: 'border-emerald-400/20',
    statColor: 'text-emerald-400',
    stats: [
      { value: '500+',  label: 'Active learners on platform' },
      { value: '99.7%', label: 'Platform uptime achieved' },
      { value: '1',     label: 'Platform built from scratch' },
    ],
    description:
      "I founded and built an entire educational platform — curriculum engine, user management, payment flows, and content delivery — from nothing. That means I know what breaks under load, how schemas need to evolve, and how to make architectural decisions that don't cost you six months to undo.",
    tools: ['JavaScript', 'Node.js', 'Python', 'Next.js', 'REST APIs', 'MySQL', 'MongoDB', 'Nginx'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    index: '04',
    title: 'Linux & DevOps Infrastructure',
    tagline: 'Systems that stay up while others are paged at 3am.',
    glowColor: 'rgba(251,146,60,0.15)',
    borderColor: 'border-orange-400/50',
    accentText: 'text-orange-400',
    accentBg: 'bg-orange-400/10',
    accentBorder: 'border-orange-400/20',
    statColor: 'text-orange-400',
    stats: [
      { value: '99.7%', label: 'Server uptime maintained' },
      { value: '0',     label: 'Unplanned downtime incidents' },
      { value: '35%',   label: 'Process errors reduced' },
    ],
    description:
      "I've managed Linux servers in production — not just set them up. Automated backups, proactive monitoring, zero-downtime deployment strategies, and shell scripts that actually handle edge cases. Infrastructure should be invisible. When it works, nobody calls. I keep it that way.",
    tools: ['Linux', 'Bash Scripting', 'Nginx', 'Docker', 'Cron Jobs', 'System Monitoring', 'SSH', 'Git'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M5 12h14M5 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2m-5-4h.01M17 16h.01" />
      </svg>
    ),
  },
];

// ─── Stat badge ───────────────────────────────────────────────────────────────

function StatBadge({ value, label, accentText, accentBg, accentBorder, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: 0.25 + index * 0.07 }}
      className={`flex flex-col gap-0.5 px-3 py-2.5 rounded-xl ${accentBg} border ${accentBorder} flex-1 min-w-0`}
    >
      <span className={`text-xl font-extrabold tracking-tight font-mono ${accentText} leading-none`}>{value}</span>
      <span className="text-[10px] text-slate-400 leading-tight">{label}</span>
    </motion.div>
  );
}

// ─── Single expertise card ────────────────────────────────────────────────────

function ExpertiseCard({ item, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={`group relative flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'}
        bg-slate-900/40 border border-slate-800/60 rounded-2xl sm:rounded-3xl overflow-hidden
        transition-all duration-500 backdrop-blur-sm
        hover:border-opacity-100 ${item.borderColor.replace('border-', 'hover:border-').replace('/50', '/40')}`}
      style={{ boxShadow: inView ? undefined : 'none' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 60px ${item.glowColor}`; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Hover glow accent stripe — left edge on even, right on odd */}
      <div
        className={`absolute hidden lg:block top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500
          ${isEven ? 'left-0' : 'right-0'}`}
        style={{ background: `linear-gradient(to bottom, transparent, ${item.glowColor.replace('0.15', '0.9')}, transparent)` }}
        aria-hidden="true"
      />

      {/* ── Accent panel (left on desktop, top on mobile) ── */}
      <div
        className={`flex-shrink-0 lg:w-64 xl:w-72 p-5 sm:p-6 lg:p-8 flex flex-col gap-4 relative overflow-hidden
          border-b lg:border-b-0 ${isEven ? 'lg:border-r' : 'lg:border-l'} border-slate-800/60`}
      >
        {/* Radial glow blob */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, ${item.glowColor}, transparent 70%)` }}
          aria-hidden="true"
        />

        {/* Mobile top row: index + icon side by side */}
        <div className="flex items-center justify-between lg:block relative z-10">
          <span className={`font-mono text-5xl sm:text-6xl font-black leading-none select-none ${item.accentText} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}>
            {item.index}
          </span>
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${item.accentBg} border ${item.accentBorder} ${item.accentText}
            flex items-center justify-center flex-shrink-0 lg:mt-4
            group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-lg`}>
            <div className="w-6 h-6 sm:w-7 sm:h-7">{item.icon}</div>
          </div>
        </div>

        {/* Title + tagline */}
        <div className="relative z-10">
          <h3 className={`text-lg sm:text-xl font-extrabold text-slate-100 leading-snug mb-1.5 transition-colors duration-300 group-hover:${item.accentText}`}>
            {item.title}
          </h3>
          <p className={`text-xs sm:text-sm font-medium italic ${item.accentText} opacity-80 leading-snug`}>
            &ldquo;{item.tagline}&rdquo;
          </p>
        </div>

        {/* Stats — horizontal row on all screen sizes */}
        <div className="flex flex-row gap-2 relative z-10">
          {item.stats.map((s, si) => (
            <StatBadge
              key={s.label}
              {...s}
              accentText={item.accentText}
              accentBg={item.accentBg}
              accentBorder={item.accentBorder}
              index={si}
              inView={inView}
            />
          ))}
        </div>
      </div>

      {/* ── Content panel ── */}
      <div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6">
        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {item.description}
        </p>

        {/* Tools */}
        <div>
          <p className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-widest ${item.accentText} opacity-60 mb-2 sm:mb-3`}>
            Tools & Technologies
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {item.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-mono text-slate-300 bg-slate-800/70 border border-slate-700/50 rounded-lg transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* CTA — always visible on mobile (touch has no hover), slide-in on desktop */}
        <div className="flex justify-end mt-auto pt-2">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#projects');
              if (el) window.scrollTo({ top: el.offsetTop - 75, behavior: 'smooth' });
            }}
            className={`inline-flex items-center gap-2 text-sm font-semibold ${item.accentText}
              lg:opacity-0 lg:translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0
              transition-all duration-300`}
          >
            See related work
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 relative z-20 bg-[#080c18]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-12 sm:mb-20"
        >
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// core_expertise</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 leading-tight">
            How I Create <span className="text-gradient">Real Value</span>
          </h2>
          <p className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed px-2">
            Not a generalist with a skill list — four deep disciplines, each backed by{' '}
            <strong className="text-slate-300">shipped systems</strong>,{' '}
            <strong className="text-slate-300">measurable results</strong>, and real production experience.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {EXPERTISE.map((item, i) => (
            <ExpertiseCard key={item.index} item={item} i={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6
            p-6 sm:p-8 rounded-2xl sm:rounded-3xl
            bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-emerald-400/5 border border-slate-800/60"
        >
          <div className="text-center sm:text-left">
            <p className="text-slate-200 font-semibold text-base sm:text-lg">Ready to work together?</p>
            <p className="text-slate-400 text-sm mt-0.5">These aren&apos;t just skills — they&apos;re results I can replicate for you.</p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#contact');
              if (el) window.scrollTo({ top: el.offsetTop - 75, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto flex-shrink-0 text-center px-8 py-3.5 rounded-xl
              bg-gradient-to-r from-cyan-400 to-emerald-500 text-slate-950 font-bold
              hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-95 transition-all"
          >
            Let&apos;s Talk
          </a>
        </motion.div>

      </div>
    </section>
  );
}
