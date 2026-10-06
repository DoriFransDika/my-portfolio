import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  ExternalLink, 
  Eye, 
  X, 
  ShieldCheck, 
  Sparkles,
  FileCheck,
  Cloud,
  Cpu,
  Code2,
  BarChart3,
  Globe,
  Smartphone,
  MessageSquareQuote,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Visual brand styling presets per technology & issuer
const brandConfigs = {
  orange: {
    accentHex: '#f97316',
    borderTop: 'border-t-orange-500',
    glow: 'bg-orange-500/15 group-hover:bg-orange-500/25',
    iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
    issuerText: 'text-orange-400',
    watermark: 'text-orange-500',
    hoverBorder: 'hover:border-orange-500/40',
    btnHover: 'hover:bg-orange-500/20 hover:border-orange-500/40 hover:text-white',
    btnIcon: 'text-orange-400',
    chipHover: 'group-hover:border-orange-500/30 group-hover:text-orange-200',
  },
  cyan: {
    accentHex: '#06b6d4',
    borderTop: 'border-t-cyan-500',
    glow: 'bg-cyan-500/15 group-hover:bg-cyan-500/25',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
    issuerText: 'text-cyan-400',
    watermark: 'text-cyan-500',
    hoverBorder: 'hover:border-cyan-500/40',
    btnHover: 'hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-white',
    btnIcon: 'text-cyan-400',
    chipHover: 'group-hover:border-cyan-500/30 group-hover:text-cyan-200',
  },
  indigo: {
    accentHex: '#6366f1',
    borderTop: 'border-t-indigo-500',
    glow: 'bg-indigo-500/15 group-hover:bg-indigo-500/25',
    iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
    issuerText: 'text-indigo-400',
    watermark: 'text-indigo-500',
    hoverBorder: 'hover:border-indigo-500/40',
    btnHover: 'hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-white',
    btnIcon: 'text-indigo-400',
    chipHover: 'group-hover:border-indigo-500/30 group-hover:text-indigo-200',
  },
  teal: {
    accentHex: '#14b8a6',
    borderTop: 'border-t-teal-500',
    glow: 'bg-teal-500/15 group-hover:bg-teal-500/25',
    iconBg: 'bg-teal-500/10 text-teal-400 border-teal-500/25',
    issuerText: 'text-teal-400',
    watermark: 'text-teal-500',
    hoverBorder: 'hover:border-teal-500/40',
    btnHover: 'hover:bg-teal-500/20 hover:border-teal-500/40 hover:text-white',
    btnIcon: 'text-teal-400',
    chipHover: 'group-hover:border-teal-500/30 group-hover:text-teal-200',
  },
  amber: {
    accentHex: '#f59e0b',
    borderTop: 'border-t-amber-500',
    glow: 'bg-amber-500/15 group-hover:bg-amber-500/25',
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    issuerText: 'text-amber-400',
    watermark: 'text-amber-500',
    hoverBorder: 'hover:border-amber-500/40',
    btnHover: 'hover:bg-amber-500/20 hover:border-amber-500/40 hover:text-white',
    btnIcon: 'text-amber-400',
    chipHover: 'group-hover:border-amber-500/30 group-hover:text-amber-200',
  },
  red: {
    accentHex: '#ef4444',
    borderTop: 'border-t-red-500',
    glow: 'bg-red-500/15 group-hover:bg-red-500/25',
    iconBg: 'bg-red-500/10 text-red-400 border-red-500/25',
    issuerText: 'text-red-400',
    watermark: 'text-red-500',
    hoverBorder: 'hover:border-red-500/40',
    btnHover: 'hover:bg-red-500/20 hover:border-red-500/40 hover:text-white',
    btnIcon: 'text-red-400',
    chipHover: 'group-hover:border-red-500/30 group-hover:text-red-200',
  },
  blue: {
    accentHex: '#3b82f6',
    borderTop: 'border-t-blue-500',
    glow: 'bg-blue-500/15 group-hover:bg-blue-500/25',
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    issuerText: 'text-blue-400',
    watermark: 'text-blue-500',
    hoverBorder: 'hover:border-blue-500/40',
    btnHover: 'hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-white',
    btnIcon: 'text-blue-400',
    chipHover: 'group-hover:border-blue-500/30 group-hover:text-blue-200',
  },
};

