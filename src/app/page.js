'use client';

import { useEffect, useRef } from 'react';
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

    // ---- SECTION TRANSITION OBSERVER (SCROLL REVEAL) ----
    const revealObserver = new IntersectionObserver((entries) => {
      // Use a persistent counter so stagger delay is consistent across batches
      let delay = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          delay += 80;
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // CSS selectors for elements that get the reveal animation
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
    }, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
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
