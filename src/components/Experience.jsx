import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, ArrowUpRight, Laptop, Award } from 'lucide-react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll('.exp-card'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.25,
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
      className="relative py-24 sm:py-32 bg-dark-900/40 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>03 / PENGALAMAN KERJA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Rekam Jejak <span className="text-gold-gradient">Profesional & Pengajaran</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl font-normal">
            Pengalaman nyata dalam rekayasa perangkat lunak di industri teknologi dan dedikasi transfer pengetahuan dalam pelatihan komputer.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div ref={timelineRef} className="space-y-12 lg:space-y-16">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className={`exp-card group relative rounded-3xl glass-card border border-white/10 ${exp.color} p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side: Photo Documentation */}
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-dark-950 border border-white/10 shadow-xl group-hover:border-gold/40 transition-colors">
                    <img
                      src={exp.image}
                      alt={`${exp.role} - ${exp.company}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                    
                    {/* Floating badge over photo */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-gold/40 text-xs font-mono text-gold flex items-center gap-1.5">
                      <Laptop className="w-3.5 h-3.5" />
                      <span>{exp.badge}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-xs text-neutral-300 font-medium truncate">
                      Dokumentasi Lapangan: {exp.company}
                    </div>
                  </div>
                </div>

                {/* Right Side: Role Details & Achievements */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Role Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-gold transition-colors">
                        {exp.role}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/30 text-xs font-mono">
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-400 font-mono mb-4">
                      <span className="text-white font-medium flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-gold" />
                        {exp.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                      {exp.summary}
                    </p>

                    {/* Task Bullet Points */}
                    <div className="space-y-2.5 mb-6">
                      {exp.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-neutral-300 leading-normal">
                            {task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech / Skill Pills */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mr-2">
                      Skills Applied:
                    </span>
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-dark-800 text-neutral-200 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
