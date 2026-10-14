import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Eye, 
  X, 
  ShieldCheck, 
  Sparkles,
  Cloud,
  Cpu,
  Code2,
  BarChart3,
  Globe,
  Smartphone,
  MessageSquareQuote,
  CheckCircle2
} from 'lucide-react';

const brandConfigs = {
  orange: {
    accentHex: '#f97316',
    borderTop: 'border-t-orange-500',
    glow: 'bg-orange-500/15 group-hover:bg-orange-500/25',
    iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
    issuerText: 'text-orange-400',
    hoverBorder: 'hover:border-orange-500/40',
  },
  cyan: {
    accentHex: '#06b6d4',
    borderTop: 'border-t-cyan-500',
    glow: 'bg-cyan-500/15 group-hover:bg-cyan-500/25',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
    issuerText: 'text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/40',
  },
  indigo: {
    accentHex: '#6366f1',
    borderTop: 'border-t-indigo-500',
    glow: 'bg-indigo-500/15 group-hover:bg-indigo-500/25',
    iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
    issuerText: 'text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/40',
  },
  teal: {
    accentHex: '#14b8a6',
    borderTop: 'border-t-teal-500',
    glow: 'bg-teal-500/15 group-hover:bg-teal-500/25',
    iconBg: 'bg-teal-500/10 text-teal-400 border-teal-500/25',
    issuerText: 'text-teal-400',
    hoverBorder: 'hover:border-teal-500/40',
  },
  amber: {
    accentHex: '#f59e0b',
    borderTop: 'border-t-amber-500',
    glow: 'bg-amber-500/15 group-hover:bg-amber-500/25',
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    issuerText: 'text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
  },
  red: {
    accentHex: '#ef4444',
    borderTop: 'border-t-red-500',
    glow: 'bg-red-500/15 group-hover:bg-red-500/25',
    iconBg: 'bg-red-500/10 text-red-400 border-red-500/25',
    issuerText: 'text-red-400',
    hoverBorder: 'hover:border-red-500/40',
  },
};

const certificatesData = [
  {
    id: 'aws-genai',
    title: 'Belajar Dasar Cloud dan Gen AI di AWS',
    issuer: 'Dicoding Indonesia x AWS',
    badge: 'VERIFIED',
    accentKey: 'orange',
    icon: Cloud,
    techChips: ['AWS Cloud', 'GenAI', 'Security'],
    corePoint: 'Pemahaman komputasi cloud, arsitektur AWS, keamanan data, serta implementasi Generative AI.',
    desc: 'Pemahaman mendalam komputasi cloud, arsitektur AWS, keamanan data, serta implementasi Generative AI dan Machine Learning.',
    url: 'https://drive.google.com/file/d/1xbz0cexqYPUtLwHBALio3D_QJKNkK4O9/view?usp=sharing',
  },
  {
    id: 'microsoft-fabric',
    title: 'Menerapkan Model AI Terpadu di Microsoft Fabric',
    issuer: 'Microsoft Elevate x Dicoding',
    badge: 'CERTIFIED',
    accentKey: 'cyan',
    icon: Cpu,
    techChips: ['Microsoft Fabric', 'AI Models', 'Data Analytics'],
    corePoint: 'Integrasi dan orkestrasi model AI tingkat lanjut pada ekosistem Microsoft Fabric.',
    desc: 'Integrasi dan orkestrasi model AI tingkat lanjut pada ekosistem analitik data terpadu modern Microsoft Fabric.',
    url: 'https://drive.google.com/file/d/1SlfzH1HpHFsfaobLfTtS1tSr3SGyo91L/view?usp=sharing',
  },
  {
    id: 'spec-driven-dev',
    title: 'Spec-Driven Development dengan Kiro',
    issuer: 'Dicoding Indonesia x AWS',
    badge: 'VERIFIED',
    accentKey: 'indigo',
    icon: Code2,
    techChips: ['SDD Framework', 'Kiro AI', 'Prompt Engineering'],
    corePoint: 'Alur kerja AI-assisted software engineering berbasis spesifikasi terstruktur.',
    desc: 'Alur kerja AI-assisted software engineering berbasis spesifikasi terstruktur, requirement traceability, dan desain arsitektur modular.',
    url: 'https://drive.google.com/file/d/1kEeI5ygXZJ4n6QKoeyH6xlsDowhBNLQ1/view?usp=sharing',
  },
  {
    id: 'revou-data',
    title: 'Intro to Data Analytics',
    issuer: 'RevoU',
    badge: 'CERTIFIED',
    accentKey: 'teal',
    icon: BarChart3,
    techChips: ['Data Analysis', 'SQL/Excel', 'Data Viz'],
    corePoint: 'Analisis dataset komprehensif, aggregasi SQL, visualisasi metrik bisnis, dan insight strategis.',
    desc: 'Kompetensi analisis dataset komprehensif, eksplorasi data, aggregasi SQL, visualisasi metrik bisnis, dan pembentukan insight strategis.',
    url: 'https://drive.google.com/file/d/1xI8APi60wZmde20_ZhXOcZ9cYnH9-YWj/view?usp=sharing',
  },
  {
    id: 'toefl-570',
    title: 'TOEFL Prediction Test — Score 570',
    issuer: 'Central Course Kampung Inggris',
    badge: 'SCORE 570',
    accentKey: 'amber',
    icon: Globe,
    techChips: ['English Proficiency', 'TOEFL 570'],
    corePoint: 'Kemahiran Bahasa Inggris profesional terstandarisasi dengan skor 570 (Listening: 57, Structure: 54).',
    desc: 'Kemahiran Bahasa Inggris profesional terstandarisasi dengan skor total 570 (Listening: 57, Structure: 54, Reading: 54).',
    url: 'https://drive.google.com/file/d/1X-s9Lq0F21N7c7U8eI4o2_kH60a6pA7d/view?usp=sharing',
  },
  {
    id: 'kominfo-1000-startup',
    title: 'Gerakan Nasional 1000 Startup Digital',
    issuer: 'Kementerian Kominfo RI',
    badge: 'COMPLETED',
    accentKey: 'red',
    icon: ShieldCheck,
    techChips: ['Product Ideation', 'Digital Startup'],
    corePoint: 'Inkubasi ideasi produk digital, validasi problem-solution fit, serta perancangan model bisnis.',
    desc: 'Program akselerasi & inkubasi awal ideasi produk digital, validasi market problem-solution fit, serta perancangan model bisnis inovatif.',
    url: 'https://drive.google.com/file/d/1z9XdQFfudoywMP3vixpF0uyG6X8-p2Vb/view?usp=sharing',
  },
];

