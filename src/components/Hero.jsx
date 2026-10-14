import React, { useEffect, useRef, useCallback } from 'react';
import { Mail, ArrowRight, Download, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import ProfileCard from './ProfileCard';

const CV_PATH = '/cv-dori-frans-dika.pdf';
const CV_FILENAME = 'CV-Dori-Frans-Dika.pdf';

export default function Hero() {
  const heroRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const badgeRef = useRef(null);
  const mottoRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  // Programmatic download that bypasses browser cache
  const handleDownloadCV = useCallback(async (e) => {
    e.preventDefault();
    const freshUrl = `${CV_PATH}?v=${Date.now()}`;
    try {
      const res = await fetch(freshUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error('Network response was not ok');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = CV_FILENAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(freshUrl, '_blank');
    }
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -40, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for Left Column narrative
      gsap.fromTo(
        [badgeRef.current, mottoRef.current, headlineRef.current, descRef.current, ctaRef.current].filter(Boolean),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      // 2. Entrance animation for Right Column ProfileCard
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.35 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="beranda"
      ref={heroRef}
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-center overflow-hidden bg-grid-pattern bg-[#050505]"
    >
      {/* Background Radial Ambiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[750px] md:h-[750px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ─── KOLOM KIRI (Desktop: Col 7, Mobile: Teks di atas) ─── */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">

            {/* Badge Status & Akademis */}
            <div
              ref={badgeRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 mb-5"
            >
              {/* Badge 1: Available for Opportunities */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-xs font-mono text-zinc-200 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </span>
                <span>Available for Opportunities</span>
              </div>

              {/* Badge 2: Cum Laude • IPK 3.68 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-xs font-mono tracking-wider text-zinc-300 shadow-sm backdrop-blur-md">
                <span className="font-semibold text-zinc-100">Cum Laude</span>
                <span className="text-amber-500/70">•</span>
                <span className="text-amber-400 font-semibold">IPK 3.68</span>
              </div>
            </div>

            {/* Sub-label */}
            <div
              ref={mottoRef}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold mb-3"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>PERSONAL MOTTO &amp; VISION</span>
            </div>

            {/* Headline Utama (H1) — font-display 'Syne' + text-gold-gradient */}
            <div ref={headlineRef} className="mb-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-[1.2] tracking-tight">
                Halo, Saya <br />
                <span className="text-gold-gradient">Dori Frans Dika.</span>
              </h1>
              <p className="text-sm sm:text-base font-semibold text-amber-400 mt-2 font-mono">
                Software Engineer &amp; Programmer
              </p>
            </div>

            {/* Deskripsi Perkenalan — Friendly & Humble */}
            <p
              ref={descRef}
              className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed mb-6 sm:mb-8 font-sans"
            >
              Selamat datang di portofolio saya. Saya lulusan S1 Teknik Informatika yang senang mengeksplorasi teknologi dan membangun solusi web yang fungsional. Mari gulir ke bawah untuk melihat perjalanan dan karya saya.
            </p>

            {/* Desktop CTA Buttons (Disembunyikan di Mobile, ditampilkan di lg:) */}
            <div
              ref={ctaRef}
              className="hidden lg:flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary: Hubungi Saya */}
              <a
                href="#kontak"
                onClick={(e) => handleScrollTo(e, '#kontak')}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-sans font-semibold tracking-wide text-zinc-950 bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <Mail className="w-4 h-4 stroke-[2.2]" />
                <span>Hubungi Saya</span>
              </a>

              {/* Secondary: Lihat Karya → */}
              <a
                href="#projek"
                onClick={(e) => handleScrollTo(e, '#projek')}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-sans font-medium tracking-wide text-zinc-200 hover:text-white bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-700 hover:border-amber-400/60 shadow-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] backdrop-blur-md cursor-pointer"
              >
                <span>Lihat Karya</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              {/* Quick CV Download */}
              <button
                onClick={handleDownloadCV}
                title="Download Curriculum Vitae"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-amber-400 hover:bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CV</span>
              </button>
            </div>

          </div>

          {/* ─── KOLOM KANAN: ProfileCard dengan 3D Tilt & Pop-Out Photo ─── */}
          <div
            ref={rightColRef}
            className="lg:col-span-5 flex flex-col items-center justify-center pt-8 sm:pt-12 lg:pt-16"
          >
            <div className="w-full max-w-[320px] sm:max-w-[360px]">
              <ProfileCard
                name="Dori Frans Dika"
                title="S1 Teknik Informatika"
                handle="@dori.fransdika"
                avatarUrl="/images/hero-Profile.png"
                stats={[
                  { value: '3.68', label: 'IPK' },
                  { value: 'S1', label: 'DEGREE' },
                  { value: 'A', label: 'SKRIPSI' },
                ]}
                enableTilt={true}
                behindGlowColor="rgba(245, 158, 11, 0.25)"
              />
            </div>

            {/* Mobile Only CTA Buttons (Tampil di mobile, disembunyikan di lg:) */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-[320px] sm:max-w-[360px] mt-6 lg:hidden">
              <a
                href="#kontak"
                onClick={(e) => handleScrollTo(e, '#kontak')}
                className="flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold text-zinc-950 bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/25"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Hubungi Saya</span>
              </a>
              <a
                href="#projek"
                onClick={(e) => handleScrollTo(e, '#projek')}
                className="flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold text-zinc-200 bg-zinc-900/80 border border-zinc-700 hover:border-amber-400/50 hover:text-amber-400 active:scale-95 transition-all"
              >
                <span>Lihat Karya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
