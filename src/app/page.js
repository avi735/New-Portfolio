'use client';

import { useEffect, useRef } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function Home() {
  const scrollProgressRef = useRef(null);

  useEffect(() => {
    // ---- SCROLL PROGRESS BAR ----
    const progress = scrollProgressRef.current;
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      if (progress) progress.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---- CURSOR GLOW EFFECT ----
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(34, 211, 238, 0.04) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: left 0.1s, top 0.1s;
      left: -9999px;
      top: -9999px;
    `;
    document.body.appendChild(glow);

    const onMouseMove = (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', onMouseMove);

    // ---- SECTION TRANSITION OBSERVER (SCROLL REVEAL) ----
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // We can query all elements that need reveal animation
    const revealSelectors = [
      '.about-grid > *',
      '.timeline-card',
      '.edu-degree-card',
      '.cert-card',
      '.skill-category',
      '.project-card',
      '.contact-grid > *',
      '.tech-cloud',
    ];

    // Wait a tick for child components to render, then observe
    setTimeout(() => {
      revealSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          el.classList.add('reveal');
          revealObserver.observe(el);
        });
      });
      // Observe top level sections for simple opacity transition too
      document.querySelectorAll('section').forEach((s) => {
        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              sectionObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05 });
        sectionObserver.observe(s);
      });
    }, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousemove', onMouseMove);
      if (glow.parentNode) glow.parentNode.removeChild(glow);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Preloader />
      <div className="scroll-progress" id="scroll-progress" ref={scrollProgressRef}></div>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
