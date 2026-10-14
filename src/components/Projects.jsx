import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  X,
  Code2,
  ArrowRight,
  Star,
  AlertCircle
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 'forecasting-system',
    number: '01',
    title: 'Sistem Peramalan Penjualan Biji Kopi',
    category: 'Skripsi — Data Analytics & Full-Stack',
    image: '/images/project-forecasting.jpg',
    shortDescription:
      'Aplikasi web peramalan penjualan dan kebutuhan stok biji kopi menggunakan metode Holt-Winters dengan arsitektur hybrid multi-framework.',
    fullDescription:
      'Merancang dan membangun aplikasi web peramalan penjualan dan kebutuhan stok untuk perusahaan penjual biji kopi di Kerinci menggunakan metode Holt-Winters Exponential Smoothing (MAPE < 20%). Mengintegrasikan arsitektur hybrid — Laravel 12 sebagai backend API, FastAPI (Python) sebagai forecasting engine, dan React.js sebagai frontend SPA — dengan sistem hak akses Role-Based (Admin & Manager).',
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
  },
  {
    id: 'bisnis-management',
    number: '02',
    title: 'Sistem Manajemen Bisnis & Inventaris UMKM',
    category: 'Full-Stack — Next.js & Supabase',
    image: '/images/project-bisnis.jpg',
    shortDescription:
      'Sistem pemantauan operasional bisnis transparan untuk UMKM dengan modul stok, arus kas, dan kalkulator harga real-time.',
    fullDescription:
      'Membangun sistem pemantauan operasional bisnis (kafe/toko kue/resto) transparan untuk UMKM. Modul mencakup stok masuk/keluar, arus kas, laba-rugi otomatis, dan kalkulator harga jual real-time. Dibangun menggunakan Next.js sebagai framework full-stack dan Supabase sebagai backend-as-a-service.',
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
  },
  {
    id: 'bimbel-management',
    number: '03',
    title: 'Sistem Manajemen Bimbingan Belajar',
    category: 'Full-Stack — Laravel & Inertia.js',
    image: '/images/project-bimbel.jpg',
    shortDescription:
      'Sistem manajemen bimbingan belajar lengkap dengan RBAC, jadwal mentor, verifikasi pembelajaran, dan panel admin.',
    fullDescription:
      'Membangun sistem dari awal sebagai full-stack programmer dengan Role-Based Access Control (Admin, Member, Mentor). Fitur meliputi pemilihan jadwal mentor, verifikasi pembelajaran, rekam jejak member, dan panel manajemen admin menggunakan Laravel 12 + Inertia.js + React.js.',
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
  },
  {
    id: 'card-printer',
    number: '04',
    title: 'Sistem Pencetakan Kartu Otomatis',
    category: 'Frontend — React.js',
    image: '/images/project-kartu.jpg',
    shortDescription:
      'Aplikasi web pembuatan dan pencetakan kartu massal berbasis templat standar. Kartu siap cetak dalam waktu < 3 menit.',
    fullDescription:
      'Aplikasi web pembuatan dan pencetakan kartu massal berbasis templat standar. Memangkas proses manual sehingga kartu siap cetak dalam waktu < 3 menit cukup dengan mengisi data. Menggunakan React.js untuk antarmuka dinamis dan rendering template kartu real-time.',
    techStack: ['React.js', 'JavaScript', 'CSS3', 'HTML5'],
    highlights: [
      'Cetak Massal < 3 Menit',
      'Template Standar',
      'Preview Real-time',
      'Export PDF Siap Cetak',
    ],
    liveDemoUrl: 'https://mesin-pencetak-kartu.vercel.app/',
    githubUrl: 'https://github.com/DoriFransDika/mesin-pencetak-kartu',
    badge: 'Productivity Tool',
    isFeatured: false,
  },
  {
    id: 'web-gis',
    number: '05',
    title: 'Peta Interaktif Kerawanan Gempa (Web GIS)',
    category: 'Web GIS — JavaScript & QGIS',
    image: '/images/project-gis.jpg',
    shortDescription:
      'Peta interaktif berbasis Web GIS hasil integrasi QGIS2Web untuk mitigasi dan pemetaan zona kerawanan gempa.',
    fullDescription:
      'Implementasi peta interaktif berbasis Web GIS hasil konversi dari QGIS menggunakan plugin QGIS2Web untuk kebutuhan mitigasi dan pemetaan zona kerawanan gempa. Menampilkan visualisasi heatmap zona risiko gempa, layer controls, legend panel, dan klasifikasi zona kerawanan berdasarkan data GeoJSON.',
    techStack: ['JavaScript', 'HTML5', 'GeoJSON', 'QGIS2Web'],
    highlights: [
      'Peta Interaktif',
      'Heatmap Risiko Gempa',
      'Layer Controls',
      'Konversi QGIS',
    ],
    liveDemoUrl: 'https://sig-rawan-gempa.vercel.app/',
    githubUrl: 'https://github.com/DoriFransDika/Sig_RawanGempa',
    badge: 'Geospatial',
    isFeatured: false,
  },
  {
    id: 'web-blog',
    number: '06',
    title: 'Blog Pembelajaran Pemrograman Web',
    category: 'Frontend — React.js',
    image: '/images/project-blog.jpg',
    shortDescription:
      'Blog edukasi interaktif seputar tutorial HTML, CSS, dan JavaScript modern menggunakan React.',
    fullDescription:
      'Sistem blog edukasi yang berisi tutorial interaktif seputar penggunaan HTML, CSS, dan JavaScript menggunakan React. Menyediakan konten pembelajaran terstruktur dengan contoh kode interaktif, navigasi kategori, dan antarmuka yang bersih.',
    techStack: ['React.js', 'HTML5', 'CSS3', 'JavaScript'],
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
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
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
      id="projek"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-dark-900 border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>05 / PORTOFOLIO KARYA</span>
          </div>
          <span className="text-[10px] font-mono text-gold md:hidden">← Swipe Proyek →</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
          Projek Pilihan &amp; <span className="text-gold-gradient">Studi Kasus</span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl font-normal leading-relaxed mb-10 sm:mb-14">
          Kumpulan implementasi sistem nyata yang mengintegrasikan peramalan data, arsitektur web modern, dan antarmuka responsif.
        </p>

        {/* ─── RESPONSIVE CONTAINER:
             Mobile: flex overflow-x-auto snap-x hide-scrollbar (w-[85%] peeking)
             Desktop: md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible
        ─── */}
        <div
          ref={containerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {projectsData.map((project) => (
            <article
              key={project.id}
              className={`project-card group relative w-[85%] sm:w-[75%] md:w-auto flex-shrink-0 snap-start rounded-2xl overflow-hidden glass-card border ${
                project.isFeatured ? 'border-gold/50 shadow-2xl shadow-gold/15' : 'border-white/10'
              } hover:border-gold transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-gold/10 flex flex-col justify-between`}
            >
              <div>
                {/* 16:9 Image with Hover Zoom */}
                <div className="relative aspect-video overflow-hidden bg-dark-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/85 backdrop-blur-md border border-gold/40 text-[11px] font-mono text-gold">
                    {project.isFeatured && <Star className="w-3 h-3 text-gold fill-gold" />}
                    <span>{project.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[11px] font-mono text-amber-400 mb-1">{project.category}</div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-gold transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-gold/10 text-gold-300 border border-gold/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons with Original Styling */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-gold hover:text-gold-200 transition-colors cursor-pointer"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-3">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                    >
                      Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* ─── MODAL DETAIL PROYEK (ORIGINAL RICH STYLING) ─── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl glass-card border border-gold/30 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] bg-dark-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Tutup"
              className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30 mb-2">
                {selectedProject.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-amber-400 mt-1">{selectedProject.category}</p>
            </div>

            <div className="rounded-xl overflow-hidden mb-5 border border-white/10 aspect-video bg-dark-950">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mb-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-gold mb-2">Deskripsi Lengkap</h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {selectedProject.fullDescription}
              </p>
            </div>

            {selectedProject.highlights && (
              <div className="mb-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gold mb-2">Fitur &amp; Sorotan Utama</h4>
                <ul className="text-xs sm:text-sm text-neutral-400 space-y-1.5 list-disc list-inside">
                  {selectedProject.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-gold mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono bg-gold/15 text-gold border border-gold/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
              {selectedProject.liveDemoUrl && (
                <a
                  href={selectedProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold via-yellow-400 to-amber-500 hover:brightness-110 shadow-lg shadow-gold/25 transition-all hover:scale-105 active:scale-95"
                >
                  <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  <span>Live Demo</span>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-dark-800 hover:bg-dark-700 border border-white/10 hover:border-gold/50 shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <GithubIcon className="w-4 h-4 text-gold" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
