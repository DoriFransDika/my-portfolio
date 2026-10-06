import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitFlapText from './SplitFlapText';

/**
 * Preloader — Splash screen with SplitFlapText mechanical animation.
 * Features single main phrase "DORI FRANS DIKA".
 * Total display duration ~2 seconds, followed by a smooth Slide-Up & Fade-Out exit transition (600ms).
 */
export default function Preloader({ onFinished }) {
  const [flipDone, setFlipDone] = useState(false);
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  const handleFlipComplete = () => {
    setFlipDone(true);
  };

  useEffect(() => {
    if (!flipDone) return;

    // GSAP exit animation: smooth slide up + fade out (600ms)
    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinished) onFinished();
      },
    });

    tl.to(contentRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    }).to(
      preloaderRef.current,
      {
        yPercent: -100,
        duration: 0.6,
        ease: 'power3.inOut',
      },
      '-=0.1'
    );
  }, [flipDone, onFinished]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center select-none"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #121212 50%, #0d0d0d 100%)',
      }}
    >
      {/* Subtle ambient warm glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-[130px]" />
      </div>

      {/* Main content wrapper */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Top decorative line */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-500/60" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400/80">
            Portfolio 2026
          </span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-500/60" />
        </div>

        {/* Split Flap Display - Main Word: DORI FRANS DIKA */}
        <SplitFlapText
          words={['DORI FRANS DIKA']}
          tileColor="#121212"
          textColor="#f59e0b"
          fontSize="clamp(1.2rem, 3.6vw, 2.6rem)"
          flipDuration={35}
          staggerDelay={18}
          holdDuration={550}
          onComplete={handleFlipComplete}
        />

        {/* Bottom loading status */}
        <div className="flex items-center gap-2.5 mt-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse"
                style={{ animationDelay: `${i * 180}ms` }}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Initializing
          </span>
        </div>
      </div>

      {/* Modern corner accents */}
      <div className="absolute top-6 left-6 w-7 h-7 border-t border-l border-amber-500/30 pointer-events-none" />
      <div className="absolute top-6 right-6 w-7 h-7 border-t border-r border-amber-500/30 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-7 h-7 border-b border-l border-amber-500/30 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-7 h-7 border-b border-r border-amber-500/30 pointer-events-none" />
    </div>
  );
}
