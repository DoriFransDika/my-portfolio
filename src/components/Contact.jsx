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
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
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
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dorifransdika@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="kontak"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-dark-950 border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Big Editorial Callout */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-xs font-mono text-gold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>06 / HUBUNGI SAYA</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            AYO BUAT PROJEK BERSAMA <br />
            <span className="text-gold-gradient">LET'S WORK TOGETHER.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Terbuka untuk peluang karir Full-Stack Developer, Data Analyst, kolaborasi riset, maupun proyek lepas (freelance). Mari diskusikan bagaimana saya dapat memberikan dampak positif bagi tim Anda.
          </p>
        </div>

        {/* Contact Grid: Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl glass-card border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold font-display text-white mb-2">
                Kontak & Jaringan Profesional
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Silakan hubungi melalui saluran komunikasi pilihan Anda:
              </p>

              {/* Email Quick Copy Box */}
              <div className="p-4 rounded-2xl bg-dark-900 border border-gold/30 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-gold-300 block">Direct Email</span>
                  <span className="text-sm font-semibold text-white font-mono">dorifransdika@gmail.com</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-gold/10 hover:bg-gold/20 text-gold transition-colors flex items-center gap-1.5 text-xs font-mono"
                  title="Salin Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Disalin!' : 'Salin'}</span>
                </button>
              </div>

              {/* Social Channels List */}
              <div className="space-y-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 ${item.color} transition-all duration-300 hover:bg-white/10 hover:translate-x-1`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-dark-950 text-neutral-300 group-hover:text-inherit">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-inherit">
                            {item.name}
                          </div>
                          <div className="text-xs text-neutral-400 font-mono">
                            {item.handle}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  );
                })}
              </div>

              {/* Status info */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Status Saat Ini: Siap Kerja (Full-time / Remote / Hybrid)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-white/10 shadow-2xl relative">
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                Kirimkan Pesan Langsung
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-8">
                Isi formulir di bawah ini dan pesan Anda akan langsung diteruskan ke email saya.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Pesan Berhasil Terkirim!</h4>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    Terima kasih telah menghubungi saya. Saya akan merespons pesan Anda dalam waktu 1x24 jam.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Nama Lengkap <span className="text-gold">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Alamat Email <span className="text-gold">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Contoh: budi@perusahaan.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Pesan atau Deskripsi Projek <span className="text-gold">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tuliskan tawaran peluang, kebutuhan proyek, atau pertanyaan Anda di sini..."
                      className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 hover:brightness-110 shadow-xl shadow-gold/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                        <span>Mengirim Pesan...</span>
                      </span>
                    ) : (
                      <>
                        <span>Kirim Pesan Sekarang</span>
                        <Send className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
