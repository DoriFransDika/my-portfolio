import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check
} from 'lucide-react';
import { WhatsappIcon, LinkedinIcon, GithubIcon, InstagramIcon } from './BrandIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'WhatsApp',
    handle: '+62 82389872779',
    href: 'https://wa.me/6282389872779?text=Halo%20Dori%2C%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda.',
    icon: WhatsappIcon,
    color: 'hover:text-emerald-400 hover:border-emerald-500/40',
  },
  {
    name: 'Email',
    handle: 'dorifransdikaa@gmail.com',
    href: 'mailto:dorifransdikaa@gmail.com',
    icon: Mail,
    color: 'hover:text-gold hover:border-gold/40',
  },
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/dori-frans-dika',
    href: 'https://www.linkedin.com/in/dori-frans-dika-74a728360/',
    icon: LinkedinIcon,
    color: 'hover:text-sky-400 hover:border-sky-500/40',
  },
  {
    name: 'GitHub',
    handle: 'github.com/DoriFransDika',
    href: 'https://github.com/DoriFransDika',
    icon: GithubIcon,
    color: 'hover:text-neutral-100 hover:border-white/40',
  },
  {
    name: 'Instagram',
    handle: '@dorifrans',
    href: 'https://instagram.com/dorifrans',
    icon: InstagramIcon,
    color: 'hover:text-rose-400 hover:border-rose-500/40',
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dorifransdikaa@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="kontak"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 bg-dark-950 border-t border-white/5 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Responsive Grid: Mobile 1 Kolom (vertikal), Desktop 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* KOLOM KIRI (Desktop: Col 5) */}
          <div ref={headlineRef} className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.contact.tag}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              {t.contact.headingStart} <span className="text-gold-gradient">{t.contact.headingGradient}</span> {t.contact.headingEnd}
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8">
              {t.contact.subtitle}
            </p>

            {/* Quick Copy Email Banner (Khusus Desktop lg:, di Mobile berada di bawah formulir kirim pesan) */}
            <div className="hidden lg:flex w-full p-4 rounded-xl glass-card border border-gold/20 mb-6 items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-gold/10 text-gold border border-gold/20 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">{t.contact.primaryEmailLabel}</div>
                  <div className="text-xs sm:text-sm font-mono text-white truncate">dorifransdikaa@gmail.com</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 hover:bg-gold/15 text-neutral-300 hover:text-gold border border-white/10 hover:border-gold/30 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{t.contact.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.contact.copy}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links List: Tampil di Desktop lg: (di Mobile berada di bawah formulir kirim pesan) */}
            <div className="hidden lg:grid grid-cols-2 gap-3 w-full">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 p-3.5 rounded-xl glass-card border border-white/10 ${item.color} transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-dark-800 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-gold group-hover:border-gold/30 transition-colors flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white group-hover:text-gold transition-colors">{item.name}</div>
                      <div className="text-[10px] font-mono text-neutral-500 truncate">{item.handle}</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* KOLOM KANAN: FORMULIR PESAN (Desktop: Col 7) */}
          <div className="lg:col-span-7 w-full">
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold font-display text-white mb-2">{t.contact.directMessageTitle}</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6">
                {t.contact.directMessageSubtitle}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-neutral-300 mb-1.5 uppercase tracking-wider">
                      {t.contact.fullName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.fullNamePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-neutral-300 mb-1.5 uppercase tracking-wider">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-neutral-300 mb-1.5 uppercase tracking-wider">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 hover:brightness-110 shadow-lg shadow-gold/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>{isSubmitting ? t.contact.sendingBtn : t.contact.sendBtn}</span>
                </button>
              </form>

              {submitted && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{t.contact.successMsg}</span>
                </div>
              )}

              {/* Kontak Langsung Khusus Mobile: Email Utama & Logo Media Sosial (di bawah tombol formulir kirim pesan) */}
              <div className="mt-8 pt-6 border-t border-white/10 lg:hidden space-y-4">
                {/* 1. Quick Copy Email Banner di Mobile (di atas logo media sosial) */}
                <div className="w-full p-3 sm:p-4 rounded-xl glass-card border border-gold/20 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-gold/10 text-gold border border-gold/20 flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">{t.contact.primaryEmailLabel}</div>
                      <div className="text-xs sm:text-sm font-mono text-white truncate">dorifransdikaa@gmail.com</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 hover:bg-gold/15 text-neutral-300 hover:text-gold border border-white/10 hover:border-gold/30 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-xs">{t.contact.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-xs">{t.contact.copy}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. Logo-logo Akun Media Sosial */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2.5 text-center">
                    {t.contact.connectVia}
                  </div>
                  <div className="grid grid-cols-5 gap-2 w-full">
                    {socialLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={item.name}
                          className={`group flex items-center justify-center p-2.5 rounded-xl glass-card border border-white/10 ${item.color} transition-all duration-300 active:scale-95`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-dark-800 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-gold group-hover:border-gold/30 transition-colors flex-shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
