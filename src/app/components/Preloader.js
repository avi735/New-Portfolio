'use client';

import { useEffect, useRef } from 'react';

// Matrix rain characters
const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨ';

export default function Preloader() {
  const preloaderRef = useRef(null);
  const fillRef      = useRef(null);
  const matrixRef    = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const fill      = fillRef.current;
    const matrix    = matrixRef.current;
    if (!preloader || !fill || !matrix) return;

    // Matrix rain columns
    const colCount = Math.floor(window.innerWidth / 20);
    const cols = Array.from({ length: colCount }, (_, i) => {
      const col = document.createElement('div');
      col.className = 'absolute top-[-100%] text-cyan-400/15 font-mono text-xs whitespace-pre select-none animate-[matrixRain_linear_infinite]';
      col.style.left     = `${i * 20}px`;
      col.style.animationDuration = `${Math.random() * 4 + 3}s`;
      col.style.animationDelay   = `${Math.random() * 3}s`;
      // Generate random char string
      const len = Math.floor(Math.random() * 20 + 10);
      col.textContent = Array.from({ length: len }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ).join('\n');
      matrix.appendChild(col);
      return col;
    });

    // Progress bar
    let fillWidth = 0;
    const fillInterval = setInterval(() => {
      fillWidth += Math.random() * 18 + 8;
      if (fillWidth >= 100) {
        fillWidth = 100;
        clearInterval(fillInterval);
        setTimeout(() => {
          preloader.style.opacity = '0';
          preloader.style.visibility = 'hidden';
          preloader.style.pointerEvents = 'none';
        }, 350);
      }
      fill.style.width = fillWidth + '%';
    }, 120);

    const onLoad = () => {
      clearInterval(fillInterval);
      fill.style.width = '100%';
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        preloader.style.pointerEvents = 'none';
      }, 400);
    };
    window.addEventListener('load', onLoad);

    return () => {
      clearInterval(fillInterval);
      window.removeEventListener('load', onLoad);
      cols.forEach((c) => c.remove());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#080c18] flex items-center justify-center overflow-hidden transition-all duration-700" ref={preloaderRef}>
      {/* Matrix rain */}
      <div className="absolute inset-0 pointer-events-none" ref={matrixRef} />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="font-mono text-4xl font-bold animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          <span className="text-cyan-400">&lt;</span>
          <span className="text-slate-100">Avinash</span>
          <span className="text-cyan-400">/&gt;</span>
        </div>
        <div className="w-56 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all shadow-[0_0_10px_#22d3ee]" ref={fillRef} />
        </div>
        <span className="font-mono text-[10px] text-slate-500 tracking-[0.2em] uppercase">Initializing portfolio...</span>
      </div>
    </div>
  );
}
