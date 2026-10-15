import React, { useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  FileCode, 
  Binary, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pendidikan"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-dark-950 border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.education.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            {t.education.headingStart} <span className="text-gold-gradient">{t.education.headingGradient}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl font-normal">
            {t.education.subtitle}
          </p>
        </div>

        <div ref={contentRef} className="space-y-10">
          
          {/* Main Degree Card: Institut Teknologi Padang */}
          <div className="relative rounded-3xl glass-card border border-gold/30 p-8 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
            {/* Top gold bar glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: University & Honors */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {t.education.status}
                  </span>
                  <span className="text-neutral-400 text-xs font-mono">{t.education.period}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-2 leading-tight">
                  {t.education.institution}
                </h3>
                <h4 className="text-lg sm:text-xl font-medium text-gold mb-6">
                  {t.education.major}
                </h4>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-normal">
                  {t.education.description}
                </p>

                {/* Key Academic Milestones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {t.education.milestones?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: IPK Spotlight Badge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-gold/40 text-center relative shadow-xl">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold mb-4 shadow-lg shadow-gold/20">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-xs uppercase font-mono tracking-widest text-gold-300 mb-1">
                  {t.education.ipkLabel}
                </div>
                <div className="text-5xl sm:text-6xl font-display font-extrabold text-white mb-2 tracking-tight">
                  3.68 <span className="text-xl text-neutral-500 font-mono">/ 4.00</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-gold/20 text-gold-200 border border-gold/40">
                  {t.education.honorsBadge}
                </div>
              </div>

            </div>

            {/* Skripsi Highlight Box */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
              <div className="p-4 sm:p-6 rounded-2xl bg-dark-850/80 border border-white/10">
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mb-2.5 sm:mb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-amber-400">
                    <Binary className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{t.education.thesisTag}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-400 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                    {t.education.thesisGrade}
                  </span>
                </div>

                <h4 className="text-sm sm:text-lg md:text-xl font-bold font-display text-white mb-2 sm:mb-3 leading-snug">
                  {t.education.thesisTitle}
                </h4>

                <p className="text-[11px] sm:text-xs md:text-sm text-neutral-300 leading-relaxed mb-3 sm:mb-4">
                  {t.education.thesisDesc}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-400">{t.education.thesisStackLabel}</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    FastAPI (Python)
                  </span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    Laravel
                  </span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    React.js
                  </span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    Holt-Winters Algorithm
                  </span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    MySQL
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Certifications & Badges Row */}
          <div>
            <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-400 mb-3 sm:mb-4 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0" />
              <span>{t.education.certTitle}</span>
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-2.5 sm:gap-6">
              
              {/* Cert 1: AWS AI Academy */}
              <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl glass-card border border-white/10 hover:border-gold/50 transition-all duration-300 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h5 className="text-xs sm:text-base font-bold text-white line-clamp-1 sm:line-clamp-none">{t.education.awsTitle}</h5>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase px-1.5 py-0.5 sm:px-2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-fit">{t.education.awsBadge}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-neutral-400 mt-1 line-clamp-2 sm:line-clamp-none leading-snug sm:leading-relaxed">
                    {t.education.awsDesc}
                  </p>
                </div>
              </div>

              {/* Cert 2: Google Skillshop */}
              <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl glass-card border border-white/10 hover:border-gold/50 transition-all duration-300 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h5 className="text-xs sm:text-base font-bold text-white line-clamp-1 sm:line-clamp-none">{t.education.googleTitle}</h5>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase px-1.5 py-0.5 sm:px-2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-fit">{t.education.googleBadge}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-neutral-400 mt-1 line-clamp-2 sm:line-clamp-none leading-snug sm:leading-relaxed">
                    {t.education.googleDesc}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
