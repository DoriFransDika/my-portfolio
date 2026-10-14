import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 'mediatama',
    role: 'Programmer (Internship)',
    company: 'PT. Mediatama Web Indonesia',
    location: 'Padang, Indonesia',
    period: 'Magang Industri',
    image: '/images/exp-mediatama.jpg',
    badge: 'Software Engineering',
    color: 'border-gold/40',
    summary: 'Terlibat langsung dalam siklus pengembangan produk web digital, integrasi arsitektur REST API, dan perbaikan performa antarmuka pengguna.',
    tasks: [
      'Pengembangan modul dan komponen aplikasi web modern menggunakan stack frontend & backend.',
      'Merancang dan mengintegrasikan RESTful API untuk komunikasi data yang efisien dan aman.',
      'Optimasi antarmuka UI/UX dan responsiveness aplikasi di berbagai ukuran layar perangkat.',
      'Kolaborasi tim pengembang menggunakan Git workflow & code review standar industri.'
    ],
    techStack: ['Laravel', 'React.js', 'REST API', 'MySQL', 'Git']
  },
  {
    id: 'teaching',
    role: 'Pengajar / Mentor Kursus MS Office',
    company: 'Lembaga Pelatihan Komputer & Kursus',
    location: 'Padang, Indonesia',
    period: 'Instruktur & Pengajar',
    image: '/images/exp-teaching.jpg',
    badge: 'Mentoring & Training',
    color: 'border-amber-500/40',
    summary: 'Mendedikasikan kemampuan teknis untuk mengajar, melatih, dan mengevaluasi puluhan peserta kursus dalam menguasai ekosistem Microsoft Office produktif.',
    tasks: [
      'Mengajar dan membimbing peserta kursus menguasai Microsoft Excel tingkat lanjut (Formula Logika, VLOOKUP/XLOOKUP, Pivot Table, dan visualisasi data).',
      'Memberikan pelatihan Microsoft Word untuk penyusunan karya ilmiah, laporan standar korporat, dan otomatisasi format dokumen.',
      'Melatih pembuatan presentasi eksekutif interaktif menggunakan Microsoft PowerPoint.',
      'Mendesain materi kurikulum silabus praktis yang relevan dengan kebutuhan dunia kerja & akademis.'
    ],
    techStack: ['MS Excel (Advanced)', 'MS Word', 'MS PowerPoint', 'Data Entry', 'Public Speaking']
  }
];

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeModalExp, setActiveModalExp] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll('.exp-card'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
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
      id="pengalaman"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-dark-900/40 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>03 / PENGALAMAN KERJA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Pengalaman Industri &amp; <span className="text-gold-gradient">Mentoring</span>
          </h2>
        </div>

        {/* Timeline / Experience Cards Container */}
        <div ref={timelineRef} className="space-y-6 sm:space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="exp-card group relative p-5 sm:p-8 rounded-2xl glass-card border border-white/10 hover:border-gold/40 transition-all duration-500 shadow-xl flex flex-col md:flex-row gap-5 md:gap-8 items-start"
            >
              {/* Thumbnail Image */}
              <div className="w-full md:w-56 h-36 md:h-44 rounded-xl overflow-hidden bg-dark-950 border border-white/10 flex-shrink-0 relative">
                <img
                  src={exp.image}
                  alt={exp.company}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-dark-950/80 backdrop-blur-md border border-gold/40 text-[10px] font-mono text-gold">
                  {exp.badge}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 w-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-gold transition-colors">
                      {exp.role}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.period}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gold font-medium mb-3">
                    <span>{exp.company}</span>
                    <span className="text-neutral-500">•</span>
                    <span className="inline-flex items-center gap-1 text-neutral-400">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  {/* Mobile View: 1 Poin Inti + Tombol "Lihat Detail" */}
                  <div className="block md:hidden mt-2">
                    <p className="text-xs text-neutral-400 line-clamp-2 mb-2">
                      {exp.summary}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveModalExp(exp)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:text-gold-200"
                    >
                      <span>Lihat Rincian Tugas &amp; Stack</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Desktop View: Full Description & Bullet Points Lengkap */}
                  <div className="hidden md:block">
                    <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                      {exp.summary}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {exp.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400">
                          <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech stack tags */}
                <div className="hidden md:flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-gold/10 text-gold-300 border border-gold/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Pop-up Modal untuk Detail di Layar Mobile */}
      {activeModalExp && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalExp(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl glass-card border border-gold/30 p-6 shadow-2xl overflow-y-auto max-h-[85vh] bg-dark-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalExp(null)}
              aria-label="Tutup"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4">
              <span className="text-xs font-mono text-gold uppercase tracking-wider">{activeModalExp.period}</span>
              <h3 className="text-xl font-bold font-display text-white mt-1">{activeModalExp.role}</h3>
              <p className="text-sm text-gold font-medium">{activeModalExp.company} · {activeModalExp.location}</p>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">{activeModalExp.summary}</p>
            <h4 className="text-xs font-mono uppercase tracking-wider text-gold mb-2">Tugas &amp; Tanggung Jawab:</h4>
            <ul className="space-y-2 mb-5">
              {activeModalExp.tasks.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                  <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
              {activeModalExp.techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-gold/15 text-gold border border-gold/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
