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

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
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
            <span>04 / RIWAYAT PENDIDIKAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Perjalanan Akademik & <span className="text-gold-gradient">Skripsi Unggulan</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl font-normal">
            Pondasi keilmuan komputer yang kuat dengan rekam jejak kelulusan predikat kehormatan tertinggi (Cumlaude).
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
                    Lulus Cumlaude (Dengan Pujian)
                  </span>
                  <span className="text-neutral-400 text-xs font-mono">2020 — 2024</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-2 leading-tight">
                  Institut Teknologi Padang
                </h3>
                <h4 className="text-lg sm:text-xl font-medium text-gold mb-6">
                  S1 Teknik Informatika — Fakultas Teknik
                </h4>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-normal">
                  Menyelesaikan program sarjana teknik informatika dengan fokus studi rekayasa perangkat lunak, arsitektur komputasi, dan kecerdasan komputasional/peramalan data, meraih indeks prestasi kumulatif <strong className="text-white font-bold">3.68 dari skala 4.00</strong>.
                </p>

                {/* Key Academic Milestones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Lulus Tepat Waktu (8 Semester)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Riset Terapan Industri & Skripsi A</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Aktif Proyek Laboratorium Web</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Praktik Kerja Industri Mediatama</span>
                  </div>
                </div>
              </div>

              {/* Right Column: IPK Spotlight Badge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-gold/40 text-center relative shadow-xl">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold mb-4 shadow-lg shadow-gold/20">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-xs uppercase font-mono tracking-widest text-gold-300 mb-1">
                  Indeks Prestasi Kumulatif
                </div>
                <div className="text-5xl sm:text-6xl font-display font-extrabold text-white mb-2 tracking-tight">
                  3.68 <span className="text-xl text-neutral-500 font-mono">/ 4.00</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-gold/20 text-gold-200 border border-gold/40">
                  ★ CUMLAUDE HONORS ★
                </div>
              </div>

            </div>

            {/* Skripsi Highlight Box */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="p-6 rounded-2xl bg-dark-850/80 border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                    <Binary className="w-4 h-4" />
                    <span>Fokus Skripsi / Tugas Akhir Sarjana</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md">
                    Nilai: A (Sangat Memuaskan)
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold font-display text-white mb-3 leading-snug">
                  "Sistem Peramalan Persediaan Biji Kopi Menggunakan Metode Holt-Winters Exponential Smoothing"
                </h4>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                  Riset dan implementasi aplikasi peramalan komprehensif untuk memprediksi stok persediaan biji kopi di masa depan berdasarkan tren musiman historis. Dibangun dengan memadukan mesin komputasi matematis <strong className="text-white">FastAPI (Python)</strong>, logika bisnis <strong className="text-white">Laravel</strong>, dan visualisasi antarmuka dinamis <strong className="text-white">React.js</strong>.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400">Stack Skripsi:</span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    FastAPI (Python)
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    Laravel
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    React.js
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    Holt-Winters Algorithm
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gold/15 text-gold-200 border border-gold/30 font-mono">
                    MySQL
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Certifications & Badges Row */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Sertifikasi Profesional & Kredensial Pendukung</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cert 1: AWS AI Academy */}
              <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-gold/50 transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-base font-bold text-white">AWS AI Academy</h5>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Verified</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Amazon Web Services — Pemahaman mendasar infrastruktur Cloud Computing, Machine Learning, dan kecerdasan buatan terapan di AWS.
                  </p>
                </div>
              </div>

              {/* Cert 2: Google Skillshop */}
              <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-gold/50 transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-base font-bold text-white">Google Skillshop Certification</h5>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Certified</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Google — Sertifikasi pemanfaatan ekosistem analitik digital dan optimasi platform data modern dari Google.
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
