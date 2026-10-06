import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  X,
  Calendar,
  Eye,
  Code2,
  Layers,
  ArrowUpRight,
  Star,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Project Data ─────────────────────────────────────────────────────────
const projectsData = [
  {
    id: 'forecasting-system',
    number: '01',
    title: 'Sistem Peramalan Penjualan Biji Kopi',
    category: 'Skripsi — Data Analytics & Full-Stack',
    period: 'Jan – Sep 2026',
    image: '/images/project-forecasting.jpg',
    shortDescription:
      'Aplikasi web peramalan penjualan dan kebutuhan stok biji kopi menggunakan metode Holt-Winters dengan arsitektur hybrid multi-framework.',
    fullDescription:
      'Merancang dan membangun aplikasi web peramalan penjualan dan kebutuhan stok untuk perusahaan penjual biji kopi di Kerinci menggunakan metode Holt-Winters Exponential Smoothing (MAPE < 20%). Mengintegrasikan arsitektur hybrid — Laravel 12 sebagai backend API, FastAPI (Python) sebagai forecasting engine, dan React.js sebagai frontend SPA — dengan sistem hak akses Role-Based (Admin & Manager). Sistem mampu membaca pola musiman (seasonality) historis data penjualan dan memberikan estimasi pengadaan stok yang akurat untuk menekan biaya overstock.',
    techStack: ['React.js', 'Laravel 12', 'FastAPI', 'MySQL', 'Tailwind CSS', 'Holt-Winters'],
    highlights: [
      'Arsitektur Hybrid 3 Framework',
      'MAPE Error < 20%',
      'RBAC Admin & Manager',
      'Analisis Tren Musiman',
    ],
    liveDemoUrl: null,
    githubUrl: 'https://github.com/DoriFransDika/Sistem-Peramalan-Penjualan-Menggunakan-Holt-Winters',
    badge: 'Proyek Skripsi Unggulan',
    isFeatured: true,
    demoStatus: 'Demo in Progress',
  },
  {
    id: 'bisnis-management',
    number: '02',
    title: 'Sistem Manajemen Bisnis & Inventaris UMKM',
    category: 'Full-Stack — Next.js & Supabase',
    period: 'Sep – Okt 2026',
    image: '/images/project-bisnis.jpg',
    shortDescription:
      'Sistem pemantauan operasional bisnis transparan untuk UMKM (kafe/toko kue/resto) dengan modul stok, arus kas, dan kalkulator harga real-time.',
    fullDescription:
      'Membangun sistem pemantauan operasional bisnis (kafe/toko kue/resto) transparan untuk UMKM. Modul mencakup stok masuk/keluar, arus kas, laba-rugi otomatis, dan kalkulator harga jual real-time. Dibangun menggunakan Next.js sebagai framework full-stack dan Supabase sebagai backend-as-a-service untuk autentikasi, database, dan real-time subscriptions.',
    techStack: ['Next.js', 'Supabase', 'React.js', 'Tailwind CSS'],
    highlights: [
      'Modul Stok & Arus Kas',
      'Laba-Rugi Otomatis',
      'Kalkulator Harga Real-time',
      'Dashboard Operasional',
    ],
    liveDemoUrl: 'https://dapur-mamak.vercel.app/',
    githubUrl: 'https://github.com/DoriFransDika/Management-Bisnis',
    badge: 'Full-Stack App',
    isFeatured: false,
    demoStatus: null,
  },
  {
    id: 'bimbel-management',
    number: '03',
    title: 'Sistem Manajemen Bimbingan Belajar',
    category: 'Full-Stack — Laravel & Inertia.js',
    period: 'Jul – Sep 2025',
    image: '/images/project-bimbel.jpg',
    shortDescription:
      'Sistem manajemen bimbingan belajar lengkap dengan RBAC, jadwal mentor, verifikasi pembelajaran, dan panel admin.',
    fullDescription:
      'Membangun sistem dari awal sebagai full-stack programmer dengan Role-Based Access Control (Admin, Member, Mentor). Fitur meliputi pemilihan jadwal mentor, verifikasi pembelajaran, rekam jejak member, dan panel manajemen admin. Menggunakan Laravel 12 + Inertia.js + React.js sebagai stack monolitik modern dengan Laravel Breeze untuk autentikasi.',
    techStack: ['Laravel 12', 'Inertia.js', 'React.js', 'Laravel Breeze', 'MySQL'],
    highlights: [
      'RBAC 3 Role',
      'Jadwal Mentor Dinamis',
      'Verifikasi Pembelajaran',
      'Panel Admin',
    ],
    liveDemoUrl: null,
    githubUrl: 'https://github.com/DoriFransDika/Sistem_management_bimbingan_digital',
    badge: 'Full-Stack Architecture',
    isFeatured: false,
    demoStatus: 'Source Code & Docs Available',
  },
  {
    id: 'card-printer',
    number: '04',
    title: 'Sistem Pencetakan Kartu Otomatis',
    category: 'Frontend — React.js',
    period: 'Jan 2025',
    image: '/images/project-kartu.jpg',
    shortDescription:
      'Aplikasi web pembuatan dan pencetakan kartu massal berbasis templat. Kartu siap cetak dalam waktu < 3 menit.',
    fullDescription:
      'Aplikasi web pembuatan dan pencetakan kartu massal berbasis templat standar. Memangkas proses manual sehingga kartu siap cetak dalam waktu < 3 menit cukup dengan mengisi data. Menggunakan React.js untuk antarmuka dinamis dan rendering template kartu secara real-time.',
    techStack: ['React.js', 'JavaScript', 'CSS', 'HTML'],
    highlights: [
      'Cetak Massal < 3 Menit',
      'Template Standar',
      'Preview Real-time',
      'Export Siap Cetak',
    ],
    liveDemoUrl: 'https://mesin-pencetak-kartu.vercel.app/',
    githubUrl: 'https://github.com/DoriFransDika/mesin-pencetak-kartu',
    badge: 'Productivity Tool',
    isFeatured: false,
    demoStatus: null,
  },
  {
    id: 'web-blog',
    number: '05',
    title: 'Blog Pembelajaran Pemrograman Web',
    category: 'Frontend — React.js',
    period: 'Okt – Nov 2023',
    image: '/images/project-blog.jpg',
    shortDescription:
      'Blog edukasi berisi tutorial interaktif seputar HTML, CSS, dan JavaScript menggunakan React.',
    fullDescription:
      'Sistem blog edukasi yang berisi tutorial interaktif seputar penggunaan HTML, CSS, dan JavaScript menggunakan React. Menyediakan konten pembelajaran terstruktur dengan contoh kode interaktif, navigasi kategori, dan antarmuka yang bersih untuk pengalaman belajar yang optimal.',
    techStack: ['React.js', 'HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Tutorial Interaktif',
      'Contoh Kode Live',
      'Navigasi Kategori',
      'Desain Responsif',
    ],
    liveDemoUrl: 'https://thebuilding-the-web-blog.vercel.app/',
    githubUrl: 'https://github.com/DoriFransDika/MyBlog',
    badge: 'Educational',
    isFeatured: false,
    demoStatus: null,
  },
  {
    id: 'web-gis',
    number: '06',
    title: 'Peta Interaktif Kerawanan Gempa (Web GIS)',
    category: 'Web GIS — JavaScript & QGIS',
    period: 'Feb – Mar 2024',
    image: '/images/project-gis.jpg',
    shortDescription:
      'Peta interaktif berbasis Web GIS untuk mitigasi dan pemetaan zona kerawanan gempa.',
    fullDescription:
      'Implementasi peta interaktif berbasis Web GIS hasil konversi dari QGIS menggunakan plugin QGIS2Web untuk kebutuhan mitigasi dan pemetaan zona kerawanan gempa. Menampilkan visualisasi heatmap zona risiko gempa, layer controls, legend panel, dan klasifikasi zona kerawanan berdasarkan data GeoJSON.',
    techStack: ['JavaScript', 'HTML', 'CSS', 'GeoJSON', 'QGIS2Web'],
    highlights: [
      'Peta Interaktif',
      'Zona Risiko Heatmap',
      'Layer Controls',
      'Konversi QGIS',
    ],
    liveDemoUrl: 'https://sig-rawan-gempa.vercel.app/',
    githubUrl: 'https://github.com/DoriFransDika/Sig_RawanGempa',
    badge: 'Geospatial',
    isFeatured: false,
    demoStatus: null,
  },
];