// 8 Verified Credential Data Items
const certificatesData = [
  {
    id: 'aws-genai',
    title: 'Belajar Dasar Cloud dan Gen AI di AWS',
    issuer: 'Dicoding Indonesia x AWS',
    badge: 'VERIFIED',
    badgeType: 'emerald',
    accentKey: 'orange',
    icon: Cloud,
    techChips: ['AWS Cloud', 'GenAI', 'Security'],
    desc: 'Pemahaman mendalam komputasi cloud, arsitektur AWS, keamanan data, serta implementasi Generative AI dan Machine Learning.',
    type: 'external',
    url: 'https://drive.google.com/file/d/1xbz0cexqYPUtLwHBALio3D_QJKNkK4O9/view?usp=sharing',
    credentialUrl: 'https://dicoding.com/certificates/4EXG1L55EPRL',
    actionLabel: 'Lihat Sertifikat',
    actionTag: 'DRIVE',
  },
  {
    id: 'microsoft-fabric',
    title: 'Menerapkan Model AI Terpadu di Microsoft Fabric',
    issuer: 'Microsoft Elevate x Dicoding',
    badge: 'CERTIFIED',
    badgeType: 'emerald',
    accentKey: 'cyan',
    icon: Cpu,
    techChips: ['Microsoft Fabric', 'AI Models', 'Data Analytics'],
    desc: 'Integrasi dan orkestrasi model AI tingkat lanjut pada ekosistem analitik data terpadu modern Microsoft Fabric.',
    type: 'external',
    url: 'https://drive.google.com/file/d/1SlfzH1HpHFsfaobLfTtS1tSr3SGyo91L/view?usp=sharing',
    actionLabel: 'Lihat Sertifikat',
    actionTag: 'DRIVE',
  },
  {
    id: 'spec-driven-dev',
    title: 'Spec-Driven Development dengan Kiro',
    issuer: 'Dicoding Indonesia x AWS',
    badge: 'VERIFIED',
    badgeType: 'emerald',
    accentKey: 'indigo',
    icon: Code2,
    techChips: ['SDD Framework', 'Kiro AI', 'Prompt Engineering'],
    desc: 'Alur kerja AI-assisted software engineering berbasis spesifikasi terstruktur, requirement traceability, dan desain arsitektur modular.',
    type: 'external',
    url: 'https://drive.google.com/file/d/1kEeI5ygXZJ4n6QKoeyH6xlsDowhBNLQ1/view?usp=sharing',
    credentialUrl: 'https://dicoding.com/certificates/07Z67YRRRPQR',
    actionLabel: 'Lihat Sertifikat',
    actionTag: 'DRIVE',
  },
  {
    id: 'revou-data',
    title: 'Intro to Data Analytics',
    issuer: 'RevoU',
    badge: 'CERTIFIED',
    badgeType: 'emerald',
    accentKey: 'teal',
    icon: BarChart3,
    techChips: ['Data Analysis', 'SQL/Excel', 'Data Viz'],
    desc: 'Kompetensi analisis dataset komprehensif, eksplorasi data, aggregasi SQL, visualisasi metrik bisnis, dan pembentukan insight strategis.',
    type: 'external',
    url: 'https://drive.google.com/file/d/1xI8APi60wZmde20_ZhXOcZ9cYnH9-YWj/view?usp=sharing',
    actionLabel: 'Lihat Sertifikat',
    actionTag: 'DRIVE',
  },
  {
    id: 'kominfo-1000-startup',
    title: 'Gerakan Nasional 1000 Startup Digital',
    issuer: 'Kementerian Kominfo RI',
    badge: 'COMPLETED',
    badgeType: 'zinc',
    accentKey: 'red',
    icon: ShieldCheck,
    techChips: ['Product Ideation', 'Digital Startup'],
    desc: 'Program akselerasi & inkubasi awal ideasi produk digital, validasi market problem-solution fit, serta perancangan model bisnis inovatif.',
    type: 'external',
    url: 'https://drive.google.com/file/d/1z9XdQFfudoywMP3vixpF0uyG6X8-p2Vb/view?usp=sharing',
    actionLabel: 'Lihat Sertifikat',
    actionTag: 'DRIVE',
  },
  {
    id: 'workshop-flutter',
    title: 'Workshop: Belajar Flutter dari Nol',
    issuer: 'UKM Cyber Tech PNP',
    badge: 'COMPLETED',
    badgeType: 'zinc',
    accentKey: 'blue',
    icon: Smartphone,
    techChips: ['Flutter', 'Mobile App', 'Dart'],
    desc: 'Praktik langsung pembuatan aplikasi mobile lintas platform (Android/iOS) berbasis framework Flutter dan bahasa pemrograman Dart.',
    type: 'external',
    url: 'https://drive.google.com/file/d/1vv8kVrmaTZcqflPeSzvE_-0Rt4U2Qnme/view?usp=sharing',
    actionLabel: 'Lihat Sertifikat',
    actionTag: 'DRIVE',
  },
  {
    id: 'oyisi-english',
    title: 'Oyisi Fighter — 3 Months Intensive Speaking',
    issuer: 'Oyisi English Course',
    badge: 'VERY GOOD',
    badgeType: 'amber',
    accentKey: 'amber',
    icon: MessageSquareQuote,
    techChips: ['Public Speaking', 'Communication'],
    desc: 'Program intensif 3 bulan pelatihan komunikasi verbal, retorika presentasi, dan diskusi profesional bahasa Inggris dengan predikat kelulusan Very Good.',
    type: 'external',
    url: 'https://drive.google.com/file/d/1ojTkC-G4s_00RWQRrq4PBBQAXYv6Oj6w/view?usp=sharing',
    actionLabel: 'Lihat Sertifikat',
    actionTag: 'DRIVE',
  },
  {
    id: 'toefl-570',
    title: 'TOEFL Prediction Test — Score 570',
    issuer: 'Central Course Kampung Inggris',
    badge: 'SCORE 570',
    badgeType: 'amber',
    accentKey: 'amber',
    icon: Globe,
    techChips: ['English Proficiency', 'TOEFL 570'],
    desc: 'Kemahiran Bahasa Inggris profesional terstandarisasi dengan skor total 570 (Listening: 57, Structure: 54, Reading: 54).',
    type: 'external',
    url: 'https://drive.google.com/file/d/1ttirn69DM5YuoqEGVyhPqXiFly4wU643/view?usp=sharing',
    actionLabel: 'Lihat Sertifikat',
    actionTag: 'DRIVE',
  },
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [imgError, setImgError] = useState(false);

  // Entrance animation with GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Modal ESC key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };

    if (selectedCert) {
      setImgError(false);
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  const getBadgeClass = (badgeType) => {
    switch (badgeType) {
      case 'emerald':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'amber':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'zinc':
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700/60';
    }
  };

  return (
    <section
      id="sertifikasi"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-dark-900/80 border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        {/* Dynamic Certification Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {certificatesData.map((cert) => {
            const brand = brandConfigs[cert.accentKey] || brandConfigs.amber;
            const IconComponent = cert.icon;

            return (
              <div
                key={cert.id}
                className={`group relative rounded-2xl glass-card bg-zinc-900/70 border border-white/10 ${brand.borderTop} border-t-2 ${brand.hoverBorder} p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/70 overflow-hidden`}
              >
                {/* Ambient Brand Glow Orb */}
                <div 
                  className={`absolute -right-6 -top-6 w-28 h-28 rounded-full blur-xl pointer-events-none transition-all duration-500 ${brand.glow}`} 
                />

                {/* Subdued Watermark Tech Icon */}
                <IconComponent 
                  className={`absolute -right-3 -bottom-3 w-28 h-28 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-300 pointer-events-none ${brand.watermark}`} 
                />

                {/* Top Card Content */}
                <div className="relative z-10 flex flex-col flex-1">
                  
                  {/* Top Row: Brand Custom Tech Icon & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div 
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${brand.iconBg}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold tracking-wider border ${getBadgeClass(
                        cert.badgeType
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {cert.badge}
                    </span>
                  </div>

                  {/* Issuer */}
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold block mb-1.5 ${brand.issuerText}`}>
                    {cert.issuer}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-sans font-bold text-white group-hover:text-amber-200 transition-colors leading-snug mb-2.5">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal mb-5 flex-1">
                    {cert.desc}
                  </p>

                  {/* Tech Stack Chips (Pills) */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.techChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 text-[11px] font-mono rounded-md bg-white/[0.04] text-zinc-300 border border-white/5 transition-colors ${brand.chipHover}`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action Button */}
                <div className="relative z-10 pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center gap-2">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-between flex-1 px-3.5 py-2.5 rounded-xl text-xs font-sans font-semibold text-zinc-200 bg-white/[0.03] border border-white/10 transition-all duration-300 group/btn ${brand.btnHover}`}
                    >
                      <span className="flex items-center gap-2">
                        <Eye className={`w-3.5 h-3.5 transition-transform group-hover/btn:scale-110 ${brand.btnIcon}`} />
                        <span>{cert.actionLabel || 'Lihat Sertifikat'}</span>
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 group-hover/btn:text-white">
                        {cert.actionTag || 'DRIVE'}
                      </span>
                    </a>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Verifikasi Kredensial Resmi Dicoding"
                        className="p-2.5 rounded-xl text-zinc-400 bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ─── MODAL POP-UP IMAGE VIEWER ─── */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-sans font-bold text-white leading-tight">
                    {selectedCert.title}
                  </h4>
                  <span className="text-xs font-mono text-amber-400">
                    {selectedCert.issuer}
                  </span>
                </div>
              </div>

              {/* Close Button (X) */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Tutup modal sertifikat"
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body / Fallback Preview */}
            <div className="p-6 overflow-y-auto flex items-center justify-center bg-[#09090b]">
              {!imgError ? (
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  onError={() => setImgError(true)}
                  className="w-full h-auto max-h-[65vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                />
              ) : (
                /* Elegant Digital Credential Card if JPG file is not yet placed in /certificates/ */
                <div className="w-full py-12 px-6 sm:px-10 rounded-2xl bg-zinc-900/90 border-2 border-dashed border-amber-500/40 text-center flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                    <FileCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider border mb-3 ${getBadgeClass(
                        selectedCert.badgeType
                      )}`}
                    >
                      {selectedCert.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mb-1">
                      {selectedCert.title}
                    </h3>
                    <p className="text-sm font-mono text-amber-400">
                      Diterbitkan oleh: {selectedCert.issuer}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                    {selectedCert.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                    {selectedCert.techChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.05] text-zinc-300 border border-white/10"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-[11px] font-mono text-zinc-500 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                    Path Dokumen: <span className="text-zinc-300">{selectedCert.image}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-zinc-900/90 flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-400">
                Penerima: <strong className="text-white">Dori Frans Dika</strong>
              </span>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-1.5 rounded-xl font-sans font-semibold text-xs text-zinc-950 bg-amber-500 hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
