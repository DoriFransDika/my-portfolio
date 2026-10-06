import React, { useEffect, useRef } from 'react';
import { Award, GraduationCap, Compass, Users, BrainCircuit, Target, CheckCircle2, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up reveal for narrative text and stats
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
      className="relative py-24 sm:py-32 bg-dark-900/60 border-t border-white/5 overflow-hidden"
    >
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>01 / TENTANG SAYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Dedikasi Menuju <span className="text-gold-gradient">Keunggulan Akademik</span> & Rekayasa Perangkat Lunak.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative Profile & Highlights */}
          <div ref={textContentRef} className="lg:col-span-6 space-y-8">
            
            {/* Main Narrative Paragraph */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 relative">
              <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 w-3 h-3 border-t-2 border-r-2 border-gold pointer-events-none" />
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                "Saya <strong className="text-white font-semibold">Dori Frans Dika</strong>, Fresh Graduate S1 Teknik Informatika Institut Teknologi Padang yang lulus predikat <span className="text-gold font-semibold">Cumlaude dengan IPK 3.68</span>. Memiliki passion mendalam dalam pengembangan web full-stack, analisis data, dan peramalan <span className="text-amber-400 italic">(forecasting)</span>. Aktif mengeksplorasi teknologi baru, adaptif, dan terbiasa bekerja dalam tim untuk menghasilkan solusi digital yang efisien."
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat 1: Cumlaude */}
              <div className="p-5 rounded-2xl bg-dark-800/60 border border-gold/20 hover:border-gold/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono text-neutral-400">Prestasi Akademik</span>
                    <h4 className="text-xl font-bold font-mono text-white">IPK 3.68</h4>
                  </div>
                </div>
                <p className="text-xs text-neutral-300">
                  Lulus predikat <strong className="text-gold">Cumlaude</strong> S1 Teknik Informatika - Institut Teknologi Padang.
                </p>
              </div>

              {/* Stat 2: Focus Area */}
              <div className="p-5 rounded-2xl bg-dark-800/60 border border-white/10 hover:border-gold/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono text-neutral-400">Fokus Keahlian</span>
                    <h4 className="text-lg font-bold text-white">Full-Stack & Data</h4>
                  </div>
                </div>
                <p className="text-xs text-neutral-300">
                  Pengembangan web modern (React, Laravel) & analisis data time-series forecasting.
                </p>
              </div>

            </div>

            {/* Soft Skills & Working Ethics */}
            <div className="p-6 rounded-2xl bg-dark-800/40 border border-white/10">
              <h4 className="text-sm font-mono uppercase tracking-wider text-gold mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-gold" />
                <span>Soft Skills & Karakter Kerja</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-200 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Problem Solving</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-200 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Team Collaboration</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-200 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Technical Mentoring</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Photo Gallery Grid / Documentation Stack */}
          <div ref={galleryRef} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            
            {/* Card 1: Foto Wisuda / Cumlaude */}
            <div className="gallery-card group relative rounded-2xl overflow-hidden glass-card border border-gold/30 hover:border-gold transition-all duration-500 shadow-xl flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-dark-950">
                <img
                  src="/images/about-cumlaude.jpg"
                  alt="Dori Frans Dika - Momen Wisuda Cumlaude"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-gold/40 text-[11px] font-mono text-gold flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-gold" />
                  <span>Cumlaude Moment</span>
                </div>
              </div>
              <div className="p-4 bg-dark-900/90 border-t border-white/10 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                    Dokumentasi Kelulusan S1
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Institut Teknologi Padang — Menyelesaikan studi tepat waktu dengan predikat kehormatan (Cumlaude).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gold">
                  <span>IPK 3.68</span>
                  <span className="text-neutral-500">2020 - 2024</span>
                </div>
              </div>
            </div>

            {/* Card 2: Foto Aktivitas Kampus */}
            <div className="gallery-card group relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-gold/50 transition-all duration-500 shadow-xl flex flex-col sm:translate-y-6">
              <div className="relative aspect-[4/5] overflow-hidden bg-dark-950">
                <img
                  src="/images/about-campus.jpg"
                  alt="Dori Frans Dika - Aktivitas Kampus & Kolaborasi"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-neutral-200 flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-amber-400" />
                  <span>Campus Life & Tech Lab</span>
                </div>
              </div>
              <div className="p-4 bg-dark-900/90 border-t border-white/10 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                    Eksplorasi & Kolaborasi Kampus
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Aktif dalam proyek riset peramalan data, praktikum rekayasa perangkat lunak, dan diskusi teknologi.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-amber-400">
                  <span>Lab Informatika</span>
                  <span className="text-neutral-500">Padang</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
