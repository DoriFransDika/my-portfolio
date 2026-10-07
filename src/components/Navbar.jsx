import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download, Sparkles } from 'lucide-react';

const navLinks = [
  { name: 'Beranda', href: '#beranda' },
  { name: 'Tentang', href: '#tentang' },
  { name: 'Keahlian', href: '#keahlian' },
  { name: 'Project', href: '#proyek' },
  { name: 'Kontak', href: '#kontak' },
];

// All section IDs in exact DOM order (top → bottom), mapped to their nav group
const orderedSections = [
  { id: 'beranda', navHref: '#beranda' },
  { id: 'tentang', navHref: '#tentang' },
  { id: 'pendidikan', navHref: '#tentang' },
  { id: 'keahlian', navHref: '#keahlian' },
  { id: 'sertifikasi', navHref: '#keahlian' },
  { id: 'pengalaman', navHref: '#proyek' },
  { id: 'proyek', navHref: '#proyek' },
  { id: 'kontak', navHref: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#beranda');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Top of page boundary check: always Beranda
      if (window.scrollY < 100) {
        setActiveSection('#beranda');
        return;
      }

      // Bottom of page boundary check: always Kontak
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('#kontak');
        return;
      }

      // Use getBoundingClientRect for reliable viewport-relative position
      // The last section whose top edge has scrolled into or above 200px from viewport top wins
      let matched = '#beranda';

      for (const section of orderedSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            matched = section.navHref;
          }
        }
      }

      setActiveSection(matched);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;

    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -60, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 py-4 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto w-full max-w-6xl rounded-full px-5 sm:px-7 py-3 transition-all duration-500 flex items-center justify-between ${scrolled
          ? 'glass-nav shadow-2xl shadow-black/80 py-2.5 border-gold/20'
          : 'bg-dark-900/60 backdrop-blur-md border border-white/10'
          }`}
      >
        {/* Brand Logo — Strict Plus Jakarta Sans ExtraBold */}
        <a
          href="#beranda"
          onClick={(e) => handleNavClick(e, '#beranda')}
          className="group flex items-center gap-2 font-sans text-lg sm:text-xl font-extrabold tracking-tight text-white hover:text-gold transition-colors duration-300"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_10px_#d4af37] group-hover:scale-125 transition-transform"></span>
          <span>Dori Frans Dika<span className="text-gold">.</span></span>
        </a>

        {/* Desktop Navigation Links — 5 Clean Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${isActive
                  ? 'text-gold font-semibold bg-gold/10'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold shadow-[0_0_6px_#d4af37]"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button: Download CV & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/cv-dori-frans-dika.pdf"
            download="CV-Dori-Frans-Dika.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 rounded-full hover:brightness-110 shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Download CV</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-2xl glass-nav p-6 border border-gold/30 shadow-2xl flex flex-col gap-3 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-gold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold" /> Navigasi Menu
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Cumlaude 3.68
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-gold/10 hover:text-gold transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="/cv-dori-frans-dika.pdf"
              download="CV-Dori-Frans-Dika.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-dark-950 bg-gradient-to-r from-gold-300 via-gold to-amber-500 rounded-xl hover:brightness-110 shadow-lg shadow-gold/20"
            >
              <Download className="w-4 h-4" />
              <span>Download CV PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
