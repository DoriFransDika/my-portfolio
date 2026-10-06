import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const marqueeText = "DORI FRANS DIKA — FULL STACK DEVELOPER — CUMLAUDE GRADUATE (IPK 3.68) — FASTAPI & LARAVEL — DATA FORECASTING — ";

  return (
    <footer className="relative bg-dark-950 border-t border-white/10 overflow-hidden pt-12 pb-16">
      
      {/* Running Marquee Text Strip */}
      <div className="relative w-full overflow-hidden py-4 border-y border-gold/20 bg-dark-900/80 mb-12">
        <div className="flex whitespace-nowrap overflow-hidden select-none">
          <div className="animate-marquee inline-block font-display font-extrabold text-xl sm:text-2xl tracking-widest text-gold/80 uppercase">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
          <div className="animate-marquee inline-block font-display font-extrabold text-xl sm:text-2xl tracking-widest text-gold/80 uppercase" aria-hidden="true">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Subtitle */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_#d4af37]" />
              <span>Dori Frans Dika<span className="text-gold">.</span></span>
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Fresh Graduate S1 Teknik Informatika (Cumlaude, IPK 3.68) — Institut Teknologi Padang
            </p>
          </div>

          {/* Quick links & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-neutral-400 font-mono">
            <div>
              &copy; {new Date().getFullYear()} Dori Frans Dika. All rights reserved.
            </div>

            {/* Back to top button */}
            <button
              type="button"
              onClick={handleScrollToTop}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-gold/50 text-neutral-300 hover:text-gold transition-all duration-300"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
