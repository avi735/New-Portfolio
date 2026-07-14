'use client';

import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      const sections = document.querySelectorAll('section[id]');
      const scrollPos = y + 130;
      sections.forEach((s) => {
        const top = s.offsetTop;
        const bottom = top + s.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) setActiveId(s.id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleAnchorClick = (e, href) => {
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      ref={navRef}
      className={`fixed top-0 left-0 right-0 h-[75px] z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-transparent shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-1 font-mono font-bold text-xl hover:scale-105 transition-transform"
          onClick={(e) => handleAnchorClick(e, '#home')}
        >
          <span className="text-cyan-400 transition-colors group-hover:text-emerald-400">&lt;</span>
          <span className="text-slate-100">Avinash Kumar</span>
          <span className="text-cyan-400 transition-colors group-hover:text-emerald-400">/&gt;</span>
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-cyan-400/10 transition-colors z-50 relative"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((p) => !p)}
        >
          {menuOpen ? (
            <svg className="text-slate-100" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <>
              <span className="w-6 h-0.5 bg-slate-100 rounded-full" />
              <span className="w-6 h-0.5 bg-slate-100 rounded-full" />
              <span className="w-6 h-0.5 bg-slate-100 rounded-full" />
            </>
          )}
        </button>

        {/* Nav links */}
        <ul className={`
          absolute top-[75px] left-0 right-0 bg-[#020617]/95 backdrop-blur-2xl border-b border-slate-800 p-6 flex flex-col gap-3 shadow-2xl transition-all duration-300 origin-top
          md:static md:bg-transparent md:border-none md:p-0 md:flex-row md:items-center md:gap-2 md:shadow-none md:translate-x-0 md:opacity-100 md:scale-y-100
          ${menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 md:scale-y-100 md:opacity-100'}
        `}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className="w-full md:w-auto">
              <a
                href={href}
                className={`block w-full text-center md:inline-block relative px-4 py-3 md:py-2 rounded-lg text-[15px] font-medium transition-all duration-300 ${
                  activeId === href.slice(1) 
                    ? 'text-cyan-400 bg-cyan-400/10' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
                onClick={(e) => handleAnchorClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
            <a
              href="#contact"
              className="block text-center w-full md:w-auto px-6 py-2.5 rounded-lg text-[15px] font-bold border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:-translate-y-0.5 transition-all"
              onClick={(e) => handleAnchorClick(e, '#contact')}
            >
              Hire Me
            </a>
          </li>
        </ul>

      </div>
    </nav>
  );
}
