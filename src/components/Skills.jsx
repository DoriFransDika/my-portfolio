import React, { useEffect, useRef } from 'react';
import { 
  Code2, 
  Server, 
  LineChart, 
  Wrench, 
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Code2,
    badge: 'UI & Interactivity',
    description: 'Membangun antarmuka web modern yang responsif, estetis, dan kaya interaksi dengan performa optimal.',
    skills: [
      { name: 'React.js', level: 'Advanced', highlighted: true },
      { name: 'Next.js', level: 'Intermediate', highlighted: true },
      { name: 'Inertia.js', level: 'Proficient', highlighted: true },
      { name: 'JavaScript (ES6+)', level: 'Advanced', highlighted: true },
      { name: 'Tailwind CSS', level: 'Advanced', highlighted: true },
      { name: 'HTML5 / CSS3', level: 'Mastery', highlighted: false },
    ],
    accent: 'from-amber-400/20 to-gold/10',
    borderColor: 'hover:border-gold',
  },
  {
    id: 'backend',
    title: 'Backend & RESTful API',
    icon: Server,
    badge: 'System Architecture',
    description: 'Pengembangan backend service tangguh, arsitektur RESTful API yang aman, dan integrasi multi-framework.',
    skills: [
      { name: 'Laravel', level: 'Advanced', highlighted: true },
      { name: 'FastAPI (Python)', level: 'Advanced', highlighted: true },
      { name: 'RESTful API', level: 'Advanced', highlighted: true },
      { name: 'PHP', level: 'Proficient', highlighted: false },
      { name: 'MySQL', level: 'Advanced', highlighted: true },
    ],
    accent: 'from-gold/20 to-amber-500/10',
    borderColor: 'hover:border-amber-400',
  },
  {
    id: 'data',
    title: 'Data & Forecasting',
    icon: LineChart,
    badge: 'Predictive Modeling',
    description: 'Pengolahan dataset, analisis tren statistik, dan implementasi peramalan deret berkala untuk bisnis.',
    skills: [
      { name: 'Python', level: 'Advanced', highlighted: true },
      { name: 'Data Analytics', level: 'Advanced', highlighted: true },
      { name: 'Holt-Winters', level: 'Specialist', highlighted: true },
      { name: 'Google Colab', level: 'Proficient', highlighted: false },
      { name: 'Pandas & NumPy', level: 'Proficient', highlighted: false },
    ],
    accent: 'from-yellow-400/20 to-gold/15',
    borderColor: 'hover:border-yellow-400',
  },
  {
    id: 'tools',
    title: 'Tools & Productivity',
    icon: Wrench,
    badge: 'VCS & Mentoring',
    description: 'Alat perancangan antarmuka, editor kode profesional, dan penguasaan mendalam Microsoft Office untuk pelatihan.',
    skills: [
      { name: 'Git & GitHub', level: 'Daily Driver', highlighted: true },
      { name: 'Supabase', level: 'BaaS', highlighted: true },
      { name: 'VS Code', level: 'Daily Driver', highlighted: false },
      { name: 'MS Excel (Advanced)', level: 'Mentor Level', highlighted: true },
      { name: 'Postman', level: 'Testing', highlighted: false },
    ],
    accent: 'from-gold/20 to-yellow-600/10',
    borderColor: 'hover:border-gold-300',
  },
];

export default function Skills() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="keahlian"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-dark-950 border-t border-white/5 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.skills.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            {t.skills.headingStart} <span className="text-gold-gradient">{t.skills.headingGradient}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl font-normal">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Responsive Grid: Mobile 2 Kolom, Desktop 4 Kolom */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className={`group relative rounded-2xl glass-card p-4 sm:p-6 border border-white/10 ${cat.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/10 flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle gradient backdrop on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3 sm:mb-5">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-dark-800 border border-white/10 group-hover:border-gold/50 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-300">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 group-hover:text-gold group-hover:border-gold/30 transition-colors">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold font-display text-white mb-1.5 sm:mb-2 group-hover:text-gold transition-colors">
                    {cat.title}
                  </h3>

                  <p className="hidden sm:block text-xs text-neutral-400 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                {/* Skill Pills */}
                <div className="pt-3 sm:pt-4 border-t border-white/10 relative z-10">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[9px] sm:text-xs font-medium transition-all duration-300 ${
                          skill.highlighted
                            ? 'bg-gold/15 text-gold-200 border border-gold/40 shadow-sm shadow-gold/20 font-semibold'
                            : 'bg-dark-800/90 text-neutral-300 border border-white/5 hover:border-white/20'
                        }`}
                      >
                        {skill.highlighted && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corner accent glow dot */}
                <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#d4af37]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