export default function Certifications() {
  const [activeModalCert, setActiveModalCert] = useState(null);

  return (
    <section
      id="sertifikat"
      className="relative py-20 sm:py-28 lg:py-32 bg-dark-950 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>04 / SERTIFIKASI PROFESIONAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Sertifikasi Resmi <span className="text-gold-gradient">Terverifikasi</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl font-normal">
            Kredensial dan kompetensi profesional dari program resmi industri terkemuka.
          </p>
        </div>

        {/* Grid Sertifikat: Mobile 1 Kolom ringkas, Desktop 3 Kolom lengkap dengan Brand Styling asli */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {certificatesData.map((cert) => {
            const brand = brandConfigs[cert.accentKey] || brandConfigs.amber;
            const Icon = cert.icon;

            return (
              <div
                key={cert.id}
                className={`group relative rounded-2xl glass-card p-6 border border-white/10 ${brand.hoverBorder} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between overflow-hidden border-t-2 ${brand.borderTop}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${brand.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                      {cert.badge}
                    </span>
                  </div>

                  <p className={`text-xs font-mono font-semibold mb-1 ${brand.issuerText}`}>{cert.issuer}</p>
                  <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-gold transition-colors">
                    {cert.title}
                  </h3>

                  {/* Mobile 1 poin inti */}
                  <div className="block md:hidden mb-2">
                    <p className="text-xs text-neutral-400 line-clamp-1 mb-2">
                      {cert.corePoint}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveModalCert(cert)}
                      className="text-xs font-bold text-gold hover:text-gold-200"
                    >
                      Lihat Rincian Detail →
                    </button>
                  </div>

                  {/* Desktop Full Description & Chips */}
                  <div className="hidden md:block">
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {cert.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.techChips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-neutral-300 border border-white/10"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-gold hover:text-gold-200 transition-colors"
                  >
                    <span>Buka Sertifikat</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] font-mono text-neutral-500">RESMI</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Pop-up Modal untuk Detail Sertifikat di Mobile */}
      {activeModalCert && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl glass-card border border-gold/30 p-6 shadow-2xl bg-dark-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalCert(null)}
              aria-label="Tutup"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4">
              <span className="text-xs font-mono text-gold font-bold uppercase tracking-wider">{activeModalCert.badge}</span>
              <h3 className="text-lg font-bold font-display text-white mt-1">{activeModalCert.title}</h3>
              <p className="text-xs text-amber-400 font-medium">{activeModalCert.issuer}</p>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">{activeModalCert.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {activeModalCert.techChips.map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-gold/15 text-gold border border-gold/30">
                  {c}
                </span>
              ))}
            </div>
            <a
              href={activeModalCert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-gold via-yellow-400 to-amber-500 hover:brightness-110 shadow-lg shadow-gold/25 transition-all"
            >
              <span>Buka Dokumen Sertifikat Asli</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
