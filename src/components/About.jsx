import React, { useEffect, useRef } from 'react';
import { Award, GraduationCap, BrainCircuit, Target, CheckCircle2, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up reveal for narrative text and stats
      if (textContentRef.current) {
        gsap.fromTo(
          textContentRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textContentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Photo gallery reveal with subtle rotation and scaling
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.querySelectorAll('.gallery-card'),
          { opacity: 0, y: 45, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
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
      id="tentang"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-white/60 dark:bg-dark-900/60 border-t border-gray-200/80 dark:border-white/5 overflow-hidden transition-colors duration-300"
    >
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-gold/10 border border-amber-500/20 dark:border-gold/25 text-xs font-mono text-amber-700 dark:text-gold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.about.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
            {t.about.headingStart} <span className="text-gold-gradient">{t.about.headingGradient}</span>.
          </h2>
        </div>

        {/* ─── TAMPILAN MOBILE: Paragraf dipersingkat menjadi poin-poin/chips (flex-wrap) ─── */}
        <div className="block lg:hidden mb-8">
          <div className="p-5 rounded-2xl glass-card border border-gray-200 dark:border-gold/20 shadow-sm dark:shadow-none mb-4">
            <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed mb-4">
              {t.about.narrative}
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-semibold bg-amber-500/10 dark:bg-gold/15 text-amber-700 dark:text-gold border border-amber-500/30 dark:border-gold/30">
                🎓 Cum Laude (IPK 3.68)
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-semibold bg-amber-500/10 dark:bg-gold/15 text-amber-700 dark:text-gold border border-amber-500/30 dark:border-gold/30">
                💻 Full-Stack Web Dev
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-semibold bg-amber-500/10 dark:bg-gold/15 text-amber-700 dark:text-gold border border-amber-500/30 dark:border-gold/30">
                📈 Data Analytics &amp; Forecasting
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-neutral-300">
                📐 Clean Architecture
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-neutral-300">
                🤝 Team Collaboration
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-neutral-300">
                🧩 Problem Solving
              </span>
            </div>
          </div>
        </div>

        {/* ─── TAMPILAN DESKTOP & DETAIL: Grid 2 Kolom Sejajar dengan Galeri Foto Asli ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative Profile & Highlights */}
          <div ref={textContentRef} className="lg:col-span-6 space-y-8">
            
            {/* Main Narrative Paragraph with Golden Corner Accent */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none relative">
              <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 w-3 h-3 border-t-2 border-r-2 border-amber-500 dark:border-gold pointer-events-none" />
              <p className="text-base sm:text-lg text-gray-700 dark:text-neutral-300 leading-relaxed font-normal">
                {t.about.narrative}
              </p>
            </div>

            {/* Quick Stats Grid: 2 Kolom 1 Baris di Mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4">
              
              {/* Stat 1: Cumlaude */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-dark-800/60 border border-gray-200 dark:border-gold/20 hover:border-amber-400 dark:hover:border-gold/40 shadow-sm dark:shadow-none transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-amber-500/10 dark:bg-gold/15 text-amber-600 dark:text-gold border border-amber-500/30 dark:border-gold/30 w-fit">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase font-mono text-gray-500 dark:text-neutral-400 block leading-tight">{t.about.statAcademicTitle}</span>
                      <h4 className="text-base sm:text-xl font-bold font-mono text-gray-900 dark:text-white">IPK 3.68</h4>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-neutral-300 leading-snug line-clamp-2 sm:line-clamp-none">
                    {t.about.statAcademicDesc}
                  </p>
                </div>
              </div>

              {/* Stat 2: Focus Area */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-dark-800/60 border border-gray-200 dark:border-white/10 hover:border-amber-400 dark:hover:border-gold/40 shadow-sm dark:shadow-none transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 w-fit">
                      <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase font-mono text-gray-500 dark:text-neutral-400 block leading-tight">{t.about.statFocusTitle}</span>
                      <h4 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-1 sm:line-clamp-none">{t.about.statFocusSub}</h4>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-neutral-300 leading-snug line-clamp-2 sm:line-clamp-none">
                    {t.about.statFocusDesc}
                  </p>
                </div>
              </div>

            </div>

            {/* Soft Skills & Working Ethics */}
            <div className="p-6 rounded-2xl bg-gray-50/80 dark:bg-dark-800/40 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h4 className="text-sm font-mono uppercase tracking-wider text-amber-700 dark:text-gold mb-4 flex items-center gap-2 font-semibold">
                <Target className="w-4 h-4 text-amber-600 dark:text-gold" />
                <span>{t.about.softSkillsTitle}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {t.about.softSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-neutral-200 bg-white dark:bg-white/5 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Photo Gallery Grid / Documentation Stack dengan Animasi Asli */}
          <div ref={galleryRef} className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-6 items-stretch">
            
            {/* Card 1: Foto Wisuda / Cumlaude */}
            <div className="gallery-card group relative rounded-xl sm:rounded-2xl overflow-hidden glass-card border border-gray-200 dark:border-gold/30 hover:border-amber-500 dark:hover:border-gold transition-all duration-500 shadow-md dark:shadow-xl flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-900 dark:bg-dark-950">
                <img
                  src="/images/about-cumlaude.jpg"
                  alt="Dori Frans Dika - Momen Wisuda Cumlaude"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-dark-950 via-black/20 dark:via-dark-950/20 to-transparent" />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-gold/40 text-[9px] sm:text-[11px] font-mono text-gold flex items-center gap-1 sm:gap-1.5">
                  <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold flex-shrink-0" />
                  <span>{t.about.card1Badge}</span>
                </div>
              </div>
              <div className="p-2.5 sm:p-4 bg-white dark:bg-dark-900/90 border-t border-gray-200 dark:border-white/10 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[11px] sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold transition-colors line-clamp-1 sm:line-clamp-none">
                    {t.about.card1Title}
                  </h4>
                  <p className="text-[9px] sm:text-xs text-gray-600 dark:text-neutral-400 mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-none leading-tight sm:leading-relaxed">
                    {t.about.card1Desc}
                  </p>
                </div>
                <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-amber-600 dark:text-gold">
                  <span>IPK 3.68</span>
                  <span className="text-gray-400 dark:text-neutral-500">2020 - 2024</span>
                </div>
              </div>
            </div>

            {/* Card 2: Foto Aktivitas Kampus */}
            <div className="gallery-card group relative rounded-xl sm:rounded-2xl overflow-hidden glass-card border border-gray-200 dark:border-white/10 hover:border-amber-500 dark:hover:border-gold/50 transition-all duration-500 shadow-md dark:shadow-xl flex flex-col sm:translate-y-6">
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-900 dark:bg-dark-950">
                <img
                  src="/images/about-campus.jpg"
                  alt="Dori Frans Dika - Aktivitas Kampus & Kolaborasi"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-dark-950 via-black/20 dark:via-dark-950/20 to-transparent" />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/20 text-[9px] sm:text-[11px] font-mono text-neutral-200 flex items-center gap-1 sm:gap-1.5">
                  <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 flex-shrink-0" />
                  <span>{t.about.card2Badge}</span>
                </div>
              </div>
              <div className="p-2.5 sm:p-4 bg-white dark:bg-dark-900/90 border-t border-gray-200 dark:border-white/10 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[11px] sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold transition-colors line-clamp-1 sm:line-clamp-none">
                    {t.about.card2Title}
                  </h4>
                  <p className="text-[9px] sm:text-xs text-gray-600 dark:text-neutral-400 mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-none leading-tight sm:leading-relaxed">
                    {t.about.card2Desc}
                  </p>
                </div>
                <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-amber-600 dark:text-amber-400">
                  <span>Lab Informatika</span>
                  <span className="text-gray-400 dark:text-neutral-500">Padang</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