// ─── Featured (Spotlight) Project Card ─────────────────────────────────
function FeaturedProjectCard({ project, onViewDetail, cardRef }) {
  return (
    <div
      ref={cardRef}
      className="project-card group relative col-span-1 sm:col-span-2 lg:col-span-3 rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/30 hover:border-gold/60 transition-all duration-500 shadow-2xl shadow-gold/10 hover:shadow-gold/20"
      style={{
        background:
          'linear-gradient(135deg, rgba(20,20,20,0.85) 0%, rgba(13,13,13,0.95) 50%, rgba(20,16,8,0.9) 100%)',
      }}
    >
      {/* Ambient glow behind featured card */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold/[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/[0.06] rounded-full blur-[80px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Image Section */}
        <div className="lg:col-span-5 relative h-56 sm:h-64 lg:h-full min-h-[280px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
            loading="eager"
          />
          {/* Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-950/80 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 to-transparent h-20" />

          {/* Featured Star Badge */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/50 text-xs font-mono text-gold shadow-lg shadow-gold/20">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span>{project.badge}</span>
          </div>

          {/* Number watermark */}
          <div className="absolute bottom-4 right-5 font-display font-black text-7xl sm:text-8xl text-white/5 select-none pointer-events-none group-hover:text-gold/10 transition-colors duration-500">
            {project.number}
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
          <div>
            {/* Period Badge */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gold/80 uppercase tracking-wider mb-2">
              <Calendar className="w-3 h-3" />
              <span>{project.period}</span>
            </div>

            {/* Category */}
            <span className="block text-[11px] uppercase font-mono tracking-wider text-amber-400/80 mb-1">
              {project.category}
            </span>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white group-hover:text-gold transition-colors leading-snug mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-neutral-300 leading-relaxed mb-4 line-clamp-3">
              {project.shortDescription}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {project.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[11px] font-mono text-neutral-300 bg-white/5 px-3 py-2 rounded-lg border border-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span className="truncate">{h}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-gold/10 text-gold-300 border border-gold/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {/* View Detail Button */}
              <button
                onClick={() => onViewDetail(project)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 hover:brightness-110 shadow-lg shadow-gold/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>View Detail</span>
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-dark-800 hover:bg-dark-700 border border-white/10 hover:border-gold/50 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <GithubIcon className="w-3.5 h-3.5 text-gold" />
                <span>Source Code</span>
              </a>
            </div>

            {/* Demo Status */}
            {project.demoStatus && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400/80 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                <AlertCircle className="w-3 h-3" />
                <span>{project.demoStatus}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Regular Project Card ──────────────────────────────────────────────
function ProjectCard({ project, onViewDetail, cardRef }) {
  const hasLiveDemo = !!project.liveDemoUrl;

  return (
    <div
      ref={cardRef}
      className="project-card group relative rounded-2xl sm:rounded-3xl glass-card border border-white/10 hover:border-gold/40 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold/10 flex flex-col"
    >
      {/* Card Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-dark-950">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
          loading="lazy"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

        {/* Number Watermark */}
        <div className="absolute top-3 right-5 font-display font-black text-5xl sm:text-6xl text-white/[0.08] select-none pointer-events-none group-hover:text-gold/15 transition-colors duration-500">
          {project.number}
        </div>

        {/* Badge */}
        <div className="absolute top-3.5 left-4 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-dark-950/80 backdrop-blur-md border border-gold/40 text-[11px] font-mono text-gold">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>{project.badge}</span>
        </div>

        {/* Title & Category on Image Bottom */}
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/80 block mb-0.5">
            {project.category}
          </span>
          <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-gold transition-colors leading-snug">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-dark-900/95">
        <div>
          {/* Period */}
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">
            <Calendar className="w-3 h-3" />
            <span>{project.period}</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-dark-800 text-gold-300 border border-gold/15"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-dark-800 text-neutral-400 border border-white/10">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
          <button
            onClick={() => onViewDetail(project)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 hover:brightness-110 shadow-md shadow-gold/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Eye className="w-3 h-3 stroke-[2.5]" />
            <span>View Detail</span>
          </button>

          <div className="flex items-center gap-2">
            {hasLiveDemo ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 p-2 rounded-lg text-gold bg-gold/10 border border-gold/20 hover:bg-gold/20 hover:border-gold/40 transition-all duration-300 hover:scale-110 active:scale-95"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-1 p-2 rounded-lg text-neutral-500 bg-white/5 border border-white/5 cursor-not-allowed opacity-60"
                title={project.demoStatus || 'Demo tidak tersedia'}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 p-2 rounded-lg text-white bg-dark-800 border border-white/10 hover:border-gold/40 hover:bg-dark-700 transition-all duration-300 hover:scale-110 active:scale-95"
              title="Source Code"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Project Detail Modal ──────────────────────────────────────────────
function ProjectModal({ project, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const contentRef = useRef(null);

  // Sync React state -> native <dialog> (always mounted, so the ref is stable)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && project) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = '';
    }
  }, [isOpen, project]);

  // Restore body scroll on unmount
  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

  // Light dismiss: any click outside the content panel closes the modal
  const handleBackdropClick = useCallback(
    (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose]
  );

  // Esc key: keep React state in control instead of letting the browser close it
  const handleCancel = useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const hasLiveDemo = !!project?.liveDemoUrl;

  return (
    <dialog
      ref={dialogRef}
      data-lenis-prevent
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      onClose={onClose}
      className="fixed inset-0 z-[9999] w-full h-full max-w-none max-h-none m-0 p-0 bg-transparent border-none outline-none overflow-y-auto backdrop:bg-transparent"
      style={{ backgroundColor: 'transparent' }}
      aria-labelledby="modal-project-title"
    >
      {project && (
      <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-dark-950/85 backdrop-blur-md" aria-hidden="true" />

      {/* Centered Content Wrapper */}
      <div className="relative min-h-full flex items-center justify-center p-4 sm:p-6">
        <div
          ref={contentRef}
          className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-gold/10"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(13,13,13,0.99) 100%)',
          }}
        >
          {/* Modal Header: Image */}
          <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-dark-950/20" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-dark-950/70 backdrop-blur-md border border-white/15 text-white hover:text-gold hover:border-gold/50 transition-all duration-300 hover:scale-110 active:scale-90 z-10"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Number Watermark */}
            <div className="absolute top-4 left-5 font-display font-black text-6xl sm:text-7xl text-white/[0.08] select-none pointer-events-none">
              {project.number}
            </div>

            {/* Badge */}
            <div className="absolute bottom-4 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-gold/40 text-xs font-mono text-gold">
              {project.isFeatured ? (
                <Star className="w-3 h-3 fill-gold text-gold" />
              ) : (
                <Sparkles className="w-3 h-3 text-gold" />
              )}
              <span>{project.badge}</span>
            </div>

            {/* Period */}
            <div className="absolute bottom-4 right-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-neutral-300">
              <Calendar className="w-3 h-3 text-gold" />
              <span>{project.period}</span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 lg:p-8">
            {/* Category */}
            <span className="text-[11px] uppercase font-mono tracking-wider text-amber-400/80 mb-1 block">
              {project.category}
            </span>

            {/* Title */}
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 leading-snug"
            >
              {project.title}
            </h3>

            {/* Full Description */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            {/* Highlights Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-gold" />
                <span>Fitur Utama</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs font-mono text-neutral-200 bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/5"
                  >
                    <ChevronRight className="w-3 h-3 text-gold flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-gold" />
                <span>Tech Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-gold/10 text-gold-300 border border-gold/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
              {hasLiveDemo ? (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 hover:brightness-110 shadow-lg shadow-gold/25 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  <span>Live Demo</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-neutral-500 bg-dark-800 border border-white/10 cursor-not-allowed select-none">
                  <AlertCircle className="w-4 h-4" />
                  <span>{project.demoStatus || 'Demo Belum Tersedia'}</span>
                </span>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-dark-800 hover:bg-dark-700 border border-white/10 hover:border-gold/50 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <GithubIcon className="w-4 h-4 text-gold" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </dialog>
  );
}

// ─── Main Projects Section ─────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetail = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // GSAP scroll-triggered stagger animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredProject = projectsData.find((p) => p.isFeatured);
  const regularProjects = projectsData.filter((p) => !p.isFeatured);

  return (
    <section
      id="proyek"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-dark-900 border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>05 / PORTOFOLIO KARYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Projek Pilihan &amp; <span className="text-gold-gradient">Studi Kasus</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl font-normal leading-relaxed">
            Kumpulan implementasi sistem nyata yang mengintegrasikan peramalan data, arsitektur web
            modern, dan antarmuka responsif — dari skala UMKM hingga proyek riset.
          </p>
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {/* Featured Project - Full Width Row */}
          {featuredProject && (
            <FeaturedProjectCard
              project={featuredProject}
              onViewDetail={handleViewDetail}
              cardRef={(el) => (cardsRef.current[0] = el)}
            />
          )}

          {/* Regular Project Cards */}
          {regularProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetail={handleViewDetail}
              cardRef={(el) => (cardsRef.current[index + 1] = el)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
