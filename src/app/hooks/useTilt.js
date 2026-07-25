'use client';

import { useEffect } from 'react';

/**
 * Attaches a mouse-tracking 3D tilt effect to all elements matching
 * the given CSS selector within containerRef.
 *
 * Optimisations:
 * - SKIPS entirely on touch-only devices (hover:none media query) — eliminates
 *   forced reflow on mobile where mouse events never fire anyway.
 * - Caches element rects via ResizeObserver — getBoundingClientRect is called
 *   once on mouseenter, not on every mousemove.
 * - All DOM writes batched inside requestAnimationFrame.
 *
 * @param {React.RefObject} containerRef  – ref to the container element
 * @param {string}          selector      – CSS selector for tilt targets
 * @param {object}          [opts]
 * @param {number}          [opts.maxDeg=5]   – max rotation degrees
 * @param {number}          [opts.liftPx=4]   – px to lift on hover
 */
export function useTilt(containerRef, selector, { maxDeg = 5, liftPx = 4 } = {}) {
  useEffect(() => {
    // Mobile / touch-only devices don't fire mousemove events.
    // Attaching listeners on them is pure wasted work that causes forced reflow.
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;

    const cards = containerRef.current?.querySelectorAll(selector);
    if (!cards?.length) return;

    const handlers = Array.from(cards).map((card) => {
      let cachedRect = null;
      let ticking = false;

      // Only re-query getBoundingClientRect when the element resizes
      const ro = new ResizeObserver(() => { cachedRect = null; });
      ro.observe(card);

      const onMove = (e) => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
          if (!cachedRect) cachedRect = card.getBoundingClientRect();
          const x = (e.clientX - cachedRect.left) / cachedRect.width - 0.5;
          const y = (e.clientY - cachedRect.top) / cachedRect.height - 0.5;
          card.style.transform = `translateY(-${liftPx}px) rotateX(${-y * maxDeg}deg) rotateY(${x * maxDeg}deg)`;
          ticking = false;
        });
      };

      const onEnter = () => {
        cachedRect = card.getBoundingClientRect();
      };

      const onLeave = () => {
        card.style.transform = '';
        cachedRect = null;
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      return { card, onEnter, onMove, onLeave, ro };
    });

    return () => {
      handlers.forEach(({ card, onEnter, onMove, onLeave, ro }) => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
        ro.disconnect();
      });
    };
  }, [containerRef, selector, maxDeg, liftPx]);
}
